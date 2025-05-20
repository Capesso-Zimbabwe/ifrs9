const db = require('../../config/database');
const auditLogger = require('../../services/auditLogger');

const searchAccounts = async (req, res) => {
    const { accountNumber, runKey, misDate, stage } = req.query;
    let connection;
    
    try {
        connection = await db.getConnection();
        
        let query = `
            SELECT 
                n_account_number,
                n_run_key,
                fic_mis_date,
                n_curr_ifrs_stage_skey,
                n_stage_descr,
                n_carrying_amount_ncy,
                n_delinquent_days
            FROM fct_reporting_lines
            WHERE 1=1
        `;
        
        const params = [];
        
        if (accountNumber) {
            query += ` AND n_account_number LIKE ?`;
            params.push(`%${accountNumber}%`);
        }
        
        if (runKey) {
            query += ` AND n_run_key = ?`;
            params.push(runKey);
        }
        
        if (misDate) {
            query += ` AND fic_mis_date = ?`;
            params.push(misDate);
        }
          if (stage) {
            query += ` AND n_curr_ifrs_stage_skey = ?`;
            params.push(stage);
        }
        
        query += ` ORDER BY n_account_number LIMIT 1000`;
        
        const [results] = await connection.query(query, params);
        
        res.json({
            success: true,
            data: results
        });
        
    } catch (error) {
        console.error('Error searching accounts:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to search accounts',
            details: error.message
        });
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const reassignStage = async (req, res) => {
    const { accountSelections, newStage, reason, runKey, misDate } = req.body;
    let connection;

    try {
        // Validate input
        if (!accountSelections || !Array.isArray(accountSelections) || accountSelections.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Please select at least one account'
            });
        }

        // Extract account numbers from selections
        const accountNumbers = accountSelections.map(selection => selection.accountNumber);

        if (!newStage || ![1, 2, 3].includes(Number(newStage))) {
            return res.status(400).json({
                success: false,
                error: 'Invalid stage. Stage must be 1, 2, or 3'
            });
        }

        if (!reason || reason.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Please provide a reason for stage reassignment'
            });
        }

        if (!runKey || !misDate) {
            return res.status(400).json({
                success: false,
                error: 'Run key and MIS date are required'
            });
        }

        connection = await db.getConnection();
        await connection.beginTransaction();

        // Verify accounts exist and get their current stages
        const verifyQuery = `
            SELECT 
                n_account_number,
                n_curr_ifrs_stage_skey,
                n_carrying_amount_ncy,
                n_prod_name
            FROM fct_reporting_lines 
            WHERE n_account_number IN (?)
            AND n_run_key = ?
            AND fic_mis_date = ?
        `;
        const [existingAccounts] = await connection.query(verifyQuery, [accountNumbers, runKey, misDate]);

        if (existingAccounts.length !== accountNumbers.length) {
            const foundAccounts = existingAccounts.map(row => row.n_account_number);
            const missingAccounts = accountNumbers.filter(acc => !foundAccounts.includes(acc));
            
            await connection.rollback();
            return res.status(400).json({
                success: false,
                error: 'Some account numbers were not found',
                details: { missingAccounts }
            });
        }

        // Update stages
        const updateQuery = `
            UPDATE fct_reporting_lines 
            SET 
                n_curr_ifrs_stage_skey = ?,
                n_prev_ifrs_stage_skey = n_curr_ifrs_stage_skey,
                n_stage_descr = CONCAT('Stage ', ?),
                n_target_ifrs_stage_skey = ?
            WHERE n_account_number IN (?)
            AND n_run_key = ?
            AND fic_mis_date = ?
        `;

        const [updateResult] = await connection.query(updateQuery, [
            newStage,
            newStage,
            newStage,
            accountNumbers,
            runKey,
            misDate
        ]);        // Log changes
        for (const account of existingAccounts) {
            await auditLogger.log({
                user_id: req.user.id,
                action_type: 'STAGE_UPDATE',
                action_description: `Stage reassignment - ${reason}`,
                entity_type: 'ACCOUNT',
                entity_id: account.n_account_number,
                old_values: JSON.stringify({
                    stage: account.n_curr_ifrs_stage_skey
                }),
                new_values: JSON.stringify({
                    stage: newStage,
                    run_key: runKey,
                    mis_date: misDate,
                    amount: account.n_carrying_amount_ncy
                })
            });
        }

        await connection.commit();

        res.json({
            success: true,
            message: 'Stage reassignment completed successfully',
            details: {
                accountsUpdated: updateResult.affectedRows,
                newStage,
                runKey,
                misDate,
                totalAmount: existingAccounts.reduce((sum, acc) => sum + Number(acc.n_carrying_amount_ncy), 0)
            }
        });

    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        console.error('Error in stage reassignment:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to reassign stages',
            details: error.message
        });
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const getStageOverrides = async (req, res) => {
    let connection;

    try {
        connection = await db.getConnection();          const query = `
            SELECT DISTINCT
                frl.n_account_number,
                frl.n_run_key,
                frl.fic_mis_date,
                frl.n_curr_ifrs_stage_skey as current_stage,
                frl.n_prev_ifrs_stage_skey as previous_stage,
                frl.n_stage_descr,
                frl.n_carrying_amount_ncy,
                al.created_at as override_date,
                al.user_id as override_user,
                al.action_description as override_reason,
                JSON_UNQUOTE(JSON_EXTRACT(al.old_values, '$.stage')) as old_stage,
                JSON_UNQUOTE(JSON_EXTRACT(al.new_values, '$.stage')) as new_stage,
                JSON_UNQUOTE(JSON_EXTRACT(al.new_values, '$.amount')) as override_amount
            FROM fct_reporting_lines frl
            JOIN audit_logs al ON 
                al.action_type = 'STAGE_UPDATE' AND 
                al.entity_type = 'ACCOUNT' AND 
                al.entity_id = frl.n_account_number AND
                JSON_UNQUOTE(JSON_EXTRACT(al.new_values, '$.run_key')) = frl.n_run_key AND
                JSON_UNQUOTE(JSON_EXTRACT(al.new_values, '$.mis_date')) = frl.fic_mis_date
            ORDER BY al.created_at DESC
        `;

        const [overrides] = await connection.query(query);

        res.json({
            success: true,
            data: overrides
        });

    } catch (error) {
        console.error('Error fetching stage overrides:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch stage overrides',
            details: error.message
        });
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = {
    searchAccounts,
    reassignStage,
    getStageOverrides
};
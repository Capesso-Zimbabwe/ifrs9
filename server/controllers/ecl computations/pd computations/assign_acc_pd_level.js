const db = require('../../../config/database');

const calculateAccountLevelPDForAccounts = async (ficMisDate) => {
    const startTime = process.hrtime();
    console.log('Starting calculateAccountLevelPDForAccounts function...');
    
    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        // Create a temporary table for intermediate results
        console.log('Creating temporary calculation table...');
        await connection.execute(`
            CREATE TEMPORARY TABLE temp_pd_calculation AS
            SELECT 
                sd.n_account_number,
                sd.fic_mis_date,
                sd.d_maturity_date,
                sd.v_amrt_term_unit,
                (TIMESTAMPDIFF(MONTH, sd.fic_mis_date, sd.d_maturity_date)) AS months_to_maturity,
                CASE 
                    WHEN sd.v_amrt_term_unit = 'M' THEN 1
                    WHEN sd.v_amrt_term_unit = 'Q' THEN 3
                    WHEN sd.v_amrt_term_unit = 'H' THEN 6
                    WHEN sd.v_amrt_term_unit = 'Y' THEN 12
                    ELSE 1
                END AS bucket_size,
                CEIL(12.0 / CASE 
                    WHEN sd.v_amrt_term_unit = 'M' THEN 1
                    WHEN sd.v_amrt_term_unit = 'Q' THEN 3
                    WHEN sd.v_amrt_term_unit = 'H' THEN 6
                    WHEN sd.v_amrt_term_unit = 'Y' THEN 12
                    ELSE 1
                END) AS twelve_month_cap
            FROM fct_stage_determination sd
            WHERE sd.fic_mis_date = ?
              AND sd.d_maturity_date IS NOT NULL
        `, [ficMisDate]);

        // Precompute PD values for accounts with months_to_maturity > 12
        console.log('Creating temporary results table for long-term accounts...');
        await connection.execute(`
            CREATE TEMPORARY TABLE temp_pd_results_gt_12 AS
            SELECT 
                t.n_account_number,
                t.fic_mis_date,
                COALESCE(
                    (CASE 
                        WHEN CEIL(t.months_to_maturity / t.bucket_size) > t.twelve_month_cap THEN pd.n_cumulative_default_prob
                        ELSE NULL
                    END),
                    0
                ) AS n_twelve_months_pd,
                pd.n_cumulative_default_prob AS n_lifetime_pd
            FROM temp_pd_calculation t
            JOIN fsi_pd_account_interpolated pd
              ON pd.v_account_number = t.n_account_number
              AND pd.fic_mis_date = t.fic_mis_date
            WHERE CEIL(t.months_to_maturity / t.bucket_size) > t.twelve_month_cap
        `);

        // Precompute PD values for accounts with months_to_maturity <= 12
        console.log('Creating temporary results table for short-term accounts...');
        await connection.execute(`
            CREATE TEMPORARY TABLE temp_pd_results_le_12 AS
            SELECT 
                t.n_account_number,
                t.fic_mis_date,
                COALESCE(
                    (CASE 
                        WHEN CEIL(t.months_to_maturity / t.bucket_size) <= t.twelve_month_cap THEN pd.n_cumulative_default_prob
                        ELSE NULL
                    END),
                    0
                ) AS n_twelve_months_pd,
                pd.n_cumulative_default_prob AS n_lifetime_pd
            FROM temp_pd_calculation t
            JOIN fsi_pd_account_interpolated pd
              ON pd.v_account_number = t.n_account_number
              AND pd.fic_mis_date = t.fic_mis_date
            WHERE CEIL(t.months_to_maturity / t.bucket_size) <= t.twelve_month_cap
        `);

        // Bulk update for accounts with months_to_maturity > 12
        console.log('Updating long-term accounts...');
        await connection.execute(`
            UPDATE fct_stage_determination sd
            INNER JOIN temp_pd_results_gt_12 r
                ON sd.n_account_number = r.n_account_number
                AND sd.fic_mis_date = r.fic_mis_date
            SET 
                sd.n_twelve_months_pd = r.n_twelve_months_pd,
                sd.n_lifetime_pd = r.n_lifetime_pd
        `);

        // Bulk update for accounts with months_to_maturity <= 12
        console.log('Updating short-term accounts...');
        await connection.execute(`
            UPDATE fct_stage_determination sd
            INNER JOIN temp_pd_results_le_12 r
                ON sd.n_account_number = r.n_account_number
                AND sd.fic_mis_date = r.fic_mis_date
            SET 
                sd.n_twelve_months_pd = r.n_twelve_months_pd,
                sd.n_lifetime_pd = r.n_lifetime_pd
        `);

        // Drop temporary tables
        console.log('Cleaning up temporary tables...');
        await connection.execute('DROP TEMPORARY TABLE IF EXISTS temp_pd_calculation, temp_pd_results_gt_12, temp_pd_results_le_12');

        await connection.commit();
        console.log(`Account-level PD calculation completed for fic_mis_date=${ficMisDate}`);
        return 1; // Success

    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        console.error('Error in calculateAccountLevelPDForAccounts:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            code: error.code,
            sqlMessage: error.sqlMessage
        });
        return 0; // Failure

    } finally {
        if (connection) {
            connection.release();
        }
        const [totalSeconds, totalNanoseconds] = process.hrtime(startTime);
        const totalMilliseconds = (totalSeconds * 1000) + (totalNanoseconds / 1000000);
        console.log(`Total execution time: ${totalMilliseconds.toFixed(2)}ms`);
    }
};

module.exports = {
    calculateAccountLevelPDForAccounts
};

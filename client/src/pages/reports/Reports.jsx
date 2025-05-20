import React, { useState } from 'react';
import ECLAnalsyisReport from '../../components/reports/ECLAnalsyisReport';
import LossAllowanceReport from '../../components/reports/LossAllowanceReport';
import IFRS735G from '../../components/reports/IFRS735G';

function Reports() {
  const [selectedSection, setSelectedSection] = useState('ecl');

  return (
    <div className="p-4">
      <div className="flex space-x-4 border-b border-gray-300 mb-4">
        <button
          className={`px-4 py-2 ${
            selectedSection === 'ecl' ? 'border-b-2 border-orange-600 font-semibold' : 'text-gray-600'
          }`}
          onClick={() => setSelectedSection('ecl')}
        >
          ECL Analysis Report
        </button>
        <button
          className={`px-4 py-2 ${
            selectedSection === 'loss' ? 'border-b-2 border-orange-600 font-semibold' : 'text-gray-600'
          }`}
          onClick={() => setSelectedSection('loss')}
        >
          Loss Allowance Report (IFRS 7)
        </button>
        <button
          className={`px-4 py-2 ${
            selectedSection === 'ifrs735g' ? 'border-b-2 border-orange-600 font-semibold' : 'text-gray-600'
          }`}
          onClick={() => setSelectedSection('ifrs735g')}
        >
          IFRS 7.35G Report
        </button>
      </div>

      <div>
        {selectedSection === 'ecl' && (
          <div className="bg-white p-4">
            <ECLAnalsyisReport/>
          </div>
        )}
        {selectedSection === 'loss' && (
          <div className="bg-white">
            <LossAllowanceReport/>
          </div>
        )}
        {selectedSection === 'ifrs735g' && (
          <div className="bg-white">
            <IFRS735G/>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;

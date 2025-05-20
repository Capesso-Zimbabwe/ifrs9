import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../utils/Api';
function RunHistory() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRuns();
  }, []);

  const fetchRuns = async () => {
    try {
      const response = await axios.get(`${API_URL}/ecl/runs`);
      setRuns(response.data.data);
      setLoading(false);
    } catch {
      setError('Failed to fetch run history');
      setLoading(false);
    }
  };

  const handleApprove = async (runKey, approved) => {
    try {
      await axios.post(`${API_URL}/ecl/approve/${runKey}`, { approved });
      fetchRuns(); // Refresh the list
    } catch {
      setError('Failed to update approval status');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b border-gray-300 text-left first:rounded-tl-lg">Run Key</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Date</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Status</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Approved</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left last:rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {runs.map((run) => (
              <tr key={run.run_key} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-300">{run.run_key}</td>
                <td className="py-2 px-4 border-b border-gray-300">{new Date(run.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b border-gray-300">{run.status}</td>
                <td className="py-2 px-4 border-b border-gray-300">{run.approved ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <button
                    onClick={() => handleApprove(run.run_key, !run.approved)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    {run.approved ? 'Unapprove' : 'Approve'}
                  </button>
                </td>
              </tr>
            ))}
            {runs.length > 0 && (
              <tr>
                <td className="py-2 px-4 first:rounded-bl-lg"></td>
                <td className="py-2 px-4"></td>
                <td className="py-2 px-4"></td>
                <td className="py-2 px-4"></td>
                <td className="py-2 px-4 last:rounded-br-lg"></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RunHistory;

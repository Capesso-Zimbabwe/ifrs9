import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Mock data - replace with actual data from your backend
  const metrics = {
    totalPortfolio: '1,234,567,890',
    eclAmount: '123,456,789',
    eclRatio: '10.0%',
    stage1: '45%',
    stage2: '30%',
    stage3: '25%',
    pdCoverage: '98%',
    lgdCoverage: '95%',
    totalExposures: '5,678',
    impairedExposures: '234',
    lastCalculation: '2024-03-20',
  };

  // ECL Trend Data
  const eclTrend = [
    { month: 'Oct 2023', value: 115000 },
    { month: 'Nov 2023', value: 118000 },
    { month: 'Dec 2023', value: 120000 },
    { month: 'Jan 2024', value: 122000 },
    { month: 'Feb 2024', value: 123000 },
    { month: 'Mar 2024', value: 123456 },
  ];

  // Segment Data
  const segments = [
    { name: 'Mortgage Loans', exposure: 500000000, pd: 0.8, ecl: 4000000 },
    { name: 'Educational Loans', exposure: 300000000, pd: 1.2, ecl: 3600000 },
    { name: 'Business Loans', exposure: 250000000, pd: 2.5, ecl: 6250000 },
    { name: 'Auto Loans', exposure: 184567890, pd: 1.5, ecl: 2768518 },
  ];

  // Top Exposed Accounts by Currency
  const topExposedAccounts = {
    USD: [
      { name: 'Econet Wireless Zimbabwe', exposure: 25000000, stage: 2, currency: 'USD' },
      { name: 'Delta Corporation', exposure: 20000000, stage: 1, currency: 'USD' },
      { name: 'Innscor Africa', exposure: 18000000, stage: 3, currency: 'USD' },
      { name: 'CBZ Holdings', exposure: 15000000, stage: 2, currency: 'USD' },
      { name: 'Old Mutual Zimbabwe', exposure: 12000000, stage: 1, currency: 'USD' },
    ],
    ZWG: [
      { name: 'Zimbabwe Stock Exchange', exposure: 2000000000, stage: 2, currency: 'ZWG' },
      { name: 'National Foods', exposure: 1800000000, stage: 1, currency: 'ZWG' },
      { name: 'Meikles Limited', exposure: 1500000000, stage: 3, currency: 'ZWG' },
      { name: 'FBC Holdings', exposure: 1200000000, stage: 2, currency: 'ZWG' },
      { name: 'Zimplats Holdings', exposure: 1000000000, stage: 1, currency: 'ZWG' },
    ],
  };

  // Analysis Summary
  const analysisSummary = {
    eclChange: '+2.3%',
    stageMovements: [
      { from: 'Stage 1', to: 'Stage 2', count: 45 },
      { from: 'Stage 2', to: 'Stage 3', count: 12 },
      { from: 'Stage 2', to: 'Stage 1', count: 8 },
    ],
    outlook: 'positive',
    keyPoints: [
      'ECL increased by 2.3% due to higher PD in Business Loans segment',
      '45 accounts moved from Stage 1 to Stage 2',
      '12 accounts deteriorated to Stage 3',
      '8 accounts improved from Stage 2 to Stage 1',
      'Overall portfolio quality remains stable with positive outlook'
    ]
  };

  const recentActivities = [
    { id: 1, action: 'ECL Calculation', date: '2024-03-20', status: 'Completed', user: 'John Doe' },
    { id: 2, action: 'Stage Reassignment', date: '2024-03-19', status: 'Completed', user: 'Jane Smith' },
    { id: 3, action: 'Cashflow Upload', date: '2024-03-18', status: 'Completed', user: 'Mike Johnson' },
    { id: 4, action: 'PD Model Update', date: '2024-03-17', status: 'In Progress', user: 'Sarah Wilson' },
  ];

  // Format number to thousands
  const formatToThousands = (num) => {
    return (num / 1000).toLocaleString('en-US', { maximumFractionDigits: 1 }) + 'K';
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Header with Last Calculation Date */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome to your ECL Management Dashboard</p>
        </div>
        <div className="text-sm text-gray-500">
          Last Calculation: {metrics.lastCalculation}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Link to="/ecl-calculation" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-900">ECL Calculation</h3>
              <p className="text-xs text-gray-500">Run new calculation</p>
            </div>
          </div>
        </Link>

        <Link to="/upload-cashflows" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-900">Upload Cashflows</h3>
              <p className="text-xs text-gray-500">Import new data</p>
            </div>
          </div>
        </Link>

        <Link to="/reports" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-900">View Reports</h3>
              <p className="text-xs text-gray-500">Generate reports</p>
            </div>
          </div>
        </Link>

        <Link to="/stage-reassignment" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-900">Stage Reassignment</h3>
              <p className="text-xs text-gray-500">Update stages</p>
            </div>
          </div>
        </Link>
      </div>

      {/* ECL Trend and Analysis Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">ECL Trend (Thousands)</h3>
          <div className="h-64 relative">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-500">
              {[120, 90, 60, 30, 0].map((value) => (
                <div key={value} className="h-6 flex items-center">
                  {value}K
                </div>
              ))}
            </div>
            
            {/* Graph area */}
            <div className="ml-12 h-48 relative">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="absolute left-0 right-0 border-t border-gray-100"
                  style={{ top: `${i * 25}%` }}
                ></div>
              ))}
              
              {/* Bar graph */}
              <div className="absolute inset-0 flex items-end justify-between px-2">
                {eclTrend.map((point, index) => {
                  const height = (point.value / 120000) * 100;
                  return (
                    <div key={index} className="flex flex-col items-center w-1/6">
                      <div 
                        className="w-3/4 bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                          {formatToThousands(point.value)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* X-axis labels */}
            <div className="ml-12 mt-2 flex justify-between text-xs text-gray-500">
              {eclTrend.map((point) => (
                <div key={point.month} className="w-1/6 text-center">{point.month}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Analysis Summary</h3>
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-800">ECL Change</span>
                <span className={`text-lg font-bold ${analysisSummary.eclChange.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {analysisSummary.eclChange}
                </span>
              </div>
              <p className="text-sm text-blue-700">{analysisSummary.keyPoints[0]}</p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">Stage Movements</h4>
              {analysisSummary.stageMovements.map((movement, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">
                    {movement.count} accounts
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{movement.from}</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-sm text-gray-500">{movement.to}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Portfolio Outlook</span>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  analysisSummary.outlook === 'positive' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {analysisSummary.outlook === 'positive' ? 'Positive' : 'Negative'}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{analysisSummary.keyPoints[4]}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Portfolio Overview</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Total Portfolio Value</p>
              <p className="text-2xl font-bold text-gray-900">${metrics.totalPortfolio}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total ECL Amount</p>
              <p className="text-2xl font-bold text-gray-900">${metrics.eclAmount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">ECL Ratio</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.eclRatio}</p>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">Total Exposures</p>
              <p className="text-xl font-semibold text-gray-900">{metrics.totalExposures}</p>
              <p className="text-sm text-red-600">Impaired: {metrics.impairedExposures}</p>
            </div>
          </div>
        </div>

        {/* Segment Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Segment Distribution</h3>
          <div className="space-y-4">
            {segments.map((segment, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">{segment.name}</span>
                  <span className="text-sm font-medium text-gray-900">PD: {segment.pd}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${(segment.exposure / metrics.totalPortfolio.replace(/[^0-9]/g, '')) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Exposure: ${formatToThousands(segment.exposure)}</span>
                  <span>ECL: ${formatToThousands(segment.ecl)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Exposed Accounts */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Exposed Accounts</h3>
          <div className="space-y-4">
            {Object.entries(topExposedAccounts).map(([currency, accounts]) => (
              <div key={currency}>
                <h4 className="text-sm font-medium text-gray-700 mb-2">{currency}</h4>
                <div className="space-y-2">
                  {accounts.map((account, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{account.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-900">
                          {currency === 'ZWG' ? 'ZWG ' : '$'}{formatToThousands(account.exposure)}
                        </span>
                        <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                          account.stage === 1 ? 'bg-green-100 text-green-800' :
                          account.stage === 2 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          Stage {account.stage}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
          <Link to="/audit-logs" className="text-sm text-blue-600 hover:text-blue-800">
            View All Activities
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.action}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      activity.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
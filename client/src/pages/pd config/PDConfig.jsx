import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import API_URL from '../../utils/Api';
import SuccessModal from '../../components/shared/SuccessModal';
import ErrorModal from '../../components/shared/ErrorModal';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

function PDConfig() {
  // State for active tab
  const [activeTab, setActiveTab] = useState('termStructure');
  
  // State for PD Term Structure
  const [termStructures, setTermStructures] = useState([]);
  const [showTermStructureModal, setShowTermStructureModal] = useState(false);
  const [termStructureForm, setTermStructureForm] = useState({
    termStructureId: '',
    termStructureName: '',
    termStructureDesc: '',
    termFrequencyUnit: 'M',
    termStructureType: 'R',
    ficMisDate: new Date().toISOString().split('T')[0]
  });

  // State for PD Term Structure Details
  const [termStructureDetails, setTermStructureDetails] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsForm, setDetailsForm] = useState({
    v_pd_term_structure_id: '',
    fic_mis_date: new Date().toISOString().split('T')[0],
    v_credit_risk_basis_cd: '',
    n_pd_percent: ''
  });

  // State for Product Segments
  const [productSegments, setProductSegments] = useState([]);

  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch data based on active tab
  const fetchData = async () => {
    setIsLoading(true);
    try {
      let response;
      switch (activeTab) {
        case 'termStructure':
          response = await axios.get(`${API_URL}/pd-term-structures`);
          setTermStructures(response.data.data);
          break;
        case 'termStructureDetails':
          response = await axios.get(`${API_URL}/pd-term-structure-details`);
          setTermStructureDetails(response.data.data);
          break;
      }
      setTotalPages(response.data.pagination?.totalPages || 1);
    } catch (error) {
      toast.error(`Failed to fetch ${activeTab} data`);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch product segments
  const fetchProductSegments = async () => {
    try {
      const response = await axios.get(`${API_URL}/product-segments`);
      if (response.data.success) {
        setProductSegments(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching product segments:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchProductSegments();
  }, [activeTab, currentPage]);

  // Handle Form Submissions
  const handleTermStructureSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        ...termStructureForm,
        v_pd_term_structure_id: termStructureForm.termStructureId,
        v_pd_term_structure_name: termStructureForm.termStructureName,
        v_pd_term_frequency_unit: termStructureForm.termFrequencyUnit,
        v_pd_term_structure_type: termStructureForm.termStructureType,
        fic_mis_date: termStructureForm.ficMisDate
      };

      const response = await axios.post(`${API_URL}/pd-term-structures`, formData);
      if (response.data.success) {
        setSuccessMessage('Term structure created successfully');
        setShowSuccessModal(true);
        fetchData();
        setShowTermStructureModal(false);
      }
    } catch (error) {
      setErrorMessage('Failed to create term structure');
      setShowErrorModal(true);
      console.error('Error:', error);
    }
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare the data in the required format
      const formData = {
        termStructureId: parseInt(detailsForm.v_pd_term_structure_id, 10), // Convert to integer
        details: [
          {
            ficMisDate: detailsForm.fic_mis_date,
            creditRiskBasisCd: detailsForm.v_credit_risk_basis_cd,
            pdPercent: parseFloat(detailsForm.n_pd_percent) // Convert to float
          }
        ]
      };

      const response = await axios.post(`${API_URL}/pd-term-structure-details/add`, formData);
      if (response.data.success) {
        setSuccessMessage('Term structure detail created successfully');
        setShowSuccessModal(true);
        fetchData();
        setShowDetailsModal(false);
      }
    } catch (error) {
      setErrorMessage('Failed to create term structure detail');
      setShowErrorModal(true);
      console.error('Error:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">PD Configuration</h1>
          </div>
          <div className="h-px bg-gray-200 w-full"></div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`${
                activeTab === 'termStructure'
                  ? 'border-[#E95900] text-[#E95900]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium`}
              onClick={() => setActiveTab('termStructure')}
            >
              PD Term Structure
            </button>
            <button
              className={`${
                activeTab === 'termStructureDetails'
                  ? 'border-[#E95900] text-[#E95900]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium`}
              onClick={() => setActiveTab('termStructureDetails')}
            >
              PD Term Structure Details
            </button>
          </nav>
        </div>

        {/* Add Button */}
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => activeTab === 'termStructure' ? setShowTermStructureModal(true) : setShowDetailsModal(true)}
            className="bg-[#E95900] text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
          >
            <FaPlus /> Add New {activeTab === 'termStructure' ? 'Term Structure' : 'Term Structure Detail'}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 bg-white rounded-lg shadow border border-gray-200 flex flex-col overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-200">
                      <tr>
                        {activeTab === 'termStructure' ? (
                          <>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black  tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black  tracking-wider">Product Segment</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black  tracking-wider">Product Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black  tracking-wider">Frequency</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black  tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black  tracking-wider">MIS Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black  tracking-wider">Actions</th>
                          </>
                        ) : (
                          <>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Structure ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Basis</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PD %</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {activeTab === 'termStructure' ? (
                        termStructures.map((structure) => (
                          <tr key={structure.v_pd_term_structure_id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{structure.v_pd_term_structure_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{structure.v_prod_segment}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{structure.v_prod_type}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{structure.v_pd_term_frequency_unit}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{structure.v_pd_term_structure_type}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{structure.fic_mis_date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-900">
                                  <FaEdit />
                                </button>
                                <button className="text-red-600 hover:text-red-900">
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        termStructureDetails.map((detail) => (
                          <tr key={detail.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{detail.v_pd_term_structure_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{detail.v_credit_risk_basis_cd}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{detail.n_pd_percent}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-900">
                                  <FaEdit />
                                </button>
                                <button className="text-red-600 hover:text-red-900">
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white">
              <div className="flex items-center">
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showTermStructureModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-8 border w-[500px] shadow-lg rounded-lg bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Add PD Term Structure</h3>
                <button 
                  onClick={() => setShowTermStructureModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleTermStructureSubmit} className="space-y-6">
                {/* Term Structure Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Term Structure ID
                    </label>
                    <input
                      type="text"
                      value={termStructureForm.termStructureId}
                      onChange={(e) => setTermStructureForm({...termStructureForm, termStructureId: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Segment
                    </label>
                    <select
                      value={termStructureForm.termStructureName}
                      onChange={(e) => setTermStructureForm({...termStructureForm, termStructureName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Product Segment</option>
                      {productSegments.map((segment) => (
                        <option key={segment.segment_id} value={segment.segment_id}>
                          {segment.v_prod_segment} - {segment.v_prod_type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frequency Unit
                    </label>
                    <select
                      value={termStructureForm.termFrequencyUnit}
                      onChange={(e) => setTermStructureForm({...termStructureForm, termFrequencyUnit: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="M">Monthly</option>
                      <option value="Q">Quarterly</option>
                      <option value="H">Half Yearly</option>
                      <option value="Y">Yearly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Structure Type
                    </label>
                    <select
                      value={termStructureForm.termStructureType}
                      onChange={(e) => setTermStructureForm({...termStructureForm, termStructureType: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="R">Rating Based</option>
                      <option value="D">Delinquency Based</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      MIS Date
                    </label>
                    <input
                      type="date"
                      value={termStructureForm.ficMisDate}
                      onChange={(e) => setTermStructureForm({...termStructureForm, ficMisDate: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => setShowTermStructureModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FaSave className="inline-block mr-2" /> Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showDetailsModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-8 border w-[500px] shadow-lg rounded-lg bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Add PD Term Structure Detail</h3>
                <button 
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleDetailsSubmit} className="space-y-6">
                {/* Term Structure Details Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Term Structure ID
                    </label>
                    <select
                      value={detailsForm.v_pd_term_structure_id}
                      onChange={(e) => setDetailsForm({...detailsForm, v_pd_term_structure_id: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Term Structure</option>
                      {termStructures.map((structure) => (
                        <option key={structure.v_pd_term_structure_id} value={structure.v_pd_term_structure_id}>
                          {structure.v_pd_term_structure_id}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Credit Risk Basis Code
                    </label>
                    <input
                      type="text"
                      value={detailsForm.v_credit_risk_basis_cd}
                      onChange={(e) => setDetailsForm({...detailsForm, v_credit_risk_basis_cd: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PD Percentage
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      value={detailsForm.n_pd_percent}
                      onChange={(e) => setDetailsForm({...detailsForm, n_pd_percent: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      MIS Date
                    </label>
                    <input
                      type="date"
                      value={detailsForm.fic_mis_date}
                      onChange={(e) => setDetailsForm({...detailsForm, fic_mis_date: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => setShowDetailsModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FaSave className="inline-block mr-2" /> Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={successMessage}
      />

      {/* Error Modal */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        message={errorMessage}
      />
    </div>
  );
}

export default PDConfig;
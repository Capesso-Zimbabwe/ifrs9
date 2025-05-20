import React, { useState } from "react";
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import API_URL  from '../../utils/Api';

function PdDocumentation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editorContent, setEditorContent] = useState('');

  const handleSave = async () => {
    try {
      setLoading(true);
      
      // Get token from localStorage or wherever it's stored in your app
      const token = localStorage.getItem('token');
      
      const response = await axios.post(`${API_URL}/pd-documentation/save`, {
        content: editorContent,
        version: '1.0.0',
        createdBy: 'System',
        authorizedBy: 'System'
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        alert('Documentation saved successfully');
      }
    } catch (error) {
      setError('Failed to save documentation');
      console.error('Error saving documentation:', error);
    } finally {
      setLoading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['link', 'image', 'video'],
      ['table']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'script',
    'indent',
    'direction',
    'color', 'background',
    'font',
    'align',
    'link', 'image', 'video',
    'table'
  ];

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-full px-2 py-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="w-full font-bold text-[#011325] pb-2">
          Probability of Default (PD) Model Documentation
        </h1>
        <button
          className="p-2 text-green-600 hover:text-green-800 transition-colors"
          onClick={handleSave}
          title="Save Documentation"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
        </button>
      </div>
      <hr className="border-gray-300 mb-5"></hr>
      <div className="border border-gray-300 rounded-sm p-4 bg-white">
        <ReactQuill
          theme="snow"
          value={editorContent}
          onChange={setEditorContent}
          modules={modules}
          formats={formats}
          className="h-[calc(100vh-200px)] mb-12"
        />
      </div>
    </div>
  );
}

export default PdDocumentation;
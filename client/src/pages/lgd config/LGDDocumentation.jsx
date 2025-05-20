import React from 'react';

function LGDDocumentation() {
  return (
    <div className="relative max-w-4xl mx-auto py-6 bg-white rounded-lg shadow">
      <button
        className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors shadow"
        title="Edit documentation"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm0 0L4 19l5-2 2-5z" />
        </svg>
        Edit
      </button>
      <h1 className="text-2xl font-bold text-[#011325] border-b border-gray-300 pb-2 mb-6">
        Loss Given Default (LGD) Model Documentation
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#011325] mb-3 border-b border-gray-200 pb-1">1. Introduction</h2>
        <p className="mb-4">
          This document outlines the approach to estimating Loss Given Default (LGD) for retail exposures under the Modified Standardized Approach (MSA), as prescribed by the Reserve Bank of Zimbabwe (RBZ).
        </p>
        <p>
          It details the rationale behind using a PIT (Point-in-Time) LGD approach and explains why historical LGD data is not suitable for estimating current credit risk due to Zimbabwe's economic shifts and currency changes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#011325] mb-3 border-b border-gray-200 pb-1">2. LGD Assumptions for Retail Exposures</h2>
        <p className="mb-4">
          Retail exposures are typically consumer-focused and unsecured, including loans like personal term loans, small business loans, and other consumer finance products.
        </p>

        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <h3 className="font-medium mb-2">Key Assumptions:</h3>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="font-medium">Standard LGD Value:</span> Based on Basel II framework, LGD for senior unsecured exposures is set at 45% for retail accounts (personal loans, consumer loans)
            </li>
            <li>
              <span className="font-medium">Regulatory Compliance:</span> As prescribed by RBZ's Modified Standardized Approach (MSA), this 45% LGD is used for determining capital charge
            </li>
            <li>
              <span className="font-medium">External Guidelines:</span> In absence of Zimbabwe-specific data, Basel II framework's 45% LGD for unsecured retail loans is used to maintain international compliance
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#011325] mb-3 border-b border-gray-200 pb-1">3. Why Historical LGD Data Cannot Be Used</h2>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-[#011325] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">1</div>
            <div>
              <h3 className="font-medium">Currency Transition (ZWD to USD)</h3>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Pre-2022 data used Zimbabwean Dollar (ZWD), a highly unstable and inflationary currency</li>
                <li>USD transition in 2022 created drastically different economic environment</li>
                <li>Historical ZWD-based LGD data reflects inflated values from hyperinflation that don't apply to current USD environment</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-[#011325] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">2</div>
            <div>
              <h3 className="font-medium">Insufficient USD Data</h3>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Limited post-2022 USD data available for establishing reliable trends</li>
                <li>Retail exposures' granular nature and unsecured status create high recovery rate variability</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-[#011325] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">3</div>
            <div>
              <h3 className="font-medium">Changing Economic Environment</h3>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>USD introduction likely improved recovery rates and economic stability</li>
                <li>Historical data cannot capture current economic realities and improved credit environment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#011325] mb-3 border-b border-gray-200 pb-1">4. Regulatory References</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium">Basel II Framework:</span>{' '}
            <a href="https://www.bis.org/publ/bcbs128.pdf" className="text-blue-600 hover:underline">
              https://www.bis.org/publ/bcbs128.pdf
            </a>
          </li>
          <li>
            <span className="font-medium">Reserve Bank of Zimbabwe Basel II Technical Guidance</span>
          </li>
          <li>
            <span className="font-medium">International Finance Corporation (IFC):</span>{' '}
            <a href="https://www.ifc.org/wps/wcm/connect/industry_ext_content/ifc_external_corporate_site/financial+institutions/publications/publications_report_creditrisk" className="text-blue-600 hover:underline">
              Credit Risk Publications
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default LGDDocumentation;
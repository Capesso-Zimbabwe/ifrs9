import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (heading) => {
    setExpandedSections((prev) => ({
      ...prev,
      [heading]: !prev[heading],
    }));
  };

  const menuStructure = [
    {
      heading: "Data Configuration",
      icon: (
        <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v4a1 1 0 001 1h3m10-5v16a1 1 0 01-1 1H6a1 1 0 01-1-1V7.914a1 1 0 01.293-.707l3.914-3.914A1 1 0 019.914 3H18a1 1 0 011 1z" />
        </svg>
      ),
      items: [
        {
          path: "/view-loaded-data",
          label: "Input Data",
        },
        {
          path: "/product-configuration",
          label: "Product Configuration",
        },
      ],
    },
    {
      heading: "Classification ",
      icon: (
        <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      items: [
        {
          path: "/classification-measurement",
          label: "Classification & Measurement",
        },
      ],
    },
    {
      heading: "Staging",
      icon: (
        <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      items: [
        {
          path: "/staging-config",
          label: "Staging Config",
        },
        {
          path: "/stage-reassignment",
          label: "Stage Reassignment",
        },
        
      ],
    },
    {
      heading: "Cashflows",
      icon: (
        <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      items: [
        {
          path: "/upload-cashflows",
          label: "Upload Cashflows",
        },
        {
          path: "/cashflows",
          label: "Generate Cashflows",
        },
        {
          path: "/cashflows-config",
          label: "Cashflows Configuration",
        },
      ],
    },
    {
      heading: "Credit Risk Models",
      icon: (
        <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m4 0a4 4 0 11-8 0 4 4 0 018 0zm-4 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1" />
        </svg>
      ),
      items: [
        {
          subheading: "PD Config",
          subitems: [
            {
              path: "/pd-config",
              label: "PD Configuration",
            },
            {
              path: "/pd-methodology",
              label: "PD Methodology",
            },
            {
              path: "/pd-documentation",
              label: "PD Documentation",
            },
          ],
        },
        {
          subheading: "LGD Config",
          subitems: [
            {
              path: "/lgd-config",
              label: "LGD Configuration",
            },
            {
              path: "/LGD-Documentation",
              label: "LGD Documentation",
            },
            {
              path: "/LGD-Methodology",
              label: "LGD Methodology",
            },
          ],
        },
      ],
    },
    {
      heading: "ECL Calculation",
      icon: (
        <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      items: [
        {
          path: "/ecl-calculation",
          label: "ECL Calculation",
        },
        {
          path: "/ecl-results",
          label: "ECL Results",
        },
      ],
    },
    {
      heading: "Reports",
      icon: (
        <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      items: [
        {
          path: "/reports",
          label: "ECL Reports",
        }
      ],
    },
    {
      heading: "Users",
      icon: (
        <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      items: [
        {
          path: "/users",
          label: "Users",
        }
      ],
    },
  ];

  return (
    <div
      className={`h-screen bg-[#011325] text-gray-300 w-56 fixed left-0 top-0 transition-all duration-300 ${
        isOpen ? "" : "-translate-x-48"
      }`}
      style={{
        overflowY: "scroll",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style>
        {`
          /* Hide scrollbar for Chrome, Safari and Opera */
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      {/* Header */}
      <div className="flex items-center text-xs p-4  border-gray-700">
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-auto p-2 rounded-lg hover:bg-gray-700"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 ">
        {menuStructure.map((section, index) => (
          <div key={index} className="mb-2">
            <button
              onClick={() => toggleSection(section.heading)}
              className="w-full flex items-center justify-between mb-0.5 hover:bg-gray-700/50 rounded-lg p-1.5"
            >
              <span className="flex items-center">{section.icon}{section.heading}</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  expandedSections[section.heading] ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="h-px bg-gray-700 mb-1"></div>

            {/* Collapsible content */}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                expandedSections[section.heading]
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <ul className="space-y-0.5">
                {section.heading === "Credit Risk Models"
                  ? section.items.map((item, idx) => (
                      <li key={idx}>
                        <h3 className="text-sm text-gray-400 mt-2 mb-0.5">
                          {item.subheading}
                        </h3>
                        <ul className="space-y-0.5 pl-2">
                          {item.subitems.map((subitem) => (
                            <li key={subitem.path}>
                              <Link
                                to={subitem.path}
                                className={`flex items-center space-x-3 p-2 rounded-lg transition-colors text-xs
                                ${
                                  location.pathname === subitem.path
                                    ? "bg-gray-700 text-white"
                                    : "hover:bg-gray-700"
                                }`}
                              >
                                {subitem.icon}
                                <span className="whitespace-nowrap">
                                  {subitem.label}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))
                  : section.items.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className={`flex items-center space-x-3 p-2 rounded-lg transition-colors text-xs
                  ${
                    location.pathname === item.path
                      ? "bg-gray-700 text-white"
                      : "hover:bg-gray-700"
                  }`}
                        >
                          {item.icon}
                          <span className="whitespace-nowrap">
                            {item.label}
                          </span>
                        </Link>
                      </li>
                    ))}
              </ul>
            </div>
          </div>
        ))}

        {/* Logout button */}
        <Link
          to="/"
          className="flex items-center space-x-3 p-2 rounded-lg transition-colors text-xs  hover:bg-[#E95900] mt-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Logout</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
import React, { useState, useEffect } from 'react';

const ManpowerServices = () => {
  const [activeCard, setActiveCard] = useState(0);

  const services = [
    {
      title: "Contract Staffing",
      description: "Verified and trained workforce for temporary and permanent positions"
    },
    {
      title: "Security Services",
      description: "Professional security personnel with comprehensive training"
    },
    {
      title: "Facility Support Services",
      description: "Housekeeping and facility management staff for operations"
    },
    {
      title: "Operational & Management Support",
      description: "Management-level hiring with experienced professionals"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 4);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Content */}
          <div className="space-y-6">
            <p className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Manpower with Excellence
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Misu Enterprises{" "}
              <span className="text-gradient">Manpower</span> Services
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
              Providing top-tier manpower solutions including contract staffing, security services, 
              housekeeping, facility support staff, and management-level hiring with a verified, 
              trained, and compliant workforce tailored to your business needs.
            </p>
            <button className="mt-4 bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 font-medium">
             Explore More
            </button>
          </div>

          {/* Right Side - Service Cards */}
          <div className="grid grid-cols-2 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl transition-all duration-1000 ease-in-out ${
                  activeCard === index
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-900 text-white'
                }`}
              >
                <div className="mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    activeCard === index ? 'bg-white/20' : 'bg-emerald-600'
                  }`}>
                    <svg 
                      className="w-6 h-6 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      {index === 0 && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      )}
                      {index === 1 && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      )}
                      {index === 2 && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      )}
                      {index === 3 && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      )}
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 leading-tight">
                  {service.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  activeCard === index ? 'text-white/90' : 'text-gray-300'
                }`}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManpowerServices;
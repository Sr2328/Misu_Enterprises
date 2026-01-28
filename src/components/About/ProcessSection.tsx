import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const ProcessSection = () => {
  const workforceCategories = [
    "Top Management & Executives",
    "Supervisors & Team Leaders",
    "Skilled Workers & Technicians",
    "Semi-Skilled Operators",
    "Security Personnel",
    "Housekeeping Staff",
    "Pantry & Cafeteria",
    "Drivers & Support Staff"
  ];

  const processSteps = [
    {
      step: "01",
      title: "Requirement Analysis",
      description: "We understand your staffing needs, site conditions, and workforce specifications through detailed consultation and site assessment."
    },
    {
      step: "02",
      title: "Candidate Sourcing",
      description: "We tap into our verified pool of 25,000+ workers and actively recruit matching profiles from our extensive network."
    },
    {
      step: "03",
      title: "Verification & Training",
      description: "Comprehensive background checks, police verification, and SOP-based training customized for your specific requirements."
    },
    {
      step: "04",
      title: "Deployment & Onboarding",
      description: "Trained workforce deployed to your site within 24-48 hours with complete documentation and proper orientation."
    },
    {
      step: "05",
      title: "Management & Support",
      description: "Ongoing attendance tracking, payroll management, compliance monitoring, and dedicated performance management support."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 via-white to-emerald-50/20
">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Side - Heading & Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:sticky lg:top-24"
            >
              {/* Tag */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4"
              >
                <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold border border-emerald-200">
                  Our Process
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Workforce
                <br />
                Deployment
                <br />
                <span className="text-emerald-600">Process</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8"
              >
                Our comprehensive workforce deployment process ensures quality, compliance, and rapid delivery. From initial requirement analysis to ongoing management, we handle every aspect of your staffing needs with precision and care.
              </motion.p>

              {/* Key Highlights Box - Dark Black Background */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-2xl p-6 mb-8 shadow-lg border border-gray-700"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  Process Highlights
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></span>
                    <span><strong className="text-white">24-48 Hour Deployment:</strong> Rapid workforce mobilization for urgent requirements</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></span>
                    <span><strong className="text-white">100% Compliance:</strong> Full documentation and statutory adherence</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></span>
                    <span><strong className="text-white">25,000+ Worker Pool:</strong> Pre-verified talent database across all categories</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></span>
                    <span><strong className="text-white">Ongoing Support:</strong> Dedicated account management and 24/7 assistance</span>
                  </li>
                </ul>
              </motion.div>

              {/* Workforce Categories - Fully Rounded 2D Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-4"
              >
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <div className="h-px w-8 bg-emerald-500"></div>
                  Complete Workforce Spectrum
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {workforceCategories.map((category, index) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                      className="flex items-center gap-2 bg-white rounded-full px-4 py-2.5 shadow-md border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-medium">{category}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Process Steps */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mt-8 lg:mt-0"
            >
              {/* Process Steps */}
              <div className="space-y-10 mt-14">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative pb-6 border-b border-gray-200 last:border-0"
                  >
                    {/* Step Number and Title on Same Line */}
                    <div className="flex items-start gap-5 mb-3">
                      {/* Step Number */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring", stiffness: 150 }}
                        className="flex-shrink-0"
                      >
                        <span className="text-4xl lg:text-5xl font-bold bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                          {step.step}
                        </span>
                      </motion.div>

                      {/* Title and Description */}
                      <div className="flex-1 pt-1">
                        <motion.h3
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                          className="text-lg lg:text-xl font-bold text-gray-900 mb-2"
                        >
                          {step.title}
                        </motion.h3>

                        {/* Description */}
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                          className="text-gray-600 text-xs lg:text-sm leading-relaxed"
                        >
                          {step.description}
                        </motion.p>
                      </div>
                    </div>

                    {/* Underline with gradient */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-emerald-300 to-transparent origin-left"
                    />

                    {/* Show arrow icon on last step */}
                    {index === processSteps.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.6, type: "spring" }}
                        className="mt-6 flex items-center gap-3"
                      >
                        <button className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 group">
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <span className="text-xs lg:text-sm font-semibold text-gray-700">Ready to get started?</span>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
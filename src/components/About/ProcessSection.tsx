import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Maximize2 } from 'lucide-react';

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
      description: "We understand your staffing needs, site conditions, and workforce specifications."
    },
    {
      step: "02",
      title: "Candidate Sourcing",
      description: "We tap into our verified pool of 25,000+ workers and recruit matching profiles."
    },
    {
      step: "03",
      title: "Verification & Training",
      description: "Background checks, police verification, and SOP-based training for your requirements."
    },
    {
      step: "04",
      title: "Deployment & Onboarding",
      description: "Trained workforce deployed to your site within 24-48 hours with full documentation."
    },
    {
      step: "05",
      title: "Management & Support",
      description: "Ongoing attendance, payroll, compliance, and performance management."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Side - Heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-24"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6"
            >
              Design
              <br />
              Process
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-600 text-lg leading-relaxed mb-8"
            >
              Our comprehensive workforce deployment process ensures quality, compliance, and rapid delivery.
            </motion.p>

            {/* Workforce Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-3"
            >
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Complete Workforce Spectrum
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {workforceCategories.map((category, index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{category}</span>
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
            className="relative"
          >

            {/* Process Steps */}
            <div className="space-y-16">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Step Number and Title on Same Line */}
                  <div className="flex items-baseline gap-8 mb-3">
                    {/* Step Number */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.2, type: "spring", stiffness: 150 }}
                      className="flex-shrink-0"
                    >
                      <span className="text-5xl lg:text-6xl font-bold text-gray-900">
                        {step.step}
                      </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                      className="text-xl lg:text-2xl font-bold text-gray-900 pt-2"
                    >
                      {step.title}
                    </motion.h3>
                  </div>

                  {/* Description - Smaller Text Below */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
                    className="pl-24"
                  >
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>

                  {/* Show arrow icon on last step */}
                  {index === processSteps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
                      className="mt-6 pl-24 inline-flex"
                    >
                      <button className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors duration-300 shadow-lg hover:scale-110 transition-transform">
                        <Maximize2 className="w-5 h-5" />
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
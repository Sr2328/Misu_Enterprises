import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileCheck, Calculator, ShieldCheck, Clock, Award, FileText, ChevronRight, CheckCircle } from "lucide-react";

const complianceItems = [
  { 
    id: 1,
    icon: FileCheck, 
    title: "Labour Law Compliance", 
    desc: "Contract Labour Act, Minimum Wages, Industrial Disputes",
    image: "/compliance-1.jpg",
    details: "Full compliance with all labour laws including Contract Labour Act, Minimum Wages Act, and Industrial Disputes Act. Our legal team ensures your workforce operations meet all statutory requirements."
  },
  { 
    id: 2,
    icon: Calculator, 
    title: "Statutory Benefits", 
    desc: "PF, ESI, Gratuity, Bonus Processing",
    image: "/compliance-2.jpg",
    details: "Complete management of statutory benefits including Provident Fund, ESI contributions, gratuity calculations, and timely bonus processing for all employees."
  },
  { 
    id: 3,
    icon: ShieldCheck, 
    title: "GST Billing", 
    desc: "Transparent, audit-ready invoicing",
    image: "/compliance-3.jpg",
    details: "100% GST-compliant billing with transparent, audit-ready invoices. All transactions are properly documented and tax-compliant for hassle-free audits."
  },
  { 
    id: 4,
    icon: CheckCircle, 
    title: "Background Verification", 
    desc: "Police verification & document validation",
    image: "/compliance-4.jpg",
    details: "Thorough background checks including police verification, document validation, and reference checks to ensure you get verified and trustworthy workforce."
  },
];

const slaItems = [
  { 
    id: 1,
    icon: Clock, 
    title: "24-48 Hour Deployment", 
    desc: "Trained workforce at your site quickly",
    image: "/sla-1.jpg",
    details: "Our extensive network allows us to deploy trained and verified workforce to your location within 24-48 hours of requirement confirmation."
  },
  { 
    id: 2,
    icon: Award, 
    title: "Quick Replacement", 
    desc: "24-hour replacement guarantee",
    image: "/sla-2.jpg",
    details: "If any worker is unsatisfactory or unavailable, we guarantee a replacement within 24 hours to ensure uninterrupted operations."
  },
  { 
    id: 3,
    icon: FileText, 
    title: "Monthly Reporting", 
    desc: "Transparent performance reports",
    image: "/sla-3.jpg",
    details: "Comprehensive monthly reports covering attendance, performance metrics, compliance status, and billing details for complete transparency."
  },
  { 
    id: 4,
    icon: ShieldCheck, 
    title: "Dedicated Support", 
    desc: "24/7 Account Manager assistance",
    image: "/sla-4.jpg",
    details: "Your dedicated account manager is available round the clock to address any concerns, handle escalations, and ensure smooth operations."
  },
];

export function ComplianceSection() {
  const [expandedCompliance, setExpandedCompliance] = useState(null);
  const [expandedSLA, setExpandedSLA] = useState(null);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* 100% Compliance Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-20 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-sm font-medium mb-4 w-fit">
              100% Compliance
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
             <span className="text-accent"> Zero Risk</span> Workforce Partnership
            </h2>
            <p className="text-gray-600 mb-8">
              Each entity is an agreement! Check out our upcoming match lineup today, updates in real game times, locations and opponents.
            </p>

            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <img 
                src="https://i.postimg.cc/13fm11Gw/4af3854892ab1be4dde3c1ad202c375a.jpg" 
                alt="Compliance" 
                className="w-full h-80 object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Right: List Items */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center space-y-3"
          >
            {complianceItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => setExpandedCompliance(expandedCompliance === item.id ? null : item.id)}
                  className="w-full bg-white rounded-xl p-4 border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <span className="text-2xl font-bold text-gray-300 group-hover:text-emerald-500 transition-colors">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="text-left">
                        <h4 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedCompliance === item.id ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600" />
                    </motion.div>
                  </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedCompliance === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-emerald-50 rounded-xl p-6 mt-3 border border-emerald-200">
                        <div className="flex gap-4">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-32 h-32 rounded-lg object-cover flex-shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center">
                                <item.icon className="w-5 h-5 text-white" />
                              </div>
                              <h5 className="font-bold text-gray-900">{item.title}</h5>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {item.details}
                            </p>
                            <button className="mt-4 px-4 py-2 bg-white border border-emerald-500 text-emerald-600 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Jump to Toggle */}
            <div className="flex justify-end pt-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                <span>Know more</span>
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-gray-900" />
                </div>
              </button>
            </div>
          </motion.div>
        </div>

        {/* SLA Commitments Section - Reversed Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: List Items */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center space-y-3 lg:order-2"
          >
            {slaItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => setExpandedSLA(expandedSLA === item.id ? null : item.id)}
                  className="w-full bg-white rounded-xl p-4 border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <span className="text-2xl font-bold text-gray-300 group-hover:text-emerald-500 transition-colors">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="text-left">
                        <h4 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedSLA === item.id ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600" />
                    </motion.div>
                  </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedSLA === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-emerald-50 rounded-xl p-6 mt-3 border border-emerald-200">
                        <div className="flex gap-4">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-32 h-32 rounded-lg object-cover flex-shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center">
                                <item.icon className="w-5 h-5 text-white" />
                              </div>
                              <h5 className="font-bold text-gray-900">{item.title}</h5>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {item.details}
                            </p>
                            <button className="mt-4 px-4 py-2 bg-white border border-emerald-500 text-emerald-600 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Jump to Toggle */}
            <div className="flex justify-end pt-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                <span>know more</span>
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-gray-900" />
                </div>
              </button>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center lg:order-1"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 text-sm font-medium mb-4 w-fit">
              SLA Commitments
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
              Service <span className="text-accent">Guarantees</span>
            </h2>
            <p className="text-gray-600 mb-8">
              Check out our upcoming match lineup today, updates in real game times, locations and opponents.
            </p>

            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <img 
                src="https://i.postimg.cc/13fm11Gw/4af3854892ab1be4dde3c1ad202c375a.jpg" 
                alt="SLA Commitments" 
                className="w-full h-80 object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
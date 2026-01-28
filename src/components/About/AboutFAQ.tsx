import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowRight } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0); // First question open by default

  const faqs = [
    {
      id: 1,
      question: "How does this work?",
      answer: "We begin by understanding your specific workforce requirements including skill levels, industry experience, and compliance needs. Our team then sources candidates from our verified database of 25,000+ workers, conducts thorough background checks, provides necessary training, and deploys them to your location within 24-48 hours with complete documentation and ongoing support."
    },
    {
      id: 2,
      question: "Are there any additional fees?",
      answer: "Our pricing is transparent and all-inclusive. The quoted rate covers recruitment, verification, training, compliance documentation, and ongoing management. There are no hidden charges. However, specialized training requirements or urgent deployments may incur additional costs, which will be communicated upfront before engagement."
    },
    {
      id: 3,
      question: "How can I get started with your services?",
      answer: "Getting started is simple! Contact us through our website, email, or phone. We'll schedule a consultation to understand your requirements, provide a customized proposal within 24 hours, and upon agreement, begin the deployment process immediately. Our dedicated account manager will guide you through every step."
    },
    {
      id: 4,
      question: "What types of workers do you provide?",
      answer: "We provide workforce across all levels - from top management and executives to skilled technicians, semi-skilled operators, security personnel, housekeeping staff, drivers, and support staff. Our diverse talent pool covers manufacturing, logistics, hospitality, healthcare, IT, and construction sectors with specialized expertise."
    },
    {
      id: 5,
      question: "What is your replacement policy?",
      answer: "If a deployed worker is unsuitable or leaves within the first 30 days, we provide a free replacement within 48 hours at no additional cost. We stand behind the quality of our workforce and ensure your operations continue smoothly without interruption or extra expenses."
    },
    {
  id: 6,
  question: "How do you ensure worker safety and compliance?",
  answer: "Worker safety and compliance are central to our process. Every worker undergoes mandatory safety training, identity verification, and compliance checks as per industry and statutory norms. We ensure adherence to labor laws, ESIC, PF, and workplace safety guidelines, along with regular monitoring to maintain a safe and compliant working environment."
}

  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Side - Heading & Description */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
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
                  FAQ
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Any questions?
                <br />
                <span className="text-emerald-600">We got you.</span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8 max-w-xl"
              >
                We're here to answer all your questions about our workforce solutions. From deployment timelines to pricing structures, find quick answers to the most common inquiries.
              </motion.p>

              {/* More FAQs Link */}
              <motion.a
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                href="/faq"
                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-base lg:text-lg group transition-colors mb-8"
              >
                More FAQs
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              {/* Still Have Questions Card - Dark Black BG */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-3xl p-6 lg:p-8 shadow-2xl border border-gray-700 max-w-xl"
              >
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
                  Still have questions?
                </h3>
                <p className="text-gray-400 mb-6 text-sm lg:text-base leading-relaxed">
                  Our team is here to help. Reach out to us for personalized assistance.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center gap-2 text-sm lg:text-base"
                  >
                    Contact Us
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 backdrop-blur-sm text-sm lg:text-base"
                  >
                    Schedule a Call
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - FAQ Accordion */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden"
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-5 lg:p-6 text-left group"
                  >
                    <span className={`font-semibold text-base lg:text-lg pr-4 transition-colors ${
                      openIndex === index ? 'text-emerald-600' : 'text-gray-900 group-hover:text-emerald-600'
                    }`}>
                      {faq.question}
                    </span>
                    
                    {/* Toggle Icon */}
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        openIndex === index 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-gray-100 text-gray-600 group-hover:bg-emerald-100 group-hover:text-emerald-600'
                      }`}
                    >
                      {openIndex === index ? (
                        <Minus className="w-5 h-5" />
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                    </motion.div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 lg:px-6 pb-5 lg:pb-6 pt-0">
                          <div className="h-px bg-gray-200 mb-4"></div>
                          <motion.p
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="text-gray-600 text-sm lg:text-base leading-relaxed"
                          >
                            {faq.answer}
                          </motion.p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
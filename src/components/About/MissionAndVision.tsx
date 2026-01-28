import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, ArrowRight } from 'lucide-react';

const MissionVisionSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      {/* Top Dark Card - Full Width */}
      <div className="mb-8 lg:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden relative"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 max-w-7xl mx-auto">
              {/* Left Side - Content */}
              <div className="py-8 lg:py-16 xl:py-20">
                {/* Tag */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-block mb-4 lg:mb-6"
                >
                  <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-semibold border border-emerald-500/30">
                    Our Purpose
                  </span>
                </motion.div>

                {/* Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 lg:mb-4 leading-tight"
                >
                  Connecting your workforce
                  <br />
                  <span className="text-emerald-400">with opportunities that matter</span>
                </motion.h2>

                {/* Subheading */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 lg:mb-8"
                >
                  Stay up to date on the progress of your workforce deployment and business growth
                </motion.p>

                {/* CTA Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              {/* Right Side - Rotating Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 0 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative h-full min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] flex items-center justify-center py-8 lg:py-16"
              >
                {/* Rotating Image with 360° Animation */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-md mx-auto"
                >
                  <img
                    src="https://i.postimg.cc/65LfXdpD/Chat-GPT-Image-Jan-27-2026-12-11-29-PM-(1).png"
                    alt="Workforce Solutions"
                    className="w-full h-auto drop-shadow-2xl"
                  />
                </motion.div>

                {/* Optional: Decorative elements */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-emerald-500/10 rounded-full blur-3xl -z-10"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Two Cards - Mission and Vision */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-5 sm:mb-6 shadow-md"
            >
              <Target className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" />
            </motion.div>

            {/* Content */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4"
            >
              Our Mission
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6"
            >
              To provide organizations with reliable, trained, and compliant workforce while creating dignified employment opportunities for workers — building a bridge between talent and opportunity that benefits both parties.
            </motion.p>

            {/* Learn More Link */}
            <motion.a
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              href="#"
              className="group inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors text-sm sm:text-base"
            >
              Learn More
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-5 sm:mb-6 shadow-md"
            >
              <Eye className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" />
            </motion.div>

            {/* Content */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4"
            >
              Our Vision
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6"
            >
              To be India's most trusted workforce solutions partner — known for ethical practices, operational excellence, and creating shared value for enterprises, workers, and society at large.
            </motion.p>

            {/* Learn More Link */}
            <motion.a
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              href="#"
              className="group inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors text-sm sm:text-base"
            >
              Learn More
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
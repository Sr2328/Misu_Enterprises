import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight,
  TrendingUp,
  Maximize2
} from 'lucide-react';

const IndustriesSection = () => {
  const stats = [
    { value: '450+', label: 'INDUSTRY PARTNERS' },
    { value: '25K', label: 'WORKERS PLACED' },
    { value: '98%', label: 'SATISFACTION RATE' },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-100 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Transparent Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            {/* Image Container with Equal Width and Height */}
            <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center">
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30"></div>
              
              {/* Main Image */}
              <motion.img
  src="https://i.postimg.cc/rw4JPvtW/unnamed-(28)-(1).png"
  alt="Industry Solutions"
  animate={{ 
    scale: [1, 1.08, 1] 
  }}
  transition={{
    duration: 4,        // smooth & premium
    repeat: Infinity,
    ease: "easeInOut"
  }}
  className="w-full h-full object-contain drop-shadow-2xl"
/>


              {/* Optional: Decorative Elements */}
              {/* <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-blue-200/40 rounded-full pointer-events-none"
              />
              
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[10%] border border-dashed border-purple-200/30 rounded-full pointer-events-none"
              /> */}
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 order-1 lg:order-2"
          >
            {/* Heading */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 leading-tight"
              >
                Easily find the workforce that{' '}
                <span className="text-emerald-600">helps you grow business</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-gray-600 text-base lg:text-lg leading-relaxed"
              >
                Stop spending countless hours finding qualified workers, validating credentials and background checks. We handle the heavy lifting for you. Your most extensive workforce database with:
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-3 gap-4 lg:gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="text-left"
                >
                  <p className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs lg:text-sm text-gray-500 font-medium uppercase tracking-wide">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button and Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex items-center gap-4 flex-wrap"
            >
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                Learn more
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Icon Buttons */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-emerald-500 hover:text-emerald-500 hover:bg-emerald-50 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Maximize2 className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-emerald-500 hover:text-emerald-500 hover:bg-emerald-50 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <TrendingUp className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection
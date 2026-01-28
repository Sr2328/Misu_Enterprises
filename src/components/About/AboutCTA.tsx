import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Handshake, Briefcase, ArrowRight } from 'lucide-react';
import ctaabout from '@/assets/ctaabout.mp4'



const CTASection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Background Video */}
          <div className="absolute inset-0 w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={ctaabout} type="video/mp4" />
            </video>
          </div>

          {/* Dark Gradient Overlay - Stronger on Left */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
          
          {/* Additional Vignette Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

          {/* Animated Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />

          {/* Content Container */}
          <div className="relative z-10 py-10 lg:py-14 px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              
              {/* Left Side - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-left"
              >
                {/* Tag */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="inline-block mb-3"
                >
                  <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-semibold border border-emerald-500/30 backdrop-blur-sm">
                    Get Started Today
                  </span>
                </motion.div>

                {/* Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
                >
                  Ready to Partner
                  <br />
                  <span className="text-emerald-400">With Us?</span>
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-sm lg:text-base text-gray-300 mb-6 leading-relaxed max-w-xl"
                >
                  Let's discuss how MISU Enterprises can solve your workforce challenges or help you find your next opportunity. Join thousands of satisfied clients and job seekers.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="group w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 text-sm lg:text-base"
                    >
                      <Handshake className="w-4 h-4 lg:w-5 lg:h-5" />
                      Hire Manpower
                      <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>

                  <Link to="/jobs">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto px-6 py-3 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/20 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm lg:text-base"
                    >
                      <Briefcase className="w-4 h-4 lg:w-5 lg:h-5" />
                      Apply for Jobs
                    </motion.button>
                  </Link>
                </motion.div>

                {/* Stats or Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="mt-6 pt-6 border-t border-white/10"
                >
                  <div className="grid grid-cols-3 gap-4 lg:gap-6">
                    <div>
                      <div className="text-xl lg:text-2xl font-bold text-emerald-400 mb-1">25K+</div>
                      <div className="text-xs text-gray-400">Workers</div>
                    </div>
                    <div>
                      <div className="text-xl lg:text-2xl font-bold text-emerald-400 mb-1">500+</div>
                      <div className="text-xs text-gray-400">Clients</div>
                    </div>
                    <div>
                      <div className="text-xl lg:text-2xl font-bold text-emerald-400 mb-1">24-48h</div>
                      <div className="text-xs text-gray-400">Deployment</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
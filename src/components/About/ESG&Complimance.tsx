import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Heart, Leaf, Award, TrendingUp } from 'lucide-react';

const ESGSection = () => {
  const esgPillars = [
    {
      id: 1,
      title: 'Worker Welfare',
      description: 'Ensuring fair wages, safe working conditions, and timely payments for all workers under our care.',
      icon: Heart,
      stats: '95% Satisfaction'
    },
    {
      id: 2,
      title: 'Compliance First',
      description: 'Full adherence to labor laws, statutory requirements, and industry best practices.',
      icon: Shield,
      stats: '100% Compliant'
    },
    {
      id: 3,
      title: 'Skill Development',
      description: 'Continuous training programs to enhance worker capabilities and career growth opportunities.',
      icon: TrendingUp,
      stats: '500+ Trained'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4 border border-emerald-200">
              ESG & Ethical Employment
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Responsible <span className="text-accent">Workforce</span> Partner
            </h2>
            <p className="text-gray-600 text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
              We believe in creating shared value for clients, workers, and society through ethical practices and sustainable workforce solutions.
            </p>
          </motion.div>

          {/* First Row - Wide Image Card + Stats Card */}
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Wide Image Card - 2/3 width */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2 relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group h-[300px] lg:h-[320px]"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: "url('https://i.postimg.cc/Y9SDjGgX/unnamed-(29).jpg?w=1200&h=600&fit=crop')"
                }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 via-black/85 to-transparent" />

              
              {/* Content */}
              <div className="relative h-full p-6 lg:p-8 flex flex-col justify-between">
                {/* Tag */}
                <div>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold border border-white/30">
                    Featured Initiative
                  </span>
                </div>

                {/* Main Content */}
                <div>
                  <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-3 leading-tight">
                    Individualized Approach
                    <br />
                    to Safety & Wellbeing
                  </h3>
                  <p className="text-white/95 text-sm lg:text-base max-w-xl leading-relaxed">
                    Every worker receives personalized attention, comprehensive safety training, and access to wellness programs ensuring their physical and mental health throughout their employment journey.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stats Card - 1/3 width */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-black rounded-3xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 h-[300px] lg:h-[320px] flex flex-col justify-between"
            >
              {/* Top Section */}
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-4 shadow-lg">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <p className="text-white/60 text-sm lg:text-base mb-2">
                  Training Programs Conducted
                </p>
              </div>

              {/* Large Number */}
              <div>
                <motion.h3 
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
                  className="text-6xl lg:text-7xl font-bold text-white/90 mb-2"
                >
                  60
                </motion.h3>
                <p className="text-emerald-600 font-semibold text-base lg:text-lg">
                  Training Sessions
                </p>
              </div>

              {/* Bottom Description */}
              <p className="text-white/50 text-xs lg:text-sm leading-relaxed">
                Comprehensive skill development programs covering technical training, safety protocols, and workplace ethics delivered monthly.
              </p>
            </motion.div>
          </div>

          {/* Second Row - Three Equal Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {esgPillars.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white rounded-3xl p-6 lg:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
              >
                {/* Icon */}
                <div className="relative mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <pillar.icon className="w-7 h-7 text-white" />
                  </div>
                  {/* Small decorative element */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-emerald-100 -z-10"></div>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Stats Badge */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-emerald-600 font-bold text-lg">
                    {pillar.stats}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Optional Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 mb-4">
              Learn more about our commitment to ethical employment
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
            >
              View Our ESG Report
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ESGSection;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Handshake, Users } from 'lucide-react';

const ValuesSection = () => {
  const [flipped, setFlipped] = useState(false);

  const values = [
    {
      id: 1,
      title: 'Excellence',
      description: 'We strive for excellence in every placement, ensuring quality workforce delivery.',
      icon: Award,
      backTitle: 'Integrity',
      backDescription: 'Transparent practices, honest dealings, and ethical employment for all.',
      backIcon: Shield,
      size: 'large' // 60%
    },
    {
      id: 2,
      title: 'Partnership',
      description: 'We become your extended HR team, not just another vendor.',
      icon: Handshake,
      size: 'small' // 20%
    },
    {
      id: 3,
      title: 'Diversity',
      description: 'Inclusive hiring practices celebrating workforce diversity.',
      icon: Users,
      size: 'small', // 20%
      hasImage: true,
      backgroundImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Top Row - Heading and Subheading */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-10 lg:mb-12">
            {/* Left - Heading */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4 border border-emerald-200">
                Our Values
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
               <span className="text-accent"> Core Values  </span>That
                <br />
                Define Us
              </h2>
            </motion.div>

            {/* Right - Subheading */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:pt-12"
            >
              <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                At Misu Enterprises, our values are the foundation of everything we do. From connecting skilled workers with meaningful employment to helping businesses thrive with reliable workforce solutions, we are driven by principles that ensure success for all stakeholders.
              </p>
            </motion.div>
          </div>

          {/* Bottom Row - Value Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Large Card - 55% (5.5 columns out of 12) - Flippable */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 h-[320px] lg:h-[340px] perspective-1000"
            >
              <motion.div
                className="relative w-full h-full cursor-pointer preserve-3d"
                onClick={() => setFlipped(!flipped)}
                whileHover={{ scale: 1.02 }}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front Side - Excellence */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden rounded-3xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 p-6 lg:p-8 flex flex-col justify-between shadow-xl"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                      <Award className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                      Excellence
                    </h3>
                    <p className="text-white/95 text-sm lg:text-base leading-relaxed">
                      We strive for excellence in every placement, ensuring quality workforce delivery. Our commitment to superior service means we thoroughly vet, train, and support every worker we place, ensuring they meet and exceed your expectations. Excellence isn't just a goal—it's our standard.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-xs lg:text-sm">
                    <span>Click to flip</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                </div>

                {/* Back Side - Integrity */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 lg:p-8 flex flex-col justify-between shadow-xl"
                  style={{ 
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)"
                  }}
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 backdrop-blur-sm flex items-center justify-center mb-4 border border-emerald-500/30">
                      <Shield className="w-7 h-7 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                      Integrity
                    </h3>
                    <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                      Transparent practices, honest dealings, and ethical employment for all. We believe in building trust through transparency, maintaining the highest ethical standards in every transaction, and ensuring fair treatment for both employers and job seekers. Your trust is our most valued asset.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs lg:text-sm">
                    <span>Click to flip back</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Small Card 1 - Partnership */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="lg:col-span-2 h-[320px] lg:h-[340px] bg-white rounded-3xl p-5 lg:p-6 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-4">
                  <Handshake className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
                  Partnership
                </h3>
                <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                  We become your extended HR team, not just another vendor.
                </p>
              </div>
              <div className="mt-auto pt-4">
                <div className="h-1 w-12 bg-emerald-500 rounded-full"></div>
              </div>
            </motion.div>

            {/* Small Card 2 - Diversity with Background Image */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="lg:col-span-3 h-[320px] lg:h-[340px] rounded-3xl overflow-hidden relative shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Background Image with Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ 
                  backgroundImage: `url(${values[2].backgroundImage})`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
              
              {/* Content */}
              <div className="relative h-full p-5 lg:p-6 flex flex-col justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Users className="w-6 h-6 text-white" />
                </div>
                
                <div>
                  <h3 className="text-lg lg:text-xl font-bold text-white mb-2">
                    Diversity
                  </h3>
                  <p className="text-gray-200 text-xs lg:text-sm leading-relaxed">
                    Inclusive hiring practices celebrating workforce diversity. We embrace talent from all backgrounds, creating opportunities that respect individual strengths while fostering a culture of equality and inclusion in every placement.
                  </p>
                  <div className="mt-3">
                    <div className="h-1 w-12 bg-emerald-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
};

export default ValuesSection;
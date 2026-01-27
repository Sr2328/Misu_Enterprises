import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Building2, Star, TrendingUp } from 'lucide-react';

const StatsSection = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y }}
          className="absolute top-20 right-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-20"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Main Layout: 70% Left Content + 30% Right Black Card */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          {/* Left Side - 70% Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Heading Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-emerald-500 uppercase tracking-wide text-sm font-semibold mb-4"
              >
                OUR MISSION
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6"
              >
                <span className="text-gray-900">Our focus is simple</span>
                <br />
                <span className="text-accent">Design to convert</span>
              </motion.h2>
            </motion.div>

            {/* Subheading - Aligned with black card height */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:pr-8"
            >
              <p className="text-gray-600 text-lg leading-relaxed">
                We promise to deliver beyond your expectations for your business through reliable manpower solutions and sustainable employment opportunities.
              </p>
            </motion.div>

            {/* Stats Grid - First 3 cards */}
            <div className="grid md:grid-cols-3 gap-6 pt-16">
              {/* Stat 1 - Partners/Clients with avatars */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                {/* Avatar Group */}
                <div className="flex items-center mb-4">
                  <div className="flex -space-x-3">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 border-2 border-white"
                    />
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 border-2 border-white"
                    />
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-white"
                    />
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 border-2 border-white flex items-center justify-center"
                    >
                      <Building2 className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                </div>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="text-xs text-gray-500 font-semibold uppercase tracking-wider block mb-3"
                >
                  450+ PARTNERS
                </motion.span>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="text-gray-700 text-sm leading-relaxed"
                >
                  Trusted by leading companies across industries
                </motion.p>
              </motion.div>

              {/* Stat 2 - Large Number with description */}
            <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, delay: 0.4 }}
  whileHover={{ y: -5, transition: { duration: 0.3 } }}
  className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
>
  <motion.p
    initial={{ opacity: 0, y: -10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.6 }}
    className="text-gray-700 mb-4 text-lg leading-relaxed"
  >
    Built on a client-first approach focused on long-term partnerships
  </motion.p>

  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.7 }}
    className="mb-4"
  >
    <motion.h3
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="text-5xl lg:text-6xl font-bold text-black mb-2"
    >
      98
      <span className="text-3xl text-gray-400">%</span>
    </motion.h3>

    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.9 }}
      className="text-gray-500 text-xs font-medium"
    >
      Client Orientation & Satisfaction
    </motion.p>
  </motion.div>
</motion.div>


              {/* Stat 3 - Workers Placed */}
             <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, delay: 0.5 }}
  whileHover={{ y: -5, transition: { duration: 0.3 } }}
  className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
>
  <motion.p
    initial={{ opacity: 0, y: -10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.7 }}
    className="text-gray-700 mb-4 text-sm leading-relaxed"
  >
    Building long-term partnerships through consistent service and reliability
  </motion.p>

  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.8 }}
  >
    <motion.h3
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.9 }}
      className="text-5xl lg:text-6xl font-bold text-black mb-1"
    >
      15<span className="text-5xl text-gray-900">+</span>
       <span className="text-3xl text-gray-400"> Years</span>
    </motion.h3>

    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 1 }}
      className="text-gray-500 text-xs font-medium mb-3"
    >
      Of Trust & Industry Experience
    </motion.p>
  </motion.div>

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 1.1 }}
    className="flex items-center gap-2 text-xs"
  >
    <div className="w-2 h-2 rounded-full bg-green-500"></div>
    <span className="text-gray-600 uppercase font-medium tracking-wide">
      Trusted Since 2009
    </span>
  </motion.div>
</motion.div>

            </div>
          </div>

          {/* Right Side - 30% Black Card with Height */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
            className="lg:col-span-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-8 shadow-2xl border border-gray-700 relative overflow-hidden flex flex-col justify-between min-h-[500px] lg:min-h-[600px]"
          >
            {/* Background pattern */}
           <div className="absolute inset-0 opacity-10">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-center bg-no-repeat bg-cover"
    style={{
      backgroundImage: "url('https://i.postimg.cc/sXRyddXX/gym-fitness-(Poster).png')",
    }}
  />

  {/* Gradient Blob (on top of image) */}
  {/* <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full blur-3xl" /> */}
</div>

            {/* Trending Icon - Bottom Left Corner */}
            {/* <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="absolute bottom-0 left-0 pointer-events-none"
            >
              <TrendingUp 
                className="w-48 h-48 lg:w-56 lg:h-56 text-emerald-400/20" 
                strokeWidth={1.5} 
              />
            </motion.div> */}

            <div className="relative z-10 flex-1 flex flex-col justify-between">
              {/* Top Content */}
              <div>
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-gray-300 mb-5 leading-relaxed text-lg font-medium"
                >
                  Numbers That Prove Performance
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-gray-300 mb-8 leading-relaxed text-base"
                >
                At Misu Enterprises, results are driven by reliability, scale, and performance. Trusted by 450+ partner organizations, we deliver customized manpower solutions that improve efficiency, reduce hiring friction, and generate rapid, measurable ROI across industries.
                </motion.p>
              </div>

              {/* Bottom Content - Rating */}
              <div className="pb-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.7 }}
                  className="flex items-end justify-between"
                >
                  <div>
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="text-6xl lg:text-7xl font-bold text-white mb-1"
                    >
                      4.8
                      <span className="text-3xl text-gray-400">/5</span>
                    </motion.h3>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="text-right"
                  >
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 1 + i * 0.1 }}
                        >
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.5 }}
                      className="text-gray-400 text-xs uppercase tracking-wide"
                    >
                      Trusted by<br />clients worldwide
                    </motion.p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
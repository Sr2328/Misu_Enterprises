import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, CheckCircle2 } from 'lucide-react';

const ServingTwoWorldsSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header Row - Heading Left, Subheading Right */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold">
              Serving{' '}
              <span className="text-gradient">Two Worlds</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center"
          >
            <p className="text-lg text-muted-foreground">
              We bridge the gap between organizations seeking manpower and individuals seeking meaningful employment.
            </p>
          </motion.div>
        </div>

        {/* Full Width Container - Black Background with Image Left, Content Right */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-black rounded-3xl overflow-hidden mb-8"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Side - Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative h-[400px] lg:h-[500px] overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop"
                alt="Business team collaboration"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="p-8 lg:p-12 flex flex-col justify-center text-white"
            >
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-3xl lg:text-4xl font-bold mb-6"
              >
                For Industries & Organizations
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-gray-300 mb-8 text-lg leading-relaxed"
              >
                End-to-end manpower solutions with 100% compliance, rapid deployment, and dedicated account management. We handle HR so you can focus on core business.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm">Quick 24-48 hr deployment</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm">Complete compliance handling</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm">SLA-backed service guarantees</span>
                </div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors w-fit"
              >
                Learn More →
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Container - 40% Emerald Text Left, 60% Image Right */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* 40% Left - Emerald Background with Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-2 bg-emerald-600 rounded-3xl p-8 lg:p-10 flex flex-col justify-center"
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-3xl lg:text-4xl font-bold text-white mb-6"
            >
              For Job Seekers
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-emerald-50 text-lg leading-relaxed mb-6"
            >
              Verified job opportunities with fair wages, safe working conditions, and career growth. We've helped 25,000+ workers find stable employment.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="space-y-3"
            >
              {["Verified employers only", "Fair wages & timely payments", "Free skill development training"].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  className="flex items-center gap-3 text-white"
                >
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-colors w-fit"
            >
              Find Jobs
            </motion.button>
          </motion.div>

          {/* 60% Right - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-3 relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&h=600&fit=crop"
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
            {/* Overlay gradient for better text readability if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>
        </div>

        {/* Original Two Cards Section */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-16">
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-background rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-shadow"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6"
            >
              <Building2 className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-3">For Industries & Organizations</h3>
            <p className="text-muted-foreground mb-6">
              End-to-end manpower solutions with 100% compliance, rapid deployment, and dedicated account management. We handle HR so you can focus on core business.
            </p>
            <ul className="space-y-2">
              {["Quick 24-48 hr deployment", "Complete compliance handling", "SLA-backed service guarantees"].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div> */}

          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-background rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-shadow"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6"
            >
              <Users className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-3">For Job Seekers</h3>
            <p className="text-muted-foreground mb-6">
              Verified job opportunities with fair wages, safe working conditions, and career growth. We've helped 25,000+ workers find stable employment.
            </p>
            <ul className="space-y-2">
              {["Verified employers only", "Fair wages & timely payments", "Free skill development training"].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
};

export default ServingTwoWorldsSection;
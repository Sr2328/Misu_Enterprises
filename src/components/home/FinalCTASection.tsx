import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Briefcase, Handshake, Phone, Mail } from "lucide-react";

export default function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref} 
      className="relative py-16 lg:py-20 overflow-hidden"
      style={{
        backgroundImage: "url('https://i.postimg.cc/d0b580H6/1bf27f59254f0c21662d00f1dd1d7784.jpg?w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/85 to-black/80"></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0IiBmaWxsPSIjZW1lcmFsZCIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30"></div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block mb-6"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-semibold backdrop-blur-sm">
              Let's Get Started
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
          >
            Ready to Build Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
              Dream Workforce
            </span>
            ?
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Whether you need manpower for your organization or you're looking for your next job opportunity — we're here to help you succeed.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          >
            <button className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-emerald-50 transition-all duration-300 shadow-2xl hover:shadow-emerald-500/20 hover:scale-105">
              <Handshake className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Hire Manpower
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/40 hover:border-emerald-400 hover:bg-emerald-500/10 transition-all duration-300 backdrop-blur-sm">
              <Briefcase className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              Apply for Jobs
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-300"
          >
            <a 
              href="tel:+919876543210" 
              className="group flex items-center gap-3 hover:text-emerald-400 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors duration-300">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-base font-medium">+91 9540603737</span>
            </a>
            
            <span className="hidden sm:block w-px h-8 bg-white/20"></span>
            
            <a 
              href="mailto:info@misuenterprises.com" 
              className="group flex items-center gap-3 hover:text-emerald-400 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors duration-300">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-base font-medium">info@misuenterprises.com</span>
            </a>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 pt-6 border-t border-white/10"
          >
            <p className="text-sm text-gray-400">
              Trusted by <span className="text-emerald-400 font-semibold">500+ companies</span> across India
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
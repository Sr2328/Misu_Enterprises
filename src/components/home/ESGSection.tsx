import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Leaf, Heart, Scale, Users } from "lucide-react";

const esgPillars = [
  {
    icon: Heart,
    value: "8+",
    label: "years",
    description: "Delivering employment solutions and workforce management.",
  },
  {
    icon: Scale,
    value: "120+",
    label: "clients",
    description: "Trusted by leading companies for ethical recruitment.",
  },
  {
    icon: Users,
    value: "35+",
    label: "happy clients",
    description: "Long-term partnerships built on trust and results.",
  },
  {
    icon: Leaf,
    value: "99%",
    label: "satisfaction",
    description: "Consistently deliver quality workforce solutions.",
  }
];

export default function ESGSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Header - Top Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-2xl"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-sm font-medium mb-4 border border-emerald-500/20">
            ESG & Ethics
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Responsible <span className="text-emerald-600">Employment</span> Partner
          </h2>
          <p className="text-lg text-gray-600">
            We believe in creating shared value — for clients, workers, and society. Our ESG practices reflect our commitment to ethical business.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Flip Card - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 h-[500px] perspective-1000"
          >
            <div 
              className="relative w-full h-full transition-transform duration-700 preserve-3d"
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
              }}
            >
              {/* Front Side - Image Only */}
              <div 
                className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden shadow-2xl"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div 
                  className="w-full h-full relative"
                  style={{
                    backgroundImage: "url('https://i.postimg.cc/mZSdKBp8/unnamed-(26).jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                >
                  {/* Light overlay for better visibility */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/30"></div>
                  
                  {/* Learn More Button */}
                  <div className="absolute bottom-8 left-8 right-8 z-10">
                    <button 
                      onClick={handleFlip}
                      className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      Learn More
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Back Side - Content */}
              <div 
                className="absolute inset-0 backface-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-black to-gray-800 p-8 lg:p-10 shadow-2xl overflow-auto"
                style={{ 
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)"
                }}
              >
                <div className="h-full flex flex-col">
                  <div className="flex-1">
                    <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-6">
                      <span className="text-emerald-400 text-xs font-semibold">Pro Backed Goal</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                      Fair Employment & Ethical Practices
                    </h3>
                    
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                      We ensure fair wages, timely payments, and dignified working conditions for all workers. Zero tolerance for exploitation with full compliance to labour laws.
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <p className="text-emerald-400 text-sm">100% Compliant Operations</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <p className="text-emerald-400 text-sm">Fair Wages & Benefits</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <p className="text-emerald-400 text-sm">Worker Skill Development</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <button 
                      onClick={handleFlip}
                      className="text-white hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 text-sm font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                      </svg>
                      Go Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side Stats Cards */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-4 lg:gap-6">
            {esgPillars.map((pillar, index) => (
              <motion.div
                key={pillar.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group relative bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-emerald-50/0 group-hover:from-emerald-50/50 group-hover:to-transparent rounded-2xl transition-all duration-300"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300">
                    <pillar.icon className="w-6 h-6 text-emerald-600" />
                  </div>

                  {/* Value */}
                  <div className="mb-2">
                    <span className="text-3xl lg:text-4xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                      {pillar.value}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">{pillar.label}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Hover border effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-emerald-500/20 transition-all duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
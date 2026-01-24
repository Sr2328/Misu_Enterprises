import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Crown, Users, Wrench, HardHat, Shield, Sparkles, Briefcase, UserCheck } from "lucide-react";

const leftCategories = [
  {
    icon: Crown,
    title: "Top Management",
    examples: "Plant Heads, Operations Managers, HR Heads, Finance Controllers",
    level: "Executive"
  },
  {
    icon: UserCheck,
    title: "Supervisors",
    examples: "Line Supervisors, Shift Leads, Team Leaders, Quality Heads",
    level: "Supervisory"
  },
  {
    icon: Wrench,
    title: "Skilled Workers",
    examples: "Machine Operators, Electricians, Fitters, Technicians, Welders",
    level: "Technical"
  },
  {
    icon: HardHat,
    title: "Semi-Skilled Staff",
    examples: "Assembly Workers, Packers, Helpers, Data Entry Operators",
    level: "Operational"
  }
];

const rightCategories = [
  {
    icon: Users,
    title: "Unskilled Labour",
    examples: "Loaders, Helpers, Cleaners, Support Staff, General Workers",
    level: "Support"
  },
  {
    icon: Shield,
    title: "Security Services",
    examples: "Security Guards, Supervisors, Gunmen, Fire Marshals, CCTV Operators",
    level: "Security"
  },
  {
    icon: Sparkles,
    title: "Housekeeping",
    examples: "Cleaners, Janitors, Pest Control, Waste Management Staff",
    level: "Facility"
  },
  {
    icon: Briefcase,
    title: "Facility Staff",
    examples: "Pantry Boys, Drivers, Gardeners, Electricians, Plumbers",
    level: "Support"
  }
];

export default function ManpowerCategoriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-gradient-to-b from-black via-zinc-900 to-black">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-medium mb-4">
            Workforce Categories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Complete <span className="text-gradient">Manpower Spectrum</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            From C-suite executives to ground-level support staff — we cover every workforce need under one roof.
          </p>
        </motion.div>

        {/* Main Layout: Left Categories + Center Image + Right Categories */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: 4 Category Cards */}
          <div className="lg:col-span-3 flex flex-col justify-between h-full space-y-4">
            {leftCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                className="group relative bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl p-5 shadow-lg hover:shadow-2xl border border-zinc-700 transition-all duration-300 hover:-translate-y-2 flex-1"
              >
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-medium text-zinc-400 bg-zinc-800 px-2 py-1 rounded-full">
                    {category.level}
                  </span>
                </div>
                
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                
                <h3 className="text-base font-semibold mb-2 text-white">{category.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{category.examples}</p>
              </motion.div>
            ))}
          </div>

          {/* Center: Image and Text Section */}
          <div className="lg:col-span-6 flex flex-col items-center justify-start pt-6">
            {/* Image Section - With white shadowish container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { 
                opacity: 1, 
                y: [0, -15, 0],
              } : {}}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.3 },
                y: { 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }
              }}
              className="relative w-full max-w-md mb-8 bg-white rounded-3xl shadow-2xl p-1"
            >
              {/* Image */}
              <img 
                src="https://i.postimg.cc/L8QCbM2F/Scalable-manpower-solution-in-action.png?w=600&h=600&fit=crop" 
                alt="Team collaboration and workforce management"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </motion.div>
            
            {/* Text Section - Separate from image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-full max-w-2xl px-8"
            >
              <p className="text-sm text-zinc-300 leading-relaxed text-center">
                <span className="font-bold text-gradient">Misu Enterprises</span> provides <span className="font-bold text-gradient">comprehensive manpower solutions</span> across all organizational levels. From <span className="font-bold text-gradient">executive leadership</span> to <span className="font-bold text-gradient">ground-level support</span>, we deliver <span className="font-bold text-gradient">qualified professionals</span> tailored to your industry needs with <span className="font-bold text-gradient">guaranteed compliance</span> and <span className="font-bold text-gradient">operational excellence</span>.
              </p>
            </motion.div>
          </div>

          {/* Right Side: 4 Category Cards */}
          <div className="lg:col-span-3 flex flex-col justify-between h-full space-y-6">
            {rightCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.15, ease: "easeOut" }}
                className="group relative bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl p-5 shadow-lg hover:shadow-2xl border border-zinc-700 transition-all duration-300 hover:-translate-y-2 flex-1"
              >
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-medium text-zinc-400 bg-zinc-800 px-2 py-1 rounded-full">
                    {category.level}
                  </span>
                </div>
                
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                
                <h3 className="text-base font-semibold mb-2 text-white">{category.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{category.examples}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .text-gradient {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  );
}
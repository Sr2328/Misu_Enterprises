import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp } from "lucide-react";

const benefits = [
  {
    percentage: "70%",
    title: "Faster Processing",
    description: "Reduce hiring time from months to weeks, significantly streamlining critical project timelines"
  },
  {
    percentage: "100%",
    title: "Compliance",
    description: "Full regulatory adherence to all procurement regulations and labor compliance laws"
  },
  {
    percentage: "40%",
    title: "Cost Reduction",
    description: "Reduction in administrative costs by automating burden and eliminating unnecessary overhead"
  },
  {
    percentage: "85%",
    title: "Transparent Tracking",
    description: "Real-time workforce management and resource tracking based on performance data"
  },
];

const industries = [
  "Manufacturing",
  "Corporate Offices",
  "Warehouses",
  "Healthcare",
  "Retail Outlets",
  "Residential Societies"
];

export default function IndustrySolutionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
        
        {/* Top Section: Header + Image */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-12">
          {/* Left: Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Our Solutions
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Industry-Wise Manpower Solution:{" "}
              <span className="text-gradient">Quantifiable Impact</span> & Benefits
            </h2>
          </motion.div>

          {/* Right: Image - Same height as heading */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden shadow-lg h-[180px]"
          >
            <img 
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=300&fit=crop" 
              alt="Professional consultation"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Middle Section: Benefits Grid (4 cards on left) + Feature Cards (right) */}
        <div className="grid lg:grid-cols-12 gap-5 lg:gap-6">
          
          {/* Left Side: 4 Benefit Cards (2x2 grid) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-5 rounded-xl shadow-lg border border-border/50 hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-3xl md:text-4xl font-bold text-foreground">
                    {benefit.percentage}
                  </div>
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-base mb-2 text-foreground">{benefit.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right Side: Feature Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-5 gap-4 lg:gap-5">
            
            {/* Dark Card with Industries - Wider */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="sm:col-span-2 bg-zinc-900 text-background p-6 rounded-xl shadow-xl h-full flex flex-col justify-center"
            >
              <h3 className="font-bold text-lg mb-4 leading-tight">
                Core Industries
              </h3>
              <ul className="space-y-3">
                {industries.map((industry, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-base">
                    <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span className="opacity-90">{industry}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Two Highlight Cards - Narrower, Emerald bg */}
            <div className="sm:col-span-3 grid grid-cols-1 gap-4 lg:gap-5">
              
              {/* Construction Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-emerald-500 text-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col justify-center"
              >
                <h3 className="font-bold text-lg mb-2 leading-tight">
                  Construction
                </h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  Skilled labor and tradespeople for construction sites with safety certifications and project-based hiring solutions
                </p>
              </motion.div>

              {/* Startups Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-emerald-500 text-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col justify-center"
              >
                <h3 className="font-bold text-lg mb-2 leading-tight">
                  Startups
                </h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  Agile workforce solutions for growing businesses with scalable teams, cost-effective hiring, and rapid onboarding
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12 lg:mt-16"
        >
          <button 
            className="bg-foreground hover:bg-foreground/90 text-background px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
            onClick={() => window.location.href = '/contact'}
          >
            Get Custom Solution
          </button>
        </motion.div>
      </div>

      <style>{`
        .text-gradient {
          background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  );
}
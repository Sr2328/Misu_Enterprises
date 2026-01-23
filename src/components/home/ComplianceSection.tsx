
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileCheck, Calculator, Shield, Laptop, CheckCircle2, ArrowRight } from "lucide-react";

const mainFeature = {
  icon: Shield,
  title: "Zero Risk Workforce Partnership",
  description: "We handle all statutory compliance and use technology to ensure transparency, efficiency, and peace of mind. Complete protection for your organization.",
  value: "100%",
  label: "Compliant",
  image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop"
};

const complianceItems = [
  {
  icon: FileCheck,
  title: "Labour Law Compliance",
  items: [
    "Minimum Wages Act adherence",
    "Contract Labour Act registration",
    "Shops & Establishment Act",
    "Industrial Disputes Act",
    "Timely labour license renewals",
    "Audit-ready documentation & records"
  ]
},
{
  icon: Calculator,
  title: "Statutory Benefits",
  items: [
    "Provident Fund (PF) management",
    "ESI coverage for all workers",
    "Gratuity & bonus processing",
    "Leave encashment",
    "Monthly statutory filings & returns",
    "Wage structuring & compliance support"
  ]
},

  {
    icon: Laptop,
    title: "Tech-Enabled Operations",
    items: [
      "Biometric attendance tracking",
      "Automated payroll processing",
      "Real-time reporting dashboard",
      "Mobile app for workers"
    ],
    isDark: true
  }
];

export default function FeaturesGridSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 md:py-16 lg:py-20 bg-card">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 lg:mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Compliance & Technology
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient">Zero Risk</span> Workforce Partnership
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We handle all statutory compliance and use technology to ensure transparency, efficiency, and peace of mind.
          </p>
        </motion.div>

        {/* Main Feature Card - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden shadow-xl mb-6 lg:mb-8"
        >
          {/* Background Image */}
          <div className="relative h-[350px] lg:h-[400px]">
            <img 
              src={mainFeature.image}
              alt={mainFeature.title}
              className="w-full h-full object-cover"
            />
            {/* Black Gradient Overlay - Left Side */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center p-6 lg:p-12 max-w-2xl">
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-6">
              <mainFeature.icon className="w-7 h-7 text-white" />
            </div>
            
            <h3 className="text-2xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              {mainFeature.title}
            </h3>
            
            <p className="text-sm lg:text-lg text-white/90 mb-6 leading-relaxed">
              {mainFeature.description}
            </p>

            <div className="inline-flex items-baseline gap-2">
              <span className="text-4xl lg:text-5xl font-bold text-white">
                {mainFeature.value}
              </span>
              <span className="text-xl lg:text-2xl text-white/90">
                {mainFeature.label}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Three Cards Row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          
          {complianceItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className={`rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl ${
                item.isDark ? 'bg-foreground text-background' : 'bg-background'
              }`}
            >
              <div className="p-5 lg:p-6 flex flex-col">
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    item.isDark ? 'bg-primary' : 'gradient-primary'
                  }`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${item.isDark ? 'text-background' : 'text-foreground'}`}>
                      {item.title}
                    </h3>
                  </div>
                </div>
                
                <ul className="space-y-2.5 flex-1">
                  {item.items.map((point) => (
                    <li key={point} className={`flex items-start gap-2.5 text-sm ${
                      item.isDark ? 'text-background/80' : 'text-muted-foreground'
                    }`}>
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        item.isDark ? 'text-primary' : 'text-primary'
                      }`} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {item.isDark && (
                  <button 
                    className="mt-5 px-6 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-white text-sm font-medium transition-all duration-300 inline-flex items-center justify-center gap-2 w-full"
                    onClick={() => window.location.href = '/services'}
                  >
                    Explore More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .text-gradient {
          background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gradient-primary {
          background: linear-gradient(135deg, #14b8a6 0%, #10b981 100%);
        }
      `}</style>
    </section>
  );
}
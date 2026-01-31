import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const benefits = [
  {
    title: "100% Compliance",
    stat: "100%",
    description: "All statutory compliance handled — PF, ESI, labour laws, GST billing. Zero risk for your organization.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
    badge: "Compliance"
  },
  {
    title: "Rapid Deployment",
    stat: "24-48 Hrs",
    description: "Get trained manpower deployed to your site within 24-48 hours of requirement confirmation.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop",
    badge: "Speed"
  }
];

const services = [
  {
    stat: "500+",
    title: "Partnership Approach",
    description: "We're not just a vendor — we become your workforce partner with dedicated account management.",
    isDark: true
  },
  {
    stat: "Since 2008",
    title: "15+ Years Trust",
    description: "Serving enterprises, SMEs, and MSMEs since 2008 with consistent quality and reliability."
  },
  {
    stat: "25K+",
    title: "25,000+ Workforce",
    description: "Large pool of trained, verified, and ready-to-deploy workers across all categories."
  },
  {
    stat: "Pan India",
    title: "Pan-India Presence",
    description: "Operations across major industrial hubs with local teams ensuring seamless execution.",
    isDark: true
  }
];

export default function WhyChooseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
        
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 lg:mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Why Choose <span className="text-gradient">MISU Enterprises</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Built on trust, reliability, and 15+ years of excellence in workforce solutions
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Left Column */}
          <div className="space-y-6">
            
            {/* Benefit Cards */}
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group relative bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="grid sm:grid-cols-2 gap-0">
                  
                  {/* Image */}
                  <div className="relative h-48 sm:h-auto overflow-hidden">
                    <img 
                      src={benefit.image}
                      alt={benefit.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-full bg-primary/90 text-white text-xs font-medium backdrop-blur-sm">
                        {benefit.badge}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col justify-center bg-primary/5">
                    <div className="text-2xl font-bold text-primary mb-2">
                      {benefit.stat}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Two Equal Bottom Cards */}
            <div className="grid grid-cols-2 gap-4 lg:gap-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-card rounded-2xl p-5 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-2xl font-bold text-primary mb-2">
                  500+
                </div>
                <h3 className="text-base font-bold mb-2 text-foreground">
                  Partner Companies
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Trusted by leading enterprises across sectors nationwide.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-card rounded-2xl p-5 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-2xl font-bold text-primary mb-2">
                  24/7
                </div>
                <h3 className="text-base font-bold mb-2 text-foreground">
                  Support Available
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Round-the-clock support and dedicated account managers.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            
            {/* Large Image Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-2xl overflow-hidden shadow-lg h-64 lg:h-80"
            >
              <img 
                src="https://i.postimg.cc/3wTK6Myj/Chat-GPT-Image-Jan-30-2026-10-43-52-AM.png?w=800&h=700&fit=crop"
                alt="MISU team collaboration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Trusted Workforce Partner</h3>
                <p className="text-sm opacity-90">Delivering excellence since 2008</p>
              </div>
            </motion.div>

            {/* Services List Card - UPDATED */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-card rounded-2xl p-5 shadow-lg border border-border/50"
            >
              <h3 className="text-lg font-bold mb-4 text-foreground">
                What Makes Us Different
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.08 }}
                    className={`rounded-lg p-3.5 shadow-lg hover:shadow-xl transition-all duration-300 ${
                      service.isDark 
                        ? "bg-foreground text-background" 
                        : "bg-emerald-500 text-white"
                    }`}
                  >
                    <div className="text-left">
                      <div className={`text-lg font-bold mb-1 ${
                        service.isDark ? "text-primary" : "text-white"
                      }`}>
                        {service.stat}
                      </div>

                      <h4 className="text-sm font-semibold mb-1.5 leading-tight">
                        {service.title}
                      </h4>

                      <p className="text-[11px] opacity-85 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button 
            className="bg-foreground hover:bg-foreground/90 text-background px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg inline-flex items-center gap-2"
            onClick={() => window.location.href = '/contact'}
          >
            Partner With Us Today <ArrowRight className="w-5 h-5" />
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
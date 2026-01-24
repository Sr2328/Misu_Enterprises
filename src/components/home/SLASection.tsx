import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Clock, RefreshCw, FileCheck, Headphones, CheckCircle2 } from "lucide-react";

const slaCommitments = [
  {
    icon: Clock,
    title: "24-48 Hour Deployment",
    description: "Trained workforce deployed to your site within 24-48 hours of requirement confirmation.",
    commitment: "Guaranteed"
  },
  {
    icon: RefreshCw,
    title: "Quick Replacement",
    description: "If any worker doesn't meet standards, we provide replacement within 24 hours at no extra cost.",
    commitment: "24 Hours"
  },
  {
    icon: FileCheck,
    title: "Monthly Reports",
    description: "Detailed monthly reports on attendance, performance, and compliance for complete transparency.",
    commitment: "Every Month"
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "24/7 helpdesk support with dedicated account manager for seamless coordination.",
    commitment: "24/7 Available"
  }
];

export function SLASection() {
  const ref = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Parallax effect for image
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            SLA Commitments
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Service <span className="text-gradient">Guarantees</span> You Can Trust
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We back our promises with Service Level Agreements. If we don't deliver, you don't pay.
          </p>
        </motion.div>

        {/* SLA Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left Section - Large Image with Content */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Image Container */}
           <div className="relative h-full min-h-[400px] rounded-3xl overflow-hidden shadow-xl">
              <motion.div
                style={{ y: imageY, scale: imageScale }}
                className="absolute inset-0 w-full h-full"
              >
                <img 
                  src="https://i.postimg.cc/wj3mnrp8/b6832635c5e8b65e4365204d7422943a.jpg" 
                  alt="Professional team collaboration"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
              
              {/* Gradient Overlay - Light at top, Heavy at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5 pointer-events-none" />
              
              {/* Overlay Content */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute bottom-0 left-0 right-0 p-8 lg:p-10"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">100% SLA Guarantee</span>
                </motion.div>
                
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-2xl lg:text-3xl font-bold text-white mb-3"
                >
                  Committed to Excellence
                </motion.h3>
                
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="text-white/95 text-base lg:text-lg leading-relaxed"
                >
                  Our Service Level Agreements ensure you get the quality and speed you deserve, every single time.
                </motion.p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Section - Small Cards */}
          <div className="grid gap-4 content-center">
            {slaCommitments.map((sla, index) => {
              const cardRef = useRef(null);
              const cardInView = useInView(cardRef, { once: true, margin: "-50px" });
              
              return (
                <motion.div
                  key={sla.title}
                  ref={cardRef}
                  initial={{ opacity: 0, x: 50, y: 20 }}
                  animate={cardInView ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="group relative bg-card rounded-xl p-5 shadow-soft hover:shadow-card border border-border/50 transition-all duration-300 flex gap-4"
                >
                  {/* Small Icon Image */}
                  <div className="flex-shrink-0">
                    <motion.div 
                      initial={{ scale: 0, rotate: -180 }}
                      animate={cardInView ? { scale: 1, rotate: 0 } : {}}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.15 + 0.2,
                        type: "spring",
                        stiffness: 200
                      }}
                      className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    >
                      <sla.icon className="w-7 h-7 text-primary-foreground" />
                    </motion.div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-base font-semibold text-foreground leading-tight">
                        {sla.title}
                      </h3>
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={cardInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ 
                          duration: 0.4, 
                          delay: index * 0.15 + 0.3 
                        }}
                        className="inline-block px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold ml-2 whitespace-nowrap"
                      >
                        {sla.commitment}
                      </motion.span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {sla.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { GraduationCap, ClipboardCheck, UserCheck, Target, ArrowRight } from "lucide-react";

const trainingFeatures = [
  {
    icon: GraduationCap,
    title: "Skill Development",
    description: "Industry-specific training programs to ensure workers are job-ready from day one.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop"
  },
  {
    icon: ClipboardCheck,
    title: "SOP-Based Training",
    description: "Customized training modules aligned with your organization's Standard Operating Procedures.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
  },
  {
    icon: UserCheck,
    title: "Background Verification",
    description: "Thorough background checks, police verification, and reference validation for all workers.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop"
  },
  {
    icon: Target,
    title: "Quality Assurance",
    description: "Regular performance monitoring, feedback loops, and continuous improvement initiatives.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop"
  }
];

export default function TrainingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCards, setActiveCards] = useState([false, false, false, false]);

  useEffect(() => {
    // Cycle through cards every 3 seconds
    const interval = setInterval(() => {
      setActiveCards(prev => {
        const newState = [...prev];
        const currentIndex = newState.findIndex(card => card === true);
        
        if (currentIndex === -1) {
          // Start with first card
          newState[0] = true;
        } else {
          // Turn off current card
          newState[currentIndex] = false;
          // Turn on next card (cycle back to 0 if at end)
          const nextIndex = (currentIndex + 1) % newState.length;
          newState[nextIndex] = true;
        }
        
        return newState;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="py-12 md:py-16 lg:py-20 bg-card">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Grid - Two White Cards */}
          <div className="grid sm:grid-cols-2 gap-5 lg:gap-6 order-2 lg:order-1">
            {trainingFeatures.map((feature, index) => {
              const [isHovered, setIsHovered] = useState(false);
              const isActive = activeCards[index] || isHovered;
              
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="group relative bg-background rounded-2xl overflow-hidden shadow-xl border border-border/50 hover:shadow-2xl transition-all duration-300"
                >
                  {/* Background Image - Shows on hover or auto-cycle */}
                  <div className={`absolute inset-0 transition-opacity duration-700 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <img 
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 transition-colors duration-300">
                    <div className={`w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 transition-transform duration-300 ${
                      isActive ? 'scale-110' : ''
                    }`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-foreground'
                    }`}>
                      {feature.title}
                    </h3>
                    <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                      isActive ? 'text-white/90' : 'text-muted-foreground'
                    }`}>
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Content - Heading & Subheading */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 lg:sticky lg:top-24"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Training & Quality
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Workforce <span className="text-gradient">Readiness</span> Guaranteed
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Every worker deployed through MISU undergoes rigorous training, verification, and quality checks to ensure they meet your standards from day one.
              We focus on reliability, safety, and performance by continuously monitoring our workforce and providing ongoing support, so you can operate with confidence and zero disruption to your daily operations.
            </p>
            
            <button 
              className="bg-foreground hover:bg-foreground/90 text-background px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg inline-flex items-center gap-2"
              onClick={() => window.location.href = '/services'}
            >
              Learn More <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
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
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, ClipboardCheck, UserCheck, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const trainingFeatures = [
  {
    icon: GraduationCap,
    title: "Skill Development",
    description: "Industry-specific training programs to ensure workers are job-ready from day one."
  },
  {
    icon: ClipboardCheck,
    title: "SOP-Based Training",
    description: "Customized training modules aligned with your organization's Standard Operating Procedures."
  },
  {
    icon: UserCheck,
    title: "Background Verification",
    description: "Thorough background checks, police verification, and reference validation for all workers."
  },
  {
    icon: Target,
    title: "Quality Assurance",
    description: "Regular performance monitoring, feedback loops, and continuous improvement initiatives."
  }
];

export function TrainingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Training & Quality
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Workforce <span className="text-gradient">Readiness</span> Guaranteed
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Every worker deployed through MISU undergoes rigorous training, verification, and quality checks to ensure they meet your standards from day one.
            </p>
            
            <Button variant="hero" size="lg" asChild>
              <Link to="/services">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Right Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {trainingFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background rounded-2xl p-6 shadow-soft border border-border/50"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

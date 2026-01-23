import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Users, ArrowRight, Briefcase, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const personas = [
  {
    icon: Building2,
    title: "Industries & Organizations",
    subtitle: "Looking for reliable manpower?",
    description: "From factory floors to corporate offices — get trained, compliant workforce deployed within 24-48 hours.",
    features: [
      "Quick workforce deployment",
      "100% compliance handled",
      "Flexible staffing models",
      "Dedicated account manager"
    ],
    cta: "Hire Manpower",
    link: "/contact",
    gradient: "from-primary to-accent"
  },
  {
    icon: Users,
    title: "Job Seekers",
    subtitle: "Looking for your next opportunity?",
    description: "Join 25,000+ workers who found stable employment through MISU. We offer jobs across industries with fair wages and growth.",
    features: [
      "Verified job opportunities",
      "Fair wages & benefits",
      "Skill development training",
      "Career growth support"
    ],
    cta: "Apply for Jobs",
    link: "/jobs",
    gradient: "from-accent to-primary"
  }
];

export function PersonaEntrySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            How Can We Help?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Choose Your <span className="text-gradient">Path</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're hiring or job hunting, we've got you covered with end-to-end solutions.
          </p>
        </motion.div>

        {/* Persona Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {personas.map((persona, index) => (
            <motion.div
              key={persona.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative bg-card rounded-3xl p-8 lg:p-10 shadow-soft hover:shadow-card border border-border/50 transition-all duration-300 overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${persona.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${persona.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <persona.icon className="w-8 h-8 text-primary-foreground" />
                </div>

                <p className="text-sm text-primary font-medium mb-2">{persona.subtitle}</p>
                <h3 className="text-2xl font-bold mb-3 text-foreground">{persona.title}</h3>
                <p className="text-muted-foreground mb-6">{persona.description}</p>

                <ul className="space-y-3 mb-8">
                  {persona.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant="hero" size="lg" asChild className="w-full">
                  <Link to={persona.link}>
                    {persona.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Crown, Users, Wrench, HardHat, Shield, Sparkles, Briefcase, UserCheck } from "lucide-react";

const categories = [
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
  },
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

export function ManpowerCategoriesSection() {
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
            Workforce Categories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Complete <span className="text-gradient">Manpower Spectrum</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From C-suite executives to ground-level support staff — we cover every workforce need under one roof.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative bg-card rounded-2xl p-6 shadow-soft hover:shadow-card border border-border/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-4 right-4">
                <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                  {category.level}
                </span>
              </div>
              
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <category.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              
              <h3 className="text-lg font-semibold mb-2 text-foreground">{category.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{category.examples}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

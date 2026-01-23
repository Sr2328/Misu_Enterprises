

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Factory, Building2, Warehouse, Home, Hospital, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const industries = [
  {
    icon: Factory,
    title: "Manufacturing",
    description: "Assembly line workers, machine operators, quality inspectors, supervisors, and maintenance staff.",
    workers: "8,000+ deployed"
  },
  {
    icon: Building2,
    title: "Corporate Offices",
    description: "Reception, administration, pantry boys, housekeeping, security, and facility management.",
    workers: "5,000+ deployed"
  },
  {
    icon: Warehouse,
    title: "Warehouses & Logistics",
    description: "Loading/unloading staff, packers, inventory handlers, forklift operators, and supervisors.",
    workers: "4,500+ deployed"
  },
  {
    icon: Home,
    title: "Residential & Commercial",
    description: "Security guards, housekeeping staff, gardeners, electricians, plumbers, and maintenance crew.",
    workers: "3,500+ deployed"
  },
  {
    icon: Hospital,
    title: "Healthcare Facilities",
    description: "Ward boys, patient care assistants, housekeeping, security, and facility support staff.",
    workers: "2,000+ deployed"
  },
  {
    icon: ShoppingBag,
    title: "Retail & Hospitality",
    description: "Store assistants, inventory staff, housekeeping, security, and customer service personnel.",
    workers: "2,000+ deployed"
  }
];

export function IndustrySolutionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Industry Solutions
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Manpower for <span className="text-gradient">Every Sector</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tailored workforce solutions across manufacturing, corporate, healthcare, retail, and facility management industries.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group bg-background rounded-2xl p-6 lg:p-8 shadow-soft hover:shadow-card transition-all duration-300 border border-border/50"
            >
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <industry.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{industry.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed text-sm">{industry.description}</p>
              <p className="text-sm font-medium text-primary">{industry.workers}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <Button variant="hero" size="lg" asChild>
            <Link to="/services">
              Explore All Solutions <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

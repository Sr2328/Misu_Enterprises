import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Search, Building, Handshake, Target, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const services = [
  {
    icon: Search,
    title: "Executive Search",
    description: "Find top-tier executive talent for leadership positions in your organization.",
  },
  {
    icon: Users,
    title: "Staffing Solutions",
    description: "Flexible staffing options from temporary to permanent placements.",
  },
  {
    icon: Building,
    title: "Corporate Recruitment",
    description: "End-to-end recruitment solutions for large-scale hiring needs.",
  },
  {
    icon: Handshake,
    title: "HR Consulting",
    description: "Expert HR advisory services to optimize your workforce management.",
  },
  {
    icon: Target,
    title: "Talent Mapping",
    description: "Strategic talent intelligence and market analysis for informed hiring.",
  },
  {
    icon: HeartHandshake,
    title: "Career Coaching",
    description: "Professional development and career guidance for job seekers.",
  },
];

export function ServicesSection() {
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
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Comprehensive <span className="text-gradient">Recruitment</span> Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From executive search to HR consulting, we offer tailored solutions to meet all your staffing needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group p-6 lg:p-8 bg-background rounded-2xl shadow-soft hover:shadow-card transition-all duration-300 border border-border/50"
            >
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
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
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

import { motion, useInView } from "framer-motion";
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
            SLA Commitments
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Service <span className="text-gradient">Guarantees</span> You Can Trust
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We back our promises with Service Level Agreements. If we don't deliver, you don't pay.
          </p>
        </motion.div>

        {/* SLA Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {slaCommitments.map((sla, index) => (
            <motion.div
              key={sla.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl p-6 shadow-soft hover:shadow-card border border-border/50 transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <sla.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                {sla.commitment}
              </span>
              
              <h3 className="text-lg font-semibold mb-2 text-foreground">{sla.title}</h3>
              <p className="text-sm text-muted-foreground">{sla.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

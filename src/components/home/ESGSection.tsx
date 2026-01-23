import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Heart, Scale, Users } from "lucide-react";

const esgPillars = [
  {
    icon: Heart,
    title: "Fair Employment",
    description: "We ensure fair wages, timely payments, and dignified working conditions for all workers.",
    color: "from-rose-500 to-red-600"
  },
  {
    icon: Scale,
    title: "Ethical Practices",
    description: "Zero tolerance for exploitation. We comply with all labour laws and promote worker rights.",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: Users,
    title: "Skill Empowerment",
    description: "Free skill development and training programs to help workers grow in their careers.",
    color: "from-amber-500 to-orange-600"
  },
  {
    icon: Leaf,
    title: "Sustainable Operations",
    description: "Paperless processes, digital attendance, and eco-friendly operational practices.",
    color: "from-primary to-accent"
  }
];

export function ESGSection() {
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
            ESG & Ethics
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Responsible <span className="text-gradient">Employment</span> Partner
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We believe in creating shared value — for clients, workers, and society. Our ESG practices reflect our commitment to ethical business.
          </p>
        </motion.div>

        {/* ESG Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {esgPillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-background rounded-2xl p-6 shadow-soft border border-border/50 hover:shadow-card transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <pillar.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

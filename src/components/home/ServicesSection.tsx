import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Search, Building, Handshake, Target, HeartHandshake, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Search,
    title: "Executive Search",
    description: "Find top-tier executive talent for leadership positions.",
    vacancy: "20+",
    status: "Urgent",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop"
  },
  {
    icon: Users,
    title: "Staffing Solutions",
    description: "Flexible staffing from temporary to permanent placements.",
    vacancy: "50+",
    status: "Immediate",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
  },
  {
    icon: Building,
    title: "Corporate Recruitment",
    description: "End-to-end recruitment for large-scale hiring needs.",
    vacancy: "100+",
    status: "Hiring",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop"
  },
  {
    icon: Handshake,
    title: "HR Consulting",
    description: "Expert HR advisory to optimize workforce management.",
    vacancy: "15+",
    status: "Urgent",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop"
  },
  {
    icon: Target,
    title: "Talent Mapping",
    description: "Strategic talent intelligence and market analysis.",
    vacancy: "30+",
    status: "Active",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop"
  },
  {
    icon: HeartHandshake,
    title: "Career Coaching",
    description: "Professional development and career guidance.",
    vacancy: "25+",
    status: "Immediate",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop"
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 md:py-16 lg:py-20 bg-card">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center mb-10 lg:mb-12">
          {/* Left: Heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Your Path<br />
              to <span className="text-gradient">Hiring Success</span>
            </h2>
          </motion.div>

          {/* Right: Description + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              We believe in the transformative power of strategic hiring. Our compassionate team of experienced recruitment experts is dedicated to your organization's success through tailored hiring, personalized guidance, and sustained growth.
            </p>
            <button 
              className="bg-foreground hover:bg-foreground/90 text-background px-8 py-4 rounded-full text-base font-medium transition-all duration-300 hover:shadow-lg inline-flex items-center gap-2"
              onClick={() => window.location.href = '/services'}
            >
              View All Services
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Explore Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <p className="text-sm md:text-base text-muted-foreground">
            Explore your recruitment needs and gain insights
          </p>
        </motion.div>

        {/* Services Cards - Horizontal Scroll */}
        <div className="relative">
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 w-[280px] md:w-[320px] snap-start group cursor-pointer"
              >
                <div className="bg-background rounded-3xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 h-full border border-border/50">
                  {/* Image */}
                  <div className="relative h-48 md:h-56 overflow-hidden gradient-primary">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-medium">
                      <span className="bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-foreground shadow-sm">
                        {service.vacancy}
                      </span>
                      <span className="bg-primary/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-primary shadow-sm">
                        {service.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {service.description}
                    </p>
                    
                    {/* Footer with icon */}
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll Arrow Indicator (Desktop) */}
          {/* <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="bg-gradient-to-l from-card via-card to-transparent w-24 h-full absolute right-0" />
            <ArrowRight className="w-8 h-8 text-muted-foreground relative right-4" />
          </div> */}
        </div>

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 lg:hidden text-center"
        >
          <button 
            className="border-2 border-border hover:border-primary bg-background px-6 py-4 rounded-full transition-all duration-300 inline-flex items-center gap-2 text-foreground hover:text-primary"
            onClick={() => window.location.href = '/services'}
          >
            Explore All Services
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      <style>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
        .text-gradient {
          background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gradient-primary {
          background: linear-gradient(135deg, hsl(var(--primary)/0.8) 0%, hsl(var(--primary)) 100%);
        }
      `}</style>
    </section>
  );
}
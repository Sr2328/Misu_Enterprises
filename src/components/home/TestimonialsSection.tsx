import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";

const testimonials = [
  {
    id: 1,
    name: "Maria Santos",
    role: "HR Director, TechCorp PH",
    image: testimonial1,
    content: "MISO Enterprises has been instrumental in helping us find top talent. Their understanding of our industry needs is exceptional.",
    rating: 5,
  },
  {
    id: 2,
    name: "David Chen",
    role: "CEO, StartUp Ventures",
    image: testimonial2,
    content: "The team's professionalism and dedication exceeded our expectations. They helped us build our entire management team within 3 months.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ana Rodriguez",
    role: "Operations Manager",
    image: testimonial3,
    content: "I found my dream job through MISO. The career coaching and support throughout the process was incredible.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-bl-[200px] -z-10" />
      
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            What Our <span className="text-gradient">Clients</span> Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from companies and candidates who have partnered with us.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="relative bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Quote className="w-5 h-5 text-primary" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Avatars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <div className="flex items-center gap-4 px-6 py-3 bg-card rounded-full shadow-soft border border-border/50">
            <div className="flex -space-x-3">
              {testimonials.map((t) => (
                <img
                  key={t.id}
                  src={t.image}
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-card object-cover"
                />
              ))}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Join 10,000+ satisfied clients</p>
              <p className="text-xs text-muted-foreground">Trusted by companies worldwide</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

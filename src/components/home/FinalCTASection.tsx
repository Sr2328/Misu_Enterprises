import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Briefcase, Handshake, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 gradient-primary" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

          <div className="relative z-10 py-16 lg:py-24 px-6 lg:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
                Ready to Build Your Workforce?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
                Whether you need manpower for your organization or you're looking for your next job opportunity — we're here to help.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="xl" 
                  className="bg-card text-primary hover:bg-card/90 shadow-lg"
                  asChild
                >
                  <Link to="/contact">
                    <Handshake className="w-5 h-5" />
                    Hire Manpower
                  </Link>
                </Button>
                <Button 
                  size="xl" 
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground"
                  asChild
                >
                  <Link to="/jobs">
                    <Briefcase className="w-5 h-5" />
                    Apply for Jobs
                  </Link>
                </Button>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-primary-foreground/80">
                <a 
                  href="tel:+919876543210" 
                  className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>+91 98765 43210</span>
                </a>
                <span className="hidden sm:block text-primary-foreground/40">|</span>
                <a 
                  href="mailto:info@misuenterprises.com" 
                  className="hover:text-primary-foreground transition-colors"
                >
                  info@misuenterprises.com
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

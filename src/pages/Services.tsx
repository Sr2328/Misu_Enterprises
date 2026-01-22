import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Search, Users, Building, Handshake, Target, HeartHandshake, 
  ArrowRight, CheckCircle, Briefcase, Loader2, Settings
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Service {
  id: string;
  title: string;
  description: string;
  full_description: string | null;
  slug: string;
  icon: string | null;
  features: string[] | null;
  cover_image_url: string | null;
  is_active: boolean | null;
}

// Icon mapping for dynamic icons
const iconMap: { [key: string]: any } = {
  Search,
  Users,
  Building,
  Handshake,
  Target,
  HeartHandshake,
  Briefcase,
  Settings,
};

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconName: string | null) => {
    if (!iconName) return Briefcase;
    return iconMap[iconName] || Briefcase;
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Comprehensive <span className="text-gradient">Recruitment</span> Solutions
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              From executive search to HR consulting, we offer tailored solutions to meet all your staffing needs.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-16">
              <Briefcase className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No services available</h3>
              <p className="text-muted-foreground">Check back soon for our comprehensive service offerings.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {services.map((service, index) => {
                const IconComponent = getIcon(service.icon);
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                      <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6">
                        <IconComponent className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold mb-4">{service.title}</h2>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {service.full_description || service.description}
                      </p>
                      {service.features && service.features.length > 0 && (
                        <ul className="space-y-3 mb-6">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3">
                              <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <Button variant="outline" asChild>
                        <Link to={`/services/${service.slug}`}>
                          Learn More <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                    <div className={`bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-12 flex items-center justify-center ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}>
                      {service.cover_image_url ? (
                        <img 
                          src={service.cover_image_url} 
                          alt={service.title}
                          className="w-full h-64 object-cover rounded-2xl"
                        />
                      ) : (
                        <IconComponent className="w-32 h-32 text-primary/30" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you find the right talent or the right opportunity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">
                  <Briefcase className="w-5 h-5" /> Contact Us
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/jobs">
                  <Search className="w-5 h-5" /> Browse Jobs
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
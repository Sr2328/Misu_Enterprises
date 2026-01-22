import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft, ArrowRight, CheckCircle, Phone, Mail, MessageCircle, Loader2, Briefcase
} from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  full_description: string | null;
  slug: string;
  icon: string | null;
  features: string[] | null;
  cover_image_url: string | null;
}

const ServiceDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchService();
    }
  }, [slug]);

  const fetchService = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        navigate("/services");
        return;
      }

      setService(data);
    } catch (error) {
      console.error("Error fetching service:", error);
      navigate("/services");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!service) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <Button asChild>
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="gradient-hero py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Link to="/services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Services
            </Link>
            
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center shrink-0">
                <Briefcase className="w-10 h-10 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-5xl font-bold mb-4">{service.title}</h1>
                <p className="text-lg text-muted-foreground">{service.description}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Cover Image */}
            {service.cover_image_url && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl overflow-hidden"
              >
                <img 
                  src={service.cover_image_url} 
                  alt={service.title}
                  className="w-full h-64 lg:h-96 object-cover"
                />
              </motion.div>
            )}

            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl p-6 lg:p-10 shadow-soft border border-border/50"
            >
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {service.full_description || service.description}
              </p>
            </motion.div>

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl p-6 lg:p-10 shadow-soft border border-border/50"
              >
                <h2 className="text-2xl font-bold mb-6">What We Offer</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl lg:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss how our {service.title.toLowerCase()} services can help your organization achieve its goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">
                  <Mail className="w-5 h-5" /> Contact Us
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="tel:+639123456789">
                  <Phone className="w-5 h-5" /> Call Now
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-green-600/30 text-green-600 hover:bg-green-600/10" asChild>
                <a href="https://wa.me/639123456789" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" /> WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetails;
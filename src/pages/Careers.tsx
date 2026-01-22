import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Clock, Briefcase, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const careers = [
  {
    id: 1,
    title: "Senior Recruitment Consultant",
    department: "Recruitment",
    location: "Makati City",
    type: "Full-time",
    description: "Lead client relationships and deliver exceptional recruitment solutions.",
  },
  {
    id: 2,
    title: "Business Development Manager",
    department: "Sales",
    location: "BGC, Taguig",
    type: "Full-time",
    description: "Drive new business acquisition and expand our client portfolio.",
  },
  {
    id: 3,
    title: "HR Operations Specialist",
    department: "Operations",
    location: "Makati City",
    type: "Full-time",
    description: "Support HR operations and ensure smooth service delivery.",
  },
];

const benefits = [
  "Competitive Salary Package",
  "Health Insurance",
  "Performance Bonuses",
  "Career Development",
  "Flexible Work Arrangements",
  "Team Building Activities",
];

const Careers = () => {
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
              Join Our Team
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Build Your <span className="text-gradient">Career</span> With Us
            </h1>
            <p className="text-lg text-muted-foreground">
              Join a team of passionate professionals dedicated to connecting talent with opportunity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Why Work With Us?</h2>
            <p className="text-muted-foreground">We offer a rewarding work environment and great benefits.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background rounded-xl p-4 text-center shadow-soft"
              >
                <p className="font-medium">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
            <p className="text-muted-foreground">Find your next opportunity with us.</p>
          </motion.div>

          <div className="space-y-4">
            {careers.map((career, index) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 4 }}
                className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 hover:shadow-card hover:border-primary/20 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{career.title}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{career.description}</p>
                      <div className="flex flex-wrap gap-3">
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Building2 className="w-4 h-4" /> {career.department}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" /> {career.location}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" /> {career.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="hero" asChild>
                    <Link to="/contact">Apply Now</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;

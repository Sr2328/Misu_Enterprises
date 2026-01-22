import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Building2, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    client: "TechCorp Solutions",
    industry: "Technology",
    challenge: "Needed to scale engineering team by 200% in 6 months",
    solution: "Implemented dedicated recruitment team and talent pipeline",
    results: ["150 engineers hired", "30-day average time-to-hire", "95% retention after 1 year"],
    year: "2023",
  },
  {
    id: 2,
    client: "Global Retail Inc.",
    industry: "Retail",
    challenge: "High turnover in customer service positions",
    solution: "Redesigned hiring process and implemented cultural fit assessments",
    results: ["40% reduction in turnover", "Improved customer satisfaction", "₱2M cost savings"],
    year: "2023",
  },
  {
    id: 3,
    client: "Healthcare Partners",
    industry: "Healthcare",
    challenge: "Difficulty attracting specialized medical professionals",
    solution: "Created targeted recruitment campaigns and professional networks",
    results: ["50 specialists hired", "Reduced vacancy rate by 60%", "Enhanced employer brand"],
    year: "2022",
  },
  {
    id: 4,
    client: "Finance Corp",
    industry: "Financial Services",
    challenge: "Executive succession planning needs",
    solution: "Comprehensive talent mapping and executive search program",
    results: ["C-suite positions filled", "Leadership pipeline established", "Board advisory support"],
    year: "2022",
  },
];

const Portfolio = () => {
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
              Our Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Success <span className="text-gradient">Stories</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover how we've helped companies transform their workforce and achieve their goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-3xl p-8 lg:p-10 shadow-soft border border-border/50"
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Client Info */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{project.client}</h3>
                        <p className="text-muted-foreground text-sm">{project.industry}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {project.year}
                    </div>
                  </div>

                  {/* Challenge & Solution */}
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-primary mb-1">Challenge</h4>
                      <p className="text-foreground">{project.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-primary mb-1">Solution</h4>
                      <p className="text-foreground">{project.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-primary mb-2">Results</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.results.map((result) => (
                          <span
                            key={result}
                            className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                          >
                            {result}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve your recruitment and HR goals.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                Start a Project <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;

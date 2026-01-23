import { Layout } from "@/components/layout/Layout";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Target, Eye, Heart, Users, Award, Globe, Building2, 
  Briefcase, Handshake, ShieldCheck, Clock, CheckCircle2, FileCheck,
  Calculator, GraduationCap, Leaf, Scale, Phone, Mail, MapPin,
  Factory, Warehouse, Hospital, ShoppingBag, Home
} from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for excellence in every placement, ensuring quality workforce delivery.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "Transparent practices, honest dealings, and ethical employment for all.",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We become your extended HR team, not just another vendor.",
  },
  {
    icon: Globe,
    title: "Diversity",
    description: "Inclusive hiring practices celebrating workforce diversity.",
  },
];

const stats = [
  { value: "15+", label: "Years of Trust" },
  { value: "25,000+", label: "Workers Deployed" },
  { value: "500+", label: "Client Partners" },
  { value: "98%", label: "Client Retention" },
];

const industries = [
  { icon: Factory, name: "Manufacturing" },
  { icon: Building2, name: "Corporate" },
  { icon: Warehouse, name: "Warehousing" },
  { icon: Hospital, name: "Healthcare" },
  { icon: ShoppingBag, name: "Retail" },
  { icon: Home, name: "Residential" },
];

const workforceCategories = [
  "Top Management & Executives",
  "Supervisors & Team Leaders",
  "Skilled Workers & Technicians",
  "Semi-Skilled Operators",
  "Security Personnel",
  "Housekeeping Staff",
  "Pantry & Cafeteria",
  "Drivers & Support Staff"
];

const processSteps = [
  {
    step: "01",
    title: "Requirement Analysis",
    description: "We understand your staffing needs, site conditions, and workforce specifications."
  },
  {
    step: "02",
    title: "Candidate Sourcing",
    description: "We tap into our verified pool of 25,000+ workers and recruit matching profiles."
  },
  {
    step: "03",
    title: "Verification & Training",
    description: "Background checks, police verification, and SOP-based training for your requirements."
  },
  {
    step: "04",
    title: "Deployment & Onboarding",
    description: "Trained workforce deployed to your site within 24-48 hours with full documentation."
  },
  {
    step: "05",
    title: "Management & Support",
    description: "Ongoing attendance, payroll, compliance, and performance management."
  }
];

const complianceItems = [
  { icon: FileCheck, title: "Labour Law Compliance", desc: "Contract Labour Act, Minimum Wages, Industrial Disputes" },
  { icon: Calculator, title: "Statutory Benefits", desc: "PF, ESI, Gratuity, Bonus Processing" },
  { icon: ShieldCheck, title: "GST Billing", desc: "Transparent, audit-ready invoicing" },
];

const esgPillars = [
  { icon: Heart, title: "Fair Wages", desc: "Timely payments, dignified work conditions" },
  { icon: Scale, title: "Ethical Practices", desc: "Zero exploitation, worker rights protection" },
  { icon: GraduationCap, title: "Skill Development", desc: "Free training and career growth programs" },
  { icon: Leaf, title: "Sustainability", desc: "Paperless operations, eco-friendly practices" },
];

const About = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  
  return (
    <Layout>
      {/* Hero Section */}
      <section ref={heroRef} className="gradient-hero py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                About MISU Enterprises
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Your Trusted <span className="text-gradient">Workforce Partner</span> Since 2008
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                For over 15 years, MISU Enterprises has been connecting businesses with reliable, trained, and compliant workforce — from top management to ground-level support staff across India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">
                    <Handshake className="w-5 h-5" />
                    Hire Manpower <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link to="/jobs">
                    <Briefcase className="w-5 h-5" />
                    Apply for Jobs
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dual Persona Section */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Serving <span className="text-gradient">Two Worlds</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We bridge the gap between organizations seeking manpower and individuals seeking meaningful employment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-background rounded-2xl p-8 shadow-soft border border-border/50"
            >
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-3">For Industries & Organizations</h3>
              <p className="text-muted-foreground mb-6">
                End-to-end manpower solutions with 100% compliance, rapid deployment, and dedicated account management. We handle HR so you can focus on core business.
              </p>
              <ul className="space-y-2">
                {["Quick 24-48 hr deployment", "Complete compliance handling", "SLA-backed service guarantees"].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-background rounded-2xl p-8 shadow-soft border border-border/50"
            >
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-3">For Job Seekers</h3>
              <p className="text-muted-foreground mb-6">
                Verified job opportunities with fair wages, safe working conditions, and career growth. We've helped 25,000+ workers find stable employment.
              </p>
              <ul className="space-y-2">
                {["Verified employers only", "Fair wages & timely payments", "Free skill development training"].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-background rounded-3xl p-8 lg:p-10 shadow-soft border border-border/50"
            >
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To provide organizations with reliable, trained, and compliant workforce while creating dignified employment opportunities for workers — building a bridge between talent and opportunity that benefits both parties.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-background rounded-3xl p-8 lg:p-10 shadow-soft border border-border/50"
            >
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To be India's most trusted workforce solutions partner — known for ethical practices, operational excellence, and creating shared value for enterprises, workers, and society at large.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Industries We Serve
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Industry-Wise Manpower Solutions</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 text-center shadow-soft border border-border/50 hover:shadow-card transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-3">
                  <industry.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <p className="font-medium text-sm">{industry.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workforce Categories */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Complete Workforce Spectrum
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                From <span className="text-gradient">Boardroom to Floor</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                We cover the entire workforce spectrum — from C-suite executives to operational staff. Whatever your manpower need, we have the right talent.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {workforceCategories.map((category) => (
                  <div key={category} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{category}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-background rounded-3xl p-8 shadow-card border border-border/50"
            >
              <h3 className="text-xl font-bold mb-6">Our Deployment Process</h3>
              <div className="space-y-6">
                {processSteps.map((step, index) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold text-sm">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compliance & Trust */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                100% Compliance
              </span>
              <h2 className="text-3xl font-bold mb-6">Zero Risk Workforce Partnership</h2>
              <div className="space-y-4">
                {complianceItems.map((item) => (
                  <div key={item.title} className="flex items-start gap-4 bg-card rounded-xl p-4 border border-border/50">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                SLA Commitments
              </span>
              <h2 className="text-3xl font-bold mb-6">Service Guarantees</h2>
              <div className="grid gap-4">
                {[
                  { icon: Clock, title: "24-48 Hour Deployment", desc: "Trained workforce at your site quickly" },
                  { icon: Award, title: "Quick Replacement", desc: "24-hour replacement guarantee" },
                  { icon: FileCheck, title: "Monthly Reporting", desc: "Transparent performance reports" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 bg-card rounded-xl p-4 border border-border/50">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ESG & Ethics */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              ESG & Ethical Employment
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Responsible Workforce Partner</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We believe in creating shared value for clients, workers, and society through ethical practices.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {esgPillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background rounded-2xl p-6 text-center shadow-soft border border-border/50"
              >
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                  <pillar.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">What Drives Us</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 text-center shadow-soft border border-border/50"
              >
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 gradient-primary" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

            <div className="relative z-10 py-16 lg:py-20 px-6 lg:px-12 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
                Ready to Partner With Us?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
                Let's discuss how MISU can solve your workforce challenges or help you find your next opportunity.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;

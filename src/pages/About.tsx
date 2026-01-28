import { Layout } from "@/components/layout/Layout";
import { useRef } from "react";
import { useInView } from "framer-motion";

// Components / Sections
import { AboutHeroSection } from "@/components/About/AboutHero";
import ServingTwoWorldsSection from "@/components/About/DualPersona";
import StatsSection from "@/components/About/AboutStats";
import MissionVisionSection from "@/components/About/MissionAndVision";
import IndustriesSection from "@/components/About/IndustriesServe";
import ProcessSection from "@/components/About/ProcessSection";
import { ComplianceSection } from "@/components/About/Compliance";
import ESGSection from "@/components/About/ESG&Complimance";
import ValuesSection from "@/components/About/OurValues";
import AboutTestimonials from "@/components/About/AboutTestimonials";
import AboutFAQ from "@/components/About/AboutFAQ";
import AboutCTA from "@/components/About/AboutCTA";

const About = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <Layout>
      {/* ================= Hero Section ================= */}
      <AboutHeroSection/>

      {/* ================= Dual Persona / Approach ================= */}
      <ServingTwoWorldsSection />

      {/* ================= Stats / Achievements ================= */}
      <StatsSection />

      {/* ================= Mission & Vision ================= */}
      <MissionVisionSection />

      {/* ================= Industries We Serve ================= */}
      <IndustriesSection />

      {/* ================= Workforce & Deployment Process ================= */}
      <ProcessSection />

      {/* ================= Compliance & Trust ================= */}
      <ComplianceSection />

      {/* ================= ESG & Ethics ================= */}
      <ESGSection />

      {/* ================= Our Values ================= */}
      <ValuesSection />

      {/* ================= Testimonials ================= */}
      <AboutTestimonials />

      {/* ================= FAQ ================= */}
      <AboutFAQ />

      {/* ================= Final CTA ================= */}
      <AboutCTA />
    </Layout>
  );
};

export default About;

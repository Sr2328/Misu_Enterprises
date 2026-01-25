import { Layout } from "@/components/layout/Layout";

import HeroSection from "@/components/home/HeroSection";
import IndustrySolutionsSection from "@/components/home/IndustrySolutionsSection";
import ManpowerServices from "@/components/home/ManpowerServices";
import ManpowerCategoriesSection from "@/components/home/ManpowerCategoriesSection";
import RequirementBuilderSection from "@/components/home/RequirementBuilderSection";
import TrustSection from "@/components/home/TrustSection";
import ComplianceSection from "@/components/home/ComplianceSection";
import { JobDiscoverySection } from "@/components/home/JobDiscoverySection";
import TrainingSection from "@/components/home/TrainingSection";
import { SLASection } from "@/components/home/SLASection";
import ImpactStatsSection  from "@/components/home/ImpactStatsSection";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturedJobsSection from "@/components/home/FeaturedJobsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import  CTASection  from "@/components/home/CTASection";
import  ESGSection  from "@/components/home/ESGSection";
import FinalCTASection  from "@/components/home/FinalCTASection";

const Index = () => {
  return (
    <Layout>
      <div className="overflow-hidden">
        {/* Hero & Value Proposition */}
        <HeroSection />

        {/* Solutions & Offerings */}
        <IndustrySolutionsSection />
        <ManpowerServices />
        <ManpowerCategoriesSection />

        {/* Engagement & Trust */}
        <RequirementBuilderSection />
        <TrustSection />
        <ComplianceSection />

        {/* Job & Talent */}
        <JobDiscoverySection />
        <TrainingSection />
        <FeaturedJobsSection />

        {/* Proof & Performance */}
        <SLASection />
        <ImpactStatsSection />
        <TestimonialsSection />

        {/* Services & Sustainability */}
        <ServicesSection />
        <ESGSection />

        {/* Calls to Action */}
        <CTASection />
        <FinalCTASection />
      </div>
    </Layout>
  );
};

export default Index;

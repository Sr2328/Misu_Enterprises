import { Layout } from "@/components/layout/Layout";
import HeroSection  from "@/components/home/HeroSection";
import  ServicesSection  from "@/components/home/ServicesSection";
import  FeaturedJobsSection  from "@/components/home/FeaturedJobsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import IndustrySolutionsSection from "@/components/home/IndustrySolutionsSection";
import ManpowerServices from "@/components/home/ManpowerServices";
import { ManpowerCategoriesSection } from "@/components/home/ManpowerCategoriesSection";
import  RequirementBuilderSection  from "@/components/home/RequirementBuilderSection";
import  ComplianceSection  from "@/components/home/ComplianceSection";
import { TrainingSection } from "@/components/home/TrainingSection";
import { JobDiscoverySection } from "@/components/home/JobDiscoverySection";
import { SLASection } from "@/components/home/SLASection";
import { ImpactStatsSection } from "@/components/home/ImpactStatsSection";
import { ESGSection } from "@/components/home/ESGSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";
import  TrustSection  from "@/components/home/TrustSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <IndustrySolutionsSection></IndustrySolutionsSection>
      <ManpowerServices/>
       <ManpowerCategoriesSection />
      <RequirementBuilderSection />
      <TrustSection />
      <ComplianceSection />
      <JobDiscoverySection />
      <TrainingSection />
      <SLASection />
      <ImpactStatsSection />
      <ServicesSection />
      <FeaturedJobsSection />
      <TestimonialsSection />
      <CTASection />
      <ESGSection />
      <FinalCTASection />
    </Layout>
  );
};

export default Index;

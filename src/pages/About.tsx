// import { Layout } from "@/components/layout/Layout";
// import { useRef } from "react";
// import { useInView } from "framer-motion";

// // Components / Sections
// import { AboutHeroSection } from "@/components/About/AboutHero";
// import ServingTwoWorldsSection from "@/components/About/DualPersona";
// import StatsSection from "@/components/About/AboutStats";
// import MissionVisionSection from "@/components/About/MissionAndVision";
// import IndustriesSection from "@/components/About/IndustriesServe";
// import ProcessSection from "@/components/About/ProcessSection";
// import { ComplianceSection } from "@/components/About/Compliance";
// import ESGSection from "@/components/About/ESG&Complimance";
// import ValuesSection from "@/components/About/OurValues";
// import AboutTestimonials from "@/components/About/AboutTestimonials";
// import AboutFAQ from "@/components/About/AboutFAQ";
// import AboutCTA from "@/components/About/AboutCTA";

// const About = () => {
//   const heroRef = useRef(null);
//   const heroInView = useInView(heroRef, { once: true });

//   return (
//     <Layout>
//       {/* ================= Hero Section ================= */}
//       <AboutHeroSection/>

//       {/* ================= Dual Persona / Approach ================= */}
//       <ServingTwoWorldsSection />

//       {/* ================= Stats / Achievements ================= */}
//       <StatsSection />

//       {/* ================= Mission & Vision ================= */}
//       <MissionVisionSection />

//       {/* ================= Industries We Serve ================= */}
//       <IndustriesSection />

//       {/* ================= Workforce & Deployment Process ================= */}
//       <ProcessSection />

//       {/* ================= Compliance & Trust ================= */}
//       <ComplianceSection />

//       {/* ================= ESG & Ethics ================= */}
//       <ESGSection />

//       {/* ================= Our Values ================= */}
//       <ValuesSection />

//       {/* ================= Testimonials ================= */}
//       <AboutTestimonials />

//       {/* ================= FAQ ================= */}
//       <AboutFAQ />

//       {/* ================= Final CTA ================= */}
//       <AboutCTA />
//     </Layout>
//   );
// };

// export default About;





// Website Under Maintenance - Code Below
// This page is currently under construction. Please contact the developer for more information.
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------


import React, { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Phone, Mail, MessageCircle, Home } from 'lucide-react';

const UnderConstruction = () => {
  const [isHovered, setIsHovered] = useState(null);

  const contactMethods = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/919717084301',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: Phone,
      label: 'Call',
      href: 'tel:+919717084301',
      color: 'from-emerald-500 to-green-600',
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:sachinyadav.work01@gmail.com',
      color: 'from-emerald-600 to-teal-600',
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-8 md:px-6 md:py-12 lg:px-8 overflow-x-hidden">
      {/* Main Content Section */}
      <div className="w-full max-w-7xl mt-5 md:mt-8 mb-6 md:mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Lottie Animation */}
          <div className="w-full flex items-center justify-center order-1 lg:order-2">
            <div className="w-full " style={{ maxWidth: '600px' }}>
              <DotLottieReact
                src="https://lottie.host/6789414f-4cb1-492e-a783-1c0bc46308f9/sD3pKmwtft.json"
                loop
                autoplay
                className="w-full h-[400px] md:h-[450px] lg:h-[500px]"
              />
            </div>
          </div>

          {/* Developer Info */}
          <div className="space-y-5 md:space-y-6 order-2 lg:order-1 lg:pr-8">
            {/* Company Name & Developer Name */}
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-emerald-600 drop-shadow-lg tracking-tight">
                Srdev Corp
              </h2>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-800 font-bold drop-shadow-md">
                Sachin Yadav
              </p>
            </div>

            {/* MISU Enterprises Description */}
            <div className="space-y-2 pt-2">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 drop-shadow-md">
                MISU Enterprises
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                A full-featured manpower management website with comprehensive dashboard functionality. 
                The platform includes three specialized dashboards: 
                <span className="font-semibold text-emerald-600"> Admin Dashboard</span> for complete system control and analytics, 
                <span className="font-semibold text-emerald-600"> Employer Dashboard</span> for posting job requirements and managing candidates, and 
                <span className="font-semibold text-emerald-600"> Job Seeker Dashboard</span> for finding opportunities, applying to jobs, and tracking application status.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 pt-3 bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100">
              <p className="text-sm md:text-base text-emerald-700 font-bold uppercase tracking-wide">
                Developer Information
              </p>
              <div className="space-y-3 text-sm md:text-base text-gray-800">
                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <a href="tel:+919717084301" className="hover:text-emerald-600 transition-colors font-semibold">
                    +91 9717084301
                  </a>
                </p>
                <p className="flex items-center gap-3 break-all">
                  <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <a href="mailto:sachinyadav.work01@gmail.com" className="hover:text-emerald-600 transition-colors font-semibold">
                    sachinyadav.work01@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-4 md:gap-5 pt-3">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <a
                    key={index}
                    href={method.href}
                    onMouseEnter={() => setIsHovered(index)}
                    onMouseLeave={() => setIsHovered(null)}
                    className="group flex flex-col items-center justify-center gap-2 transition-all duration-300"
                  >
                    <div className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r ${method.color} rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 ${
                      isHovered === index ? 'scale-105' : ''
                    }`}>
                      <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <span className="text-xs md:text-sm font-semibold text-gray-700 group-hover:text-emerald-600 transition-colors">
                      {method.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Back to Home Button */}
      <a
        href="/"
        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold px-10 py-4 md:px-12 md:py-5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-base md:text-lg group"
      >
        <Home className="w-6 h-6 md:w-7 md:h-7 transition-transform duration-300" />
        <span>Back to Home</span>
      </a>

      {/* Footer */}
      <div className="mt-6 md:mt-8 text-gray-500 text-sm md:text-base font-medium">
        © 2026 Srdev Corp. All rights reserved.
      </div>
    </div>
  );
};

export default UnderConstruction;
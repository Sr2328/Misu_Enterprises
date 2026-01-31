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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 overflow-x-hidden">
      {/* Main Content Section - Developer Info Left, Animation Right */}
      <div className="w-full max-w-7xl mb-6 md:mb-8 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Developer Info + MISU Description + CTAs */}
          <div className="space-y-5 md:space-y-6 animate-slide-right">
            {/* Developer Information */}
            <div className="space-y-3">
              <p className="text-xs md:text-sm text-emerald-600 font-semibold uppercase tracking-wide">
                Developer Information
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-accent">
                Srdev Corp
              </h2>
              <p className="text-lg md:text-xl text-gray-700 font-medium">
                Sachin Yadav
              </p>
            </div>

            {/* MISU Enterprises Description */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                MISU ENTERPRISES
              </h3>
              <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
                A comprehensive manpower solution platform featuring three powerful dashboards: 
                <span className="font-semibold text-emerald-600"> Admin Dashboard</span> for complete system management, 
                <span className="font-semibold text-emerald-600"> Employer Dashboard</span> for posting requirements and managing candidates, and 
                <span className="font-semibold text-emerald-600"> Job Seeker Dashboard</span> for finding opportunities and tracking applications.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-2 text-sm md:text-base text-gray-700 pt-2">
              <p className="flex items-center gap-3">
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 flex-shrink-0" />
                <a href="tel:+919717084301" className="hover:text-emerald-600 transition-colors font-medium">
                  +91 9717084301
                </a>
              </p>
              <p className="flex items-center gap-3 break-all">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 flex-shrink-0" />
                <a href="mailto:sachinyadav.work01@gmail.com" className="hover:text-emerald-600 transition-colors font-medium">
                  sachinyadav.work01@gmail.com
                </a>
              </p>
            </div>

            {/* CTAs Below */}
            <div className="flex gap-3 md:gap-4 pt-3">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <a
                    key={index}
                    href={method.href}
                    onMouseEnter={() => setIsHovered(index)}
                    onMouseLeave={() => setIsHovered(null)}
                    className="group flex flex-col items-center justify-center gap-1.5 transition-all duration-300 transform hover:scale-110"
                  >
                    <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-r ${method.color} rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 ${
                      isHovered === index ? 'scale-110 shadow-2xl' : ''
                    }`}>
                      <Icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-gray-700 group-hover:text-emerald-600 transition-colors">
                      {method.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Side - Lottie Animation */}
          <div className="w-full flex items-center justify-center animate-slide-left">
            <div className="w-full">
              <DotLottieReact
                src="https://lottie.host/794f59d7-ce18-46dd-9932-fcce44ef2643/9Vnqf6W1Mn.lottie"
                loop
                autoplay
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Back to Home Button */}
      <a
        href="/"
        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold px-8 py-4 md:px-10 md:py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-base md:text-lg group animate-fade-in"
      >
        <Home className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-300" />
        <span>Back to Home</span>
      </a>

      {/* Footer */}
      <div className="mt-6 md:mt-8 text-gray-400 text-xs md:text-sm">
        © 2024 Srdev Corp. All rights reserved.
      </div>

      {/* Custom Animation Styles */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-right {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-left {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out 0.4s both;
        }

        .animate-slide-right {
          animation: slide-right 0.8s ease-out 0.2s both;
        }

        .animate-slide-left {
          animation: slide-left 0.8s ease-out 0.3s both;
        }
      `}</style>
    </div>
  );
};

export default UnderConstruction;
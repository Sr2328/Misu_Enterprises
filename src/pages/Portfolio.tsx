// import { Layout } from "@/components/layout/Layout";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { ArrowRight, ExternalLink, Building2, Users, Calendar } from "lucide-react";
// import { Link } from "react-router-dom";

// const projects = [
//   {
//     id: 1,
//     client: "TechCorp Solutions",
//     industry: "Technology",
//     challenge: "Needed to scale engineering team by 200% in 6 months",
//     solution: "Implemented dedicated recruitment team and talent pipeline",
//     results: ["150 engineers hired", "30-day average time-to-hire", "95% retention after 1 year"],
//     year: "2023",
//   },
//   {
//     id: 2,
//     client: "Global Retail Inc.",
//     industry: "Retail",
//     challenge: "High turnover in customer service positions",
//     solution: "Redesigned hiring process and implemented cultural fit assessments",
//     results: ["40% reduction in turnover", "Improved customer satisfaction", "₱2M cost savings"],
//     year: "2023",
//   },
//   {
//     id: 3,
//     client: "Healthcare Partners",
//     industry: "Healthcare",
//     challenge: "Difficulty attracting specialized medical professionals",
//     solution: "Created targeted recruitment campaigns and professional networks",
//     results: ["50 specialists hired", "Reduced vacancy rate by 60%", "Enhanced employer brand"],
//     year: "2022",
//   },
//   {
//     id: 4,
//     client: "Finance Corp",
//     industry: "Financial Services",
//     challenge: "Executive succession planning needs",
//     solution: "Comprehensive talent mapping and executive search program",
//     results: ["C-suite positions filled", "Leadership pipeline established", "Board advisory support"],
//     year: "2022",
//   },
// ];

// const Portfolio = () => {
//   return (
//     <Layout>
//       {/* Hero */}
//       <section className="gradient-hero py-16 lg:py-24">
//         <div className="container mx-auto px-4 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center max-w-3xl mx-auto"
//           >
//             <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
//               Our Portfolio
//             </span>
//             <h1 className="text-4xl md:text-5xl font-bold mb-6">
//               Success <span className="text-gradient">Stories</span>
//             </h1>
//             <p className="text-lg text-muted-foreground">
//               Discover how we've helped companies transform their workforce and achieve their goals.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Projects */}
//       <section className="py-16 lg:py-24">
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="space-y-8">
//             {projects.map((project, index) => (
//               <motion.div
//                 key={project.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 className="bg-card rounded-3xl p-8 lg:p-10 shadow-soft border border-border/50"
//               >
//                 <div className="grid lg:grid-cols-3 gap-8">
//                   {/* Client Info */}
//                   <div>
//                     <div className="flex items-center gap-3 mb-4">
//                       <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
//                         <Building2 className="w-6 h-6 text-primary" />
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-lg">{project.client}</h3>
//                         <p className="text-muted-foreground text-sm">{project.industry}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                       <Calendar className="w-4 h-4" />
//                       {project.year}
//                     </div>
//                   </div>

//                   {/* Challenge & Solution */}
//                   <div className="lg:col-span-2 space-y-4">
//                     <div>
//                       <h4 className="font-medium text-sm text-primary mb-1">Challenge</h4>
//                       <p className="text-foreground">{project.challenge}</p>
//                     </div>
//                     <div>
//                       <h4 className="font-medium text-sm text-primary mb-1">Solution</h4>
//                       <p className="text-foreground">{project.solution}</p>
//                     </div>
//                     <div>
//                       <h4 className="font-medium text-sm text-primary mb-2">Results</h4>
//                       <div className="flex flex-wrap gap-2">
//                         {project.results.map((result) => (
//                           <span
//                             key={result}
//                             className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
//                           >
//                             {result}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-16 bg-card">
//         <div className="container mx-auto px-4 lg:px-8 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
//             <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
//               Let's discuss how we can help you achieve your recruitment and HR goals.
//             </p>
//             <Button variant="hero" size="lg" asChild>
//               <Link to="/contact">
//                 Start a Project <ArrowRight className="w-4 h-4" />
//               </Link>
//             </Button>
//           </motion.div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default Portfolio;










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
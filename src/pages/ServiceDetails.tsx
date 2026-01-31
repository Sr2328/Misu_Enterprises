// import { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Layout } from "@/components/layout/Layout";
// import { Button } from "@/components/ui/button";
// import { supabase } from "@/integrations/supabase/client";
// import {
//   ArrowLeft,
//   ArrowRight,
//   CheckCircle,
//   Phone,
//   Mail,
//   MessageCircle,
//   Loader2,
//   Briefcase,
//   Users,
//   Target,
//   TrendingUp,
//   Award,
//   Clock,
//   Shield,
//   Zap,
// } from "lucide-react";

// interface Service {
//   id: string;
//   title: string;
//   description: string;
//   full_description: string | null;
//   slug: string;
//   icon: string | null;
//   features: string[] | null;
//   cover_image_url: string | null;
// }

// const ServiceDetails = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const [service, setService] = useState<Service | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [relatedServices, setRelatedServices] = useState<Service[]>([]);

//   useEffect(() => {
//     // Enable smooth scrolling
//     document.documentElement.style.scrollBehavior = 'smooth';
//     window.scrollTo({ top: 0, behavior: 'smooth' });

//     if (slug) {
//       fetchService();
//     }

//     return () => {
//       document.documentElement.style.scrollBehavior = 'auto';
//     };
//   }, [slug]);

//   const fetchService = async () => {
//     try {
//       const { data, error } = await supabase
//         .from("services")
//         .select("*")
//         .eq("slug", slug)
//         .eq("is_active", true)
//         .maybeSingle();

//       if (error) throw error;
//       if (!data) {
//         navigate("/services");
//         return;
//       }

//       setService(data);

//       // Fetch related services
//       const { data: related } = await supabase
//         .from("services")
//         .select("*")
//         .eq("is_active", true)
//         .neq("id", data.id)
//         .limit(3);

//       setRelatedServices(related || []);
//     } catch (error) {
//       console.error("Error fetching service:", error);
//       navigate("/services");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Loading animation component
//   const LoadingSpinner = () => (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="min-h-screen flex flex-col items-center justify-center px-4"
//     >
//       <motion.div
//         animate={{
//           rotate: 360,
//         }}
//         transition={{
//           duration: 1,
//           repeat: Infinity,
//           ease: "linear",
//         }}
//         className="relative"
//       >
//         <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-emerald-500/20 rounded-full"></div>
//         <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
//       </motion.div>
//       <motion.p
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//         className="mt-6 text-muted-foreground text-sm sm:text-base"
//       >
//         Loading service details...
//       </motion.p>
//     </motion.div>
//   );

//   if (loading) {
//     return (
//       <Layout>
//         <AnimatePresence>
//           <LoadingSpinner />
//         </AnimatePresence>
//       </Layout>
//     );
//   }

//   if (!service) {
//     return (
//       <Layout>
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="min-h-screen flex items-center justify-center px-4"
//         >
//           <div className="text-center">
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ type: "spring", delay: 0.1 }}
//               className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center"
//             >
//               <Briefcase className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600" />
//             </motion.div>
//             <h2 className="text-xl sm:text-2xl font-bold mb-2">Service Not Found</h2>
//             <p className="text-sm sm:text-base text-muted-foreground mb-4">
//               The service you're looking for doesn't exist or has been removed.
//             </p>
//             <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
//               <Link to="/services">View All Services</Link>
//             </Button>
//           </div>
//         </motion.div>
//       </Layout>
//     );
//   }

//   const benefits = [
//     { icon: Users, title: "Expert Team", description: "Skilled professionals with industry expertise" },
//     { icon: Target, title: "Tailored Solutions", description: "Customized approach for your needs" },
//     { icon: TrendingUp, title: "Proven Results", description: "Track record of successful outcomes" },
//     { icon: Clock, title: "Fast Delivery", description: "Efficient service with quick turnaround" },
//   ];

//   return (
//     <Layout>
//       {/* Banner Image */}
//       {service.cover_image_url && (
//         <section className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
//           <motion.div
//             initial={{ scale: 1.1, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.6 }}
//             className="absolute inset-0"
//           >
//             <img
//               src={service.cover_image_url}
//               alt={service.title}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
//           </motion.div>

//           {/* Back Button Overlay */}
//           <div className="absolute top-4 sm:top-6 left-4 sm:left-6 lg:left-8 z-10 mt-6">
//             <Link to="/services">
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-black/70"
//                 >
//                   <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
//                 </Button>
//               </motion.div>
//             </Link>
//           </div>

//           {/* Title Overlay */}
//           <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
//             <div className="container mx-auto max-w-6xl">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
//               >
//                 <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl bg-emerald-600 flex items-center justify-center shrink-0 shadow-2xl">
//                   <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
//                 </div>
//                 <div className="flex-1">
//                   <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 leading-tight">
//                     {service.title}
//                   </h1>
//                   <p className="text-sm sm:text-base lg:text-lg text-gray-200 max-w-3xl">
//                     {service.description}
//                   </p>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* No Banner - Header */}
//       {!service.cover_image_url && (
//         <section className="gradient-hero py-8 sm:py-12 lg:py-20">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="max-w-4xl mx-auto"
//             >
//               <Link to="/services">
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.1 }}
//                   className="inline-flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-emerald-600 mb-4 sm:mb-6 transition-colors"
//                 >
//                   <ArrowLeft className="w-4 h-4" /> Back to Services
//                 </motion.div>
//               </Link>

//               <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
//                 <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0 shadow-xl">
//                   <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
//                 </div>
//                 <div className="flex-1">
//                   <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
//                     {service.title}
//                   </h1>
//                   <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
//                     {service.description}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </section>
//       )}

//       {/* Content */}
//       <section className="py-8 sm:py-12 lg:py-16">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12 lg:space-y-16">
//             {/* Overview */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.5 }}
//               className="grid lg:grid-cols-12 gap-6 lg:gap-12"
//             >
//               <div className="lg:col-span-8">
//                 <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-3">
//                   <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
//                     <Target className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
//                   </div>
//                   Service Overview
//                 </h2>
//                 <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
//                   <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
//                     {service.full_description || service.description}
//                   </p>
//                 </div>
//               </div>

//               {/* Quick Info Card */}
//               <div className="lg:col-span-4">
//                 <div className="bg-gradient-to-br from-emerald-500/5 to-emerald-900/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-soft border border-emerald-500/20 lg:sticky lg:top-24">
//                   <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base flex items-center gap-2">
//                     <Award className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
//                     Why Choose Us
//                   </h3>
//                   <div className="space-y-3">
//                     <div className="flex items-start gap-3 p-2 sm:p-3 rounded-lg hover:bg-emerald-500/5 transition-colors">
//                       <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
//                       <div>
//                         <p className="text-xs sm:text-sm font-medium">Trusted & Reliable</p>
//                         <p className="text-xs text-muted-foreground mt-0.5">Proven track record</p>
//                       </div>
//                     </div>
//                     <div className="flex items-start gap-3 p-2 sm:p-3 rounded-lg hover:bg-emerald-500/5 transition-colors">
//                       <Zap className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
//                       <div>
//                         <p className="text-xs sm:text-sm font-medium">Fast & Efficient</p>
//                         <p className="text-xs text-muted-foreground mt-0.5">Quick turnaround time</p>
//                       </div>
//                     </div>
//                     <div className="flex items-start gap-3 p-2 sm:p-3 rounded-lg hover:bg-emerald-500/5 transition-colors">
//                       <Users className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
//                       <div>
//                         <p className="text-xs sm:text-sm font-medium">Expert Team</p>
//                         <p className="text-xs text-muted-foreground mt-0.5">Skilled professionals</p>
//                       </div>
//                     </div>
//                   </div>
//                   <Button
//                     size="sm"
//                     className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm"
//                     asChild
//                   >
//                     <Link to="/contact">Get Started Today</Link>
//                   </Button>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Features */}
//             {service.features && service.features.length > 0 && (
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-100px" }}
//                 transition={{ duration: 0.5, delay: 0.1 }}
//               >
//                 <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 flex items-center gap-3">
//                   <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
//                     <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
//                   </div>
//                   What We Offer
//                 </h2>
//                 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
//                   {service.features.map((feature, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, y: 20 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ delay: index * 0.1 }}
//                       whileHover={{ scale: 1.02 }}
//                       className="flex items-start gap-3 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-card shadow-soft border border-border/50 hover:border-emerald-500/30 hover:shadow-xl transition-all cursor-default"
//                     >
//                       <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 shrink-0 mt-0.5" />
//                       <span className="text-sm sm:text-base font-medium leading-snug">{feature}</span>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>
//             )}

//             {/* Benefits */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 flex items-center gap-3">
//                 <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
//                   <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
//                 </div>
//                 Key Benefits
//               </h2>
//               <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//                 {benefits.map((benefit, index) => {
//                   const Icon = benefit.icon;
//                   return (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, y: 20 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ delay: index * 0.1 }}
//                       whileHover={{ y: -5 }}
//                       className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-card shadow-soft border border-border/50 hover:border-emerald-500/30 hover:shadow-xl transition-all"
//                     >
//                       <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl bg-emerald-500/10 flex items-center justify-center">
//                         <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
//                       </div>
//                       <h3 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2">{benefit.title}</h3>
//                       <p className="text-xs sm:text-sm text-muted-foreground">{benefit.description}</p>
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             </motion.div>

//             {/* Related Services */}
//             {relatedServices.length > 0 && (
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-100px" }}
//                 transition={{ duration: 0.5, delay: 0.3 }}
//               >
//                 <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 flex items-center gap-3">
//                   <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
//                     <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
//                   </div>
//                   Related Services
//                 </h2>
//                 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                   {relatedServices.map((relService, index) => (
//                     <Link key={relService.id} to={`/services/${relService.slug}`}>
//                       <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ delay: index * 0.1 }}
//                         whileHover={{ y: -8 }}
//                         className="group bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-soft border border-border/50 hover:border-emerald-500/30 hover:shadow-xl transition-all cursor-pointer h-full"
//                       >
//                         <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
//                           <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />
//                         </div>
//                         <h3 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-emerald-600 transition-colors">
//                           {relService.title}
//                         </h3>
//                         <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3">
//                           {relService.description}
//                         </p>
//                         <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-600 font-medium">
//                           Learn More <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
//                         </div>
//                       </motion.div>
//                     </Link>
//                   ))}
//                 </div>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-emerald-500/5 to-black/20">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="max-w-4xl mx-auto text-center"
//           >
//             <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
//               <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
//             </div>
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
//               Ready to Get Started?
//             </h2>
//             <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
//               Let's discuss how our {service.title.toLowerCase()} services can help your organization achieve its goals.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-2xl mx-auto">
//               <Button
//                 size="lg"
//                 className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1 sm:flex-none"
//                 asChild
//               >
//                 <Link to="/contact">
//                   <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> Contact Us
//                 </Link>
//               </Button>
//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="border-emerald-500/20 hover:border-emerald-500 hover:bg-emerald-500/10 flex-1 sm:flex-none"
//                 asChild
//               >
//                 <a href="tel:+919123456789">
//                   <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> Call Now
//                 </a>
//               </Button>
//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="border-green-600/30 text-green-600 hover:bg-green-600/10 hover:border-green-600 flex-1 sm:flex-none"
//                 asChild
//               >
//                 <a href="https://wa.me/919540603737" target="_blank" rel="noopener noreferrer">
//                   <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> WhatsApp
//                 </a>
//               </Button>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default ServiceDetails;
















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
// import { useState, useEffect } from "react";
// import { Layout } from "@/components/layout/Layout";
// import { animate, motion, useMotionValue, useTransform } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { 
//   Search, Users, Building, Handshake, Target, HeartHandshake, 
//   ArrowRight, CheckCircle, Briefcase, Loader2, Settings, Filter,
//   X, Sparkles, TrendingUp, Award, UserCheck
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// import servicecta from "@/assets/servicecta.png"

// interface Service {
//   id: string;
//   title: string;
//   description: string;
//   full_description: string | null;
//   slug: string;
//   icon: string | null;
//   features: string[] | null;
//   cover_image_url: string | null;
//   is_active: boolean | null;
//   category?: string;
// }

// // Icon mapping
// const iconMap: { [key: string]: any } = {
//   Search,
//   Users,
//   Building,
//   Handshake,
//   Target,
//   HeartHandshake,
//   Briefcase,
//   Settings,
// };

// // Categories
// const categories = [
//   { id: "all", name: "All Services", icon: Sparkles },
//   { id: "recruitment", name: "Recruitment", icon: Users },
//   { id: "consulting", name: "Consulting", icon: Briefcase },
//   { id: "executive", name: "Executive Search", icon: Target },
//   { id: "staffing", name: "Staffing Solutions", icon: Building },
// ];



// const AnimatedNumber = ({ value }: { value: number }) => {
//   const count = useMotionValue(0);
//   const rounded = useTransform(count, latest => Math.round(latest));

//   useEffect(() => {
//     const controls = animate(count, value, {
//       duration: 2.5,
//       ease: "easeOut",
//     });
//     return controls.stop;
//   }, [value]);

//   return <motion.span>{rounded}</motion.span>;
// };

// const Services = () => {
//   const [services, setServices] = useState<Service[]>([]);
//   const [filteredServices, setFilteredServices] = useState<Service[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showFilters, setShowFilters] = useState(false);

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   useEffect(() => {
//     filterServices();
//   }, [services, selectedCategory, searchQuery]);

//   const fetchServices = async () => {
//     try {
//       const { data, error } = await supabase
//         .from("services")
//         .select("*")
//         .eq("is_active", true)
//         .order("display_order", { ascending: true });

//       if (error) throw error;
//       setServices(data || []);
//     } catch (error) {
//       console.error("Error fetching services:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterServices = () => {
//     let filtered = [...services];

//     if (selectedCategory !== "all") {
//       filtered = filtered.filter(
//         (service) => service.category?.toLowerCase() === selectedCategory.toLowerCase()
//       );
//     }

//     if (searchQuery) {
//       filtered = filtered.filter(
//         (service) =>
//           service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           service.description.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredServices(filtered);
//   };

//   const getIcon = (iconName: string | null) => {
//     if (!iconName) return Briefcase;
//     return iconMap[iconName] || Briefcase;
//   };

//   return (
//     <Layout>
//       {/* Hero Section with Background Image */}
//     <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
//   {/* Background Images */}
//   <div className="absolute inset-0">
    
//     {/* Desktop Background */}
//     <img
//       src="https://i.postimg.cc/MH12dkr0/Gemini-Generated-Image-326mur326mur326m-(1)-(1).png?q=80&w=2187"
//       alt="Professional recruitment services"
//       className="hidden md:block w-full h-full object-cover"
//     />

//     {/* Mobile Background */}
//     <img
//       src="https://i.postimg.cc/Zqmmgqhg/unnamed-(31)-(1)-(1).jpg?q=80&w=1080"
//       alt="Recruitment services mobile"
//       className="block md:hidden w-full h-full object-cover"
//     />

//     {/* Overlays */}
//     <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
//     <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
//   </div>

//   {/* Hero Content */}
//   <div className="container mx-auto px-4 lg:px-8 h-full flex items-center relative z-10">
//     <div className="max-w-3xl">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm text-white text-sm font-semibold mb-6 border border-white/20">
//           <Sparkles className="w-4 h-4" />
//           Our Best Recruitment Service Providers
//         </span>

//         <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
//           Comprehensive{" "}
//           <span className="text-primary">Recruitment</span>
//           <br />
//           Solutions
//         </h1>

//         <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
//           From executive search to HR consulting, we offer tailored solutions to
//           meet all your staffing needs with excellence and precision.
//         </p>

//         <div className="flex flex-col sm:flex-row gap-4">
//           <Button
//             size="lg"
//             className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all"
//             asChild
//           >
//             <Link to="/contact">
//               Get Started <ArrowRight className="w-5 h-5 ml-2" />
//             </Link>
//           </Button>

//           <Button
//             variant="outline"
//             size="lg"
//             className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg rounded-full backdrop-blur-sm transition-all"
//             asChild
//           >
//             <Link to="/jobs">
//               Browse Jobs <ArrowRight className="w-5 h-5 ml-2" />
//             </Link>
//           </Button>
//         </div>
//       </motion.div>
//     </div>
//   </div>
// </section>


//       {/* Dark Stats Section */}
//    <section className="bg-black text-white py-10 lg:py-12">
//   <div className="container mx-auto px-4 lg:px-8">
//     <div className="grid lg:grid-cols-2 gap-8 items-center">

//       {/* LEFT: Stats */}
//       <motion.div
//         initial={{ opacity: 0, x: -20 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.5 }}
//         viewport={{ once: true }}
//         className="order-2 lg:order-1 grid grid-cols-2 gap-4"
//       >
//         {/* Card 1 */}
//         <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_10px_25px_rgba(0,0,0,0.18)] hover:-translate-y-1 transition-all duration-300">
//           <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
//             <Users className="w-6 h-6 text-emerald-600" />
//           </div>
//           <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
//             <AnimatedNumber value={100} />K+
//           </h3>
//           <p className="text-gray-600 text-sm font-medium">
//             Positive Reviews
//           </p>
//         </div>

//         {/* Card 2 */}
//         <div className="bg-emerald-600 rounded-xl p-5 shadow-[0_12px_28px_rgba(0,0,0,0.35)] hover:-translate-y-1 transition-all duration-300">
//           <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center mb-3">
//             <Target className="w-6 h-6 text-white" />
//           </div>
//           <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
//             <AnimatedNumber value={98} />%
//           </h3>
//           <p className="text-emerald-50 text-sm font-medium">
//             Client Satisfaction
//           </p>
//         </div>

//         {/* Card 3 */}
//         <div className="bg-emerald-600 rounded-xl p-5 shadow-[0_12px_28px_rgba(0,0,0,0.35)] hover:-translate-y-1 transition-all duration-300">
//           <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center mb-3">
//             <Award className="w-6 h-6 text-white" />
//           </div>
//           <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
//             <AnimatedNumber value={50} />+
//           </h3>
//           <p className="text-emerald-50 text-sm font-medium">
//             Industry Awards
//           </p>
//         </div>

//         {/* Card 4 */}
//         <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_10px_25px_rgba(0,0,0,0.18)] hover:-translate-y-1 transition-all duration-300">
//           <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
//             <UserCheck className="w-6 h-6 text-emerald-600" />
//           </div>
//           <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
//             <AnimatedNumber value={5} />K+
//           </h3>
//           <p className="text-gray-600 text-sm font-medium">
//             Placements
//           </p>
//         </div>
//       </motion.div>

//       {/* RIGHT: Content */}
//       <motion.div
//         initial={{ opacity: 0, x: 20 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.5 }}
//         viewport={{ once: true }}
//         className="order-1 lg:order-2"
//       >
//         <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-4">
//           <Award className="w-3.5 h-3.5" />
//           Our Services
//         </div>

//         <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
//           We Offer Comprehensive{" "}
//           <span className="text-primary">Recruitment Services</span>
//         </h2>

//         <p className="text-gray-400 text-base leading-relaxed mb-6 max-w-xl">
//           We provide end-to-end recruitment solutions tailored to your industry.
//           From skilled labor to leadership roles — we deliver talent that performs. <br></br>
//           We offer end-to-end recruitment solutions tailored to your industry needs. From skilled labor
//           to experienced professionals and leadership roles, we ensure the right talent that delivers performance and results.
//         </p>

//         <Button
//           size="sm"
//           className="bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-full text-sm"
//           asChild
//         >
//           <Link to="/about">
//             Learn More <ArrowRight className="w-4 h-4 ml-2" />
//           </Link>
//         </Button>
//       </motion.div>

//     </div>
//   </div>
// </section>



//       {/* Filter Section */}
//       <section className="py-8 bg-background/95 backdrop-blur-sm sticky top-0 z-40 border-b">
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
//             {/* Search Bar */}
//             <div className="relative w-full lg:w-96">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//               <input
//                 type="text"
//                 placeholder="Search services..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-10 py-3 rounded-xl border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//               />
//               {searchQuery && (
//                 <button
//                   onClick={() => setSearchQuery("")}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               )}
//             </div>

//             {/* Category Filters */}
//             <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-card hover:bg-accent transition-colors"
//               >
//                 <Filter className="w-4 h-4" />
//                 Filters
//               </button>

//               <div className={`${showFilters ? 'flex' : 'hidden lg:flex'} flex-wrap gap-2`}>
//                 {categories.map((category) => {
//                   const IconComponent = category.icon;
//                   return (
//                     <button
//                       key={category.id}
//                       onClick={() => setSelectedCategory(category.id)}
//                       className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all ${
//                         selectedCategory === category.id
//                           ? "bg-primary text-primary-foreground shadow-lg"
//                           : "bg-card hover:bg-accent border"
//                       }`}
//                     >
//                       <IconComponent className="w-4 h-4" />
//                       <span className="text-sm">{category.name}</span>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Results Count */}
//           <p className="text-sm text-muted-foreground mt-4 text-center lg:text-left">
//             {loading ? (
//               "Loading services..."
//             ) : (
//               `Showing ${filteredServices.length} of ${services.length} service${services.length !== 1 ? 's' : ''}`
//             )}
//           </p>
//         </div>
//       </section>

//       {/* Services Grid */}
//       <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/20">
//         <div className="container mx-auto px-4 lg:px-8">
//           {loading ? (
//             <div className="flex flex-col items-center justify-center py-20">
//               <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
//               <p className="text-muted-foreground">Loading our services...</p>
//             </div>
//           ) : filteredServices.length === 0 ? (
//             <div className="text-center py-20">
//               <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
//                 <Search className="w-10 h-10 text-muted-foreground" />
//               </div>
//               <h3 className="text-2xl font-bold mb-2">No services found</h3>
//               <p className="text-muted-foreground mb-6">
//                 {searchQuery
//                   ? `No services match "${searchQuery}". Try a different search term.`
//                   : "Check back soon for our comprehensive service offerings."}
//               </p>
//               {searchQuery && (
//                 <Button variant="outline" onClick={() => setSearchQuery("")}>
//                   <X className="w-4 h-4 mr-2" />
//                   Clear Search
//                 </Button>
//               )}
//             </div>
//           ) : (
//             <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
//               {filteredServices.map((service, index) => {
//                 const IconComponent = getIcon(service.icon);
//                 return (
//                   <motion.div
//                     key={service.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.4, delay: index * 0.1 }}
//                     viewport={{ once: true }}
//                     className="group"
//                   >
//                     <Link to={`/services/${service.slug}`}>
//                       <div className="h-full bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2">
//                         {/* Image/Icon Header */}
//                         <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5">
//                           {service.cover_image_url ? (
//                             <>
//                               <img
//                                 src={service.cover_image_url}
//                                 alt={service.title}
//                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                               />
//                               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                             </>
//                           ) : (
//                             <div className="w-full h-full flex items-center justify-center">
//   <img
//     src="{management}"
//     alt="Recruitment Icon"
//     className="w-28 h-28 opacity-30"
//   />
// </div>

//                           )}
                          
//                           {/* Icon Badge */}
//                           <div className="absolute bottom-4 left-4 w-16 h-16 rounded-xl bg-primary shadow-xl flex items-center justify-center border-4 border-white/10">
//                             <IconComponent className="w-8 h-8 text-white" />
//                           </div>

//                           {/* Category Badge */}
//                           {service.category && (
//                             <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 text-xs font-bold text-white">
//                               {service.category}
//                             </div>
//                           )}

//                           {/* Diagonal Arrow */}
//                           <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rotate-[-45deg]">
//                             <ArrowRight className="w-5 h-5 text-white" />
//                           </div>
//                         </div>

//                         {/* Content */}
//                         <div className="p-6 bg-white/50 backdrop-blur-sm">
//                           <h3 className="text-xl lg:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
//                             {service.title}
//                           </h3>
//                           <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
//                             {service.description}
//                           </p>

//                           {/* Features Preview */}
//                           {service.features && service.features.length > 0 && (
//                             <div className="space-y-2 mb-5">
//                               {service.features.slice(0, 3).map((feature, idx) => (
//                                 <div key={idx} className="flex items-start gap-2">
//                                   <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
//                                   <span className="text-sm text-muted-foreground line-clamp-1">
//                                     {feature}
//                                   </span>
//                                 </div>
//                               ))}
//                               {service.features.length > 3 && (
//                                 <span className="inline-block text-xs text-primary font-semibold bg-primary/10 px-2 py-1 rounded-md">
//                                   +{service.features.length - 3} more features
//                                 </span>
//                               )}
//                             </div>
//                           )}

//                           {/* CTA */}
//                           <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all pt-2 border-t border-primary/20">
//                             <span>Learn More</span>
//                             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* CTA Section */}
   

// <div className="relative w-full h-[400px] md:h-[500px]  overflow-hidden">
//   {/* Background Image */}
//   <img
//     src="https://i.postimg.cc/8ChwNY1F/Chat-GPT-Image-Jan-30-2026-06-58-00-PM.png"
//     alt="Businessman on call"
//     className="w-full h-full object-cover object-[center_30%]"
//   />
//   {/* Gradient Overlay (soft, not blocking the image) */}
//   <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
//   {/* CTA Content */}
//   <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-10 lg:px-20 text-white max-w-3xl">
//     <button className="bg-emerald-600 px-5 py-2 rounded-full text-sm w-fit mb-5 hover:bg-emerald-700 transition-colors">
//       Get Started Today
//     </button>
//     <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
//       Ready to Find the <span className="text-emerald-400">Perfect Match?</span>
//     </h1>
//     <p className="text-base md:text-lg mt-4 text-gray-200 max-w-xl">
//       Let's discuss how we can help you find the right talent or the perfect opportunity for your career growth.
//     </p>
//     <div className="flex flex-col sm:flex-row gap-4 mt-8">
//       <button className="bg-emerald-600 px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all">
//         Contact Us
//       </button>
//       <button className="border-2 border-white/40 px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all">
//         Browse Jobs
//       </button>
//     </div>
//   </div>
// </div>

//     </Layout>
//   );
// };

// export default Services; 










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
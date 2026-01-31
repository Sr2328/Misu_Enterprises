// import { useState, useEffect } from "react";
// import { Layout } from "@/components/layout/Layout";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Calendar, User, ArrowRight, Clock, Loader2, FileText, Search, TrendingUp } from "lucide-react";
// import { Link } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// import { Input } from "@/components/ui/input";

// interface BlogPost {
//   id: string;
//   title: string;
//   excerpt: string | null;
//   slug: string;
//   category: string | null;
//   read_time: string | null;
//   cover_image_url: string | null;
//   published_at: string | null;
//   created_at: string;
//   is_published: boolean | null;
//   author_name?: string | null;
// }

// const categories = [
//   "All",
//   "Career Advice",
//   "Interview Tips",
//   "Resume Writing",
//   "Industry Trends",
//   "Skill Development",
//   "Work Culture",
//   "Job Search",
//   "HR Insights",
// ];

// const Blog = () => {
//   const [posts, setPosts] = useState<BlogPost[]>([]);
//   const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   useEffect(() => {
//     filterPosts();
//   }, [selectedCategory, searchQuery, posts]);

//   const fetchPosts = async () => {
//     try {
//       const { data, error } = await supabase
//         .from("blog_posts")
//         .select("*")
//         .eq("is_published", true)
//         .order("published_at", { ascending: false });

//       if (error) throw error;
//       setPosts(data || []);
//       if (data && data.length > 0) {
//         setFeaturedPost(data[0]);
//       }
//     } catch (error) {
//       console.error("Error fetching blog posts:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterPosts = () => {
//     let filtered = posts;

//     // Filter by category
//     if (selectedCategory !== "All") {
//       filtered = filtered.filter((post) => post.category === selectedCategory);
//     }

//     // Filter by search query
//     if (searchQuery) {
//       filtered = filtered.filter(
//         (post) =>
//           post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredPosts(filtered);
//   };

//   const formatDate = (dateString: string | null) => {
//     if (!dateString) return "";
//     return new Date(dateString).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   // Loading animation component
//   const LoadingSpinner = () => (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="min-h-[400px] flex flex-col items-center justify-center px-4"
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
//         Loading articles...
//       </motion.p>
//     </motion.div>
//   );

//   return (
//     <Layout>
//       {/* Hero */}
//       <section className="gradient-hero py-12 sm:py-16 lg:py-20">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="max-w-4xl mx-auto"
//           >
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.1 }}
//               className="text-center mb-8 sm:mb-10"
//             >
//               <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
//                 Blog & Resources
//               </span>
//               <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
//                 Insights & <span className="text-emerald-600 dark:text-emerald-400">Career Tips</span>
//               </h1>
//               <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
//                 Stay updated with the latest industry trends, career advice, and HR best practices.
//               </p>
//             </motion.div>

//             {/* Search Bar */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="relative max-w-2xl mx-auto"
//             >
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//               <Input
//                 type="text"
//                 placeholder="Search articles..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-12 h-12 sm:h-14 text-sm sm:text-base bg-background/80 backdrop-blur-sm border-2 focus:border-emerald-500"
//               />
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Categories */}
//       <section className="py-6 sm:py-8 border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-md z-40">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide pb-2 sm:pb-0"
//           >
//             {categories.map((category, index) => (
//               <motion.button
//                 key={category}
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 + index * 0.05 }}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
//                   selectedCategory === category
//                     ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
//                     : "bg-card hover:bg-emerald-500/10 text-muted-foreground hover:text-emerald-600 border border-border/50"
//                 }`}
//               >
//                 {category}
//               </motion.button>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {loading ? (
//         <AnimatePresence>
//           <LoadingSpinner />
//         </AnimatePresence>
//       ) : posts.length === 0 ? (
//         <section className="py-16 sm:py-20 lg:py-24">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="text-center py-12 sm:py-16"
//             >
//               <motion.div
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 transition={{ type: "spring", delay: 0.1 }}
//                 className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center"
//               >
//                 <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600" />
//               </motion.div>
//               <h3 className="text-xl sm:text-2xl font-semibold mb-2">No blog posts yet</h3>
//               <p className="text-sm sm:text-base text-muted-foreground">
//                 Check back soon for insightful articles and career tips.
//               </p>
//             </motion.div>
//           </div>
//         </section>
//       ) : (
//         <>
//           {/* Featured Post */}
//           {featuredPost && selectedCategory === "All" && !searchQuery && (
//             <section className="py-8 sm:py-12 lg:py-16">
//               <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//                 <motion.div
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   className="mb-8 sm:mb-12"
//                 >
//                   <div className="flex items-center gap-2 mb-4 sm:mb-6">
//                     <TrendingUp className="w-5 h-5 text-emerald-600" />
//                     <h2 className="text-lg sm:text-xl font-semibold">Featured Article</h2>
//                   </div>
//                   <Link to={`/blog/${featuredPost.slug}`}>
//                     <motion.article
//                       whileHover={{ y: -5 }}
//                       className="group relative bg-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all cursor-pointer"
//                     >
//                       <div className="grid md:grid-cols-2 gap-0">
//                         {/* Image */}
//                         <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
//                           {featuredPost.cover_image_url ? (
//                             <img
//                               src={featuredPost.cover_image_url}
//                               alt={featuredPost.title}
//                               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                             />
//                           ) : (
//                             <div className="w-full h-full bg-gradient-to-br from-emerald-500/30 to-emerald-900/20 flex items-center justify-center">
//                               <span className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-emerald-500/20 text-emerald-400 text-sm sm:text-base font-medium">
//                                 {featuredPost.category || "Featured"}
//                               </span>
//                             </div>
//                           )}
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
//                         </div>

//                         {/* Content */}
//                         <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center text-white">
//                           {featuredPost.category && (
//                             <span className="inline-block w-fit px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
//                               {featuredPost.category}
//                             </span>
//                           )}
//                           <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 group-hover:text-emerald-400 transition-colors line-clamp-2">
//                             {featuredPost.title}
//                           </h3>
//                           {featuredPost.excerpt && (
//                             <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3">
//                               {featuredPost.excerpt}
//                             </p>
//                           )}
//                           <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
//                             {featuredPost.author_name && (
//                               <div className="flex items-center gap-2">
//                                 <User className="w-4 h-4" />
//                                 <span>{featuredPost.author_name}</span>
//                               </div>
//                             )}
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4" />
//                               <span>{formatDate(featuredPost.published_at || featuredPost.created_at)}</span>
//                             </div>
//                             {featuredPost.read_time && (
//                               <div className="flex items-center gap-2">
//                                 <Clock className="w-4 h-4" />
//                                 <span>{featuredPost.read_time}</span>
//                               </div>
//                             )}
//                           </div>
//                           <div className="mt-6 sm:mt-8">
//                             <Button
//                               variant="default"
//                               className="bg-emerald-600 hover:bg-emerald-700 text-white group-hover:scale-105 transition-transform"
//                             >
//                               Read Article <ArrowRight className="w-4 h-4 ml-2" />
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     </motion.article>
//                   </Link>
//                 </motion.div>
//               </div>
//             </section>
//           )}

//           {/* Blog Grid */}
//           <section className="py-8 sm:py-12 lg:py-16">
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//               {filteredPosts.length === 0 ? (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="text-center py-12 sm:py-16"
//                 >
//                   <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground/50 mx-auto mb-3 sm:mb-4" />
//                   <h3 className="text-lg sm:text-xl font-semibold mb-2">No articles found</h3>
//                   <p className="text-sm sm:text-base text-muted-foreground">
//                     Try adjusting your filters or search query.
//                   </p>
//                 </motion.div>
//               ) : (
//                 <>
//                   <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
//                     {filteredPosts.map((post, index) => {
//                       // Skip featured post in grid if showing featured section
//                       if (
//                         selectedCategory === "All" &&
//                         !searchQuery &&
//                         featuredPost &&
//                         post.id === featuredPost.id
//                       ) {
//                         return null;
//                       }

//                       return (
//                         <Link to={`/blog/${post.slug}`} key={post.id}>
//                           <motion.article
//                             initial={{ opacity: 0, y: 30 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             viewport={{ once: true, margin: "-50px" }}
//                             transition={{ delay: index * 0.1 }}
//                             whileHover={{ y: -8 }}
//                             className="group bg-card rounded-xl sm:rounded-2xl overflow-hidden shadow-soft border border-border/50 hover:shadow-xl hover:border-emerald-500/30 transition-all cursor-pointer h-full flex flex-col"
//                           >
//                             {post.cover_image_url ? (
//                               <div className="h-48 sm:h-56 overflow-hidden relative">
//                                 <img
//                                   src={post.cover_image_url}
//                                   alt={post.title}
//                                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                                 />
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                               </div>
//                             ) : (
//                               <div className="h-48 sm:h-56 bg-gradient-to-br from-emerald-500/20 to-emerald-900/10 flex items-center justify-center relative overflow-hidden">
//                                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]"></div>
//                                 <span className="relative px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
//                                   {post.category || "Article"}
//                                 </span>
//                               </div>
//                             )}
//                             <div className="p-4 sm:p-6 flex flex-col flex-grow">
//                               {post.category && (
//                                 <span className="inline-block w-fit px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium mb-3">
//                                   {post.category}
//                                 </span>
//                               )}
//                               <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
//                                 {post.title}
//                               </h2>
//                               {post.excerpt && (
//                                 <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-2 flex-grow">
//                                   {post.excerpt}
//                                 </p>
//                               )}
//                               <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground mt-auto pt-4 border-t border-border/50">
//                                 <div className="flex items-center gap-1.5">
//                                   <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                                   <span>{formatDate(post.published_at || post.created_at)}</span>
//                                 </div>
//                                 {post.read_time && (
//                                   <div className="flex items-center gap-1.5">
//                                     <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                                     <span>{post.read_time}</span>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </motion.article>
//                         </Link>
//                       );
//                     })}
//                   </div>

//                   {/* Load More */}
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     viewport={{ once: true }}
//                     className="text-center mt-8 sm:mt-12 lg:mt-16"
//                   >
//                     <Button
//                       variant="outline"
//                       size="lg"
//                       className="border-2 border-emerald-500/20 hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-600 transition-all group"
//                     >
//                       Load More Articles
//                       <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//                     </Button>
//                   </motion.div>
//                 </>
//               )}
//             </div>
//           </section>
//         </>
//       )}

//       {/* Newsletter CTA */}
//       <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-emerald-500/5 to-black/20">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="max-w-2xl mx-auto text-center"
//           >
//             <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
//               <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
//             </div>
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
//               Never Miss an Update
//             </h2>
//             <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
//               Subscribe to our newsletter for the latest career tips, industry insights, and job opportunities.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
//               <Input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="flex-1 h-11 sm:h-12 text-sm sm:text-base"
//               />
//               <Button
//                 size="lg"
//                 className="bg-emerald-600 hover:bg-emerald-700 text-white whitespace-nowrap"
//               >
//                 Subscribe
//               </Button>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default Blog;









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
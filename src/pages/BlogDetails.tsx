// import { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Layout } from "@/components/layout/Layout";
// import { Button } from "@/components/ui/button";
// import { FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

// import { 
//   ArrowLeft, 
//   Calendar, 
//   Clock, 
//   User, 
//   Share2, 
//   Facebook, 
//   Twitter, 
//   Linkedin, 
//   Loader2,
//   Bookmark,
//   BookmarkCheck,
//   TrendingUp,
//   Tag,
//   Eye,
//   MessageCircle
// } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";

// interface BlogPost {
//   id: string;
//   title: string;
//   content: string;
//   excerpt: string | null;
//   slug: string;
//   category: string | null;
//   read_time: string | null;
//   cover_image_url: string | null;
//   published_at: string | null;
//   created_at: string;
//   author_name?: string | null;
//   tags?: string[] | null;
// }

// const BlogDetails = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const [post, setPost] = useState<BlogPost | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
//   const [isBookmarked, setIsBookmarked] = useState(false);

//   useEffect(() => {
//     // Enable smooth scrolling
//     document.documentElement.style.scrollBehavior = 'smooth';
//     window.scrollTo({ top: 0, behavior: 'smooth' });

//     if (slug) {
//       fetchPost();
//     }

//     return () => {
//       document.documentElement.style.scrollBehavior = 'auto';
//     };
//   }, [slug]);

//   const fetchPost = async () => {
//     try {
//       const { data, error } = await supabase
//         .from("blog_posts")
//         .select("*")
//         .eq("slug", slug)
//         .eq("is_published", true)
//         .maybeSingle();

//       if (error) throw error;
//       if (!data) {
//         navigate("/blog");
//         return;
//       }

//       setPost(data);

//       // Fetch related posts
//       const { data: related } = await supabase
//         .from("blog_posts")
//         .select("*")
//         .eq("is_published", true)
//         .neq("id", data.id)
//         .limit(4);

//       setRelatedPosts(related || []);
//     } catch (error) {
//       console.error("Error fetching blog post:", error);
//       navigate("/blog");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString: string | null) => {
//     if (!dateString) return "";
//     return new Date(dateString).toLocaleDateString("en-US", {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   const handleShare = (platform: string) => {
//     const url = window.location.href;
//     const title = post?.title || "";
    
//     const shareUrls: Record<string, string> = {
//       facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
//       twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
//       linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
//     };
    
//     window.open(shareUrls[platform], '_blank', 'width=600,height=400');
//   };

//   const toggleBookmark = () => {
//     setIsBookmarked(!isBookmarked);
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
//         Loading article...
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

//   if (!post) {
//     return (
//       <Layout>
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="min-h-screen flex items-center justify-center px-4"
//         >
//           <div className="text-center">
//             <h2 className="text-xl sm:text-2xl font-bold mb-2">Post not found</h2>
//             <p className="text-muted-foreground mb-4 text-sm sm:text-base">
//               The article you're looking for doesn't exist or has been removed.
//             </p>
//             <Link to="/blog">
//               <Button className="bg-emerald-600 hover:bg-emerald-700 mt-8">Back to Blog</Button>
//             </Link>
//           </div>
//         </motion.div>s
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       {/* Banner Image */}
//       {post.cover_image_url && (
//         <section className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
//           <motion.div
//             initial={{ scale: 1.1, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.6 }}
//             className="absolute inset-0"
//           >
//             <img
//               src={post.cover_image_url}
//               alt={post.title}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
//           </motion.div>

//           {/* Back Button Overlay */}
//           <div className="absolute top-4 sm:top-6 left-4 sm:left-6 lg:left-8 z-10 mt-8">
//             <Link to="/blog">
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <Button
//                   variant="outline"
//                   size="default"
//                   className="bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-black/70 "
//                 >
//                   <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
//                 </Button>
//               </motion.div>
//             </Link>
//           </div>

//           {/* Title Overlay */}
//           <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
//             <div className="container mx-auto max-w-5xl">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//               >
//                 {post.category && (
//                   <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-500/90 text-white text-xs sm:text-sm font-medium mb-3 sm:mb-4">
//                     {post.category}
//                   </span>
//                 )}
//                 <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
//                   {post.title}
//                 </h1>
//               </motion.div>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* No Banner - Header */}
//       {!post.cover_image_url && (
//         <section className="gradient-hero py-8 sm:py-12 lg:py-16">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="max-w-4xl mx-auto"
//             >
//               <Link to="/blog">
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.1 }}
//                   className="inline-flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-emerald-600 mb-4 sm:mb-6 transition-colors"
//                 >
//                   <ArrowLeft className="w-4 h-4" /> Back to Blog
//                 </motion.div>
//               </Link>
              
//               {post.category && (
//                 <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
//                   {post.category}
//                 </span>
//               )}
              
//               <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
//                 {post.title}
//               </h1>
//             </motion.div>
//           </div>
//         </section>
//       )}

//       {/* Meta Info Bar */}
//       <section className="border-y border-border/50 bg-card/50 sticky top-0 z-30 backdrop-blur-sm">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
//           <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 sm:gap-4">
//             <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
//               <motion.div
//                 initial={{ opacity: 0, x: -10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.4 }}
//                 className="flex items-center gap-2"
//               >
//                 <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
//                   <User className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
//                 </div>
//                 <div>
//                   <p className="text-foreground font-medium text-xs sm:text-sm">
//                     {post.author_name || "Author"}
//                   </p>
//                 </div>
//               </motion.div>
//               <motion.div
//                 initial={{ opacity: 0, x: -10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.5 }}
//                 className="flex items-center gap-1.5 sm:gap-2"
//               >
//                 <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                 <span>{formatDate(post.published_at || post.created_at)}</span>
//               </motion.div>
//               {post.read_time && (
//                 <motion.div
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.6 }}
//                   className="flex items-center gap-1.5 sm:gap-2"
//                 >
//                   <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                   <span>{post.read_time}</span>
//                 </motion.div>
//               )}
//             </div>

//             <motion.div
//               initial={{ opacity: 0, x: 10 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.5 }}
//               className="flex items-center gap-2"
//             >
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={toggleBookmark}
//                 className="hover:text-emerald-600"
//               >
//                 {isBookmarked ? (
//                   <BookmarkCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
//                 ) : (
//                   <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
//                 )}
//               </Button>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Content */}
//       <section className="py-8 sm:py-12 lg:py-16">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             <div className="grid lg:grid-cols-12 gap-6 lg:gap-12">
//               {/* Main Content - No Box */}
//               <motion.article
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="lg:col-span-8"
//               >
//                 <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
//                   <div className="text-muted-foreground leading-relaxed space-y-4 sm:space-y-6">
//                     {post.excerpt && (
//                       <p className="text-lg sm:text-xl text-foreground font-medium leading-relaxed border-l-4 border-emerald-500 pl-4 sm:pl-6 py-2">
//                         {post.excerpt}
//                       </p>
//                     )}
                    
//                     {post.content.split('\n\n').map((paragraph, index) => {
//                       if (paragraph.startsWith('### ')) {
//                         return (
//                           <h3 key={index} className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">
//                             {paragraph.replace('### ', '')}
//                           </h3>
//                         );
//                       }
//                       if (paragraph.startsWith('## ')) {
//                         return (
//                           <h2 key={index} className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mt-8 sm:mt-10 mb-4 sm:mb-6">
//                             {paragraph.replace('## ', '')}
//                           </h2>
//                         );
//                       }
//                       if (paragraph.startsWith('# ')) {
//                         return (
//                           <h1 key={index} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mt-8 sm:mt-10 mb-4 sm:mb-6">
//                             {paragraph.replace('# ', '')}
//                           </h1>
//                         );
//                       }
//                       return (
//                         <p key={index} className="text-sm sm:text-base lg:text-lg leading-relaxed">
//                           {paragraph}
//                         </p>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Tags */}
//                 {post.tags && post.tags.length > 0 && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50"
//                   >
//                     <div className="flex items-center gap-2 mb-3 sm:mb-4">
//                       <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
//                       <h3 className="text-sm sm:text-base font-semibold">Tags</h3>
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                       {post.tags.map((tag, index) => (
//                         <span
//                           key={index}
//                           className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-medium"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}

//                 {/* Share at Bottom */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50"
//                 >
//                   <h3 className="font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
//                     <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" /> Share this article
//                   </h3>
//                   <div className="flex flex-wrap gap-2 sm:gap-3">
//   <Button
//     variant="outline"
//     size="sm"
//     onClick={() => handleShare("facebook")}
//     className="flex-1 sm:flex-none border-emerald-500/20 hover:border-emerald-500 hover:bg-emerald-500/10"
//   >
//     <FaFacebookF className="w-4 h-4 mr-2" />
//     Facebook
//   </Button>

//   <Button
//     variant="outline"
//     size="sm"
//     onClick={() => handleShare("twitter")}
//     className="flex-1 sm:flex-none border-emerald-500/20 hover:border-emerald-500 hover:bg-emerald-500/10"
//   >
//     <FaXTwitter className="w-4 h-4 mr-2" />
//     X
//   </Button>

//   <Button
//     variant="outline"
//     size="sm"
//     onClick={() => handleShare("linkedin")}
//     className="flex-1 sm:flex-none border-emerald-500/20 hover:border-emerald-500 hover:bg-emerald-500/10"
//   >
//     <FaLinkedinIn className="w-4 h-4 mr-2" />
//     LinkedIn
//   </Button>
// </div>

//                 </motion.div>
//               </motion.article>

//               {/* Sidebar */}
//               <motion.aside
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="lg:col-span-4 space-y-4 sm:space-y-6"
//               >
//                 {/* Table of Contents */}
//                 <div className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-soft border border-border/50 lg:sticky lg:top-24">
//                   <h3 className="font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
//                     <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" /> Quick Actions
//                   </h3>
//                   <div className="space-y-2">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={toggleBookmark}
//                       className="w-full justify-start border-emerald-500/20 hover:border-emerald-500 hover:bg-emerald-500/10"
//                     >
//                       {isBookmarked ? (
//                         <BookmarkCheck className="w-4 h-4 mr-2 text-emerald-600" />
//                       ) : (
//                         <Bookmark className="w-4 h-4 mr-2" />
//                       )}
//                       {isBookmarked ? 'Bookmarked' : 'Bookmark'}
//                     </Button>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className="w-full justify-start border-emerald-500/20 hover:border-emerald-500 hover:bg-emerald-500/10"
//                     >
//                       <MessageCircle className="w-4 h-4 mr-2" />
//                       Comments (0)
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Author Card */}
//                 <div className="bg-gradient-to-br from-emerald-500/5 to-emerald-900/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-soft border border-emerald-500/20">
//                   <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
//                     <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
//                       <User className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-sm sm:text-base">
//                         {post.author_name || "Author"}
//                       </h4>
//                       <p className="text-xs sm:text-sm text-muted-foreground">Content Writer</p>
//                     </div>
//                   </div>
//                   <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
//                     Passionate about career development and helping job seekers succeed in their professional journey.
//                   </p>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="w-full border-emerald-500/20 hover:border-emerald-500 hover:bg-emerald-500/10 text-xs sm:text-sm"
//                   >
//                     View Profile
//                   </Button>
//                 </div>

//                 {/* Related Posts */}
//                 {relatedPosts.length > 0 && (
//                   <div className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-soft border border-border/50">
//                     <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Related Articles</h3>
//                     <div className="space-y-3 sm:space-y-4">
//                       {relatedPosts.map((relPost, index) => (
//                         <Link
//                           key={relPost.id}
//                           to={`/blog/${relPost.slug}`}
//                           className="block group"
//                         >
//                           <motion.div
//                             initial={{ opacity: 0, x: 10 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: 0.4 + index * 0.1 }}
//                             className="flex gap-3 p-2 sm:p-3 rounded-xl hover:bg-emerald-500/5 transition-all"
//                           >
//                             {relPost.cover_image_url && (
//                               <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0">
//                                 <img
//                                   src={relPost.cover_image_url}
//                                   alt={relPost.title}
//                                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                                 />
//                               </div>
//                             )}
//                             <div className="flex-1 min-w-0">
//                               <p className="text-xs sm:text-sm font-medium group-hover:text-emerald-600 transition-colors line-clamp-2 mb-1">
//                                 {relPost.title}
//                               </p>
//                               <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                                 <Clock className="w-3 h-3" />
//                                 <span>{relPost.read_time || "5 min read"}</span>
//                               </div>
//                             </div>
//                           </motion.div>
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Newsletter */}
//                 <div className="bg-gradient-to-br from-black to-emerald-950 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-soft border border-emerald-500/20 text-white">
//                   <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Stay Updated</h3>
//                   <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4">
//                     Get the latest career tips delivered to your inbox.
//                   </p>
//                   <Button
//                     size="sm"
//                     className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm"
//                   >
//                     Subscribe Now
//                   </Button>
//                 </div>
//               </motion.aside>
//             </div>
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
//             className="text-center max-w-2xl mx-auto"
//           >
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
//               Ready to Start Your Job Search?
//             </h2>
//             <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
//               Put these tips into practice and find your dream job today.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
//               <Button
//                 size="lg"
//                 className="bg-emerald-600 hover:bg-emerald-700 text-white"
//                 asChild
//               >
//                 <Link to="/jobs">Browse Jobs</Link>
//               </Button>
//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="border-emerald-500/20 hover:border-emerald-500 hover:bg-emerald-500/10"
//                 asChild
//               >
//                 <Link to="/blog">Read More Articles</Link>
//               </Button>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default BlogDetails;







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
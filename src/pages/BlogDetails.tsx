import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  slug: string;
  category: string | null;
  read_time: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  created_at: string;
}

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        navigate("/blog");
        return;
      }

      setPost(data);

      // Fetch related posts
      const { data: related } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .neq("id", data.id)
        .limit(3);

      setRelatedPosts(related || []);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      navigate("/blog");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || "";
    
    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Post not found</h2>
            <Link to="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="gradient-hero py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
            
            {post.category && (
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                {post.category}
              </span>
            )}
            
            <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">Author</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{formatDate(post.published_at || post.created_at)}</span>
              </div>
              {post.read_time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{post.read_time}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Main Content */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-8"
              >
                {post.cover_image_url && (
                  <div className="mb-8 rounded-2xl overflow-hidden">
                    <img 
                      src={post.cover_image_url} 
                      alt={post.title}
                      className="w-full h-64 lg:h-80 object-cover"
                    />
                  </div>
                )}
                
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div className="bg-card rounded-2xl p-6 lg:p-10 shadow-soft border border-border/50">
                    <div className="whitespace-pre-line text-muted-foreground leading-relaxed space-y-6">
                      {post.content.split('\n\n').map((paragraph, index) => {
                        if (paragraph.startsWith('## ')) {
                          return (
                            <h2 key={index} className="text-xl lg:text-2xl font-bold text-foreground mt-8 mb-4">
                              {paragraph.replace('## ', '')}
                            </h2>
                          );
                        }
                        if (paragraph.startsWith('# ')) {
                          return (
                            <h1 key={index} className="text-2xl lg:text-3xl font-bold text-foreground mt-8 mb-4">
                              {paragraph.replace('# ', '')}
                            </h1>
                          );
                        }
                        return <p key={index}>{paragraph}</p>;
                      })}
                    </div>
                  </div>
                </div>
              </motion.article>

              {/* Sidebar */}
              <motion.aside
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-4 space-y-6"
              >
                {/* Share */}
                <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 sticky top-24">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Share2 className="w-4 h-4" /> Share this article
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('facebook')}
                      className="flex-1"
                    >
                      <Facebook className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('twitter')}
                      className="flex-1"
                    >
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('linkedin')}
                      className="flex-1"
                    >
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                    <h3 className="font-semibold mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((relPost) => (
                        <Link
                          key={relPost.id}
                          to={`/blog/${relPost.slug}`}
                          className="block p-3 rounded-xl hover:bg-muted/50 transition-colors"
                        >
                          <p className="text-sm font-medium hover:text-primary transition-colors">
                            {relPost.title}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </motion.aside>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-card">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Start Your Job Search?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Put these tips into practice and find your dream job today.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/jobs">Browse Jobs</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogDetails;
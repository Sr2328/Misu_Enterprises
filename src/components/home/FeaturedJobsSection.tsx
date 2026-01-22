import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MapPin, Clock, DollarSign, ArrowRight, Building2, Loader2, IndianRupee } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  job_type: string;
  salary_display: string | null;
  created_at: string;
  tags: string[] | null;
}

export default function FeaturedJobsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "1 day ago";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <section ref={ref} className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Featured Jobs
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              Latest <span className="text-gradient">Opportunities</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore our latest job openings from top companies.
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/jobs'}
            className="mt-6 md:mt-0 px-6 py-3 border-2 border-border hover:border-primary bg-background rounded-lg font-medium transition-all duration-300 inline-flex items-center gap-2 text-foreground hover:text-primary"
          >
            View All Jobs <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group bg-card rounded-xl p-6 shadow-lg border border-border/50 hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 
                        className="font-bold text-lg text-foreground group-hover:text-primary transition-colors cursor-pointer line-clamp-1"
                        onClick={() => window.location.href = `/jobs/${job.id}`}
                      >
                        {job.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-1">{job.company}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0 ml-2">{getTimeAgo(job.created_at)}</span>
                </div>

                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="line-clamp-1">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 shrink-0" />
                    {job.job_type}
                  </div>
                  {job.salary_display && (
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <IndianRupee className="w-4 h-4 shrink-0" />
                      <span className="line-clamp-1">{job.salary_display}</span>
                    </div>
                  )}
                </div>

                {job.tags && job.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {job.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {job.tags.length > 3 && (
                      <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                        +{job.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                <button 
                  className="w-full bg-foreground hover:bg-foreground/90 text-background px-4 py-3 rounded-lg font-medium transition-all duration-300 inline-flex items-center justify-center gap-2"
                  onClick={() => window.location.href = `/jobs/${job.id}`}
                >
                  View Details <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && jobs.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No jobs available</h3>
            <p className="text-muted-foreground">Check back soon for new opportunities.</p>
          </div>
        )}
      </div>

      <style>{`
        .text-gradient {
          background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  );
}
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { MapPin, Briefcase, Clock, ArrowRight, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  job_type: string;
  salary_display: string | null;
  created_at: string;
}

const JOBS_PER_PAGE = 6;

export function JobDiscoverySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredJob, setHoveredJob] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("jobs")
      .select("id, title, company, location, job_type, salary_display, created_at")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setJobs(data);
    }
    setLoading(false);
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const paginatedJobs = jobs.slice(startIndex, startIndex + JOBS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (ref.current) {
      (ref.current as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section ref={ref} className="py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-600 text-sm font-medium mb-4">
            For Job Seekers
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Latest <span className="text-gradient">Job Openings</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find your next opportunity. We connect workers with verified employers offering fair wages and growth.
          </p>
        </motion.div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-14 w-14 bg-gray-200 rounded-xl" />
                  <div className="h-6 w-20 bg-gray-200 rounded-full" />
                </div>
                <div className="h-6 bg-gray-200 rounded mb-4 w-3/4" />
                <div className="h-4 bg-gray-200 rounded mb-2 w-1/2" />
                <div className="flex gap-2 mb-4">
                  <div className="h-6 bg-gray-200 rounded-full w-24" />
                  <div className="h-6 bg-gray-200 rounded-full w-32" />
                </div>
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : paginatedJobs.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {paginatedJobs.map((job, index) => {
                const isHovered = hoveredJob === job.id;
                
                return (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredJob(job.id)}
                    onMouseLeave={() => setHoveredJob(null)}
                  >
                    <Link
                      to={`/jobs/${job.id}`}
                      className={`group block rounded-2xl p-6 shadow-lg hover:shadow-2xl border transition-all duration-300 hover:-translate-y-2 h-full relative ${
                        isHovered 
                          ? 'bg-black border-black text-white' 
                          : 'bg-white border-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                          isHovered 
                            ? 'bg-white' 
                            : 'bg-gradient-to-br from-emerald-500 to-emerald-600'
                        }`}>
                          <img
  src={isHovered ? "https://i.postimg.cc/0NBH41GS/job-description.png" : "https://i.postimg.cc/8kBmJVFb/engineering.png"}
  alt="Building"
  className="w-10 h-10 transition-all duration-300"
/>
                        </div>
                        <span className={`text-xs flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-300 ${
                          isHovered 
                            ? 'bg-white/20 text-white' 
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          <Clock className="w-3 h-3" />
                          {getTimeAgo(job.created_at)}
                        </span>
                      </div>
                      
                      <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                        isHovered ? 'text-white' : 'text-gray-900'
                      }`}>
                        {job.title}
                      </h3>
                      <p className={`text-sm mb-4 font-medium transition-colors duration-300 ${
                        isHovered ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {job.company}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full transition-all duration-300 ${
                          isHovered 
                            ? 'bg-white/20 text-white' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <MapPin className="w-3 h-3" /> {job.location}
                        </span>
                        <span className={`inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-300 ${
                          isHovered 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          <Briefcase className="w-3 h-3" /> {job.job_type}
                        </span>
                      </div>
                      
                      {job.salary_display && (
                        <p className={`text-sm font-bold transition-colors duration-300 ${
                          isHovered ? 'text-emerald-400' : 'text-emerald-600'
                        }`}>
                          {job.salary_display}
                        </p>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex justify-center items-center gap-2 mb-8 flex-wrap"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      currentPage === page
                        ? 'bg-emerald-600 text-white shadow-lg'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-center py-12 bg-white rounded-2xl mb-12 shadow-lg"
          >
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              No job openings available at the moment. Check back soon!
            </p>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <Button variant="hero" size="lg" asChild>
            <Link to="/jobs">
              View All Jobs <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>

      <style>{`
        .text-gradient {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  );
}
import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MapPin, Clock, DollarSign, Search, Filter, Building2, 
  ArrowRight, ChevronDown, Briefcase, Loader2 
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  job_type: string;
  category: string | null;
  salary_display: string | null;
  created_at: string;
  tags: string[] | null;
  description: string;
}

const categories = ["All", "Technology", "Marketing", "Human Resources", "Finance", "Design", "Sales", "Healthcare", "Engineering", "Other"];

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All Locations");
  const [locations, setLocations] = useState<string[]>(["All Locations"]);
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setJobs(data || []);
      
      // Extract unique locations for filter
      const uniqueLocations = [...new Set((data || []).map(job => job.location))];
      setLocations(["All Locations", ...uniqueLocations]);
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

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || job.category === category;
    const matchesLocation = location === "All Locations" || job.location === location;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <Layout>
      {/* Header */}
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your <span className="text-gradient">Dream Job</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Browse through hundreds of opportunities from top companies.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-card rounded-2xl shadow-card">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Job title or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 border-0 bg-secondary"
                />
              </div>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="h-12 w-full md:w-48 border-0 bg-secondary">
                  <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="hero" size="lg" className="h-12">
                <Search className="w-4 h-4" /> Search
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Jobs List */}
      <section ref={ref} className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="lg:w-64 shrink-0"
            >
              <div className="sticky top-24 bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Filters
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Category</label>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCategory(cat)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            category === cat
                              ? "bg-primary/10 text-primary font-medium"
                              : "hover:bg-muted text-foreground"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Jobs Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{filteredJobs.length}</span> jobs found
                </p>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredJobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 4, transition: { duration: 0.2 } }}
                      className="group bg-card rounded-2xl p-6 shadow-soft border border-border/50 hover:shadow-card hover:border-primary/20 transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Building2 className="w-7 h-7 text-primary" />
                        </div>
                        <div className="flex-1">
                          <Link to={`/jobs/${job.id}`}>
                            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors cursor-pointer">
                              {job.title}
                            </h3>
                          </Link>
                          <p className="text-muted-foreground">{job.company}</p>
                          <div className="flex flex-wrap gap-3 mt-2">
                            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4" /> {job.location}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" /> {job.job_type}
                            </span>
                            {job.salary_display && (
                              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                <DollarSign className="w-4 h-4" /> {job.salary_display}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button variant="hero" asChild>
                            <Link to={`/jobs/${job.id}`}>View Details</Link>
                          </Button>
                          <span className="text-xs text-muted-foreground text-center">
                            {getTimeAgo(job.created_at)}
                          </span>
                        </div>
                      </div>
                      {job.tags && job.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {job.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}

              {!loading && filteredJobs.length === 0 && (
                <div className="text-center py-16">
                  <Briefcase className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Apply for this position</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Sign in to apply for this job on our platform.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-sm text-foreground mb-3">
                📱 <strong>Download our mobile app</strong> for the best experience.
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">App Store</Button>
                <Button size="sm" variant="outline" className="flex-1">Google Play</Button>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">Or continue on web</p>
              <Button variant="hero" className="w-full" asChild>
                <Link to="/auth">Sign in to apply</Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Jobs;
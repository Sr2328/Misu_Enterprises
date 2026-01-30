import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MapPin, Clock, Search, Building2, 
  ArrowRight, Briefcase, Loader2, Heart, Plus, Grid3x3, List
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

const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Internship", "Project work"];
const experienceLevels = ["All Levels", "Entry level", "Intermediate", "Expert"];
const salaryRanges = ["All", "₹0-₹5L", "₹5L-₹10L", "₹10L-₹15L", "₹15L+"];
const categories = ["All", "Technology", "Marketing", "Human Resources", "Finance", "Design", "Sales", "Healthcare", "Engineering", "Other"];

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [jobType, setJobType] = useState("All");
  const [experienceLevel, setExperienceLevel] = useState("All Levels");
  const [salaryRange, setSalaryRange] = useState("All");
  const [sortBy, setSortBy] = useState("Most recent");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [showModal, setShowModal] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());

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
    
    if (diffInDays === 0) return "Posted today";
    if (diffInDays === 1) return "Posted 1 day ago";
    if (diffInDays < 7) return `Posted ${diffInDays} days ago`;
    if (diffInDays < 30) return `Posted ${Math.floor(diffInDays / 7)} weeks ago`;
    return `Posted ${Math.floor(diffInDays / 30)} months ago`;
  };

  const formatSalary = (salary: string | null) => {
    if (!salary) return "₹8-12 LPA";
    return salary.replace(/\$/g, "₹").replace(/k/g, "K");
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationSearch === "" || 
      job.location.toLowerCase().includes(locationSearch.toLowerCase());
    const matchesCategory = category === "All" || job.category === category;
    const matchesJobType = jobType === "All" || job.job_type === jobType;
    
    return matchesSearch && matchesLocation && matchesCategory && matchesJobType;
  });

  const clearAllFilters = () => {
    setCategory("All");
    setJobType("All");
    setExperienceLevel("All Levels");
    setSalaryRange("All");
  };

  const activeFiltersCount = [
    category !== "All",
    jobType !== "All",
    experienceLevel !== "All Levels",
    salaryRange !== "All"
  ].filter(Boolean).length;

  return (
    <Layout>
      {/* Hero Section - Responsive Height */}
      <section className="relative h-[280px] sm:h-[320px] md:h-[350px] overflow-hidden bg-gray-900">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://i.postimg.cc/J4ck6DLt/Green-Minimalist-Leafy-Wide-Etsy-Shop-Cover-(1).png?w=1920&auto=format&fit=crop"
            alt="Find your dream job"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        </div>

        {/* Content - Responsive */}
        <div className="relative z-10 h-full flex flex-col justify-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Find <span className="text-accent">Your Dream</span> Job Here
                </h1>
                {/* <Plus className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white flex-shrink-0" /> */}
              </div>

              {/* Search Bar - Responsive */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-4xl mt-4 sm:mt-6 md:mt-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <Input
                    placeholder="Job title or keyword"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 sm:pl-12 h-12 sm:h-14 bg-white border-0 rounded-lg sm:rounded-xl text-sm sm:text-base shadow-lg"
                  />
                </div>
                <div className="relative sm:w-48 md:w-64">
                  <MapPin className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <Input
                    placeholder="Add country or city"
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    className="pl-10 sm:pl-12 h-12 sm:h-14 bg-white border-0 rounded-lg sm:rounded-xl text-sm sm:text-base shadow-lg"
                  />
                </div>
                <Button 
                  size="lg" 
                  className="h-12 sm:h-14 px-6 sm:px-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  Search
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section ref={ref} className="py-8 sm:py-10 md:py-12 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Filters Sidebar - Hidden on mobile, shown as sticky on desktop */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="hidden lg:block lg:w-72 shrink-0"
            >
              <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Job Type */}
                  <div>
                    <h4 className="font-medium text-sm text-gray-900 mb-3">Job Type</h4>
                    <div className="space-y-2">
                      {jobTypes.map((type) => (
                        <label
                          key={type}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="radio"
                            name="jobType"
                            checked={jobType === type}
                            onChange={() => setJobType(type)}
                            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className={`text-sm ${
                            jobType === type ? "text-gray-900 font-medium" : "text-gray-600"
                          } group-hover:text-gray-900`}>
                            {type}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Salary Range */}
                  <div>
                    <h4 className="font-medium text-sm text-gray-900 mb-3">Salary Range</h4>
                    <div className="space-y-2">
                      {salaryRanges.map((range) => (
                        <label
                          key={range}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="radio"
                            name="salary"
                            checked={salaryRange === range}
                            onChange={() => setSalaryRange(range)}
                            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className={`text-sm ${
                            salaryRange === range ? "text-gray-900 font-medium" : "text-gray-600"
                          } group-hover:text-gray-900`}>
                            {range}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Experience Level */}
                  <div>
                    <h4 className="font-medium text-sm text-gray-900 mb-3">Experience Level</h4>
                    <div className="space-y-2">
                      {experienceLevels.map((level) => (
                        <label
                          key={level}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="radio"
                            name="experience"
                            checked={experienceLevel === level}
                            onChange={() => setExperienceLevel(level)}
                            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className={`text-sm ${
                            experienceLevel === level ? "text-gray-900 font-medium" : "text-gray-600"
                          } group-hover:text-gray-900`}>
                            {level}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Job Categories */}
                  <div>
                    <h4 className="font-medium text-sm text-gray-900 mb-3">Job Categories</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {categories.map((cat) => (
                        <label
                          key={cat}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="radio"
                            name="category"
                            checked={category === cat}
                            onChange={() => setCategory(cat)}
                            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className={`text-sm ${
                            category === cat ? "text-gray-900 font-medium" : "text-gray-600"
                          } group-hover:text-gray-900`}>
                            {cat}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Jobs List */}
            <div className="flex-1">
              {/* Header with View Toggle - Responsive */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 bg-white rounded-xl p-3 sm:p-4 shadow-[0_4px_20px_rgb(0,0,0,0.08)]">
                <h2 className="text-lg sm:text-xl font-semibold">
                  Recommended jobs
                </h2>
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-1.5 sm:p-2 rounded-md transition-all ${
                        viewMode === "list"
                          ? "bg-white shadow-sm text-emerald-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <List className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-1.5 sm:p-2 rounded-md transition-all ${
                        viewMode === "grid"
                          ? "bg-white shadow-sm text-emerald-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Grid3x3 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[160px] md:w-[180px] bg-white border-gray-200 h-9 sm:h-10 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Most recent">Most recent</SelectItem>
                      <SelectItem value="Salary: High to Low">Salary: High to Low</SelectItem>
                      <SelectItem value="Salary: Low to High">Salary: Low to High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                </div>
              ) : (
                <div className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4" : "grid gap-3 sm:gap-4"}`}>
                  {filteredJobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: index * 0.05 }}
                      onHoverStart={() => setHoveredCard(job.id)}
                      onHoverEnd={() => setHoveredCard(null)}
                      className={`group relative rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border transition-all duration-300 ${
                        hoveredCard === job.id
                          ? "bg-gradient-to-br from-black via-gray-900 to-black border-gray-800 shadow-[0_20px_60px_rgb(0,0,0,0.4)] transform scale-[1.02]"
                          : "bg-white border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)]"
                      }`}
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        {/* Company Logo - Responsive */}
                        <div
  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
    hoveredCard === job.id
      ? "bg-white shadow-lg"
      : "bg-emerald-400  shadow-md"
  }`}
>
  <img
    src={
      hoveredCard === job.id
        ? "https://i.postimg.cc/ZKDN3kFr/look-for-a-job-in-a-newspaper.png"   // hover state PNG
        : "https://i.postimg.cc/Kv4kmqSL/look-for-a-job-in-a-newspaper-(1).png" // default state PNG
    }
    alt="Building Icon"
    className="w-8 h-8 sm:w-9 sm:h-9 transition-all duration-300"
  />
</div>


                        {/* Job Details - Responsive */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 sm:gap-4 mb-2">
                            <div className="flex-1 min-w-0">
                              <h3 className={`font-semibold text-base sm:text-lg mb-1 transition-colors line-clamp-2 ${
                                hoveredCard === job.id
                                  ? "text-white"
                                  : "text-gray-900"
                              }`}>
                                {job.title}
                              </h3>
                              <p className={`text-xs sm:text-sm transition-colors truncate ${
                                hoveredCard === job.id ? "text-gray-300" : "text-gray-600"
                              }`}>
                                {job.company} • {job.location}
                              </p>
                            </div>
                            <button
                              onClick={() => toggleSaveJob(job.id)}
                              className={`p-1.5 sm:p-2 rounded-lg transition-colors flex-shrink-0 ${
                                hoveredCard === job.id
                                  ? "hover:bg-white/10"
                                  : "hover:bg-gray-100"
                              }`}
                            >
                              <Heart
                                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                  savedJobs.has(job.id)
                                    ? "fill-red-500 text-red-500"
                                    : hoveredCard === job.id
                                    ? "text-gray-300"
                                    : "text-gray-400"
                                }`}
                              />
                            </button>
                          </div>

                          {/* Tags - Responsive */}
                          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                            <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium transition-colors ${
                              hoveredCard === job.id
                                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                : "bg-purple-100 text-purple-700"
                            }`}>
                              {experienceLevel}
                            </span>
                            <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium transition-colors ${
                              hoveredCard === job.id
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : "bg-emerald-100 text-emerald-700"
                            }`}>
                              {job.job_type}
                            </span>
                            <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium transition-colors ${
                              hoveredCard === job.id
                                ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                                : "bg-orange-100 text-orange-700"
                            }`}>
                              Remote
                            </span>
                          </div>

                          {/* Description - Responsive */}
                          <p className={`text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 transition-colors ${
                            hoveredCard === job.id ? "text-gray-300" : "text-gray-600"
                          }`}>
                            {job.description}
                          </p>

                          {/* Footer - Responsive */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                            <div className="flex items-center gap-2 sm:gap-4">
                              <span className={`text-sm sm:text-base font-semibold transition-colors ${
                                hoveredCard === job.id ? "text-emerald-400" : "text-gray-900"
                              }`}>
                                {formatSalary(job.salary_display)}
                                <span className={`text-xs font-normal ml-1 ${
                                  hoveredCard === job.id ? "text-gray-400" : "text-gray-500"
                                }`}>/year</span>
                              </span>
                              <span className={`text-xs transition-colors flex items-center gap-1 ${
                                hoveredCard === job.id ? "text-gray-400" : "text-gray-500"
                              }`}>
                                <Clock className="w-3 h-3" />
                                <span className="hidden sm:inline">{getTimeAgo(job.created_at)}</span>
                                <span className="sm:hidden">
                                  {getTimeAgo(job.created_at).replace('Posted ', '')}
                                </span>
                              </span>
                            </div>
                          </div>

                          {/* Divider */}
                          <div className={`mt-4 pt-4 border-t transition-colors ${
                            hoveredCard === job.id ? "border-gray-700" : "border-gray-200"
                          }`}>
                            {/* View Details Link - Text with Arrow */}
                            <Link 
  to={`/jobs/${job.id}`}
  className={`inline-flex items-center gap-2 text-sm font-medium transition-colors group/link ${
    hoveredCard === job.id
      ? "text-emerald-400 hover:text-emerald-300"
      : "text-gray-900 hover:text-emerald-600"
  }`}
>
  <span className="no-underline">View Details</span>
  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
</Link>

                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {!loading && filteredJobs.length === 0 && (
                <div className="text-center py-12 sm:py-16 bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                  <Briefcase className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">No jobs found</h3>
                  <p className="text-sm sm:text-base text-gray-600">Try adjusting your filters or search terms.</p>
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
            <DialogDescription className="text-gray-600">
              Sign in to apply for this job on our platform.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <p className="text-sm text-gray-900 mb-3">
                📱 <strong>Download our mobile app</strong> for the best experience.
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">App Store</Button>
                <Button size="sm" variant="outline" className="flex-1">Google Play</Button>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">Or continue on web</p>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" asChild>
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
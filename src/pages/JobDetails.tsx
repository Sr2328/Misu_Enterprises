import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
  MapPin,
  Clock,
  DollarSign,
  Building2,
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Share2,
  CheckCircle,
  Briefcase,
  Users,
  Calendar,
  Send,
  MessageCircle,
  IndianRupee,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, userRole } = useAuth();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyType, setApplyType] = useState<'quick' | 'signin' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    cover_letter: "",
  });

  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (id) {
      fetchJob();
      if (user) {
        checkIfSaved();
        checkIfApplied();
      }
    }

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, [id, user]);

  const fetchJob = async () => {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", id)
      .eq("is_active", true)
      .single();

    if (error || !data) {
      navigate("/jobs");
      return;
    }
    setJob(data);
    setLoading(false);
  };

  const checkIfSaved = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("saved_jobs")
      .select("id")
      .eq("job_id", id)
      .eq("user_id", user.id)
      .single();
    setIsSaved(!!data);
  };

  const checkIfApplied = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("job_applications")
      .select("id")
      .eq("job_id", id)
      .eq("applicant_id", user.id)
      .single();
    setHasApplied(!!data);
  };

  const handleSaveJob = async () => {
    if (!user) {
      toast.error("Please sign in to save jobs");
      navigate("/auth");
      return;
    }

    if (isSaved) {
      await supabase.from("saved_jobs").delete().eq("job_id", id).eq("user_id", user.id);
      setIsSaved(false);
      toast.success("Job removed from saved");
    } else {
      await supabase.from("saved_jobs").insert({ job_id: id, user_id: user.id });
      setIsSaved(true);
      toast.success("Job saved!");
    }
  };

  const handleQuickApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("job_applications").insert({
        job_id: id,
        applicant_id: user?.id || null,
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        cover_letter: formData.cover_letter,
        status: "pending",
      });

      if (error) throw error;

      // Try to send notification email (optional - won't fail if edge function doesn't exist)
      try {
        await supabase.functions.invoke("send-application-notification", {
          body: {
            type: "new_application",
            jobId: id,
            jobTitle: job?.title,
            applicantName: formData.full_name,
            applicantEmail: formData.email,
          },
        });
      } catch (emailError) {
        console.log("Email notification skipped:", emailError);
      }

      toast.success("Application submitted successfully!");
      setShowApplyModal(false);
      setHasApplied(true);
      setFormData({ full_name: "", email: "", phone: "", cover_letter: "" });
    } catch (error: any) {
      toast.error(error.message || "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppApply = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in the ${job?.title} position at ${job?.company}. Please share more details.`
    );
    window.open(`https://wa.me/919540603737?text=${message}`, "_blank");
  };

  const scrollToApply = () => {
    const applySection = document.getElementById('apply-section');
    if (applySection) {
      applySection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Loading animation component
  const LoadingSpinner = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-4"
    >
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
        className="relative"
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-primary/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 border-4 border-primary border-t-transparent rounded-full"></div>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-muted-foreground text-sm sm:text-base"
      >
        Loading job details...
      </motion.p>
    </motion.div>
  );

  if (loading) {
    return (
      <Layout>
        <AnimatePresence>
          <LoadingSpinner />
        </AnimatePresence>
      </Layout>
    );
  }

  if (!job) {
    return (
      <Layout>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="min-h-screen flex items-center justify-center px-4"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
              className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center"
            >
            
  <img
    src="https://i.postimg.cc/VsGbtQzs/role.png"
    alt="Building"
    className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
  />


            </motion.div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Job not found</h2>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">
              The job you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/jobs">
              <Button>Back to Jobs</Button>
            </Link>
          </div>
        </motion.div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="gradient-hero py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-foreground mb-4 sm:mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Jobs
              </Link>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0"
              >
                <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex-1 w-full sm:w-auto"
              >
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 break-words">
                  {job.title}
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground mb-3 sm:mb-4 break-words">
                  {job.company}
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4 text-sm sm:text-base text-muted-foreground">
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-1.5 sm:gap-2"
                  >
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="break-words">{job.location}</span>
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-1.5 sm:gap-2"
                  >
                    <Clock className="w-4 h-4 shrink-0" />
                    <span className="break-words">{job.job_type}</span>
                  </motion.span>
                  {job.salary_display && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center gap-1.5 sm:gap-2"
                    >
                      <IndianRupee className="w-4 h-4 shrink-0" />
                      <span className="break-words">{job.salary_display}</span>
                    </motion.span>
                  )}
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center gap-1.5 sm:gap-2"
                  >
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span className="break-words">
                      Posted {new Date(job.created_at).toLocaleDateString()}
                    </span>
                  </motion.span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex gap-2 sm:gap-3 shrink-0 w-full sm:w-auto justify-end sm:justify-start"
              >
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleSaveJob}
                  className="h-10 w-10 sm:h-11 sm:w-11 transition-all hover:scale-105"
                >
                  <motion.div
                    animate={isSaved ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    ) : (
                      <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </motion.div>
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-10 w-10 sm:h-11 sm:w-11 transition-all hover:scale-105"
                >
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-soft border border-border/50"
              >
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                  Job Description
                </h2>
                <div className="prose prose-sm sm:prose-base max-w-none text-muted-foreground whitespace-pre-line break-words">
                  {job.description}
                </div>
              </motion.div>

              {job.requirements && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-soft border border-border/50"
                >
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                    Requirements
                  </h2>
                  <div className="prose prose-sm sm:prose-base max-w-none text-muted-foreground whitespace-pre-line break-words">
                    {job.requirements}
                  </div>
                </motion.div>
              )}

              {job.benefits && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-soft border border-border/50"
                >
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                    Benefits
                  </h2>
                  <div className="prose prose-sm sm:prose-base max-w-none text-muted-foreground whitespace-pre-line break-words">
                    {job.benefits}
                  </div>
                </motion.div>
              )}

              {job.tags && job.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-soft border border-border/50"
                >
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                    Skills & Tags
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag: string, index: number) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium break-words cursor-default"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar - Apply Section */}
            <div className="lg:col-span-1">
              <motion.div
                id="apply-section"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-black text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-soft border border-gray-800 lg:sticky lg:top-24"
              >
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">
                  Apply for this position
                </h3>

                {hasApplied ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4 sm:py-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                    >
                      <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-500 mx-auto mb-2 sm:mb-3" />
                    </motion.div>
                    <h4 className="font-semibold text-base sm:text-lg mb-1 text-white">
                      Application Submitted!
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                      You've already applied for this position. Check your dashboard for updates.
                    </p>
                    <Link to="/dashboard/applications" className="block">
                      <Button 
                        variant="outline" 
                        className="w-full bg-white text-black hover:bg-gray-100 border-gray-700 transition-all hover:scale-105"
                      >
                        View My Applications
                      </Button>
                    </Link>
                  </motion.div>
                ) : (
                  <div className="space-y-2 sm:space-y-3">
                    {user && userRole === 'job_seeker' ? (
                      <Button
                        variant="default"
                        size="lg"
                        className="w-full bg-white text-black hover:bg-gray-100 font-medium transition-all hover:scale-105"
                        onClick={() => {
                          setApplyType('quick');
                          setShowApplyModal(true);
                        }}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Quick Apply
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        size="lg"
                        className="w-full bg-white text-black hover:bg-gray-100 font-medium transition-all hover:scale-105"
                        onClick={() => {
                          setApplyType('signin');
                          setShowApplyModal(true);
                        }}
                      >
                        <Briefcase className="w-4 h-4 mr-2" />
                        Apply Now
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full text-green-400 border-green-600 hover:bg-green-950 hover:text-green-300 bg-black transition-all hover:scale-105"
                      onClick={handleWhatsAppApply}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Apply via WhatsApp
                    </Button>
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-800"
                >
                  <h4 className="font-medium text-xs sm:text-sm mb-2 sm:mb-3 text-white">
                    Company Info
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-400">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center gap-2"
                    >
                      <Building2 className="w-4 h-4 shrink-0" />
                      <span className="break-words">{job.company}</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span className="break-words">{job.location}</span>
                    </motion.div>
                    {job.category && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex items-center gap-2"
                      >
                        <Briefcase className="w-4 h-4 shrink-0" />
                        <span className="break-words">{job.category}</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      <AnimatePresence>
        {showApplyModal && (
          <Dialog open={showApplyModal} onOpenChange={setShowApplyModal}>
            <DialogContent className="sm:max-w-md w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <DialogHeader>
                  <DialogTitle className="text-lg sm:text-xl">
                    {applyType === 'signin' ? 'Apply for this Position' : 'Quick Apply'}
                  </DialogTitle>
                  <DialogDescription className="text-sm sm:text-base">
                    {applyType === 'signin'
                      ? 'Sign in to apply and track your application status.'
                      : `Submit your application for ${job?.title} at ${job?.company}`}
                  </DialogDescription>
                </DialogHeader>

                {applyType === 'signin' ? (
                  <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="p-3 sm:p-4 rounded-xl bg-primary/5 border border-primary/20"
                    >
                      <p className="text-xs sm:text-sm mb-2 sm:mb-3">
                        <strong>Create an account</strong> to apply and track all your applications in one place.
                      </p>
                      <Link to="/auth">
                        <Button variant="hero" className="w-full text-sm sm:text-base">
                          Sign in to Apply
                        </Button>
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-center"
                    >
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                        Or apply as guest
                      </p>
                      <Button
                        variant="outline"
                        className="w-full text-sm sm:text-base"
                        onClick={() => setApplyType('quick')}
                      >
                        Quick Apply (Guest)
                      </Button>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Button
                        variant="ghost"
                        className="w-full text-green-600 text-sm sm:text-base"
                        onClick={handleWhatsAppApply}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Apply via WhatsApp
                      </Button>
                    </motion.div>
                  </div>
                ) : (
                  <form onSubmit={handleQuickApply} className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 block">
                        Full Name *
                      </label>
                      <Input
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        placeholder="John Doe"
                        required
                        className="text-sm sm:text-base"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 block">
                        Email *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        required
                        className="text-sm sm:text-base"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 block">
                        Phone *
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        required
                        className="text-sm sm:text-base"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 block">
                        Cover Letter (Optional)
                      </label>
                      <Textarea
                        value={formData.cover_letter}
                        onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                        placeholder="Tell us why you're interested in this position..."
                        rows={4}
                        className="text-sm sm:text-base resize-none"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Button 
                        type="submit" 
                        variant="hero" 
                        className="w-full text-sm sm:text-base" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Application"
                        )}
                      </Button>
                    </motion.div>
                  </form>
                )}
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default JobDetails;
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
    if (id) {
      fetchJob();
      if (user) {
        checkIfSaved();
        checkIfApplied();
      }
    }
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
    window.open(`https://wa.me/639123456789?text=${message}`, "_blank");
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!job) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Job not found</h2>
            <Link to="/jobs">
              <Button>Back to Jobs</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="gradient-hero py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Jobs
            </Link>

            <div className="flex flex-col lg:flex-row gap-6 items-start">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Building2 className="w-10 h-10 text-primary" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">{job.title}</h1>
                <p className="text-xl text-muted-foreground mb-4">{job.company}</p>
                <div className="flex flex-wrap gap-4 text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {job.job_type}
                  </span>
                  {job.salary_display && (
                    <span className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      {job.salary_display}
                    </span>
                  )}
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Posted {new Date(job.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 shrink-0">
                <Button variant="outline" size="icon" onClick={handleSaveJob}>
                  {isSaved ? (
                    <BookmarkCheck className="w-5 h-5 text-primary" />
                  ) : (
                    <Bookmark className="w-5 h-5" />
                  )}
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50"
              >
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                  {job.description}
                </div>
              </motion.div>

              {job.requirements && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50"
                >
                  <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                  <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                    {job.requirements}
                  </div>
                </motion.div>
              )}

              {job.benefits && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50"
                >
                  <h2 className="text-xl font-semibold mb-4">Benefits</h2>
                  <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                    {job.benefits}
                  </div>
                </motion.div>
              )}

              {job.tags && job.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50"
                >
                  <h2 className="text-xl font-semibold mb-4">Skills & Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar - Apply Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 sticky top-24"
              >
                <h3 className="text-lg font-semibold mb-4">Apply for this position</h3>

                {hasApplied ? (
                  <div className="text-center py-6">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-lg mb-1">Application Submitted!</h4>
                    <p className="text-muted-foreground text-sm">
                      You've already applied for this position. Check your dashboard for updates.
                    </p>
                    <Link to="/dashboard/applications" className="mt-4 block">
                      <Button variant="outline" className="w-full">View My Applications</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {user && userRole === 'job_seeker' ? (
                      <Button
                        variant="hero"
                        size="lg"
                        className="w-full"
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
                        variant="hero"
                        size="lg"
                        className="w-full"
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
                      className="w-full text-green-600 border-green-200 hover:bg-green-50"
                      onClick={handleWhatsAppApply}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Apply via WhatsApp
                    </Button>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-medium text-sm mb-3">Company Info</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      {job.company}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    {job.category && (
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {job.category}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      <Dialog open={showApplyModal} onOpenChange={setShowApplyModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {applyType === 'signin' ? 'Apply for this Position' : 'Quick Apply'}
            </DialogTitle>
            <DialogDescription>
              {applyType === 'signin'
                ? 'Sign in to apply and track your application status.'
                : `Submit your application for ${job?.title} at ${job?.company}`}
            </DialogDescription>
          </DialogHeader>

          {applyType === 'signin' ? (
            <div className="space-y-4 pt-4">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-sm mb-3">
                  <strong>Create an account</strong> to apply and track all your applications in one place.
                </p>
                <Link to="/auth">
                  <Button variant="hero" className="w-full">
                    Sign in to Apply
                  </Button>
                </Link>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">Or apply as guest</p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setApplyType('quick')}
                >
                  Quick Apply (Guest)
                </Button>
              </div>

              <Button
                variant="ghost"
                className="w-full text-green-600"
                onClick={handleWhatsAppApply}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Apply via WhatsApp
              </Button>
            </div>
          ) : (
            <form onSubmit={handleQuickApply} className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Full Name *</label>
                <Input
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Phone *</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+63 912 345 6789"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Cover Letter (Optional)</label>
                <Textarea
                  value={formData.cover_letter}
                  onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                  placeholder="Tell us why you're interested in this position..."
                  rows={4}
                />
              </div>
              <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default JobDetails;

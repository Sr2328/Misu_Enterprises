import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, Users, Phone, ShieldCheck, MapPin, Send, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const industries = [
  "Manufacturing", "Corporate/IT", "Warehousing & Logistics", "Healthcare",
  "Retail & Hospitality", "Residential/Commercial Facility", "Construction", "Other"
];

const categories = [
  "Security Guards", "Housekeeping Staff", "Pantry & Cafeteria", "Skilled Workers",
  "Semi-Skilled Workers", "Supervisors", "Drivers", "Office Support", "Multiple Categories"
];

const headcounts = ["1-10", "11-50", "51-100", "101-500", "500+"];

const features = [
  { icon: Calendar, title: "24-48 Hour Deployment", description: "Quick turnaround for urgent staffing needs" },
  { icon: Users, title: "Pre-Verified Workforce", description: "Background-checked and trained professionals" },
  { icon: Phone, title: "Dedicated Support", description: "Account manager for seamless coordination" },
  { icon: ShieldCheck, title: "Compliance & Safety", description: "Fully compliant workforce with safety standards" },
  { icon: MapPin, title: "Pan-India Reach", description: "Strong presence across major industrial regions" }
];

export default function RequirementBuilderSection() {
  const ref = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isFormInView = useInView(formRef, { once: true, margin: "-50px" });
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: "", contactPerson: "", phone: "", email: "",
    industry: "", category: "", headcount: "", location: "", requirements: ""
  });

  const handleSubmit = async () => {
    if (!formData.companyName || !formData.contactPerson || !formData.phone || 
        !formData.email || !formData.industry || !formData.category || 
        !formData.headcount || !formData.location) {
      alert("Please fill all required fields");
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await supabase.from("contact_inquiries").insert({
        name: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        subject: `Manpower Requirement: ${formData.category} (${formData.headcount}) - ${formData.companyName}`,
        message: `Company: ${formData.companyName}\nIndustry: ${formData.industry}\nCategory: ${formData.category}\nHeadcount: ${formData.headcount}\nLocation: ${formData.location}\nAdditional: ${formData.requirements}`
      });
      
      if (error) throw error;
      setSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      companyName: "", contactPerson: "", phone: "", email: "",
      industry: "", category: "", headcount: "", location: "", requirements: ""
    });
  };

  if (submitted) {
    return (
      <section ref={ref} className="py-12 md:py-16 lg:py-20 bg-card">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center bg-background rounded-2xl p-12 shadow-xl border border-border/50"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">Requirement Submitted Successfully!</h3>
            <p className="text-muted-foreground mb-6 text-lg">
              Thank you for reaching out. Our team will contact you within 24 hours to discuss your manpower needs.
            </p>
            <button 
              onClick={resetForm}
              className="bg-foreground hover:bg-foreground/90 text-background px-8 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Submit Another Request
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="py-12 md:py-16 lg:py-20 bg-card">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Quick Enquiry
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Submit Your <span className="text-gradient">Manpower Requirement</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Tell us what you need — we'll get back to you within 24 hours with a customized staffing solution.
            </p>

            <div className="space-y-5">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:mt-16"
          >
            <div className="bg-background rounded-2xl p-6 lg:p-8 shadow-xl border border-border/50">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-foreground">Company Name *</label>
                  <input type="text" placeholder="Your company" value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"/>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-foreground">Contact Person *</label>
                  <input type="text" placeholder="Your name" value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"/>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-foreground">Phone *</label>
                  <input type="tel" placeholder="+91 98765 43210" value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"/>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-foreground">Email *</label>
                  <input type="email" placeholder="you@company.com" value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"/>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-foreground">Industry *</label>
                  <select value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all">
                    <option value="">Select industry</option>
                    {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-foreground">Manpower Category *</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all">
                    <option value="">Select category</option>
                    {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-foreground">Headcount Required *</label>
                  <select value={formData.headcount} onChange={(e) => setFormData({ ...formData, headcount: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all">
                    <option value="">Select headcount</option>
                    {headcounts.map((cnt) => <option key={cnt} value={cnt}>{cnt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-foreground">Work Location *</label>
                  <input type="text" placeholder="City, State" value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"/>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-1.5 text-foreground">Additional Requirements</label>
                <textarea placeholder="Any specific skills, experience, or other requirements..." value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} rows={4}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"/>
              </div>

              <button onClick={handleSubmit} disabled={loading}
                className="w-full bg-foreground hover:bg-foreground/90 text-background px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? "Submitting..." : "Submit Requirement"} <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .text-gradient {
          background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gradient-primary {
          background: linear-gradient(135deg, #14b8a6 0%, #10b981 100%);
        }
      `}</style>
    </section>
  );
}
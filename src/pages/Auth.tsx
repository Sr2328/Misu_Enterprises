import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Lock, User, Building2, ArrowRight, Phone, MapPin, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const jobSeekerSignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  work_category: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const employerSignupSchema = z.object({
  company_name: z.string().min(2, "Company name must be at least 2 characters"),
  name: z.string().min(2, "Contact name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter a valid address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const workCategories = [
  "Technology & IT",
  "Healthcare & Medical",
  "Finance & Banking",
  "Sales & Marketing",
  "Engineering",
  "Education",
  "Customer Service",
  "Human Resources",
  "Operations",
  "Manufacturing",
  "Hospitality",
  "Retail",
  "Others"
];

const Auth = () => {
  const navigate = useNavigate();
  const { user, userRole, signIn, signUp } = useAuth();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [jobSeekerData, setJobSeekerData] = useState({
    name: "",
    email: "",
    phone: "",
    work_category: "",
    password: "",
    confirmPassword: ""
  });
  const [employerData, setEmployerData] = useState({
    company_name: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<"job_seeker" | "employer">("job_seeker");

  useEffect(() => {
    if (user && userRole) {
      if (userRole === 'admin') {
        navigate('/admin');
      } else if (userRole === 'employer') {
        navigate('/employer');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, userRole, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    try {
      loginSchema.parse(loginData);
      const { error } = await signIn(loginData.email, loginData.password);
      if (error) {
        toast.error(error.message || "Failed to sign in");
      } else {
        toast.success("Signed in successfully!");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
        setErrors(newErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      if (userType === "job_seeker") {
        jobSeekerSignupSchema.parse(jobSeekerData);
        const { error } = await signUp(
          jobSeekerData.email,
          jobSeekerData.password,
          jobSeekerData.name,
          "job_seeker",
          {
            phone: jobSeekerData.phone,
            work_category: jobSeekerData.work_category
          }
        );
        if (error) {
          toast.error(error.message || "Failed to create account");
        } else {
          toast.success("Account created successfully!");
        }
      } else {
        employerSignupSchema.parse(employerData);
        const { error } = await signUp(
          employerData.email,
          employerData.password,
          employerData.name,
          "employer",
          {
            phone: employerData.phone,
            address: employerData.address,
            company_name: employerData.company_name
          }
        );
        if (error) {
          toast.error(error.message || "Failed to create account");
        } else {
          toast.success("Account created successfully!");
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
        setErrors(newErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="gradient-hero min-h-[80vh] flex items-center py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-card rounded-3xl p-8 shadow-card border border-border/50">
              <div className="text-center mb-8">
                <Link to="/" className="inline-flex items-center space-x-2 mb-6">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xl">M</span>
                  </div>
                  <span className="font-bold text-xl text-foreground">MISO</span>
                </Link>
                <h1 className="text-2xl font-bold">Welcome Back</h1>
                <p className="text-muted-foreground text-sm mt-1">Sign in to access your account</p>
              </div>

              {/* User Type Toggle */}
              <div className="flex gap-2 p-1 bg-secondary rounded-xl mb-6">
                <button
                  onClick={() => setUserType("job_seeker")}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    userType === "job_seeker" 
                      ? "bg-card shadow-sm text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <User className="w-4 h-4 inline mr-2" />
                  Job Seeker
                </button>
                <button
                  onClick={() => setUserType("employer")}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    userType === "employer" 
                      ? "bg-card shadow-sm text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Building2 className="w-4 h-4 inline mr-2" />
                  Employer
                </button>
              </div>

              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                        />
                      </div>
                      {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          className={`pl-10 ${errors.password ? "border-destructive" : ""}`}
                        />
                      </div>
                      {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
                    </div>
                    <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"} <ArrowRight className="w-4 h-4" />
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    {userType === "job_seeker" ? (
                      <>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              placeholder="John Doe"
                              value={jobSeekerData.name}
                              onChange={(e) => setJobSeekerData({ ...jobSeekerData, name: e.target.value })}
                              className={`pl-10 ${errors.name ? "border-destructive" : ""}`}
                            />
                          </div>
                          {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Email</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              type="email"
                              placeholder="you@example.com"
                              value={jobSeekerData.email}
                              onChange={(e) => setJobSeekerData({ ...jobSeekerData, email: e.target.value })}
                              className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                            />
                          </div>
                          {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Phone Number</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              type="tel"
                              placeholder="+91 98765 43210"
                              value={jobSeekerData.phone}
                              onChange={(e) => setJobSeekerData({ ...jobSeekerData, phone: e.target.value })}
                              className={`pl-10 ${errors.phone ? "border-destructive" : ""}`}
                            />
                          </div>
                          {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Preferred Work Category</label>
                          <Select
                            value={jobSeekerData.work_category}
                            onValueChange={(value) => setJobSeekerData({ ...jobSeekerData, work_category: value })}
                          >
                            <SelectTrigger className={errors.work_category ? "border-destructive" : ""}>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {workCategories.map((category) => (
                                <SelectItem key={category} value={category}>{category}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Password</label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              type="password"
                              placeholder="••••••••"
                              value={jobSeekerData.password}
                              onChange={(e) => setJobSeekerData({ ...jobSeekerData, password: e.target.value })}
                              className={`pl-10 ${errors.password ? "border-destructive" : ""}`}
                            />
                          </div>
                          {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Confirm Password</label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              type="password"
                              placeholder="••••••••"
                              value={jobSeekerData.confirmPassword}
                              onChange={(e) => setJobSeekerData({ ...jobSeekerData, confirmPassword: e.target.value })}
                              className={`pl-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
                            />
                          </div>
                          {errors.confirmPassword && <p className="text-destructive text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Company Name</label>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              placeholder="ABC Technologies Pvt. Ltd."
                              value={employerData.company_name}
                              onChange={(e) => setEmployerData({ ...employerData, company_name: e.target.value })}
                              className={`pl-10 ${errors.company_name ? "border-destructive" : ""}`}
                            />
                          </div>
                          {errors.company_name && <p className="text-destructive text-sm mt-1">{errors.company_name}</p>}
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Contact Person Name</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              placeholder="John Doe"
                              value={employerData.name}
                              onChange={(e) => setEmployerData({ ...employerData, name: e.target.value })}
                              className={`pl-10 ${errors.name ? "border-destructive" : ""}`}
                            />
                          </div>
                          {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Email</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              type="email"
                              placeholder="hr@company.com"
                              value={employerData.email}
                              onChange={(e) => setEmployerData({ ...employerData, email: e.target.value })}
                              className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                            />
                          </div>
                          {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Phone Number</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              type="tel"
                              placeholder="+91 98765 43210"
                              value={employerData.phone}
                              onChange={(e) => setEmployerData({ ...employerData, phone: e.target.value })}
                              className={`pl-10 ${errors.phone ? "border-destructive" : ""}`}
                            />
                          </div>
                          {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Company Address</label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              placeholder="123 Business Park, Mumbai, India"
                              value={employerData.address}
                              onChange={(e) => setEmployerData({ ...employerData, address: e.target.value })}
                              className={`pl-10 ${errors.address ? "border-destructive" : ""}`}
                            />
                          </div>
                          {errors.address && <p className="text-destructive text-sm mt-1">{errors.address}</p>}
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Password</label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              type="password"
                              placeholder="••••••••"
                              value={employerData.password}
                              onChange={(e) => setEmployerData({ ...employerData, password: e.target.value })}
                              className={`pl-10 ${errors.password ? "border-destructive" : ""}`}
                            />
                          </div>
                          {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Confirm Password</label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              type="password"
                              placeholder="••••••••"
                              value={employerData.confirmPassword}
                              onChange={(e) => setEmployerData({ ...employerData, confirmPassword: e.target.value })}
                              className={`pl-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
                            />
                          </div>
                          {errors.confirmPassword && <p className="text-destructive text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>
                      </>
                    )}
                    <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create Account"} <ArrowRight className="w-4 h-4" />
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <p className="text-center text-sm text-muted-foreground mt-6">
                By continuing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Auth;

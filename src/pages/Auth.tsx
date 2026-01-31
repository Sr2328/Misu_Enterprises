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
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center overflow-hidden">
  <img
    src="https://i.postimg.cc/W3JYR6NS/Untitled-design-(13)-(1).png"
    alt="Avatar"
    className="w-6 h-6 object-cover"
  />
</div>

                  <span className="font-bold text-xl text-foreground">MISU</span>
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






// New Auth page desgin




// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Layout } from "@/components/layout/Layout";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Mail,
//   Lock,
//   User,
//   Building2,
//   ArrowRight,
//   Phone,
//   MapPin,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import { toast } from "sonner";
// import { z } from "zod";
// import { useAuth } from "@/hooks/useAuth";
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';


// /* ─── Validation Schemas ─── */
// const loginSchema = z.object({
//   email: z.string().email("Please enter a valid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// const jobSeekerSignupSchema = z
//   .object({
//     name: z.string().min(2, "Name must be at least 2 characters"),
//     email: z.string().email("Please enter a valid email"),
//     phone: z.string().min(10, "Please enter a valid phone number"),
//     work_category: z.string().optional(),
//     password: z.string().min(6, "Password must be at least 6 characters"),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
//   });

// const employerSignupSchema = z
//   .object({
//     company_name: z
//       .string()
//       .min(2, "Company name must be at least 2 characters"),
//     name: z.string().min(2, "Contact name must be at least 2 characters"),
//     email: z.string().email("Please enter a valid email"),
//     phone: z.string().min(10, "Please enter a valid phone number"),
//     address: z.string().min(5, "Please enter a valid address"),
//     password: z.string().min(6, "Password must be at least 6 characters"),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
//   });

// const workCategories = [
//   "Technology & IT",
//   "Healthcare & Medical",
//   "Finance & Banking",
//   "Sales & Marketing",
//   "Engineering",
//   "Education",
//   "Customer Service",
//   "Human Resources",
//   "Operations",
//   "Manufacturing",
//   "Hospitality",
//   "Retail",
//   "Others",
// ];

// /* ─── Animated Right Panel with Lottie ─── */
// const AnimatedPanel = () => {
//   const [animationData, setAnimationData] = useState(null);

//   useEffect(() => {
//     // Fetch a professional authentication/business Lottie animation
//     // Using a clean, professional animation that represents business/professional networking
//     fetch('https://lottie.host/8f0d3e3e-3c3f-4a5f-9f4d-3e3e3e3e3e3e/J3kL5M6N7P.json')
//       .then(res => res.json())
//       .then(data => setAnimationData(data))
//       .catch(() => {
//         // Fallback to a simple local animation object if fetch fails
//         console.log('Using fallback animation');
//       });
//   }, []);

//   return (
//     <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
//       {/* Deep gradient background */}
//       <div
//         className="absolute inset-0"
//         style={{
//           background:
//             "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0f172a 100%)",
//         }}
//       />

//       {/* Subtle mesh blobs */}
//       <div
//         className="absolute rounded-full opacity-20 blur-3xl"
//         style={{
//           width: 320,
//           height: 320,
//           background: "radial-gradient(circle, #10b981 0%, transparent 70%)",
//           top: "-60px",
//           right: "-80px",
//           animation: "blobA 8s ease-in-out infinite alternate",
//         }}
//       />
//       <div
//         className="absolute rounded-full opacity-15 blur-3xl"
//         style={{
//           width: 260,
//           height: 260,
//           background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
//           bottom: "-40px",
//           left: "-60px",
//           animation: "blobB 10s ease-in-out infinite alternate",
//         }}
//       />

//       {/* Grid lines overlay */}
//       <svg
//         className="absolute inset-0 w-full h-full opacity-5"
//         style={{ pointerEvents: "none" }}
//       >
//         <defs>
//           <pattern id="gridPat" width="40" height="40" patternUnits="userSpaceOnUse">
//             <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10b981" strokeWidth="0.5" />
//           </pattern>
//         </defs>
//         <rect width="100%" height="100%" fill="url(#gridPat)" />
//       </svg>

//       {/* Lottie Animation Container - Responsive sizing */}
//       <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-8 py-12">
//         <div className="w-full max-w-lg h-auto">
//           {animationData ? (
//             <DotLottieReact
//               animationId={animationData}
//               loop={true}
//               autoplay={true}
//               className="w-full h-full"
//               style={{ maxHeight: '70vh' }}
//             />
//           ) : (
//             // Fallback illustration while animation loads
//             <div className="w-full aspect-square max-h-[70vh] flex items-center justify-center">
//               <div className="relative w-64 h-64">
//                 {/* Pulsing rings */}
//                 <div
//                   className="absolute inset-0 rounded-full border border-emerald-500/20"
//                   style={{ animation: "ringPulse 3s ease-out infinite" }}
//                 />
//                 <div
//                   className="absolute inset-8 rounded-full border border-emerald-500/15"
//                   style={{ animation: "ringPulse 3s ease-out 0.4s infinite" }}
//                 />
//                 <div
//                   className="absolute inset-16 rounded-full border border-emerald-500/10"
//                   style={{ animation: "ringPulse 3s ease-out 0.8s infinite" }}
//                 />
                
//                 {/* Center icon */}
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div
//                     className="w-20 h-20 rounded-2xl flex items-center justify-center"
//                     style={{
//                       background: "linear-gradient(135deg, #10b981, #059669)",
//                       boxShadow: "0 8px 32px rgba(16,185,129,0.4)",
//                       animation: "floatCenter 4s ease-in-out infinite",
//                     }}
//                   >
//                     <User className="w-10 h-10 text-white" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Bottom trust badges */}
//         <div className="mt-12 flex flex-wrap justify-center gap-8 max-w-md">
//           {[
//             { val: "8+", txt: "Years" },
//             { val: "120+", txt: "Clients" },
//             { val: "99%", txt: "Satisfaction" },
//           ].map((b, i) => (
//             <div key={i} className="text-center">
//               <div className="text-emerald-400 font-bold text-2xl leading-tight">
//                 {b.val}
//               </div>
//               <div className="text-white/50 text-sm mt-1">{b.txt}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* CSS Animations */}
//       <style>{`
//         @keyframes blobA { 
//           from { transform: translate(0,0) scale(1); } 
//           to { transform: translate(-30px,40px) scale(1.15); } 
//         }
//         @keyframes blobB { 
//           from { transform: translate(0,0) scale(1); } 
//           to { transform: translate(40px,-30px) scale(1.1); } 
//         }
//         @keyframes ringPulse {
//           0% { transform: scale(0.85); opacity: 0.4; }
//           100% { transform: scale(1.25); opacity: 0; }
//         }
//         @keyframes floatCenter {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }
//       `}</style>
//     </div>
//   );
// };

// /* ─── Main Auth Page ─── */
// const Auth = () => {
//   const navigate = useNavigate();
//   const { user, userRole, signIn, signUp } = useAuth();

//   const [loginData, setLoginData] = useState({ email: "", password: "" });
//   const [jobSeekerData, setJobSeekerData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     work_category: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [employerData, setEmployerData] = useState({
//     company_name: "",
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [userType, setUserType] = useState<"job_seeker" | "employer">(
//     "job_seeker"
//   );

//   useEffect(() => {
//     if (user && userRole) {
//       if (userRole === "admin") navigate("/admin");
//       else if (userRole === "employer") navigate("/employer");
//       else navigate("/dashboard");
//     }
//   }, [user, userRole, navigate]);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setErrors({});

//     try {
//       loginSchema.parse(loginData);
//       const { error } = await signIn(loginData.email, loginData.password);
//       if (error) toast.error(error.message || "Failed to sign in");
//       else toast.success("Signed in successfully!");
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const newErrors: Record<string, string> = {};
//         error.errors.forEach((err) => {
//           if (err.path[0]) newErrors[err.path[0] as string] = err.message;
//         });
//         setErrors(newErrors);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setErrors({});

//     try {
//       if (userType === "job_seeker") {
//         jobSeekerSignupSchema.parse(jobSeekerData);
//         const { error } = await signUp(
//           jobSeekerData.email,
//           jobSeekerData.password,
//           jobSeekerData.name,
//           "job_seeker",
//           {
//             phone: jobSeekerData.phone,
//             work_category: jobSeekerData.work_category,
//           }
//         );
//         if (error) toast.error(error.message || "Failed to create account");
//         else toast.success("Account created successfully!");
//       } else {
//         employerSignupSchema.parse(employerData);
//         const { error } = await signUp(
//           employerData.email,
//           employerData.password,
//           employerData.name,
//           "employer",
//           {
//             phone: employerData.phone,
//             address: employerData.address,
//             company_name: employerData.company_name,
//           }
//         );
//         if (error) toast.error(error.message || "Failed to create account");
//         else toast.success("Account created successfully!");
//       }
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const newErrors: Record<string, string> = {};
//         error.errors.forEach((err) => {
//           if (err.path[0]) newErrors[err.path[0] as string] = err.message;
//         });
//         setErrors(newErrors);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /* Shared input wrapper */
//   const Field = ({
//     label,
//     icon: Icon,
//     error,
//     children,
//   }: {
//     label: string;
//     icon: React.ComponentType<{ className?: string }>;
//     error?: string;
//     children: React.ReactNode;
//   }) => (
//     <div>
//       <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
//         {label}
//       </label>
//       <div className="relative">
//         <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 z-10" />
//         {children}
//       </div>
//       {error && (
//         <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
//           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <circle cx="12" cy="12" r="10"/>
//             <line x1="12" y1="8" x2="12" y2="12"/>
//             <line x1="12" y1="16" x2="12.01" y2="16"/>
//           </svg>
//           {error}
//         </p>
//       )}
//     </div>
//   );

//   const inputClass = (hasError: boolean) =>
//     `w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-gray-50 border ${
//       hasError ? "border-red-400 bg-red-50/40" : "border-gray-200"
//     } focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all duration-200 placeholder-gray-300`;

//   return (
//     <Layout>
//       <section className="min-h-screen flex items-stretch bg-gray-100">
//         {/* ── LEFT: Form Panel ── */}
//         <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-10 lg:px-12">
//           <motion.div
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
//             className="w-full max-w-md"
//           >
//             {/* Glass card with layered shadows */}
//             <div
//               className="relative bg-white rounded-3xl overflow-hidden"
//               style={{
//                 boxShadow:
//                   "0 4px 6px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.08), 0 40px 80px rgba(0,0,0,0.06)",
//                 border: "1px solid rgba(0,0,0,0.06)",
//               }}
//             >
//               {/* Top accent line */}
//               <div
//                 className="absolute top-0 left-0 right-0 h-0.5"
//                 style={{
//                   background:
//                     "linear-gradient(90deg, transparent, #10b981, #6366f1, transparent)",
//                 }}
//               />
//               <div className="p-8">
//                 {/* Logo */}
//                 <Link
//                   to="/"
//                   className="inline-flex items-center gap-2.5 mb-7"
//                 >
//                   <div
//                     className="w-9 h-9 rounded-xl flex items-center justify-center"
//                     style={{
//                       background: "linear-gradient(135deg, #10b981, #059669)",
//                       boxShadow: "0 4px 14px rgba(16,185,129,0.35)",
//                     }}
//                   >
//                     <img
//                       src="https://i.postimg.cc/W3JYR6NS/Untitled-design-(13)-(1).png"
//                       alt="MISU"
//                       className="w-5 h-5 object-cover"
//                     />
//                   </div>
//                   <span className="font-bold text-lg text-gray-900 tracking-tight">
//                     MISU
//                   </span>
//                 </Link>

//                 {/* Heading */}
//                 <div className="mb-6">
//                   <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
//                     Welcome back
//                   </h1>
//                   <p className="text-gray-400 text-sm mt-0.5">
//                     Sign in to continue to your workspace
//                   </p>
//                 </div>

//                 {/* User Type Pill Toggle */}
//                 <div
//                   className="flex gap-1 p-1 rounded-xl mb-5"
//                   style={{
//                     background: "#f3f4f6",
//                     boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)",
//                   }}
//                 >
//                   {(["job_seeker", "employer"] as const).map((type) => (
//                     <button
//                       key={type}
//                       onClick={() => setUserType(type)}
//                       className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all duration-250"
//                       style={{
//                         background:
//                           userType === type ? "#fff" : "transparent",
//                         color:
//                           userType === type ? "#111827" : "#9ca3af",
//                         boxShadow:
//                           userType === type
//                             ? "0 2px 8px rgba(0,0,0,0.1)"
//                             : "none",
//                       }}
//                     >
//                       {type === "job_seeker" ? (
//                         <User className="w-3.5 h-3.5" />
//                       ) : (
//                         <Building2 className="w-3.5 h-3.5" />
//                       )}
//                       {type === "job_seeker" ? "Job Seeker" : "Employer"}
//                     </button>
//                   ))}
//                 </div>

//                 {/* Sign In / Sign Up Tabs */}
//                 <Tabs defaultValue="login" className="w-full">
//                   <TabsList className="grid w-full grid-cols-2 mb-5 rounded-lg overflow-hidden border border-gray-200">
//                     <TabsTrigger value="login">Sign In</TabsTrigger>
//                     <TabsTrigger value="signup">Sign Up</TabsTrigger>
//                   </TabsList>

//                   {/* ── LOGIN ── */}
//                   <TabsContent value="login">
//                     <form onSubmit={handleLogin} className="space-y-4">
//                       <Field label="Email" icon={Mail} error={errors.email}>
//                         <Input
//                           type="email"
//                           placeholder="you@example.com"
//                           value={loginData.email}
//                           onChange={(e) =>
//                             setLoginData({ ...loginData, email: e.target.value })
//                           }
//                           className={inputClass(!!errors.email)}
//                         />
//                       </Field>

//                       <Field label="Password" icon={Lock} error={errors.password}>
//                         <Input
//                           type="password"
//                           placeholder="••••••••"
//                           value={loginData.password}
//                           onChange={(e) =>
//                             setLoginData({ ...loginData, password: e.target.value })
//                           }
//                           className={inputClass(!!errors.password)}
//                         />
//                       </Field>

//                       <Button
//                         type="submit"
//                         disabled={isLoading}
//                         className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
//                         style={{
//                           background: isLoading
//                             ? "#6b7280"
//                             : "linear-gradient(135deg, #10b981, #059669)",
//                           boxShadow: isLoading
//                             ? "none"
//                             : "0 4px 16px rgba(16,185,129,0.35)",
//                         }}
//                       >
//                         {isLoading ? "Signing in…" : "Sign In"}
//                         <ArrowRight className="w-4 h-4" />
//                       </Button>
//                     </form>
//                   </TabsContent>

//                   {/* ── SIGNUP ── */}
//                   <TabsContent value="signup">
//                     <form onSubmit={handleSignup} className="space-y-3.5">
//                       {userType === "job_seeker" ? (
//                         <>
//                           <Field label="Full Name" icon={User} error={errors.name}>
//                             <Input
//                               placeholder="John Doe"
//                               value={jobSeekerData.name}
//                               onChange={(e) =>
//                                 setJobSeekerData({ ...jobSeekerData, name: e.target.value })
//                               }
//                               className={inputClass(!!errors.name)}
//                             />
//                           </Field>

//                           <Field label="Email" icon={Mail} error={errors.email}>
//                             <Input
//                               type="email"
//                               placeholder="you@example.com"
//                               value={jobSeekerData.email}
//                               onChange={(e) =>
//                                 setJobSeekerData({ ...jobSeekerData, email: e.target.value })
//                               }
//                               className={inputClass(!!errors.email)}
//                             />
//                           </Field>

//                           <Field label="Phone" icon={Phone} error={errors.phone}>
//                             <Input
//                               type="tel"
//                               placeholder="+91 98765 43210"
//                               value={jobSeekerData.phone}
//                               onChange={(e) =>
//                                 setJobSeekerData({ ...jobSeekerData, phone: e.target.value })
//                               }
//                               className={inputClass(!!errors.phone)}
//                             />
//                           </Field>

//                           <div>
//                             <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
//                               Work Category
//                             </label>
//                             <Select
//                               value={jobSeekerData.work_category}
//                               onValueChange={(value) =>
//                                 setJobSeekerData({ ...jobSeekerData, work_category: value })
//                               }
//                             >
//                               <SelectTrigger className="rounded-xl border-gray-200 bg-gray-50 text-sm focus:ring-2 focus:ring-emerald-500/30">
//                                 <SelectValue placeholder="Select category" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 {workCategories.map((cat) => (
//                                   <SelectItem key={cat} value={cat}>
//                                     {cat}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                           </div>

//                           <Field label="Password" icon={Lock} error={errors.password}>
//                             <Input
//                               type="password"
//                               placeholder="••••••••"
//                               value={jobSeekerData.password}
//                               onChange={(e) =>
//                                 setJobSeekerData({ ...jobSeekerData, password: e.target.value })
//                               }
//                               className={inputClass(!!errors.password)}
//                             />
//                           </Field>

//                           <Field label="Confirm Password" icon={Lock} error={errors.confirmPassword}>
//                             <Input
//                               type="password"
//                               placeholder="••••••••"
//                               value={jobSeekerData.confirmPassword}
//                               onChange={(e) =>
//                                 setJobSeekerData({ ...jobSeekerData, confirmPassword: e.target.value })
//                               }
//                               className={inputClass(!!errors.confirmPassword)}
//                             />
//                           </Field>
//                         </>
//                       ) : (
//                         <>
//                           <Field label="Company Name" icon={Building2} error={errors.company_name}>
//                             <Input
//                               placeholder="ABC Technologies"
//                               value={employerData.company_name}
//                               onChange={(e) =>
//                                 setEmployerData({ ...employerData, company_name: e.target.value })
//                               }
//                               className={inputClass(!!errors.company_name)}
//                             />
//                           </Field>

//                           <Field label="Contact Name" icon={User} error={errors.name}>
//                             <Input
//                               placeholder="John Doe"
//                               value={employerData.name}
//                               onChange={(e) =>
//                                 setEmployerData({ ...employerData, name: e.target.value })
//                               }
//                               className={inputClass(!!errors.name)}
//                             />
//                           </Field>

//                           <Field label="Email" icon={Mail} error={errors.email}>
//                             <Input
//                               type="email"
//                               placeholder="hr@company.com"
//                               value={employerData.email}
//                               onChange={(e) =>
//                                 setEmployerData({ ...employerData, email: e.target.value })
//                               }
//                               className={inputClass(!!errors.email)}
//                             />
//                           </Field>

//                           <Field label="Phone" icon={Phone} error={errors.phone}>
//                             <Input
//                               type="tel"
//                               placeholder="+91 98765 43210"
//                               value={employerData.phone}
//                               onChange={(e) =>
//                                 setEmployerData({ ...employerData, phone: e.target.value })
//                               }
//                               className={inputClass(!!errors.phone)}
//                             />
//                           </Field>

//                           <Field label="Address" icon={MapPin} error={errors.address}>
//                             <Input
//                               placeholder="123 Business Park, Mumbai"
//                               value={employerData.address}
//                               onChange={(e) =>
//                                 setEmployerData({ ...employerData, address: e.target.value })
//                               }
//                               className={inputClass(!!errors.address)}
//                             />
//                           </Field>

//                           <Field label="Password" icon={Lock} error={errors.password}>
//                             <Input
//                               type="password"
//                               placeholder="••••••••"
//                               value={employerData.password}
//                               onChange={(e) =>
//                                 setEmployerData({ ...employerData, password: e.target.value })
//                               }
//                               className={inputClass(!!errors.password)}
//                             />
//                           </Field>

//                           <Field label="Confirm Password" icon={Lock} error={errors.confirmPassword}>
//                             <Input
//                               type="password"
//                               placeholder="••••••••"
//                               value={employerData.confirmPassword}
//                               onChange={(e) =>
//                                 setEmployerData({ ...employerData, confirmPassword: e.target.value })
//                               }
//                               className={inputClass(!!errors.confirmPassword)}
//                             />
//                           </Field>
//                         </>
//                       )}

//                       <Button
//                         type="submit"
//                         disabled={isLoading}
//                         className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
//                         style={{
//                           background: isLoading
//                             ? "#6b7280"
//                             : "linear-gradient(135deg, #10b981, #059669)",
//                           boxShadow: isLoading
//                             ? "none"
//                             : "0 4px 16px rgba(16,185,129,0.35)",
//                         }}
//                       >
//                         {isLoading ? "Creating account…" : "Create Account"}
//                         <ArrowRight className="w-4 h-4" />
//                       </Button>
//                     </form>
//                   </TabsContent>
//                 </Tabs>

//                 {/* Footer note */}
//                 <p className="text-center text-xs text-gray-400 mt-6">
//                   By continuing, you agree to our{" "}
//                   <span className="text-emerald-600 cursor-pointer hover:underline">
//                     Terms of Service
//                   </span>{" "}
//                   &amp;{" "}
//                   <span className="text-emerald-600 cursor-pointer hover:underline">
//                     Privacy Policy
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* ── RIGHT: Animated Panel with Lottie ── */}
//         <div className="hidden lg:block lg:w-1/2 relative">
//           <AnimatedPanel />
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default Auth;
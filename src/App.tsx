import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminApplications from "./pages/admin/AdminApplications";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminServices from "./pages/admin/AdminServices";
import AdminInquiries from "./pages/admin/AdminInquiries";
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import EmployerJobs from "./pages/employer/EmployerJobs";
import EmployerApplications from "./pages/employer/EmployerApplications";
import EmployerProfile from "./pages/employer/EmployerProfile";
import JobSeekerDashboard from "./pages/jobseeker/JobSeekerDashboard";
import JobSeekerApplications from "./pages/jobseeker/JobSeekerApplications";
import JobSeekerSaved from "./pages/jobseeker/JobSeekerSaved";
import JobSeekerProfile from "./pages/jobseeker/JobSeekerProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetails />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/jobs" element={<AdminJobs />} />
            <Route path="/admin/applications" element={<AdminApplications />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/inquiries" element={<AdminInquiries />} />
            {/* Employer Routes */}
            <Route path="/employer" element={<EmployerDashboard />} />
            <Route path="/employer/jobs" element={<EmployerJobs />} />
            <Route path="/employer/applications" element={<EmployerApplications />} />
            <Route path="/employer/profile" element={<EmployerProfile />} />
            {/* Job Seeker Routes */}
            <Route path="/dashboard" element={<JobSeekerDashboard />} />
            <Route path="/dashboard/applications" element={<JobSeekerApplications />} />
            <Route path="/dashboard/saved" element={<JobSeekerSaved />} />
            <Route path="/dashboard/profile" element={<JobSeekerProfile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Briefcase, Users, FileText, Mail, TrendingUp, Eye, Clock, CheckCircle,
  LayoutDashboard, Settings, LogOut, Menu, X, ChevronRight, Bell,
  Building2, UserCheck, MessageSquare, Newspaper, ArrowUpRight
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userRole, signOut, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    totalUsers: 0,
    pendingInquiries: 0,
    subscribers: 0,
    blogPosts: 0
  });
  const [recentApplications, setRecentApplications] = useState<any[]>([]);
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && (!user || userRole !== 'admin')) {
      navigate('/auth');
    }
  }, [user, userRole, loading, navigate]);

  useEffect(() => {
    if (user && userRole === 'admin') {
      fetchStats();
      fetchRecentData();
    }
  }, [user, userRole]);

  const fetchStats = async () => {
    try {
      const [jobs, applications, profiles, inquiries, subscribers, posts] = await Promise.all([
        supabase.from('jobs').select('id', { count: 'exact', head: true }),
        supabase.from('job_applications').select('id', { count: 'exact', head: true }),
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('contact_inquiries').select('id', { count: 'exact', head: true }).eq('is_read', false),
        supabase.from('newsletter_subscribers').select('id', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('id', { count: 'exact', head: true })
      ]);

      setStats({
        totalJobs: jobs.count || 0,
        totalApplications: applications.count || 0,
        totalUsers: profiles.count || 0,
        pendingInquiries: inquiries.count || 0,
        subscribers: subscribers.count || 0,
        blogPosts: posts.count || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchRecentData = async () => {
    try {
      const { data: applications } = await supabase
        .from('job_applications')
        .select('*, jobs(title)')
        .order('applied_at', { ascending: false })
        .limit(5);
      
      const { data: inquiries } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      setRecentApplications(applications || []);
      setRecentInquiries(inquiries || []);
    } catch (error) {
      console.error('Error fetching recent data:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Briefcase, label: "Jobs", href: "/admin/jobs" },
    { icon: FileText, label: "Applications", href: "/admin/applications" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: Newspaper, label: "Blog Posts", href: "/admin/blog" },
    { icon: Building2, label: "Services", href: "/admin/services" },
    { icon: Mail, label: "Inquiries", href: "/admin/inquiries" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  const statCards = [
    { label: "Active Jobs", value: stats.totalJobs, icon: Briefcase, gradient: 'from-primary to-primary/80', subtitle: "All posted jobs" },
    { label: "Applications", value: stats.totalApplications, icon: FileText, gradient: 'from-primary/90 to-primary/70', subtitle: "Total received" },
    { label: "Total Users", value: stats.totalUsers, icon: Users, gradient: 'from-primary/80 to-primary/60', subtitle: "Registered users" },
    { label: "New Inquiries", value: stats.pendingInquiries, icon: MessageSquare, gradient: 'from-amber-500 to-amber-400', subtitle: "Unread messages" },
    { label: "Subscribers", value: stats.subscribers, icon: Mail, gradient: 'from-primary/70 to-primary/50', subtitle: "Newsletter" },
    { label: "Blog Posts", value: stats.blogPosts, icon: Newspaper, gradient: 'from-primary/60 to-primary/40', subtitle: "Published" },
  ];

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">M</span>
            </div>
            <span className="font-bold">Admin</span>
          </Link>
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {stats.pendingInquiries > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
              {stats.pendingInquiries}
            </span>
          )}
        </Button>
      </header>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border hidden lg:block">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">M</span>
              </div>
              <div>
                <span className="font-bold text-lg">MISO Admin</span>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto mt-16 lg:mt-0">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 mb-3">Menu</p>
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-primary text-primary-foreground font-medium shadow-md' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              );
            })}
          </nav>

          {/* User */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.email}</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full mt-2 justify-start gap-3 text-muted-foreground hover:text-destructive"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0">
        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between p-6 border-b border-border bg-card">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Input placeholder="Search..." className="w-64 pl-10" />
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {stats.pendingInquiries > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                  {stats.pendingInquiries}
                </span>
              )}
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-6 space-y-6">
          {/* Stats Grid - Modern Green Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${stat.gradient} text-primary-foreground shadow-lg`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-primary-foreground/80 text-sm font-medium">{stat.label}</p>
                    <h3 className="text-4xl font-bold mt-2">{stat.value}</h3>
                    <p className="text-primary-foreground/70 text-xs mt-1">{stat.subtitle}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
                {/* Decorative circles */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/10" />
                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl p-6 shadow-sm border border-border"
          >
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/admin/jobs">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm">Post New Job</span>
                </Button>
              </Link>
              <Link to="/admin/blog">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Newspaper className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm">Write Blog Post</span>
                </Button>
              </Link>
              <Link to="/admin/applications">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm">View Applications</span>
                </Button>
              </Link>
              <Link to="/admin/inquiries">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm">Check Inquiries</span>
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-2xl p-6 shadow-sm border border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Applications</h2>
                <Link to="/admin/applications" className="text-sm text-primary hover:underline">View all</Link>
              </div>
              <div className="space-y-3">
                {recentApplications.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-8">No applications yet</p>
                ) : (
                  recentApplications.map((app) => (
                    <div key={app.id} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-medium text-sm">
                          {app.full_name?.charAt(0) || 'A'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate text-sm">{app.full_name} applied for {app.jobs?.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(app.applied_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        app.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        app.status === 'reviewed' ? 'bg-blue-100 text-blue-700' :
                        app.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card rounded-2xl p-6 shadow-sm border border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Inquiries</h2>
                <Link to="/admin/inquiries" className="text-sm text-primary hover:underline">View all</Link>
              </div>
              <div className="space-y-3">
                {recentInquiries.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-8">No inquiries yet</p>
                ) : (
                  recentInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate text-sm">New inquiry from {inquiry.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{inquiry.subject}</p>
                      </div>
                      {!inquiry.is_read && (
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

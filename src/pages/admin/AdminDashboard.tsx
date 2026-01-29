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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-700 flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="font-bold">MISO Admin</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            {stats.pendingInquiries > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {stats.pendingInquiries}
              </span>
            )}
          </Button>
          <Button variant="ghost" size="icon">
            <Mail className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-700 flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="font-bold text-lg">MISO Admin</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-green-700 text-white font-medium' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.email}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full mt-2 justify-start gap-3 text-gray-600 hover:text-red-600"
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
        <header className="hidden lg:flex items-center justify-between p-6 bg-white border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Input placeholder="Search..." className="w-64 pl-10" />
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Bell className="w-5 h-5 text-gray-600" />
              </div>
              {stats.pendingInquiries > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {stats.pendingInquiries}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Mail className="w-5 h-5 text-gray-600" />
              </div>
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-medium">{user?.email?.split('@')[0] || 'Admin'}</p>
                <p className="text-xs text-gray-500">Admin Officer</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center">
                <span className="text-white font-semibold">{user?.email?.charAt(0).toUpperCase() || 'A'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-6 space-y-6">
          {/* Top Stats Grid - 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {/* Total Jobs - Dark Green */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-green-800 to-green-900 text-white rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>
                <p className="text-white/80 text-sm mb-2">Total Jobs</p>
                <h3 className="text-4xl font-bold mb-1">{stats.totalJobs}</h3>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded-full bg-green-400 text-green-900 text-xs font-medium">
                    Active
                  </span>
                  <span className="text-white/60 text-xs">Job postings</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/10" />
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
            </motion.div>

            {/* Total Applications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
              <p className="text-gray-500 text-sm mb-2">Total Applications</p>
              <h3 className="text-4xl font-bold mb-1">{stats.totalApplications}</h3>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                  Received
                </span>
                <span className="text-gray-400 text-xs">Job applications</span>
              </div>
            </motion.div>

            {/* Total Users */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-gray-600" />
              </div>
              <p className="text-gray-500 text-sm mb-2">Total Users</p>
              <h3 className="text-4xl font-bold mb-1">{stats.totalUsers}</h3>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                  Registered
                </span>
                <span className="text-gray-400 text-xs">User accounts</span>
              </div>
            </motion.div>

            {/* Total Blog Posts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Newspaper className="w-6 h-6 text-gray-600" />
              </div>
              <p className="text-gray-500 text-sm mb-2">Total Blog Posts</p>
              <h3 className="text-4xl font-bold mb-1">{stats.blogPosts}</h3>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                  Published
                </span>
                <span className="text-gray-400 text-xs">Blog articles</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Application Activity Chart - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold">Application Activity</h2>
                  <p className="text-sm text-gray-500">Track job application trends</p>
                </div>
                <select className="px-4 py-2 rounded-lg border border-gray-200 text-sm">
                  <option>This year</option>
                  <option>Last year</option>
                </select>
              </div>
              
              {/* Bar Chart - Using Applications Data */}
              <div className="h-64 flex items-end gap-4 lg:gap-6">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => {
                  const monthApplications = recentApplications.filter(app => {
                    const appMonth = new Date(app.applied_at).getMonth();
                    return appMonth === index;
                  }).length;
                  const maxHeight = 5;
                  const height = monthApplications > 0 ? (monthApplications / maxHeight) * 80 + 20 : 15;
                  
                  return (
                    <div key={month} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex flex-col items-center gap-1">
                        <div className="w-full h-52 flex items-end justify-center gap-1">
                          <div 
                            className="w-2/5 bg-gradient-to-t from-green-800 to-green-700 rounded-t-lg transition-all duration-500"
                            style={{ height: `${height}%` }}
                          />
                          <div 
                            className="w-2/5 bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500"
                            style={{ height: `${height * 0.85}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">{month}</span>
                    </div>
                  );
                })}
              </div>
              
              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-700" />
                  <span className="text-sm text-gray-600">Applications Received</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-sm text-gray-600">Applications Reviewed</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Stats Distribution */}
            <div className="space-y-6">
              {/* Content Statistics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">Content Statistics</h2>
                    <p className="text-sm text-gray-500">Overview of platform content</p>
                  </div>
                  <select className="px-3 py-1 rounded-lg border border-gray-200 text-sm bg-white">
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                  </select>
                </div>

                {/* Pie Chart */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {(() => {
                        const total = stats.totalJobs + stats.totalApplications + stats.blogPosts;
                        if (total === 0) return <circle cx="50" cy="50" r="45" fill="#e5e7eb" />;
                        
                        const segments = [
                          { value: stats.totalJobs, color: '#166534' },
                          { value: stats.totalApplications, color: '#16a34a' },
                          { value: stats.blogPosts, color: '#22c55e' }
                        ];
                        
                        let currentAngle = 0;
                        return segments.map((segment, index) => {
                          const percentage = (segment.value / total) * 100;
                          const angle = (percentage / 100) * 360;
                          const largeArc = angle > 180 ? 1 : 0;
                          
                          const startX = 50 + 45 * Math.cos((currentAngle * Math.PI) / 180);
                          const startY = 50 + 45 * Math.sin((currentAngle * Math.PI) / 180);
                          const endX = 50 + 45 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
                          const endY = 50 + 45 * Math.sin(((currentAngle + angle) * Math.PI) / 180);
                          
                          currentAngle += angle;
                          
                          return (
                            <path
                              key={index}
                              d={`M 50 50 L ${startX} ${startY} A 45 45 0 ${largeArc} 1 ${endX} ${endY} Z`}
                              fill={segment.color}
                              stroke="white"
                              strokeWidth="0.5"
                            />
                          );
                        });
                      })()}
                      <circle cx="50" cy="50" r="25" fill="white" />
                    </svg>
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                  {[
                    { label: 'Jobs', value: stats.totalJobs, color: { bg: 'bg-green-100', text: 'text-green-700', badge: 'bg-green-800' } },
                    { label: 'Applications', value: stats.totalApplications, color: { bg: 'bg-green-100', text: 'text-green-700', badge: 'bg-green-600' } },
                    { label: 'Blog Posts', value: stats.blogPosts, color: { bg: 'bg-green-100', text: 'text-green-700', badge: 'bg-green-400' } }
                  ].map((item) => {
                    const total = stats.totalJobs + stats.totalApplications + stats.blogPosts;
                    const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : '0';
                    return (
                      <div key={item.label} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${item.color.badge}`} />
                          <span className="text-sm font-medium">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">{item.value}</span>
                          <span className={`px-2 py-1 rounded-full ${item.color.bg} ${item.color.text} text-xs font-medium`}>
                            {percentage}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* User Engagement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">User Engagement</h2>
                    <p className="text-sm text-gray-500">Track user activity metrics</p>
                  </div>
                  <select className="px-3 py-1 rounded-lg border border-gray-200 text-sm">
                    <option>Today</option>
                    <option>This Week</option>
                  </select>
                </div>

                {/* Pie Chart */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {(() => {
                        const total = stats.totalUsers + stats.subscribers + stats.pendingInquiries;
                        if (total === 0) {
                          return <circle cx="50" cy="50" r="45" fill="#e5e7eb" />;
                        }
                        
                        const segments = [
                          { value: stats.totalUsers, color: '#166534' },
                          { value: stats.subscribers, color: '#22c55e' },
                          { value: stats.totalApplications, color: '#4ade80' },
                          { value: stats.pendingInquiries, color: '#86efac' }
                        ];
                        
                        let currentAngle = 0;
                        return segments.map((segment, index) => {
                          const percentage = (segment.value / total) * 100;
                          const angle = (percentage / 100) * 360;
                          const largeArc = angle > 180 ? 1 : 0;
                          
                          const startX = 50 + 45 * Math.cos((currentAngle * Math.PI) / 180);
                          const startY = 50 + 45 * Math.sin((currentAngle * Math.PI) / 180);
                          const endX = 50 + 45 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
                          const endY = 50 + 45 * Math.sin(((currentAngle + angle) * Math.PI) / 180);
                          
                          currentAngle += angle;
                          
                          return (
                            <path
                              key={index}
                              d={`M 50 50 L ${startX} ${startY} A 45 45 0 ${largeArc} 1 ${endX} ${endY} Z`}
                              fill={segment.color}
                              stroke="white"
                              strokeWidth="0.5"
                            />
                          );
                        });
                      })()}
                      <circle cx="50" cy="50" r="20" fill="white" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold">
                        {stats.totalUsers}
                      </span>
                    </div>
                  </div>
                </div>

                {/* User Metrics */}
                <div className="space-y-3">
                  {[
                    { label: 'Total Users', value: stats.totalUsers },
                    { label: 'Subscribers', value: stats.subscribers },
                    { label: 'Applications', value: stats.totalApplications },
                    { label: 'Inquiries', value: stats.pendingInquiries }
                  ].map((item, index) => {
                    const total = stats.totalUsers + stats.subscribers + stats.totalApplications + stats.pendingInquiries;
                    const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
                    return (
                      <div key={item.label} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.label}</span>
                          <span className="text-sm font-semibold">{item.value} ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-green-700 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Applications</h2>
                <Link to="/admin/applications" className="text-sm text-green-700 hover:underline">View all</Link>
              </div>
              <div className="space-y-3">
                {recentApplications.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-8">No applications yet</p>
                ) : (
                  recentApplications.map((app) => (
                    <div key={app.id} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {app.full_name?.charAt(0) || 'A'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate text-sm">{app.full_name} applied for {app.jobs?.title}</p>
                        <p className="text-xs text-gray-500">
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
              transition={{ delay: 0.8 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Inquiries</h2>
                <Link to="/admin/inquiries" className="text-sm text-green-700 hover:underline">View all</Link>
              </div>
              <div className="space-y-3">
                {recentInquiries.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-8">No inquiries yet</p>
                ) : (
                  recentInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate text-sm">New inquiry from {inquiry.name}</p>
                        <p className="text-xs text-gray-500 truncate">{inquiry.subject}</p>
                      </div>
                      {!inquiry.is_read && (
                        <span className="w-2 h-2 rounded-full bg-green-700"></span>
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
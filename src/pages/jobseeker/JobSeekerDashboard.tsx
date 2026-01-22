import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Briefcase, 
  Bookmark,
  FileText,
  Bell,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Clock,
  CheckCircle,
  Search,
  User,
  ArrowUpRight
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'My Applications', icon: FileText, href: '/dashboard/applications' },
  { label: 'Saved Jobs', icon: Bookmark, href: '/dashboard/saved' },
  { label: 'My Profile', icon: User, href: '/dashboard/profile' },
];

const JobSeekerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userRole, signOut, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    savedJobs: 0,
  });
  const [recentApplications, setRecentApplications] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!loading && (!user || userRole !== 'job_seeker')) {
      navigate('/auth');
    }
  }, [user, userRole, loading, navigate]);

  useEffect(() => {
    if (user && userRole === 'job_seeker') {
      fetchStats();
      fetchRecentApplications();
      fetchProfile();
    }
  }, [user, userRole]);

  const fetchProfile = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
    setProfile(data);
  };

  const fetchStats = async () => {
    if (!user) return;
    
    const { data: applications } = await supabase
      .from('job_applications')
      .select('id, status')
      .eq('applicant_id', user.id);

    const { data: savedJobs } = await supabase
      .from('saved_jobs')
      .select('id')
      .eq('user_id', user.id);

    setStats({
      totalApplications: applications?.length || 0,
      pendingApplications: applications?.filter(a => a.status === 'pending').length || 0,
      acceptedApplications: applications?.filter(a => a.status === 'accepted').length || 0,
      savedJobs: savedJobs?.length || 0,
    });
  };

  const fetchRecentApplications = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('job_applications')
      .select('*, jobs(title, company)')
      .eq('applicant_id', user.id)
      .order('applied_at', { ascending: false })
      .limit(5);

    setRecentApplications(data || []);
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

  const statCards = [
    { 
      label: 'Total Applications', 
      value: stats.totalApplications, 
      icon: FileText, 
      gradient: 'from-primary to-primary/80',
      subtitle: 'All time applications'
    },
    { 
      label: 'Pending', 
      value: stats.pendingApplications, 
      icon: Clock, 
      gradient: 'from-primary/90 to-primary/70',
      subtitle: 'Awaiting response'
    },
    { 
      label: 'Accepted', 
      value: stats.acceptedApplications, 
      icon: CheckCircle, 
      gradient: 'from-primary/80 to-primary/60',
      subtitle: 'Interview calls'
    },
    { 
      label: 'Saved Jobs', 
      value: stats.savedJobs, 
      icon: Bookmark, 
      gradient: 'from-primary/70 to-primary/50',
      subtitle: 'Bookmarked'
    },
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
            <span className="font-bold">Dashboard</span>
          </Link>
        </div>
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
      </header>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border hidden lg:block">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">M</span>
              </div>
              <div>
                <span className="font-bold text-lg">MISO</span>
                <p className="text-xs text-muted-foreground">Job Seeker</p>
              </div>
            </Link>
          </div>

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

          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 px-4 py-3 bg-muted/50 rounded-xl">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-medium">
                  {profile?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{profile?.full_name || user?.email}</p>
                <p className="text-xs text-muted-foreground">Job Seeker</p>
              </div>
            </div>
            <Button variant="ghost" className="w-full justify-start gap-3 mt-2 text-muted-foreground hover:text-destructive" onClick={handleSignOut}>
              <LogOut className="w-5 h-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Track your applications and saved jobs</p>
            </div>
            <Link to="/jobs">
              <Button className="gap-2 hidden sm:flex">
                <Search className="w-4 h-4" />
                Browse Jobs
              </Button>
            </Link>
          </div>

          {/* Stats Grid - Modern Green Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

          {/* Quick Actions & Recent */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-2xl p-6 border border-border shadow-sm"
            >
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link to="/jobs" className="block">
                  <Button variant="outline" className="w-full justify-start gap-3 h-12">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Search className="w-4 h-4 text-primary" />
                    </div>
                    Browse Jobs
                  </Button>
                </Link>
                <Link to="/dashboard/applications" className="block">
                  <Button variant="outline" className="w-full justify-start gap-3 h-12">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    View Applications
                  </Button>
                </Link>
                <Link to="/dashboard/saved" className="block">
                  <Button variant="outline" className="w-full justify-start gap-3 h-12">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bookmark className="w-4 h-4 text-primary" />
                    </div>
                    Saved Jobs
                  </Button>
                </Link>
                <Link to="/dashboard/profile" className="block">
                  <Button variant="outline" className="w-full justify-start gap-3 h-12">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    Update Profile
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card rounded-2xl p-6 border border-border shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Applications</h2>
                <Link to="/dashboard/applications" className="text-sm text-primary hover:underline">View all</Link>
              </div>
              {recentApplications.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">No applications yet</p>
                  <Link to="/jobs">
                    <Button variant="outline" size="sm">Start applying</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentApplications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{app.jobs?.title}</p>
                          <p className="text-xs text-muted-foreground">{app.jobs?.company}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        app.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        app.status === 'reviewed' ? 'bg-blue-100 text-blue-700' :
                        app.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default JobSeekerDashboard;

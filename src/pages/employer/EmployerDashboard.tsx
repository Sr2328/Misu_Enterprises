import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Plus,
  Bell,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Eye,
  Clock,
  Building2,
  ArrowUpRight
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/employer' },
  { label: 'My Jobs', icon: Briefcase, href: '/employer/jobs' },
  { label: 'Applications', icon: Users, href: '/employer/applications' },
  { label: 'Company Profile', icon: Building2, href: '/employer/profile' },
];

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userRole, signOut, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
  });
  const [recentApplications, setRecentApplications] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!loading && (!user || userRole !== 'employer')) {
      navigate('/auth');
    }
  }, [user, userRole, loading, navigate]);

  useEffect(() => {
    if (user && userRole === 'employer') {
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
    
    // Fetch jobs created by this employer
    const { data: jobs } = await supabase
      .from('jobs')
      .select('id, is_active')
      .eq('employer_id', user.id);

    const jobIds = jobs?.map(j => j.id) || [];
    
    // Fetch applications for employer's jobs
    const { data: applications } = await supabase
      .from('job_applications')
      .select('id, status')
      .in('job_id', jobIds.length > 0 ? jobIds : ['00000000-0000-0000-0000-000000000000']);

    setStats({
      totalJobs: jobs?.length || 0,
      activeJobs: jobs?.filter(j => j.is_active).length || 0,
      totalApplications: applications?.length || 0,
      pendingApplications: applications?.filter(a => a.status === 'pending').length || 0,
    });
  };

  const fetchRecentApplications = async () => {
    if (!user) return;
    
    const { data: jobs } = await supabase
      .from('jobs')
      .select('id')
      .eq('employer_id', user.id);

    const jobIds = jobs?.map(j => j.id) || [];

    const { data } = await supabase
      .from('job_applications')
      .select('*, jobs(title)')
      .in('job_id', jobIds.length > 0 ? jobIds : ['00000000-0000-0000-0000-000000000000'])
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
      label: 'Total Jobs', 
      value: stats.totalJobs, 
      icon: Briefcase, 
      gradient: 'from-primary to-primary/80',
      subtitle: 'Posted positions'
    },
    { 
      label: 'Active Jobs', 
      value: stats.activeJobs, 
      icon: Eye, 
      gradient: 'from-primary/90 to-primary/70',
      subtitle: 'Currently live'
    },
    { 
      label: 'Total Applications', 
      value: stats.totalApplications, 
      icon: Users, 
      gradient: 'from-primary/80 to-primary/60',
      subtitle: 'All candidates'
    },
    { 
      label: 'Pending Review', 
      value: stats.pendingApplications, 
      icon: Clock, 
      gradient: 'from-primary/70 to-primary/50',
      subtitle: 'Awaiting action'
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
            <span className="font-bold">Employer</span>
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
                <p className="text-xs text-muted-foreground">Employer Portal</p>
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
                  {profile?.company_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{profile?.company_name || user?.email}</p>
                <p className="text-xs text-muted-foreground">Employer</p>
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
              <p className="text-muted-foreground">Manage your job postings and applications</p>
            </div>
            <Link to="/employer/jobs">
              <Button className="gap-2 hidden sm:flex">
                <Plus className="w-4 h-4" />
                Post New Job
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

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-2xl p-6 border border-border shadow-sm"
            >
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link to="/employer/jobs" className="block">
                  <Button variant="outline" className="w-full justify-start gap-3 h-12">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Plus className="w-4 h-4 text-primary" />
                    </div>
                    Post New Job
                  </Button>
                </Link>
                <Link to="/employer/applications" className="block">
                  <Button variant="outline" className="w-full justify-start gap-3 h-12">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    Review Applications
                  </Button>
                </Link>
                <Link to="/employer/profile" className="block">
                  <Button variant="outline" className="w-full justify-start gap-3 h-12">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-primary" />
                    </div>
                    Update Company Profile
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
                <Link to="/employer/applications" className="text-sm text-primary hover:underline">View all</Link>
              </div>
              {recentApplications.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-sm">No applications yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentApplications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                          <span className="text-primary-foreground font-medium text-sm">
                            {app.full_name?.charAt(0) || 'A'}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{app.full_name}</p>
                          <p className="text-xs text-muted-foreground">{app.jobs?.title}</p>
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

export default EmployerDashboard;

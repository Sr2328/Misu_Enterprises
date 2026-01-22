import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
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
  Building2,
  MapPin,
  Trash2,
  ExternalLink
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'My Applications', icon: FileText, href: '/dashboard/applications' },
  { label: 'Saved Jobs', icon: Bookmark, href: '/dashboard/saved' },
];

const JobSeekerSaved = () => {
  const navigate = useNavigate();
  const { user, userRole, signOut, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && (!user || userRole !== 'job_seeker')) {
      navigate('/auth');
    }
  }, [user, userRole, loading, navigate]);

  useEffect(() => {
    if (user && userRole === 'job_seeker') {
      fetchSavedJobs();
    }
  }, [user, userRole]);

  const fetchSavedJobs = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('saved_jobs')
      .select('*, jobs(id, title, company, location, job_type, salary_display, is_active)')
      .eq('user_id', user.id)
      .order('saved_at', { ascending: false });

    setSavedJobs(data || []);
  };

  const removeSavedJob = async (savedJobId: string) => {
    const { error } = await supabase
      .from('saved_jobs')
      .delete()
      .eq('id', savedJobId);

    if (error) {
      toast.error('Failed to remove job');
    } else {
      toast.success('Job removed from saved');
      fetchSavedJobs();
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

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <span className="font-bold">Saved Jobs</span>
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
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary font-medium' 
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
            <Button variant="ghost" className="w-full justify-start gap-3" onClick={handleSignOut}>
              <LogOut className="w-5 h-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Saved Jobs</h1>
            <p className="text-muted-foreground">Jobs you've saved for later</p>
          </div>

          {/* Saved Jobs List */}
          <div className="space-y-4">
            {savedJobs.length === 0 ? (
              <div className="bg-card rounded-2xl border border-border p-12 text-center">
                <Bookmark className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No saved jobs</h3>
                <p className="text-muted-foreground mb-4">Browse jobs and save the ones you're interested in</p>
                <Link to="/jobs">
                  <Button>Browse Jobs</Button>
                </Link>
              </div>
            ) : (
              savedJobs.map((saved) => (
                <div key={saved.id} className="bg-card rounded-2xl border border-border p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{saved.jobs?.title}</h3>
                        {!saved.jobs?.is_active && (
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                            Closed
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {saved.jobs?.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {saved.jobs?.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {saved.jobs?.job_type}
                        </span>
                      </div>
                      {saved.jobs?.salary_display && (
                        <p className="text-sm font-medium mt-2">{saved.jobs.salary_display}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {saved.jobs?.is_active && (
                        <Link to={`/jobs/${saved.jobs?.id}`}>
                          <Button variant="outline" size="sm" className="gap-2">
                            <ExternalLink className="w-4 h-4" />
                            View
                          </Button>
                        </Link>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeSavedJob(saved.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default JobSeekerSaved;
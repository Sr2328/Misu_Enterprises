import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Clock, DollarSign, ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const featuredJobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp Solutions",
    location: "Makati City",
    type: "Full-time",
    salary: "₱80,000 - ₱120,000",
    posted: "2 days ago",
    tags: ["React", "Node.js", "TypeScript"],
  },
  {
    id: 2,
    title: "Marketing Manager",
    company: "Global Brands Inc.",
    location: "BGC, Taguig",
    type: "Full-time",
    salary: "₱60,000 - ₱90,000",
    posted: "3 days ago",
    tags: ["Digital Marketing", "SEO", "Analytics"],
  },
  {
    id: 3,
    title: "HR Business Partner",
    company: "Enterprise Corp",
    location: "Ortigas Center",
    type: "Full-time",
    salary: "₱55,000 - ₱75,000",
    posted: "1 day ago",
    tags: ["HRIS", "Recruitment", "Training"],
  },
  {
    id: 4,
    title: "Financial Analyst",
    company: "Investment Partners",
    location: "Alabang, Muntinlupa",
    type: "Full-time",
    salary: "₱50,000 - ₱70,000",
    posted: "4 days ago",
    tags: ["Financial Modeling", "Excel", "SAP"],
  },
];

export function FeaturedJobsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showModal, setShowModal] = useState(false);

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Featured Jobs
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              Latest <span className="text-gradient">Opportunities</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore our latest job openings from top companies.
            </p>
          </div>
          <Button variant="outline" size="lg" className="mt-6 md:mt-0" asChild>
            <Link to="/jobs">
              View All Jobs <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Jobs Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {featuredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group bg-card rounded-2xl p-6 shadow-soft border border-border/50 hover:shadow-card hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Building2 className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <Link to={`/jobs/${job.id}`}>
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors cursor-pointer">
                        {job.title}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground">{job.company}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{job.posted}</span>
              </div>

              <div className="flex flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {job.type}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <DollarSign className="w-4 h-4" />
                  {job.salary}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Button 
                className="w-full" 
                variant="hero"
                asChild
              >
                <Link to={`/jobs/${job.id}`}>
                  View Details <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Apply Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Apply for this position</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Sign in to apply for this job on our platform.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-sm text-foreground mb-3">
                📱 <strong>Download our mobile app</strong> for the best experience and instant notifications.
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  App Store
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Google Play
                </Button>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">Or continue on web</p>
              <Button variant="hero" className="w-full" asChild>
                <Link to="/auth">Sign in to apply</Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

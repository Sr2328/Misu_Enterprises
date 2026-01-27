import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Handshake, ArrowRight, Briefcase } from "lucide-react";
import heroabout from  "@/assets/heroabout.mp4";

export function AboutHeroSection() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });

  return (
    <section ref={heroRef} className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Video - Desktop Only */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="hidden lg:block absolute inset-0 w-full h-full object-cover"
        poster="/hero-bg.jpg"
        onLoadedData={(e) => {
          (e.target as HTMLVideoElement).play().catch(err => console.log("Video autoplay failed:", err));
        }}
      >
        <source src={heroabout} type="video/mp4" />
        <source src="/hero-video.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Background Image - Mobile Only */}
      <div 
        className="lg:hidden absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.postimg.cc/DfDsqS4h/10a3504179064783956a8d6e0c041da7.jpg')" }}
        role="img"
        aria-label="Hero background"
      />

      {/* Gradient Overlay - Stronger on left side for text visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40 lg:from-black/85 lg:via-black/60 lg:to-transparent" />

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-left"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-4 backdrop-blur-sm">
              About MISU Enterprises
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Your Trusted <span className="text-emerald-400">Workforce Partner</span> Since 2008
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-xl leading-relaxed">
              For over 15 years, MISU Enterprises has been connecting businesses with reliable, trained, and compliant workforce — from top management to ground-level support staff across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                asChild
                className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
              >
                <Link to="/contact">
                  <Handshake className="w-5 h-5" />
                  Hire Manpower <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <Link to="/jobs">
                  <Briefcase className="w-5 h-5" />
                  Apply for Jobs
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Element - Optional */}
      <div className="hidden lg:block absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
    </section>
  );
}
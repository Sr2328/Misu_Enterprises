import { motion, useMotionValue, useTransform, animate, useScroll } from "framer-motion";
import { ArrowRight, Play, Briefcase } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroImage from "@/assets/hero-team.jpg";
import mainpng from "@/assets/mainpng.jpg";

const stats = [
  { value: 10000, label: "Candidates Placed", suffix: "+" },
  { value: 500, label: "Partner Companies", suffix: "+" },
  { value: 15, label: "Years Experience", suffix: "+" },
];

const rotatingTexts = ["Perfect Talent", "Dream Job", "Career Growth", "Future Team"];

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState("0");
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest).toLocaleString());
      }
    });

    return controls.stop;
  }, [value, count]);

  return (
    <span ref={nodeRef}>
      {displayValue}
      {suffix}
    </span>
  );
}

function RotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.span
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-gradient inline-block"
    >
      {rotatingTexts[index]}
    </motion.span>
  );
}

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const decorativeY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden"
    >
      {/* Animated Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: decorativeY }}
      >
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content - Left Side */}
          <motion.div
            style={{ y: contentY }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left flex flex-col justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 mx-auto lg:mx-0 w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Trusted by 500+ Companies Worldwide
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Find Your{" "}
              <RotatingText />
              {" "}
              Anytime & Anywhere
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              MISU Enterprises connects exceptional candidates with outstanding opportunities. 
              Let us help you build your dream team or find your dream career.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-foreground hover:bg-foreground/90 text-background px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg inline-flex items-center justify-center gap-2 text-lg"
                onClick={() => window.location.href = '/jobs'}
              >
                Browse Jobs <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-border hover:border-primary bg-background px-8 py-4 rounded-lg font-medium transition-all duration-300 inline-flex items-center justify-center gap-2 text-foreground hover:text-primary text-lg"
                onClick={() => window.location.href = '/services'}
              >
                <Play className="w-5 h-5" /> Our Services
              </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div className="mb-1">
                    <span className="text-3xl md:text-4xl font-bold text-foreground">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hero Image - Right Side - Matching Left Height */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative h-full min-h-[600px] lg:min-h-0"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-card w-full h-full">
              {/* Loading Skeleton */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
              )}
              
              {/* Image Container - Full Height */}
              <div className="relative w-full h-full">
                <motion.img
                  src={mainpng}
                  alt="Professional team collaborating in modern office"
                  className={`w-full h-full object-cover transition-opacity duration-700 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: imageLoaded ? 1 : 1.1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </div>

              {/* Floating Card with Parallax */}
              {/* <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: imageLoaded ? 1 : 0, x: imageLoaded ? 0 : -20 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                style={{ 
                  y: useTransform(scrollYProgress, [0, 1], [0, -30])
                }}
                className="absolute bottom-6 left-6 right-6 md:right-auto md:w-72 glass-card rounded-2xl p-4 shadow-card backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Briefcase className="w-6 h-6 text-primary-foreground" />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-foreground">250+ Jobs</p>
                    <p className="text-sm text-muted-foreground">Available this week</p>
                  </div>
                </div>
              </motion.div> */}
            </div>

            {/* Decorative Elements with Parallax */}
            <motion.div 
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
              className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-2xl -z-10"
            />
            <motion.div 
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, 60]) }}
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-2xl -z-10"
            />
          </motion.div>
        </div>
      </div>

      <style>{`
        .text-gradient {
          background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gradient-hero {
          background: linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--card)) 100%);
        }
        .gradient-primary {
          background: linear-gradient(135deg, hsl(var(--primary)/0.8) 0%, hsl(var(--primary)) 100%);
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        .animate-shimmer {
          background-size: 1000px 100%;
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </section>
  );
}
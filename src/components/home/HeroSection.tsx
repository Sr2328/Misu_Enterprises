import { motion, useScroll, useTransform, animate, useMotionValue } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import heroimagee from "@/assets/heroimagee.png"

// Hero images that rotate every 5 seconds
const heroSlides = [
  {
    image: "https://i.postimg.cc/44m2RP0s/Chat-GPT-Image-Jan-30-2026-10-54-07-AM-(1).png?w=1920&auto=format&fit=crop",
    mobileImage: "https://i.postimg.cc/QdM79YZy/Chat-GPT-Image-Jan-30-2026-11-56-40-AM.png?w=800&auto=format&fit=crop",
    title: "Complete Workforce",
    subtitle: "Solutions for All Industries",
    description: "MISU Enterprise delivers comprehensive staffing and recruitment services across diverse sectors."
  },
  {
    image: "https://i.postimg.cc/tJ4j9xL4/Chat-GPT-Image-Jan-30-2026-11-07-46-AM.png?w=1920&auto=format&fit=crop",
    mobileImage: "https://i.postimg.cc/Ght3vW9j/Chat-GPT-Image-Jan-30-2026-11-59-21-AM.png?w=800&auto=format&fit=crop",
    title: "Professional Recruitment",
    subtitle: "Connecting Talent Nationwide",
    description: "Specialized in placing top-tier professionals in IT, healthcare, engineering, and corporate roles."
  },
  {
    image: "https://i.postimg.cc/8PBrsQJQ/503907b3-a449-4f3a-aab8-58eca85cf5c6.png?w=1920&auto=format&fit=crop",
    mobileImage: "https://i.postimg.cc/8cPvRZrr/Chat-GPT-Image-Jan-30-2026-12-04-56-PM.png?w=800&auto=format&fit=crop",
    title: "Industry Expertise",
    subtitle: "Tailored Staffing Solutions",
    description: "From contract positions to permanent placements, we understand your industry-specific needs."
  },
  {
    image: "https://i.postimg.cc/9M3kx7WJ/Chat-GPT-Image-Jan-30-2026-11-24-21-AM.png?w=1920&auto=format&fit=crop",
    mobileImage: "https://i.postimg.cc/v8f8hrvL/Chat-GPT-Image-Jan-30-2026-12-10-40-PM.png?w=800&auto=format&fit=crop",
    title: "Build Your Team",
    subtitle: "Fast & Reliable Service",
    description: "Partner with MISU for efficient hiring processes and high-performing talent delivery."
  }
];

const stats = [
  { value: 10, label: "First Nations Employment", suffix: "%" },
  { value: 35, label: "Clients Nationally", suffix: "+" },
  { value: 150, label: "Candidates Placed Yearly", suffix: "K+" },
];

function Counter({ value, suffix = "", isVisible }: { value: number; suffix?: string; isVisible: boolean }) {
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isVisible) return;
    
    const controls = animate(count, value, {
      duration: 2.5,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest).toLocaleString());
      }
    });

    return controls.stop;
  }, [value, count, isVisible]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [statsVisible, setStatsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setStatsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsVisible) {
            setStatsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [statsVisible]);

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[75vh] lg:min-h-[80vh] flex items-center overflow-hidden"
    >
      {/* Background Images with Parallax - Desktop */}
      <motion.div 
        className="hidden lg:block absolute inset-0"
        style={{ y: backgroundY }}
      >
        {heroSlides.map((slide, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 1.1,
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        {/* Gradient Overlay - Stronger left, lighter right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
      </motion.div>

      {/* Background Images - Mobile */}
      <div className="lg:hidden absolute inset-0">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 1.1,
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={slide.mobileImage}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        {/* Gradient Overlay for Mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/60" />
      </div>

      {/* Loading Overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoading ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-black z-40 pointer-events-none"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"
          />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="container mx-auto px-4 lg:px-8 py-12 lg:py-20 relative z-10"
      >
        <div className="max-w-3xl">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-medium mb-6 border border-white/20"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Trusted by 500+ Companies Nationwide
          </motion.div>

          {/* Dynamic Title - Synced with Images */}
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              {currentSlideData.title}
              <br />
              <span className="text-accent">
                {currentSlideData.subtitle}
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-gray-200 max-w-2xl"
            >
              {currentSlideData.description}
            </motion.p>
          </motion.div>

          {/* CTA Buttons - Updated with rounded corners and emerald hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-12 lg:mb-16"
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-emerald-500 hover:text-white px-6 py-6 text-base font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl"
              onClick={() => window.location.href = '/contact'}
            >
              Contact Us
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-emerald-500 hover:border-emerald-500 px-6 py-6 text-base font-medium rounded-full transition-all duration-300 transform hover:scale-105"
              onClick={() => window.location.href = '/services'}
            >
              Learn More
            </Button>
          </motion.div>

          {/* Statistics - Animated Counters */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 30 : 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-3 gap-4 md:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                className="text-center sm:text-left"
              >
                <div className="mb-1">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                    <Counter value={stat.value} suffix={stat.suffix} isVisible={statsVisible} />
                  </span>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Slide Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2"
      >
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="group relative"
          >
            <span
              className={`block w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          </button>
        ))}
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
      />
    </section>
  );
}
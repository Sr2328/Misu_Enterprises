import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
{
  value: 25,
  suffix: "K+",
  label: "Workers Deployed",
  description: "Skilled professionals successfully deployed across industries"
},
{
  value: 500,
  suffix: "+",
  label: "Client Partners",
  description: "Trusted companies partnering with us worldwide"
},
{
  value: 50,
  suffix: "K+",
  label: "Successful Placements",
  description: "Jobs filled with qualified and vetted talent"
},
// {
//   value: 98,
//   suffix: "%",
//   label: "Client Retention",
//   description: "Long-term partnerships built on consistent results"
// },
{
  value: 15,
  suffix: "+",
  label: "Years Experience",
  description: "Proven expertise in workforce solutions"
},
// {
//   value: "24–48",
//   suffix: "Hrs",
//   label: "Avg. Deployment Time",
//   description: "Rapid turnaround from request to deployment"
// }

];

function AnimatedCounter({ end, suffix, duration = 2, decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      const easeOutQuad = (t) => t * (2 - t);
      const currentCount = easeOutQuad(progress) * end;
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  const displayValue = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString();

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  );
}

export default function ImpactStatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 lg:py-28 bg-black"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0IiBmaWxsPSIjZW1lcmFsZCIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L2c+PC9zdmc+')]" />
      
      <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 mb-4 border border-emerald-500/20">
            Proven Impact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            We only deliver <span className="text-gradient">results.</span>
          </h2>
          <p className="text-lg text-gray-400">
            We don't make promises — we show real numbers that demonstrate
            measurable business impact.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative z-10">
                <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-500 mb-2 transition-all duration-300 group-hover:text-emerald-400 group-hover:scale-105">
                  <AnimatedCounter 
                    end={stat.value} 
                    suffix={stat.suffix}
                    decimals={stat.suffix === "K" ? 1 : 0}
                  />
                </p>
                <p className="text-base md:text-lg font-semibold text-white mb-1">
                  {stat.label}
                </p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {stat.description}
                </p>
              </div>
              
              {/* Hover glow effect */}
              <div className="absolute -inset-4 bg-emerald-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-0"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
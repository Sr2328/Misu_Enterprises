import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Testimonials data - 3 for employers, 3 for job seekers
  const testimonials = [
    // Employer Testimonials
    {
      id: 1,
      type: 'employer',
      name: 'Rajesh Kumar',
      position: 'HR Manager',
      company: 'Tech Solutions Pvt Ltd',
      image: 'https://i.pravatar.cc/150?img=12',
      text: 'Misu Enterprises has been our trusted partner for workforce solutions. Their trained and reliable staff have significantly improved our operational efficiency. Highly recommended!',
      rating: 5
    },
    {
      id: 2,
      type: 'employer',
      name: 'Priya Sharma',
      position: 'Operations Head',
      company: 'Manufacturing Excellence Co',
      image: 'https://i.pravatar.cc/150?img=45',
      text: 'The quality of manpower provided by Misu Enterprises is exceptional. Their compliance and timely deployment helped us meet critical project deadlines without any hassle.',
      rating: 5
    },
    {
      id: 3,
      type: 'employer',
      name: 'Amit Patel',
      position: 'CEO',
      company: 'Logistics Hub India',
      image: 'https://i.pravatar.cc/150?img=33',
      text: 'Working with Misu Enterprises transformed our workforce management. Their professional approach and dedicated support team make them stand out in the industry.',
      rating: 5
    },
    // Job Seeker Testimonials
    {
      id: 4,
      type: 'jobseeker',
      name: 'Sunita Devi',
      position: 'Warehouse Assistant',
      company: 'Now Employed',
      image: 'https://i.pravatar.cc/150?img=47',
      text: 'Misu Enterprises gave me an opportunity when I needed it most. They provided proper training and helped me secure a stable job. I\'m grateful for their support!',
      rating: 5
    },
    {
      id: 5,
      type: 'jobseeker',
      name: 'Mohammed Alam',
      position: 'Production Worker',
      company: 'Secured Employment',
      image: 'https://i.pravatar.cc/150?img=51',
      text: 'I found my dream job through Misu Enterprises. Their team guided me throughout the process and ensured I got fair wages and good working conditions. Excellent service!',
      rating: 5
    },
    {
      id: 6,
      type: 'jobseeker',
      name: 'Rekha Singh',
      position: 'Packaging Operator',
      company: 'Currently Working',
      image: 'https://i.pravatar.cc/150?img=38',
      text: 'Thanks to Misu Enterprises, I got a job that provides dignity and financial stability for my family. They treat workers with respect and care about our wellbeing.',
      rating: 5
    }
  ];

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 2) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 2) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 2 : prevIndex - 2
    );
  };

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Get current pair of testimonials
  const currentTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length]
  ];

  // Animation variants - Enter from right, exit to bottom
  const slideVariants = {
    enter: {
      x: 1000,
      opacity: 0,
      scale: 0.8
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: {
      zIndex: 0,
      y: 500,
      opacity: 0,
      scale: 0.8
    }
  };

  return (
    <section className="relative bg-black py-12 lg:py-16 overflow-hidden">
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 overflow-hidden opacity-3">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div> */}

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Section - 30% */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4 text-center lg:text-left"
            >
              {/* Image */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative inline-block mb-6"
              >
                <div className="relative w-48 h-48 sm:w-52 sm:h-52 lg:w-56 lg:h-56 xl:w-64 xl:h-64 mx-auto lg:mx-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl rotate-6 opacity-20"></div>
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=400&fit=crop"
                    alt="Happy Workforce"
                    className="relative w-full h-full object-cover rounded-3xl shadow-2xl"
                  />
                  <div className="absolute -top-4 -right-4 w-14 h-14 sm:w-16 sm:h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-semibold border border-emerald-500/30 mb-4">
                  Testimonials
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  From Our
                  <br />
                  <span className="text-emerald-400">Community</span>
                </h2>
                <p className="text-gray-400 text-base lg:text-lg mb-8">
                  Real stories from employers and job seekers who trust Misu Enterprises
                </p>
              </motion.div>

              {/* Pagination Controls */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center justify-center lg:justify-start gap-4"
              >
                {/* Navigation Arrows */}
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-emerald-500 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group border border-white/20"
                  aria-label="Previous testimonials"
                >
                  <ChevronLeft className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                  {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index * 2)}
                      className={`transition-all duration-300 rounded-full ${
                        currentIndex === index * 2 || currentIndex === index * 2 + 1
                          ? 'w-8 h-3 bg-emerald-500'
                          : 'w-3 h-3 bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-emerald-500 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group border border-white/20"
                  aria-label="Next testimonials"
                >
                  <ChevronRight className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </button>
              </motion.div>
            </motion.div>

            {/* Right Section - 70% */}
            <div className="lg:col-span-8 h-full">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={currentIndex}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 200, damping: 25 },
                    y: { type: "spring", stiffness: 200, damping: 25 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 }
                  }}
                  className="grid md:grid-cols-2 gap-6 h-full"
                >
                  {currentTestimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full min-h-[400px] lg:min-h-[500px] ${
                        testimonial.type === 'employer'
                          ? 'bg-white shadow-2xl'
                          : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700'
                      } transform hover:scale-105 transition-all duration-300`}
                    >
                      {/* Quote Icon */}
                      <div className={`mb-4 ${
                        testimonial.type === 'employer' ? 'text-emerald-500' : 'text-emerald-400'
                      }`}>
                        <Quote className="w-10 h-10 opacity-50" />
                      </div>

                      {/* Content Area - Grows to fill space */}
                      <div className="flex-grow flex flex-col justify-between">
                        {/* Testimonial Text */}
                        <p className={`mb-6 text-sm sm:text-base leading-relaxed ${
                          testimonial.type === 'employer' ? 'text-gray-700' : 'text-gray-300'
                        }`}>
                          "{testimonial.text}"
                        </p>

                        {/* Bottom Section */}
                        <div>
                          {/* Rating */}
                          <div className="flex gap-1 mb-4">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <svg
                                key={i}
                                className={`w-5 h-5 ${
                                  testimonial.type === 'employer' ? 'text-yellow-500' : 'text-yellow-400'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>

                          {/* Profile Info */}
                          <div className="flex items-center gap-4 pt-4 border-t border-gray-200/20">
                            <div className="relative">
                              <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-emerald-500/50"
                              />
                              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${
                                testimonial.type === 'employer' ? 'bg-emerald-500' : 'bg-blue-500'
                              } border-2 border-white`}></div>
                            </div>
                            <div>
                              <h4 className={`font-bold text-base sm:text-lg ${
                                testimonial.type === 'employer' ? 'text-gray-900' : 'text-white'
                              }`}>
                                {testimonial.name}
                              </h4>
                              <p className={`text-xs sm:text-sm ${
                                testimonial.type === 'employer' ? 'text-gray-600' : 'text-gray-400'
                              }`}>
                                {testimonial.position}
                              </p>
                              <p className={`text-xs ${
                                testimonial.type === 'employer' ? 'text-emerald-600' : 'text-emerald-400'
                              } font-semibold`}>
                                {testimonial.company}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Type Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          testimonial.type === 'employer'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {testimonial.type === 'employer' ? 'Employer' : 'Job Seeker'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>
    </section>
  );
};

export default TestimonialSection;
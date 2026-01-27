import React, { useState, useEffect, useCallback } from 'react';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "HR Manager",
      company: "Tech Solutions Ltd",
      text: "Misu Enterprises transformed our hiring process completely. Within two weeks, we had a team of skilled professionals who integrated seamlessly.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh&backgroundColor=10b981",
      icon: "👤"
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Software Developer",
      company: "Job Seeker",
      text: "I was struggling to find opportunities. Misu Enterprises not only found me a perfect role but also guided me through the interview process.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=10b981",
      icon: "💼"
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Operations Director",
      company: "Manufacturing Hub",
      text: "We needed skilled workers urgently. Misu Enterprises delivered beyond expectations with qualified candidates and proper training.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit&backgroundColor=10b981",
      icon: "🎯"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      role: "Marketing Specialist",
      company: "Job Seeker",
      text: "The personalized attention I received made all the difference. They understood my career goals and connected me with amazing opportunities.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha&backgroundColor=10b981",
      icon: "⭐"
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "CEO",
      company: "Retail Chain Group",
      text: "Finding reliable staff across multiple locations was our biggest challenge. Misu Enterprises streamlined everything perfectly.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram&backgroundColor=10b981",
      icon: "🏆"
    },
    {
      id: 6,
      name: "Ananya Das",
      role: "Graphic Designer",
      company: "Job Seeker",
      text: "From resume building to interview preparation, they supported me at every step. They believed in my potential and helped me succeed.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya&backgroundColor=10b981",
      icon: "✨"
    }
  ];

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (isPaused || isLoading) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, isLoading, testimonials.length]);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 2; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 to-emerald-100 flex flex-col items-center justify-center z-50">
        <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
        <div className="mt-6 text-gray-900 text-lg font-semibold animate-pulse">
          Loading Testimonials...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Section - Title */}
          <div className="lg:w-1/3 flex-shrink-0">
            <div className="sticky top-8">
              {/* Icon/Image placeholder */}
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl mb-6 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
                From Our<br />
                <span className="text-emerald-600">Misu Enterprises</span><br />
                Community
              </h2>
              
              <div className="flex items-center gap-2 mt-8">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                  <span className="text-white text-xl">●</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Testimonials */}
          <div className="lg:w-2/3 flex-1">
            <div 
              className="relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Testimonials Container */}
              <div className="flex gap-6 overflow-hidden">
                {getVisibleTestimonials().map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="flex-1 min-w-0 opacity-0 animate-slideIn"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Avatar and Icons Row */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                          <span className="text-2xl">{testimonial.icon}</span>
                        </div>
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500 shadow-md">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                        <span className="text-gray-400 text-lg">⚡</span>
                      </div>
                    </div>

                    {/* Quote Icon */}
                    <div className="text-emerald-500 text-5xl font-serif leading-none mb-4">"</div>

                    {/* Testimonial Text */}
                    <p className="text-gray-900 text-base sm:text-lg leading-relaxed mb-6 min-h-[120px]">
                      {testimonial.text}
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <div className="text-gray-900 font-semibold text-sm uppercase tracking-wide">
                          {testimonial.name}
                        </div>
                        <div className="text-gray-500 text-xs mt-1">
                          {testimonial.role}
                        </div>
                      </div>
                      <button className="flex items-center gap-2 text-gray-900 hover:text-emerald-600 transition-colors group">
                        <span className="text-sm font-medium">View More</span>
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Dots */}
              <div className="flex items-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'w-8 bg-emerald-600' 
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden lg:block">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
              
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block">
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
                  aria-label="Next testimonial"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 0.8s linear infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default TestimonialsSection;
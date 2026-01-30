import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Mail, Phone, Linkedin, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const careers = [
   {
    id: 1,
    title: "Operations Manager",
    location: "Gurgaon, Haryana, India",
    type: "Full-time",
  },
  {
    id: 2,
    title: "Production Supervisor",
    location: "Noida, Uttar Pradesh, India",
    type: "Full-time",
  },
  {
    id: 3,
    title: "Quality Control Manager",
    location: "Delhi, India",
    type: "Full-time",
  },
  {
    id: 4,
    title: "Supply Chain Manager",
    location: "Gurgaon, Haryana, India",
    type: "Full-time",
  },
  {
    id: 5,
    title: "Maintenance Engineer",
    location: "Noida, Uttar Pradesh, India",
    type: "Full-time",
  },
  {
    id: 6,
    title: "Human Resources Manager",
    location: "Delhi, India",
    type: "Full-time",
  }
];

const Careers = () => {
  return (
    <Layout>
      {/* Hero Section with Background Image - Reduced Height */}
      <section className="relative py-16 md:py-24 lg:py-28 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://i.postimg.cc/FFMyH4Rm/Beige-Light-Floral-Wedding-Invitation-Wedding-Website.png?auto=format&fit=crop&w=2000&q=80" 
            alt="Team Background" 
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay - Darker on Left, Lighter on Right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl lg:max-w-3xl"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 md:py-2 rounded-full bg-emerald-500 text-white text-xs md:text-sm font-semibold mb-4 md:mb-6"
            >
              Join Our Team
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 text-white leading-tight"
            >
              Build Your{" "}
              <span className="text-emerald-400">
                Career
              </span>
              <br />
              With Us
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed"
            >
              Join a team of passionate professionals dedicated to connecting talent with opportunity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Button 
                size="lg" 
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 md:px-8 py-4 md:py-5 text-base md:text-lg rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <a href="#positions">
                  View Open Positions <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content - Two Column Layout */}
      <section className="py-12 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
            
            {/* Left Column - Job Listings */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="mb-8 md:mb-12"
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-3">
                  Begin Your Career
                </h2>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-600">
                  With Us
                </h3>
              </motion.div>

              {/* Job Listings */}
              <div className="space-y-3 md:space-y-4" id="positions">
                {careers.map((career, index) => (
                  <motion.div
                    key={career.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group"
                  >
                    <div className="bg-white border-2 border-gray-200 rounded-lg md:rounded-xl p-4 md:p-6 hover:border-emerald-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1.5 md:mb-2 group-hover:text-emerald-600 transition-colors truncate">
                            {career.title}
                          </h3>
                          <p className="text-xs md:text-sm text-gray-600 flex items-center gap-1.5 md:gap-2">
                            <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600 flex-shrink-0" />
                            <span className="truncate">{career.location}</span>
                          </p>
                        </div>
                        
                        <button className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0 group-hover:border-emerald-500 group-hover:bg-emerald-500 transition-all duration-300">
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-gray-600 group-hover:text-white transition-colors" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column - Reach Us Section (Black Background Only) */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="lg:sticky lg:top-8"
              >
                {/* Description */}
                <div className="mb-6 md:mb-8">
                  <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                    HERE AT MISU WORKFORCE SOLUTIONS, WE PROVIDE YOU AN ATMOSPHERE AND CULTURE WHERE YOU CAN DEVELOP YOUR SKILLS WHILE BEING COMMITTED TO THE COMPANY GROWTH THROUGH INNOVATION, RESPONSIBILITY, AND COMMUNICATION TOWARDS OUR PEOPLE AND CLIENTS.
                  </p>
                </div>

                {/* Reach Us Card - Black Background */}
                <div className="bg-black rounded-xl md:rounded-2xl p-6 md:p-8 mb-4 md:mb-6 shadow-xl">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-6">
                    REACH US
                  </h3>
                  
                  {/* Contact Info */}
                  <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                    <div className="flex items-start gap-2 md:gap-3">
                      <Phone className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 mt-0.5 md:mt-1 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs md:text-sm text-gray-400 mb-0.5 md:mb-1">Phone Number</p>
                        <a href="tel:+639123456789" className="text-sm md:text-base text-white hover:text-emerald-400 transition-colors break-all">
                          +63 912 345 6789
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2 md:gap-3">
                      <Mail className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 mt-0.5 md:mt-1 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs md:text-sm text-gray-400 mb-0.5 md:mb-1">Email Address</p>
                        <a href="mailto:careers@misuworkforce.com" className="text-sm md:text-base text-white hover:text-emerald-400 transition-colors break-all">
                          careers@misuworkforce.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Team Image */}
                  <div className="rounded-lg md:rounded-xl overflow-hidden mb-4 md:mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                      alt="Our Team" 
                      className="w-full h-32 md:h-40 lg:h-48 object-cover"
                    />
                  </div>

                  {/* Social Links */}
                  <div>
                    <p className="text-xs md:text-sm text-gray-400 mb-2 md:mb-3">CONNECT WITH US</p>
                    <div className="flex gap-3 md:gap-4">
                      <a 
                        href="#" 
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 transition-all duration-300"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </a>
                      <a 
                        href="#" 
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 transition-all duration-300"
                        aria-label="Facebook"
                      >
                        <Facebook className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </a>
                      <a 
                        href="#" 
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 transition-all duration-300"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <p className="text-[10px] md:text-xs text-gray-500 text-center">
                  MISU WORKFORCE SOLUTIONS
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section - Reduced Height */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" 
                  alt="Professional Team" 
                  className="w-full h-[400px] md:h-[500px] lg:h-[550px] object-cover"
                />
              </div>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 md:mb-3 leading-tight">
                If You Have Any
              </h2>
              <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-emerald-600 mb-6 md:mb-8 leading-tight">
                Doubts Contact Us
              </h3>

              <form className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <Input 
                      type="text" 
                      placeholder="First Name" 
                      className="bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500 h-10 md:h-12 rounded-lg text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <Input 
                      type="text" 
                      placeholder="Last Name" 
                      className="bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500 h-10 md:h-12 rounded-lg text-sm md:text-base"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <Input 
                      type="email" 
                      placeholder="Email" 
                      className="bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500 h-10 md:h-12 rounded-lg text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <Input 
                      type="tel" 
                      placeholder="Phone Number" 
                      className="bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500 h-10 md:h-12 rounded-lg text-sm md:text-base"
                    />
                  </div>
                </div>

                <div>
                  <Textarea 
                    placeholder="Select Service" 
                    className="bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500 min-h-[80px] md:min-h-[100px] rounded-lg resize-none text-sm md:text-base"
                  />
                </div>

                <div>
                  <Textarea 
                    placeholder="Message" 
                    className="bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500 min-h-[100px] md:min-h-[120px] rounded-lg resize-none text-sm md:text-base"
                  />
                </div>

                <div className="flex items-start gap-2 md:gap-3">
                  <input 
                    type="checkbox" 
                    id="privacy" 
                    className="mt-0.5 md:mt-1 w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 flex-shrink-0"
                  />
                  <label htmlFor="privacy" className="text-xs md:text-sm text-gray-600 leading-relaxed">
                    You agree to our friendly privacy policy.
                  </label>
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-10 md:h-12 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
  ],
  services: [
    { name: "Recruitment", href: "/services" },
    { name: "Staffing Solutions", href: "/services" },
    { name: "Executive Search", href: "/services" },
    { name: "HR Consulting", href: "/services" },
  ],
  resources: [
    { name: "Job Listings", href: "/jobs" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/about" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing!");
      setEmail("");
    }
  };

  return (
    <footer className="bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-400 text-sm lg:text-base">Get the latest job opportunities delivered to your inbox</p>
            </div>
            <form onSubmit={handleNewsletter} className="flex w-full lg:w-auto gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 w-full lg:w-80 focus:border-emerald-500 transition-colors"
                required
              />
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 whitespace-nowrap"
              >
                Subscribe <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section with Logo */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
              {/* Logo */}
              {/* <div className="relative">
                <img
                  src="https://i.postimg.cc/sxnCLCrb/Gemini-Generated-Image-yblu51yblu51yblu-(2).png"
                  alt="MISU Enterprises Logo"
                  className="w-12 h-12 lg:w-14 lg:h-14 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div> */}
              {/* Company Name */}
              <div>
                <span className="font-bold text-lg lg:text-xl text-white block">MISU ENTERPRISES</span>
                <span className="text-emerald-400 text-xs lg:text-sm font-medium">WORKFORCE SOLUTIONS</span>
              </div>
            </Link>
            
            <p className="text-gray-400 mb-6 max-w-sm text-sm lg:text-base leading-relaxed">
              Your trusted partner in finding the perfect talent. We connect exceptional candidates with outstanding opportunities across India.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-sm">Sec-86, Gurugram</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                  <Phone className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-sm">+91 9540603737</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                  <Mail className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-sm">info@misuenterprises.com</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-base lg:text-lg">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm lg:text-base inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-base lg:text-lg">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm lg:text-base inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-base lg:text-lg">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm lg:text-base inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 text-center md:text-left">
              <p className="text-gray-500 text-xs lg:text-sm">
                © 2024 MISU Enterprises. All rights reserved.
              </p>
              <span className="hidden sm:inline text-gray-600">|</span>
              <p className="text-gray-500 text-xs lg:text-sm">
                Developed by{" "}
                <a 
                  href="https://srdevcorp.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors inline-flex items-center gap-1"
                >
                  SRDEV CORP
                  <span className="text-gray-400 font-normal">(Sachin Yadav)</span>
                </a>
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, User, Search, Phone } from "lucide-react";

const mainNavLinks = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "SERVICES", href: "/services" },
  { name: "CONTACT", href: "/contact" },
];

const dropdownSections = [
  {
    title: "MORE",
    items: [
      { name: "PORTFOLIO", href: "/portfolio" },
      { name: "JOBS", href: "/jobs" },
    ],
  },
  {
    title: "RESOURCES",
    items: [
      { name: "BLOG", href: "/blog" },
      { name: "CAREERS", href: "/careers" },
    ],
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-md"
    >
      {/* First Row - Logo and Phone with Full Width Emerald Background */}
      <div className="bg-emerald-500">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between py-2 lg:py-2.5">
            {/* Left: Logo - White Color */}
            <Link to="/" className="flex items-center space-x-1 z-10">
              <img 
                src="https://i.postimg.cc/76Fczxg0/unnamed-(27).png" 
                alt="MISU ENTERPRISES Logo" 
                className="w-12 h-12 lg:w-15 lg:h-15 object-contain brightness-0 invert"
              />
              {/* <span className="font-bold text-sm lg:text-sm text-white tracking-tight">
                MISU ENTERPRISES
              </span> */}
            </Link>

            {/* Right: Phone Number - White Style */}
            <a
              href="tel:9808123456"
              className="flex items-center space-x-1 lg:space-x-2 px-1.5 py-1 lg:px-3 lg:py-1.5 rounded-full bg-white text-emerald-600 hover:bg-gray-50 transition-colors z-10 shadow-sm"
            >
              <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                <Phone className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
              </div>
              <span className="text-[10px] lg:text-sm font-bold whitespace-nowrap">9808123456</span>
            </a>
          </div>
        </div>
      </div>

      {/* Second Row - Navigation Links with Full Width Dark Grey Background */}
      <div className="bg-gray-800 border-t border-gray-700">
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-10 lg:h-11">
            {/* Left: Desktop Navigation Links - Dark Grey Theme */}
            <div className="hidden lg:flex items-center space-x-1">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-1.5 rounded-sm text-sm font-semibold transition-all duration-200 ${
                    location.pathname === link.href
                      ? "text-white bg-emerald-500"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Dropdown Menu */}
              <div className="relative group">
                <button className="px-4 py-1.5 rounded-sm text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200 flex items-center gap-1.5">
                  MORE{" "}
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                  <div className="p-2">
                    {dropdownSections.map((section, sectionIdx) => (
                      <div
                        key={section.title}
                        className={
                          sectionIdx > 0
                            ? "mt-2 pt-2 border-t border-gray-100"
                            : ""
                        }
                      >
                        <div className="px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                          {section.title}
                        </div>
                        {section.items.map((link) => (
                          <Link
                            key={link.name}
                            to={link.href}
                            className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                              location.pathname === link.href
                                ? "text-emerald-600 bg-emerald-50"
                                : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                            }`}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: Menu Text */}
            <div className="lg:hidden">
              <span className="text-sm font-semibold text-gray-300">Menu</span>
            </div>

            {/* Right: Action Icons */}
            <div className="flex items-center space-x-1 lg:space-x-2">
              {/* Search Icon */}
              <button className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                <Search className="w-4 h-4 lg:w-5 lg:h-5 text-gray-300" />
              </button>

              {/* Sign In Icon */}
              <Link
                to="/auth"
                className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-700 transition-colors"
                title="Sign In"
              >
                <User className="w-4 h-4 lg:w-5 lg:h-5 text-gray-300" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-1.5 rounded-lg hover:bg-gray-700 transition-colors"
              >
                {isOpen ? (
                  <X className="w-5 h-5 text-gray-300" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-gray-800 border-t border-gray-700"
          >
            <div className="container mx-auto px-4 lg:px-8">
              <div className="py-4 space-y-1">
                {/* Main Links */}
                {mainNavLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                      location.pathname === link.href
                        ? "text-white bg-emerald-500"
                        : "text-gray-300 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Dropdown Sections */}
                {dropdownSections.map((section) => (
                  <div key={section.title} className="pt-2">
                    <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      {section.title}
                    </div>
                    {section.items.map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                          location.pathname === link.href
                            ? "text-white bg-emerald-500"
                            : "text-gray-300 hover:text-white hover:bg-gray-700"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                ))}

                {/* Mobile Sign In */}
                <div className="pt-4 border-t border-gray-700">
                  <Link
                    to="/auth"
                    className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-semibold">Sign In</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
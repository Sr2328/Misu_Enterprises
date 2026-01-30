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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -200 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 shadow-md"
    >
      {/* First Row - Logo and Phone */}
      <div className="bg-emerald-500">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between py-2 lg:py-2.5">
            {/* Logo - Compact Size */}
            <Link to="/" className="flex items-center z-10">
              <img 
                src="https://i.postimg.cc/W3JYR6NS/Untitled-design-(13)-(1).png" 
                alt="MISU ENTERPRISES Logo" 
                className="w-10 h-10 lg:w-12 lg:h-12 object-contain brightness-0 invert"
              />
            </Link>

            {/* Phone Number CTA */}
            <a
              href="tel:9540603737"
              className="flex items-center space-x-1.5 lg:space-x-2 px-2.5 py-1.5 lg:px-4 lg:py-2 rounded-full bg-white text-emerald-600 hover:bg-gray-50 transition-colors z-10 shadow-md hover:shadow-lg"
            >
              <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                <Phone className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
              </div>
              <span className="text-xs lg:text-sm font-bold whitespace-nowrap">9540603737</span>
            </a>
          </div>
        </div>
      </div>

      {/* Second Row - Navigation */}
      <div className="bg-gray-800 border-t border-gray-700">
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-10 lg:h-11">
            {/* Desktop Navigation */}
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

              {/* Dropdown */}
              <div className="relative group">
                <button className="px-4 py-1.5 rounded-sm text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200 flex items-center gap-1.5">
                  MORE
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                  <div className="p-2">
                    {dropdownSections.map((section, sectionIdx) => (
                      <div
                        key={section.title}
                        className={sectionIdx > 0 ? "mt-2 pt-2 border-t border-gray-100" : ""}
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

            {/* Right Icons */}
            <div className="flex items-center space-x-2 ml-auto">
              {/* Search */}
              <button className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                <Search className="w-4 h-4 lg:w-5 lg:h-5 text-gray-300" />
              </button>

              {/* Sign In - Desktop Only */}
              <Link
                to="/auth"
                className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-700 transition-colors"
                title="Sign In"
              >
                <User className="w-4 h-4 lg:w-5 lg:h-5 text-gray-300" />
              </Link>

              {/* Mobile Menu */}
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-gray-800 border-t border-gray-700"
          >
            <div className="container mx-auto px-4">
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
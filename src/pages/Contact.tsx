import { Layout } from "@/components/layout/Layout";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Clock, Plus, Minus } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";
import Contactus from "@/assets/Contactus.mp4";
import ContactImg from "@/assets/ContactImg.jpg";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  message: z.string().min(20, "Message must be at least 20 characters").max(1000),
});

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Office",
    details: ["BLOCK-A, 425", "SEC-86, GURUGRAM", "HARYANA 122004"],
    dark: true,
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+91 9540603737", "+91 7897697246"],
    dark: false,
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@misuenterprises.com", "careers@misuenterprises.com"],
    dark: false,
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Monday - Friday", "9:00 AM - 6:00 PM"],
    dark: true,
  },
];

const faqs = [
  {
    question: "What industries does MISU specialize in?",
    answer: "MISU Enterprises specializes in IT, healthcare, engineering, finance, and corporate sectors. We have extensive experience placing candidates across various industries and can tailor our services to your specific needs."
  },
  {
    question: "How long does the recruitment process take?",
    answer: "Our typical recruitment timeline is 2-4 weeks, depending on the role complexity and requirements. For urgent positions, we offer expedited services with placement in as little as 7-10 days."
  },
  {
    question: "What are your service charges?",
    answer: "Our pricing is competitive and transparent. We offer flexible payment models including percentage-based fees, flat rates, or retainer agreements. Contact us for a customized quote based on your hiring needs."
  },
  {
    question: "Do you provide replacement guarantees?",
    answer: "Yes, we offer a 90-day replacement guarantee. If a placed candidate leaves within this period, we'll find a suitable replacement at no additional cost to ensure your complete satisfaction."
  },
  {
    question: "Can you help with temporary or contract positions?",
    answer: "Absolutely! We provide staffing solutions for permanent, temporary, contract, and contract-to-hire positions. Our flexible approach ensures we meet your workforce needs regardless of the engagement type."
  },
  {
    question: "What makes MISU different from other recruitment agencies?",
    answer: "Our personalized approach, industry expertise, extensive candidate network, and commitment to quality set us apart. We focus on cultural fit, not just skills, ensuring long-term success for both clients and candidates."
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setScrollProgress(latest);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      contactSchema.parse(formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <Layout>
      <div ref={containerRef}>
        {/* Scroll Progress Indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 origin-left z-50"
          style={{ scaleX: scrollYProgress }}
        />

        {/* Hero Section with Video */}
        <section className="relative h-[70vh] lg:h-[80vh] overflow-hidden">
          {/* Video Background - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block absolute inset-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={Contactus} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/35" />
          </div>

          {/* Image Background - Shown on mobile */}
          <div className="lg:hidden absolute inset-0">
            <img
              src="https://i.postimg.cc/KcNLjKYf/pexels-yankrukov-8867375.jpg"
              alt="Office"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/35" />
          </div>

          {/* Content with Parallax */}
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
            className="relative z-10 h-full flex items-center"
          >
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                >
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6"
                  >
                    Contact Us
                  </motion.span>
                  
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                  >
                    Let's Start a{" "}
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
                    >
                      Conversation
                    </motion.span>
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="text-lg lg:text-xl text-gray-200 mb-8"
                  >
                    Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="flex flex-wrap gap-4"
                  >
                    <Button
                      variant="default"
                      size="lg"
                      className="bg-white text-black hover:bg-gray-100 transform hover:scale-105 transition-transform"
                      onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Get in Touch <Send className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white text-white hover:bg-white/10 transform hover:scale-105 transition-transform"
                      onClick={() => mapRef.current?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      View Location <MapPin className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
          {/* Animated Background Elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Form */}
              <motion.div
                ref={formRef}
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="bg-card rounded-3xl p-8 lg:p-10 shadow-2xl border border-border/50 backdrop-blur-sm">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h2 className="text-3xl font-bold mb-2">
                      Send us a <span className="text-accent">message</span>
                    </h2>
                    <p className="text-muted-foreground mb-8">We'll get back to you within 24 hours</p>
                  </motion.div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {[
                      { name: "name", label: "Your Name", placeholder: "John Doe", type: "text", delay: 0.3 },
                      { name: "email", label: "Email Address", placeholder: "john@example.com", type: "email", delay: 0.4 },
                      { name: "subject", label: "Subject", placeholder: "How can we help?", type: "text", delay: 0.5 },
                    ].map((field) => (
                      <motion.div
                        key={field.name}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: field.delay }}
                      >
                        <label className="text-sm font-medium mb-2 block">{field.label}</label>
                        <Input
                          name={field.name}
                          type={field.type}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className={`transition-all duration-300 ${
                            errors[field.name] ? "border-destructive" : ""
                          }`}
                        />
                        {errors[field.name] && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-destructive text-sm mt-1"
                          >
                            {errors[field.name]}
                          </motion.p>
                        )}
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <label className="text-sm font-medium mb-2 block">Message</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your inquiry..."
                        rows={5}
                        className={`transition-all duration-300 resize-none ${
                          errors.message ? "border-destructive" : ""
                        }`}
                      />
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-destructive text-sm mt-1"
                        >
                          {errors.message}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                    >
                      <Button 
                        type="submit" 
                        variant="hero" 
                        size="lg" 
                        className="w-full group"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="mr-2">Sending...</span>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                ref={infoRef}
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="space-y-6"
              >
                <div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-3xl font-bold mb-4"
                  >
                    <span className="text-accent">Contact </span> Information
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-muted-foreground mb-8 text-lg"
                  >
                    Reach out to us through any of the following channels. We're here to help!
                  </motion.p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 40, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                      whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
                      className={`rounded-2xl p-6 shadow-lg border transition-all duration-300 ${
                        info.dark
                          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white border-gray-700"
                          : "bg-card border-border/50 hover:shadow-xl"
                      }`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        transition={{ duration: 0.3 }}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                          info.dark
                            ? "bg-white/10 backdrop-blur-sm"
                            : "gradient-primary"
                        }`}
                      >
                        <info.icon className={`w-6 h-6 ${info.dark ? "text-white" : "text-primary-foreground"}`} />
                      </motion.div>
                      <h3 className={`font-semibold mb-3 text-lg ${info.dark ? "text-white" : ""}`}>
                        {info.title}
                      </h3>
                      {info.details.map((detail, i) => (
                        <p
                          key={i}
                          className={`text-sm mb-1 ${
                            info.dark ? "text-gray-300" : "text-muted-foreground"
                          }`}
                        >
                          {detail}
                        </p>
                      ))}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
       <section
  ref={faqRef}
  className="py-20 lg:py-28 bg-black relative overflow-hidden"
>
  <div className="container mx-auto px-4 lg:px-8 relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">

      {/* LEFT CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-lg"
      >
        <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
          Any questions? <br />
          <span className="text-emerald-400">We got you.</span>
        </h2>

        <p className="text-lg lg:text-xl text-white/80 mb-6">
          Everything you need to know about how we work, pricing, onboarding,
          and how we help you hire the right talent faster.
        </p>

        <p className="text-white/60 text-base">
          "Still unsure? Our dedicated team is always here to guide you with clarity and transparency — no surprises, no hidden steps.
           We’ll walk you through every detail, answer all your questions, 
           and ensure you feel confident every step of the way. Your success and peace of mind are our top priorities
        </p>
         <a
          href="/about#faqs"
          className="inline-flex items-center text-accent font-medium hover:underline mt-9"
        >
          More FAQs →
        </a>
      </motion.div>

      {/* RIGHT FAQ LIST */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="space-y-2"
      >
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-white/20 pb-5"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex items-center justify-between text-left pt-5"
            >
              <span className="text-lg lg:text-xl font-medium text-white pr-6">
                {faq.question}
              </span>

              <motion.span
                animate={{ rotate: openFaqIndex === index ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-emerald-400 text-2xl font-light"
              >
                +
              </motion.span>
            </button>

            <motion.div
              initial={false}
              animate={{
                height: openFaqIndex === index ? "auto" : 0,
                opacity: openFaqIndex === index ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="pt-4 text-white/70 text-base leading-relaxed max-w-xl">
                {faq.answer}
              </p>
            </motion.div>
          </div>
        ))}
      </motion.div>

    </div>
  </div>
</section>

        {/* Full Width Map Section */}
        <section ref={mapRef} className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Visit Our <span className="text-accent">Office</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Located in the heart of Gurgaon business district, we're easily accessible by public transport
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="max-w-[1400px] mx-auto"
            >
              <div className="bg-card rounded-3xl overflow-hidden shadow-2xl border border-border/50">
                <div className="relative w-full h-[500px] lg:h-[600px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.720553969599!2d76.93321617494816!3d28.397507094715625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d3db967fa3bab%3A0x21382c7228cf771d!2sDLF%20SKY%20COURT!5e0!3m2!1sen!2sin!4v1769673354518!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  
                  <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="absolute bottom-8 left-8 right-8 md:right-auto md:max-w-md bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-2xl backdrop-blur-sm border border-border/50"
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0"
                      >
                        <MapPin className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">MISU Enterprises</h3>
                        <p className="text-sm text-muted-foreground mb-1">BLOCK-A, 425</p>
                        <p className="text-sm text-muted-foreground mb-1">SEC-86, GURUGRAM</p>
                        <p className="text-sm text-muted-foreground mb-4">HARYANA 122004</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full hover:scale-105 transition-transform"
                          onClick={() => window.open('https://maps.google.com', '_blank')}
                        >
                          Get Directions
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative h-[500px] max-w-[1400px] mx-auto overflow-hidden rounded-xl mb-12">
          <div className="absolute inset-0">
            <img
              src="https://i.postimg.cc/NMr4ZRvX/Chat-GPT-Image-Jan-29-2026-01-38-42-PM.png"
              alt="Work together background"
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
          </div>

          <div className="relative z-10 h-full">
            <div className="container mx-auto px-4 lg:px-6 h-full flex items-center">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-xl text-left text-white"
              >
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
                >
                  Let's Build Your{" "}
                  <span className="text-primary">Workforce</span>{" "}
                  <span className="text-primary">Together</span>
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-sm md:text-lg text-white/90 mb-8 max-w-lg"
                >
                  Partner with a recruitment team that understands your business goals
                  and delivers high-performing talent, fast and reliably.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-wrap gap-4"
                >
                  <Button
                    size="lg"
                    className="bg-primary text-white hover:bg-primary/90 px-8 py-6 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
                    onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Start Hiring Today
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    View Our Services
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contact;
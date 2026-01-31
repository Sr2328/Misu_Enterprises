import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";

const testimonials = [
  {
    id: 1,
    name: "Maria Santos",
    role: "HR Director, TechCorp PH",
    image: testimonial1,
    content: "MISO Enterprises has been instrumental in helping us find top talent. Their understanding of our industry needs is exceptional.",
    rating: 5,
  },
  {
    id: 2,
    name: "David Chen",
    role: "CEO, StartUp Ventures",
    image: testimonial2,
    content: "The team's professionalism and dedication exceeded our expectations. They helped us build our entire management team within 3 months.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ana Rodriguez",
    role: "Operations Manager",
    image: testimonial3,
    content: "I found my dream job through MISO. The career coaching and support throughout the process was incredible.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-bl-[200px] -z-10" />
      
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            What Our <span className="text-gradient">Clients</span> Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from companies and candidates who have partnered with us.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="relative bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/50"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Quote className="w-5 h-5 text-primary" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Avatars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <div className="flex items-center gap-4 px-6 py-3 bg-card rounded-full shadow-soft border border-border/50">
            <div className="flex -space-x-3">
              {testimonials.map((t) => (
                <img
                  key={t.id}
                  src={t.image}
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-card object-cover"
                />
              ))}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Join 10,000+ satisfied clients</p>
              <p className="text-xs text-muted-foreground">Trusted by companies worldwide</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}





// Updated code of the testimonials section with animations and layout improvements



// import React, { useState } from "react";

// /* ─────────────────────────────────────────────
//    DATA
//    ───────────────────────────────────────────── */
// const testimonials = [
//   {
//     id: 1,
//     name: "Priya Sharma",
//     role: "HR Director",
//     company: "Reliance Industries",
//     avatar: "https://i.pravatar.cc/400?img=45",
//     badge: "Guaranteed",
//     stat: { value: "24–48 Hr", label: "Deployment" },
//     content: "24-48 Hour Deployment",
//     detail:
//       "Trained workforce deployed to your site within 24-48 hours of requirement confirmation.",
//     rating: 5,
//   },
//   {
//     id: 2,
//     name: "Rahul Mehta",
//     role: "Founder & CEO",
//     company: "Zenith StartUps",
//     avatar: "https://i.pravatar.cc/400?img=68",
//     badge: "24 Hours",
//     stat: { value: "24 Hr", label: "Replacement" },
//     content: "Quick Replacement",
//     detail:
//       "If any worker doesn't meet standards, we provide replacement within 24 hours at no extra cost.",
//     rating: 5,
//   },
//   {
//     id: 3,
//     name: "Ananya Patel",
//     role: "Operations Manager",
//     company: "Tata Consultancy",
//     avatar: "https://i.pravatar.cc/400?img=47",
//     badge: "Every Month",
//     stat: { value: "Monthly", label: "Reports" },
//     content: "Monthly Reports",
//     detail:
//       "Detailed monthly reports on attendance, performance, and compliance for full transparency.",
//     rating: 5,
//   },
// ];

// /* ─────────────────────────────────────────────
//    COMPONENT
//    ───────────────────────────────────────────── */
// export default function TestimonialsSection() {
//   const [active, setActive] = useState(1);
//   const [animating, setAnimating] = useState(false);

//   const handleSelect = (i: number) => {
//     if (i === active || animating) return;
//     setAnimating(true);
//     setTimeout(() => {
//       setActive(i);
//       setAnimating(false);
//     }, 280);
//   };

//   const t = testimonials[active];

//   return (
//     <section
//       style={{
       
//         background: "#f4f5f7",
//         width: "100%",
//         padding: "88px 24px",
//         position: "relative",
//         overflow: "hidden",
//         display: "flex",
//         justifyContent: "center",
//       }}
//     >
//       {/* Blob 1 */}
//       <div
//         style={{
//           position: "absolute",
//           borderRadius: "50%",
//           pointerEvents: "none",
//           top: "-160px",
//           right: "-200px",
//           width: "480px",
//           height: "480px",
//           background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 68%)",
//         }}
//       />

//       {/* Blob 2 */}
//       <div
//         style={{
//           position: "absolute",
//           borderRadius: "50%",
//           pointerEvents: "none",
//           bottom: "-120px",
//           left: "-170px",
//           width: "380px",
//           height: "380px",
//           background: "radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 68%)",
//         }}
//       />

//       <div
//         style={{
//           position: "relative",
//           zIndex: 1,
//           width: "100%",
//           maxWidth: "1152px",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         {/* ── Header ── */}
//         <div
//           style={{
//             textAlign: "center",
//             marginBottom: "52px",
//           }}
//         >
//           <div
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: "7px",
//               marginBottom: "18px",
//             }}
//           >
//             <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//               <path
//                 d="M7 0L8.5 5H14L9.8 8.2L11.3 13.5L7 10.3L2.7 13.5L4.2 8.2L0 5H5.5L7 0Z"
//                 fill="#10b981"
//               />
//             </svg>
//             <span
//               style={{
//                 fontSize: "11px",
//                 fontWeight: 600,
//                 textTransform: "uppercase",
//                 letterSpacing: "2.6px",
//                 color: "#10b981",
//               }}
//             >
//               What Clients Say
//             </span>
//           </div>

//           <h2
//             style={{
//               fontSize: "40px",
//               fontWeight: 700,
//               color: "#111827",
//               lineHeight: 1.2,
//               letterSpacing: "-0.6px",
//               marginBottom: "14px",
//             }}
//           >
//             Honest Feedback
//             <br />
//             From Valued People
//           </h2>

//           <p
//             style={{
//               fontSize: "14.5px",
//               color: "#6b7280",
//               lineHeight: 1.7,
//               maxWidth: "440px",
//               margin: "0 auto",
//             }}
//           >
//             Real feedback from businesses and individuals across India who
//             trusted MISO to elevate their teams. Their words reflect the impact
//             of our work.
//           </p>
//         </div>

//         {/* ── Avatars + Card ── */}
//         <div
//           style={{
//             width: "100%",
//             display: "flex",
//             gap: "36px",
//             alignItems: "stretch",
//           }}
//         >
//           {/* avatar column */}
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               gap: "12px",
//               justifyContent: "center",
//             }}
//           >
//             {testimonials.map((p, i) => (
//               <button
//                 key={p.id}
//                 style={{
//                   border: "none",
//                   background: "none",
//                   cursor: "pointer",
//                   padding: 0,
//                   display: "flex",
//                   outline: "none",
//                 }}
//                 onClick={() => handleSelect(i)}
//                 aria-label={`Testimonial from ${p.name}`}
//               >
//                 <div
//                   style={{
//                     position: "relative",
//                     width: "168px",
//                     height: "160px",
//                     borderRadius: "18px",
//                     overflow: "hidden",
//                     boxShadow:
//                       i === active
//                         ? "0 6px 28px rgba(16,185,129,0.3)"
//                         : "0 3px 10px rgba(0,0,0,0.1)",
//                     transition: "box-shadow 0.32s ease",
//                   }}
//                 >
//                   <img
//                     src={p.avatar}
//                     alt={p.name}
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                       display: "block",
//                       filter:
//                         i === active
//                           ? "none"
//                           : "grayscale(100%) brightness(0.75)",
//                       transition: "filter 0.4s ease",
//                     }}
//                   />
//                   <div
//                     style={{
//                       position: "absolute",
//                       inset: 0,
//                       borderRadius: "18px",
//                       border: "3px solid #10b981",
//                       pointerEvents: "none",
//                       opacity: i === active ? 1 : 0,
//                       transition: "opacity 0.32s ease",
//                     }}
//                   />
//                 </div>
//               </button>
//             ))}
//           </div>

//           {/* card */}
//           <div
//             style={{
//               flex: 1,
//               minWidth: 0,
//               background: "#fff",
//               borderRadius: "24px",
//               boxShadow: "0 8px 40px rgba(0,0,0,0.07), 0 2px 6px rgba(0,0,0,0.04)",
//               padding: "30px 40px 26px",
//               position: "relative",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//             }}
//           >
//             {/* watermark */}
//             <svg
//               style={{
//                 position: "absolute",
//                 top: "20px",
//                 right: "24px",
//                 opacity: 0.05,
//                 pointerEvents: "none",
//               }}
//               width="86"
//               height="68"
//               viewBox="0 0 86 68"
//               fill="none"
//             >
//               <path
//                 d="M0 68V41.3C0 18.4 11.8 4.3 37 0L39.8 10C25.5 13 17.8 22 16.6 35.2H37V68H0ZM48 68V41.3C48 18.4 59.8 4.3 85 0L87.8 10C73.5 13 65.8 22 64.6 35.2H85V68H48Z"
//                 fill="#111827"
//               />
//             </svg>

//             {/* content */}
//             <div
//               style={{
//                 transition: "opacity 0.28s ease, transform 0.28s ease",
//                 opacity: animating ? 0 : 1,
//                 transform: animating ? "translateY(6px)" : "translateY(0)",
//               }}
//             >
//               {/* badge */}
//               <div
//                 style={{
//                   display: "inline-flex",
//                   alignItems: "center",
//                   gap: "6px",
//                   background: "rgba(16,185,129,0.08)",
//                   border: "1px solid rgba(16,185,129,0.18)",
//                   borderRadius: "20px",
//                   padding: "5px 12px",
//                   marginBottom: "12px",
//                   width: "fit-content",
//                 }}
//               >
//                 <div
//                   style={{
//                     width: "7px",
//                     height: "7px",
//                     borderRadius: "50%",
//                     background: "#10b981",
//                   }}
//                 />
//                 <span
//                   style={{
//                     fontSize: "12px",
//                     fontWeight: 600,
//                     color: "#10b981",
//                     letterSpacing: "0.3px",
//                   }}
//                 >
//                   {t.badge}
//                 </span>
//               </div>

//               {/* headline quote */}
//               <p
//                 style={{
//                   fontSize: "18px",
//                   fontWeight: 600,
//                   color: "#111827",
//                   lineHeight: 1.42,
//                   letterSpacing: "-0.2px",
//                   paddingRight: "52px",
//                   marginBottom: "10px",
//                 }}
//               >
//                 {t.content}
//               </p>

//               {/* detail */}
//               <p
//                 style={{
//                   fontSize: "13px",
//                   color: "#6b7280",
//                   lineHeight: 1.7,
//                   marginBottom: "14px",
//                 }}
//               >
//                 {t.detail}
//               </p>

//               {/* stat strip */}
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "12px",
//                   background: "#f0fdf4",
//                   border: "1px solid rgba(16,185,129,0.15)",
//                   borderRadius: "10px",
//                   padding: "8px 14px",
//                   marginBottom: "16px",
//                   width: "fit-content",
//                 }}
//               >
//                 <div>
//                   <div
//                     style={{
//                       fontSize: "18px",
//                       fontWeight: 700,
//                       color: "#10b981",
//                       letterSpacing: "-0.3px",
//                     }}
//                   >
//                     {t.stat.value}
//                   </div>
//                   <div
//                     style={{
//                       fontSize: "11px",
//                       color: "#34d399",
//                       fontWeight: 500,
//                     }}
//                   >
//                     {t.stat.label}
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     width: "1px",
//                     height: "24px",
//                     background: "rgba(16,185,129,0.2)",
//                   }}
//                 />
//                 <div
//                   style={{
//                     fontSize: "11.5px",
//                     color: "#6b7280",
//                     lineHeight: 1.45,
//                     maxWidth: "180px",
//                   }}
//                 >
//                   Measurable result achieved after partnering with MISO
//                   Enterprises.
//                 </div>
//               </div>

//               {/* divider */}
//               <div
//                 style={{
//                   width: "100%",
//                   height: "1px",
//                   background: "#e5e7eb",
//                   marginBottom: "14px",
//                 }}
//               />

//               {/* author */}
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   flexWrap: "wrap",
//                   gap: "12px",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "12px",
//                   }}
//                 >
//                   <img
//                     style={{
//                       width: "34px",
//                       height: "34px",
//                       borderRadius: "50%",
//                       objectFit: "cover",
//                       border: "2px solid #e5e7eb",
//                     }}
//                     src={t.avatar}
//                     alt={t.name}
//                   />
//                   <div>
//                     <p
//                       style={{
//                         fontSize: "15px",
//                         fontWeight: 600,
//                         color: "#111827",
//                       }}
//                     >
//                       {t.name}
//                     </p>
//                     <p
//                       style={{
//                         fontSize: "12.5px",
//                         color: "#9ca3af",
//                         marginTop: "1px",
//                       }}
//                     >
//                       {t.role}
//                     </p>
//                     <p
//                       style={{
//                         fontSize: "11.5px",
//                         color: "#10b981",
//                         fontWeight: 500,
//                         marginTop: "2px",
//                       }}
//                     >
//                       {t.company}
//                     </p>
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     display: "flex",
//                     gap: "3px",
//                   }}
//                 >
//                   {[...Array(t.rating)].map((_, i) => (
//                     <svg
//                       key={i}
//                       width="19"
//                       height="19"
//                       viewBox="0 0 20 20"
//                       fill="none"
//                     >
//                       <path
//                         d="M10 1L12.5 7H19L13.8 11.2L15.8 18L10 14L4.2 18L6.2 11.2L1 7H7.5L10 1Z"
//                         fill="#ef4444"
//                       />
//                     </svg>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
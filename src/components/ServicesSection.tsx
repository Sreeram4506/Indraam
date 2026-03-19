import { motion } from "framer-motion";
import { TextReveal, WordStagger } from "@/components/PremiumTextReveal";

const services = [
  {
    title: "Strategy",
    description:
      "Sharp positioning, clearer roadmaps, and practical decisions that move brands from ideas into action.",
    items: ["Digital Transformation", "Market Research", "Product Strategy", "Growth Planning", "Brand Positioning"],
  },
  {
    title: "Design",
    description:
      "Distinct visual systems and digital experiences shaped to feel premium, intuitive, and memorable.",
    items: ["Brand Identity", "UI/UX Design", "Art Direction", "Web Design", "Print & Editorial"],
  },
  {
    title: "Dev",
    description:
      "Fast, scalable builds with the technical depth to support polished launches and long-term growth.",
    items: ["Frontend Development", "Backend & APIs", "CMS Integration", "E-commerce", "Performance Optimization"],
  },
  {
    title: "Digital",
    description:
      "Campaigns and content frameworks designed to increase visibility, engagement, and measurable results.",
    items: ["SEO Marketing", "Social Media", "Digital Advertising", "Content Strategy", "Analytics & Reporting"],
  },
];

export const ServicesSection = () => (
  <section id="services" className="relative overflow-hidden bg-[#080808] py-20 text-white md:py-32">
    {/* Pink ambient glow */}
    <motion.div
      className="absolute top-0 left-0 w-[500px] h-[500px] opacity-10 pointer-events-none"
      animate={{
        opacity: [0.07, 0.16, 0.09],
        scale: [1, 1.08, 0.97],
        x: [0, 20, -10],
        y: [0, -16, 10],
      }}
      transition={{
        duration: 15,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      }}
      style={{
        background: 'radial-gradient(circle at top left, #FF007F, transparent 60%)',
        filter: 'blur(80px)',
      }}
    />

    <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-12">
      {/* Header */}
      <div className="mb-14 flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-6 md:mb-24 md:flex-row md:items-end md:pb-8">
        <div>
          <WordStagger text="Expertise" className="section-label mb-4" />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md text-white/50 text-[14px] leading-relaxed"
          >
            We blend strategic thinking with top-tier execution to create digital experiences that perform and inspire.
          </motion.p>
        </div>
        <TextReveal
          text="What We Do"
          className="text-[10px] uppercase tracking-[0.2em] text-white/25 mb-1 md:mb-0"
          delay={0.12}
          duration={0.8}
        />
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {services.map(({ title, description, items }, colIdx) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: colIdx * 0.12, ease: [0.23, 1, 0.32, 1] }}
            className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.015] p-5 transition-colors duration-500 hover:border-white/20 hover:bg-white/[0.03] sm:p-6 md:rounded-[28px] md:p-8"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_48%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="mb-8 flex items-start justify-between border-b border-white/10 pb-5 md:mb-10 md:pb-6">
              <div style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
                <motion.h3
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: colIdx * 0.08, duration: 0.65 }}
                  className="font-bold tracking-tighter text-white transition-all duration-300 group-hover:font-serif-italic"
                >
                  {title}
                </motion.h3>
              </div>
              <span className="text-[10px] text-white/20 mt-2">{String(colIdx + 1).padStart(2, '0')}</span>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: colIdx * 0.08 + 0.18, duration: 0.55 }}
              className="mb-8 max-w-[28ch] text-[13px] leading-relaxed text-white/55"
            >
              {description}
            </motion.p>
            <ul className="space-y-3.5 md:space-y-4">
              {items.map((item, idx) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: colIdx * 0.1 + idx * 0.05 + 0.3, duration: 0.5 }}
                  className="group/item flex items-center gap-3 overflow-hidden text-[13px] text-white/45 transition-colors duration-300 hover:text-white/90"
                >
                  <span className="h-1 w-1 flex-shrink-0 rounded-full bg-white/20 transition-colors duration-300 group-hover/item:bg-[#FF007F]" />
                  <span className="leading-[1.4] text-white/70 transition-colors duration-300 group-hover/item:text-white">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

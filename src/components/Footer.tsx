import { motion } from "framer-motion";
import type { MouseEvent } from "react";
import { TextReveal, WordStagger } from "@/components/PremiumTextReveal";

const preventPlaceholderNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
};

export const Footer = () => (
  <footer id="contact" className="relative overflow-hidden border-t border-white/8 bg-[#080808] text-white">
    <div className="relative overflow-hidden border-b border-white/8 py-16 md:py-24">
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          opacity: [0.1, 0.18, 0.12],
          scale: [1, 1.05, 0.98],
        }}
        transition={{
          duration: 14,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        style={{
          background: "radial-gradient(ellipse at center, rgba(107,33,168,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 text-center md:px-12">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label inline-block"
        >
          <WordStagger text="New Business" />
        </motion.span>

        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
            className="font-bold leading-[0.9] tracking-tighter text-white"
            style={{ fontSize: "clamp(2.8rem, 8vw, 8rem)" }}
          >
            Got a <span className="font-serif italic font-normal text-white/60">vision?</span>
            <br />
            Let&apos;s make it <span className="font-serif italic font-normal text-white/60">happen!</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-12 flex flex-col items-center justify-center gap-5 md:mt-14 md:flex-row md:gap-6"
        >
          <a
            href="mailto:hello@indraam.com"
            className="group relative overflow-hidden text-[1.15rem] font-medium text-white/70 transition-colors duration-300 hover:text-white sm:text-[1.4rem] md:text-[2rem]"
          >
            <TextReveal text="hello@indraam.com" duration={0.9} />
            <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-white transition-all duration-500 group-hover:w-full" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a href="tel:+12036402437" className="btn-pill w-full justify-center sm:w-auto">
            Call Us
          </a>
          <a href="#contact" className="btn-pill w-full justify-center sm:w-auto">
            Meet Us
          </a>
        </motion.div>
      </div>
    </div>

    <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-12 md:py-20">
      <div className="mb-16 grid grid-cols-1 gap-12 md:mb-20 md:grid-cols-4 md:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-4 md:col-span-2"
        >
          <span className="text-[13px] font-bold uppercase tracking-tight text-white">
            Indraam
          </span>
          <p className="max-w-sm text-[12px] leading-[1.8] text-white/35">
            Building digital visions for a connected world.
            <br />
            US based company.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="flex flex-col gap-4"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Get in touch</span>
          <a href="mailto:hello@indraam.com" className="text-[12px] text-white/50 transition-colors hover:text-white">
            hello@indraam.com
          </a>
          <a href="tel:+12036402437" className="text-[12px] text-white/50 transition-colors hover:text-white">
            +1 (203) 640-2437
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="flex flex-col gap-4"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Socials</span>
          <a href="#" onClick={preventPlaceholderNavigation} className="text-[12px] text-white/50 transition-colors hover:text-white">
            Instagram
          </a>
          <a href="#" onClick={preventPlaceholderNavigation} className="text-[12px] text-white/50 transition-colors hover:text-white">
            LinkedIn
          </a>
          <a href="#" onClick={preventPlaceholderNavigation} className="text-[12px] text-white/50 transition-colors hover:text-white">
            Twitter
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.18 }}
        className="flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 md:flex-row"
      >
        <span className="text-[10px] uppercase tracking-[0.15em] text-white/25">(c) 2024 Indraam</span>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          <a
            href="#"
            onClick={preventPlaceholderNavigation}
            className="text-[10px] uppercase tracking-[0.15em] text-white/25 transition-colors hover:text-white/60"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            onClick={preventPlaceholderNavigation}
            className="text-[10px] uppercase tracking-[0.15em] text-white/25 transition-colors hover:text-white/60"
          >
            Terms of Service
          </a>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/25 transition-colors hover:text-white/60"
        >
          Back to Top
        </button>
      </motion.div>
    </div>
  </footer>
);

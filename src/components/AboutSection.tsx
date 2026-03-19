import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

const textLines = [
  { content: "We craft ambitious digital", hasAccent: false },
  { content: "experiences", hasAccent: true, suffix: " - from" },
  { content: "immersive websites", hasAccent: true, accentWord: "websites" },
  { content: "and branding systems to", hasAccent: false },
  { content: "performance-driven", hasAccent: false },
  { content: "advertising.", hasAccent: false },
];

const stats = [
  { num: "48+", label: "Projects Delivered" },
  { num: "6", label: "Years Experience" },
  { num: "30+", label: "Clients Worldwide" },
];

const PLAYGROUND_NODE_COUNT = 16;

export const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.95]);

  return (
    <motion.section 
      id="about" 
      className="relative overflow-x-clip bg-[#080808] text-white"
      style={{ opacity: sectionOpacity, scale: sectionScale }}
    >
      <motion.div
        className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] opacity-10"
        animate={{
          opacity: [0.08, 0.16, 0.1],
          scale: [1, 1.08, 0.98],
          x: [0, 18, -12],
          y: [0, -12, 8],
        }}
        transition={{
          duration: 16,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        style={{
          background: "radial-gradient(circle at top right, #6B21A8, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <div ref={sectionRef} className="relative min-h-fit md:min-h-[300vh]">
        <div className="flex min-h-fit items-start md:sticky md:top-0 md:min-h-screen md:items-center">
          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 py-20 md:px-12 md:py-28">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center lg:gap-14">
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="section-label"
                >
                  Studio
                </motion.span>

                <div className="mt-10 space-y-2 md:mt-16 md:space-y-2">
                  {textLines.map((line, index) => (
                    <ScrollLine
                      key={index}
                      scrollYProgress={scrollYProgress}
                      index={index}
                      totalLines={textLines.length}
                    >
                      {line.hasAccent && line.accentWord ? (
                        <>
                          <span className="font-bold">{line.content.replace(line.accentWord, "")}</span>
                          <span className="font-serif italic font-normal text-white/60">{line.accentWord}</span>
                        </>
                      ) : line.hasAccent ? (
                        <>
                          <span className="font-serif italic font-normal text-white/60">{line.content}</span>
                          {line.suffix && <span className="font-bold">{line.suffix}</span>}
                        </>
                      ) : (
                        <span className="font-bold">{line.content}</span>
                      )}
                    </ScrollLine>
                  ))}
                </div>
              </div>

              <motion.div className="pointer-events-auto lg:justify-self-end">
                <StudioPlayground scrollYProgress={scrollYProgress} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 pb-24 md:px-12 md:pb-48">
        <div className="grid grid-cols-1 gap-4 border-t border-white/10 pt-10 sm:grid-cols-3 sm:gap-8 sm:pt-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.12 * index }}
              className="flex flex-col gap-2 rounded-[24px] border border-white/8 bg-white/[0.015] p-5 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0"
            >
              <span className="text-[2rem] font-bold tracking-tight text-white md:text-[3rem]">{stat.num}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-14 pointer-events-auto"
        >
          <a href="#projects" className="btn-premium inline-flex w-full justify-center sm:w-auto">
            Explore Our Work
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

interface StudioPlaygroundProps {
  scrollYProgress: MotionValue<number>;
}

const StudioPlayground = ({ scrollYProgress }: StudioPlaygroundProps) => {
  const [activeNode, setActiveNode] = useState(5);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [message, setMessage] = useState("Tap the live node before it jumps.");

  const rawCardX = useTransform(scrollYProgress, [0.1, 0.4, 0.85], [160, 0, 0]);
  const rawCardY = useTransform(scrollYProgress, [0.1, 0.4, 0.85], [52, 0, 0]);
  const rawCardOpacity = useTransform(scrollYProgress, [0.08, 0.22, 0.36], [0, 0.55, 1]);
  const rawCardRotate = useTransform(scrollYProgress, [0.1, 0.4, 0.85], [7, 0, 0]);
  const rawCardScale = useTransform(scrollYProgress, [0.1, 0.4, 0.85], [0.9, 1, 1]);
  const rawHaloRotate = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const rawGridY = useTransform(scrollYProgress, [0.12, 0.8], [28, -16]);
  const rawCopyX = useTransform(scrollYProgress, [0.14, 0.36], [36, 0]);
  const rawStatsY = useTransform(scrollYProgress, [0.16, 0.5], [24, 0]);

  const cardX = useSpring(rawCardX, { stiffness: 90, damping: 22, mass: 0.7 });
  const cardY = useSpring(rawCardY, { stiffness: 70, damping: 20, mass: 0.85 });
  const cardOpacity = useSpring(rawCardOpacity, { stiffness: 120, damping: 24, mass: 0.6 });
  const cardRotate = useSpring(rawCardRotate, { stiffness: 80, damping: 18, mass: 0.7 });
  const cardScale = useSpring(rawCardScale, { stiffness: 100, damping: 24, mass: 0.6 });
  const haloRotate = useSpring(rawHaloRotate, { stiffness: 50, damping: 16, mass: 1.1 });
  const gridY = useSpring(rawGridY, { stiffness: 55, damping: 18, mass: 0.9 });
  const copyX = useSpring(rawCopyX, { stiffness: 85, damping: 18, mass: 0.75 });
  const statsY = useSpring(rawStatsY, { stiffness: 85, damping: 18, mass: 0.75 });

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveNode((current) => {
        let next = current;

        while (next === current) {
          next = Math.floor(Math.random() * PLAYGROUND_NODE_COUNT);
        }

        return next;
      });
    }, 1250);

    return () => window.clearInterval(interval);
  }, []);

  const jumpToNextNode = (currentIndex: number) => {
    let next = currentIndex;

    while (next === currentIndex) {
      next = Math.floor(Math.random() * PLAYGROUND_NODE_COUNT);
    }

    return next;
  };

  const handleNodeClick = (index: number) => {
    if (index === activeNode) {
      setScore((current) => current + 1);
      setStreak((current) => current + 1);
      setMessage("Nice catch. The studio is awake.");
      setActiveNode((current) => jumpToNextNode(current));
      return;
    }

    setStreak(0);
    setMessage("Missed it. Follow the glow and try again.");
  };

  return (
    <motion.div
      style={{ x: cardX, y: cardY, opacity: cardOpacity, rotate: cardRotate, scale: cardScale }}
      className="relative mx-auto w-full max-w-[420px] lg:mx-0"
    >
      <div className="pointer-events-none absolute -inset-6 rounded-[36px] bg-[radial-gradient(circle_at_top_right,rgba(255,0,127,0.16),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(42,200,255,0.14),transparent_40%)] blur-2xl" />

      <div className="relative overflow-hidden rounded-[30px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_28px_100px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-6">
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-80"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 28%, transparent 72%, rgba(255,255,255,0.06) 100%)",
            backgroundSize: "200% 200%",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_54%)]" />
        <div className="pointer-events-none absolute -right-10 top-0 h-36 w-36 rounded-full bg-[#ff007f]/20 blur-[72px]" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-36 w-36 rounded-full bg-[#2ac8ff]/20 blur-[72px]" />

        <motion.div
          style={{ rotate: haloRotate }}
          className="pointer-events-none absolute right-[-12%] top-[14%] hidden h-[220px] w-[220px] rounded-full border border-white/8 lg:block"
        >
          <div className="absolute inset-[16%] rounded-full border border-dashed border-white/10" />
          <div className="absolute left-1/2 top-0 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-white/70 shadow-[0_0_18px_rgba(255,255,255,0.4)]" />
          <div className="absolute bottom-[12%] left-[8%] h-2.5 w-2.5 rounded-full bg-[#2ac8ff]/80 shadow-[0_0_16px_rgba(42,200,255,0.42)]" />
        </motion.div>

        <div className="relative z-10">
          <motion.div
            style={{ x: copyX }}
            className="flex items-start justify-between gap-4 border-b border-white/10 pb-4"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.26em] text-white/35">Playground</span>
              <h3 className="mt-3 font-serif text-[clamp(1.8rem,5vw,2.8rem)] leading-[0.92] tracking-[-0.045em] text-white">
                Catch the pulse
              </h3>
            </div>
            <button
              type="button"
              onClick={() => {
                setScore(0);
                setStreak(0);
                setMessage("Reset. Ready for another round.");
                setActiveNode((current) => jumpToNextNode(current));
              }}
              className="rounded-full border border-white/12 bg-black/20 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white/45 transition-colors hover:border-white/25 hover:text-white"
            >
              Reset
            </button>
          </motion.div>

          <motion.p
            style={{ x: copyX }}
            className="mt-4 max-w-[30ch] text-[12px] leading-relaxed text-white/50"
          >
            A tiny studio toy for the empty corner. Hit the glowing node as it moves and keep the streak alive.
          </motion.p>

          <motion.div
            style={{ y: statsY }}
            className="mt-6 grid grid-cols-2 gap-3 text-[10px] uppercase tracking-[0.18em] text-white/35"
          >
            <div className="rounded-full border border-white/10 bg-black/20 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              Score <span className="ml-2 text-white">{String(score).padStart(2, "0")}</span>
            </div>
            <div className="rounded-full border border-white/10 bg-black/20 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              Streak <span className="ml-2 text-white">{String(streak).padStart(2, "0")}</span>
            </div>
          </motion.div>

          <motion.div style={{ y: gridY }} className="relative mt-7">
            <div className="pointer-events-none absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)]" />
            <div className="pointer-events-none absolute bottom-8 left-1/2 top-8 w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.12),transparent)]" />
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: PLAYGROUND_NODE_COUNT }, (_, index) => {
                const isActive = index === activeNode;

                return (
                  <motion.button
                    key={index}
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    whileHover={{ y: -2 }}
                    onClick={() => handleNodeClick(index)}
                    className="group relative aspect-square rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(0,0,0,0.34),rgba(255,255,255,0.03))] transition-colors hover:border-white/20"
                  >
                    <span className="pointer-events-none absolute inset-0 rounded-[22px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <motion.span
                      animate={{
                        scale: isActive ? [1, 1.3, 1] : [1, 0.98, 1],
                        opacity: isActive ? [0.6, 1, 0.6] : [0.24, 0.34, 0.24],
                      }}
                      transition={{
                        duration: isActive ? 0.95 : 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-[22%] rounded-full"
                      style={{
                        background: isActive
                          ? "radial-gradient(circle, rgba(255,255,255,0.98) 0%, rgba(255,0,127,0.78) 42%, rgba(42,200,255,0.38) 100%)"
                          : "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.03) 70%, transparent 100%)",
                        boxShadow: isActive
                          ? "0 0 30px rgba(255,0,127,0.4), 0 0 52px rgba(42,200,255,0.16)"
                          : "none",
                      }}
                    />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            style={{ y: statsY }}
            className="mt-6 rounded-[22px] border border-white/10 bg-black/20 px-4 py-3 text-[12px] leading-relaxed text-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
          >
            {message}
          </motion.div>

          <motion.div
            animate={{ x: [0, 18, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="mt-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/28"
          >
            <span className="h-px w-10 bg-white/15" />
            Scroll-reactive studio object
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

interface ScrollLineProps {
  scrollYProgress: MotionValue<number>;
  index: number;
  totalLines: number;
  children: ReactNode;
}

const ScrollLine = ({ scrollYProgress, index, totalLines, children }: ScrollLineProps) => {
  const totalRange = 0.5;
  const perLine = totalRange / totalLines;
  const lineStart = 0.08 + index * perLine;
  const lineEnd = lineStart + perLine * 0.85;

  const rawX = useTransform(scrollYProgress, [lineStart, lineEnd], [-640, 0]);
  const x = useSpring(rawX, { stiffness: 60, damping: 20, mass: 1 });
  const opacity = useTransform(scrollYProgress, [lineStart, lineStart + perLine * 0.3], [0, 1]);

  return (
    <div>
      <motion.div
        style={{ x, opacity }}
        className="max-w-[11ch] whitespace-normal text-[clamp(2rem,9vw,4.2rem)] leading-[1.08] tracking-tighter text-white md:max-w-none"
      >
        {children}
      </motion.div>
    </div>
  );
};

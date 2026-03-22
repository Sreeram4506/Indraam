import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import heroBuilding from "@/assets/hero-building.jpg";

const introEase: [number, number, number, number] = [0.16, 1, 0.3, 1]; // More organic weighted ease

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isScrolling, setIsScrolling] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textYRaw = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const textOpacityRaw = useTransform(scrollYProgress, [0, 0.45, 0.75], [1, 0.9, 0]);
  const backgroundScrollYRaw = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 120, mass: 0.55 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const textY = useSpring(textYRaw, { damping: 26, stiffness: 120, mass: 0.42 });
  const textOpacity = useSpring(textOpacityRaw, { damping: 28, stiffness: 180, mass: 0.3 });
  const backgroundScrollY = useSpring(backgroundScrollYRaw, { damping: 24, stiffness: 110, mass: 0.5 });

  // Live element cursor tracking
  const cursorX = useMotionValue(-1000);
  const cursorY = useMotionValue(-1000);
  const cursorSpringConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothCursorX = useSpring(cursorX, cursorSpringConfig);
  const smoothCursorY = useSpring(cursorY, cursorSpringConfig);

  const backgroundParallaxX = useTransform(smoothX, (v) => v * -0.4);
  const backgroundParallaxY = useTransform(smoothY, (v) => v * -0.4);
  const headlineParallaxX = useTransform(smoothX, (v) => v * 0.45);
  const headlineParallaxY = useTransform(smoothY, (v) => v * 0.45);
  const lensX = useTransform(smoothCursorX, (v) => v - 300);
  const lensY = useTransform(smoothCursorY, (v) => v - 300);

  const maskImage = useMotionTemplate`radial-gradient(350px circle at ${smoothCursorX}px ${smoothCursorY}px, black 20%, transparent 100%)`;
  const showInteractiveEffects = !prefersReducedMotion && !isScrolling;

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout> | undefined;

    const handleScroll = () => {
      setIsScrolling(true);

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 140);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion) {
      return;
    }

    const { clientX, clientY } = e;
    
    // Background parallax 
    const x = (clientX / window.innerWidth - 0.5) * 26;
    const y = (clientY / window.innerHeight - 0.5) * 26;
    mouseX.set(x);
    mouseY.set(y);

    // Live orb tracking
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      cursorX.set(clientX - rect.left);
      cursorY.set(clientY - rect.top);
    }
  };

  const handleMouseLeave = () => {
    // Reset background parallax completely
    mouseX.set(0);
    mouseY.set(0);
    // Snap distortion lens far off-screen
    cursorX.set(-2000);
    cursorY.set(-2000);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative isolate mb-16 min-h-[760px] w-full overflow-hidden bg-[#040404] md:mb-32 md:h-screen"
    >
      <svg className="hidden">
        <filter id="liquid-distortion">
          {/* Vertical slice glitch effect */}
          <feTurbulence type="turbulence" baseFrequency="0.04 0.002" numOctaves="1" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="150" xChannelSelector="R" yChannelSelector="B" />
        </filter>
      </svg>

      <motion.div
        className="absolute inset-0 transform-gpu [will-change:transform]"
        style={{ y: backgroundScrollY }}
      >
        <motion.div
          className="absolute inset-0 transform-gpu [will-change:transform]"
          style={{ x: backgroundParallaxX, y: backgroundParallaxY }}
        >
          {/* Base Image Layer */}
          <motion.div
            initial={{ scale: 1.18, x: -52, y: 30, filter: "blur(18px)" }}
            animate={{ scale: 1.03, x: 0, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 2.2, ease: introEase }}
            className="absolute inset-0 transform-gpu [will-change:transform,filter]"
          >
            <motion.img
              src={heroBuilding}
              alt=""
              aria-hidden="true"
              animate={{
                scale: [1, 1.045, 1.018],
                x: [0, -20, 10],
                y: [0, -12, 6],
              }}
              transition={{
                duration: 18,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              }}
              className="h-full w-full object-cover object-center opacity-[0.48] transform-gpu [will-change:transform]"
            />
          </motion.div>

          {/* Distorted Liquid Lens Layer */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 hidden transform-gpu md:block [will-change:opacity,transform]"
            animate={{ opacity: showInteractiveEffects ? 1 : 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              WebkitMaskImage: maskImage,
              maskImage: maskImage,
            }}
          >
            <motion.img
              src={heroBuilding}
              alt=""
              aria-hidden="true"
              animate={{
                scale: [1.12, 1.165, 1.138],
                x: [0, -20, 10],
                y: [0, -12, 6],
              }}
              transition={{
                duration: 18,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              }}
              className="h-full w-full object-cover object-center opacity-[0.6] saturate-[1.2] brightness-[0.6] hue-rotate-[10deg] transform-gpu [will-change:transform,filter]"
              style={{ filter: "url(#liquid-distortion) blur(4px)" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(3,17,24,0.86)_12%,rgba(4,17,25,0.48)_36%,rgba(18,0,13,0.42)_62%,rgba(10,2,8,0.92)_100%)] pointer-events-none z-20" />

      {/* Live Cursor Tracking Orb */}
      <motion.div
        className="pointer-events-none absolute top-0 left-0 hidden h-[600px] w-[600px] rounded-full opacity-20 blur-[100px] mix-blend-screen md:block transform-gpu [will-change:opacity,transform]"
        animate={{ opacity: showInteractiveEffects ? 0.2 : 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        style={{
          x: lensX,
          y: lensY,
          background: "radial-gradient(circle, rgba(255,0,127,0.25) 0%, rgba(42,200,255,0.05) 50%, transparent 70%)"
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.78 }}
        animate={{
          opacity: [0.22, 0.44, 0.32],
          scale: [1, 1.1, 0.96],
          x: [0, 34, -12],
          y: [0, 18, -6],
        }}
        transition={{
          opacity: { duration: 1.6, delay: 0.2, ease: introEase },
          scale: { duration: 16, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
          x: { duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
          y: { duration: 15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
        }}
        className="pointer-events-none absolute -left-[32%] top-[-12%] h-[40%] w-[78%] rounded-full bg-[#2ac8ff] blur-[110px] md:-left-[10%] md:top-[-18%] md:h-[56%] md:w-[54%] md:blur-[120px]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.78 }}
        animate={{
          opacity: [0.2, 0.48, 0.3],
          scale: [1, 1.06, 0.98],
          x: [0, -30, 18],
          y: [0, -16, 8],
        }}
        transition={{
          opacity: { duration: 1.8, delay: 0.28, ease: introEase },
          scale: { duration: 17, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
          x: { duration: 20, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
          y: { duration: 14, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
        }}
        className="pointer-events-none absolute right-[-36%] top-[2%] h-[44%] w-[82%] rounded-full bg-[#eb0f8c] blur-[120px] md:right-[-12%] md:top-[-10%] md:h-[58%] md:w-[58%] md:blur-[130px]"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.12)_36%,rgba(0,0,0,0.88)_96%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.34)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.24)_1px,transparent_1px)] [background-size:112px_112px] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[44%] bg-gradient-to-b from-transparent via-black/50 to-[#020202] pointer-events-none" />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8, ease: introEase }}
        className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Scroll</span>
          <div className="h-8 w-0.5 bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>
      </motion.div>

      <motion.div 
        className="pointer-events-none relative z-10 flex min-h-[760px] items-center justify-center px-5 pb-16 pt-28 md:h-full md:px-12 md:py-28 transform-gpu [will-change:transform,opacity]"
        style={{ y: textY, opacity: textOpacity }}
      >
        <motion.div 
          style={{ x: headlineParallaxX, y: headlineParallaxY }}
          className="w-full max-w-[1500px] transform-gpu [will-change:transform]"
        >
          <div className="mx-auto w-full px-5 text-center lg:max-w-none">
            <div className="overflow-visible py-[0.12em]">
              <motion.h1
                initial={{ y: "112%", opacity: 0, filter: "blur(12px)" }}
                animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2, delay: 0.66, ease: introEase }}
                className="font-serif text-[clamp(3.5rem,15vw,11.5rem)] leading-[0.98] tracking-[-0.05em] text-[#fffaf6] drop-shadow-[0_15px_45px_rgba(255,248,240,0.22)]"
              >
                The <span className="italic">creative</span> studio
              </motion.h1>
            </div>
            <div className="overflow-visible py-[0.12em]">
              <motion.div
                initial={{ y: "112%", opacity: 0, filter: "blur(12px)" }}
                animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2, delay: 0.82, ease: introEase }}
                className="font-serif text-[clamp(3.5rem,15vw,11.5rem)] leading-[0.98] tracking-[-0.05em] text-[#fffaf6] drop-shadow-[0_15px_45px_rgba(255,248,240,0.22)]"
              >
                you&apos;ve been eager to <span className="italic">meet.</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

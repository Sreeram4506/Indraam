import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const DISCOVER_TEXT = " DISCOVER * DISCOVER * DISCOVER * ";
const DEFAULT_PROJECT_CURSOR_SIZE = 100;
const LARGE_PROJECT_CURSOR_SIZE = 144;

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isProject, setIsProject] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [projectCursorSize, setProjectCursorSize] = useState(DEFAULT_PROJECT_CURSOR_SIZE);

  const mouseX = useSpring(0, { stiffness: 800, damping: 40 });
  const mouseY = useSpring(0, { stiffness: 800, damping: 40 });

  const cursorX = useSpring(0, { stiffness: 120, damping: 22 });
  const cursorY = useSpring(0, { stiffness: 120, damping: 22 });

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine) and (hover: hover)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateEnabled = () => {
      setIsEnabled(pointerQuery.matches && !motionQuery.matches);
    };

    updateEnabled();
    pointerQuery.addEventListener("change", updateEnabled);
    motionQuery.addEventListener("change", updateEnabled);

    return () => {
      pointerQuery.removeEventListener("change", updateEnabled);
      motionQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      setIsVisible(false);
      setIsHovering(false);
      setIsProject(false);
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const closestProject = target.closest('[data-cursor="discover"]');
      const closestLink =
        target.closest("a, button, [role='button']") ||
        target.style?.cursor === "pointer";

      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;

      if (isInput) {
        setIsVisible(false);
        setIsHovering(false);
        setIsProject(false);
      } else if (closestProject) {
        const sizePreference = closestProject.getAttribute("data-cursor-size");
        setIsProject(true);
        setIsHovering(false);
        setProjectCursorSize(sizePreference === "large" ? LARGE_PROJECT_CURSOR_SIZE : DEFAULT_PROJECT_CURSOR_SIZE);
      } else if (closestLink) {
        setIsHovering(true);
        setIsProject(false);
        setProjectCursorSize(DEFAULT_PROJECT_CURSOR_SIZE);
      } else {
        setIsHovering(false);
        setIsProject(false);
        setProjectCursorSize(DEFAULT_PROJECT_CURSOR_SIZE);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovering(false);
      setIsProject(false);
      setProjectCursorSize(DEFAULT_PROJECT_CURSOR_SIZE);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isEnabled, mouseX, mouseY]);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="h-2 w-2 rounded-full bg-white mix-blend-difference"
          animate={{ scale: isHovering || isProject ? 0 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border border-white/40 mix-blend-difference"
          animate={{
            width: isProject ? projectCursorSize : isHovering ? 56 : 36,
            height: isProject ? projectCursorSize : isHovering ? 56 : 36,
            opacity: isVisible ? 1 : 0,
            backgroundColor: isHovering ? "rgba(255,255,255,0.08)" : "transparent",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
        />
      </motion.div>

      {isProject && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-[9997]"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative flex items-center justify-center overflow-hidden rounded-full border border-[#c9ff9d]/35 animate-spin-slow"
            animate={{
              width: projectCursorSize,
              height: projectCursorSize,
            }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            style={{
              background:
                "radial-gradient(circle at center, rgba(201,255,157,0.12) 0%, rgba(120,255,90,0.08) 18%, rgba(89,255,126,0.03) 36%, rgba(6,20,8,0.08) 54%, rgba(0,0,0,0) 72%)",
              boxShadow: "0 0 0 1px rgba(201,255,157,0.08) inset, 0 0 22px rgba(120,255,90,0.16)",
              backdropFilter: "blur(3px)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-[12%] rounded-full border border-[#d9ffbd]/20"
              style={{ boxShadow: "0 0 14px rgba(120,255,90,0.1)" }}
            />
            <div
              className="pointer-events-none absolute inset-[24%] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(201,255,157,0.14) 0%, rgba(201,255,157,0.06) 30%, rgba(201,255,157,0) 72%)",
              }}
            />
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              <defs>
                <path id="circle-path" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
              </defs>
              <text
                className="text-[8px]"
                fill="#e6ffc8"
                style={{
                  fontSize: "8px",
                  letterSpacing: "3px",
                  fontFamily: "Inter",
                  fontWeight: 600,
                  opacity: 0.85,
                }}
              >
                <textPath href="#circle-path">{DISCOVER_TEXT}</textPath>
              </text>
            </svg>
            <div
              className="h-3 w-3 rounded-full border border-[#ecffd7]/45"
              style={{
                background: "rgba(222,255,190,0.18)",
                boxShadow: "0 0 10px rgba(120,255,90,0.3)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageLoader = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let hideTimeout: ReturnType<typeof setTimeout> | undefined;
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          hideTimeout = setTimeout(() => setIsVisible(false), 600);
          return 100;
        }
        return prev + 1;
      });
    }, 18);

    return () => {
      clearInterval(interval);
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[10000] flex flex-col justify-between bg-[#080808] p-6 md:p-16"
        >
          {/* Top bar */}
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:gap-6">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.1 }}
              className="text-[10px] uppercase tracking-[0.25em] text-white font-medium"
            >
              Indraam
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.2 }}
              className="text-[10px] uppercase tracking-[0.25em] text-white font-medium"
            >
              Digital Craftsmanship
            </motion.span>
          </div>

          {/* Center gradient orb */}
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="w-48 h-48 md:w-64 md:h-64 rounded-full opacity-30"
              style={{
                background: 'radial-gradient(circle, #FF007F 0%, #6B21A8 50%, transparent 70%)',
                filter: 'blur(24px)',
              }}
            />
          </div>

          {/* Bottom counter */}
          <div className="flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/40">Loading</span>
              <div className="relative h-[1px] w-full max-w-[18rem] overflow-hidden bg-white/10 md:w-72">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-white"
                  style={{ width: `${count}%` }}
                />
              </div>
            </div>
            <div className="overflow-hidden">
              <motion.span
                className="text-[clamp(3.5rem,12vw,10rem)] font-bold leading-none inline-block text-white"
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ letterSpacing: '-0.04em' }}
              >
                {count}%
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;

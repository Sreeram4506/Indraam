import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.05, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-4 pt-5 md:px-0 md:pt-14"
    >
      <Link
        to="/"
        className="rounded-full border border-white/10 bg-black/35 px-5 py-3 text-[18px] font-bold uppercase tracking-[0.22em] text-white shadow-[0_10px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl select-none md:border-transparent md:bg-transparent md:px-0 md:py-0 md:text-[28px] md:tracking-[0.25em] md:shadow-none"
      >
        Ind<span className="font-serif italic lowercase font-normal text-white/55">Raam</span>
      </Link>
    </motion.div>
  );
};

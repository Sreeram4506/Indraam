import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

interface WordStaggerProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export const TextReveal = ({
  text,
  className,
  delay = 0,
  duration = 1,
  once = true,
}: TextRevealProps) => (
  <span className={`block overflow-hidden ${className ?? ""}`}>
    <motion.span
      initial={{ y: "110%", opacity: 0.4 }}
      whileInView={{ y: "0%", opacity: 1 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.23, 1, 0.32, 1] }}
      className="block"
    >
      {text}
    </motion.span>
  </span>
);

export const WordStagger = ({
  text,
  className,
  delay = 0,
  stagger = 0.045,
  once = true,
}: WordStaggerProps) => {
  const words = text.split(" ");

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      className={className}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden pr-[0.25em]">
          <motion.span
            variants={{
              hidden: { y: "115%", opacity: 0 },
              visible: { y: "0%", opacity: 1 },
            }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

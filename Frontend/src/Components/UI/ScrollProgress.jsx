import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      id="scroll-progress"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[9998] origin-left
                 bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500"
    />
  );
};

export default ScrollProgress;

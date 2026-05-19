import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AppLoader = ({ onComplete }) => {
  const [phase, setPhase] = useState("show"); // show | fadeout

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fadeout"), 2400);
    const t2 = setTimeout(() => onComplete?.(), 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === "show" && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0F172A] overflow-hidden"
        >
          {/* Background glow orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

          {/* Main Content */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex flex-col items-center gap-8 z-10"
          >
            {/* Book flip animation */}
            <div className="relative w-24 h-32">
              {/* Book spine */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 rounded-l-md shadow-glow" />
              {/* Animated pages */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute top-1 right-0 w-20 h-[120px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-r-md origin-left"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ rotateY: [-10, -170, -10] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}
              {/* Book cover lines */}
              <div className="absolute inset-0 flex flex-col justify-center gap-1.5 pl-2 pr-8">
                {[1, 0.7, 0.5].map((w, i) => (
                  <div key={i} className="h-0.5 bg-white/40 rounded" style={{ width: `${w * 100}%` }} />
                ))}
              </div>
            </div>

            {/* Logo text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl font-extrabold tracking-tight">
                <span className="text-brand-text">Book</span>
                <span className="text-accent-500">Bazaar</span>
              </h1>
              <p className="text-brand-muted text-sm mt-1 tracking-widest uppercase">
                Your Reading Universe
              </p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-48 h-0.5 bg-surface-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.2, ease: "easeOut" }}
                />
              </div>
              <LoadingDots />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const LoadingDots = () => (
  <div className="flex items-center gap-1.5">
    <span className="text-brand-muted text-xs tracking-widest">Loading</span>
    {[0, 0.2, 0.4].map((delay, i) => (
      <motion.span
        key={i}
        className="w-1 h-1 bg-primary-400 rounded-full"
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1, repeat: Infinity, delay }}
      />
    ))}
  </div>
);

export default AppLoader;

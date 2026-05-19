import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiBookOpen } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const Hero = () => {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-surface-bg">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-secondary-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay:"1.5s"}} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-500/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{backgroundImage:"linear-gradient(rgba(124,58,237,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.5) 1px,transparent 1px)",backgroundSize:"60px 60px"}} />
      </div>

      <div className="container-max section-padding relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start"
          >
            <motion.span variants={item}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary-600/30 text-primary-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
              10,000+ Books Available
            </motion.span>

            <motion.h1 variants={item}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight text-brand-text mb-6">
              Discover Your<br />
              <span className="gradient-text">Next Great</span><br />
              Read
            </motion.h1>

            <motion.p variants={item}
              className="text-brand-muted text-lg leading-relaxed max-w-lg mb-8">
              Unlock a universe of stories, wisdom, and imagination. From timeless classics to
              modern bestsellers — all in one beautifully curated place.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <Link to="/all-books"
                className="btn-primary flex items-center gap-2 text-base">
                <FiBookOpen />
                Explore Books
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/wishlist"
                className="btn-outline flex items-center gap-2 text-base">
                <FaHeart className="text-red-400" />
                My Wishlist
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={item} className="flex gap-8 mt-12">
              {[
                { val: "10K+", label: "Books" },
                { val: "50K+", label: "Readers" },
                { val: "4.8★", label: "Rating" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-black text-brand-text">{s.val}</p>
                  <p className="text-brand-muted text-xs uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Floating books visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="hidden lg:flex items-center justify-center relative"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* Main book image */}
              <div className="w-80 h-96 rounded-3xl overflow-hidden shadow-card-hover border border-surface-border relative">
                <img
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80"
                  alt="Books"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-bg/80 via-transparent to-transparent" />
              </div>

              {/* Floating badge 1 */}
              <motion.div
                animate={{ x: [0, 6, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-10 glass border border-primary-600/30 rounded-2xl p-3 shadow-glow-sm"
              >
                <p className="text-xs text-brand-muted">Today's Pick</p>
                <p className="text-sm font-bold text-brand-text">Atomic Habits</p>
                <p className="text-accent-500 text-xs font-bold">₹299</p>
              </motion.div>

              {/* Floating badge 2 */}
              <motion.div
                animate={{ x: [0, -6, 0], rotate: [2, -2, 2] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute -bottom-6 -left-10 glass border border-secondary-500/30 rounded-2xl p-3 shadow-glow-cyan"
              >
                <p className="text-xs text-brand-muted">New Arrival</p>
                <p className="text-sm font-bold text-secondary-400">Free Delivery</p>
                <p className="text-xs text-brand-muted">on orders ₹500+</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-brand-subtle"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-primary-600 to-transparent rounded-full" />
      </motion.div>
    </section>
  );
};

export default Hero;

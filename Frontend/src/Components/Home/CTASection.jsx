import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const CTASection = () => (
  <section className="section-padding bg-surface-bg relative overflow-hidden">
    {/* Glow blobs */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-[700px] h-[400px] bg-gradient-to-r from-primary-600/20 to-secondary-500/15 rounded-full blur-3xl" />
    </div>

    <div className="container-max relative z-10 text-center max-w-3xl mx-auto">
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-6xl block mb-6"
      >
        📚
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-black text-brand-text leading-tight mb-6"
      >
        Start Your{" "}
        <span className="gradient-text">Reading Journey</span>{" "}
        Today
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-brand-muted text-lg leading-relaxed mb-10"
      >
        Join 50,000+ readers who've already discovered their next favourite books on BookBazaar.
        Sign up free and get 10% off your first order.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link to="/signup"
          className="btn-primary text-base px-8 py-3.5 flex items-center gap-2 justify-center">
          Get Started Free <FiArrowRight />
        </Link>
        <Link to="/all-books"
          className="btn-outline text-base px-8 py-3.5 flex items-center gap-2 justify-center">
          Browse Collection
        </Link>
      </motion.div>

      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap justify-center gap-6 mt-10 text-brand-muted text-sm"
      >
        {["✓ Free Shipping on ₹500+", "✓ 7-Day Returns", "✓ Secure Payment", "✓ 10K+ Books"].map((t) => (
          <span key={t} className="text-brand-subtle">{t}</span>
        ))}
      </motion.div>
    </div>
  </section>
);

export default CTASection;

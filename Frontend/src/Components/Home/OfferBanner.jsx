import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiTag } from "react-icons/fi";

const OfferBanner = () => (
  <section className="relative overflow-hidden bg-gradient-to-r from-primary-700 via-primary-600 to-secondary-600 py-12 px-6">
    {/* Decorative orbs */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />
    {/* Dotted pattern */}
    <div className="absolute inset-0 opacity-10"
      style={{backgroundImage:"radial-gradient(white 1px,transparent 1px)",backgroundSize:"30px 30px"}} />

    <div className="container-max relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex items-center gap-5">
        <motion.div
          animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl"
        >
          🎉
        </motion.div>
        <div>
          <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-1">
            Limited Time Offer
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            Up to <span className="text-accent-400">30% OFF</span>
          </h2>
          <p className="text-white/80 mt-1">
            On all orders above ₹500 · Free shipping included!
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 shrink-0">
        <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white">
          <FiTag />
          <span className="text-sm font-semibold tracking-wide">Use: BOOK30</span>
        </div>
        <Link to="/all-books"
          className="flex items-center gap-2 bg-white text-primary-700 font-bold px-5 py-2.5 rounded-xl hover:bg-accent-400 hover:text-black transition-all">
          Shop Now <FiArrowRight />
        </Link>
      </div>
    </div>
  </section>
);

export default OfferBanner;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiArrowRight } from "react-icons/fi";
import { toast } from "react-toastify";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      toast.success("🎉 You're subscribed! Watch your inbox for bookish goodness.");
      setEmail("");
      setLoading(false);
    }, 800);
  };

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-r from-primary-900/40 via-surface-card to-secondary-900/30 border-y border-surface-border">
      {/* Bg decoration */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-primary-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container-max relative z-10 text-center max-w-2xl mx-auto">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="text-5xl mb-4"
        >
          📬
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-brand-text mb-3"
        >
          Stay in the <span className="gradient-text">Reading Loop</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-brand-muted mb-8"
        >
          Subscribe for curated book picks, exclusive discounts, author interviews and more.
          No spam, only great reads.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <div className="relative flex-1">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="input-dark pl-11 w-full"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-60"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <>Subscribe <FiArrowRight /></>
            )}
          </button>
        </motion.form>
        <p className="text-brand-subtle text-xs mt-3">Join 50,000+ readers. Unsubscribe anytime.</p>
      </div>
    </section>
  );
};

export default Newsletter;

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * Reusable EmptyState
 * Props: title, subtitle, icon, ctaText, ctaLink, onCta
 */
const EmptyState = ({
  title = "Nothing here yet",
  subtitle = "",
  icon = "📚",
  ctaText = "Browse Books",
  ctaLink = "/all-books",
  onCta = null,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-20 px-6 text-center"
  >
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      className="text-7xl mb-6"
    >
      {icon}
    </motion.div>
    <h3 className="text-2xl font-bold text-brand-text mb-3">{title}</h3>
    {subtitle && <p className="text-brand-muted max-w-md mb-8">{subtitle}</p>}
    {onCta ? (
      <button onClick={onCta} className="btn-primary">
        {ctaText}
      </button>
    ) : (
      <Link to={ctaLink} className="btn-primary">
        {ctaText}
      </Link>
    )}
  </motion.div>
);

export default EmptyState;

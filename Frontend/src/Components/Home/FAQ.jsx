import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqs = [
  {
    q: "How do I purchase a book?",
    a: "Browse our collection, click on any book to view its details, then click 'Add to Cart'. Once you've selected all your books, go to your cart and click 'Place Order'.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept all major credit/debit cards, UPI, net banking, and popular wallets. All transactions are secured with SSL encryption.",
  },
  {
    q: "How long does delivery take?",
    a: "Standard delivery takes 3–5 business days. Express delivery (1–2 days) is available for most pin codes at a small additional charge.",
  },
  {
    q: "Can I return a book?",
    a: "Yes! We offer a 7-day return policy. If you receive a damaged or incorrect book, contact our support team and we'll arrange a replacement or full refund.",
  },
  {
    q: "How do I add books to my wishlist?",
    a: "Click the heart icon ❤️ on any book card or book details page. Your wishlist is saved to your account and accessible anytime from the Wishlist menu.",
  },
  {
    q: "Is my personal data safe?",
    a: "Absolutely. We never share your personal information with third parties. Your data is encrypted and stored securely in compliance with data protection standards.",
  },
];

const FAQItem = ({ q, a, isOpen, onClick }) => (
  <div
    className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "border-primary-600/50 shadow-glow-sm" : "border-surface-border"}`}
  >
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-surface-card hover:bg-surface-hover transition-colors"
    >
      <span className={`font-medium text-sm md:text-base ${isOpen ? "text-primary-400" : "text-brand-text"}`}>
        {q}
      </span>
      <span className={`shrink-0 text-lg transition-colors ${isOpen ? "text-primary-400" : "text-brand-muted"}`}>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </span>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <p className="px-6 pb-5 text-brand-muted text-sm leading-relaxed border-t border-surface-border pt-4">
            {a}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQ = () => {
  const [open, setOpen] = useState(0);

  return (
    <section className="section-padding bg-surface-card">
      <div className="container-max max-w-3xl">
        <div className="text-center mb-12">
          <motion.p initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-2">
            Got Questions?
          </motion.p>
          <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}}
            className="section-title">
            Frequently Asked <span className="gradient-text">Questions</span>
          </motion.h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <FAQItem
                q={item.q}
                a={item.a}
                isOpen={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

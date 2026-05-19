import React from "react";
import { motion } from "framer-motion";

const benefits = [
  { icon: "🧠", title: "Expand Knowledge",  desc: "Books expose you to new ideas, cultures, and perspectives that expand your worldview beyond your immediate experience.", color: "text-purple-400" },
  { icon: "😌", title: "Reduce Stress",     desc: "Just 6 minutes of reading can reduce stress levels by 68%. Books are the ultimate mindfulness tool.", color: "text-cyan-400" },
  { icon: "🎯", title: "Improve Focus",     desc: "Regular reading trains your brain to concentrate for longer periods, boosting overall productivity.", color: "text-amber-400" },
  { icon: "💡", title: "Boost Creativity",  desc: "Stories spark imagination. Readers consistently show higher levels of creativity and innovative thinking.", color: "text-green-400" },
];

const ReadingBenefits = () => (
  <section className="section-padding bg-surface-bg">
    <div className="container-max">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Why Read?
          </p>
          <h2 className="section-title mb-6">
            The Power of <span className="gradient-text">Reading</span>
          </h2>
          <p className="text-brand-muted leading-relaxed mb-8 max-w-lg">
            Reading is one of the most powerful habits you can cultivate. Science-backed benefits
            show that regular readers live longer, smarter, and more fulfilling lives.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <img key={i} src={`https://i.pravatar.cc/40?img=${i+10}`}
                  className="w-9 h-9 rounded-full border-2 border-surface-bg" alt="" />
              ))}
            </div>
            <p className="text-brand-muted text-sm">
              <span className="text-brand-text font-bold">50,000+</span> happy readers
            </p>
          </div>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="card-dark p-5"
            >
              <motion.span
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="text-3xl block mb-3"
              >
                {b.icon}
              </motion.span>
              <h3 className={`font-semibold text-base mb-2 ${b.color}`}>{b.title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ReadingBenefits;

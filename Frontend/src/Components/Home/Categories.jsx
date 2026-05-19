import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  { name: "Fiction",       icon: "📖", color: "from-purple-600/30 to-purple-900/20", border: "border-purple-600/30", text: "text-purple-400" },
  { name: "Non-Fiction",   icon: "🎯", color: "from-blue-600/30 to-blue-900/20",   border: "border-blue-600/30",   text: "text-blue-400" },
  { name: "Science",       icon: "🔬", color: "from-cyan-600/30 to-cyan-900/20",   border: "border-cyan-600/30",   text: "text-cyan-400" },
  { name: "History",       icon: "🏛️", color: "from-amber-600/30 to-amber-900/20", border: "border-amber-600/30", text: "text-amber-400" },
  { name: "Self-Help",     icon: "🌱", color: "from-green-600/30 to-green-900/20", border: "border-green-600/30", text: "text-green-400" },
  { name: "Children",      icon: "🌟", color: "from-pink-600/30 to-pink-900/20",   border: "border-pink-600/30",   text: "text-pink-400" },
  { name: "Biography",     icon: "👤", color: "from-indigo-600/30 to-indigo-900/20", border: "border-indigo-600/30", text: "text-indigo-400" },
  { name: "Romance",       icon: "❤️", color: "from-red-600/30 to-red-900/20",     border: "border-red-600/30",    text: "text-red-400" },
];

const Categories = () => (
  <section className="section-padding bg-surface-bg">
    <div className="container-max">
      <div className="text-center mb-12">
        <motion.p initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          className="text-secondary-400 text-sm font-semibold uppercase tracking-widest mb-2">
          Browse By Genre
        </motion.p>
        <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}}
          className="section-title">
          Explore <span className="gradient-text">Categories</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <Link to="/all-books"
              className={`flex flex-col items-center gap-3 p-6 rounded-2xl
                bg-gradient-to-br ${cat.color} border ${cat.border}
                transition-all duration-300 hover:shadow-glow-sm group`}
            >
              <motion.span
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                transition={{ duration: 0.4 }}
                className="text-4xl"
              >
                {cat.icon}
              </motion.span>
              <span className={`font-semibold text-sm ${cat.text} group-hover:text-brand-text transition-colors`}>
                {cat.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Categories;

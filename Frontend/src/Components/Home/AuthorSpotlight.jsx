import React from "react";
import { motion } from "framer-motion";

const AuthorSpotlight = () => (
  <section className="section-padding bg-surface-card">
    <div className="container-max">
      <div className="text-center mb-12">
        <motion.p initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          className="text-accent-500 text-sm font-semibold uppercase tracking-widest mb-2">
          Author Spotlight
        </motion.p>
        <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}}
          className="section-title">
          Meet the <span className="gradient-text">Authors</span>
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            name: "James Clear",
            genre: "Self-Help & Productivity",
            books: "Atomic Habits, Tiny Changes",
            avatar: "https://i.pravatar.cc/120?img=60",
            color: "from-purple-600/20 to-purple-900/10",
          },
          {
            name: "Yuval Noah Harari",
            genre: "History & Philosophy",
            books: "Sapiens, Homo Deus, 21 Lessons",
            avatar: "https://i.pravatar.cc/120?img=56",
            color: "from-cyan-600/20 to-cyan-900/10",
          },
          {
            name: "Ruskin Bond",
            genre: "Fiction & Literature",
            books: "The Blue Umbrella, Room on the Roof",
            avatar: "https://i.pravatar.cc/120?img=55",
            color: "from-amber-600/20 to-amber-900/10",
          },
        ].map((author, i) => (
          <motion.div
            key={author.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            whileHover={{ y: -6 }}
            className={`rounded-2xl bg-gradient-to-br ${author.color} border border-surface-border p-6 flex flex-col items-center text-center gap-4 transition-all`}
          >
            <div className="relative">
              <img src={author.avatar} alt={author.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-primary-600/50 shadow-glow-sm" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center text-xs">
                ✍️
              </div>
            </div>
            <div>
              <h3 className="text-brand-text font-bold text-lg">{author.name}</h3>
              <p className="text-primary-400 text-xs font-medium uppercase tracking-wide mt-0.5">{author.genre}</p>
              <p className="text-brand-muted text-sm mt-3 leading-relaxed italic">"{author.books}"</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AuthorSpotlight;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Avid Reader",
    avatar: "https://i.pravatar.cc/80?img=1",
    rating: 5,
    text: "BookBazaar completely changed how I shop for books. The collection is massive, delivery is fast, and the UI is just beautiful. I've ordered 20+ books here!",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    role: "Book Blogger",
    avatar: "https://i.pravatar.cc/80?img=3",
    rating: 5,
    text: "As someone who reads 3-4 books every month, BookBazaar is my go-to platform. The price filters and categories make finding new reads incredibly easy.",
  },
  {
    id: 3,
    name: "Ananya Joshi",
    role: "Student",
    avatar: "https://i.pravatar.cc/80?img=5",
    rating: 4,
    text: "I love the wishlist feature — I can save all the books I want and slowly buy them. The reading recommendations are always spot on!",
  },
  {
    id: 4,
    name: "Vikram Nair",
    role: "Professor",
    avatar: "https://i.pravatar.cc/80?img=8",
    rating: 5,
    text: "Excellent platform for academics. I can filter by language, price, and category. The checkout is smooth and books arrive well-packaged.",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <section className="section-padding bg-surface-bg relative overflow-hidden">
      {/* Bg glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="text-center mb-12">
          <motion.p initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            className="text-secondary-400 text-sm font-semibold uppercase tracking-widest mb-2">
            What Readers Say
          </motion.p>
          <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}}
            className="section-title">
            Loved by <span className="gradient-text">Readers</span>
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="glass border border-surface-border rounded-3xl p-8 md:p-12 text-center relative"
            >
              <FaQuoteLeft className="text-primary-600/30 text-5xl absolute top-6 left-8" />

              <div className="flex justify-center mb-2">
                {[1,2,3,4,5].map(s => (
                  <FaStar key={s} className={`text-sm ${s <= t.rating ? "text-accent-500" : "text-surface-border"}`} />
                ))}
              </div>

              <p className="text-brand-text text-lg leading-relaxed my-6 italic">
                "{t.text}"
              </p>

              <div className="flex items-center justify-center gap-3">
                <img src={t.avatar} alt={t.name}
                  className="w-12 h-12 rounded-full border-2 border-primary-600/50 object-cover" />
                <div className="text-left">
                  <p className="text-brand-text font-semibold">{t.name}</p>
                  <p className="text-brand-muted text-sm">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev}
              className="w-10 h-10 rounded-xl glass border border-surface-border text-brand-muted hover:text-primary-400 hover:border-primary-600/50 transition-all flex items-center justify-center">
              <FaChevronLeft />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all ${i === current ? "w-8 bg-primary-500" : "w-2 bg-surface-border"}`} />
              ))}
            </div>
            <button onClick={next}
              className="w-10 h-10 rounded-xl glass border border-surface-border text-brand-muted hover:text-primary-400 hover:border-primary-600/50 transition-all flex items-center justify-center">
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

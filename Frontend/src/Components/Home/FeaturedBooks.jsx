import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:4020/website/api/book/getAll")
      .then((r) => setBooks((r.data.data || []).slice(0, 10)))
      .catch(() => {});
  }, []);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 300, behavior: "smooth" });
    }
  };

  if (!books.length) return null;

  return (
    <section className="section-padding bg-surface-bg">
      <div className="container-max">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.p initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-2">
              Handpicked For You
            </motion.p>
            <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}}
              className="section-title">
              Featured <span className="gradient-text">Books</span>
            </motion.h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll(-1)}
              className="w-10 h-10 rounded-xl glass border border-surface-border text-brand-muted hover:text-primary-400 hover:border-primary-600/50 transition-all flex items-center justify-center">
              <FiArrowLeft />
            </button>
            <button onClick={() => scroll(1)}
              className="w-10 h-10 rounded-xl glass border border-surface-border text-brand-muted hover:text-primary-400 hover:border-primary-600/50 transition-all flex items-center justify-center">
              <FiArrowRight />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {books.map((book, i) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              style={{ scrollSnapAlign: "start", minWidth: "200px", maxWidth: "200px" }}
              className="group"
            >
              <Link to={`/view-details/${book._id}`}>
                <div className="card-dark overflow-hidden">
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={book.url || "https://placehold.co/200x280/111827/7C3AED?text=Book"}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-transparent to-transparent" />
                    {i < 3 && (
                      <span className="absolute top-2 left-2 bg-accent-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                        ✨ Featured
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="text-brand-text text-sm font-semibold line-clamp-1 group-hover:text-primary-400 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-brand-muted text-xs mt-0.5 line-clamp-1">{book.author}</p>
                    <p className="text-accent-500 font-bold text-sm mt-2">₹{book.price}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link to="/all-books" className="btn-outline flex items-center gap-2">
            View All Books <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;

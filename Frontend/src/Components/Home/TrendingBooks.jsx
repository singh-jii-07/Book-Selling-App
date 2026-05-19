import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import BookCard from "../UI/BookCard";
import { SkeletonGrid } from "../UI/SkeletonCard";

const TrendingBooks = () => {
  const [books,   setBooks]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:4020/website/api/book/getAll")
      .then((r) => { setBooks((r.data.data || []).slice(0, 8)); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="section-padding bg-gradient-to-b from-surface-card to-surface-bg">
      <div className="container-max">
        <div className="text-center mb-12">
          <motion.p initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            className="text-accent-500 text-sm font-semibold uppercase tracking-widest mb-2">
            🔥 What's Hot
          </motion.p>
          <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}}
            className="section-title">
            Trending <span className="gradient-text">Right Now</span>
          </motion.h2>
          <motion.p initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.2}}
            className="section-subtitle mx-auto mt-4">
            The most-read books this week, loved by our community.
          </motion.p>
        </div>

        {loading ? (
          <SkeletonGrid count={8} variant="grid" />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {books.map((book, i) => (
              <motion.div
                key={book._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <BookCard book={book} badge={i < 3 ? "trending" : null} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-10">
          <Link to="/all-books" className="btn-primary flex items-center gap-2">
            Browse All Books
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingBooks;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const AddBook = () => {
  const [books,   setBooks]   = useState([]);
  const [loading, setLoading] = useState(true);

  const baseURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios.get(baseURL)
      .then((r) => { setBooks(r.data.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading || !books.length) return null;

  return (
    <section className="section-padding bg-surface-card">
      <div className="container-max">
        <div className="text-center mb-12">
          <motion.p initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-2">
            Fresh Arrivals
          </motion.p>
          <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}}
            className="section-title">
            Recently <span className="gradient-text">Added Books</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book, i) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8 }}
            >
              <Link to={`/view-details/${book._id}`} className="block">
                <div className="card-dark overflow-hidden group h-full flex flex-col">
                  <div className="relative overflow-hidden h-60">
                    <img
                      src={book.url || "https://placehold.co/300x400/111827/7C3AED?text=Book"}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-card/80 to-transparent" />
                    <span className="absolute top-3 left-3 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      NEW
                    </span>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-semibold">
                        View Details
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-brand-text font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary-400 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-brand-muted text-xs mt-1">{book.author}</p>
                    <div className="flex gap-0.5 mt-2">
                      {[1,2,3,4,5].map(s => (
                        <FaStar key={s} className={`text-xs ${s<=4?"text-accent-500":"text-surface-border"}`} />
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-3">
                      <span className="text-accent-500 font-bold text-base">₹{book.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AddBook;

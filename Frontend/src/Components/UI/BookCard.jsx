import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaCartPlus, FaStar } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

/**
 * Reusable premium BookCard
 * Props:
 *  book        — { _id, title, author, price, url }
 *  variant     — "grid" | "list"
 *  onWishlist  — () => void  (optional)
 *  onCart      — () => void  (optional)
 *  showActions — bool (default true)
 *  badge       — "trending" | "new" | "sale" | null
 */
const BookCard = ({
  book,
  variant = "grid",
  onWishlist,
  onCart,
  showActions = true,
  badge = null,
}) => {
  if (!book) return null;

  if (variant === "list") {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="card-dark flex gap-5 p-4 group"
      >
        <Link to={`/view-details/${book._id}`} className="shrink-0">
          <img
            src={book.url || "https://placehold.co/80x110/1E293B/7C3AED?text=Book"}
            alt={book.title}
            className="w-20 h-28 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <Link to={`/view-details/${book._id}`}>
              <h3 className="text-brand-text font-semibold text-base hover:text-primary-400 transition-colors line-clamp-1">
                {book.title}
              </h3>
            </Link>
            <p className="text-brand-muted text-sm mt-0.5">{book.author}</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-accent-500 font-bold text-lg">₹{book.price}</span>
            {showActions && (
              <div className="flex gap-2">
                {onWishlist && (
                  <button onClick={onWishlist}
                    className="p-2 rounded-lg bg-surface-hover hover:bg-red-500/20 text-brand-muted hover:text-red-400 transition-all">
                    <FaHeart className="text-sm" />
                  </button>
                )}
                {onCart && (
                  <button onClick={onCart}
                    className="p-2 rounded-lg bg-surface-hover hover:bg-primary-600/20 text-brand-muted hover:text-primary-400 transition-all">
                    <FaCartPlus className="text-sm" />
                  </button>
                )}
                <Link to={`/view-details/${book._id}`}
                  className="p-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white transition-all">
                  <FiEye className="text-sm" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid variant
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="card-dark overflow-hidden group flex flex-col book-card-3d"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <Link to={`/view-details/${book._id}`}>
          <img
            src={book.url || "https://placehold.co/300x400/1E293B/7C3AED?text=Book"}
            alt={book.title}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        {/* Badge */}
        {badge === "trending" && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            🔥 Trending
          </span>
        )}
        {badge === "new" && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            ✨ New
          </span>
        )}
        {badge === "sale" && (
          <span className="absolute top-3 left-3 bg-accent-500 text-black text-xs font-bold px-2 py-1 rounded-full">
            🏷️ Sale
          </span>
        )}
        {/* Hover overlay actions */}
        {showActions && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <Link to={`/view-details/${book._id}`}
              className="p-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white transition-all hover:scale-110">
              <FiEye />
            </Link>
            {onWishlist && (
              <button onClick={onWishlist}
                className="p-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white transition-all hover:scale-110">
                <FaHeart />
              </button>
            )}
            {onCart && (
              <button onClick={onCart}
                className="p-2.5 rounded-xl bg-secondary-500 hover:bg-secondary-400 text-white transition-all hover:scale-110">
                <FaCartPlus />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/view-details/${book._id}`}>
          <h3 className="text-brand-text font-semibold text-sm leading-snug hover:text-primary-400 transition-colors line-clamp-2">
            {book.title}
          </h3>
        </Link>
        <p className="text-brand-muted text-xs mt-1 line-clamp-1">{book.author}</p>
        {/* Stars */}
        <div className="flex gap-0.5 mt-2">
          {[1,2,3,4,5].map(s => (
            <FaStar key={s} className={`text-xs ${s <= 4 ? "text-accent-500" : "text-surface-border"}`} />
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto pt-3">
          <span className="text-accent-500 font-bold text-base">₹{book.price}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;

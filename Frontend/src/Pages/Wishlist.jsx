import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../Components/Context/AuthContext";
import { useCart } from "../Components/Context/CartContext";
import { SkeletonGrid } from "../Components/UI/SkeletonCard";
import EmptyState from "../Components/UI/EmptyState";

const Wishlist = () => {
  const { isAuthenticated } = useAuth();
  const { fetchCartCount }  = useCart();
  const [books, setBooks]   = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = () => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    if (!id || !token) { setLoading(false); return; }

    axios.get("http://localhost:4020/website/api/book/getFavourite", {
      headers: { id, authorization: `Bearer ${token}` }
    })
      .then((res) => { setBooks(res.data.data || []); setLoading(false); })
      .catch(() => { toast.error("Failed to load wishlist"); setLoading(false); });
  };

  useEffect(() => {
    if (isAuthenticated) fetchWishlist();
    else setLoading(false);
  }, [isAuthenticated]);

  const removeBook = async (bookId) => {
    try {
      await axios.put("http://localhost:4020/website/api/book/removeFavourite", {}, {
        headers: {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
          bookid: bookId,
        }
      });
      setBooks((prev) => prev.filter((b) => b._id !== bookId));
      toast.success("Removed from wishlist");
    } catch { toast.error("Failed to remove book"); }
  };

  const addToCart = async (bookId) => {
    try {
      await axios.put("http://localhost:4020/website/api/book/addCart", {}, {
        headers: {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
          bookid: bookId,
        }
      });
      toast.success("Added to cart! 🛒");
      fetchCartCount();
      // Optionally remove from wishlist after adding to cart
      removeBook(bookId);
    } catch { toast.error("Failed to add to cart"); }
  };

  if (!isAuthenticated) return (
    <div className="min-h-screen bg-surface-bg pt-navbar flex items-center justify-center">
      <EmptyState
        icon="🔒"
        title="Sign in to view wishlist"
        subtitle="Save your favorite books and track what you want to read next."
        ctaText="Sign In Now"
        ctaLink="/signin"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-surface-bg pt-navbar">
      <div className="bg-surface-card border-b border-surface-border">
        <div className="container-max px-4 sm:px-6 py-8">
          <div className="flex items-center gap-3 mb-1">
            <FaHeart className="text-red-500 text-2xl" />
            <h1 className="section-title">My <span className="gradient-text">Wishlist</span></h1>
          </div>
          <p className="text-brand-muted text-sm">{books.length} items saved</p>
        </div>
      </div>

      <div className="container-max px-4 sm:px-6 py-8">
        {loading ? (
          <SkeletonGrid count={4} />
        ) : books.length === 0 ? (
          <EmptyState
            icon="🤍"
            title="Your wishlist is empty"
            subtitle="Explore our collection and add some books you'd love to read."
            ctaText="Explore Books"
            ctaLink="/all-books"
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <AnimatePresence>
              {books.map((book) => (
                <motion.div
                  key={book._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="card-dark flex flex-col group overflow-hidden"
                >
                  <div className="relative overflow-hidden h-56">
                    <Link to={`/view-details/${book._id}`}>
                      <img
                        src={book.url || "https://placehold.co/300x400/111827/7C3AED?text=Book"}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    <button
                      onClick={() => removeBook(book._id)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                    >
                      <FiTrash2 className="text-sm" />
                    </button>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <Link to={`/view-details/${book._id}`}>
                      <h3 className="text-brand-text font-semibold text-sm line-clamp-1 hover:text-primary-400 transition-colors">{book.title}</h3>
                    </Link>
                    <p className="text-brand-muted text-xs mt-0.5">{book.author}</p>
                    <div className="flex items-center justify-between mt-auto pt-4">
                      <span className="text-accent-500 font-bold">₹{book.price}</span>
                      <button
                        onClick={() => addToCart(book._id)}
                        className="p-2 rounded-lg bg-primary-600/20 text-primary-400 hover:bg-primary-600 hover:text-white transition-all"
                      >
                        <FiShoppingCart />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

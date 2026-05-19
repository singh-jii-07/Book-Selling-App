import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaHeart, FaCartPlus, FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FiArrowLeft, FiGlobe, FiBook, FiTag } from "react-icons/fi";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";

const BookDetails = () => {
  const { id }           = useParams();
  const navigate         = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { fetchCartCount }        = useCart();

  const [book,        setBook]        = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState("");
  const [userRating,  setUserRating]  = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const headers = {
    id:            localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:        id,
  };

  const HandleFavourite = async () => {
    if (!isAuthenticated) { toast.info("Please sign in first"); return; }
    try {
      await axios.put("http://localhost:4020/website/api/book/addFavourite", {}, { headers });
      toast.success("Added to wishlist! ❤️");
    } catch { toast.error("Failed to add to wishlist"); }
  };

  const HandleCart = async () => {
    if (!isAuthenticated) { toast.info("Please sign in first"); return; }
    try {
      await axios.put("http://localhost:4020/website/api/book/addCart", {}, { headers });
      toast.success("Added to cart! 🛒");
      fetchCartCount();
    } catch { toast.error("Failed to add to cart"); }
  };

  const DeleteBook = async () => {
    try {
      await axios.delete("http://localhost:4020/website/api/book/deletBook", { headers });
      toast.success("Book deleted successfully");
      navigate("/all-books");
    } catch { toast.error("Failed to delete book"); }
  };

  useEffect(() => {
    axios.get(`http://localhost:4020/website/api/book/bookbyId/${id}`)
      .then((res) => {
        setBook(res.data.data);
        setLoading(false);
        const saved = localStorage.getItem(`rating-${id}`);
        if (saved) setUserRating(Number(saved));
      })
      .catch(() => { setError("Failed to load book details"); setLoading(false); });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-surface-bg pt-navbar flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-3 border-primary-600/30 border-t-primary-600 rounded-full"
        />
        <p className="text-brand-muted">Loading book…</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-surface-bg pt-navbar flex items-center justify-center">
      <p className="text-red-400">{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface-bg pt-navbar page-enter">
      <div className="container-max px-4 sm:px-6 py-10">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-brand-muted hover:text-primary-400 transition-colors mb-8 text-sm font-medium"
        >
          <FiArrowLeft /> Back
        </button>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Cover */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative group">
              <img
                src={book?.url || "https://placehold.co/300x400/111827/7C3AED?text=Book"}
                alt={book?.title}
                className="w-72 h-96 object-cover rounded-2xl shadow-card-hover border border-surface-border group-hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-primary-600/20" />
            </div>

            {/* Action buttons */}
            {isAuthenticated && user?.role === "user" && (
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={HandleFavourite}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all font-medium text-sm"
                >
                  <FaHeart /> Wishlist
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={HandleCart}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white shadow-glow transition-all font-medium text-sm"
                >
                  <FaCartPlus /> Add to Cart
                </motion.button>
              </div>
            )}

            {isAuthenticated && user?.role === "admin" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={DeleteBook}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-all font-medium text-sm"
              >
                <MdDelete /> Delete Book
              </motion.button>
            )}
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-brand-text leading-tight">
                {book?.title}
              </h1>
              <p className="text-brand-muted mt-2">
                by <span className="text-primary-400 font-semibold">{book?.author}</span>
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-black text-accent-500">₹{book?.price}</span>
              <span className="text-brand-muted line-through text-lg">₹{Math.round(book?.price * 1.3)}</span>
              <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-bold px-2 py-0.5 rounded-full">
                23% OFF
              </span>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: <FiGlobe />, label: book?.language || "English" },
                { icon: <FiTag />,   label: "Fiction" },
                { icon: <FiBook />,  label: "Paperback" },
              ].map((m) => (
                <span key={m.label}
                  className="flex items-center gap-1.5 text-xs text-brand-muted bg-surface-card border border-surface-border px-3 py-1.5 rounded-lg">
                  <span className="text-primary-400">{m.icon}</span>
                  {m.label}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="card-dark p-5">
              <h3 className="text-brand-text font-semibold mb-3 text-sm uppercase tracking-wider">About This Book</h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                {book?.description || "No description available for this book."}
              </p>
            </div>

            {/* Star rating */}
            <div className="card-dark p-5">
              <h3 className="text-brand-text font-semibold mb-4 text-sm uppercase tracking-wider">Your Rating</h3>
              <div className="flex gap-2">
                {[1,2,3,4,5].map((star) => (
                  <motion.button
                    key={star}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => { setUserRating(star); localStorage.setItem(`rating-${id}`, star); }}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <FaStar
                      className={`text-2xl transition-colors ${
                        (hoverRating || userRating) >= star ? "text-accent-500" : "text-surface-border"
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
              {userRating > 0 && (
                <p className="text-green-400 text-sm mt-3">
                  You rated this book {userRating} star{userRating > 1 ? "s" : ""}! ⭐
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

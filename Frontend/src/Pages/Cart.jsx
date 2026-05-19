import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import { toast } from "react-toastify";
import { useAuth } from "../Components/Context/AuthContext";
import { useCart } from "../Components/Context/CartContext";
import { SkeletonGrid } from "../Components/UI/SkeletonCard";
import EmptyState from "../Components/UI/EmptyState";

const Cart = () => {
  const navigate            = useNavigate();
  const { isAuthenticated } = useAuth();
  const { fetchCartCount, clearCart } = useCart();

  const [cart,    setCart]    = useState([]);
  const [total,   setTotal]   = useState(0);
  const [loading, setLoading] = useState(true);

  const headers = {
    id:            localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    if (!isAuthenticated) { setLoading(false); return; }
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:4020/website/api/book/getCart", { headers });
        const items = (res.data.data || []).map(b => ({ ...b, qty: 1 }));
        setCart(items);
        setLoading(false);
      } catch {
        toast.error("Failed to load cart");
        setLoading(false);
      }
    };
    fetchCart();
  }, [isAuthenticated]);

  useEffect(() => {
    setTotal(cart.reduce((sum, item) => sum + item.price * item.qty, 0));
  }, [cart]);

  const updateQty = (id, delta) => {
    setCart((prev) => prev.map(item => {
      if (item._id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeItem = async (bookId) => {
    try {
      await axios.put("http://localhost:4020/website/api/book/removeCart", {}, {
        headers: { ...headers, bookid: bookId }
      });
      setCart((prev) => prev.filter(item => item._id !== bookId));
      fetchCartCount();
      toast.success("Removed from cart");
    } catch { toast.error("Failed to remove item"); }
  };

  const placeOrder = async () => {
    try {
      const orderData = { order: cart.map(item => ({ ...item, quantity: item.qty })) };
      await axios.post("http://localhost:4020/website/api/book/placeorder", orderData, { headers });
      setCart([]);
      clearCart();
      toast.success("Order placed successfully! 🎉");
      navigate("/profile/orders");
    } catch { toast.error("Failed to place order"); }
  };

  if (!isAuthenticated) return (
    <div className="min-h-screen bg-surface-bg pt-navbar flex items-center justify-center">
      <EmptyState icon="🔒" title="Sign in to view cart" subtitle="Your shopping cart is waiting for you." ctaText="Sign In" ctaLink="/signin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-surface-bg pt-navbar pb-12">
      <div className="bg-surface-card border-b border-surface-border">
        <div className="container-max px-4 sm:px-6 py-8">
          <div className="flex items-center gap-3 mb-1">
            <FiShoppingBag className="text-secondary-500 text-2xl" />
            <h1 className="section-title">My <span className="gradient-text">Cart</span></h1>
          </div>
          <p className="text-brand-muted text-sm">{cart.length} items</p>
        </div>
      </div>

      <div className="container-max px-4 sm:px-6 py-8">
        {loading ? (
          <SkeletonGrid count={3} variant="list" />
        ) : cart.length === 0 ? (
          <EmptyState icon="🛒" title="Your cart is empty" subtitle="Looks like you haven't added anything yet." ctaText="Start Shopping" ctaLink="/all-books" />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1 flex flex-col gap-4">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.2 }}
                    className="card-dark p-4 flex flex-col sm:flex-row gap-5 items-center relative pr-12 sm:pr-4"
                  >
                    <Link to={`/view-details/${item._id}`} className="shrink-0">
                      <img src={item.url || "https://placehold.co/80x110/1E293B/7C3AED"} alt={item.title} className="w-20 h-28 object-cover rounded-lg" />
                    </Link>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-brand-text font-semibold hover:text-primary-400 transition-colors line-clamp-1">{item.title}</h3>
                      <p className="text-brand-muted text-sm">{item.author}</p>
                      <p className="text-accent-500 font-bold mt-2">₹{item.price}</p>
                    </div>
                    
                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 bg-surface-hover rounded-xl p-1 border border-surface-border">
                      <button onClick={() => updateQty(item._id, -1)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-border text-brand-muted hover:text-brand-text transition-all"><FiMinus /></button>
                      <span className="w-4 text-center font-semibold text-sm text-brand-text">{item.qty}</span>
                      <button onClick={() => updateQty(item._id, 1)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-border text-brand-muted hover:text-brand-text transition-all"><FiPlus /></button>
                    </div>
                    
                    <div className="hidden sm:block text-right min-w-[80px]">
                      <p className="text-brand-muted text-xs uppercase tracking-wider mb-1">Total</p>
                      <p className="font-bold text-brand-text">₹{item.price * item.qty}</p>
                    </div>

                    <button
                      onClick={() => removeItem(item._id)}
                      className="absolute top-4 right-4 sm:relative sm:top-auto sm:right-auto p-2 text-brand-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                      <FiTrash2 />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="card-dark p-6 sticky top-24">
                <h3 className="text-brand-text font-semibold text-lg mb-6 pb-4 border-b border-surface-border">Order Summary</h3>
                <div className="space-y-4 text-sm mb-6">
                  <div className="flex justify-between text-brand-muted">
                    <span>Subtotal ({cart.length} items)</span>
                    <span className="text-brand-text">₹{total}</span>
                  </div>
                  <div className="flex justify-between text-brand-muted">
                    <span>Shipping</span>
                    <span className="text-green-400 font-medium">Free</span>
                  </div>
                </div>
                <div className="border-t border-surface-border pt-4 mb-6 flex justify-between items-end">
                  <span className="text-brand-text font-medium">Total Amount</span>
                  <span className="text-2xl font-black text-accent-500">₹{total}</span>
                </div>
                <button
                  onClick={placeOrder}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  Place Order <FiArrowRight />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiHome, FiArrowRight } from "react-icons/fi";

const SignUp = () => {
  const [data, setData] = useState({ username: "", email: "", password: "", address: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!data.username || !data.email || !data.password || !data.address) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4020/website/api/book/signup", data);
      toast.success(res.data.message || "Account created successfully! 🎉");
      navigate("/signin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-bg pt-navbar flex items-center justify-center p-4 page-enter relative overflow-hidden">
      {/* Bg shapes */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />

      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-surface-card rounded-3xl overflow-hidden shadow-card-hover border border-surface-border relative z-10">
        
        {/* Form Side */}
        <div className="p-8 sm:p-12 order-2 md:order-1">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-2xl font-bold text-brand-text">Create Account</h1>
            <p className="text-brand-muted text-sm mt-2">Already have an account? <Link to="/signin" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">Sign in</Link></p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Username</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input type="text" name="username" value={data.username} onChange={change} placeholder="johndoe" className="input-dark pl-11" required />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input type="email" name="email" value={data.email} onChange={change} placeholder="john@example.com" className="input-dark pl-11" required />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input type="password" name="password" value={data.password} onChange={change} placeholder="••••••••" className="input-dark pl-11" required />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Delivery Address</label>
              <div className="relative">
                <FiHome className="absolute left-4 top-4 text-brand-muted" />
                <textarea name="address" value={data.address} onChange={change} placeholder="Your full delivery address" rows={2} className="input-dark pl-11 py-3 resize-none" required />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex justify-center items-center gap-2 mt-4 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Create Account <FiArrowRight /></>
              )}
            </motion.button>
          </form>
        </div>

        {/* Visual Side */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-bl from-secondary-900/40 to-surface-card p-12 relative overflow-hidden order-1 md:order-2 border-b md:border-b-0 md:border-l border-surface-border">
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-white mb-4">Join Our Reading Community</h2>
            <p className="text-brand-muted">Unlock exclusive offers, track your reading goals, and curate your personalized wishlist.</p>
          </div>
          
          <div className="relative z-10 mt-12 grid grid-cols-2 gap-4">
            {[
              { icon: "📦", title: "Free Shipping", desc: "On orders over ₹500" },
              { icon: "🔖", title: "Wishlist", desc: "Save books for later" },
              { icon: "⚡", title: "Fast Delivery", desc: "2-3 business days" },
              { icon: "⭐", title: "Reviews", desc: "Rate your favorites" },
            ].map(f => (
              <div key={f.title} className="glass p-4 rounded-2xl border border-white/10">
                <div className="text-2xl mb-2">{f.icon}</div>
                <p className="text-sm font-bold text-white mb-1">{f.title}</p>
                <p className="text-xs text-brand-muted">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary-500/20 rotate-45 blur-2xl rounded-[3rem]" />
        </div>

      </div>
    </div>
  );
};

export default SignUp;

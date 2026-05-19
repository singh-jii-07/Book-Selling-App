import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { useAuth } from "../Components/Context/AuthContext";

const SignIn = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!data.username || !data.password) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4020/website/api/book/login", data);
      localStorage.setItem("id", res.data.id);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      login();
      toast.success("Welcome back! 👋");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-bg pt-navbar flex items-center justify-center p-4 page-enter relative overflow-hidden">
      {/* Bg shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />

      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-surface-card rounded-3xl overflow-hidden shadow-card-hover border border-surface-border relative z-10">
        
        {/* Visual Side */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-primary-900/50 to-surface-card p-12 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-white mb-4">Welcome Back to BookBazaar</h2>
            <p className="text-brand-muted">Your personal library awaits. Sign in to access your wishlist, track orders, and discover new reads.</p>
          </div>
          <div className="relative z-10 mt-12">
            <div className="p-6 glass border border-white/10 rounded-2xl">
              <p className="text-white italic text-sm">"A room without books is like a body without a soul."</p>
              <p className="text-primary-400 text-xs font-bold mt-3">— Marcus Tullius Cicero</p>
            </div>
          </div>
          {/* Abstract book art */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary-600/20 rotate-45 blur-2xl rounded-[3rem]" />
        </div>

        {/* Form Side */}
        <div className="p-8 sm:p-12">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-2xl font-bold text-brand-text">Sign In</h1>
            <p className="text-brand-muted text-sm mt-2">Don't have an account? <Link to="/signup" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">Sign up</Link></p>
          </div>

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Username</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={change}
                  placeholder="Enter your username"
                  className="input-dark pl-11"
                  required
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider">Password</label>
                <a href="#" className="text-xs text-primary-400 hover:text-primary-300">Forgot password?</a>
              </div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={change}
                  placeholder="••••••••"
                  className="input-dark pl-11"
                  required
                />
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
                <>Sign In <FiArrowRight /></>
              )}
            </motion.button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default SignIn;

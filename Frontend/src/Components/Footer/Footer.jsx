import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/logo.jpg";
import {
  FaInstagram, FaYoutube, FaLinkedin, FaGithub, FaTwitter,
} from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone, FiArrowRight } from "react-icons/fi";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("🎉 Subscribed successfully!");
    setEmail("");
  };

  const socials = [
    { icon: <FaInstagram />, label: "Instagram", href: "#" },
    { icon: <FaTwitter />,   label: "Twitter",   href: "#" },
    { icon: <FaYoutube />,   label: "YouTube",   href: "#" },
    { icon: <FaLinkedin />,  label: "LinkedIn",  href: "#" },
    { icon: <FaGithub />,    label: "GitHub",    href: "#" },
  ];

  const columns = [
    {
      title: "Navigate",
      links: [
        { label: "Home",      href: "/" },
        { label: "About Us",  href: "/about" },
        { label: "All Books", href: "/all-books" },
        { label: "Wishlist",  href: "/wishlist" },
      ],
    },
    {
      title: "Explore",
      links: [
        { label: "Bestsellers",  href: "/all-books" },
        { label: "New Arrivals", href: "/all-books" },
        { label: "Fiction",      href: "/all-books" },
        { label: "Non-Fiction",  href: "/all-books" },
      ],
    },
    {
      title: "Account",
      links: [
        { label: "My Profile",   href: "/profile" },
        { label: "My Cart",      href: "/cart" },
        { label: "Order History",href: "/profile/orders" },
        { label: "Sign In",      href: "/signin" },
      ],
    },
  ];

  return (
    <footer className="bg-surface-card border-t border-surface-border">
      {/* Main footer */}
      <div className="container-max px-4 sm:px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand col */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <img src={logo} alt="Logo" className="w-10 h-10 rounded-xl object-cover shadow-glow-sm" />
              <span className="text-2xl font-extrabold text-brand-text">
                Book<span className="text-accent-500">Bazaar</span>
              </span>
            </Link>
            <p className="text-brand-muted text-sm leading-relaxed max-w-xs mb-6">
              Your one-stop destination to discover, explore, and buy books across every genre.
              Fuel your imagination with every page.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleNewsletter} className="flex gap-2 max-w-xs">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="input-dark text-sm flex-1 py-2.5 px-3"
              />
              <button type="submit"
                className="bg-primary-600 hover:bg-primary-500 text-white px-3 py-2.5 rounded-xl transition-all hover:shadow-glow">
                <FiArrowRight />
              </button>
            </form>
            <p className="text-brand-subtle text-xs mt-2">Get exclusive deals & reading recommendations</p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-brand-text font-semibold text-sm uppercase tracking-wider mb-5 relative">
                {col.title}
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full" />
              </h3>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.href}
                      className="text-brand-muted hover:text-primary-400 text-sm transition-colors duration-200 flex items-center gap-1 group">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1">›</span>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div className="mt-12 pt-8 border-t border-surface-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-6">
            {[
              { icon: <FiMail />,    text: "hello@bookbazaar.in" },
              { icon: <FiPhone />,   text: "+91 98765 43210" },
              { icon: <FiMapPin />,  text: "Mumbai, India" },
            ].map((c) => (
              <span key={c.text} className="flex items-center gap-2 text-brand-muted text-sm">
                <span className="text-primary-400">{c.icon}</span>
                {c.text}
              </span>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex gap-3">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                whileHover={{ y: -3, scale: 1.1 }}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface-hover text-brand-muted hover:text-brand-text hover:bg-primary-600/20 hover:text-primary-400 transition-all"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-surface-border py-5 text-center">
        <p className="text-brand-subtle text-xs">
          © {new Date().getFullYear()} BookBazaar · Made with ❤️ by{" "}
          <span className="text-accent-500 font-medium">Nilesh Kumar Singh</span>
          {" "}· All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.jpg";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";
import {
  FaBarsStaggered, FaHeart, FaBook,
} from "react-icons/fa6";
import {
  IoClose, IoCartOutline, IoPersonOutline,
  IoLogOutOutline, IoChevronDown,
} from "react-icons/io5";
import { FiHome, FiInfo, FiBook, FiShoppingCart, FiUser } from "react-icons/fi";

const navLinks = [
  { name: "Home",      link: "/",          icon: <FiHome /> },
  { name: "About",     link: "/about",      icon: <FiInfo /> },
  { name: "All Books", link: "/all-books",  icon: <FiBook /> },
];
const authLinks = [
  { name: "Cart",     link: "/cart",     icon: <FiShoppingCart /> },
  { name: "Wishlist", link: "/wishlist", icon: <FaHeart /> },
  { name: "Profile",  link: "/profile",  icon: <FiUser /> },
];

const Navbar = () => {
  const location   = useLocation();
  const navigate   = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount, fetchCartCount }     = useCart();
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [dropOpen,    setDropOpen]    = useState(false);
  const dropRef = useRef(null);

  const links = isAuthenticated ? [...navLinks, ...authLinks] : navLinks;

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Fetch cart on auth change */
  useEffect(() => {
    if (isAuthenticated) fetchCartCount();
  }, [isAuthenticated, fetchCartCount]);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    logout();
    navigate("/signin");
    setDropOpen(false);
    setMenuOpen(false);
  };

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300
          ${scrolled
            ? "bg-surface-bg/90 backdrop-blur-xl border-b border-surface-border shadow-lg"
            : "bg-transparent"
          }`}
        style={{ height: "var(--navbar-height)" }}
      >
        <div className="container-max flex items-center justify-between px-4 sm:px-6 h-full">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <motion.img
              whileHover={{ rotate: [0, -8, 8, 0], scale: 1.05 }}
              transition={{ duration: 0.4 }}
              src={logo}
              alt="BookBazaar Logo"
              className="w-9 h-9 rounded-lg object-cover shadow-glow-sm"
            />
            <span className="text-xl font-extrabold tracking-tight text-brand-text hidden sm:block">
              Book<span className="text-accent-500">Bazaar</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.link}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive(item.link)
                      ? "text-primary-400"
                      : "text-brand-muted hover:text-brand-text"
                    }`}
                >
                  {item.name}
                  {isActive(item.link) && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Cart */}
                <Link to="/cart" className="relative p-2 rounded-lg text-brand-muted hover:text-primary-400 hover:bg-surface-hover transition-all">
                  <IoCartOutline className="text-xl" />
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                    >
                      {cartCount > 9 ? "9+" : cartCount}
                    </motion.span>
                  )}
                </Link>
                {/* Wishlist */}
                <Link to="/wishlist" className="p-2 rounded-lg text-brand-muted hover:text-red-400 hover:bg-surface-hover transition-all">
                  <FaHeart className="text-lg" />
                </Link>
                {/* User dropdown */}
                <div className="relative" ref={dropRef}>
                  <button
                    onClick={() => setDropOpen(!dropOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-hover hover:bg-surface-border transition-all"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center text-white text-xs font-bold">
                      {user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <span className="text-sm text-brand-text font-medium max-w-[80px] truncate">
                      {user?.name || "User"}
                    </span>
                    <IoChevronDown className={`text-brand-muted text-sm transition-transform ${dropOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {dropOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-52 glass-dark rounded-2xl shadow-card-hover overflow-hidden"
                      >
                        <div className="p-3 border-b border-surface-border">
                          <p className="text-brand-text text-sm font-semibold">{user?.name}</p>
                          <p className="text-brand-muted text-xs capitalize">{user?.role}</p>
                        </div>
                        <div className="p-2">
                          {[
                            { label: "My Profile",  link: "/profile",  icon: <IoPersonOutline /> },
                            { label: "Wishlist",    link: "/wishlist", icon: <FaHeart /> },
                            { label: "My Orders",   link: "/profile/orders", icon: <FaBook /> },
                          ].map((d) => (
                            <Link key={d.label} to={d.link} onClick={() => setDropOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-brand-muted hover:text-brand-text hover:bg-surface-hover transition-all text-sm">
                              <span className="text-primary-400">{d.icon}</span>
                              {d.label}
                            </Link>
                          ))}
                          <button onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all text-sm mt-1 border-t border-surface-border">
                            <IoLogOutOutline />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex gap-2">
                <Link to="/signin" className="btn-outline text-sm px-4 py-2">Sign In</Link>
                <Link to="/signup" className="btn-primary text-sm px-4 py-2">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-brand-muted hover:text-brand-text hover:bg-surface-hover transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <IoClose className="text-2xl" /> : <FaBarsStaggered className="text-xl" />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-[100] w-72 glass-dark flex flex-col md:hidden"
            >
              {/* Mobile header */}
              <div className="flex items-center justify-between p-5 border-b border-surface-border">
                <span className="text-xl font-extrabold text-brand-text">
                  Book<span className="text-accent-500">Bazaar</span>
                </span>
                <button onClick={() => setMenuOpen(false)} className="p-1.5 rounded-lg text-brand-muted hover:text-brand-text">
                  <IoClose className="text-2xl" />
                </button>
              </div>

              {/* User info */}
              {isAuthenticated && (
                <div className="flex items-center gap-3 px-5 py-4 border-b border-surface-border">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center text-white font-bold">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className="text-brand-text font-semibold text-sm">{user?.name}</p>
                    <p className="text-brand-muted text-xs capitalize">{user?.role}</p>
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                {links.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link to={item.link}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                        ${isActive(item.link)
                          ? "bg-primary-600/20 text-primary-400 border border-primary-600/30"
                          : "text-brand-muted hover:text-brand-text hover:bg-surface-hover"
                        }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      {item.name}
                      {item.name === "Cart" && cartCount > 0 && (
                        <span className="ml-auto bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Auth buttons */}
              <div className="p-4 border-t border-surface-border">
                {isAuthenticated ? (
                  <button onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all text-sm font-medium">
                    <IoLogOutOutline />
                    Logout
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link to="/signin" className="btn-outline text-center text-sm py-2.5">Sign In</Link>
                    <Link to="/signup" className="btn-primary text-center text-sm py-2.5">Sign Up</Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

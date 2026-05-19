import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  FiSearch, FiGrid, FiList, FiSliders, FiX, FiChevronDown,
} from "react-icons/fi";
import { FaHeart, FaCartPlus } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";
import { SkeletonGrid } from "../UI/SkeletonCard";
import EmptyState from "../UI/EmptyState";

const CATEGORIES = ["All", "Fiction", "Non-Fiction", "Science", "History", "Self-Help", "Romance", "Children"];
const PRICE_OPTS = [
  { label: "All Prices",   value: "all" },
  { label: "Under ₹200",  value: "below200" },
  { label: "₹200 – ₹500", value: "200to500" },
  { label: "Above ₹500",  value: "above500" },
];
const SORT_OPTS = [
  { label: "Default",        value: "default" },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
  { label: "Name: A → Z",   value: "name_asc" },
];
const PAGE_SIZE = 12;

const BookCardList = () => {
  const { isAuthenticated } = useAuth();
  const { fetchCartCount }  = useCart();

  const [books,         setBooks]         = useState([]);
  const [filtered,      setFiltered]      = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState("");
  const [search,        setSearch]        = useState("");
  const [category,      setCategory]      = useState("All");
  const [priceFilter,   setPriceFilter]   = useState("all");
  const [sort,          setSort]          = useState("default");
  const [view,          setView]          = useState("grid");
  const [page,          setPage]          = useState(1);
  const [sidebarOpen,   setSidebarOpen]   = useState(false);

  const baseHeaders = {
    id:            localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    axios.get("http://localhost:4020/website/api/book/getAll")
      .then((r) => { setBooks(r.data.data || []); setLoading(false); })
      .catch(() => { setError("Failed to fetch books."); setLoading(false); });
  }, []);

  useEffect(() => {
    let list = [...books];
    if (search.trim())    list = list.filter(b => `${b.title} ${b.author}`.toLowerCase().includes(search.toLowerCase()));
    if (priceFilter === "below200")  list = list.filter(b => b.price < 200);
    if (priceFilter === "200to500")  list = list.filter(b => b.price >= 200 && b.price <= 500);
    if (priceFilter === "above500")  list = list.filter(b => b.price > 500);
    if (sort === "price_asc")  list.sort((a,b) => a.price - b.price);
    if (sort === "price_desc") list.sort((a,b) => b.price - a.price);
    if (sort === "name_asc")   list.sort((a,b) => a.title.localeCompare(b.title));
    setFiltered(list);
    setPage(1);
  }, [search, priceFilter, sort, books]);

  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const handleAddCart = async (bookId) => {
    if (!isAuthenticated) { toast.info("Please sign in to add to cart"); return; }
    try {
      await axios.put("http://localhost:4020/website/api/book/addCart", {}, {
        headers: { ...baseHeaders, bookid: bookId },
      });
      toast.success("Added to cart! 🛒");
      fetchCartCount();
    } catch { toast.error("Failed to add to cart"); }
  };

  const handleAddWishlist = async (bookId) => {
    if (!isAuthenticated) { toast.info("Please sign in to add to wishlist"); return; }
    try {
      await axios.put("http://localhost:4020/website/api/book/addFavourite", {}, {
        headers: { ...baseHeaders, bookid: bookId },
      });
      toast.success("Added to wishlist! ❤️");
    } catch { toast.error("Failed to add to wishlist"); }
  };

  const resetFilters = () => { setSearch(""); setPriceFilter("all"); setSort("default"); setCategory("All"); };

  if (loading) return <div className="min-h-screen bg-surface-bg pt-navbar px-4"><div className="container-max py-8"><SkeletonGrid count={12} variant={view} /></div></div>;
  if (error)   return <div className="min-h-screen bg-surface-bg pt-navbar flex items-center justify-center"><EmptyState icon="😕" title="Failed to load books" subtitle={error} ctaText="Retry" onCta={() => window.location.reload()} /></div>;

  return (
    <div className="min-h-screen bg-surface-bg pt-navbar">
      {/* Page Header */}
      <div className="bg-surface-card border-b border-surface-border">
        <div className="container-max px-4 sm:px-6 py-8">
          <h1 className="section-title mb-1">
            All <span className="gradient-text">Books</span>
          </h1>
          <p className="text-brand-muted text-sm">{filtered.length} books found</p>
        </div>
      </div>

      <div className="container-max px-4 sm:px-6 py-8 flex gap-8">
        {/* ── Sidebar ── */}
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <FilterSidebar
            search={search} setSearch={setSearch}
            category={category} setCategory={setCategory}
            priceFilter={priceFilter} setPriceFilter={setPriceFilter}
            sort={sort} setSort={setSort}
            onReset={resetFilters}
          />
        </aside>

        {/* Mobile filter button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-20 left-4 z-40 lg:hidden flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl shadow-glow text-sm font-medium"
        >
          <FiSliders /> Filters
        </button>

        {/* Mobile sidebar overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-black/60 z-[90] lg:hidden"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed left-0 top-0 bottom-0 z-[91] w-72 glass-dark overflow-y-auto lg:hidden"
              >
                <div className="flex items-center justify-between p-5 border-b border-surface-border">
                  <span className="font-semibold text-brand-text">Filters</span>
                  <button onClick={() => setSidebarOpen(false)}><FiX className="text-xl text-brand-muted" /></button>
                </div>
                <div className="p-5">
                  <FilterSidebar
                    search={search} setSearch={setSearch}
                    category={category} setCategory={setCategory}
                    priceFilter={priceFilter} setPriceFilter={setPriceFilter}
                    sort={sort} setSort={setSort}
                    onReset={() => { resetFilters(); setSidebarOpen(false); }}
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ── Main Content ── */}
        <div className="flex-1 min-w-0">
          {/* Top bar */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-md lg:hidden">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
              <input
                type="text"
                placeholder="Search books…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-dark pl-10 text-sm"
              />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button onClick={() => setView("grid")}
                className={`p-2 rounded-lg transition-all ${view==="grid" ? "bg-primary-600 text-white" : "text-brand-muted hover:text-brand-text"}`}>
                <FiGrid />
              </button>
              <button onClick={() => setView("list")}
                className={`p-2 rounded-lg transition-all ${view==="list" ? "bg-primary-600 text-white" : "text-brand-muted hover:text-brand-text"}`}>
                <FiList />
              </button>
            </div>
          </div>

          {/* Books grid / list */}
          {paginated.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="No books found"
              subtitle="Try adjusting your search or filters."
              ctaText="Clear Filters"
              onCta={resetFilters}
            />
          ) : (
            <>
              <AnimatePresence mode="popLayout">
                <motion.div
                  className={view === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5"
                    : "flex flex-col gap-4"
                  }
                >
                  {paginated.map((book, i) => (
                    <motion.div
                      key={book._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      {view === "grid" ? (
                        <GridCard book={book} onCart={() => handleAddCart(book._id)} onWishlist={() => handleAddWishlist(book._id)} />
                      ) : (
                        <ListCard book={book} onCart={() => handleAddCart(book._id)} onWishlist={() => handleAddWishlist(book._id)} />
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => { setPage(p); window.scrollTo({top:0,behavior:"smooth"}); }}
                      className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                        p === page
                          ? "bg-primary-600 text-white shadow-glow"
                          : "bg-surface-card text-brand-muted hover:text-brand-text hover:bg-surface-hover border border-surface-border"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Subcomponents ── */
const FilterSidebar = ({ search, setSearch, category, setCategory, priceFilter, setPriceFilter, sort, setSort, onReset }) => (
  <div className="flex flex-col gap-6 sticky top-24">
    {/* Search */}
    <div>
      <h4 className="text-brand-text font-semibold text-sm mb-3">Search</h4>
      <div className="relative">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
        <input
          type="text"
          placeholder="Title or author…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-dark pl-10 text-sm"
        />
      </div>
    </div>

    {/* Category */}
    <div>
      <h4 className="text-brand-text font-semibold text-sm mb-3">Category</h4>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              category === c
                ? "bg-primary-600 text-white"
                : "bg-surface-hover text-brand-muted hover:text-brand-text"
            }`}>
            {c}
          </button>
        ))}
      </div>
    </div>

    {/* Price */}
    <div>
      <h4 className="text-brand-text font-semibold text-sm mb-3">Price Range</h4>
      <div className="flex flex-col gap-2">
        {PRICE_OPTS.map((o) => (
          <label key={o.value} className="flex items-center gap-2.5 cursor-pointer group">
            <div className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
              priceFilter === o.value ? "border-primary-500 bg-primary-600" : "border-surface-border"
            }`}>
              {priceFilter === o.value && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
            </div>
            <input type="radio" name="price" value={o.value} checked={priceFilter===o.value} onChange={()=>setPriceFilter(o.value)} className="hidden" />
            <span className={`text-sm ${priceFilter===o.value ? "text-primary-400" : "text-brand-muted group-hover:text-brand-text"}`}>{o.label}</span>
          </label>
        ))}
      </div>
    </div>

    {/* Sort */}
    <div>
      <h4 className="text-brand-text font-semibold text-sm mb-3">Sort By</h4>
      <div className="relative">
        <select value={sort} onChange={(e) => setSort(e.target.value)}
          className="input-dark text-sm appearance-none pr-10 cursor-pointer">
          {SORT_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
      </div>
    </div>

    <button onClick={onReset}
      className="flex items-center justify-center gap-2 text-brand-muted hover:text-brand-text text-sm border border-surface-border rounded-xl py-2.5 hover:bg-surface-hover transition-all">
      <FiX /> Clear Filters
    </button>
  </div>
);

const GridCard = ({ book, onCart, onWishlist }) => (
  <div className="card-dark overflow-hidden group flex flex-col">
    <div className="relative overflow-hidden h-52">
      <Link to={`/view-details/${book._id}`}>
        <img
          src={book.url || "https://placehold.co/300x400/111827/7C3AED?text=Book"}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-card/70 to-transparent" />
      </Link>
      <div className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity gap-2">
        <button onClick={onWishlist} className="p-2 rounded-xl bg-surface-card/90 hover:bg-red-500/80 text-brand-muted hover:text-white transition-all">
          <FaHeart className="text-sm" />
        </button>
        <Link to={`/view-details/${book._id}`} className="px-3 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-semibold transition-all">
          View
        </Link>
        <button onClick={onCart} className="p-2 rounded-xl bg-surface-card/90 hover:bg-secondary-500/80 text-brand-muted hover:text-white transition-all">
          <FaCartPlus className="text-sm" />
        </button>
      </div>
    </div>
    <div className="p-4 flex flex-col flex-1">
      <h3 className="text-brand-text font-semibold text-sm line-clamp-2">{book.title}</h3>
      <p className="text-brand-muted text-xs mt-1 line-clamp-1">{book.author}</p>
      <p className="text-accent-500 font-bold mt-auto pt-3">₹{book.price}</p>
    </div>
  </div>
);

const ListCard = ({ book, onCart, onWishlist }) => (
  <div className="card-dark flex gap-5 p-4 group">
    <Link to={`/view-details/${book._id}`} className="shrink-0">
      <img
        src={book.url || "https://placehold.co/80x110/1E293B/7C3AED?text=Book"}
        alt={book.title}
        className="w-20 h-28 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
      />
    </Link>
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <Link to={`/view-details/${book._id}`}>
          <h3 className="text-brand-text font-semibold text-base hover:text-primary-400 transition-colors line-clamp-1">{book.title}</h3>
        </Link>
        <p className="text-brand-muted text-sm mt-0.5">{book.author}</p>
        <p className="text-brand-muted text-xs mt-1 line-clamp-2">{book.description}</p>
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="text-accent-500 font-bold text-lg">₹{book.price}</span>
        <div className="flex gap-2">
          <button onClick={onWishlist} className="p-2 rounded-lg bg-surface-hover hover:bg-red-500/20 text-brand-muted hover:text-red-400 transition-all"><FaHeart /></button>
          <button onClick={onCart} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium transition-all"><FaCartPlus /> Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
);

export default BookCardList;

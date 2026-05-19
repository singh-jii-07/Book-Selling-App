import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FiBook, FiUser, FiLink, FiDollarSign, FiGlobe, FiFileText } from "react-icons/fi";

const AdminForm = () => {
  const [formData, setFormData] = useState({
    title: "", author: "", url: "", price: "", language: "", description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "price" ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    try {
      await axios.post("http://localhost:4020/website/api/book/addBook", formData, { headers });
      toast.success("✅ Book successfully added to the catalog!");
      setFormData({ title: "", author: "", url: "", price: "", language: "", description: "" });
    } catch (error) {
      toast.error(`❌ ${error.response?.data?.message || "Failed to add book"}`);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "title", type: "text", placeholder: "Book Title", icon: <FiBook /> },
    { name: "author", type: "text", placeholder: "Author Name", icon: <FiUser /> },
    { name: "url", type: "url", placeholder: "Cover Image URL", icon: <FiLink /> },
    { name: "price", type: "number", placeholder: "Price (₹)", icon: <FiDollarSign /> },
    { name: "language", type: "text", placeholder: "Language", icon: <FiGlobe /> },
  ];

  return (
    <div className="card-dark p-6 md:p-8 max-w-2xl mx-auto my-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-3xl font-bold text-brand-text mb-2">
          Add New <span className="gradient-text">Book</span>
        </h2>
        <p className="text-brand-muted text-sm">Add a new title to the platform's catalog.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {fields.map(({ name, type, placeholder, icon }) => (
            <div key={name} className={name === "url" ? "sm:col-span-2" : ""}>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted">
                  {icon}
                </div>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="input-dark pl-11"
                  required
                />
              </div>
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="absolute left-4 top-4 text-brand-muted">
            <FiFileText />
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Book Description"
            rows={5}
            className="input-dark pl-11 py-3 resize-none"
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full btn-primary flex justify-center items-center gap-2 mt-4 disabled:opacity-70"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Add Book to Catalog"
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default AdminForm;

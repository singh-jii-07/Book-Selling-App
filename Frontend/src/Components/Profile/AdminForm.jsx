import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BookForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    url: "",
    price: "",
    language: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
}
    try {
      const res = await axios.post(
        "http://localhost:4020/website/api/book/addBook",
        formData,
        { headers }
      );

      toast.success("✅ Book successfully added!");
      console.log(res.data);

      setFormData({
        title: "",
        author: "",
        url: "",
        price: "",
        language: "",
        description: "",
      });
    } catch (error) {
      console.error("Failed to add book:", error.response?.data || error);
      toast.error(
        `❌ ${error.response?.data?.message || "Failed to add book"}`
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-24 bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-6">
        📚 Add a New Book
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          { name: "title", type: "text", placeholder: "Book Title" },
          { name: "author", type: "text", placeholder: "Author Name" },
          { name: "url", type: "url", placeholder: "Image URL" },
          { name: "price", type: "number", placeholder: "Price (₹)" },
          { name: "language", type: "text", placeholder: "Language" },
        ].map(({ name, type, placeholder }) => (
          <input
            key={name}
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition placeholder:text-gray-400"
            required // 
          />
        ))}

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Short Description"
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition placeholder:text-gray-400 resize-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition duration-200 shadow-md"
        >
          ➕ Submit Book
        </button>
      </form>
    </div>
  );
};

export default BookForm;

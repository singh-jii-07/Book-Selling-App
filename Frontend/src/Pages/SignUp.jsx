import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

// Place this in your root component if not already added:
// toast.configure();

const Signup = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4020/website/api/user/signup",
        formdata
      );
      if (res.status === 201 || res.status === 200) {
        toast.success("Signup successful! 🎉");
        navigate("/signin");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formdata.name}
            onChange={handleChange}
            className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formdata.email}
            onChange={handleChange}
            className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formdata.password}
            onChange={handleChange}
            className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formdata.address}
            onChange={handleChange}
            className="border border-gray-300 p-3 mb-6 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 w-full rounded-lg transition-all duration-200"
          >
            Sign Up
          </motion.button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 font-medium hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;

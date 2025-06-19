import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Components/Context/AuthContext";
import { motion } from "framer-motion";

const Login = () => {
  const { login } = useAuth();
  const [formdata, setFormdata] = useState({ name: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:4020/website/api/user/signIn", formdata);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.user.id);
      localStorage.setItem("role", res.data.user.role);

      login(res.data.user);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 via-white to-pink-100">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Welcome Back 👋</h2>
        {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={formdata.name}
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
            className="border border-gray-300 p-3 mb-6 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 w-full rounded-lg transition-all duration-200"
          >
            Login
          </motion.button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-500 font-medium hover:underline transition-all"
          >
            Sign Up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;

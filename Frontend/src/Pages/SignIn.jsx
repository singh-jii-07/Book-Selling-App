import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { useAuth } from "../Components/Context/AuthContext";
import { FaUser, FaLock } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";


const Login = () => {
  const { login } = useAuth();
  const [formdata, setFormdata] = useState({ name: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 via-pink-100 to-purple-200 px-4">
      <div
        data-aos="zoom-in"
        className="bg-white/30 backdrop-blur-lg shadow-2xl p-8 rounded-3xl w-full max-w-md border border-white/20"
      >
        <h2 className="text-4xl font-bold mb-6 text-center text-blue-700 drop-shadow">
          Welcome Back 👋
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="relative">
            <span className="absolute top-3.5 left-4 text-blue-500">
              <FaUser />
            </span>
            <input
              type="text"
              name="name"
              placeholder="Username"
              value={formdata.name}
              onChange={handleChange}
              className="pl-11 pr-4 py-3 w-full rounded-lg bg-white/80 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>

          
          <div className="relative">
            <span className="absolute top-3.5 left-4 text-blue-500">
              <FaLock />
            </span>
           <div className="relative w-full">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={formdata.password}
    onChange={handleChange}
    className="pl-11 pr-10 py-3 w-full rounded-lg bg-white/80 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none"
    required
  />

  <button
    type="button"
    onClick={() => setShowPassword((prev) => !prev)}
    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
  >
    {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
  </button>
</div>

          </div>

          <button
            data-aos="fade-up"
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 w-full rounded-lg transition-all duration-200 shadow-md"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-700">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

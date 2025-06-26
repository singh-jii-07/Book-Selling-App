import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 via-pink-100 to-purple-200 px-4">
      <div
        data-aos="zoom-in"
        className="bg-white/30 backdrop-blur-lg shadow-2xl p-8 rounded-3xl w-full max-w-md border border-white/20"
      >
        <h2 className="text-4xl font-bold mb-6 text-center text-blue-700 drop-shadow">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[ 
            { icon: <FaUser />, name: "name", type: "text", placeholder: "Full Name" },
            { icon: <FaEnvelope />, name: "email", type: "email", placeholder: "Email Address" },
            { icon: <FaLock />, name: "password", type: "password", placeholder: "Password" },
            { icon: <FaMapMarkerAlt />, name: "address", type: "text", placeholder: "Address" },
          ].map((field, index) => (
            <div key={index} className="relative">
              <span className="absolute top-3.5 left-4 text-blue-500">{field.icon}</span>
              <input
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={formdata[field.name]}
                onChange={handleChange}
                className="pl-11 pr-4 py-3 w-full rounded-lg bg-white/80 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            data-aos="fade-up"
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 w-full rounded-lg transition-all duration-200 shadow-md"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-700">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

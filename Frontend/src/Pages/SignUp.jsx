 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      const res = await axios.post("http://localhost:4020/website/api/user/signup", formdata);
      if (res.status === 201 || res.status === 200) {
        console.log(res.data)
        alert("Signup successful!");
        navigate("/signin");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formdata.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 mb-4 w-full rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formdata.email}
            onChange={handleChange}
            className="border border-gray-300 p-2 mb-4 w-full rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formdata.password}
            onChange={handleChange}
            className="border border-gray-300 p-2 mb-4 w-full rounded"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formdata.address}
            onChange={handleChange}
            className="border border-gray-300 p-2 mb-4 w-full rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 w-full rounded"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

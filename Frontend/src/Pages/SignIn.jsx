import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/Context/AuthContext';

const Login = () => {
  const [formdata, setFormdata] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can replace this with actual validation or context logic
    if (formdata.email && formdata.password) {
      login(); // Mark user as logged in
      navigate('/profile'); // Redirect after login
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Login</h2>

      <form onSubmit={handleSubmit} className="p-2">
        <div className="py-3">
          <label className="text-black text-[16px] font-medium">Email</label>
          <input
            type="email"
            className="border border-gray-400 p-1 w-full"
            placeholder="Enter your email"
            name="email"
            required
            value={formdata.email}
            onChange={(e) => setFormdata({ ...formdata, email: e.target.value })}
          />
        </div>

        <div className="py-3">
          <label className="text-black text-[16px] font-medium">Password</label>
          <input
            type="password"
            className="border border-gray-400 p-1 w-full"
            placeholder="Enter your password"
            name="password"
            required
            value={formdata.password}
            onChange={(e) => setFormdata({ ...formdata, password: e.target.value })}
          />
        </div>

        <div>
          <button className="bg-indigo-500 text-white font-medium p-2 w-full mt-4">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

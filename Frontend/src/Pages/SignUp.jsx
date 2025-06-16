import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/Context/AuthContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formdata, setFormdata] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
  });

  const [error, setError] = useState('');

  const saveData = (e) => {
    e.preventDefault();

    const { name, email, password } = formdata;

    if (!name || !email || !password) {
      setError('All required fields must be filled.');
      return;
    }

    if (name.length < 3 || name.length > 20) {
      setError('Name must be between 3 and 20 characters.');
      return;
    }

    if (password.length < 6 || password.length > 20) {
      setError('Password must be between 6 and 20 characters.');
      return;
    }

    // Simulate successful sign-up
    login();
    navigate('/profile');
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-md rounded">
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
      {error && <p className="text-red-500 mb-3 text-sm text-center">{error}</p>}
      <form onSubmit={saveData} className="p-2">
        <div className="py-3">
          <label className="text-black text-[16px] font-medium">Name</label>
          <input
            type="text"
            className="border border-gray-400 p-1 w-full"
            placeholder="Enter your name"
            name="name"
            required
            value={formdata.name}
            onChange={(e) => setFormdata({ ...formdata, name: e.target.value })}
          />
        </div>

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

        <div className="py-3">
          <label className="text-black text-[16px] font-medium">Address</label>
          <textarea
            className="border border-gray-400 p-1 w-full"
            placeholder="Enter your address (optional)"
            rows="2"
            name="address"
            value={formdata.address}
            onChange={(e) => setFormdata({ ...formdata, address: e.target.value })}
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-medium p-2 w-full rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

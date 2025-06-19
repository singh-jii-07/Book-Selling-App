import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Sidebar = ({ data }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    localStorage.clear();
    logout();
    navigate("/signin");
  };

  if (!data) {
    return (
      <div className="bg-zinc-900 text-white p-6 rounded-xl w-full h-full shadow-lg flex justify-center items-center">
        <p className="text-zinc-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 text-white p-6 rounded-xl w-full h-full shadow-lg flex flex-col justify-between items-center">
      <div className="flex flex-col items-center flex-1 w-full">
        <img
          src={
            data.avatar ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="Avatar"
          className="h-24 w-24 rounded-full object-cover border border-zinc-700 mb-4"
        />
        <h2 className="text-lg font-semibold capitalize">{data.name}</h2>
        <p className="text-sm text-zinc-400">{data.email}</p>

        <ul className="w-full mt-6 space-y-4 text-center text-sm">
          <li>
            <Link to="/profile" className="hover:text-yellow-400 block">
              Favourites
            </Link>
          </li>
          <li>
            <Link to="/profile/orders" className="hover:text-yellow-400 block">
              Order History
            </Link>
          </li>
          
        </ul>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;

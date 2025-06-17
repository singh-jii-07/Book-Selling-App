import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ data }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <div className="bg-zinc-900 text-white p-6 rounded-xl w-full h-[100%] shadow-lg flex flex-col justify-between items-center">
      <div className="flex flex-col items-center">
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
      </div>
      <div>
        <ul className="w-full space-y-4 text-center text-sm">
          <li>
            <Link to="/profile" className="hover:text-yellow-400 block">
              Favourites
            </Link>
          </li>
          <li>
            <Link to="/orders" className="hover:text-yellow-400 block">
              Order History
            </Link>
          </li>
          <li>
            <Link to="/settings" className="hover:text-yellow-400 block">
              Settings
            </Link>
          </li>
        </ul>
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;

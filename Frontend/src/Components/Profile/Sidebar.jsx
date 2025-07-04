import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";

const Sidebar = ({ data }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    logout();
    navigate("/signin");
  };

  if (!user || !data) {
    return (
      <div className="bg-zinc-900 text-white p-6 rounded-xl w-full h-full shadow-lg flex justify-center items-center" data-aos="fade-in">
        <p className="text-zinc-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 text-white p-6 rounded-xl w-full h-96 shadow-lg flex flex-col justify-between items-center mt-10" data-aos="fade-up">
      <div className="flex flex-col items-center flex-1 w-full">
        <img
          src={data.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          alt="Avatar"
          className="h-24 w-24 rounded-full object-cover border border-zinc-700 mb-4"
          data-aos="zoom-in"
        />
        <h2 className="text-lg font-semibold capitalize" data-aos="fade-in">
          {data.name}
        </h2>
        <p className="text-sm text-zinc-400" data-aos="fade-in" data-aos-delay="100">
          {data.email}
        </p>

        {user?.role === "user" && (
          <ul className="w-full mt-6 space-y-4 text-center text-sm" data-aos="fade-up">
            <li>
              <Link to="/profile" className="hover:text-yellow-400 block">Favourites</Link>
            </li>
            <li>
              <Link to="/profile/orders" className="hover:text-yellow-400 block">Order History</Link>
            </li>
          </ul>
        )}

        {user?.role === "admin" && (
          <ul className="w-full mt-6 space-y-4 text-center text-sm" data-aos="fade-up">
            <li>
              <Link to="/profile" className="hover:text-yellow-400 block">All Orders</Link>
            </li>
            <li>
              <Link to="/AdminForm" className="hover:text-yellow-400 block">Add Book</Link>
            </li>
          </ul>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium"
        data-aos="fade-in"
        data-aos-delay="200"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;

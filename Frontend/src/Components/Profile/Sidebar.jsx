import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { FiUser, FiShoppingBag, FiHeart, FiSettings, FiLogOut, FiPlusSquare } from "react-icons/fi";

const Sidebar = ({ profile }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    logout();
    navigate("/signin");
  };

  const navItems = user?.role === "admin" ? [
    { label: "Dashboard",   icon: <FiUser />,        link: "/profile" },
    { label: "All Orders",  icon: <FiShoppingBag />, link: "/profile/orders" },
    { label: "Add Book",    icon: <FiPlusSquare />,  link: "/AdminForm" },
  ] : [
    { label: "My Profile",  icon: <FiUser />,        link: "/profile" },
    { label: "Wishlist",    icon: <FiHeart />,       link: "/wishlist" },
    { label: "My Orders",   icon: <FiShoppingBag />, link: "/profile/orders" },
    { label: "Settings",    icon: <FiSettings />,    link: "#" },
  ];

  return (
    <div className="card-dark p-6 sticky top-24">
      <div className="text-center pb-6 mb-6 border-b border-surface-border">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center text-white text-3xl font-bold shadow-glow mb-4">
          {profile?.name?.[0]?.toUpperCase() || "U"}
        </div>
        <h2 className="text-brand-text font-bold text-lg">{profile?.name || "User"}</h2>
        <p className="text-brand-muted text-sm">{profile?.email || "user@example.com"}</p>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const active = location.pathname === item.link || (item.link !== "/profile" && location.pathname.startsWith(item.link));
          return (
            <Link
              key={item.label}
              to={item.link}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
                ${active 
                  ? "bg-primary-600/20 text-primary-400 border border-primary-600/30" 
                  : "text-brand-muted hover:text-brand-text hover:bg-surface-hover"}`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm text-red-400 hover:bg-red-500/10 mt-4 border border-transparent hover:border-red-500/20"
        >
          <span className="text-lg"><FiLogOut /></span>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;

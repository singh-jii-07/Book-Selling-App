import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../Components/Profile/Sidebar";
import { useAuth } from "../Components/Context/AuthContext";

const Profile = () => {
  const { isAuthenticated, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:4020/website/api/book/getuserInfo", {
          headers: {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        setProfile(res.data);
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          toast.error("Session expired, please log in again.");
          localStorage.clear();
          logout();
        } else {
          toast.error("Failed to load profile");
        }
        setLoading(false);
      }
    };
    fetchProfile();
  }, [isAuthenticated, logout]);

  if (!isAuthenticated) return (
    <div className="min-h-screen bg-surface-bg pt-navbar flex items-center justify-center text-brand-muted">
      Please sign in to view your profile.
    </div>
  );

  if (loading) return (
    <div className="min-h-screen bg-surface-bg pt-navbar flex items-center justify-center">
      <div className="w-8 h-8 border-3 border-primary-600/30 border-t-primary-600 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-surface-bg pt-navbar">
      {/* Header */}
      <div className="bg-surface-card border-b border-surface-border">
        <div className="container-max px-4 sm:px-6 py-8 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center text-white text-2xl font-bold shadow-glow-sm">
            {profile?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-brand-text">{profile?.name}</h1>
            <p className="text-brand-muted text-sm">{profile?.email}</p>
          </div>
          {profile?.role === "admin" && (
            <span className="ml-auto bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Admin
            </span>
          )}
        </div>
      </div>

      <div className="container-max px-4 sm:px-6 py-8 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <Sidebar profile={profile} />
        </aside>
        <main className="flex-1 min-w-0">
          <Outlet />
          {/* Default view if no sub-route */}
          {window.location.pathname === "/profile" && (
            <div className="card-dark p-8 text-center">
              <h3 className="text-brand-text font-bold text-xl mb-2">Welcome back, {profile?.name}!</h3>
              <p className="text-brand-muted">Select an option from the sidebar to manage your account.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;

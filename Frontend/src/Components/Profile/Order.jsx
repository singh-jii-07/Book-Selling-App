import React from "react";
import { useAuth } from "../Context/AuthContext";
import OrderCard from "../order/OrderCard";
import Adminorder from "../order/Adminorder";

const Order = () => {
  const { user } = useAuth();
  
  return (
    <div className="card-dark p-6 md:p-8">
      <div className="mb-8 border-b border-surface-border pb-4">
        <h2 className="text-2xl font-bold text-brand-text">
          {user?.role === "admin" ? "All Platform Orders" : "My Order History"}
        </h2>
        <p className="text-brand-muted text-sm mt-1">
          {user?.role === "admin" ? "Manage and track all customer orders." : "Track the status of your recent book purchases."}
        </p>
      </div>

      {user?.role === "admin" ? <Adminorder /> : <OrderCard />}
    </div>
  );
};

export default Order;

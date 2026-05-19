import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiBox, FiClock, FiCheckCircle } from "react-icons/fi";
import { SkeletonGrid } from "../UI/SkeletonCard";
import EmptyState from "../UI/EmptyState";

const OrderCard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:4020/website/api/book/userorderbook/${userId}`, {
          headers: { id: userId, authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setOrders(res.data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserOrders();
  }, [userId]);

  if (loading) return <SkeletonGrid count={2} variant="list" />;
  
  if (!orders.length) return (
    <EmptyState
      icon="📦"
      title="No orders yet"
      subtitle="You haven't placed any orders. Discover amazing books in our collection!"
      ctaText="Browse Books"
      ctaLink="/all-books"
    />
  );

  return (
    <div className="flex flex-col gap-6">
      {orders.map((order, i) => (
        <motion.div
          key={order._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-surface-bg border border-surface-border rounded-2xl overflow-hidden"
        >
          {/* Order Header */}
          <div className="bg-surface-hover px-5 py-4 border-b border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-brand-muted text-xs uppercase tracking-wider mb-1">Order ID</p>
              <p className="text-brand-text font-medium text-sm font-mono">{order._id}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`status-badge ${
                order.status === "Order Placed" ? "status-order-placed" : 
                order.status === "Delivered" ? "status-delivered" : 
                "status-pending"
              }`}>
                {order.status === "Delivered" ? <FiCheckCircle /> : <FiClock />}
                {order.status}
              </span>
            </div>
          </div>

          {/* Books in Order */}
          <div className="p-5 flex flex-col gap-4">
            {order.book.map((bookItem) => (
              <div key={bookItem._id} className="flex gap-4 items-center">
                <Link to={`/view-details/${bookItem._id}`} className="shrink-0">
                  <img src={bookItem.url || "https://placehold.co/60x80/1E293B/7C3AED"} alt={bookItem.title} className="w-16 h-20 object-cover rounded-lg border border-surface-border" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/view-details/${bookItem._id}`}>
                    <h4 className="text-brand-text font-semibold text-sm hover:text-primary-400 transition-colors line-clamp-1">{bookItem.title}</h4>
                  </Link>
                  <p className="text-brand-muted text-xs mt-0.5">{bookItem.author}</p>
                  <p className="text-accent-500 font-bold mt-2 text-sm">₹{bookItem.price}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default OrderCard;

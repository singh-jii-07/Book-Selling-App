import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiUser, FiClock, FiCheckCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import { SkeletonGrid } from "../UI/SkeletonCard";
import EmptyState from "../UI/EmptyState";

const Adminorder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:4020/website/api/book/getorderbook', { headers });
        setOrders(res.data.data || []);
      } catch (error) {
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(`http://localhost:4020/website/api/book/updateorder/${orderId}`, { status }, { headers });
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status } : o));
      toast.success("Order status updated!");
    } catch { toast.error("Failed to update status"); }
  };

  if (loading) return <SkeletonGrid count={2} variant="list" />;
  if (!orders.length) return <EmptyState icon="📦" title="No orders found" subtitle="There are no orders on the platform yet." ctaText="Refresh" onCta={() => window.location.reload()} />;

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
          <div className="bg-surface-hover px-5 py-4 border-b border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-brand-muted text-xs uppercase tracking-wider mb-1">Order ID</p>
              <p className="text-brand-text font-medium text-sm font-mono">{order._id}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-muted text-sm flex items-center gap-1"><FiUser /> {order.user?.name || "Unknown"}</span>
            </div>
            <div>
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                className="input-dark py-1.5 px-3 text-sm min-w-[140px] cursor-pointer"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Processing">Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Books in Order */}
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {order.book.map((bookItem) => (
              <div key={bookItem._id} className="flex gap-4 items-center bg-surface-card p-3 rounded-xl border border-surface-border">
                <img src={bookItem.url || "https://placehold.co/60x80/1E293B/7C3AED"} alt={bookItem.title} className="w-12 h-16 object-cover rounded border border-surface-border" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-brand-text font-medium text-sm line-clamp-1">{bookItem.title}</h4>
                  <p className="text-brand-muted text-xs mt-0.5">{bookItem.author}</p>
                  <p className="text-accent-500 font-bold mt-1 text-sm">₹{bookItem.price}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Adminorder;

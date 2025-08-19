import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import axios from 'axios';
import 'aos/dist/aos.css';

const OrderCard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("id");
  const headers = {
    id: userId,
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    AOS.init({ duration: 800 });

    const fetchUserOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:4020/website/api/book/userorderbook/${userId}`, {
          headers,
        });
        setOrders(res.data.data);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64" data-aos="fade-in">
        <span className="text-lg text-gray-600">Loading orders...</span>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20" data-aos="zoom-in">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No Orders"
          className="w-32 h-32 mb-4 opacity-70"
        />
        <p className="text-gray-600 text-lg">No orders found</p>
      </div>
    );
  }

  return (
    <div className="p-6 mt-5">
      <h1 className="text-2xl font-semibold mb-6 text-center" data-aos="fade-down">Your Orders</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {orders.map((order, orderIndex) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            data-aos="fade-up"
            data-aos-delay={orderIndex * 100}
          >
            {order.book.map((bookItem) => (
              <div key={bookItem._id} className="mb-4 border-b pb-4 flex gap-4">
                <img
                  src={bookItem.url || "https://via.placeholder.com/100"}
                  alt={bookItem.title}
                  className="w-24 h-32 object-cover rounded"
                />
                <div>
                  <h2 className="text-xl font-bold text-indigo-700">{bookItem.title}</h2>
                  <p className="text-gray-700">Author: {bookItem.author}</p>
                  <p className="text-gray-600">Language: {bookItem.language || 'N/A'}</p>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{bookItem.description}</p>
                </div>
              </div>
            ))}
            <p className="text-sm text-right text-green-600 font-medium">
              Order Status: {order.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;

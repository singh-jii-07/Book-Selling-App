import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const baseHeaders = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch cart items when component mounts
useEffect(() => {
  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:4020/website/api/book/getCart", {
        headers: baseHeaders,
      });
      setCartItems(res.data.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  fetchCart();
}, []);

  const handleRemoveFromCart = async (bookId) => {
    try {
      await axios.put(
        `http://localhost:4020/website/api/book/deleteCart/${bookId}`,
        {},
        { headers: baseHeaders }
      );
      setCartItems((prev) => prev.filter((book) => book._id !== bookId));
    } catch (err) {
      console.error("Failed to remove from cart:", err.response?.data || err);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return <div className="p-4 text-white">Your cart is empty.</div>;
  }

  return (
    <div className="p-4 text-white bg-zinc-900 ">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.map((book) => (
          <div key={book._id} className="bg-[#2a2a2a] p-4 rounded-lg shadow-md relative">
            <Link to={`/view-details/${book._id}`}>
              <img
                src={book.url}
                alt={book.title}
                className="w-full h-64 object-cover rounded"
              />
              <h2 className="text-xl mt-2">{book.title}</h2>
              <p className="text-gray-400">{book.author}</p>
              <p className="text-yellow-400 mt-2">₹{book.price}</p>
            </Link>
            <button
              onClick={() => handleRemoveFromCart(book._id)}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 p-2 rounded-full"
              title="Remove from Cart"
            >
              <MdDelete className="text-white text-lg" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;

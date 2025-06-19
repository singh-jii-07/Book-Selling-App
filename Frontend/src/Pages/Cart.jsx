import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const baseHeaders = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4020/website/api/book/getCart",
        { headers: baseHeaders }
      );
      setCartItems(res.data.data);
    } catch (err) {
      console.error("Failed to fetch cart items:", err);
      toast.error("Unable to load your cart. Please try again later.");
    }
  };

  const handleRemove = async (bookId) => {
    try {
      await axios.put(
        `http://localhost:4020/website/api/book/deleteCart/${bookId}`,
        {},
        { headers: baseHeaders }
      );
      setCartItems((prev) => prev.filter((book) => book._id !== bookId));
      toast.success("Item removed from cart");
    } catch (err) {
      console.error("Failed to remove item:", err);
      toast.error("Failed to remove item from cart");
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((acc, book) => acc + book.price, 0);
  };

const placeorder = async () => {
  const bookIds = cartItems.map(item => item._id).filter(Boolean);

  if (bookIds.length === 0) {
    toast.error("No valid items to order");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:4020/website/api/book/orderbook",
      {
        order: bookIds
      },
      { headers: baseHeaders }
    );

    console.log(res.data);
    toast.success("Order placed successfully!");
    navigate('/profile/orders');
    setCartItems([]);
  } catch (err) {
    console.error("Failed to place order:", err);
    toast.error(err?.response?.data?.message || "Failed to place order");
  }
};




  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col px-4">
      <h1 className="text-3xl font-extrabold py-6 border-b border-gray-700">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center mt-16">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4072/4072212.png"
            alt="Empty Cart"
            className="mx-auto w-44 h-44 mb-6 opacity-80"
          />
          <h2 className="text-2xl font-bold text-gray-300 mb-2">Your Cart is Empty!</h2>
          <p className="text-gray-500 mb-6">Looks like you haven’t added anything yet.</p>
          <Link
            to="/all-books"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-full text-lg font-medium shadow-lg"
          >
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {cartItems.map((book) => (
            <div
              key={book._id}
              className="flex flex-col md:flex-row justify-between items-center bg-[#1e1e1e] rounded-xl shadow-lg p-4"
            >
              <div className="flex items-center gap-6">
                <img
                  src={book.url}
                  alt={book.title}
                  className="w-24 h-32 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-lg font-bold text-white">{book.title}</h2>
                  <p className="text-gray-400">{book.author}</p>
                </div>
              </div>
              <div className="flex items-center gap-8 mt-4 md:mt-0">
                <span className="text-xl font-semibold text-yellow-400">₹{book.price}</span>
                <button
                  onClick={() => handleRemove(book._id)}
                  className="bg-red-600 hover:bg-red-700 p-2 rounded-full shadow-md"
                >
                  <MdDelete className="text-white text-xl" />
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center bg-[#222] px-6 py-4 rounded-lg mt-6 border-t border-gray-700 shadow-inner">
            <h2 className="text-xl font-bold text-white">
              Total: <span className="text-yellow-400">₹{getTotalPrice()}</span>
            </h2>
            <button
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg disabled:opacity-50"
              onClick={placeorder}
              disabled={cartItems.length === 0}
            >
              Order Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

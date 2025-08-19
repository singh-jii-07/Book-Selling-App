import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 700 });
    fetchCart();
  }, []);

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

      // Initialize quantity to 1 for each item
      const cartWithQuantities = res.data.data.map((item) => ({
        ...item,
        quantity: 1,
      }));

      setCartItems(cartWithQuantities);
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

  const handleAddMore = (bookId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === bookId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleSubtract = (bookId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === bookId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((acc, book) => acc + book.price * book.quantity, 0);
  };

  const placeorder = async () => {
    const bookIds = cartItems
      .flatMap((item) => Array(item.quantity).fill(item._id))
      .filter(Boolean);

    if (bookIds.length === 0) {
      toast.error("No valid items to order");
      return;
    }

    try {
      await axios.post(
        "http://localhost:4020/website/api/book/orderbook",
        { order: bookIds },
        { headers: baseHeaders }
      );

      toast.success("Order placed successfully!");
      navigate("/profile/orders");
      setCartItems([]);
    } catch (err) {
      console.error("Failed to place order:", err);
      toast.error(err?.response?.data?.message || "Failed to place order");
    }
  };

   return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f0f0f] to-gray-900 text-white flex flex-col px-4 py-10 mt-10">
      <h1
        data-aos="fade-down"
        className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 drop-shadow-lg"
      >
        🛒 Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div data-aos="fade-up" className="text-center mt-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4072/4072212.png"
            alt="Empty Cart"
            className="mx-auto w-48 h-48 mb-8 opacity-90 drop-shadow-xl"
          />
          <h2 className="text-3xl font-bold text-gray-300 mb-2">Oops! Cart is Empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven’t added anything yet.</p>
          <Link
            to="/all-books"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition-transform px-8 py-3 rounded-full text-lg font-medium shadow-xl"
          >
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {cartItems.map((book, i) => (
            <div
              key={book._id}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row justify-between items-center transition hover:scale-[1.02]"
            >
              <div className="flex items-center gap-6">
                <img
                  src={book.url}
                  alt={book.title}
                  className="w-24 h-32 object-cover rounded-xl shadow-md"
                />
                <div>
                  <h2 className="text-2xl font-bold text-white">{book.title}</h2>
                  <p className="text-gray-400 mt-1">{book.author}</p>
                </div>
              </div>
              <div className="flex items-center gap-8 mt-6 md:mt-0">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleSubtract(book._id)}
                    className="w-8 h-8 bg-yellow-600 hover:bg-yellow-700 text-white text-xl font-bold rounded-full shadow transition"
                    title="Decrease"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold text-yellow-400">
                    ₹{book.price} × {book.quantity}
                  </span>
                  <button
                    onClick={() => handleAddMore(book._id)}
                    className="w-8 h-8 bg-green-600 hover:bg-green-700 text-white text-xl font-bold rounded-full shadow transition"
                    title="Add"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemove(book._id)}
                  className="bg-red-600 hover:bg-red-700 p-2 rounded-full shadow-md transition"
                  title="Remove"
                >
                  <MdDelete className="text-white text-xl" />
                </button>
              </div>
            </div>
          ))}

          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="flex justify-between items-center backdrop-blur-lg bg-white/10 px-8 py-5 rounded-2xl shadow-xl mt-10 border-t border-gray-600"
          >
            <h2 className="text-2xl font-bold text-white">
              Total: <span className="text-yellow-400 drop-shadow-md">₹{getTotalPrice()}</span>
            </h2>
            <button
              onClick={placeorder}
              disabled={cartItems.length === 0}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-3 rounded-full text-lg font-bold shadow-xl transition hover:scale-105 disabled:opacity-40"
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
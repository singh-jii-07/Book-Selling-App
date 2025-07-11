import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaCartPlus, FaStar } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAuthenticated, user } = useAuth();

  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const HandleFavourite = async () => {
    try {
      await axios.put(
        "http://localhost:4020/website/api/book/addFavourite",
        {},
        { headers }
      );
      toast.success("Book added to favourites!");
    } catch (error) {
      console.error("Failed to add to favourites:", error);
    }
  };

  const HandleCart = async () => {
    try {
      await axios.put(
        "http://localhost:4020/website/api/book/addCart",
        {},
        { headers }
      );
      toast.success("Book added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const DeleteBook = async () => {
    await axios.delete("http://localhost:4020/website/api/book/deletBook", {
      headers,
    });
    toast.success("Book deleted successfully");
    navigate("/all-books");
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    axios
      .get(`http://localhost:4020/website/api/book/bookbyId/${id}`)
      .then((res) => {
        setBook(res.data.data);
        setLoading(false);

        // Load previous rating from localStorage
        const savedRating = localStorage.getItem(`rating-${id}`);
        if (savedRating) {
          setUserRating(Number(savedRating));
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load book details");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <div className="text-center text-white mt-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f1f1f] via-[#2a2a2a] to-[#1f1f1f] text-white flex justify-center items-center px-6 py-12">
      <div
        className="max-w-6xl w-full flex flex-col md:flex-row gap-12 bg-[#2a2a2a] rounded-xl shadow-2xl p-8 border border-zinc-700"
        data-aos="zoom-in"
      >
        {/* Left - Book Image & Actions */}
        <div className="md:w-1/2 flex justify-center items-center flex-col" data-aos="fade-right">
          <img
            src={book?.url || "https://via.placeholder.com/300x400"}
            alt={book?.title || "Book Cover"}
            className="w-[300px] h-[400px] object-cover rounded-xl shadow-xl border-2 border-indigo-500 transition-transform duration-300 hover:scale-105"
          />

          {isAuthenticated && user?.role === "user" && (
            <div className="flex gap-4 mt-6">
              <button
                onClick={HandleFavourite}
                className="bg-red-600 hover:bg-red-700 p-3 rounded-full shadow-md transition"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <FaHeart className="text-white text-xl" />
              </button>
              <button
                onClick={HandleCart}
                className="bg-green-600 hover:bg-green-700 p-3 rounded-full shadow-md transition"
                data-aos="fade-up"
                data-aos-delay="150"
              >
                <FaCartPlus className="text-white text-xl" />
              </button>
            </div>
          )}

          {isAuthenticated && user?.role === "admin" && (
            <div className="flex gap-4 mt-6">
              
              <button
                className="bg-red-600 hover:bg-red-700 p-3 rounded-full shadow-md transition"
                data-aos="fade-up"
                data-aos-delay="150"
                onClick={DeleteBook}
              >
                <MdDelete className="text-white text-xl" />
              </button>
            </div>
          )}
        </div>

    
        <div className="md:w-1/2 flex flex-col justify-center" data-aos="fade-left">
          <h1 className="text-4xl font-extrabold mb-3 text-center md:text-left text-indigo-300 drop-shadow">
            {book?.title || "Title not available"}
          </h1>

          <p className="text-gray-300 mb-4 text-center md:text-left">
            by{" "}
            <span className="text-pink-400 font-medium">
              {book?.author || "Unknown Author"}
            </span>
          </p>

          <p className="text-gray-400 mb-4 text-center md:text-left leading-relaxed">
            {book?.description || "No description provided."}
          </p>

          <div className="flex items-center gap-2 mt-4 justify-center md:justify-start">
            <span className="text-sm text-gray-400">🌐 Language:</span>
            <span className="text-sm text-gray-200">English</span>
          </div>

          <h2 className="text-2xl font-bold text-yellow-400 mt-6 text-center md:text-left">
            ₹ {book?.price || 0}
          </h2>

          
          <div className="mt-6">
            <h3 className="text-md text-gray-300 mb-2">Rate this book:</h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={24}
                  className={`cursor-pointer transition transform hover:scale-110 ${
                    (hoverRating || userRating) >= star
                      ? "text-yellow-400"
                      : "text-gray-500"
                  }`}
                  onClick={() => {
                    setUserRating(star);
                    localStorage.setItem(`rating-${id}`, star);
                  }}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
            </div>
            {userRating > 0 && (
              <p className="text-sm text-green-400 mt-2">
                You rated this book {userRating} ⭐
              </p>
            )}
          </div>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-200 shadow-md hover:shadow-lg mt-6 self-start"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

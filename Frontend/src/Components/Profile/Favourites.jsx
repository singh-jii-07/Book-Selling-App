import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);

  const baseHeaders = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4020/website/api/book/getfavourite",
          { headers: baseHeaders }
        );
        setFavourites(res.data.data);
      } catch (err) {
        console.error("Failed to fetch favourites:", err);
      }
    };

    fetchFavourites();
  }, []);
const handleRemoveFavourite = async (bookId) => {
  try {
    await axios.put(
      "http://localhost:4020/website/api/book/deletFavourite",
      {},
      {
        headers: {
          ...baseHeaders,
          bookid: bookId,
        },
      }
    );

    // Update local state to remove deleted favourite
    setFavourites((prev) => prev.filter((book) => book._id !== bookId));
  } catch (err) {
    console.error("Failed to remove favourite:", err.response?.data || err);
  }
};

  if (!favourites || favourites.length === 0) {
    return <div className="p-4 text-white">No favourites found.</div>;
  }

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Your Favourites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favourites.map((book) => (
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
              onClick={() => handleRemoveFavourite(book._id)}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 p-2 rounded-full"
              title="Remove from Favourites"
            >
              <MdDelete className="text-white text-lg" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;

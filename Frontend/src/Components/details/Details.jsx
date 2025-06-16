import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:4020/website/api/book/bookbyId/${id}`)
      .then((res) => {
        setBook(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load book details');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center text-white mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="min-h-screen bg-[#1f1f1f] text-white flex justify-center items-center px-6 py-12">
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-12 bg-[#2a2a2a] rounded-xl shadow-lg p-8">
        
        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={book?.url || 'https://via.placeholder.com/300x400'}
            alt={book?.title || 'Book Cover'}
            className="w-[300px] h-[400px] object-cover rounded-xl shadow-xl border border-gray-600 transition-transform duration-300 hover:scale-105"
          />
        </div>

       
        <div className="md:w-1/2 flex flex-col justify-center">
          

          <h1 className="text-3xl font-bold mb-2 text-center md:text-left">
            {book?.title || "Title not available"}
          </h1>

          <p className="text-gray-300 mb-4 text-center md:text-left">
            by <span className="text-indigo-400">{book?.author || "Unknown Author"}</span>
          </p>

          <p className="text-gray-400 mb-4 text-center md:text-left">
            {book?.description || "No description provided."}
          </p>

          <div className="flex items-center gap-2 mt-4 justify-center md:justify-start">
            <span className="text-sm text-gray-400">🌐 Language:</span>
            <span className="text-sm text-gray-200">English</span>
          </div>

          <h2 className="text-xl font-semibold text-yellow-400 mt-6 text-center md:text-left">
            Price : ₹{book?.price || 0}
          </h2>
        <button
  onClick={() => navigate(-1)}
  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-200 shadow-md hover:shadow-lg mb-6 self-start mt-2"
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

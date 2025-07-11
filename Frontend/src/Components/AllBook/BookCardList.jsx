import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

const BookCardList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    axios
      .get('http://localhost:4020/website/api/book/getAll')
      .then((response) => {
        const allBooks = response.data.data || [];
        setBooks(allBooks);
        setFilteredBooks(allBooks);
        setLoading(false);
      })
      .catch((err) => {
        console.error('API Error:', err);
        setError('Failed to fetch books.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let updatedBooks = books;

    
    if (searchQuery.trim() !== '') {
      updatedBooks = updatedBooks.filter((book) =>
        `${book.title} ${book.author}`.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    
    switch (priceFilter) {
      case 'below200':
        updatedBooks = updatedBooks.filter((book) => book.price < 200);
        break;
      case '200to500':
        updatedBooks = updatedBooks.filter((book) => book.price >= 200 && book.price <= 500);
        break;
      case 'above500':
        updatedBooks = updatedBooks.filter((book) => book.price > 500);
        break;
      default:
        break;
    }

    setFilteredBooks(updatedBooks);
  }, [searchQuery, priceFilter, books]);

  if (loading) return <div className="text-center p-6 text-lg font-medium animate-pulse">Loading books…</div>;
  if (error) return <div className="text-center text-red-500 p-6">{error}</div>;

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto mt-5">
      <h2
        className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 mb-12"
        data-aos="fade-down"
      >
        📚 All Books
      </h2>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-10">
        <input
          type="text"
          placeholder="Search by title or author..."
          className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="w-full sm:w-1/4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="all">All Prices</option>
          <option value="below200">Below ₹200</option>
          <option value="200to500">₹200 - ₹500</option>
          <option value="above500">Above ₹500</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <Link to={`/view-details/${book._id}`} key={book._id}>
              <div
                className="bg-white rounded-2xl shadow-lg border border-zinc-200 hover:shadow-2xl hover:border-indigo-400 transition duration-300 transform hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <div className="overflow-hidden border-4 border-indigo-400 rounded-xl">
                  <img
                    src={
                      book.url ||
                      'https://via.placeholder.com/150x200.png?text=No+Image'
                    }
                    alt={book.title}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="mt-4 text-center px-2 pb-4">
                  <h3 className="text-lg font-semibold text-indigo-700 hover:underline transition">
                    {book.title}
                  </h3>
                  <p className="text-sm italic text-zinc-500 mt-1">{book.author}</p>
                  <p className="mt-2 text-lg font-bold text-yellow-600">₹{book.price}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No books found.</div>
        )}
      </div>
    </div>
  );
};

export default BookCardList;

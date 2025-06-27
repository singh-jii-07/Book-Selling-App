import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

const BookCardList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    axios.get('http://localhost:4020/website/api/book/getAll')
      .then(response => {
        setBooks(response.data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('API Error:', err);
        setError('Failed to fetch books.');
        setLoading(false);
      });
  }, []);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {books.map((book, index) => (
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
                    'https://imgs.search.brave.com/KNx0ZoMmuEjxh77ewTIY3mKvbCs-SPFRFuclV8-A4WI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM1/NDQ0MTk5Ni9waG90/by9pbWFnZS1vZi1v/cGVuLWFudGlxdWUt/Ym9vay1vbi13b29k/ZW4tdGFibGUtd2l0/aC1nbGl0dGVyLW92/ZXJsYXkuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPWdBXzdS/QjdPbERtRGl3RW1T/emhwckZCRHZvd0sy/aERfLWVqZi1zdGtP/cEE9'
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
        ))}
      </div>
    </div>
  );
};

export default BookCardList;

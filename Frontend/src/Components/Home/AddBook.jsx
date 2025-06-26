import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    axios.get('http://localhost:4020/website/api/book/getFour')
      .then(response => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
        setError('Failed to load books.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4 text-center text-lg">Loading books…</p>;
  if (error) return <p className="p-4 text-red-500 text-center text-lg">{error}</p>;

  return (
    <div className="px-4 py-12 max-w-7xl mx-auto">
      <h2
        className="text-4xl font-extrabold text-center bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-10"
        data-aos="fade-down"
      >
        📚 Recently Added Books
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {books.map((book, index) => (
          <Link to={`/view-details/${book._id}`} key={book._id}>
            <div
              className="bg-white rounded-2xl shadow-lg border border-zinc-200 hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="p-4 flex flex-col items-center">
                <div className="border-4 border-yellow-300 rounded-xl overflow-hidden w-full">
                  <img
                    src={book.url || 'https://imgs.search.brave.com/KNx0ZoMmuEjxh77ewTIY3mKvbCs-SPFRFuclV8-A4WI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM1/NDQ0MTk5Ni9waG90/by9pbWFnZS1vZi1v/cGVuLWFudGlxdWUt/Ym9vay1vbi13b29k/ZW4tdGFibGUtd2l0/aC1nbGl0dGVyLW92/ZXJsYXkuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPWdBXzdS/QjdPbERtRGl3RW1T/emhwckZCRHZvd0sy/aERfLWVqZi1zdGtP/cEE9'}
                    alt={book.title}
                    className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="mt-4 text-center w-full">
                  <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:underline transition duration-200">
                    {book.title}
                  </h3>
                  <p className="text-sm italic text-zinc-500 mt-1">{book.author}</p>
                  <p className="mt-2 text-lg font-semibold text-yellow-500 drop-shadow">
                    ₹{book.price}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BooksList;

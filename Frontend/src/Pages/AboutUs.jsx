import React from 'react';
import {
  FaBook,
  FaRocket,
  FaShoppingCart,
  FaUser,
  FaLock,
  FaSearch,
} from 'react-icons/fa';

const About = () => {
  return (
    <div className="bg-black text-white min-h-screen animate-fadeIn">
      
      <div className="relative">
        <img
          src="https://imgs.search.brave.com/K6CpDI9b7Q0ACZR5foIdxE6AZVtEUfCaRCZMBj9AslM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMS8w/MS8yMS8xNS81NC9i/b29rcy01OTM3NzE2/XzY0MC5qcGc"
          alt="Books Banner"
          className="w-full h-80 object-cover opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-100 drop-shadow-lg">
            About Book Bazaar
          </h1>
        </div>
      </div>

      
      <div className="max-w-6xl mx-auto px-6 py-14 md:px-20 space-y-12">
       
        <div className="text-center animate-fadeUp">
          <p className="text-lg mb-4">
            <strong className="text-yellow-100">Welcome to Book Bazaar – Your One-Stop Destination for Books!</strong>
          </p>
          <p className="text-zinc-300 max-w-3xl mx-auto">
            At Book Bazaar, we believe in the power of reading and the joy of discovering new books.
            Our platform is designed to simplify and modernize the way you buy books online.
            Whether you're a passionate reader or a casual browser – this space is built for you.
          </p>
        </div>

       
        <div className="h-1 w-32 mx-auto bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full animate-pulse"></div>

       
        <div className="animate-fadeUp">
          <h2 className="text-2xl font-semibold mb-3 text-yellow-100 flex items-center gap-2">
            <FaRocket /> Our Mission
          </h2>
          <p className="text-zinc-300">
            To make books more accessible, affordable, and enjoyable for everyone by offering a
            seamless, secure, and user-friendly online book shopping experience.
          </p>
        </div>

       
        <div className="animate-fadeUp">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-100 flex items-center gap-2">
            <FaBook /> What We Offer
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: <FaBook />, text: 'A vast collection of books, neatly categorized' },
              { icon: <FaSearch />, text: 'Smart search and filters' },
              { icon: <FaUser />, text: 'Personalized user dashboard' },
              { icon: <FaShoppingCart />, text: 'Secure cart and easy checkout' },
              { icon: <FaLock />, text: 'Admin panel for managing inventory and orders' },
            ].map((item, idx) => (
              <li
                key={idx}
                className="bg-zinc-900 p-4 rounded-lg flex items-center gap-3 hover:border-yellow-300 hover:shadow-yellow-400/30 border border-transparent transition-all duration-300"
              >
                <span className="text-yellow-300 text-xl">{item.icon}</span>
                <span className="text-zinc-200">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center space-y-4 animate-fadeUp">
          <p className="text-lg font-medium">
            Whether you're here to buy your next favorite novel or explore exciting new titles –
            <strong className="text-yellow-100"> Book Bazaar is your go-to place for book discovery.</strong>
          </p>
          <p className="text-yellow-100 italic">
            Let’s build a smarter reading community, together!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

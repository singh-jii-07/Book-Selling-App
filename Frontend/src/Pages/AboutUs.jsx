import React from 'react';

const About = () => {
  return (
    <div className="bg-black text-white min-h-screen px-6 py-12 md:px-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-yellow-100">About Book Bazaar</h1>
        
        <p className="text-lg mb-6">
          <strong>Welcome to Book Bazaar – Your One-Stop Destination for Books!</strong>
        </p>
        
        <p className="mb-6">
          At Book Bazaar, we believe in the power of reading and the joy of discovering new books.
          Our platform is designed to simplify and modernize the way you buy books online. Whether
          you’re a passionate reader, a casual browser, or someone on a mission to find that one
          perfect book – we’ve built this space just for you.
        </p>

        <h2 className="text-2xl font-semibold mb-2 text-yellow-100">🎯 Our Mission</h2>
        <p className="mb-6">
          To make books more accessible, affordable, and enjoyable for everyone by offering a
          seamless, secure, and user-friendly online book shopping experience.
        </p>

        <h2 className="text-2xl font-semibold mb-2 text-yellow-100">🚀 What We Offer</h2>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>A vast collection of books, neatly categorized for easy exploration</li>
          <li>Intuitive search and filter features to help you find what you love</li>
          <li>Personal user dashboards to track orders and manage your profile</li>
          <li>A secure cart and checkout experience</li>
          <li>Admin control panel for efficient inventory and order management</li>
        </ul>

      

        <p className="mt-10 text-lg font-medium text-white">
          Whether you're here to buy your next favorite novel, manage your past orders, or simply browse through our growing catalog – <strong>Book Bazaar is the place for every book lover.</strong>
        </p>

        <p className="mt-4 text-yellow-100 italic">
          Let’s build a smarter reading community, together!
        </p>
      </div>
    </div>
  );
};

export default About;

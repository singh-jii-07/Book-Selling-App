import React from "react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden h-[85vh] bg-gradient-to-br from-black via-zinc-900 to-zinc-800 px-6 md:px-12 lg:px-20 py-10 flex flex-col lg:flex-row items-center animate-fadeIn">
      
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-yellow-500 opacity-20 rounded-full blur-3xl z-0 animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-3xl z-0 animate-pulse"></div>

      
      <div className="w-full lg:w-1/2 z-10 flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-yellow-100 leading-tight tracking-tight drop-shadow">
          Discover Your <span className="text-yellow-300">Next Great Read</span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-zinc-300 max-w-xl leading-relaxed font-light">
          Dive into a world of captivating stories, enriching knowledge, and timeless inspiration with our curated book collection.
        </p>
        <button className="mt-4 text-base lg:text-lg text-black font-semibold bg-yellow-300 hover:bg-yellow-400 px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
          Explore Books
        </button>
      </div>

      
      <div className="w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center items-center z-10">
        <img
          src="https://imgs.search.brave.com/xdA0I3p5gtG3MXQO7LFWlvn8Y8lnAFnnBbtygCHwn34/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNS8w/Ny8yNy8yMC8xNi9i/b29rLTg2MzQxOF82/NDAuanBn"
          alt="Books Illustration"
          className="w-[90%] max-w-md rounded-xl shadow-2xl object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    </section>
  );
};

export default Hero;

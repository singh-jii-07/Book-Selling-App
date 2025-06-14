import React from "react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden h-[80vh] bg-gradient-to-br from-black via-zinc-900 to-zinc-800 px-6 md:px-12 lg:px-20 py-10 flex flex-col lg:flex-row items-center">
    
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-yellow-100 leading-tight tracking-tight">
          Discover Your <span className="font-semibold">Next Great Read</span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-zinc-300 max-w-xl leading-relaxed">
          Dive into a world of captivating stories, enriching knowledge, and timeless inspiration with our carefully curated book collection.
        </p>
        <button className="mt-4 text-sm sm:text-base lg:text-lg text-yellow-100 font-medium border border-yellow-100 px-6 py-3 rounded-full hover:bg-yellow-100 hover:text-black transition-all duration-300">
          Explore Books
        </button>
      </div>

      <div className="w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center items-center overflow-hidden">
        <img
          src="https://imgs.search.brave.com/Nf2b-RQx6ifoEn-JJBvYgkvBZHpFsyR7hfTUWy43WpM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bW9zLmNtcy5mdXR1/cmVjZG4ubmV0L29m/VlR0cUF2SEs2S1hB/ZWpEWnM2NEYuanBn"
          alt="Books Illustration"
          className="w-[90%] max-w-md rounded-xl shadow-lg object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="absolute inset-0 pointer-events-none"></div>
    </section>
  );
};

export default Hero;

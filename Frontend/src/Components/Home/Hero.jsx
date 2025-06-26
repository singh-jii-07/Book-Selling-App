import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[90vh] bg-gradient-to-br from-black via-zinc-900 to-zinc-800 px-6 md:px-12 lg:px-24 py-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
      
      {/* Glowing Circles */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-400 opacity-20 rounded-full blur-3xl z-0 animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-3xl z-0 animate-pulse"></div>

      {/* Text Content */}
      <div
        className="z-10 w-full lg:w-1/2 text-center lg:text-left"
        data-aos="fade-right"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-yellow-100 leading-tight tracking-tight drop-shadow-xl">
          Discover Your <br />
          <span className="text-yellow-300">Next Great Read</span>
        </h1>

        <p className="mt-6 text-lg lg:text-xl text-zinc-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
          Unlock a universe of stories, wisdom, and imagination — all in one place.
        </p>

        <button className="mt-8 inline-block bg-yellow-300 text-black font-bold px-8 py-3 rounded-full text-lg shadow-md hover:shadow-xl hover:bg-yellow-400 transition-all duration-300">
          Explore Books
        </button>
      </div>

      {/* Hero Image */}
      <div
        className="z-10 w-full lg:w-1/2 flex justify-center items-center"
        data-aos="fade-left"
      >
        <img
          src="https://imgs.search.brave.com/xdA0I3p5gtG3MXQO7LFWlvn8Y8lnAFnnBbtygCHwn34/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNS8w/Ny8yNy8yMC8xNi9i/b29rLTg2MzQxOF82/NDAuanBn"
          alt="Books Illustration"
          className="w-[85%] max-w-md rounded-3xl shadow-2xl transition-transform duration-500 hover:scale-105"
        />
      </div>
    </section>
  );
};

export default Hero;

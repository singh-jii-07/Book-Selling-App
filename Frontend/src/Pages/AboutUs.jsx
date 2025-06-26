import React, { useEffect } from 'react';
import {
  FaBook,
  FaRocket,
  FaShoppingCart,
  FaUser,
  FaLock,
  FaSearch,
  FaStar
} from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const features = [
  { icon: <FaBook />, text: 'Wide range of categorized books' },
  { icon: <FaSearch />, text: 'Advanced search and filter tools' },
  { icon: <FaUser />, text: 'Custom user dashboard experience' },
  { icon: <FaShoppingCart />, text: 'Secure cart and simple checkout' },
  { icon: <FaLock />, text: 'Admin tools for inventory & orders' },
  { icon: <FaStar />, text: 'Top-rated recommendations just for you' }
];

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-gradient-to-b from-zinc-900 via-black to-zinc-800 text-white min-h-screen">
      <header className="relative">
        <img
          src="https://imgs.search.brave.com/K6CpDI9b7Q0ACZR5foIdxE6AZVtEUfCaRCZMBj9AslM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMS8w/MS8yMS8xNS81NC9i/b29rcy01OTM3NzE2/XzY0MC5qcGc"
          alt="Books Banner"
          className="w-full h-80 object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <h1
            className="text-4xl md:text-6xl font-bold text-yellow-300 tracking-tight drop-shadow-xl"
            data-aos="zoom-in"
          >
            About Book Bazaar
          </h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 space-y-20 md:px-10">
        <section className="text-center space-y-4" data-aos="fade-up">
          <h2 className="text-2xl md:text-3xl font-semibold text-yellow-200">
            Your One-Stop Destination for Books
          </h2>
          <p className="text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            At Book Bazaar, we believe in the joy of reading and the impact of good stories.
            From passionate bookworms to curious explorers, our platform brings everyone closer to the world of books with modern tools and a seamless experience.
          </p>
        </section>

        <section data-aos="fade-right">
          <h3 className="text-xl font-semibold text-yellow-300 flex items-center gap-3 mb-4">
            <FaRocket /> Our Mission
          </h3>
          <p className="text-zinc-400 leading-loose">
            We aim to revolutionize book shopping by offering an intuitive, affordable, and enjoyable digital experience — making literature accessible for all.
          </p>
        </section>

        <section data-aos="fade-left">
          <h3 className="text-xl font-semibold text-yellow-300 flex items-center gap-3 mb-4">
            <FaBook /> What We Offer
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 hover:shadow-lg hover:border-yellow-300 transition-all"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="text-yellow-400 text-2xl mb-2">{item.icon}</div>
                <p className="text-zinc-200 font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center space-y-3" data-aos="fade-up">
          <p className="text-lg text-zinc-300">
            Whether you're hunting your next favorite novel or just exploring —
            <span className="text-yellow-300 font-semibold"> Book Bazaar is where your book journey begins.</span>
          </p>
          <p className="italic text-yellow-100">
            Let’s turn every page together, one story at a time.
          </p>
        </section>
      </main>
    </div>
  );
};

export default About;

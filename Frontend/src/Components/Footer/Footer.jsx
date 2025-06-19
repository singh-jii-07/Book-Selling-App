import logo from '../../assets/logo.jpg';
import { Link } from "react-router-dom";
import { FaInstagram, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white  border-t border-zinc-700">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm">
        
       
        <div>
          <Link to="/" className="flex items-center gap-3 mb-3">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
            <h1 className="text-2xl font-bold">
              Book<span className="text-yellow-400">Bazaar</span>
            </h1>
          </Link>
          <p className="text-gray-300 leading-relaxed">
            Your one-stop destination to explore, buy, and enjoy books across genres. 
            Fuel your imagination and intellect with every read!
          </p>
        </div>

        
        <div>
          <h3 className="font-semibold text-yellow-400 mb-4">Navigate</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
            <li><Link to="/about" className="hover:text-yellow-400">About Us</Link></li>
            <li><Link to="/all-books" className="hover:text-yellow-400">All Books</Link></li>
            
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-yellow-400 mb-4">Explore</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/bestsellers" className="hover:text-yellow-400">Bestsellers</Link></li>
            <li><Link to="/new-arrivals" className="hover:text-yellow-400">New Arrivals</Link></li>
            <li><Link to="/categories" className="hover:text-yellow-400">Categories</Link></li>
            
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-yellow-400 mb-4">Support</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/faq" className="hover:text-yellow-400">FAQ</Link></li>
            <li><Link to="/privacy" className="hover:text-yellow-400">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-yellow-400">Terms & Conditions</Link></li>
            
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-700 py-6 flex justify-center gap-6">
        <Link to="#" className="hover:scale-110 transition-transform">
          <FaInstagram size={22} className="text-white hover:text-yellow-400" />
        </Link>
        <Link to="#" className="hover:scale-110 transition-transform">
          <FaYoutube size={22} className="text-white hover:text-yellow-400" />
        </Link>
        <Link to="#" className="hover:scale-110 transition-transform">
          <FaLinkedin size={22} className="text-white hover:text-yellow-400" />
        </Link>
        <Link to="#" className="hover:scale-110 transition-transform">
          <FaGithub size={22} className="text-white hover:text-yellow-400" />
        </Link>
      </div>

      <div className="text-center text-xs text-gray-400 py-5 border-t border-zinc-800">
        © 2025 · Made with ❤️ by <span className="text-yellow-400 font-medium">Nilesh Kumar Singh</span> · Fueling your reading journey.
      </div>
    </footer>
  );
};

export default Footer;

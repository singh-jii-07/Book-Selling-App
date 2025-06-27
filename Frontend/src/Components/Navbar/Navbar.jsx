import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import { FaBarsStaggered } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { useAuth } from '../Context/AuthContext'; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth(); 

  const commonLinks = [
    { name: 'Home', link: '/' },
    { name: 'About Us', link: '/about' },
    { name: 'All-Books', link: '/all-books' },
  ];

  const privateLinks = [
    { name: 'Cart', link: '/cart' },
    { name: 'Profile', link: '/profile' },
  ];

  const links = isAuthenticated ? [...commonLinks, ...privateLinks] : commonLinks;

  return (
    <div className='bg-zinc-800 text-white px-8 py-2 flex items-center justify-between fixed top-0 left-0 w-full z-20 shadow-lg'>
    
      <Link to="/" className='flex items-center gap-2'>
        <img src={logo} alt="Logo" className='w-10 h-10' />
        <h1 className='text-2xl font-semibold'>
          Book<span className='text-yellow-400'>Bazaar</span>
        </h1>
      </Link>


      <div className='hidden md:flex items-center gap-6'>
        <ul className='flex gap-6'>
          {links.map((item, index) => (
            <li key={index}>
              <Link to={item.link} className='hover:text-yellow-400 duration-200'>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {!isAuthenticated && (
          <div className='flex gap-4'>
            <Link
              to="/signin"
              className='px-3 py-1 border-yellow-400 border rounded-xl hover:bg-white hover:text-zinc-800 transition-all duration-300'
            >
              SignIn
            </Link>

            <Link
              to="/signup"
              className='px-3 py-1 bg-yellow-400 rounded-xl hover:bg-white hover:text-zinc-800 transition-all duration-300'
            >
              SignUp
            </Link>
          </div>
        )}
      </div>


      <div className='md:hidden'>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <IoClose className='text-3xl' />
          ) : (
            <FaBarsStaggered className='text-2xl' />
          )}
        </button>
      </div>

     
      {menuOpen && (
        <div className='absolute top-full left-0 w-full bg-zinc-800 text-white px-8 py-4 flex flex-col gap-4 md:hidden z-10'>
          <ul className='flex flex-col gap-4'>
            {links.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.link}
                  onClick={() => setMenuOpen(false)}
                  className='block hover:text-yellow-400 duration-200'
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          
          {!isAuthenticated && (
            <div className='flex flex-col gap-3 pt-2'>
              <Link
                to="/signin"
                onClick={() => setMenuOpen(false)}
                className='px-3 py-1 border-yellow-400 border rounded-xl text-center hover:bg-white hover:text-zinc-800 transition-all duration-300'
              >
                SignIn
              </Link>

              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className='px-3 py-1 bg-yellow-400 rounded-xl text-center hover:bg-white hover:text-zinc-800 transition-all duration-300'
              >
                SignUp
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;

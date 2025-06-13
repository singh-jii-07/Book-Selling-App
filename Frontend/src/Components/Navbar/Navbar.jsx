import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.jpg'
const Navbar = () => {
  const links = [
    { name: "Home", link: "/home" },
    { name: "About Us", link: "/about" },
    { name: "All-Books", link: "/all-books" },
    { name: "Cart", link: "/cart" },
    { name: "Profile", link: "/profile" },
  ]

  return (
    <div className='bg-zinc-800 text-white px-8 py-2 flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        <img src={logo} alt="Logo" className='w-10 h-10' />
        <h1 className='text-2xl font-semibold'>Book
            <span className='text-yellow-400'>Bazaar</span></h1>
      </div>

<div className='flex items-center gap-4'>
   <ul className='flex gap-6'>
        {links.map((item, index) => (
          <li key={index}>
            <Link to={item.link} className='hover:text-yellow-400 duration-200'>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
   <div className=' flex gap-4'>
    <button className='px-2 py-1 border-yellow-400 border rounded-xl  hover:bg-white hover:text-zinc-800 transition-all duration-300'>
  SignIn
    </button>
    <button className=' px-2 py-1 bg-yellow-400 rounded-xl hover:bg-white hover:text-zinc-800 transition-all duration-300'>
 SignUp
    </button>
   </div>
</div>
    </div>
  )
}

export default Navbar
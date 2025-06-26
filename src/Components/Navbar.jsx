import React from 'react'
import { NavLink } from 'react-router-dom'
import {useState} from 'react'
import logo from '../assets/vite.svg'

const Navbar = ({onSearch,onHomeClick}) => {
  const [searchQuery, setSearchQuery]= useState('');
  const handleChange= (e) =>{
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  }

  return (
    <nav
      className="bg-black px-4 sm:px-8 py-3 shadow-md "
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-y-4">  
        <div className="flex items-center gap-0.5">
          <img src={logo} alt="Popcorns Logo" className="w-7 h-7" />
          <div className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text drop-shadow-lg transition-all duration-300">
            Popcorns
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full sm:w-auto">
          <span className="text-xl text-white font-semibold hover:text-blue-400 transition-colors duration-200 cursor-pointer" onClick={onHomeClick}>
            <NavLink to="/" className={({ isActive }) => isActive ? "text-yellow-400" : "text-white"} > Home </NavLink>
          </span>
          <span className="text-xl text-white font-semibold hover:text-blue-400 transition-colors duration-200 cursor-pointer">
            <NavLink to="/favourites" className={({ isActive }) => isActive ? "text-yellow-400" : "text-white"}> Favourites </NavLink>
          </span>
          <span className="text-xl text-white font-semibold hover:text-blue-400 transition-colors duration-200 cursor-pointer">
            <NavLink to="/popular" className={({ isActive }) => isActive ? "text-yellow-400" : "text-white"}> Popular </NavLink>
          </span>
          <span className="text-xl text-white font-semibold hover:text-blue-400 transition-colors duration-200 cursor-pointer">
            <NavLink to="/watchlist" className={({ isActive }) => isActive ? "text-yellow-400" : "text-white"}>
              Watchlist
            </NavLink>
          </span>
          <input
            className="bg-gray-800 text-ye rounded-full px-6 py-2.5 text-lg outline-none focus:ring-2 focus:ring-yellow-400 shadow transition-all duration-200 w-full sm:w-80 placeholder-gray-400"
            type="text"
            value={searchQuery}
            placeholder="Search movies..."
            onChange={handleChange}
          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar

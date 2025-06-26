import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-black text-gray-400 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-4">
              Popcorns
            </h3>
            <p className="text-sm">
              Your ultimate destination for discovering and tracking your favorite movies.
              Browse, search, and create your personal collection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link to="/popular" className="hover:text-blue-400 transition-colors duration-200">Popular Movies</Link>
              </li>
              <li>
                <Link to="/favourites" className="hover:text-blue-400 transition-colors duration-200">Your Favourites</Link>
              </li>
            </ul>
          </div>

          {/* Powered By */}
          <div>
            <h4 className="text-white font-semibold mb-4">Powered By</h4>
            <div className="flex items-center space-x-4">
              <a 
                href="https://www.themoviedb.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                TMDB API
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Popcorns. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
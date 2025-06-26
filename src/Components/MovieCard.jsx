import React, { useState } from 'react'

const MovieCard = ({
  poster = "https://via.placeholder.com/300x450?text=Movie+Poster",
  title = "Movie Title",
  year = "2024",
  genre = "Action, Adventure",
  onFavourite = () => {},
  isFavourite = false,
  onWatchlist = () => {},
  isWatchlisted = false,
}) => {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleFavouriteClick = () => {
    setIsAnimating(true)
    onFavourite()
    setTimeout(() => setIsAnimating(false), 300)
  }

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg overflow-hidden flex flex-col w-full max-w-[250px] mx-auto transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-700/30">
      <div className="relative w-full aspect-[5/6] overflow-hidden rounded-t-xl bg-slate-200">
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-fill"
        />
        <button
          onClick={handleFavouriteClick}
          className={`absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg hover:bg-pink-50 transition-all duration-300 ${
            isAnimating ? 'scale-125' : ''
          }`}
        >
          {isFavourite ? (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="#f43f5e" 
              viewBox="0 0 24 24" 
              className={`w-5 h-5 transition-all duration-300 ${
                isAnimating ? 'scale-110 rotate-12' : ''
              }`}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          ) : (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              stroke="#f43f5e" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              className={`w-5 h-5 transition-all duration-300 ${
                isAnimating ? 'scale-110 -rotate-12' : ''
              }`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          )}
        </button>
      </div>
      <div className="p-2.5 flex flex-col flex-1 bg-gradient-to-b from-slate-800/95 to-slate-900/95 backdrop-blur-sm">
        <h2 className="text-base font-bold text-slate-100 mb-1 truncate">{title}</h2>
        <p className="text-slate-400 text-sm mb-2">{year} &bull; {genre}</p>
        <button
          onClick={onWatchlist}
          className={`mt-auto px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors duration-200 ${
            isWatchlisted 
              ? 'bg-yellow-600 text-white' 
              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
          }`}
        >
          {isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </button>
      </div>
    </div>
  )
}

export default MovieCard

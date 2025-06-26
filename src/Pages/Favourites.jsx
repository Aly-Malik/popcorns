import React from 'react'
import Navbar from '../Components/Navbar'
import MovieCard from '../Components/MovieCard'
import { useMovieContext } from '../context/MovieContext'

const Favourites = () => {
  const { favourites, toggleFavourite } = useMovieContext()

  const removeAllFavourites = () => {
    favourites.forEach(movie => toggleFavourite(movie))
  }

  return (
    <>
      <Navbar />
      {favourites.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-900 rounded-lg shadow-lg mt-10 mx-auto max-w-md">
          <h2 className="text-white text-2xl font-semibold mb-2">No Favourites Yet</h2>
          <p className="text-gray-400 text-lg">Add some movies to your favourites to see them here.</p>
        </div>
      ) : (
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-6 container mx-auto">
            <h1 className="text-3xl font-bold text-white">Your Favourite Movies</h1>
            <button
              onClick={removeAllFavourites}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Remove All
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 justify-items-center container mx-auto">
            {favourites.map(movie => (
              <MovieCard
                key={movie.id}
                poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                title={movie.title}
                year={movie.release_date?.slice(0, 4)}
                genre={movie.genre}
                isFavourite={true}
                onFavourite={() => toggleFavourite(movie)}
                page='favourites'
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Favourites

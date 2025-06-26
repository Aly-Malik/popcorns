import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import MovieCard from '../Components/MovieCard'
import { useMovieContext } from '../context/MovieContext'

const Watchlist = () => {
  const { watchlist, toggleWatchlist } = useMovieContext()
  const [genres, setGenres] = useState({})
  const API_KEY = 'b7c4813f0c2e57f571935c549a35fa2d'

  useEffect(() => {
    // Fetch genres
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        const genreMap = {}
        data.genres.forEach(g => {
          genreMap[g.id] = g.name
        })
        setGenres(genreMap)
      })
  }, [])

  const removeAllWatchlist = () => {
    watchlist.forEach(movie => toggleWatchlist(movie))
  }

  return (
    <>
      <Navbar />
      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-900 rounded-lg shadow-lg mt-10 mx-auto max-w-md">
          <h2 className="text-white text-2xl font-semibold mb-2">Your Watchlist is Empty</h2>
          <p className="text-gray-400 text-lg">Add some movies to your watchlist!</p>
        </div>
      ) : (
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-6 container mx-auto">
            <h1 className="text-3xl font-bold text-white">Your Watchlist</h1>
            <button
              onClick={removeAllWatchlist}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              Remove All
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 justify-items-center container mx-auto">
            {watchlist.map(movie => (
              <MovieCard
                key={movie.id}
                poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                title={movie.title}
                year={movie.release_date?.slice(0, 4)}
                genre={movie.genre_ids?.map(id => genres[id]).filter(Boolean).join(', ')}
                isWatchlisted={true}
                onWatchlist={() => toggleWatchlist(movie)}
                page='watchlater'
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Watchlist
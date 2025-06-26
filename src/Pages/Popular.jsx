import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import MovieCard from '../Components/MovieCard'
import { useMovieContext } from '../context/MovieContext'

const Popular = () => {
  const [popularMovies, setPopularMovies] = useState([])
  const API_KEY = 'b7c4813f0c2e57f571935c549a35fa2d'
  const { toggleFavourite, toggleWatchlist, isFavourite, isWatchlisted } = useMovieContext()

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`)
      .then(res => res.json())
      .then(data => {
        // Get only top 10 movies
        setPopularMovies(data.results.slice(0, 10))
      })
  }, [])

  return (
    <>
      <Navbar />
      <div className="px-4 py-6">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Top 10 Popular Movies</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 justify-items-center container mx-auto">
          {popularMovies.map(movie => (
            <MovieCard
              key={movie.id}
              poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              title={movie.title}
              year={movie.release_date?.slice(0, 4)}
              genre={movie.genre_ids?.join(', ')}
              isFavourite={isFavourite(movie.id)}
              onFavourite={() => toggleFavourite(movie)}
              isWatchlisted={isWatchlisted(movie.id)}
              onWatchlist={() => toggleWatchlist(movie)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Popular

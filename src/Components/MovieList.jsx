import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import Navbar from './Navbar'
import { useMovieContext } from '../context/MovieContext'

const API_KEY = 'b7c4813f0c2e57f571935c549a35fa2d'

const MovieList = () => {
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [genres, setGenres] = useState({})
  const [visibleCount, setVisibleCount] = useState(20); // show first 20 (4 rows if 5 per row)

  const { toggleFavourite, toggleWatchlist, isFavourite, isWatchlisted } = useMovieContext()

  useEffect(() => {
    // Fetch genres and movies in parallel
    const fetchData = async () => {
      const [genreRes, movieRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`),
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      ])
      const genreData = await genreRes.json()
      const movieData = await movieRes.json()

      // Map genre IDs to names for quick lookup
      const genreMap = {}
      genreData.genres.forEach(g => {
        genreMap[g.id] = g.name
      })

      setGenres(genreMap)
      setMovies(movieData.results)
      setFilteredMovies(movieData.results) // <-- Set filteredMovies here!
    }
    fetchData()
  }, [])

  // Filter movies whenever searchQuery or movies changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredMovies(movies)
    } else {
      setFilteredMovies(
        movies.filter(movie =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }
  }, [searchQuery, movies])
  const handleSearch = async (query) => {
      if (!query.trim()) {
      setFilteredMovies(movies)
      return
    }
     try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    setFilteredMovies(data.results || []);
  } catch (error) {
    console.error('Search failed:', error);
    setFilteredMovies([]);
  }
 
};
 const handleHomeClick = () => {
  setSearchQuery('');
  setFilteredMovies(movies); // Reset to all movies
 };
 


  return (
    <div>
      <Navbar
        onSearch={handleSearch}
        onHomeClick={handleHomeClick}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 justify-items-center container mx-auto">
          {filteredMovies.slice(0, visibleCount).map(movie => (
            <MovieCard
              key={movie.id}
              poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              title={movie.title}
              year={movie.release_date?.slice(0, 4)}
              genre={movie.genre_ids
                .map(id => genres[id])
                .filter(Boolean)
                .join(', ')}
              isFavourite={isFavourite(movie.id)}
              onFavourite={() => toggleFavourite(movie)}
              isWatchlisted={isWatchlisted(movie.id)}
              onWatchlist={() => toggleWatchlist(movie)}
            />
          ))}
        </div>
      </div>
      {visibleCount < filteredMovies.length && (
  <div className="flex justify-center mt-6">
    <button
      onClick={() => setVisibleCount(visibleCount + 10)} // show 2 more rows (5 per row)
      className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded"
    >
      Show More
    </button>
  </div>
)}

    </div>
    
  )
}

export default MovieList

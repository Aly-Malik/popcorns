import React, { createContext, useState, useContext, useEffect } from 'react';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(() => {
    return JSON.parse(localStorage.getItem('favourites')) || []
  });
  
  const [watchlist, setWatchlist] = useState(() => {
    return JSON.parse(localStorage.getItem('watchlist')) || []
  });

  const toggleFavourite = (movie) => {
    setFavourites(prev => {
      const exists = prev.some(m => m.id === movie.id);
      const newFavs = exists 
        ? prev.filter(m => m.id !== movie.id)
        : [...prev, movie];
      localStorage.setItem('favourites', JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const toggleWatchlist = (movie) => {
    setWatchlist(prev => {
      const exists = prev.some(m => m.id === movie.id);
      const movieData = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        genre_ids: movie.genre_ids
      };
      const newList = exists
        ? prev.filter(m => m.id !== movie.id)
        : [...prev, movieData];
      localStorage.setItem('watchlist', JSON.stringify(newList));
      return newList;
    });
  };

  return (
    <MovieContext.Provider value={{
      favourites,
      watchlist,
      toggleFavourite,
      toggleWatchlist,
      isFavourite: (id) => favourites.some(m => m.id === id),
      isWatchlisted: (id) => watchlist.some(m => m.id === id)
    }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);
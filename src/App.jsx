import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeMovies from './Pages/HomeMovies';
import Favourites from './Pages/Favourites';
import Popular from './Pages/Popular';
import Watchlist from './Pages/Watchlist';
import Footer from './Components/Footer';
import { MovieProvider } from './context/MovieContext';

function App() {
  return (
    <MovieProvider>
      <div className="bg-gradient-to-br from-slate-800 to-slate-800 min-h-screen text-white font-poppins flex flex-col">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeMovies />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </MovieProvider>
  );
}

export default App;

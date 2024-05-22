import React from 'react'
import { useSelector } from 'react-redux';
import CarouselSection from './CarouselSection';

function SearchContent() {
    const moviesByName = useSelector(state => state.movie.moviesByName);
    const searchInput = useSelector(state => state.search.searchInput);
  return (
    <div className="animate-fade-in pt-28 pb-20 px-14">
            <h2 className="text-4xl text-white mb-6">Search Results for "{searchInput}"</h2>
            
            <CarouselSection title={`Results for "${searchInput}"`} movies={moviesByName} />
          </div>  
  )
}

export default SearchContent
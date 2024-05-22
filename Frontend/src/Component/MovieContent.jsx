import React from 'react'
import { useSelector } from 'react-redux';
import CarouselSection from './CarouselSection';
import HeroSection from './HeroSection';

function MovieContent() {
    const moviesByCategory = useSelector(state => state.movie.moviesByCategory);
    const MoviesTopRated = useSelector(state => state.movie.MoviesTopRated);
  const recommendMovies = useSelector(state => state.movie.MoviesRecommended);
  const categories = useSelector(state => state.category.categories);

  return (
    <>
      <HeroSection page="home" movie={recommendMovies[2] || []} />
            <div className='px-10'>
              <CarouselSection title="Matched to You" movies={recommendMovies || []} />
              <CarouselSection title="Top 5 movies in your Region Today" movies={MoviesTopRated || {}} />
              {categories.map(category => (
                <CarouselSection key={category} title={category} movies={moviesByCategory[category] || {}} />
              ))}
            </div>
    </>
  )
}

export default MovieContent
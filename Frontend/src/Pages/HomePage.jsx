// src/Pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CarouselSection from '../Component/CarouselSection';
import HeroSection from '../Component/HeroSection';
import Header from '../Component/Header';
import MovieModal from '../Modal/MovieModal';
import { recommendMoviesByCategory, recommendMoviesByName, recommendedMovies, top_rated_movies } from '../Store/Features/movieSlice';
import LoadingScreen from '../Component/LoadingScreen';

function HomePage() {
  const dispatch = useDispatch();
  const moviesByCategory = useSelector(state => state.movie.moviesByCategory);
  const statusRecommendedMoviesByName = useSelector(state => state.movie.statusRecommendedMoviesByName);
  const MoviesTopRated = useSelector(state => state.movie.MoviesTopRated);
  const recommendMovies = useSelector(state => state.movie.MoviesRecommended);
  const statusRecommendedMovies = useSelector(state => state.movie.statusRecommendedMovies);
  const statusMoviesTopRated = useSelector(state => state.movie.statusMoviesTopRated);
  const statusCatMovies = useSelector(state => state.movie.statusCatMovies);
  const error = useSelector(state => state.movie.error);
  const bgHero = useSelector(state => state.home.bgHero);
  const rememberMe = useSelector(state => state.login.rememberMe);
  const isSearchActive = useSelector(state => state.search.isSearchActive);
  const searchInput = useSelector(state => state.search.searchInput);
  const moviesByName = useSelector((state) => state.movie.moviesByName);
  const categories = [
    "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary",
    "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Musical",
    "Mystery", "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western"
  ];

  useEffect(() => {
    if (statusCatMovies === 'idle') {
      dispatch(recommendMoviesByCategory({ categories, rememberMe }));
    }
    if (statusRecommendedMovies === 'idle') {
      dispatch(recommendedMovies({ rememberMe }));
    }
    if (statusMoviesTopRated === 'idle') {
      dispatch(top_rated_movies({ rememberMe }));
    }
    if (statusRecommendedMoviesByName === "idle"||statusRecommendedMoviesByName === "succeeded") {
        dispatch(
          recommendMoviesByName({
            movieName: searchInput
          })
        );
      
    }
  }, [dispatch, statusCatMovies, statusRecommendedMovies, statusMoviesTopRated, categories, rememberMe ,isSearchActive]);

  const isLoading = statusCatMovies === 'loading' ||
    statusRecommendedMovies === 'loading' ||
    statusMoviesTopRated === 'loading ';

  if (isLoading) {
    return <div>
      <LoadingScreen />
    </div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="bg-black min-h-screen">
        <div>
          <Header />
        </div>
        {isSearchActive ? (
            <div className="animate-fade-in pt-28 pb-20 px-14">
              <h2 className="text-4xl text-white mb-6">Search Results for "{searchInput}"</h2>
              <CarouselSection title={`Results for "${searchInput}"`} movies={moviesByName || []} />
            </div>
          ) : (
            <>
          <div className=''>
            <HeroSection page="home" movie={recommendMovies[2]||[]}/>
          </div>
              <div className='px-10'>
              <CarouselSection title="Matched to You" movies={recommendMovies || []} />
              <CarouselSection title="Top 5 movies in your Region Today" movies={MoviesTopRated || {}} />
              {categories.map((category) => (
                <CarouselSection key={category} title={category} movies={moviesByCategory[category] || {}} />
              ))}
              </div>
            </>
          )}
        </div>
      <MovieModal />
    </>
  );
}

export default HomePage;

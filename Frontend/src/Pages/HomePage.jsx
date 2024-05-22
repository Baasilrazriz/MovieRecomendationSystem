import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../Component/Header';
import MovieModal from '../Modal/MovieModal';
import { recommendMoviesByCategory, recommendMoviesByName, recommendedMovies, top_rated_movies } from '../Store/Features/movieSlice';
import LoadingScreen from '../Component/LoadingScreen';

import MovieContent from '../Component/MovieContent';
import SearchContent from '../Component/SearchContent';

function HomePage() {
  const dispatch = useDispatch();
  const statusRecommendedMovies = useSelector(state => state.movie.statusRecommendedMovies);
  const statusMoviesTopRated = useSelector(state => state.movie.statusMoviesTopRated);
  const statusCatMovies = useSelector(state => state.movie.statusCatMovies);
  const error = useSelector(state => state.movie.error);
  const rememberMe = useSelector(state => state.login.rememberMe);
  const isSearchActive = useSelector(state => state.search.isSearchActive);
  
  
  const categories = useSelector(state => state.category.categories);
  
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
  }, [dispatch, statusCatMovies, statusRecommendedMovies, statusMoviesTopRated, categories, rememberMe]);

  const isLoading = statusCatMovies === 'loading' || statusRecommendedMovies === 'loading' || statusMoviesTopRated === 'loading';

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="bg-black min-h-screen">
        <Header />
        {isSearchActive ? (
          <SearchContent />
        ) : (
          <>
          <MovieContent />
          </>
        )}
      </div>
      <MovieModal />
    </>
  );
}

export default HomePage;

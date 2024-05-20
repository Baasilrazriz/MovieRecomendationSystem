import React, { useEffect, useState } from 'react';
import CarouselSection from '../Component/CarouselSection';
import HeroSection from '../Component/HeroSection';
import Header from '../Component/Header';
import { useDispatch, useSelector } from 'react-redux';
import MovieModal from '../Modal/MovieModal';
import { InitialRecommendedMovies, recommendMoviesByCategory, recommendedMovies } from '../Store/Features/movieSlice';


function HomePage() {
  const dispatch = useDispatch();
  const moviesByCategory = useSelector(state => state.movie.moviesByCategory);
  const initialRecommendMovies = useSelector(state => state.movie.moviesByCategory);
  const recommendMovies = useSelector(state => state.movie.moviesByCategory);
  const statusRecommendedMovies = useSelector(state => state.movie.statusRecommendedMovies);
  const statusInitialRecommendedMovies = useSelector(state => state.movie.statusInitialRecommendedMovies);
  const statusCatMovies = useSelector(state => state.movie.statusCatMovies);
  const error = useSelector(state => state.movie.error);
  const bgHero = useSelector((state) => state.home.bgHero);
  const [loading, setLoading] = useState(false);
  

  const categories = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Sport",
    "Thriller",
    "War",
    "Western"
  ];
  const rememberMe = useSelector((state) => state.login.rememberMe);
  useEffect( () => {
    
    if (statusCatMovies === 'idle') {
      
      dispatch(recommendMoviesByCategory(categories,rememberMe));
    }
    if (statusRecommendedMovies === '') {

      dispatch(recommendedMovies(rememberMe));
    }
      if (statusInitialRecommendedMovies === 'idle') {

        dispatch(InitialRecommendedMovies(rememberMe));
      }
    
   
  
  }, [dispatch]);
  console.log(recommendMovies)
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="bg-black min-h-screen">
        <div style={{ backgroundImage: `${bgHero}` }}>
          <Header />
          <HeroSection />
        </div>

        <div className="px-8">
        {/* <CarouselSection title="Matched to You" movies={recommendMovies} />
        <CarouselSection title="Top 10 movies in the U.S. Today" movies={initialRecommendMovies} /> */}
          {categories.map((category) => (
            <CarouselSection key={category} title={category} movies={moviesByCategory[category] || []} />
          ))}
        </div>
      </div>
      <MovieModal />
    </>
  );
}

export default HomePage;

// src/Component/HeroSection.jsx
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, recommendMoviesByName } from '../Store/Features/movieSlice';

const HeroSection = (props) => {
  const dispatch = useDispatch();
  const bgHero = useSelector((state) => state.home.bgHero);  
  const image = props.movie.poster_url || '';
  const statusRecommendedMoviesByName = useSelector(
    (state) => state.movie.statusRecommendedMoviesByName
  );
  const handleMovieClick = useCallback((movie) => {
    dispatch(openModal(movie));
    if (statusRecommendedMoviesByName === "idle"||statusRecommendedMoviesByName === "succeeded") {
      if (movie) {
        dispatch(
          recommendMoviesByName({
            movieName: movie.movie_title
          })
        );
      }
    }
  },[props.movie.movie_title]);
  return (
    <div className={`relative ${props.page === "home" ? "h-[85vh] bg-fill bg-center" : "h-[45vh] bg-cover bg-center "} `} style={{ backgroundImage: `${props.page==="home"?`${bgHero}`:`url(${image})`}` }}>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      <div className='flex flex-col justify-end h-full items-start'>
        <div className="z-10 p-8 text-white max-w-md">
          <h1 className="text-5xl font-bold">{props.movie.movie_title || "HOUSE OF NINJAS"}</h1>
          <p className="mt-4 text-lg">Years after retiring from their ninja lives, a dysfunctional family must return to the shadows...</p>
          <div className="mt-4 space-x-2">
            <a className="bg-gradient-to-r from-red-800 to-red-600 text-white hover:scale-95 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 px-4 py-2 font-bold rounded" href={props.movie.movie_imdb_link || "http://www.imdb.com/title/tt0325980/?ref_=fn_tt_tt_1"} >Play</a>
            {props.page==="home"? <button onClick={() => handleMovieClick(props.movie)} className="bg-gradient-to-r from-gray-800 to-gray-600 text-white px-4 py-2 font-bold rounded hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-500">More Info</button>:<></>}  
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

import React, { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal, recommendMoviesByName } from "../Store/Features/movieSlice";

import Header from "../Component/Header.jsx";

function FavouritesPage() {
  const dispatch = useDispatch();
  const movieUserHistory = useSelector((state) => state.movie.movieUserHistory);
  const statusRecommendedMoviesByName = useSelector(
    (state) => state.movie.statusRecommendedMoviesByName
  );
  const isHistory = useSelector((state) => state.movie.isHistory);
  const username = useSelector((state) => state.login.username);

  const handleMovieClick = useCallback(
    (movie) => {
      dispatch(openModal(movie));
      if (
        statusRecommendedMoviesByName === "idle" ||
        statusRecommendedMoviesByName === "succeeded"
      ) {
        if (movie) {
          dispatch(recommendMoviesByName({ movieName: movie.movie_title }));
        }
      }
    },
    [dispatch, statusRecommendedMoviesByName]
  );

  return (
    <div>
      <div className="bg-black min-h-screen">
        <Header />
        <div className="animate-fade-in pt-28 pb-20 px-14">
          <h2 className="text-4xl text-white mb-6">Your Favourites</h2>

          <div className="flex justify-center items-center flex-wrap">
            {Array.isArray(movieUserHistory) && movieUserHistory.length > 0 ? (
              Object.values(movieUserHistory).map((movie, index) => (
                <div
                  key={index}
                  className="px-2 cursor-pointer"
                  onClick={() => handleMovieClick(movie)}
                >
                  <img
                    src={movie.poster_url ? movie.poster_url : ""}
                    alt={movie.movie_title}
                    className="w-full rounded"
                  />
                  <p className="mt-2 text-white">{movie.movie_title}</p>
                </div>
              ))
            ) : (
              <p className="text-white">No movies in your Favourites</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo (FavouritesPage);

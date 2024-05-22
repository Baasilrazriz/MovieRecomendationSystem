import React, { memo } from "react";
import { useSelector } from "react-redux";
import Header from "../Component/Header.jsx";
import CarouselSection from "../Component/CarouselSection.jsx";

function HistoryPage() {
  const movieUserHistory = useSelector((state) => state.movie.movieUserHistory);
  const username = useSelector((state) => state.login.username);

  

  return (
    <div className="bg-black min-h-screen w-screen overflow-hidden">
      <Header />
      <div className="animate-fade-in pt-28 pb-20 px-14">
        <h2 className="text-4xl text-white mb-6">Your Watch History</h2>
        <CarouselSection title={`${username}'s Watch History`} movies={movieUserHistory || []} />
      </div>
    </div>
  );
}

export default (HistoryPage);

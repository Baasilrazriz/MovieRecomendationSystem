import React from 'react'

function MovieCard({ image, name, imdbScore, handleAddToWatchList }) {
  return (
    <div className="card">
    <img src={image} alt={name} className="w-full h-60 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-gray-600">IMDB Score: {imdbScore}</p>
      <button onClick={handleAddToWatchList} className="mt-2 p-2 bg-blue-500 text-white">
        Add to Watchlist
      </button>
    </div>
  </div>
  )
}

export default MovieCard
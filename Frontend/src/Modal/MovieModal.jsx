import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { XIcon } from '@heroicons/react/solid';
import { closeModal } from '../Store/Features/movieSlice';

const MovieModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.movie.isOpen);
  const movieData =  {
    title: 'House of Ninjas',
    year: '2024',
    rating: 'TV-MA',
    info: '3 Seasons',
    ranking: '#2 in TV Shows Today',
    description: 'Years after retiring from their formidable ninja lives, a dysfunctional family must return to shadowy missions to counteract a string of looming threats.',
    cast: ['Kento Kaku', 'Yosuke Eguchi', 'Tae Kimura'],
    genres: ['TV Dramas', 'Japanese', 'TV Thrillers'],
    thisShowIs: ['Dark', 'Suspenseful', 'Exciting'],
    maturityRating: 'TV-MA',
    tags: ['smoking', 'violence'],
    similarMovies: [
      { title: 'Rurouni Kenshin', img: 'https://via.placeholder.com/150', rating: 'TV-MA', year: '2021' },
      { title: 'Oldboy', img: 'https://via.placeholder.com/150', rating: 'TV-MA', year: '2021' },
      // Add more similar movies as needed
    ],
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-black text-white max-w-4xl w-full p-8 rounded-lg overflow-y-auto max-h-[90vh]">
        <button onClick={() => dispatch(closeModal())} className="absolute top-4 right-4">
          <XIcon className="h-6 w-6 text-white" />
        </button>
        <div>
         <div className='h- w-full overflow-hidden'>
         <img 
            src="https://m.media-amazon.com/images/M/MV5BODM0ODg1NDI0NF5BMl5BanBnXkFtZTcwMjk0NzA0MQ@@._V1_SX300.jpg" 
            alt="House of Ninjas" 
            className="w-full h-full object-cover rounded-md mb-4"
          />
           </div>
            <div>
         <h2 className="text-4xl font-bold mb-2">{movieData.title}</h2>
      <div className="flex items-center space-x-2 text-sm mb-4">
        <span>{movieData.year}</span>
        <span>•</span>
        <span>{movieData.rating}</span>
        <span>•</span>
        <span>{movieData.info}</span>
        <span>•</span>
        <span>{movieData.ranking}</span>
      </div>
          </div>
          <p className="mb-4">{movieData.description}</p>
      <div className="mb-4">
        <h3 className="font-semibold">Cast:</h3>
        <p>{movieData.cast.join(', ')}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Genres:</h3>
        <p>{movieData.genres.join(', ')}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">This show is:</h3>
        <p>{movieData.thisShowIs.join(', ')}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Maturity rating:</h3>
        <p>{movieData.maturityRating}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Tags:</h3>
        <p>{movieData.tags.join(', ')}</p>
      </div>
      <div>
      <h3 className="font-semibold mb-2">More Like This:</h3>
      <div className="grid grid-cols-3 gap-4">
        {movieData.similarMovies.map((movie, index) => (
          <div key={index} className="flex flex-col items-center">
            <img src={movie.img} alt={movie.title} className="w-full rounded-md mb-2" />
            <div className="text-center">
              <h4 className="font-semibold">{movie.title}</h4>
              <p className="text-sm text-gray-400">{movie.rating} • {movie.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;

// src/components/HeroSection.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../Store/Features/movieSlice';
  

const HeroSection = () => {
    const dispatch = useDispatch();

  return (
    <div className="relative h-[70vh] bg-cover bg-center" >
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      <div className="relative z-10 p-8 text-white max-w-md">
        <h1 className="text-5xl font-bold">HOUSE OF NINJAS</h1>
        <p className="mt-4 text-lg">Years after retiring from their period as ninja lives, a dysfunctional family must return to the shadows...</p>
        <div className="mt-4 space-x-2">
          <a className="bg-white text-black px-4 py-2 font-bold rounded" href="http://www.imdb.com/title/tt0325980/?ref_=fn_tt_tt_1" >Play</a>
          <button  onClick={() => dispatch(openModal())}  className="bg-gray-700 text-white px-4 py-2 font-bold rounded">More Info</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

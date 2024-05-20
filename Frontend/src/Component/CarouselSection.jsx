// src/components/CarouselSection.jsx
import React from 'react';
import Slider from 'react-slick';

const CarouselSection = ({ title, movies }) => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      }
    ]
  };
console.log(movies)
  return (
    <div className="py-8">
      <h2 className="text-2xl  text-white mb-4">{title}</h2>
      <Slider {...settings}>
        {movies.map((movie, index) => (
          <div key={index} className="px-2">
            <img src={movie.poster_url?movie.poster_url:"https://m.media-amazon.com/images/M/MV5BODM0ODg1NDI0NF5BMl5BanBnXkFtZTcwMjk0NzA0MQ@@._V1_SX300.jpg"} alt={movie.title} className="w-full rounded" />
            <p className="mt-2 text-white">{movie.title}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselSection;

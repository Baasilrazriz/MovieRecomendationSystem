import React from 'react'
import CarouselSection from '../Component/CarouselSection'
import HeroSection from '../Component/HeroSection'
import Header from '../Component/Header'
import { useDispatch, useSelector } from 'react-redux';
import MovieModal from '../Modal/MovieModal';

const moviesData = [
    { title: 'Movie 1', image: 'https://m.media-amazon.com/images/M/MV5BODM0ODg1NDI0NF5BMl5BanBnXkFtZTcwMjk0NzA0MQ@@._V1_SX300.jpg' },
    { title: 'Movie 2', image: 'https://m.media-amazon.com/images/M/MV5BODM0ODg1NDI0NF5BMl5BanBnXkFtZTcwMjk0NzA0MQ@@._V1_SX300.jpg' },
    { title: 'Movie 3', image: 'https://m.media-amazon.com/images/M/MV5BODM0ODg1NDI0NF5BMl5BanBnXkFtZTcwMjk0NzA0MQ@@._V1_SX300.jpg' },
    // Add more movie objects
  ];
function HomePage() {

    const bgHero = useSelector((state) => state.home.bgHero);
  return (
<>
<div className="bg-black min-h-screen">
      <div style={{ backgroundImage: `${bgHero}` }}>
      <Header />
      <HeroSection />
      </div>
      <MovieModal />
      <div className="px-8">
        <CarouselSection title="Matched to You" movies={moviesData} />
        <CarouselSection title="New on Netflix" movies={moviesData} />
        <CarouselSection title="Top 10 movies in the U.S. Today" movies={moviesData} />
        <CarouselSection title="We Think You’ll Love These" movies={moviesData} />
        <CarouselSection title="Animation" movies={moviesData} />
        <CarouselSection title="Inspiring Movies" movies={moviesData} />
        <CarouselSection title="Continue Watching" movies={moviesData} />
        <CarouselSection title="Watch in One Weekend" movies={moviesData} />
        <CarouselSection title="Critically Acclaimed Movies" movies={moviesData} />
        <CarouselSection title="Today's Fresh Picks for You" movies={moviesData} />
        <CarouselSection title="Adult Animation" movies={moviesData} />
      </div>
    </div>
</>
  )
}

export default HomePage
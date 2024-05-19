// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-transparent py-4 px-8 flex items-center justify-between">
      <div className="text-red-600 text-3xl font-bold">NETFLIX</div>
      <nav className="space-x-4 text-white">
        <a href="#" className="hover:underline">Home</a>
        <a href="#" className="hover:underline">TV Shows</a>
        <a href="#" className="hover:underline">Movies</a>
        <a href="#" className="hover:underline">New & Popular</a>
        <a href="#" className="hover:underline">My List</a>
        <a href="#" className="hover:underline">Browse by Languages</a>
      </nav>
    </header>
  );
};

export default Header;

import React, { useEffect, useState, startTransition } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

function LandingPage() {
  const bg = useSelector((state) => state.landing.bg);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const sections = useSelector((state) => state.landing.sections);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Check if scrolled past top
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll); // Cleanup
  }, []);

  const handleSignInClick = () => {
    startTransition(() => {
if(isLoggedIn)
  navigate('/home');
else
navigate('/login');
}
  
  )
  };

  return (
    <div id="Landing" className="bg-gray-600 relative min-h-screen text-white flex flex-col items-center justify-center overflow-hidden">
      <div className="w-screen h-[99vh]" style={{ backgroundImage: `${bg}` }}>
        <header className={`z-50 w-screen p-6 px-20 flex justify-between items-center ${isScrolled ? 'backdrop-blur-xl' : 'backdrop-blur-xs'} bg-transparent fixed top-0`}>
          <NavLink to='/' className="text-red-600 text-4xl font-bold">BASFLIX</NavLink>
          <button onClick={handleSignInClick} className="bg-gradient-to-r from-red-800 to-red-600 text-white font-bold hover:scale-95 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 px-4 py-2 rounded">Sign In</button>
        </header>
        <main className="flex flex-col items-center mt-64">
          <h1 className="text-5xl font-bold text-center">
            Unlimited movies, TV shows, and more.
          </h1>
          <h2 className="text-2xl font-semibold text-center mt-4">
            Watch anywhere. Cancel anytime.
          </h2>
          <div className="mt-6">
            <button onClick={handleSignInClick} className="bg-gradient-to-r from-red-800 to-red-600 text-white font-bold px-10 py-4 rounded-md hover:scale-95 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500">
              Get Started
            </button>
          </div>
        </main>
      </div>
      <div className='w-screen'>
        <div className='mt-2'>
          {sections.map((sec) => (
            <div className='bg-black' id={sec.name} key={sec.name}>
              <img className='h-full w-full object-cover' src={sec.image} alt={sec.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

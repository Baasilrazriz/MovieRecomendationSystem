import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const bg = useSelector((state) => state.landing.bg);
    const banner = useSelector((state) => state.landing.banner);
    const sections = useSelector((state) => state.landing.sections);
    const nav=useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 0); // Check if scrolled past top
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => window.removeEventListener('scroll', handleScroll); // Cleanup
    }, []);
  return (
    <>
<div className="relative min-h-screen  text-white flex flex-col items-center justify-center ">
   <div className={`w-screen h-screen`} style={{ backgroundImage: `${bg}` }}>
   <header className={`z-50 w-screen p-6 flex justify-between items-center ${isScrolled ? 'bg-black' : 'bg-transparent'} fixed top-0`}>
        <div className="text-3xl pl-10 font-bold">Basflix</div>
        <button onClick={()=>{nav("/login"); }} className="bg-gradient-to-r from-red-800 to-red-600    text-white font-bold   hover:scale-95 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 px-4 py-2 rounded">Sign In</button>
      </header>
      <main className="flex flex-col items-center  mt-60 ">
        <h1 className="text-5xl font-bold text-center">
          Unlimited movies, TV shows, and more.
        </h1>
        <h2 className="text-2xl font-semibold text-center mt-4">
          Watch anywhere. Cancel anytime.
        </h2>
        <div className="mt-6">
          <button onClick={()=>{nav("/login"); }} className="bg-gradient-to-r from-red-800 to-red-600    text-white font-bold  px-10 py-4 rounded-md hover:scale-95 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500" >
            Get Started
          </button>
        </div>
      </main>
   </div>
   <div className='w-screen'>
   <div className='absolute top-[39rem] left-28  bg-black '>
    <img className='h-full w-full object-cover' src={banner} alt="" srcset="" />
   </div>
   <div>
    
   {sections.map((sec) => (
    <div className='bg-black' id={sec.name}>
    <img  className='h-full w-full object-cover ' src={sec.image} alt="" srcset="" />
   </div>
                     
    ))}
   </div>
   </div>


    </div>
</>
  )
}

export default LandingPage
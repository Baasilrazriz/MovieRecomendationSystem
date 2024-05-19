// src/components/Header.jsx
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { setRememberMe, toggleUserDropdown } from '../Store/Features/loginSlice';
const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    console.log("login:"+isLoggedIn)
    const profilepic = useSelector((state) => state.login.profilepic);
    const username = useSelector((state) => state.login.username);
    const userDropdownOpen = useSelector((state) => state.login.userDropdownOpen);
    console.log("userDropdownOpen:"+userDropdownOpen)
    const userDropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
              
          // Close the user dropdown if a click occurs outside of it
          if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
            dispatch(toggleUserDropdown());
          }
        }
        window.addEventListener('click', handleClickOutside)
        });
        
    
        // Attach the event listener to the window
    
    const handleSignOut=()=>{
        Cookies.remove("loggedIn")
        Cookies.remove("username")
        dispatch(setRememberMe(false))
        window.location.reload();
      }
      const handleOpenLoginModal = () => {
          dispatch(toggleUserDropdown());
      };
    
  return (
    <header className="bg-transparent py-4 px-8 flex items-center justify-between">
      <div className="text-red-600 text-3xl font-bold">BASFLIX</div>
      <nav className="space-x-4 text-white">
        <a href="#" className="hover:underline">Home</a>
        <a href="#" className="hover:underline">TV Shows</a>
        <a href="#" className="hover:underline">Movies</a>
        <a href="#" className="hover:underline">New & Popular</a>
        <a href="#" className="hover:underline">My List</a>
        <a href="#" className="hover:underline">Browse by Languages</a>
      </nav>
      <div className="relative flex-col " ref={userDropdownRef}>
            <button className="w-10 h-10 rounded-full overflow-hidden" onClick={handleOpenLoginModal}>
            {isLoggedIn?<img className="h-full w-full object-fill" src={profilepic} alt="" srcset="" />
              :
              <svg
                width= "35"
                height="35"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="32" height="32" rx="16" fill="#DB4444" />
                <path
                  d="M21 23V21.3333C21 20.4493 20.691 19.6014 20.1408 18.9763C19.5907 18.3512 18.8446 18 18.0667 18H12.9333C12.1554 18 11.4093 18.3512 10.8592 18.9763C10.309 19.6014 10 20.4493 10 21.3333V23"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16 15C17.6569 15 19 13.6569 19 12C19 10.3431 17.6569 9 16 9C14.3431 9 13 10.3431 13 12C13 13.6569 14.3431 15 16 15Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
}

            </button>
            {userDropdownOpen && (
              
              <div
                class="  absolute right-0  z-[999] px-fit   my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600"
              >
                <div class="px-4 py-3">
                  <span class="block text-sm text-gray-900 text-nowrap dark:text-white">
                    {username}
                  </span>
                  
                </div>
                <ul class="py-2" aria-labelledby="user-menu-button">
                  
                  <li>
                    <button
                      
                      class="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Your Favourite Movie
                    </button>
                  </li>
                  <li>
                    <button
                      
                      class="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      My Profile
                    </button>
                  </li>
                  
                  <li>
                    <button
                     onClick={handleSignOut} 
                      class="w-full block text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
    </header>
  );
};

export default Header;

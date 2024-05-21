// src/components/Header.jsx
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  toggleUserDropdown,
  CloseUserDropdown,
  setRememberMe,
} from "../Store/Features/loginSlice";
import { activeSearch, deactiveSearch, fetchSuggestions, on_change_search } from "../Store/Features/searchSlice";
const Header = () => {
  const [search, setSearch] = useState("");
  
  const [isSearchActive, setIsSearchActive] = useState(false); // New state variable
  const searchRef = useRef(null); // New ref for the search bar and suggestions
  const rememberMe = useSelector((state) => state.login.rememberMe);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const profilepic = useSelector((state) => state.login.profilepic);
  const username = useSelector((state) => state.login.username);
  const suggestions = useSelector((state) => state.search.suggestions);
  const statusSearch = useSelector((state) => state.search.statusSearch);
  const status = useSelector((state) => state.search.status);
  const userDropdownOpen = useSelector((state) => state.login.userDropdownOpen);
  const userDropdownRef = useRef(null);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0); // New state variable

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the user dropdown if a click occurs outside of it
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target) &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        dispatch(CloseUserDropdown());
        setIsSearchActive(false); // Hide suggest
      }  
        
    };  
    window.addEventListener("click", handleClickOutside);
  });  

  // Attach the event listener to the window

  const handleSignOut = () => {
    Cookies.remove("loggedIn");
    Cookies.remove("username");
    Cookies.remove("profilePic");
    localStorage.removeItem("moviesByCategory");
    localStorage.removeItem("searchedmovies");
    localStorage.removeItem("recommendedmovies");
    localStorage.removeItem("initialrecommendation");
    localStorage.removeItem("recommendationByName");

    dispatch(setRememberMe(false));
    window.location.reload();
  };  
  const handleOpenLoginModal = () => {
    dispatch(toggleUserDropdown());
  };  

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Check if scrolled past top
    };    

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);  
    const handleSearchKeyDown = async(e) => {
      if (e.key === "ArrowDown") {
        // Move to next suggestion
        setActiveSuggestionIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1));
      } else if (e.key === "ArrowUp") {
        // Move to previous suggestion
        setActiveSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      } else if (e.key === "Enter") {
        // Perform search with current suggestion
        setIsSearchActive(false)  
        const suggestion = suggestions[activeSuggestionIndex];
        dispatch(activeSearch(suggestion))
        setSearch(suggestion);
        
  if(statusSearch==="idle"||statusSearch==="succeeded")
    {
 dispatch(on_change_search({search_input:suggestion}))
    }
      }
      else if (e.key === "Backspace" && search === "") {
      dispatch(deactiveSearch());
      setIsSearchActive(false);
    }
    };
    useEffect(() => {
      if (activeSuggestionIndex >= 0 && activeSuggestionIndex < suggestions.length) {
        setSearch(suggestions[activeSuggestionIndex]);
      }
    }, [activeSuggestionIndex]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setIsSearchActive(true); // Show suggestions when search bar is clicked
    if(status==="idle"||status==="succeeded")
      {
        dispatch(fetchSuggestions({ input: e.target.value,username ,rememberMe }));
      }
    // Replace this with your own logic to fetch suggestions
    // setSuggestions(fetchSuggestions(e.target.value));
  };
  const handleSearchClick= (e) => {
    setSearch(e.target.value);
    setIsSearchActive(true); // Show suggestions when search bar is clicked
    if(status==="idle"||status==="succeeded")
      {
         dispatch(fetchSuggestions({ input: e.target.value,username:username ,rememberMe:rememberMe }));
      }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    
    performSearch(suggestion);

  };
  console.log(suggestions)
  return (
    <header
      className={`${
        isScrolled ? "backdrop-blur-xl" : "backdrop-blur-sm"
      } bg-transparent z-[11] fixed top-0 py-4 px-8  w-screen`}
    >
      <div className="flex items-center  justify-between ">
        <a href="/" className="text-red-600 hover:scale-125 text-3xl font-bold">
          BASFLIX
        </a>
        <div className="flex-1 flex justify-center mx-4" ref={searchRef}>
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              className="w-full h-12 pl-4 pr-16 bg-gray-800 text-white rounded-full focus:outline-none focus:bg-gray-700 transition-transform duration-300 ease-in-out transform hover:scale-105"
              placeholder="Search"
              value={search}
              onChange={handleSearchChange}
              onClick={handleSearchClick}
              onKeyDown={handleSearchKeyDown} 
            />
                 {isSearchActive && suggestions.length > 0 && (
      <div className="absolute top-full mt-2 w-full bg-gray-800 text-white rounded-md shadow-lg flex flex-col">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className={`px-4 py-2 cursor-pointer ${index === activeSuggestionIndex ? "bg-gray-600" : ""}`}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </div>
        ))}
      </div>
    )}


            <button className="absolute top-1/2 right-4 transform -translate-y-1/2 transition-transform duration-300 ease-in-out hover:scale-110">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="relative flex-col " ref={userDropdownRef}>
          <button
            className="w-10 h-10 rounded-full overflow-hidden"
            onClick={handleOpenLoginModal}
          >
            {isLoggedIn ? (
              <img
                className="h-full w-full object-fill"
                src={profilepic}
                alt=""
                srcset=""
              />
            ) : (
              <svg
                width="35"
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
            )}
          </button>
          {userDropdownOpen && (
            <div class="  absolute right-0  z-[999] px-fit   my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
              <div class="px-4 py-3">
                <span class="block text-sm text-gray-900 text-nowrap dark:text-white">
                  {username}
                </span>
              </div>
              <ul class="py-2" aria-labelledby="user-menu-button">
                <li>
                  <button class="block text-nowrap w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Your Favourite Movie
                  </button>
                </li>
                <li>
                  <button class="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    History
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
      </div>
    </header>
  );
};

export default Header;

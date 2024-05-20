import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  loginUser,
  setError,
  setProfilePic,
  setRememberMe,
  setUsername,
} from "../Store/Features/loginSlice";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../Component/GoogleLoginButton";
import Cookies from "js-cookie";

function LoginPage() {
  const bg = useSelector((state) => state.landing.bg);
  const rememberMe = useSelector((state) => state.login.rememberMe);
  const username = useSelector((state) => state.login.username);
  const loginStatus = useSelector((state) => state.login.loginStatus);
  const error = useSelector((state) => state.login.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [learn, setLearn] = useState(false);

  //   const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  useEffect( () => {
    // Check if user is already logged in via cookies

    const loggedIn = Cookies.get("loggedIn");
    const username = Cookies.get("username");
    const profilePic = Cookies.get("profilePic");
    if (loggedIn) {
     dispatch(loginUser({ username })).then((action) => {
            
            navigate("/home");
        });
    //   dispatch(login());
    //   dispatch(setUsername(username));
    //   dispatch(setProfilePic(profilePic));
    //   navigate("/home");
    }
  }, [dispatch, navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (loginStatus === "pending") {
    } else {
      if (username !== "" && password !== "") {
        // await dispatch(loginUser({ username, password }));
            await dispatch(loginUser({ username, password })).then((action) => {
                if (rememberMe) {
                    Cookies.set("loggedIn", true, { expires: 1 }); // Cookie expires in 1 day
                    Cookies.set("username", username, { expires: 1 }); // Cookie expires in 1 day
                    Cookies.set(
                    "profilePic",
                    'data:image/svg+xml,<svg width= "35" height="35" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" ><rect width="32" height="32" rx="16" fill="%23DB4444" /><path d="M21 23V21.3333C21 20.4493 20.691 19.6014 20.1408 18.9763C19.5907 18.3512 18.8446 18 18.0667 18H12.9333C12.1554 18 11.4093 18.3512 10.8592 18.9763C10.309 19.6014 10 20.4493 10 21.3333V23" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M16 15C17.6569 15 19 13.6569 19 12C19 10.3431 17.6569 9 16 9C14.3431 9 13 10.3431 13 12C13 13.6569 14.3431 15 16 15Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>',
                    { expires: 1 }
                    ); // Cookie expires in 1 day
                }
                // dispatch(setUsername(email));
                navigate("/home");
                // dispatch(sendEmail({ email }));
            });
      } else {
        dispatch(setError("email or password  canot be empty"));
      }
    }

    //     if (email === validUsername && password === validPassword) {
    //
    // } else {
    //     setError('Invalid email or password');
    // }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-black bg-cover bg-center"
      style={{ backgroundImage: `${bg}` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <a
        href="/"
        className="absolute top-10 left-48 text-red-600 text-5xl font-bold"
      >
        BASFLIX
      </a>
      <div className="relative z-10 w-full max-w-md bg-black bg-opacity-75 p-8 rounded">
        <h2 className="text-3xl font-bold mb-6 text-white">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error.message}</p>}

        <div className="flex justify-center items-center">
          <GoogleLoginButton rememberMe={rememberMe} />{" "}
 
            </div>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-700" />
              <span className="mx-4 text-gray-400">OR</span>
              <hr className="flex-grow border-gray-700" />
            </div>

            <form onSubmit={handleSignIn} className="px-5">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => dispatch(setUsername(e.target.value))}
                  className="w-full p-3 bg-gray-700 rounded text-white"
                />
              </div>
              <div className="mb-6">
                <div className="relative">
                  <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded text-white pr-10"
                  />
                  <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 focus:outline-none"
                  >
                {passwordVisible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M10 2a8 8 0 100 16 8 8 0 000-16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM10 2a8 8 0 110 16 8 8 0 010-16z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className=" bg-gradient-to-r from-red-800 to-red-600    text-white font-bold   hover:scale-95 hover:bg-gradient-to-r hover:from-red-600 w-full hover:to-red-500 px-4 py-2 rounded"
                >
                  Sign In
                </button>
              </div>
            </form>
            <div className="flex justify-between items-center mt-4 text-gray-400">
              <span className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={(e) => dispatch(setRememberMe(e.target.checked))} // add this line
            />
            Remember me
          </span>
          <a href="#" className="text-gray-400 hover:underline">
            Need help?
          </a>
        </div>
        <div className="mt-8 text-gray-400">
          <p>
            New to Basflix?{" "}
            <a href="#" className="text-white hover:underline">
              Sign in with google
            </a>
            .
          </p>
        </div>
        <div
          className={`mt-4 text-xs text-gray-400 ${
            learn ? "h-fit" : "h-9"
          } overflow-hidden`}
        >
          <p>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.{" "}
            <button
              onClick={() => {
                setLearn(!learn);
              }}
              className="text-blue-500 hover:underline"
            >
              Learn more.
            </button>
          </p>
          <p>
            The information collected by Google reCAPTCHA is subject to the
            Google Privacy Policy and Terms of Service, and is used for
            providing, maintaining, and improving the reCAPTCHA service and for
            general security purposes (it is not used for personalized
            advertising by Google).
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

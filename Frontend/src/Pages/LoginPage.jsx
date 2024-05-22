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
import { NavLink, useNavigate } from "react-router-dom";
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
      <NavLink to='/'
        className="absolute top-10 left-48 text-red-600 text-5xl font-bold"
      >
        BASFLIX
      </NavLink>
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
                  
                  <svg width="25px" height="25px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.7649 6.07595C14.9991 6.22231 15.0703 6.53078 14.9239 6.76495C14.4849 7.46742 13.9632 8.10644 13.3702 8.66304L14.5712 9.86405C14.7664 10.0593 14.7664 10.3759 14.5712 10.5712C14.3759 10.7664 14.0593 10.7664 13.8641 10.5712L12.6011 9.30816C11.8049 9.90282 10.9089 10.3621 9.93374 10.651L10.383 12.3276C10.4544 12.5944 10.2961 12.8685 10.0294 12.94C9.76266 13.0115 9.4885 12.8532 9.41703 12.5864L8.95916 10.8775C8.48742 10.958 8.00035 10.9999 7.5 10.9999C6.99964 10.9999 6.51257 10.958 6.04082 10.8775L5.58299 12.5864C5.51153 12.8532 5.23737 13.0115 4.97063 12.94C4.7039 12.8685 4.5456 12.5944 4.61706 12.3277L5.06624 10.651C4.09111 10.3621 3.19503 9.90281 2.3989 9.30814L1.1359 10.5711C0.940638 10.7664 0.624058 10.7664 0.428797 10.5711C0.233537 10.3759 0.233537 10.0593 0.428797 9.86404L1.62982 8.66302C1.03682 8.10643 0.515113 7.46742 0.0760677 6.76495C-0.0702867 6.53078 0.000898544 6.22231 0.235064 6.07595C0.46923 5.9296 0.777703 6.00078 0.924057 6.23495C1.40354 7.00212 1.989 7.68056 2.66233 8.2427C2.67315 8.25096 2.6837 8.25971 2.69397 8.26897C4.00897 9.35527 5.65536 9.9999 7.5 9.9999C10.3078 9.9999 12.6563 8.50629 14.0759 6.23495C14.2223 6.00078 14.5308 5.9296 14.7649 6.07595Z"
                    fill="#000000"
                  />
                </svg>
                  
                ) : (
                  <svg width="25" height="25px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.001 21C5.001 24 8.001 29 16.001 29C24.001 29 27.001 24 28.001 21M31 19C31 17 27.001 7 16 7M16 7C5.001 7 1 17 1 19M16 7V3M21.1758 3.6816L20.1758 7.4106M26 5.6797L23.999 9.1427M30.1416 8.8574L27.3136 11.6844M10.8223 3.6816L11.8213 7.4106M5.999 5.6797L7.999 9.1437M1.8574 8.8574L4.6854 11.6854M16.001 12C12.688 12 10.001 14.687 10.001 18C10.001 21.313 12.688 24 16.001 24C19.314 24 22.001 21.313 22.001 18M21.2441 15.0869C20.7001 14.1089 19.8911 13.3009 18.9141 12.7569M18.001 18C18.001 16.896 17.105 16 16.001 16C14.897 16 14.001 16.896 14.001 18C14.001 19.104 14.897 20 16.001 20C17.105 20 18.001 19.104 18.001 18Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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

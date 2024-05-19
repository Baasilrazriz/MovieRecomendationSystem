import { toast, ToastContainer } from 'react-toastify';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Store/Features/loginSlice';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const bg = useSelector((state) => state.landing.bg);
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const nav=useNavigate();
    const handleSignIn = (e) => {
      e.preventDefault();
      // Replace these with your own logic
      const validUsername = 'bas';
      const validPassword = 'bas123';
  
      if (email === validUsername && password === validPassword) {
        
        dispatch(login())
        nav("/home");
        
      } else {
          setError('Invalid email or password');
        alert(Error)
      }
    };
  
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-black bg-cover bg-center"
           style={{ backgroundImage: `${bg}` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 w-full max-w-md bg-black bg-opacity-75 p-8 rounded">
          <h2 className="text-3xl font-bold mb-6 text-white">Sign In</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSignIn}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded text-white"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded text-white"
              />
            </div>
            <button type="submit" className="w-full bg-red-600 p-3 rounded text-white font-semibold">Sign In</button>
          </form>
          <div className="flex justify-between items-center mt-4 text-gray-400">
            <span className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </span>
            <a href="#" className="text-gray-400 hover:underline">Need help?</a>
          </div>
          <div className="mt-8 text-gray-400">
            <p>New to Netflix? <a href="#" className="text-white hover:underline">Sign up now</a>.</p>
          </div>
          <div className="mt-4 text-xs text-gray-400">
            <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="#" className="text-blue-500 hover:underline">Learn more.</a></p>
          </div>
        </div>
      </div>
    );
}

export default LoginPage
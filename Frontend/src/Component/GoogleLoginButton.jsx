import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { login, loginUser, setProfilePic, setUsername } from '../Store/Features/loginSlice';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
const GoogleLoginButton = () => {
    const rememberMe = useSelector((state) => state.login.rememberMe);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLoginSuccess = async(response) => {
        const decoded = jwtDecode(response.credential);
        console.log(decoded.picture); // You can use this information to log the user in.
        const username= decoded.given_name;
        await dispatch(loginUser({ username })).then((action) => {
        if (rememberMe) {
            Cookies.set('loggedIn', true, { expires: 1 }); // Cookie expires in 1 day
            Cookies.set('username', decoded.given_name, { expires: 1 }); // Cookie expires in 1 day
            Cookies.set('profilePic', decoded.picture, { expires: 1 }); // Cookie expires in 1 day
        }
              dispatch(setProfilePic(decoded.picture));
              // dispatch(setUsername(email));
              navigate("/home");
              // dispatch(sendEmail({ email }));
        });

        // Perform necessary login actions here
        
        // dispatch(setUsername(decoded.given_name));
        
        // dispatch(login());
        // navigate('/home');

    };

    const handleLoginFailure = () => {
        console.error('Google login failed');
        Cookies.remove("loggedIn")
    };

    return (
        <GoogleOAuthProvider clientId="331398497699-i77hu31ro8qm6sspdmmn56ije1lj0q0v.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginFailure}
                theme="outline"
                size="large"
                type="standard"
                width="100%"
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginButton;

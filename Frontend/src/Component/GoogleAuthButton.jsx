// GoogleAuthButton.jsx
import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleAuthButton = ({ onSuccess, onFailure }) => {
    return (
        <GoogleLogin
            clientId="331398497699-i77hu31ro8qm6sspdmmn56ije1lj0q0v.apps.googleusercontent.com" // replace with your Google Client ID
            buttonText="Login with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
        />
    );
};

export default GoogleAuthButton;
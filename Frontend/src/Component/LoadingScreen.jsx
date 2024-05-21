import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const LoadingScreen = () => {
    const bg = useSelector((state) => state.landing.bg);
    const loadingMessages = [
        "Thanks for using Basflix!",
        "Loading movies...",
        "Sorry for your inconvenience...",
        "Almost there...",
        "Preparing your experience..."
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
        }, 2000); // Change message every 2 seconds

        return () => clearInterval(intervalId);
    }, [loadingMessages.length]);

    return (
        <div className=" flex items-center justify-center min-h-screen text-center text-white"
        style={{ backgroundImage: `${bg}` }}
        >

            <div>
                <div className="loading-spinner mx-auto mb-4"></div>
                <div className="text-lg font-semibold">{loadingMessages[currentIndex]}</div>
            </div>
        </div>
    );
};

export default LoadingScreen;

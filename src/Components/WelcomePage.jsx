import React, { useState, useRef, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
// 1. Import the useTranslation hook
import { useTranslation } from 'react-i18next';

const WelcomePage = () => {
    // 2. Call the hook to get the 't' function
    const { t } = useTranslation();

    const [hasInteracted, setHasInteracted] = useState(false);
    const videoRef = useRef(null);
    const audioRef = useRef(null);
    
    const videoSrc = "./public/Universezoom.mp4";
    const audioSrc = "https://assets.mixkit.co/music/preview/mixkit-deep-meditation-109.mp4";

    const handleStart = () => {
        setHasInteracted(true);
        if (videoRef.current) videoRef.current.play().catch(e => console.error("Video play failed:", e));
        if (audioRef.current) { audioRef.current.volume = 0.5; audioRef.current.play().catch(e => console.error("Audio play failed:", e)); }
    };

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-black">
            <video ref={videoRef} className="absolute top-0 left-0 w-full h-full object-cover z-0" src={videoSrc} loop playsInline muted />
            <audio ref={audioRef} src={audioSrc} loop playsInline preload="auto" />
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4 text-center">
                <div className="p-8 rounded-2xl">
                    {/* 3. Replace the text with the t() function */}
                    <h1 className="text-white text-4xl md:text-6xl font-bold transition-opacity duration-1000 ease-in-out drop-shadow-lg [text-shadow:_0_5px_15px_rgb(255_255_255_/_50%)]">
                        {t('welcome_cadet')}
                    </h1>
                    <Link to="/login" className="mt-8 px-8 py-3 bg-white text-black rounded-full font-bold shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white inline-block">
                        {t('explore_button')}
                    </Link>
                </div>
                {!hasInteracted && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm cursor-pointer" onClick={handleStart}>
                        <div className="text-center p-8 rounded-lg">
                            <h2 className="text-white text-3xl font-bold mb-4 animate-pulse">
                                {t('tap_to_begin')}
                            </h2>
                            <p className="text-gray-300">
                                {t('cosmos_awaits')}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WelcomePage;

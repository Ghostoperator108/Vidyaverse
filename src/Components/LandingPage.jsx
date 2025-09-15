import React, { useState, useRef } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import LanguageSwitcher from './Language/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

// --- Landing Page Component ---
const LandingPage = () => {
    // Get the translation function 't'
    const { t } = useTranslation();

    // Removed displayText state as it's no longer needed
    const [showButton, setShowButton] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const videoRef = useRef(null);
    const audioRef = useRef(null);

    const videoSrc = "./public/Universezoom.mp4";
    const audioSrc = "./public/voyager.mp3";

    const handleStart = () => {
        setHasInteracted(true);
        if (videoRef.current) {
            videoRef.current.play().catch(error => console.error("Video play failed:", error));
            videoRef.current.muted = false;
        }
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.play().catch(error => console.error("Audio play failed:", error));
        }
    };

    const handleAudioEnd = () => {
        setShowButton(true);
    };

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-black">
            {/* Language Switcher added here, in the top-right corner */}
            <div className="absolute top-4 right-4 z-30">
                <LanguageSwitcher />
            </div>

            <video
                ref={videoRef}
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                src={videoSrc}
                loop={true}
                playsInline
                muted={true}
                onLoadedData={() => { if (!hasInteracted) videoRef.current.play() }}
            />
            <audio ref={audioRef} src={audioSrc} onEnded={handleAudioEnd} playsInline preload="auto" />
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4 text-center">
                <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-bold transition-opacity duration-1000 ease-in-out drop-shadow-lg [text-shadow:_0_5px_15px_rgb(255_255_255_/_80%)] p-8 rounded-2xl tracking-wider">
                    {/* Using the translation function 't' with the correct key */}
                    {t('landing_page.title')}
                </h1>
                {showButton && (
                    <Link
                        to="/login"
                        className="mt-8 px-8 py-3 bg-white text-black rounded-full font-bold shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                    >
                        {t('landing_page.explore_button')}
                    </Link>
                )}
                {!hasInteracted && (
                    <div
                        className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm cursor-pointer"
                        onClick={handleStart}
                    >
                        <div className="text-center p-8 rounded-lg">
                            <h2 className="text-white text-3xl font-bold mb-4 animate-pulse">
                                {t('landing_page.tap_to_begin_title')}
                            </h2>
                            <p className="text-gray-300">
                                {t('landing_page.tap_to_begin_subtitle')}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LandingPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const GyanBotWelcome = ({ name }) => {
    // The useNavigate hook lets us redirect the user
    const navigate = useNavigate();

    // This function will be called when the "Launch Mission" button is clicked
    const handleLaunchGame = () => {
        navigate('/game/asteroid-sorter'); 
    };

    return (
        <div className="min-h-screen bg-[#000428] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Stars - reusing the visual style from your login page */}
            <div className="absolute inset-0 z-0">
                <div id="stars1" className="w-1 h-1 bg-white rounded-full absolute" style={{ boxShadow: '0 0 2px #fff, 0 0 5px #fff, 0 0 10px #fff' }}></div>
                <div id="stars2" className="w-1 h-1 bg-white rounded-full absolute" style={{ boxShadow: '0 0 2px #fff, 0 0 5px #fff, 0 0 10px #fff' }}></div>
                <div id="stars3" className="w-1 h-1 bg-white rounded-full absolute" style={{ boxShadow: '0 0 2px #fff, 0 0 5px #fff, 0 0 10px #fff' }}></div>
            </div>

            <div className="relative z-10 w-full max-w-2xl">
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-12 border border-cyan-400/30 shadow-cyan-400/20 text-center space-y-6">
                    <div className="flex justify-center mb-6">
                        {/* A simple SVG representation of GyanBot */}
                        <svg className="w-24 h-24 md:w-32 md:h-32 text-cyan-400 animate-pulse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2a2 2 0 0 0-2 2v2a2 2 0 0 0 4 0V4a2 2 0 0 0-2-2zM4 14h.01M20 14h.01M9 19.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM21 19.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM16 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM12 16a4 4 0 0 1-4-4"></path>
                        </svg>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-wider uppercase [text-shadow:_0_2px_4px_rgb(0_255_255_/_50%)]">
                        Greetings, Cadet {name || 'Explorer'}!
                    </h1>
                    
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                        I am **GyanBot**, your mission control navigator. Welcome aboard! Our mission is to embark on an incredible journey through the cosmos of **Science, Technology, Engineering, and Mathematics**. Each new subject is a new planet to explore. Are you ready to begin?
                    </p>
                     

                    <button 
                        onClick={handleLaunchGame}
                        className="mt-8 px-10 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full font-bold text-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-400/50 transform uppercase tracking-wide">
                        Launch Mission
                    </button>
                    <div className="mt-4">
                        <Link to="/login" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GyanBotWelcome;
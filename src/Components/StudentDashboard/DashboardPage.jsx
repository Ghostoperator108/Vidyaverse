import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';




const DashboardPage = () => {
    const location = useLocation();
    const [cadetProfile, setCadetProfile] = useState(location.state?.cadetProfile);
    const [completedChapters, setCompletedChapters] = useState(0); // For simulation

    // The structured 10-chapter curriculum for a Class 6 student
    const learningJourney = [
        { chapter: 1, title: 'The First Moment', description: 'Witness the Big Bang and the birth of our universe.', icon: '💥', status: 'available' },
        { chapter: 2, title: 'The Star Forges', description: 'Learn how stars are born, live, and create the elements of life.', icon: '🌟', status: 'locked' },
        { chapter: 3, title: 'Our Home in the Cosmos', description: 'Explore the formation of our Solar System and the unique Earth.', icon: '🌍', status: 'locked' },
        { chapter: 4, title: 'The Spark of Life', description: 'Journey back to the beginning of life and meet the first organisms.', icon: '🧬', status: 'locked' },
        { chapter: 5, title: 'The Green Engine', description: 'Discover the magic of photosynthesis and how plants power our world.', icon: '🌿', status: 'locked' },
        { chapter: 6, title: 'The Human Machine', description: 'An introduction to the incredible systems that make your body work.', icon: '🏃', status: 'locked' },
        { chapter: 7, title: 'Tools of Discovery', description: 'Understand the simple machines that build our modern world.', icon: '⚙️', status: 'locked' },
        { chapter: 8, title: 'The Language of the Universe', description: 'An introduction to the logic and patterns behind computer code.', icon: '💻', status: 'locked' },
        { chapter: 9, title: 'The Connected World', description: 'Unravel the secrets of how the internet connects us all.', icon: '🌐', status: 'locked' },
        { chapter: 10, title: 'The Next Frontier', description: 'Look to the future of space exploration and our journey to Mars.', icon: '🚀', status: 'locked' },
    ];

    useEffect(() => {
        if (!cadetProfile) {
            const savedProfile = localStorage.getItem('cadetProfile');
            if (savedProfile) {
                setCadetProfile(JSON.parse(savedProfile));
            }
        }
    }, [cadetProfile]);

    if (!cadetProfile) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center"><p>Loading Cadet Profile...</p></div>
        );
    }

    const getChapterStatus = (chapterIndex) => {
        if (chapterIndex < completedChapters) return 'completed';
        if (chapterIndex === completedChapters) return 'available';
        return 'locked';
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans p-4 md:p-8 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-30"><div className="nebula-bg"></div></div>
            <div className="relative z-10 max-w-7xl mx-auto">
                
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-white [text-shadow:_0_2px_4px_rgb(0_255_255_/_50%)]">Cadet Command Center</h1>
                        <p className="text-cyan-300 text-lg">Welcome back, Cadet {cadetProfile.name}!</p>
                    </div>
                    <div className="text-right">
                         <p className="text-xl font-bold">Class {cadetProfile.studentClass}</p>
                         <p className="text-gray-400">Age: {cadetProfile.age}</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Main Column: Learning Journey */}
                    <div className="lg:col-span-2 bg-black/40 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-cyan-400/30">
                         <h2 className="text-3xl font-bold text-cyan-400 border-b border-cyan-400/20 pb-3 mb-6">Your Learning Journey</h2>
                         <div className="space-y-4">
                            {learningJourney.map((item, index) => {
                                const status = getChapterStatus(index);
                                return (
                                <div key={item.chapter} className={`p-4 rounded-lg flex items-center transition-all duration-300 border-2 ${
                                    status === 'completed' ? 'bg-green-500/20 border-green-400' : 
                                    status === 'available' ? 'bg-cyan-500/20 border-cyan-400 cursor-pointer hover:bg-cyan-400/30' : 
                                    'bg-gray-500/10 border-gray-600 opacity-60'
                                }`}>
                                    <div className={`text-4xl mr-4 p-3 rounded-lg ${
                                        status === 'completed' ? 'bg-green-500/30' : 
                                        status === 'available' ? 'bg-cyan-500/30' : 
                                        'bg-gray-700/30'
                                    }`}>{item.icon}</div>
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-xl">{item.title}</h3>
                                        <p className="text-gray-300 text-sm">{item.description}</p>
                                    </div>
                                    {status === 'locked' && <span className="text-2xl">🔒</span>}
                                    {status === 'completed' && <span className="text-2xl">✔️</span>}
                                </div>
                                );
                            })}
                         </div>
                    </div>

                    {/* Sidebar Column: Stats and Badges */}
                    <div className="lg:col-span-1 space-y-8">
                         <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-cyan-400/30">
                            <h2 className="text-2xl font-bold text-cyan-400 border-b border-cyan-400/20 pb-2 mb-4">Mission Stats</h2>
                            <div className="space-y-3 text-lg">
                                <p><strong>Chapters Completed:</strong> {completedChapters} / {learningJourney.length}</p>
                                <p><strong>Stardust Collected:</strong> {completedChapters * 150} ✨</p>
                            </div>
                         </div>
                         <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-cyan-400/30">
                            <h2 className="text-2xl font-bold text-cyan-400 border-b border-cyan-400/20 pb-2 mb-4">Badges Earned</h2>
                             <div className="flex flex-wrap gap-4">
                                {/* This can be dynamically populated later */}
                                <div className="text-5xl p-2 bg-black/30 rounded-lg" title="First Light">☀️</div>
                                <div className="text-5xl p-2 bg-black/30 rounded-lg" title="Stargazer">🔭</div>
                             </div>
                         </div>
                         {/* Simulation Button for Demo */}
                          <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-cyan-400/30">
                             <button onClick={() => setCompletedChapters(c => (c >= 10 ? 0 : c + 1))} className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-bold shadow-lg transition-all duration-300 hover:scale-105 transform">
                                 Simulate Chapter Complete
                             </button>
                          </div>
                    </div>

                </div>

            </div>
            <style>{`.nebula-bg { position: absolute; inset: -200px; background-image: url('https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'); background-size: cover; background-position: center; animation: zoom-pan 60s linear infinite; } @keyframes zoom-pan { 0% { transform: scale(1) translate(0, 0); } 50% { transform: scale(1.5) translate(10%, -10%); } 100% { transform: scale(1) translate(0, 0); } }`}</style>
        </div>
    );
};

export default DashboardPage;
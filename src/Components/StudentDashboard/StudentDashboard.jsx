import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Note: This component uses a simple state-based router.
// For a production app, consider using react-router-dom.

// --- ICONS (as SVG components for better reusability and styling) ---
const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const UnlockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
    </svg>
);

const BadgeIcon = ({ color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 ${color}`} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.707 14.707a1 1 0 001.414 0L15.414 9.414a1 1 0 00-1.414-1.414L10 12.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3z" clipRule="evenodd" />
    </svg>
);


// --- LOGIN PAGE (Your original component, adapted for this single-file app) ---
const LoginPage = ({ onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        name: 'Cosmo Cadet',
        age: '11',
        studentClass: '6',
        email: 'cadet@galaxy.edu',
        password: 'password123',
        teacherEmail: 'teacher@galaxy.edu',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // The App component will handle navigation
        onLoginSuccess(formData); 
    };
    
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 overflow-hidden relative font-sans">
            <div className="absolute inset-0 z-0 opacity-50"><div className="nebula-bg"></div></div>
            <div className="relative z-10 w-full max-w-md">
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-cyan-400/30 shadow-cyan-400/20">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-black text-white tracking-wider uppercase [text-shadow:_0_2px_4px_rgb(0_255_255_/_50%)]">Join the Cosmos</h1>
                        <p className="text-gray-400 mt-2">Create your account to begin the mission.</p>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Name Input */}
                        <div className="relative"><input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full bg-black/40 text-white pl-4 pr-4 py-3 rounded-lg border-2 border-transparent focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" required /></div>
                        {/* Student Email */}
                        <div className="relative"><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Student Email ID" className="w-full bg-black/40 text-white pl-4 pr-4 py-3 rounded-lg border-2 border-transparent focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" required /></div>
                        {/* Password */}
                        <div className="relative"><input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full bg-black/40 text-white pl-4 pr-4 py-3 rounded-lg border-2 border-transparent focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" required /></div>
                        {/* Age Input */}
                        <div className="relative"><input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" className="w-full bg-black/40 text-white pl-4 pr-4 py-3 rounded-lg border-2 border-transparent focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" required /></div>
                        {/* Class Dropdown */}
                        <div className="relative">
                            <select name="studentClass" value={formData.studentClass} onChange={handleChange} className="w-full bg-black/40 text-white pl-4 pr-10 py-3 rounded-lg border-2 border-transparent focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 appearance-none" required>
                                <option value="" disabled>Select Class</option>
                                {[6, 7, 8, 9, 10, 11, 12].map(c => <option key={c} value={c}>Class {c}</option>)}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400"><svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg></div>
                        </div>
                        {/* Teacher's Email (Optional) */}
                        <div className="relative"><input type="email" name="teacherEmail" value={formData.teacherEmail} onChange={handleChange} placeholder="Teacher's Email (Optional)" className="w-full bg-black/40 text-white pl-4 pr-4 py-3 rounded-lg border-2 border-transparent focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" /></div>

                       <button type="submit" className="w-full px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-400/50 transform">Start Exploring</button>
                    </form>
                </div>
            </div>
            <style>{`.nebula-bg { position: absolute; inset: -200px; background-image: url('https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'); background-size: cover; background-position: center; animation: zoom-pan 60s linear infinite; } @keyframes zoom-pan { 0% { transform: scale(1) translate(0, 0); } 50% { transform: scale(1.5) translate(10%, -10%); } 100% { transform: scale(1) translate(0, 0); } }`}</style>
        </div>
    );
};


// --- STUDENT DASHBOARD PAGE (The new component) ---
const DashboardPage = ({ cadetProfile, onLogout }) => {
    const badges = [
        { name: "First Mission", color: "text-green-400" },
        { name: "Star Gazer", color: "text-yellow-400" },
        { name: "Planet Hopper", color: "text-blue-400" },
    ];
    
    // Fallback if profile data is missing
    if (!cadetProfile) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-cyan-300">Cadet Dashboard</h1>
                    <button onClick={onLogout} className="px-4 py-2 bg-red-500/80 rounded-lg hover:bg-red-600 transition-colors">Logout</button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Profile & Stats */}
                    <aside className="lg:col-span-1 space-y-8">
                        {/* Profile Card */}
                        <div className="bg-black/30 backdrop-blur-xl p-6 rounded-2xl border border-cyan-400/30">
                            <div className="flex items-center space-x-4">
                                <img src={`https://placehold.co/80x80/000000/cyan?text=${cadetProfile.name.charAt(0)}`} alt="Avatar" className="rounded-full border-2 border-cyan-400"/>
                                <div>
                                    <h2 className="text-2xl font-bold">{cadetProfile.name}</h2>
                                    <p className="text-gray-400">{cadetProfile.email}</p>
                                    <p className="text-gray-400">Class {cadetProfile.studentClass} | Age {cadetProfile.age}</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats Card */}
                         <div className="bg-black/30 backdrop-blur-xl p-6 rounded-2xl border border-cyan-400/30">
                            <h3 className="text-xl font-semibold mb-4 text-cyan-300">Stats & Badges</h3>
                            <div className="mb-6">
                                <label className="text-gray-400">Experience Points</label>
                                <div className="w-full bg-gray-700 rounded-full h-4 mt-2">
                                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-4 rounded-full" style={{width: '75%'}}></div>
                                </div>
                                <p className="text-right text-sm mt-1">1500 / 2000 XP</p>
                            </div>
                             <div>
                                 <label className="text-gray-400">Badges Collected</label>
                                 <div className="flex space-x-2 mt-2">
                                     {badges.map(badge => (
                                         <div key={badge.name} className="flex flex-col items-center group">
                                             <BadgeIcon color={badge.color} />
                                             <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">{badge.name}</span>
                                         </div>
                                     ))}
                                 </div>
                             </div>
                        </div>

                        {/* Teacher Info */}
                         <div className="bg-black/30 backdrop-blur-xl p-6 rounded-2xl border border-cyan-400/30">
                            <h3 className="text-xl font-semibold mb-2 text-cyan-300">Mission Control</h3>
                            <p className="text-gray-400">Your teacher guiding this mission is:</p>
                             <p className="font-bold text-lg mt-1">{cadetProfile.teacherEmail || 'N/A'}</p>
                        </div>
                    </aside>

                    {/* Middle Column: Chapters */}
                    <main className="lg:col-span-2">
                        <div className="bg-black/30 backdrop-blur-xl p-6 rounded-2xl border border-cyan-400/30">
                            <h3 className="text-2xl font-bold mb-6 text-cyan-300">Mission Log: Class 6 Science</h3>
                            <div className="space-y-4">
                                <Link to='first-page'><button className="w-full flex items-center justify-between p-4 rounded-lg transition-all bg-cyan-500/20 border-l-4 border-cyan-400 hover:bg-cyan-500/30 text-left">
                                    <div className="flex items-center">
                                        <span className="text-gray-400 font-mono mr-4">01</span>
                                        <p className="font-medium text-white">Food: Where Does It Come From?</p>
                                    </div>
                                    <UnlockIcon />
                                </button></Link>
                            </div>
                        </div>
                        {/* Collaboration Section */}
                         <div className="bg-black/30 backdrop-blur-xl p-6 rounded-2xl border border-cyan-400/30 mt-8">
                            <h3 className="text-2xl font-bold mb-4 text-cyan-300">Collaboration Hub</h3>
                             <p className="text-gray-400 mb-4">Join fellow cadets on group missions, share discoveries, and tackle challenges together.</p>
                             <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/50">
                                 View Group Activities
                             </button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};


// --- MAIN APP COMPONENT (Handles routing) ---
export default function App() {
    const [currentPage, setCurrentPage] = useState('login');
    const [cadetProfile, setCadetProfile] = useState(null);

    // Try to load profile from localStorage on initial render
    useEffect(() => {
        try {
            const savedProfile = localStorage.getItem('cadetProfile');
            if (savedProfile) {
                setCadetProfile(JSON.parse(savedProfile));
                setCurrentPage('dashboard');
            }
        } catch (error) {
            console.error("Could not parse saved profile:", error);
            localStorage.removeItem('cadetProfile');
        }
    }, []);

    const handleLoginSuccess = (profileData) => {
        const profileString = JSON.stringify(profileData);
        localStorage.setItem('cadetProfile', profileString);
        setCadetProfile(profileData);
        setCurrentPage('dashboard');
    };
    
    const handleLogout = () => {
        localStorage.removeItem('cadetProfile');
        setCadetProfile(null);
        setCurrentPage('login');
    };

    if (currentPage === 'dashboard') {
        return <DashboardPage cadetProfile={cadetProfile} onLogout={handleLogout} />;
    }
    
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
}


import React, { useState } from 'react';
// Note: This component uses react-router-dom's Link for navigation.
// It must be rendered within a Router context in your application.
import { Link } from 'react-router-dom';

const LoginPage = () => {
    // State is pre-filled with mock student data for demonstration
    const [formData, setFormData] = useState({
        email: 'cadet@cosmos.edu',
        password: 'password123',
    });

    // Handles changes in form inputs and updates the state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    // Handles the form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        console.log("Login attempt with data:", formData);
        // Navigation is now handled by the Link component.
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 overflow-hidden relative font-sans">
            {/* Background Nebula Effect */}
            <div className="absolute inset-0 z-0 opacity-50">
                <div className="nebula-bg"></div>
            </div>
            
            <div className="relative z-10 w-full max-w-md">
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-cyan-400/30 shadow-cyan-400/20">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-black text-white tracking-wider uppercase [text-shadow:_0_2px_4px_rgb(0_255_255_/_50%)]">Welcome Back</h1>
                        <p className="text-gray-400 mt-2">Enter your credentials to continue your mission.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Student Email */}
                        <div className="relative">
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Student Email ID" className="w-full bg-black/40 text-white pl-4 pr-4 py-3 rounded-lg border-2 border-transparent focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" required />
                        </div>
                        
                        {/* Password */}
                        <div className="relative">
                            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full bg-black/40 text-white pl-4 pr-4 py-3 rounded-lg border-2 border-transparent focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" required />
                        </div>

                        <Link to="/dashboard" className="block w-full">
                            <button type="submit" className="w-full px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-400/50 transform">
                                Let's Explore
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
            
            {/* Inline styles for the animated background */}
            <style>{`
                .nebula-bg {
                    position: absolute;
                    inset: -200px;
                    background-image: url('https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
                    background-size: cover;
                    background-position: center;
                    animation: zoom-pan 60s linear infinite;
                }
                @keyframes zoom-pan {
                    0% { transform: scale(1) translate(0, 0); }
                    50% { transform: scale(1.5) translate(10%, -10%); }
                    100% { transform: scale(1) translate(0, 0); }
                }
            `}</style>
        </div>
    );
};

export default LoginPage;


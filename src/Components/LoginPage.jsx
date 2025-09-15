// src/LoginPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import  {  Link } from 'react-router-dom';




const LoginPage = ({ setStudentName }) => {
    // useNavigate hook to redirect after form submission
    const navigate = useNavigate();

    // State for form inputs
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        studentClass: '',
        email: '',
        password: '',
        teacherEmail: '',
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 1. Save the student's name to the parent component's state
        setStudentName(formData.name);
        
        // 2. Navigate to the '/welcome' route
        navigate('/welcome');
    };

    // Helper function for the background stars (no change here)
    const randomStars = (count, width, height) => {
        let boxShadow = '';
        for (let i = 0; i < count; i++) {
            boxShadow += `${Math.random() * width}px ${Math.random() * height}px #FFF,`;
        }
        return boxShadow.slice(0, -1);
    };

    return (
        <div className="min-h-screen bg-[#000428] text-white flex items-center justify-center p-4 overflow-hidden relative">
            <div className="absolute inset-0 z-0">
                <div id="stars1" style={{ boxShadow: randomStars(700, 2000, 2000) }}></div>
                <div id="stars2" style={{ boxShadow: randomStars(200, 2000, 2000) }}></div>
                <div id="stars3" style={{ boxShadow: randomStars(100, 2000, 2000) }}></div>
            </div>
            <div className="relative z-10 w-full max-w-md">
                <div className="bg-black/30 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-cyan-400/30 shadow-cyan-400/20">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-black text-white tracking-wider uppercase [text-shadow:_0_2px_4px_rgb(0_255_255_/_50%)]">Join the Cosmos</h1>
                        <p className="text-gray-400 mt-2">Create your account to begin the mission.</p>
                    </div>
                    {/* The form's onSubmit handler is what triggers the navigation */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* All your form inputs */}
                        {/* ... (rest of your form code) */}
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </span>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full bg-black/40 text-white pl-12 pr-4 py-3 rounded-lg border-2 border-transparent focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300" required />
                        </div>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </span>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Student Email ID" className="w-full bg-black/40 text-white pl-12 pr-4 py-3 rounded-lg border-2 border-transparent focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300" required />
                        </div>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            </span>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full bg-black/40 text-white pl-12 pr-4 py-3 rounded-lg border-2 border-transparent focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300" required />
                        </div>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>
                            </span>
                            <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" className="w-full bg-black/40 text-white pl-12 pr-4 py-3 rounded-lg border-2 border-transparent focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300" required />
                        </div>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                            </span>
                            <select name="studentClass" value={formData.studentClass} onChange={handleChange} className="w-full bg-black/40 text-white pl-12 pr-10 py-3 rounded-lg border-2 border-transparent focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 appearance-none" defaultValue="" required>
                                <option value="" disabled>Select Class</option>
                                <option value="6">Class 6</option>
                                <option value="7">Class 7</option>
                                <option value="8">Class 8</option>
                                <option value="9">Class 9</option>
                                <option value="10">Class 10</option>
                                <option value="11">Class 11</option>
                                <option value="12">Class 12</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
                            </span>
                            <input type="email" name="teacherEmail" value={formData.teacherEmail} onChange={handleChange} placeholder="Teacher's Email (Optional)" className="w-full bg-black/40 text-white pl-12 pr-4 py-3 rounded-lg border-2 border-transparent focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300" />
                        </div>

                        <button type="submit" className="w-full px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-400/50 transform">
                            Start Exploring
                        </button>
                    </form>
                    <div className="text-center mt-8 text-gray-400">
                        <p>Already have an account? <Link to="#" className="font-semibold text-cyan-400 hover:underline">Sign In</Link></p>
                    </div>
                </div>
                <Link to="/" className="text-cyan-400 hover:underline mt-6 inline-block text-center w-full">Back to Home</Link>
            </div>
            <style>{`
                #stars1, #stars2, #stars3 {
                    position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 1px; height: 1px; background: transparent;
                }
                #stars1 { animation: animStar 50s linear infinite; }
                #stars2 { animation: animStar 100s linear infinite; }
                #stars3 { animation: animStar 150s linear infinite; }
                @keyframes animStar { from { transform: translateY(0px); } to { transform: translateY(-2000px); } }
            `}</style>
        </div>
    );
};

export default LoginPage;
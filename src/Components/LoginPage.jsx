import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

            


const LoginPage = () => {

    const navigate = useNavigate();
    
    // Step 1: Expanded state to hold all registration fields
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        studentClass: '',
        email: '',
        password: '',
        teacherEmail: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    // Step 2: Updated submit function to save data and navigate
    const handleSubmit = (e) => {
        e.preventDefault();
        const profileString = JSON.stringify(formData);
        localStorage.setItem('cadetProfile', profileString);
        console.log("Cadet Profile Saved Locally:", formData);
        navigate('/dashboard', { state: { cadetProfile: formData } });
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

export default LoginPage;
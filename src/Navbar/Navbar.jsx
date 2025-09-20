import React from 'react';
// Import Link from react-router-dom if you plan to use it for navigation
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-black/30 backdrop-blur-xl border-b border-cyan-400/30 sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left side: Brand/Title */}
                    <div className="flex-shrink-0">
                        {/* You can replace this with a Link to the homepage, e.g., <Link to="/"> */}
                        <a href="#" className="text-2xl font-bold text-cyan-300 hover:text-cyan-200 transition-colors">
                            Cosmic Classroom
                        </a>
                    </div>

                    {/* Right side: Navigation Links & Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Example navigation links. Uncomment and use Link for SPA navigation. */}
                        <Link to="/dashboard/first-page/animal-diet-game" className="text-gray-300 hover:text-white">Animal Diet Game</Link>
                        {/* <Link to="/profile" className="text-gray-300 hover:text-white">Profile</Link> */}

                        {/* Placeholder for a user profile or logout button */}
                        
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

import React from 'react';
// Import Link from react-router-dom if you plan to use it for navigation
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-black/30 backdrop-blur-xl border-b border-cyan-400/30 sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left side: Brand/Title */}
                    
                    {/* Right side: Navigation Links & Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Example navigation links. Uncomment and use Link for SPA navigation. */}
                        <Link to="/teacher-dashboard" className='text-gray-300 hover:text-white align-items-left'>Teacher</Link>
                        <Link to="/dashboard/first-page/animal-diet-game" className="text-gray-300 hover:text-white">A </Link>
                        <Link to="/dashboard/food-explorer" className="text-gray-300 hover:text-white">B</Link>
                        <Link to="/dashboard/first-page/dashboard/garden-gobble-game"
                        className='text-gray-300 hover:text-white'>C</Link>
                        <Link to="/dashboard/first-page/dashboard/source-sorter-game">D</Link>
                        <Link to="/dashboard/first-page/dashboard/garden-harvest-game">E</Link>
                       
                      
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

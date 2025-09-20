import React from 'react';
import { Link } from 'react-router-dom';
// A simple SVG for a friendly mascot or icon
const WelcomeIcon = () => (
  <svg className="w-24 h-24 mx-auto text-orange-500 mb-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="none" />
    <path d="M12,4c-4.41,0-8,3.59-8,8s3.59,8,8,8s8-3.59,8-8S16.41,4,12,4zm0,14c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6 S15.31,18,12,18z M11,15h2v2h-2V15z M11,7h2v6h-2V7z" opacity=".3"/>
    <path d="M13 15h-2v-2h2v2zm0-4h-2V7h2v4z"/>
    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8z"/>
    <path d="M11 7h2v6h-2zM11 15h2v2h-2z"/>
  </svg>
);


function WelcomeGame({ onStart }) {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-center items-center text-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full transform transition-all hover:scale-105 duration-300">
        <WelcomeIcon />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome, Explorer!</h1>
        <p className="text-gray-600 mb-6">
          A delicious journey across India awaits for you. Are you ready to discover the amazing food from every corner of the country?
        </p>
        <Link to="/food-explorer"><button
          onClick={onStart}
          className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 transform hover:translate-y-[-2px] transition-all duration-200 shadow-lg"
        >
          Start Your Food Adventure!
        </button></Link>
      </div>
    </div>
  );
}

export default WelcomeGame;

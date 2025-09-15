// src/App.js
import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

// Import all of your components
import LandingPage from './Components/LandingPage';
import LoginPage from './Components/LoginPage';
import GyanBotWelcome from './Components/Welcome/GyanBotWelcome';
import AsteroidSorterGame from './Components/PhaserGames/Class6/AsteroidSorter/AsteroidSorterGame';

const App = () => {
    // Shared state to store the student's name
    const [studentName, setStudentName] = useState('');

    return (
        <HashRouter>
            <Routes>
                {/* The landing page is the root route */}
                <Route path="/" element={<LandingPage />} />
                
                {/* The login page is at the /login path */}
                <Route path="/login" element={<LoginPage setStudentName={setStudentName} />} />

                {/* The route for the welcome page, passing the student's name */}
                <Route path="/welcome" element={<GyanBotWelcome name={studentName} />} />

                {/* The route for the game component */}
                <Route path="/game/asteroid-sorter" element={<AsteroidSorterGame />} />
            </Routes>
        </HashRouter>
    );
};

export default App;
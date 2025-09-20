import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './Components/WelcomePage';
import LoginPage from './Components/LoginPage';


function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/login" element={<LoginPage />} />
                
                
            </Routes>
        </HashRouter>
    );
}

export default App;


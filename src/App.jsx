import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './Components/WelcomePage';
import LoginPage from './Components/LoginPage';
import DashboardPage from './Components/StudentDashboard/DashboardPage';


function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
        </HashRouter>
    );
}

export default App;


import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import WelcomePage from './Components/WelcomePage';
import LoginPage from './Components/LoginPage';
import StudentDashboard from './Components/StudentDashboard/StudentDashboard';
import FirstPage from './Class 6/Content/FirstPage.jsx'
import AnimalDietGame from './Components/Class 6/Games/AnimalDietGame/AnimalDietGame.jsx'
function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<StudentDashboard/>}/>
                <Route path="/dashboard/first-page" element={<FirstPage/>}/>
                <Route path='/dashboard/first-page/animal-diet-game' element={<AnimalDietGame/>}/>

            </Routes>
        </HashRouter>
    );
}

export default App;


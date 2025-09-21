import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Import your new Layout component
import Layout from './Components/Layout/Layout.jsx'; 

import WelcomePage from './Components/WelcomePage';
import LoginPage from './Components/LoginPage';
import StudentDashboard from './Components/StudentDashboard/StudentDashboard';
import TeacherDashboard from './TeacherDashboard/TeacherDashboard.jsx';
import FirstPage from './Class 6/Content/FirstPage.jsx';
import AnimalDietGame from './Components/Class 6/Games/AnimalDietGame/AnimalDietGame.jsx';
import FoodExplorer from './Components/Class 6/Games/FoodExplorer/FoodExplorer';
import GardenGobbleGame from './Components/Class 6/Games/GardenGobbleGame/GardenGobbleGame.jsx';
import SourceSorterGame from "./Components/Class 6/Games/SourceSorterGame/SourceSorterGame";
import GardenHarvestGame from "./Components/Class 6/Games/GardenHarvestGame/GardenHarvestGame.jsx";

function App() {
    return (
        <HashRouter>
            <Routes>
                {/* Routes WITHOUT the language switcher */}
                <Route path="/" element={<WelcomePage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Parent route that uses the Layout component */}
                <Route element={<Layout />}>
                    {/* All nested routes will render inside the Layout's <Outlet> */}
                    {/* This means they will all have the header with the language switcher */}
                    <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
                    <Route path="/dashboard" element={<StudentDashboard />} />
                    <Route path="/dashboard/first-page" element={<FirstPage />} />
                    <Route path='/dashboard/first-page/animal-diet-game' element={<AnimalDietGame />} />
                    <Route path="/dashboard/food-explorer" element={<FoodExplorer />} />
                    <Route path="/dashboard/first-page/dashboard/garden-gobble-game" element={<GardenGobbleGame />} />
                    <Route path="/dashboard/first-page/dashboard/source-sorter-game" element={<SourceSorterGame />} />
                    <Route path="/dashboard/first-page/dashboard/garden-harvest-game" element={<GardenHarvestGame />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}

export default App;
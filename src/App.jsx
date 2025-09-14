import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./Components/LandingPage";
import LoginPage from "./Components/LoginPage";



const App = () => {



  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;




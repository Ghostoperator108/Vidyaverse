import React from 'react'
import { BrowserRouter,Routes,Route, useNavigate } from 'react-router-dom'
import LandingPage from './Components/LandingPage'
import LoginPage from './Components/LoginPage'
const App = () => {
  return (
    <div>
      <LandingPage/>
    </div>
  )
}

export default App

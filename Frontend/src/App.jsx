import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import BusinessOnboarding from './pages/BusinessOnboarding/BusinessOnboarding'
import Event from './pages/Event/Event'
import Wedding from './pages/Wedding/Wedding'
import Results from './pages/Results/Results'
import Favorites from './pages/Favorites/Favorites'
import ServiceSelection from './pages/ServiceSelection/ServiceSelection'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/business-onboarding" element={<BusinessOnboarding />} />
        <Route path="/event" element={<Event />} />
        <Route path="/service-selection" element={<ServiceSelection />} />
        <Route path="/wedding" element={<Wedding />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  )
}

export default App

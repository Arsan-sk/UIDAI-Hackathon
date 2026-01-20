import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ResearchDashboard from './pages/ResearchDashboard';
import PolicymakerDashboard from './pages/PolicymakerDashboard';
import TechDashboard from './pages/TechDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/research" element={<ResearchDashboard />} />
          <Route path="/policymaker" element={<PolicymakerDashboard />} />
          <Route path="/tech" element={<TechDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

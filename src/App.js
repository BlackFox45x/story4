import React from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import GameDashboard from './components/GameDashboard';
import ProductionDashboard from './components/ProductionDashboard';
import FundraisingDashboard from './components/FundraisingDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Business Dashboard</Link>
          <Link to="/game" className="nav-link">Game Dashboard</Link>
          <Link to="/production" className="nav-link">Production Dashboard</Link>
          <Link to="/fundraising" className="nav-link">Fundraising Dashboard</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/game" element={<GameDashboard />} />
          <Route path="/production" element={<ProductionDashboard />} />
          <Route path="/fundraising" element={<FundraisingDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 
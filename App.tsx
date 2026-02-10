import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import Home from './app/page';
import Training from './app/training/page';
import Session from './app/session/[id]/page';
import Dashboard from './app/dashboard/page';
import HistoryPage from './app/history/page';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-navy-dark font-sans text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/training" element={<Training />} />
            <Route path="/session/:id" element={<Session />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

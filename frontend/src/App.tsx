import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import DocumentProcessor from './pages/DocumentProcessor';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/documents" element={<DocumentProcessor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
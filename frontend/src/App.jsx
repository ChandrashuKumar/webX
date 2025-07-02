import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './features/auth/Signup';
import Login from './features/auth/Login';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* Add more protected routes here */}
      </Routes>
    </div>
  );
}

export default App;

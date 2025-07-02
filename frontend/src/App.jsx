import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Signup from './features/auth/Signup';
import Login from './features/auth/Login';
import PrivateRoute from './components/PrivateRoute';
import GuestRoute from './components/GuestRoute';
import Landing from './pages/Landing';
import './App.css';

// Placeholder dashboard
const Dashboard = () => <div className="text-white p-4">Dashboard (Protected)</div>;

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <div className="app-container bg-gray-900 min-h-screen">
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Landing />} />

        {/* Only for guests (unauthenticated users) */}
        <Route
          path="/signup"
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        {/* Authenticated only */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route
          path="*"
          element={<Navigate to={token ? "/dashboard" : "/"} />}
        />
      </Routes>
    </div>
  );
}

export default App;

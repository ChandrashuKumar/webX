import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Signup from './features/auth/Signup';
import Login from './features/auth/Login';
import PrivateRoute from './components/PrivateRoute';
import GuestRoute from './components/GuestRoute';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ProtectedLayout from './layouts/ProtectedLayout';
import TeamDetails from './features/teams/TeamDetails';
import './App.css';

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <div className="app-container bg-gray-900 min-h-screen">
      <Routes>
        <Route path="/" element={<Landing />} />

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

        {/* Protected layout wrapping all internal pages */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/teams/:teamId"
          element={
            <PrivateRoute>
              <ProtectedLayout>
                <TeamDetails />
              </ProtectedLayout>
            </PrivateRoute>
          }
        />

        {/* Add more protected pages inside ProtectedLayout later */}

        <Route
          path="*"
          element={<Navigate to={token ? "/dashboard" : "/"} />}
        />
      </Routes>
    </div>
  );
}

export default App;

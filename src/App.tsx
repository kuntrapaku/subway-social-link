
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import AuthCallback from '@/pages/AuthCallback';
import Profile from '@/pages/Profile';
import ProfileBuilder from '@/pages/ProfileBuilder';
import Messages from '@/pages/Messages';
import Notifications from '@/pages/Notifications';
import Network from '@/pages/Network';
import FilmIndustry from '@/pages/FilmIndustry';
import NotFound from '@/pages/NotFound';
import UserProfile from '@/pages/UserProfile';
import { TempAuthProvider, useTempAuth } from '@/context/TempAuthContext';

// ProtectedRoute component for temporary auth
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useTempAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function AppRoutes() {
  const { user, isLoading } = useTempAuth();

  return (
    <Routes>
      <Route path="/login" element={
        user && !isLoading ? <Navigate to="/" replace /> : <Login />
      } />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/profile-builder" element={
        <ProtectedRoute>
          <ProfileBuilder />
        </ProtectedRoute>
      } />
      <Route path="/messages" element={
        <ProtectedRoute>
          <Messages />
        </ProtectedRoute>
      } />
      <Route path="/notifications" element={
        <ProtectedRoute>
          <Notifications />
        </ProtectedRoute>
      } />
      <Route path="/network" element={
        <ProtectedRoute>
          <Network />
        </ProtectedRoute>
      } />
      <Route path="/film-industry" element={
        <ProtectedRoute>
          <FilmIndustry />
        </ProtectedRoute>
      } />
      <Route path="/user/:userId" element={
        <ProtectedRoute>
          <UserProfile />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <TempAuthProvider>
        <AppRoutes />
      </TempAuthProvider>
    </Router>
  );
}

export default App;

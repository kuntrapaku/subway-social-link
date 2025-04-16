import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import AuthCallback from '@/pages/AuthCallback';
import Profile from '@/pages/Profile';
import Messages from '@/pages/Messages';
import Notifications from '@/pages/Notifications';
import Network from '@/pages/Network';
import FilmIndustry from '@/pages/FilmIndustry';
import NotFound from '@/pages/NotFound';
import UserProfile from '@/pages/UserProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/network" element={<Network />} />
        <Route path="/film-industry" element={<FilmIndustry />} />
        <Route path="/user/:userId" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

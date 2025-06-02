
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { NotificationsProvider } from "@/context/NotificationsContext";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Network from "./pages/Network";
import Messages from "./pages/Messages";
import FilmIndustry from "./pages/FilmIndustry";
import Notifications from "./pages/Notifications";
import UserManagement from "./pages/UserManagement";
import HelpSupport from "./pages/HelpSupport";
import ReportsAnalytics from "./pages/ReportsAnalytics";
import ProfileBuilder from "./pages/ProfileBuilder";
import PublicProfile from "./pages/PublicProfile";
import AdminDashboard from "./pages/AdminDashboard";
import AuthCallback from "./pages/AuthCallback";
import NotFound from "./pages/NotFound";
import AdminRoute from "./components/AdminRoute";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <NotificationsProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/profile/:slug" element={<PublicProfile />} />
                <Route path="/" element={<Layout />}>
                  <Route index element={<Index />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="user/:id" element={<UserProfile />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="projects/:id" element={<ProjectDetail />} />
                  <Route path="network" element={<Network />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="film-industry" element={<FilmIndustry />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="profile-builder" element={<ProfileBuilder />} />
                  <Route path="reports" element={<ReportsAnalytics />} />
                  <Route path="help" element={<HelpSupport />} />
                  <Route 
                    path="admin" 
                    element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    } 
                  />
                  <Route 
                    path="user-management" 
                    element={
                      <AdminRoute>
                        <UserManagement />
                      </AdminRoute>
                    } 
                  />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </NotificationsProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

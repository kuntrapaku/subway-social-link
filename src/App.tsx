
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TempAuthProvider } from "./context/TempAuthContext";
import { NotificationsProvider } from "./context/NotificationsContext";
import Layout from "./components/layout/Layout";
import Feed from "./pages/Feed";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import PublicProfile from "./pages/PublicProfile";
import Messages from "./pages/Messages";
import Network from "./pages/Network";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Notifications from "./pages/Notifications";
import FilmIndustry from "./pages/FilmIndustry";
import ProfileBuilder from "./pages/ProfileBuilder";
import HelpSupport from "./pages/HelpSupport";
import ReportsAnalytics from "./pages/ReportsAnalytics";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import AuthCallback from "./pages/AuthCallback";
import NotFound from "./pages/NotFound";
import AdminRoute from "./components/AdminRoute";
import { useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/p/:slug" element={<PublicProfile />} />
      
      {/* Landing page for non-authenticated users, Feed for authenticated */}
      <Route path="/" element={user ? <Layout><Feed /></Layout> : <LandingPage />} />
      
      {/* Protected routes */}
      <Route path="/profile" element={<Layout><Profile /></Layout>} />
      <Route path="/user/:userId" element={<Layout><UserProfile /></Layout>} />
      <Route path="/messages" element={<Layout><Messages /></Layout>} />
      <Route path="/network" element={<Layout><Network /></Layout>} />
      <Route path="/projects" element={<Layout><Projects /></Layout>} />
      <Route path="/projects/:id" element={<Layout><ProjectDetail /></Layout>} />
      <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
      <Route path="/film-industry" element={<Layout><FilmIndustry /></Layout>} />
      <Route path="/profile-builder" element={<Layout><ProfileBuilder /></Layout>} />
      <Route path="/help-support" element={<Layout><HelpSupport /></Layout>} />
      <Route path="/reports-analytics" element={<Layout><ReportsAnalytics /></Layout>} />
      
      {/* Admin routes */}
      <Route path="/admin" element={
        <AdminRoute>
          <Layout><AdminDashboard /></Layout>
        </AdminRoute>
      } />
      <Route path="/user-management" element={
        <AdminRoute>
          <Layout><UserManagement /></Layout>
        </AdminRoute>
      } />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TempAuthProvider>
          <NotificationsProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </TooltipProvider>
          </NotificationsProvider>
        </TempAuthProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

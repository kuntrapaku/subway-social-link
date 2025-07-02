
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TempAuthProvider } from "./context/TempAuthContext";
import { NotificationsProvider } from "./context/NotificationsContext";
import { Layout } from "./components/layout/Layout";
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
import Industry from "./pages/Industry";
import Settings from "./pages/Settings";
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
      {/* Public routes without Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/p/:slug" element={<PublicProfile />} />
      
      {/* Landing page for non-authenticated users, Feed for authenticated */}
      <Route path="/" element={user ? <Feed /> : <LandingPage />} />
      
      {/* Protected routes with Layout wrapper */}
      <Route element={<Layout />}>
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:username" element={<UserProfile />} />
        <Route path="/user/:userId" element={<UserProfile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/network" element={<Network />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/industry" element={<Industry />} />
        <Route path="/film-industry" element={<FilmIndustry />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile-builder" element={<ProfileBuilder />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/reports-analytics" element={<ReportsAnalytics />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="/user-management" element={
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        } />
      </Route>
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TempAuthProvider>
            <NotificationsProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <AppRoutes />
              </TooltipProvider>
            </NotificationsProvider>
          </TempAuthProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

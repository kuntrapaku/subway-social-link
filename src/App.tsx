import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NotificationsProvider } from "./context/NotificationsContext";
import { Layout } from "./components/layout/Layout";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Network from "./pages/Network";
import Notifications from "./pages/Notifications";
import ReportsAnalytics from "./pages/ReportsAnalytics";
import HelpSupport from "./pages/HelpSupport";
import UserProfile from "./pages/UserProfile";
import PublicProfile from "./pages/PublicProfile";
import ProfileBuilder from "./pages/ProfileBuilder";
import UserManagement from "./pages/UserManagement";
import FilmIndustry from "./pages/FilmIndustry";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Login from "./pages/Login";
import AuthCallback from "./pages/AuthCallback";
import NotFound from "./pages/NotFound";
import AdminRoute from "./components/AdminRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <NotificationsProvider>
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/" element={<Layout />}>
                  <Route index element={<Index />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="network" element={<Network />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="reports" element={<ReportsAnalytics />} />
                  <Route path="help" element={<HelpSupport />} />
                  <Route path="user/:userId" element={<UserProfile />} />
                  <Route path="public/:slug" element={<PublicProfile />} />
                  <Route path="profile-builder" element={<ProfileBuilder />} />
                  <Route path="film-industry" element={<FilmIndustry />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="projects/:id" element={<ProjectDetail />} />
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
            </BrowserRouter>
          </NotificationsProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;


import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NotificationsProvider } from "./context/NotificationsContext";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Network from "./pages/Network";
import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import AuthCallback from "./pages/AuthCallback";
import { supabase } from "@/integrations/supabase/client";

// Initialize the database with SQL for profiles and connections
const initializeDatabase = async () => {
  try {
    // Check if the profiles table exists - if not, it means we need to set it up
    // @ts-ignore - Supabase TypeScript type issues
    const { error } = await supabase.from('profiles').select('id').limit(1);
    
    if (error && error.code === "42P01") { // 42P01 is PostgreSQL's code for undefined_table
      console.log("Profiles table does not exist, trying to set up database...");
      
      // Load the SQL file content
      const response = await fetch('/supabase/migrations/20250416_create_profiles_and_connections.sql');
      const sqlContent = await response.text();
      
      // Run the SQL (note: normally we'd run this properly via migrations, but for demo)
      // @ts-ignore - Supabase TypeScript type issues
      const { error: sqlError } = await supabase.rpc('exec_sql', { sql: sqlContent });
      
      if (sqlError) {
        console.error("Failed to initialize database:", sqlError);
      } else {
        console.log("Database initialized successfully");
      }
    }
  } catch (error) {
    console.error("Error checking or initializing database:", error);
  }
};

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Try to initialize database on app load
    initializeDatabase();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <NotificationsProvider>
            <BrowserRouter>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/network" element={<Network />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/login" element={<Login />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </NotificationsProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

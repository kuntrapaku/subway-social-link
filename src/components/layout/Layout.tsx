
import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import EnhancedNavbar from "@/components/layout/EnhancedNavbar";
import { useAuth } from "@/context/AuthContext";

export const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Don't redirect if still loading or already on auth pages
    if (isLoading || location.pathname === '/login' || location.pathname === '/auth/callback') {
      return;
    }

    // Redirect to login if no user is authenticated
    if (!user) {
      console.log("No authenticated user, redirecting to login");
      navigate('/login', { replace: true });
    }
  }, [user, isLoading, navigate, location.pathname]);

  // Show loading indicator while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Don't render layout if user is not authenticated (will be redirected)
  if (!user && location.pathname !== '/login' && location.pathname !== '/auth/callback') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedNavbar />
      <main className="w-full">
        {children || <Outlet />}
      </main>
    </div>
  );
};

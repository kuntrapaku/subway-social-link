
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";

const AuthCallback = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      try {
        setLoading(true);
        console.log("Auth callback initiated, URL:", window.location.href);
        
        // Process the hash fragment containing the access token
        const hashParams = new URLSearchParams(location.hash.substring(1));
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");
        
        console.log("Access token found:", !!accessToken);
        
        if (accessToken) {
          // If we have an access token, let Supabase handle the session
          console.log("Setting session with tokens");
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || "",
          });

          if (error) {
            console.error("Session setup error:", error);
            throw error;
          }

          console.log("Session setup successful");
          toast.success("Authentication successful");
        } else {
          // Check for error in the URL query parameters
          const urlParams = new URLSearchParams(location.search);
          const errorCode = urlParams.get("error");
          const errorDescription = urlParams.get("error_description");
          
          console.log("Error params:", errorCode, errorDescription);
          
          if (errorCode) {
            throw new Error(errorDescription || `Authentication error: ${errorCode}`);
          } else {
            throw new Error("No access token found in URL");
          }
        }
      } catch (err: any) {
        console.error("Auth callback error:", err);
        setError(err.message || "Authentication failed");
        toast.error(err.message || "Authentication failed");
      } finally {
        setLoading(false);
      }
    };

    handleAuthRedirect();
  }, [location]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Processing your login...</h2>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  // On success, redirect to home with force refresh
  if (!error) {
    console.log("Auth callback completed, redirecting to home");
    window.location.href = "/";
    return null;
  }

  // If there was an error, redirect to login
  console.log("Auth callback completed with error, redirecting to login");
  return <Navigate to="/login" replace />;
};

export default AuthCallback;

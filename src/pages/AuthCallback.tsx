
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AuthCallback = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      try {
        setLoading(true);
        
        // Process the hash fragment containing the access token
        const hashParams = new URLSearchParams(location.hash.substring(1));
        const accessToken = hashParams.get("access_token");
        
        if (accessToken) {
          // If we have an access token, let Supabase handle the session
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: hashParams.get("refresh_token") || "",
          });

          if (error) {
            throw error;
          }

          toast({
            title: "Authentication successful",
            description: "You are now logged in.",
          });
        } else {
          // Check for error in the URL query parameters
          const urlParams = new URLSearchParams(location.search);
          const errorCode = urlParams.get("error");
          const errorDescription = urlParams.get("error_description");
          
          if (errorCode) {
            throw new Error(errorDescription || `Authentication error: ${errorCode}`);
          } else {
            throw new Error("No access token found in URL");
          }
        }
      } catch (err: any) {
        console.error("Auth callback error:", err);
        setError(err.message || "Authentication failed");
        toast({
          title: "Authentication failed",
          description: err.message || "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    handleAuthRedirect();
  }, [location, toast]);

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

  // If there was an error, we could show it, but for simplicity let's just redirect to login
  if (error) {
    return <Navigate to="/login" replace />;
  }

  // On success, redirect to home
  return <Navigate to="/" replace />;
};

export default AuthCallback;

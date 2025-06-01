
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

type TempUser = {
  id: string;
  username: string;
  isTemporary: boolean;
};

type AuthContextType = {
  session: Session | null;
  user: User | TempUser | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | TempUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Setting up auth state listener");
    
    // Check for temporary user first
    const checkTempUser = () => {
      const storedUser = localStorage.getItem('tempUser');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          console.log('Found temp user:', userData);
          setUser(userData);
          setIsLoading(false);
          return true;
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          localStorage.removeItem('tempUser');
        }
      }
      return false;
    };

    // If we have a temp user, use that and skip Supabase auth
    if (checkTempUser()) {
      // Listen for storage events for temp auth
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'tempUser') {
          if (e.newValue) {
            try {
              const userData = JSON.parse(e.newValue);
              setUser(userData);
            } catch (error) {
              console.error('Error parsing updated user data:', error);
            }
          } else {
            setUser(null);
            navigate('/login', { replace: true });
          }
        }
      };

      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }

    // Set up Supabase auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
        
        // Handle sign out event
        if (event === 'SIGNED_OUT') {
          console.log("User signed out, redirecting to login");
          navigate('/login', { replace: true });
        }
      }
    );

    // Check for existing Supabase session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Error getting session:", error);
      }
      console.log("Initial session check:", session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      console.log("Cleaning up auth subscription");
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signOut = async () => {
    try {
      console.log("Initiating sign out");
      setIsLoading(true);
      
      // Check if this is a temp user
      const tempUser = localStorage.getItem('tempUser');
      if (tempUser) {
        // Handle temp user logout
        localStorage.removeItem('tempUser');
        setUser(null);
        setSession(null);
        
        // Dispatch storage event for cross-component sync
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'tempUser',
          newValue: null
        }));
        
        console.log("Temp user signed out successfully");
        navigate('/login', { replace: true });
        return;
      }
      
      // Handle Supabase user logout
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
        throw error;
      }
      
      // Clear local state immediately
      setSession(null);
      setUser(null);
      
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Sign out failed:", error);
      // Even if there's an error, clear local state
      setSession(null);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    session,
    user,
    isLoading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

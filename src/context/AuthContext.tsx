
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
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Handle sign in event - create/update profile
        if (event === 'SIGNED_IN' && session?.user) {
          console.log("User signed in, creating/updating profile");
          await createOrUpdateProfile(session.user);
        }
        
        // Handle sign out event
        if (event === 'SIGNED_OUT') {
          console.log("User signed out, redirecting to login");
          localStorage.removeItem('user-profile');
          localStorage.removeItem('tempUser');
          navigate('/login', { replace: true });
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing Supabase session
    supabase.auth.getSession().then(async ({ data: { session }, error }) => {
      if (error) {
        console.error("Error getting session:", error);
      }
      console.log("Initial session check:", session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      
      // Create/update profile if we have a session
      if (session?.user) {
        await createOrUpdateProfile(session.user);
      }
      
      setIsLoading(false);
    });

    return () => {
      console.log("Cleaning up auth subscription");
      subscription.unsubscribe();
    };
  }, [navigate]);

  const createOrUpdateProfile = async (user: User) => {
    try {
      console.log('Creating/updating profile for user:', user.id);
      
      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from('profile_builder')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      const profileData = {
        user_id: user.id,
        display_name: user.user_metadata?.name || user.email?.split('@')[0] || 'Film Professional',
        bio: 'Welcome to MovConnect!',
        is_published: true,
        updated_at: new Date().toISOString()
      };

      if (existingProfile) {
        // Update existing profile
        const { error } = await supabase
          .from('profile_builder')
          .update(profileData)
          .eq('user_id', user.id);
          
        if (error) {
          console.error('Error updating profile:', error);
        } else {
          console.log('Profile updated successfully');
        }
      } else {
        // Create new profile
        const { error } = await supabase
          .from('profile_builder')
          .insert(profileData);
          
        if (error) {
          console.error('Error creating profile:', error);
        } else {
          console.log('Profile created successfully');
        }
      }

      // Cache profile in localStorage
      const localProfileData = {
        id: user.id,
        name: profileData.display_name,
        title: 'Film Professional',
        location: 'Mumbai, India',
        connections: 0,
        company: 'MovCon Studios',
        joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        website: '',
        bio: profileData.bio,
        user_id: user.id
      };
      
      localStorage.setItem('user-profile', JSON.stringify(localProfileData));
      console.log('Profile cached in localStorage:', localProfileData);
      
      // Trigger profile update event
      window.dispatchEvent(new Event("profile-updated"));
      
    } catch (error) {
      console.error('Error in createOrUpdateProfile:', error);
    }
  };

  const signOut = async () => {
    try {
      console.log("Initiating sign out");
      setIsLoading(true);
      
      // Check if this is a temp user
      const tempUser = localStorage.getItem('tempUser');
      if (tempUser) {
        localStorage.removeItem('tempUser');
        localStorage.removeItem('user-profile');
        setUser(null);
        setSession(null);
        
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
      
      localStorage.removeItem('user-profile');
      localStorage.removeItem('tempUser');
      setSession(null);
      setUser(null);
      
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Sign out failed:", error);
      localStorage.removeItem('user-profile');
      localStorage.removeItem('tempUser');
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

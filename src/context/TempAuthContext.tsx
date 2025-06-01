
import { createContext, useContext, useEffect, useState } from 'react';

type TempUser = {
  id: string;
  username: string;
  isTemporary: boolean;
} | null;

type TempAuthContextType = {
  user: TempUser;
  isLoading: boolean;
  signOut: () => void;
};

const TempAuthContext = createContext<TempAuthContextType>({
  user: null,
  isLoading: true,
  signOut: () => {},
});

export const TempAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TempUser>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('TempAuthProvider initializing...');
    
    // Check for stored temp user on load
    const checkStoredUser = () => {
      const storedUser = localStorage.getItem('tempUser');
      console.log('Stored user data:', storedUser);
      
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          console.log('Parsed user data:', userData);
          setUser(userData);
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          localStorage.removeItem('tempUser');
        }
      }
      setIsLoading(false);
    };

    checkStoredUser();

    // Listen for storage events (for cross-tab sync and manual updates)
    const handleStorageChange = (e: StorageEvent) => {
      console.log('Storage event detected:', e);
      if (e.key === 'tempUser') {
        if (e.newValue) {
          try {
            const userData = JSON.parse(e.newValue);
            console.log('Updated user from storage event:', userData);
            setUser(userData);
          } catch (error) {
            console.error('Error parsing updated user data:', error);
          }
        } else {
          console.log('User signed out via storage event');
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const signOut = () => {
    console.log('Signing out user');
    localStorage.removeItem('tempUser');
    setUser(null);
    
    // Dispatch storage event for cross-component sync
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'tempUser',
      newValue: null
    }));
  };

  const value = {
    user,
    isLoading,
    signOut,
  };

  console.log('TempAuthProvider state:', { user: !!user, isLoading });

  return <TempAuthContext.Provider value={value}>{children}</TempAuthContext.Provider>;
};

export const useTempAuth = () => useContext(TempAuthContext);

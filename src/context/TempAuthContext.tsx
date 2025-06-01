
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
    // Check for stored temp user on load
    const storedUser = localStorage.getItem('tempUser');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('tempUser');
      }
    }
    setIsLoading(false);
  }, []);

  const signOut = () => {
    localStorage.removeItem('tempUser');
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    signOut,
  };

  return <TempAuthContext.Provider value={value}>{children}</TempAuthContext.Provider>;
};

export const useTempAuth = () => useContext(TempAuthContext);

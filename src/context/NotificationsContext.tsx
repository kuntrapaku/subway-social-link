
import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationType } from '@/types/notifications';

interface NotificationsContextType {
  notifications: NotificationType[];
  unreadCount: number;
  markAllAsRead: () => void;
  markAsRead: (id: string) => void;
  handleNotificationClick: (notification: NotificationType) => NotificationType;
  addNotification: (notification: Omit<NotificationType, 'id' | 'created_at' | 'updated_at' | 'is_read'>) => NotificationType;
  lastNotificationTime: Date;
}

export const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

interface NotificationsProviderProps {
  children: ReactNode;
}

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({ children }) => {
  const notificationsHook = useNotifications();
  
  // Add global event listener to allow adding notifications from other components
  useEffect(() => {
    const handleAddNotification = (event: CustomEvent) => {
      if (event.detail) {
        notificationsHook.addNotification(event.detail);
      }
    };
    
    // Add event listener with type assertion
    window.addEventListener('add-notification', handleAddNotification as EventListener);
    
    // Cleanup
    return () => {
      window.removeEventListener('add-notification', handleAddNotification as EventListener);
    };
  }, [notificationsHook]);
  
  return (
    <NotificationsContext.Provider value={notificationsHook}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotificationsContext = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotificationsContext must be used within a NotificationsProvider');
  }
  return context;
};

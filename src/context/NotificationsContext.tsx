
import React, { createContext, useContext, ReactNode } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationType } from '@/types/notifications';

interface NotificationsContextType {
  notifications: NotificationType[];
  unreadCount: number;
  markAllAsRead: () => void;
  markAsRead: (id: string) => void;
  handleNotificationClick: (notification: NotificationType) => NotificationType;
  addNotification: (notification: Omit<NotificationType, 'id' | 'time' | 'read'>) => NotificationType;
  lastNotificationTime: Date;
}

export const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

interface NotificationsProviderProps {
  children: ReactNode;
}

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({ children }) => {
  const notificationsHook = useNotifications();
  
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

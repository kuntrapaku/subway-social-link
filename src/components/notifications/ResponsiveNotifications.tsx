
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { NotificationDrawer } from './NotificationDrawer';
import { NotificationModal } from './NotificationModal';

interface ResponsiveNotificationsProps {
  className?: string;
}

export const ResponsiveNotifications: React.FC<ResponsiveNotificationsProps> = ({ className }) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <NotificationDrawer className={className} />;
  }

  return <NotificationModal className={className} />;
};

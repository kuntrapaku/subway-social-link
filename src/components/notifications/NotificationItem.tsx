
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Notification } from '@/types/notifications';
import { NotificationIcon } from './NotificationIcon';
import { formatDistanceToNow } from 'date-fns';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onMarkAsRead 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!notification.is_read) {
      onMarkAsRead(notification.id);
    }
    
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const timeAgo = formatDistanceToNow(new Date(notification.created_at), { addSuffix: true });

  return (
    <Card 
      className={`p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
        !notification.is_read ? 'border-l-4 border-l-orange-500 bg-orange-50/30' : ''
      }`}
      onClick={handleClick}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <NotificationIcon type={notification.type} />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className={`text-sm ${!notification.is_read ? 'font-medium' : 'font-normal'}`}>
            {notification.message}
          </p>
          <p className="text-xs text-gray-500 mt-1">{timeAgo}</p>
        </div>

        {!notification.is_read && (
          <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2"></div>
        )}
      </div>
    </Card>
  );
};

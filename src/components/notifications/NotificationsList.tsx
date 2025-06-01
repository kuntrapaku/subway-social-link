
import React from 'react';
import { NotificationItem } from './NotificationItem';
import { NotificationGroup } from '@/types/notifications';

interface NotificationsListProps {
  groups: NotificationGroup[];
  onMarkAsRead: (id: string) => void;
}

export const NotificationsList: React.FC<NotificationsListProps> = ({ 
  groups, 
  onMarkAsRead 
}) => {
  if (groups.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No notifications yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <div key={group.date}>
          <h3 className="text-sm font-medium text-gray-700 mb-3 px-1">
            {group.label}
          </h3>
          <div className="space-y-2">
            {group.notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={onMarkAsRead}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

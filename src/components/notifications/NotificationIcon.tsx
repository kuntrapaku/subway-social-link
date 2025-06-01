
import React from 'react';
import { Bell, Heart, MessageSquare, UserPlus, Users, AtSign, UserCheck } from 'lucide-react';

interface NotificationIconProps {
  type: string;
  className?: string;
}

export const NotificationIcon: React.FC<NotificationIconProps> = ({ type, className = "h-5 w-5" }) => {
  switch (type) {
    case 'like':
      return <Heart className={`${className} text-red-500`} />;
    case 'comment':
      return <MessageSquare className={`${className} text-blue-500`} />;
    case 'follow':
      return <UserPlus className={`${className} text-green-500`} />;
    case 'connection':
      return <Users className={`${className} text-purple-500`} />;
    case 'mention':
      return <AtSign className={`${className} text-yellow-500`} />;
    case 'invite':
      return <UserCheck className={`${className} text-indigo-500`} />;
    default:
      return <Bell className={`${className} text-orange-500`} />;
  }
};

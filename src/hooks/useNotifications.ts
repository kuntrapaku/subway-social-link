
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Notification, NotificationGroup, NotificationFilter } from '@/types/notifications';
import { toast } from 'sonner';

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastNotificationTime, setLastNotificationTime] = useState(new Date());

  const fetchNotifications = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Type cast the data to ensure proper typing
      const typedData = (data || []).map(item => ({
        ...item,
        type: item.type as Notification['type']
      })) as Notification[];

      setNotifications(typedData);
      setUnreadCount(typedData.filter(n => !n.is_read).length);
      setLastNotificationTime(new Date());
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true, updated_at: new Date().toISOString() })
        .eq('id', notificationId);

      if (error) throw error;

      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true, updated_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .eq('is_read', false);

      if (error) throw error;

      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
      toast.success('All notifications marked as read');
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      toast.error('Failed to mark notifications as read');
    }
  };

  const handleNotificationClick = (notification: Notification): Notification => {
    if (!notification.is_read) {
      markAsRead(notification.id);
    }
    return { ...notification, is_read: true };
  };

  const addNotification = (notificationData: Omit<Notification, 'id' | 'created_at' | 'updated_at' | 'is_read'>): Notification => {
    const newNotification: Notification = {
      ...notificationData,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
    setLastNotificationTime(new Date());
    
    return newNotification;
  };

  const filterNotifications = (filter: NotificationFilter): Notification[] => {
    switch (filter) {
      case 'mentions':
        return notifications.filter(n => n.type === 'mention');
      case 'invites':
        return notifications.filter(n => n.type === 'invite');
      case 'comments':
        return notifications.filter(n => n.type === 'comment');
      default:
        return notifications;
    }
  };

  const groupNotificationsByDate = (filteredNotifications: Notification[]): NotificationGroup[] => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const groups: { [key: string]: NotificationGroup } = {};

    filteredNotifications.forEach(notification => {
      const notifDate = new Date(notification.created_at);
      let groupKey: string;
      let label: string;

      if (notifDate.toDateString() === today.toDateString()) {
        groupKey = 'today';
        label = 'Today';
      } else if (notifDate.toDateString() === yesterday.toDateString()) {
        groupKey = 'yesterday';
        label = 'Yesterday';
      } else {
        groupKey = notifDate.toDateString();
        label = notifDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'short', 
          day: 'numeric' 
        });
      }

      if (!groups[groupKey]) {
        groups[groupKey] = {
          date: groupKey,
          label,
          notifications: []
        };
      }

      groups[groupKey].notifications.push(notification);
    });

    return Object.values(groups).sort((a, b) => {
      if (a.date === 'today') return -1;
      if (b.date === 'today') return 1;
      if (a.date === 'yesterday') return -1;
      if (b.date === 'yesterday') return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  };

  useEffect(() => {
    fetchNotifications();

    // Set up real-time subscription
    if (user) {
      const channel = supabase
        .channel('notifications-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${user.id}`
          },
          () => {
            fetchNotifications();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  return {
    notifications,
    loading,
    unreadCount,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    filterNotifications,
    groupNotificationsByDate,
    handleNotificationClick,
    addNotification,
    lastNotificationTime
  };
};


import React, { useState } from 'react';
import { Bell, CheckCheck, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NotificationsList } from './NotificationsList';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationFilter } from '@/types/notifications';

interface NotificationModalProps {
  className?: string;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ className }) => {
  const {
    notifications,
    loading,
    unreadCount,
    markAsRead,
    markAllAsRead,
    filterNotifications,
    groupNotificationsByDate
  } = useNotifications();

  const [activeFilter, setActiveFilter] = useState<NotificationFilter>('all');
  const [open, setOpen] = useState(false);

  const filteredNotifications = filterNotifications(activeFilter);
  const groupedNotifications = groupNotificationsByDate(filteredNotifications);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className={`relative ${className}`}>
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="secondary">
                  {unreadCount} new
                </Badge>
              )}
            </DialogTitle>
            {unreadCount > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={markAllAsRead}
                className="flex items-center space-x-1"
              >
                <CheckCheck className="h-4 w-4" />
                <span>Mark all read</span>
              </Button>
            )}
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeFilter} onValueChange={(value) => setActiveFilter(value as NotificationFilter)}>
            <div className="border-b py-2">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="mentions">Mentions</TabsTrigger>
                <TabsTrigger value="invites">Invites</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="overflow-y-auto h-full py-4">
              <TabsContent value="all" className="m-0">
                <NotificationsList 
                  groups={groupedNotifications} 
                  onMarkAsRead={markAsRead}
                />
              </TabsContent>
              <TabsContent value="mentions" className="m-0">
                <NotificationsList 
                  groups={groupedNotifications} 
                  onMarkAsRead={markAsRead}
                />
              </TabsContent>
              <TabsContent value="invites" className="m-0">
                <NotificationsList 
                  groups={groupedNotifications} 
                  onMarkAsRead={markAsRead}
                />
              </TabsContent>
              <TabsContent value="comments" className="m-0">
                <NotificationsList 
                  groups={groupedNotifications} 
                  onMarkAsRead={markAsRead}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

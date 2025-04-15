
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Bell } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotifications } from "@/hooks/useNotifications";
import NotificationActions from "@/components/notifications/NotificationActions";
import NotificationList from "@/components/notifications/NotificationList";

const Notifications = () => {
  const { notifications, unreadCount, markAllAsRead, handleNotificationClick } = useNotifications();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-xl shadow-md border border-orange-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Bell className="h-6 w-6 text-orange-600 mr-2" />
              <h1 className="text-2xl font-bold">Notifications</h1>
              {unreadCount > 0 && (
                <span className="ml-2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            <NotificationActions 
              unreadCount={unreadCount} 
              onMarkAllAsRead={markAllAsRead} 
            />
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-6 bg-gray-100">
              <TabsTrigger value="all" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">All</TabsTrigger>
              <TabsTrigger value="unread" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">Unread</TabsTrigger>
              <TabsTrigger value="mentions" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">Mentions</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <NotificationList 
                notifications={notifications} 
                filter="all"
                onNotificationClick={handleNotificationClick} 
              />
            </TabsContent>

            <TabsContent value="unread">
              <NotificationList 
                notifications={notifications} 
                filter="unread"
                onNotificationClick={handleNotificationClick} 
              />
            </TabsContent>

            <TabsContent value="mentions">
              <NotificationList 
                notifications={notifications} 
                filter="mentions"
                onNotificationClick={handleNotificationClick} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;

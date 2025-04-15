
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Bell } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotificationsContext } from "@/context/NotificationsContext";
import NotificationActions from "@/components/notifications/NotificationActions";
import NotificationList from "@/components/notifications/NotificationList";
import { useToast } from "@/hooks/use-toast";
import { NotificationType } from "@/types/notifications";

const Notifications = () => {
  const { notifications, unreadCount, markAllAsRead, handleNotificationClick } = useNotificationsContext();
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleNotificationItemClick = (notification: NotificationType) => {
    // First call the context handler to mark as read
    const processedNotification = handleNotificationClick(notification);
    
    // Now handle navigation
    if (processedNotification.actionUrl) {
      // If there's a specific URL to navigate to
      navigate(processedNotification.actionUrl);
      toast({
        title: "Navigating",
        description: `Viewing ${processedNotification.content}`,
      });
    } else if (processedNotification.type === "connection") {
      navigate("/network");
      toast({
        title: "Film Artist",
        description: `Viewing your connection with ${processedNotification.user}`,
      });
    } else if (processedNotification.postId) {
      // We're using a query parameter to identify which post to show
      // In a real app, this would likely be a route parameter
      navigate(`/?postId=${processedNotification.postId}`);
      
      let toastDescription = `Viewing post related to ${processedNotification.user}'s activity`;
      
      if (processedNotification.commentId) {
        toastDescription = `Viewing ${processedNotification.user}'s comment`;
      } else if (processedNotification.type === "like") {
        toastDescription = `Viewing post liked by ${processedNotification.user}`;
      }
      
      toast({
        title: "Post View",
        description: toastDescription,
      });
    }
  };

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
              onFilterChange={handleFilterChange}
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
                filter={activeFilter !== "all" ? activeFilter : "all"}
                onNotificationClick={handleNotificationItemClick} 
              />
            </TabsContent>

            <TabsContent value="unread">
              <NotificationList 
                notifications={notifications} 
                filter="unread"
                onNotificationClick={handleNotificationItemClick} 
              />
            </TabsContent>

            <TabsContent value="mentions">
              <NotificationList 
                notifications={notifications} 
                filter="mentions"
                onNotificationClick={handleNotificationItemClick} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;

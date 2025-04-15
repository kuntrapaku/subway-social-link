
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Bell, Heart, Users, MessageSquare, Star, Clock, CheckCheck, Filter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface NotificationProps {
  id: string;
  type: "like" | "comment" | "connection" | "mention" | "other";
  content: string;
  user: string;
  time: string;
  read: boolean;
  postId?: string; // ID of the related post if applicable
}

const Notifications = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<NotificationProps[]>([
    {
      id: "1",
      type: "like",
      content: "liked your artwork 'Mumbai Sunset Scene'",
      user: "Vikram Patel",
      time: "2 hours ago",
      read: false,
      postId: "1"
    },
    {
      id: "2",
      type: "comment",
      content: "commented on your post: 'This is amazing work! The lighting is perfect.'",
      user: "Priya Sharma",
      time: "5 hours ago",
      read: false,
      postId: "1"
    },
    {
      id: "3",
      type: "connection",
      content: "accepted your connection request",
      user: "Arjun Kapoor",
      time: "1 day ago",
      read: true
    },
    {
      id: "4",
      type: "mention",
      content: "mentioned you in a comment: '@SurendraK check out this new camera setup!'",
      user: "Rahul Singh",
      time: "2 days ago",
      read: true,
      postId: "3"
    },
    {
      id: "5",
      type: "like",
      content: "liked your post about the new RED camera",
      user: "Deepika Reddy",
      time: "3 days ago",
      read: true,
      postId: "2"
    },
    {
      id: "6",
      type: "comment",
      content: "commented on your art: 'This frame composition is breathtaking!'",
      user: "Amit Kumar",
      time: "3 days ago",
      read: true,
      postId: "2"
    },
    {
      id: "7",
      type: "other",
      content: "Your artwork was featured in 'Top Indian Film Artists' collection",
      user: "MovConnect Team",
      time: "4 days ago",
      read: true
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    toast({
      title: "All notifications marked as read",
      description: "You have no unread notifications",
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const handleNotificationClick = (notification: NotificationProps) => {
    // Mark the notification as read
    markAsRead(notification.id);
    
    // Navigate to the appropriate location based on notification type
    if (notification.type === "connection") {
      navigate("/network");
      toast({
        title: "Network Connection",
        description: `Viewing your connection with ${notification.user}`,
      });
    } else if (notification.postId) {
      navigate(`/?postId=${notification.postId}`);
      toast({
        title: "Post View",
        description: `Viewing post related to ${notification.user}'s activity`,
      });
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-5 w-5 text-red-500" />;
      case "comment":
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case "connection":
        return <Users className="h-5 w-5 text-green-500" />;
      case "mention":
        return <Star className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-orange-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

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
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="border-gray-300 text-gray-600"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                <CheckCheck className="h-4 w-4 mr-1" />
                Mark all as read
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-600">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-6 bg-gray-100">
              <TabsTrigger value="all" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">All</TabsTrigger>
              <TabsTrigger value="unread" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">Unread</TabsTrigger>
              <TabsTrigger value="mentions" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">Mentions</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 rounded-lg border ${notification.read ? 'bg-white border-gray-200' : 'bg-orange-50 border-orange-200'} transition-colors duration-200 hover:bg-orange-100 cursor-pointer`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex">
                    <div className="mr-4 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{notification.user}</p>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock className="h-3 w-3 mr-1" />
                          {notification.time}
                        </div>
                      </div>
                      <p className="text-gray-600">{notification.content}</p>
                      {(notification.postId || notification.type === "connection") && (
                        <div className="mt-1 text-orange-600 text-sm flex items-center">
                          <span>View {notification.type === "connection" ? "connection" : "post"}</span>
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="unread" className="space-y-4">
              {notifications.filter(n => !n.read).length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CheckCheck className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <p>No unread notifications</p>
                </div>
              ) : (
                notifications
                  .filter(n => !n.read)
                  .map((notification) => (
                    <div 
                      key={notification.id} 
                      className="p-4 rounded-lg border bg-orange-50 border-orange-200 hover:bg-orange-100 cursor-pointer"
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex">
                        <div className="mr-4 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">{notification.user}</p>
                            <div className="flex items-center text-gray-500 text-sm">
                              <Clock className="h-3 w-3 mr-1" />
                              {notification.time}
                            </div>
                          </div>
                          <p className="text-gray-600">{notification.content}</p>
                          {(notification.postId || notification.type === "connection") && (
                            <div className="mt-1 text-orange-600 text-sm flex items-center">
                              <span>View {notification.type === "connection" ? "connection" : "post"}</span>
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </TabsContent>

            <TabsContent value="mentions" className="space-y-4">
              {notifications.filter(n => n.type === 'mention').length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Star className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <p>No mentions yet</p>
                </div>
              ) : (
                notifications
                  .filter(n => n.type === 'mention')
                  .map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 rounded-lg border ${notification.read ? 'bg-white border-gray-200' : 'bg-orange-50 border-orange-200'} hover:bg-orange-100 cursor-pointer`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex">
                        <div className="mr-4 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">{notification.user}</p>
                            <div className="flex items-center text-gray-500 text-sm">
                              <Clock className="h-3 w-3 mr-1" />
                              {notification.time}
                            </div>
                          </div>
                          <p className="text-gray-600">{notification.content}</p>
                          {notification.postId && (
                            <div className="mt-1 text-orange-600 text-sm flex items-center">
                              <span>View post</span>
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;

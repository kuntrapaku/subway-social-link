
import React, { useState } from "react";
import { CheckCheck, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NotificationActionsProps {
  unreadCount: number;
  onMarkAllAsRead: () => void;
  onFilterChange?: (filter: string) => void;
}

const NotificationActions: React.FC<NotificationActionsProps> = ({ 
  unreadCount, 
  onMarkAllAsRead,
  onFilterChange
}) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  return (
    <div className="flex space-x-2">
      <Button 
        variant="outline" 
        className="border-gray-300 text-gray-600"
        onClick={onMarkAllAsRead}
        disabled={unreadCount === 0}
      >
        <CheckCheck className="h-4 w-4 mr-1" />
        Mark all as read
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-gray-300 text-gray-600">
            <Filter className="h-4 w-4 mr-1" />
            {activeFilter === "all" ? "All" : 
             activeFilter === "likes" ? "Likes" :
             activeFilter === "comments" ? "Comments" :
             activeFilter === "connections" ? "Connections" : "Filter"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Filter Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => handleFilterChange("all")}
            className={activeFilter === "all" ? "bg-orange-50" : ""}
          >
            All Notifications
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleFilterChange("likes")}
            className={activeFilter === "likes" ? "bg-orange-50" : ""}
          >
            Likes
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleFilterChange("comments")}
            className={activeFilter === "comments" ? "bg-orange-50" : ""}
          >
            Comments
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleFilterChange("connections")}
            className={activeFilter === "connections" ? "bg-orange-50" : ""}
          >
            Connections
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleFilterChange("mentions")}
            className={activeFilter === "mentions" ? "bg-orange-50" : ""}
          >
            Mentions
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NotificationActions;

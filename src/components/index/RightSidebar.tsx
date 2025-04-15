
import React from "react";
import SuggestedConnections from "@/components/SuggestedConnections";
import TrendingTopics from "./TrendingTopics";
import UpcomingEvents from "./UpcomingEvents";

const RightSidebar = () => {
  return (
    <div className="hidden lg:block lg:col-span-1">
      <div className="sticky top-20 space-y-6">
        <SuggestedConnections />
        <TrendingTopics />
        <UpcomingEvents />
      </div>
    </div>
  );
};

export default RightSidebar;

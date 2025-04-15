
import React from "react";
import { Button } from "@/components/ui/button";

const UpcomingEvents = () => {
  const events = [
    {
      name: "Mumbai Film Festival",
      date: "October 15-22, 2025",
      borderColor: "border-orange-500"
    },
    {
      name: "International Film Festival of India",
      date: "November 20-28, 2025",
      borderColor: "border-orange-300"
    },
    {
      name: "Kerala Film Festival",
      date: "December 5-12, 2025",
      borderColor: "border-orange-500"
    }
  ];

  return (
    <div className="rounded-xl bg-white p-4 shadow-md border border-orange-100">
      <h3 className="font-medium text-gray-900 mb-3">Upcoming Film Festivals</h3>
      <div className="space-y-3">
        {events.map((event, index) => (
          <div key={index} className={`border-l-4 ${event.borderColor} pl-3`}>
            <h4 className="font-medium">{event.name}</h4>
            <p className="text-xs text-gray-500">{event.date}</p>
          </div>
        ))}
      </div>
      <Button className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white">
        View All Events
      </Button>
    </div>
  );
};

export default UpcomingEvents;

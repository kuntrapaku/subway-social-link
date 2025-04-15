
import React from "react";
import { Badge } from "@/components/ui/badge";

const TrendingTopics = () => {
  const trendingTopics = [
    { name: "#FilmfareAwards", count: "1.2K" },
    { name: "#NewBollywood", count: "856" },
    { name: "#RegionalCinema", count: "712" },
    { name: "#IndieFilm", count: "598" }
  ];

  return (
    <div className="rounded-xl bg-white p-4 shadow-md border border-orange-100">
      <h3 className="font-medium text-gray-900 mb-3">Trending in Indian Cinema</h3>
      <div className="space-y-3">
        {trendingTopics.map((topic, index) => (
          <div key={index} className="flex items-start">
            <Badge variant="outline" className="mr-2 bg-orange-50 text-orange-700 border-orange-200">
              {topic.name}
            </Badge>
            <span className="text-sm text-gray-500">{topic.count} posts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;

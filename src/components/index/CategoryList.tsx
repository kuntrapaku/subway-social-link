
import React from "react";
import { Film, Music, Globe, Camera } from "lucide-react";

interface CategoryListProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  isMobile?: boolean;
}

const CategoryList = ({ activeCategory, setActiveCategory, isMobile = false }: CategoryListProps) => {
  const categories = [
    { id: "all", name: "All Art", icon: <Film className={isMobile ? "h-4 w-4 mr-1" : "mr-2 h-4 w-4"} /> },
    { id: "bollywood", name: "Bollywood", icon: <Music className={isMobile ? "h-4 w-4 mr-1" : "mr-2 h-4 w-4"} /> },
    { id: "regional", name: isMobile ? "Regional" : "Regional Cinema", icon: <Globe className={isMobile ? "h-4 w-4 mr-1" : "mr-2 h-4 w-4"} /> },
    { id: "indie", name: isMobile ? "Indie" : "Indie Films", icon: <Camera className={isMobile ? "h-4 w-4 mr-1" : "mr-2 h-4 w-4"} /> },
  ];

  if (isMobile) {
    return (
      <div className="flex w-full overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`mr-2 flex items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
              activeCategory === category.id
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category.icon}
            {category.name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow-md border border-orange-100">
      <h3 className="font-medium text-gray-900 mb-3">Film Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex w-full items-center px-3 py-2 rounded-lg text-sm font-medium ${
              activeCategory === category.id
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category.icon}
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;


import React from "react";
import ProfileCard from "@/components/ProfileCard";
import CategoryList from "./CategoryList";
import CreativeDepartments from "./CreativeDepartments";

interface LeftSidebarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const LeftSidebar = ({ activeCategory, setActiveCategory }: LeftSidebarProps) => {
  return (
    <div className="md:col-span-1 hidden md:block">
      <div className="sticky top-20 space-y-6">
        <ProfileCard isCurrentUser={true} />
        <CategoryList activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <CreativeDepartments />
      </div>
    </div>
  );
};

export default LeftSidebar;

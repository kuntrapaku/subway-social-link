
import React from "react";
import Navbar from "@/components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="w-full pt-16">{children}</main>
    </div>
  );
};

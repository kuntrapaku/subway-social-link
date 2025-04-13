
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { FilmJobsSection } from "@/components/film-industry/FilmJobsSection";
import { FilmMarketplaceSection } from "@/components/film-industry/FilmMarketplaceSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clapperboard, 
  ShoppingBag, 
  Star, 
  Users, 
  Map, 
  Camera, 
  Headphones 
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const FilmIndustry = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const isMobile = useIsMobile();
  
  return (
    <Layout>
      <div className="relative overflow-hidden pt-20 pb-10">
        {/* Hero Banner with Parallax Effect */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black to-subway-800 opacity-90">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585951237318-9ea5e175b891?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-40"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-12 text-center text-white">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              <span className="block">Film Industry</span>
              <span className="block bg-gradient-to-r from-subway-400 to-subway-200 bg-clip-text text-transparent">
                Connections
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-xl">
              Connect with film crews, advertise your services, and discover new opportunities in the cinema world.
            </p>
          </div>

          {/* Main Content Area */}
          <div className="rounded-xl bg-white/95 p-6 shadow-xl backdrop-blur">
            <Tabs defaultValue="jobs" className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-2">
                <TabsTrigger value="jobs" className="gap-2 text-lg">
                  <Clapperboard className="h-5 w-5" />
                  <span className={isMobile ? "hidden" : "inline"}>Film Jobs</span>
                </TabsTrigger>
                <TabsTrigger value="marketplace" className="gap-2 text-lg">
                  <ShoppingBag className="h-5 w-5" />
                  <span className={isMobile ? "hidden" : "inline"}>Marketplace</span>
                </TabsTrigger>
              </TabsList>

              {/* Category Filter Pills */}
              <div className="mb-6 flex w-full overflow-x-auto pb-2">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`mr-2 flex items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                    activeCategory === "all"
                      ? "bg-subway-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Star className="mr-1 h-4 w-4" />
                  All
                </button>
                <button
                  onClick={() => setActiveCategory("crew")}
                  className={`mr-2 flex items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                    activeCategory === "crew"
                      ? "bg-subway-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Users className="mr-1 h-4 w-4" />
                  Crew
                </button>
                <button
                  onClick={() => setActiveCategory("locations")}
                  className={`mr-2 flex items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                    activeCategory === "locations"
                      ? "bg-subway-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Map className="mr-1 h-4 w-4" />
                  Locations
                </button>
                <button
                  onClick={() => setActiveCategory("equipment")}
                  className={`mr-2 flex items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                    activeCategory === "equipment"
                      ? "bg-subway-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Camera className="mr-1 h-4 w-4" />
                  Equipment
                </button>
                <button
                  onClick={() => setActiveCategory("sound")}
                  className={`mr-2 flex items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                    activeCategory === "sound"
                      ? "bg-subway-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Headphones className="mr-1 h-4 w-4" />
                  Sound
                </button>
              </div>

              <TabsContent value="jobs" className="space-y-4">
                <FilmJobsSection activeCategory={activeCategory} />
              </TabsContent>
              
              <TabsContent value="marketplace" className="space-y-4">
                <FilmMarketplaceSection activeCategory={activeCategory} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FilmIndustry;

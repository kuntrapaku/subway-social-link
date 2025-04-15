
import React from "react";
import { Brush, Camera, Palette, Scissors } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";

const CreativeDepartments = () => {
  const departments = [
    {
      name: "Direction",
      icon: <Brush className="mr-2 h-4 w-4" />,
      subItems: ["Directors", "Assistant Directors", "Script Supervisors"]
    },
    {
      name: "Camera",
      icon: <Camera className="mr-2 h-4 w-4" />,
      subItems: ["Cinematographers", "Camera Operators", "Focus Pullers"]
    },
    {
      name: "Art",
      icon: <Palette className="mr-2 h-4 w-4" />,
      subItems: ["Art Directors", "Production Designers", "Set Decorators"]
    },
    {
      name: "Post",
      icon: <Scissors className="mr-2 h-4 w-4" />,
      subItems: ["Editors", "VFX Artists", "Colorists"]
    }
  ];

  return (
    <div className="rounded-xl bg-white p-4 shadow-md border border-orange-100">
      <h3 className="font-medium text-gray-900 mb-3">Creative Departments</h3>
      <NavigationMenu>
        <NavigationMenuList className="flex flex-col space-y-1">
          {departments.map((department, index) => (
            <NavigationMenuItem key={index}>
              <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100 px-3 py-2 rounded-lg text-sm font-medium text-gray-700">
                {department.icon} {department.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="min-w-[200px] bg-white p-2 rounded-lg shadow-lg">
                <ul className="space-y-1">
                  {department.subItems.map((item, idx) => (
                    <li key={idx}>
                      <NavigationMenuLink className="block px-3 py-2 text-sm hover:bg-gray-100 rounded">
                        {item}
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default CreativeDepartments;


import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Phone, ShoppingBag, Star } from "lucide-react";

interface FilmMarketplaceSectionProps {
  activeCategory: string;
}

export const FilmMarketplaceSection: React.FC<FilmMarketplaceSectionProps> = ({ activeCategory }) => {
  // Sample marketplace data
  const marketplaceItems = [
    {
      id: 1,
      title: "RED Gemini 5K Camera Package",
      seller: "CineRental Pro",
      location: "Los Angeles, CA",
      price: "$750/day",
      category: "equipment",
      featured: true,
      description: "Complete RED Gemini 5K camera package with lenses, tripod, and accessories. Weekend discounts available.",
      image: "https://images.unsplash.com/photo-1585639525255-a204d22e551c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      title: "Vintage Warehouse Location",
      seller: "LA Film Locations",
      location: "Downtown Los Angeles, CA",
      price: "$2,500/day",
      category: "locations",
      featured: false,
      description: "10,000 sq ft industrial warehouse with natural lighting, exposed brick, and vintage fixtures. Perfect for period pieces.",
      image: "https://images.unsplash.com/photo-1580377968144-74a8f01558de?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      title: "Professional Makeup Services",
      seller: "Cinema Makeup Artists",
      location: "New York, NY",
      price: "$400/day per artist",
      category: "crew",
      featured: false,
      description: "Team of experienced makeup artists specializing in SFX, prosthetics, and character transformation for film and TV.",
      image: "https://images.unsplash.com/photo-1583241800857-d844b3a5b61a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 4,
      title: "Sennheiser Wireless Mic Kit",
      seller: "SoundPros Equipment",
      location: "Atlanta, GA",
      price: "$175/day",
      category: "sound",
      featured: true,
      description: "Professional wireless lavalier microphone set with receivers, transmitters and accessories. Perfect for interviews and dialogue.",
      image: "https://images.unsplash.com/photo-1598554793873-a7904dbd1c9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  const filteredItems = activeCategory === "all" 
    ? marketplaceItems 
    : marketplaceItems.filter(item => item.category === activeCategory);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {filteredItems.map((item) => (
        <Card key={item.id} className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${item.featured ? 'border-l-4 border-l-subway-600' : ''}`}>
          <div className="aspect-video w-full overflow-hidden bg-gray-100">
            <img 
              src={item.image} 
              alt={item.title} 
              className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105" 
            />
          </div>
          
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <div>
                <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                <CardDescription className="text-sm">{item.seller}</CardDescription>
              </div>
              {item.featured && (
                <Badge variant="default" className="bg-subway-600">
                  <Star className="mr-1 h-3 w-3" /> Featured
                </Badge>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="pb-2">
            <p className="mb-4 text-gray-700">{item.description}</p>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center text-gray-600">
                <MapPin className="mr-2 h-4 w-4 text-subway-500" />
                {item.location}
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="mr-2 h-4 w-4 text-subway-500" />
                {item.price}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between border-t pt-4">
            <Button variant="outline" size="sm" className="text-subway-600 hover:bg-subway-50 hover:text-subway-700">
              <Phone className="mr-2 h-4 w-4" /> Contact
            </Button>
            <Button size="sm" className="bg-subway-600 hover:bg-subway-700">
              <ShoppingBag className="mr-2 h-4 w-4" /> Rent Now
            </Button>
          </CardFooter>
        </Card>
      ))}
      
      {filteredItems.length === 0 && (
        <div className="col-span-2 rounded-lg border border-dashed border-gray-300 p-8 text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No items found</h3>
          <p className="mt-1 text-sm text-gray-500">
            No marketplace items matching '{activeCategory}' category are currently available.
          </p>
        </div>
      )}
    </div>
  );
};

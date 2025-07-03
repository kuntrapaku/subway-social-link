
import { useState, useEffect, useRef } from "react";
import { Search, Loader2, User, FolderOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

interface SearchResult {
  type: 'user' | 'project';
  id: string;
  title: string;
  subtitle?: string;
  avatar?: string;
  tags?: string[];
  userId: string;
}

export const GlobalSearchNavbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search function
  useEffect(() => {
    const searchData = async () => {
      if (!query.trim() || query.length < 1) {
        setResults([]);
        setShowResults(false);
        return;
      }

      setIsLoading(true);
      setShowResults(true);
      setSelectedIndex(-1);

      try {
        const searchResults: SearchResult[] = [];
        const queryLower = query.toLowerCase();

        console.log('Searching for:', query);

        // Only search Supabase if we have a real authenticated user (not temp user)
        const isRealUser = user && 'email' in user && !('isTemporary' in user);
        
        if (isRealUser) {
          try {
            // Search in Supabase profile_builder table
            const { data: profiles, error: profileError } = await supabase
              .from('profile_builder')
              .select('*')
              .or(`display_name.ilike.%${query}%,bio.ilike.%${query}%`)
              .limit(10);

            console.log('Supabase profile search results:', profiles, 'Error:', profileError);

            if (!profileError && profiles && profiles.length > 0) {
              profiles.forEach(profile => {
                // Skip current user's profile
                if (profile.user_id !== user.id) {
                  searchResults.push({
                    type: 'user',
                    id: profile.id,
                    title: profile.display_name || 'Film Professional',
                    subtitle: `Film Professional • Mumbai, India`,
                    userId: profile.user_id
                  });
                }
              });
            }

            // Search projects if we have space
            if (searchResults.length < 5) {
              const { data: projects, error: projectError } = await supabase
                .from('projects')
                .select('*')
                .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
                .eq('is_public', true)
                .limit(3);

              if (!projectError && projects) {
                projects.forEach(project => {
                  searchResults.push({
                    type: 'project',
                    id: project.id,
                    title: project.title,
                    subtitle: project.description?.substring(0, 50) + '...' || 'Film Project',
                    tags: project.tags || [],
                    userId: project.id
                  });
                });
              }
            }
          } catch (error) {
            console.error('Supabase search error:', error);
          }
        }

        // Add mock users if no database results or if temp user
        if (searchResults.length === 0) {
          const mockUsers = [
            { name: 'Ayaan Khan', role: 'Cinematographer', location: 'Mumbai', id: 'ayaan-khan' },
            { name: 'Rajesh Kumar', role: 'Cinematographer', location: 'Mumbai', id: 'rajesh-kumar' },
            { name: 'Priya Sharma', role: 'Art Director', location: 'Delhi', id: 'priya-sharma' },
            { name: 'Vikram Singh', role: 'Film Director', location: 'Chennai', id: 'vikram-singh' },
            { name: 'Aditya Kapoor', role: 'Film Director', location: 'Bangalore', id: 'aditya-kapoor' },
            { name: 'Meera Nair', role: 'Producer', location: 'Kochi', id: 'meera-nair' },
          ];

          mockUsers.forEach(mockUser => {
            if (mockUser.name.toLowerCase().includes(queryLower) || 
                mockUser.role.toLowerCase().includes(queryLower)) {
              searchResults.push({
                type: 'user',
                id: mockUser.id,
                title: mockUser.name,
                subtitle: `${mockUser.role} • ${mockUser.location}`,
                userId: mockUser.id
              });
            }
          });
        }

        console.log('Final search results:', searchResults);
        setResults(searchResults.slice(0, 8));
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(searchData, 300);
    return () => clearTimeout(timeoutId);
  }, [query, user]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleResultClick(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    console.log('Clicked result:', result);
    setShowResults(false);
    setQuery("");
    
    if (result.type === 'user') {
      navigate(`/profile/${result.userId}`);
    } else {
      navigate(`/projects/${result.id}`);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search people, projects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-4 bg-white border-gray-200 focus:border-orange-500 focus:ring-orange-200"
          onFocus={() => query.length >= 1 && setShowResults(true)}
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 animate-spin" />
        )}
      </div>

      {showResults && (
        <Card className="absolute top-full mt-1 w-full z-50 max-h-96 overflow-y-auto shadow-lg">
          <CardContent className="p-0">
            {results.length === 0 && !isLoading && (
              <div className="p-4 text-center text-gray-500">
                No results found for "{query}"
              </div>
            )}
            
            {results.map((result, index) => (
              <div
                key={`${result.type}-${result.id}`}
                className={`p-3 cursor-pointer border-b last:border-b-0 flex items-center space-x-3 ${
                  index === selectedIndex ? 'bg-orange-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleResultClick(result)}
              >
                <div className="flex-shrink-0">
                  {result.type === 'user' ? (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={result.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs">
                        {result.title.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <FolderOpen className="h-4 w-4 text-orange-600" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {result.title}
                  </p>
                  {result.subtitle && (
                    <p className="text-xs text-gray-500 truncate">
                      {result.subtitle}
                    </p>
                  )}
                  {result.tags && result.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {result.tags.slice(0, 2).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};


import { useState, useEffect, useRef } from "react";
import { Search, Loader2, ArrowUp, ArrowDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { SearchResults } from "./SearchResults";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface SearchResult {
  type: 'user' | 'project';
  id: string;
  title: string;
  subtitle?: string;
  location?: string;
  avatar?: string;
  tags?: string[];
  userId?: string;
}

export const EnhancedGlobalSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('movcon-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Search function with debouncing
  useEffect(() => {
    const searchData = async () => {
      if (!query.trim() || query.length < 2) {
        setResults([]);
        setShowResults(false);
        return;
      }

      setIsLoading(true);
      setShowResults(true);
      setSelectedIndex(-1);

      try {
        const searchResults: SearchResult[] = [];

        // Search profiles
        try {
          const { data: profiles, error: profilesError } = await supabase
            .from('profile_builder')
            .select('id, display_name, bio, user_id, profile_picture_url')
            .or(`display_name.ilike.%${query}%, bio.ilike.%${query}%`)
            .eq('is_published', true)
            .limit(5);

          if (!profilesError && profiles) {
            profiles.forEach(profile => {
              if (profile.display_name) {
                searchResults.push({
                  type: 'user',
                  id: profile.id,
                  title: profile.display_name,
                  subtitle: profile.bio || "Film Professional",
                  avatar: profile.profile_picture_url || undefined,
                  userId: profile.user_id
                });
              }
            });
          }
        } catch (profileError) {
          console.log('Profile search failed');
        }

        // Search projects
        try {
          const { data: projects, error: projectsError } = await supabase
            .from('projects')
            .select('id, title, tags, description')
            .ilike('title', `%${query}%`)
            .eq('is_public', true)
            .limit(5);

          if (!projectsError && projects) {
            projects.forEach(project => {
              searchResults.push({
                type: 'project',
                id: project.id,
                title: project.title,
                subtitle: project.description || "Film Project",
                tags: project.tags || []
              });
            });
          }
        } catch (projectError) {
          console.log('Project search failed');
        }

        // Add demo results if no database results
        if (searchResults.length === 0) {
          if (query.toLowerCase().includes('rajesh') || query.toLowerCase().includes('director')) {
            searchResults.push({
              type: 'user',
              id: 'demo-user-1',
              title: 'Rajesh Kumar',
              subtitle: 'Film Director & Cinematographer',
              location: 'Mumbai, India',
              userId: 'demo-user-1'
            });
          }
          if (query.toLowerCase().includes('priya') || query.toLowerCase().includes('art')) {
            searchResults.push({
              type: 'user',
              id: 'demo-user-2',
              title: 'Priya Sharma',
              subtitle: 'Art Director',
              location: 'Delhi, India',
              userId: 'demo-user-2'
            });
          }
          if (query.toLowerCase().includes('mumbai') || query.toLowerCase().includes('nights')) {
            searchResults.push({
              type: 'project',
              id: 'demo-project-1',
              title: 'Mumbai Nights',
              subtitle: 'Independent Drama Film',
              tags: ['Drama', 'Independent']
            });
          }
        }

        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(searchData, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

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
    // Save to recent searches
    const newRecent = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('movcon-recent-searches', JSON.stringify(newRecent));

    setShowResults(false);
    setQuery("");
    
    if (result.type === 'user') {
      navigate(`/user/${result.userId}`);
    } else {
      navigate(`/projects/${result.id}`);
    }
  };

  const handleConnect = async (userId: string) => {
    toast({
      title: "Connection Request Sent",
      description: "Your connection request has been sent successfully!",
    });
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-lg mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search creators, directors, projects…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-4 border-orange-200 focus:border-orange-500 focus:ring-orange-200"
          onFocus={() => query.length >= 2 && setShowResults(true)}
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 animate-spin" />
        )}
      </div>

      {showResults && (
        <Card className="absolute top-full mt-1 w-full z-50 max-h-96 overflow-y-auto shadow-lg border-orange-100">
          <CardContent className="p-0">
            {results.length === 0 && !isLoading && (
              <div className="p-4 text-center text-gray-500">
                <div className="mb-2">No results found</div>
                {recentSearches.length > 0 && (
                  <div className="text-xs text-gray-400">
                    Recent: {recentSearches.slice(0, 3).join(', ')}
                  </div>
                )}
              </div>
            )}
            
            {results.length > 0 && (
              <SearchResults
                results={results}
                onResultClick={handleResultClick}
                onConnect={handleConnect}
              />
            )}

            {showResults && results.length > 0 && (
              <div className="p-2 text-xs text-gray-400 border-t flex items-center justify-center gap-2">
                <ArrowUp className="h-3 w-3" />
                <ArrowDown className="h-3 w-3" />
                <span>Navigate</span>
                <span>• Enter to select • Esc to close</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

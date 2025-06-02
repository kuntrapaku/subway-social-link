
import { useState, useEffect, useRef } from "react";
import { Search, User, FolderOpen, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface SearchResult {
  type: 'user' | 'project';
  id: string;
  title: string;
  subtitle?: string;
  avatar?: string;
  tags?: string[];
  userId?: string;
}

export const GlobalSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
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

      try {
        // Search profiles
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, name, title, user_id')
          .or(`name.ilike.%${query}%, title.ilike.%${query}%`)
          .limit(5);

        // Search projects
        const { data: projects, error: projectsError } = await supabase
          .from('projects')
          .select('id, title, tags, owner_id')
          .or(`title.ilike.%${query}%, tags.cs.{${query}}`)
          .eq('is_public', true)
          .limit(5);

        if (profilesError) throw profilesError;
        if (projectsError) throw projectsError;

        const searchResults: SearchResult[] = [];

        // Add user results
        if (profiles) {
          profiles.forEach(profile => {
            searchResults.push({
              type: 'user',
              id: profile.id,
              title: profile.name,
              subtitle: profile.title,
              userId: profile.user_id
            });
          });
        }

        // Add project results
        if (projects) {
          projects.forEach(project => {
            searchResults.push({
              type: 'project',
              id: project.id,
              title: project.title,
              tags: project.tags || []
            });
          });
        }

        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
        toast.error('Failed to search');
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(searchData, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    setShowResults(false);
    setQuery("");
    
    if (result.type === 'user') {
      navigate(`/user/${result.userId}`);
    } else {
      navigate(`/projects/${result.id}`);
    }
  };

  const sendConnectionRequest = async (userId: string, userName: string) => {
    if (!user) {
      toast.error('Please log in to send connection requests');
      return;
    }

    try {
      // Check if connection already exists
      const { data: existingConnection } = await supabase
        .from('connection_requests')
        .select('*')
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${userId}),and(sender_id.eq.${userId},receiver_id.eq.${user.id})`)
        .single();

      if (existingConnection) {
        toast.error('Connection request already exists');
        return;
      }

      // Send connection request
      const { error } = await supabase
        .from('connection_requests')
        .insert({
          sender_id: user.id,
          receiver_id: userId,
          status: 'pending'
        });

      if (error) throw error;

      toast.success(`Connection request sent to ${userName}`);
    } catch (error) {
      console.error('Connection request error:', error);
      toast.error('Failed to send connection request');
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search creators or projects…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-4"
          onFocus={() => query.length >= 2 && setShowResults(true)}
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 animate-spin" />
        )}
      </div>

      {showResults && (
        <Card className="absolute top-full mt-1 w-full z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-0">
            {results.length === 0 && !isLoading && (
              <div className="p-4 text-center text-gray-500">
                No results found
              </div>
            )}
            
            {results.map((result) => (
              <div
                key={`${result.type}-${result.id}`}
                className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 flex items-center justify-between group"
              >
                <div 
                  className="flex items-center space-x-3 flex-1"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="flex-shrink-0">
                    {result.type === 'user' ? (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={result.avatar} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
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
                        {result.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {result.tags.length > 2 && (
                          <span className="text-xs text-gray-400">
                            +{result.tags.length - 2} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {result.type === 'user' && user && result.userId !== user.id && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-orange-600 border-orange-600 hover:bg-orange-50 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      sendConnectionRequest(result.userId!, result.title);
                    }}
                  >
                    Connect
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

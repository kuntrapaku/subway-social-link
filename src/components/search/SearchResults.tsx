
import { useState } from "react";
import { User, FolderOpen, MapPin, Briefcase } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SearchResultItem {
  type: 'user' | 'project';
  id: string;
  title: string;
  subtitle?: string;
  location?: string;
  avatar?: string;
  tags?: string[];
  userId?: string;
}

interface SearchResultsProps {
  results: SearchResultItem[];
  onResultClick: (result: SearchResultItem) => void;
  onConnect?: (userId: string) => void;
}

export const SearchResults = ({ results, onResultClick, onConnect }: SearchResultsProps) => {
  const navigate = useNavigate();

  const handleConnect = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation();
    onConnect?.(userId);
  };

  return (
    <div className="space-y-2">
      {results.map((result) => (
        <div
          key={`${result.type}-${result.id}`}
          className="p-3 hover:bg-orange-50 cursor-pointer border-b last:border-b-0 flex items-center justify-between group"
          onClick={() => onResultClick(result)}
        >
          <div className="flex items-center space-x-3 flex-1">
            <div className="flex-shrink-0">
              {result.type === 'user' ? (
                <Avatar className="h-10 w-10">
                  <AvatarImage src={result.avatar} />
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <FolderOpen className="h-5 w-5 text-orange-600" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {result.title}
              </p>
              {result.subtitle && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Briefcase className="h-3 w-3" />
                  <span className="truncate">{result.subtitle}</span>
                </div>
              )}
              {result.location && (
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <MapPin className="h-3 w-3" />
                  <span>{result.location}</span>
                </div>
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

          {result.type === 'user' && result.userId && (
            <Button
              size="sm"
              variant="outline"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => handleConnect(e, result.userId!)}
            >
              Connect
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

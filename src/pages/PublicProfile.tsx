
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User, ExternalLink } from 'lucide-react';
import { SocialIcon } from '@/components/profile-builder/SocialIcon';

interface PublicProfileData {
  id: string;
  display_name: string;
  bio: string;
  url_slug: string;
  profile_picture_url: string;
  theme_color: string;
  background_type: 'solid' | 'gradient' | 'image';
  background_value: string;
  font_type: 'inter' | 'poppins' | 'roboto' | 'open-sans' | 'playfair';
  social_links: Array<{
    id: string;
    platform: string;
    label: string;
    url: string;
    display_order: number;
  }>;
}

const PublicProfile = () => {
  const { slug } = useParams();
  const [profile, setProfile] = useState<PublicProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!slug) {
        setError('No profile slug provided');
        setLoading(false);
        return;
      }

      try {
        // Fetch profile by URL slug
        const { data: profileData, error: profileError } = await supabase
          .from('profile_builder')
          .select('*')
          .eq('url_slug', slug)
          .eq('is_published', true)
          .single();

        if (profileError) {
          setError('Profile not found');
          setLoading(false);
          return;
        }

        // Fetch social links
        const { data: socialLinks, error: linksError } = await supabase
          .from('social_links')
          .select('*')
          .eq('profile_id', profileData.id)
          .order('display_order');

        if (linksError) {
          console.error('Error fetching social links:', linksError);
        }

        setProfile({
          ...profileData,
          social_links: socialLinks || []
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [slug]);

  const getBackgroundStyle = () => {
    if (!profile) return {};
    
    switch (profile.background_type) {
      case 'solid':
        return { backgroundColor: profile.background_value };
      case 'gradient':
        return { background: profile.background_value };
      case 'image':
        return { 
          backgroundImage: `url(${profile.background_value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        };
      default:
        return { backgroundColor: '#ffffff' };
    }
  };

  const getFontClass = () => {
    if (!profile) return 'font-sans';
    
    switch (profile.font_type) {
      case 'poppins':
        return 'font-sans'; // Tailwind fallback
      case 'roboto':
        return 'font-sans';
      case 'open-sans':
        return 'font-sans';
      case 'playfair':
        return 'font-serif';
      default:
        return 'font-sans';
    }
  };

  const handleLinkClick = (url: string) => {
    // Ensure URL has protocol
    const finalUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Profile Not Found
            </h2>
            <p className="text-gray-600">
              The profile you're looking for doesn't exist or isn't published yet.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen ${getFontClass()}`}
      style={getBackgroundStyle()}
    >
      <div className="container max-w-2xl mx-auto py-8 px-4">
        <Card className="backdrop-blur-sm bg-white/95 shadow-xl">
          <CardContent className="p-8">
            {/* Profile Header */}
            <div className="text-center mb-8">
              <div className="mb-6">
                <Avatar className="w-32 h-32 mx-auto shadow-lg">
                  <AvatarImage 
                    src={profile.profile_picture_url} 
                    alt={profile.display_name}
                  />
                  <AvatarFallback className="bg-gray-200 text-2xl">
                    <User className="h-16 w-16 text-gray-400" />
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <h1 
                className="text-3xl font-bold mb-4"
                style={{ color: profile.theme_color }}
              >
                {profile.display_name}
              </h1>
              
              {profile.bio && (
                <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
                  {profile.bio}
                </p>
              )}
            </div>

            {/* Social Links */}
            {profile.social_links.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-center text-gray-800 mb-6">
                  Connect with me
                </h2>
                
                <div className="space-y-3">
                  {profile.social_links.map((link, index) => (
                    <div
                      key={link.id}
                      className="animate-fade-in opacity-0"
                      style={{ 
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: 'forwards'
                      }}
                    >
                      <Button
                        onClick={() => handleLinkClick(link.url)}
                        className="w-full h-14 bg-white hover:bg-gray-50 text-gray-800 border-2 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg group"
                        style={{ 
                          borderColor: profile.theme_color,
                          '--hover-color': profile.theme_color 
                        } as React.CSSProperties}
                      >
                        <div className="flex items-center justify-between w-full px-2">
                          <div className="flex items-center gap-4">
                            <SocialIcon 
                              platform={link.platform} 
                              className="h-6 w-6 group-hover:scale-110 transition-transform"
                              style={{ color: profile.theme_color }}
                            />
                            <span className="font-medium text-lg">
                              {link.label}
                            </span>
                          </div>
                          
                          <ExternalLink 
                            className="h-5 w-5 opacity-60 group-hover:opacity-100 transition-opacity"
                            style={{ color: profile.theme_color }}
                          />
                        </div>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-500">
                Create your own profile at{' '}
                <span 
                  className="font-semibold hover:underline cursor-pointer"
                  style={{ color: profile.theme_color }}
                  onClick={() => window.open('/', '_blank')}
                >
                  MovCon
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PublicProfile;

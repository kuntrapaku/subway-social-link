
import { ProfileData } from '@/pages/ProfileBuilder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, ExternalLink } from 'lucide-react';
import { SocialIcon } from './SocialIcon';

interface ProfilePreviewProps {
  profileData: ProfileData;
}

export const ProfilePreview = ({ profileData }: ProfilePreviewProps) => {
  const getBackgroundStyle = () => {
    switch (profileData.background_type) {
      case 'solid':
        return { backgroundColor: profileData.background_value };
      case 'gradient':
        return { background: profileData.background_value };
      case 'image':
        return { 
          backgroundImage: `url(${profileData.background_value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        };
      default:
        return { backgroundColor: '#ffffff' };
    }
  };

  const getFontClass = () => {
    switch (profileData.font_type) {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full max-w-sm mx-auto">
          {/* Phone Frame */}
          <div className="bg-black rounded-3xl p-2 shadow-2xl">
            <div 
              className={`w-full h-96 rounded-2xl overflow-hidden ${getFontClass()}`}
              style={getBackgroundStyle()}
            >
              <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                {/* Profile Picture */}
                <div className="w-20 h-20 rounded-full mb-4 overflow-hidden bg-white/20 flex items-center justify-center">
                  {profileData.profile_picture_url ? (
                    <img 
                      src={profileData.profile_picture_url} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-white/60" />
                  )}
                </div>

                {/* Name */}
                <h1 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
                  {profileData.display_name || 'Your Name'}
                </h1>

                {/* Bio */}
                {profileData.bio && (
                  <p className="text-sm text-white/90 mb-4 drop-shadow">
                    {profileData.bio}
                  </p>
                )}

                {/* Social Links */}
                <div className="space-y-2 w-full">
                  {profileData.social_links.slice(0, 3).map((link) => (
                    <div
                      key={link.id}
                      className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3"
                    >
                      <SocialIcon platform={link.platform} className="h-4 w-4 text-white" />
                      <span className="text-white text-sm flex-1 truncate">
                        {link.label}
                      </span>
                      <ExternalLink className="h-3 w-3 text-white/60" />
                    </div>
                  ))}
                  
                  {profileData.social_links.length > 3 && (
                    <div className="text-white/60 text-xs">
                      +{profileData.social_links.length - 3} more links
                    </div>
                  )}
                </div>

                {/* URL */}
                {profileData.url_slug && (
                  <div className="mt-4 text-white/60 text-xs">
                    movcon.app/{profileData.url_slug}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

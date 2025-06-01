
import { ProfileData } from '@/pages/ProfileBuilder';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { User, ExternalLink } from 'lucide-react';
import { SocialIcon } from './SocialIcon';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: ProfileData;
}

export const PreviewModal = ({ isOpen, onClose, profileData }: PreviewModalProps) => {
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
        return 'font-sans';
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Profile Preview</DialogTitle>
        </DialogHeader>
        
        <div 
          className={`w-full min-h-96 rounded-lg overflow-hidden ${getFontClass()}`}
          style={getBackgroundStyle()}
        >
          <div className="h-full flex flex-col items-center justify-center p-8 text-center">
            {/* Profile Picture */}
            <div className="w-24 h-24 rounded-full mb-6 overflow-hidden bg-white/20 flex items-center justify-center">
              {profileData.profile_picture_url ? (
                <img 
                  src={profileData.profile_picture_url} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-12 w-12 text-white/60" />
              )}
            </div>

            {/* Name */}
            <h1 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">
              {profileData.display_name || 'Your Name'}
            </h1>

            {/* Bio */}
            {profileData.bio && (
              <p className="text-white/90 mb-6 drop-shadow leading-relaxed">
                {profileData.bio}
              </p>
            )}

            {/* Social Links */}
            <div className="space-y-3 w-full max-w-xs">
              {profileData.social_links.map((link) => (
                <Button
                  key={link.id}
                  variant="secondary"
                  className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0 text-white"
                  onClick={() => window.open(link.url, '_blank')}
                >
                  <SocialIcon platform={link.platform} className="h-4 w-4 mr-3" />
                  <span className="flex-1 truncate">{link.label}</span>
                  <ExternalLink className="h-3 w-3 ml-2" />
                </Button>
              ))}
            </div>

            {/* URL */}
            {profileData.url_slug && (
              <div className="mt-6 text-white/60 text-sm">
                movcon.app/{profileData.url_slug}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};


import { Instagram, Youtube, Globe, Twitter } from 'lucide-react';

interface SocialIconProps {
  platform: string;
  className?: string;
}

export const SocialIcon = ({ platform, className }: SocialIconProps) => {
  switch (platform) {
    case 'instagram':
      return <Instagram className={className} />;
    case 'youtube':
      return <Youtube className={className} />;
    case 'x':
      return <Twitter className={className} />;
    case 'website':
      return <Globe className={className} />;
    default:
      return <Globe className={className} />;
  }
};

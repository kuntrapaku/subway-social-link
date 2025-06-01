
import { Instagram, Youtube, Globe, Twitter, Video, Film } from 'lucide-react';

interface SocialIconProps {
  platform: string;
  className?: string;
  style?: React.CSSProperties;
}

export const SocialIcon = ({ platform, className, style }: SocialIconProps) => {
  switch (platform) {
    case 'instagram':
      return <Instagram className={className} style={style} />;
    case 'youtube':
      return <Youtube className={className} style={style} />;
    case 'x':
      return <Twitter className={className} style={style} />;
    case 'imdb':
      return <Film className={className} style={style} />;
    case 'vimeo':
      return <Video className={className} style={style} />;
    case 'tiktok':
      return <Video className={className} style={style} />;
    case 'website':
      return <Globe className={className} style={style} />;
    case 'other':
      return <Globe className={className} style={style} />;
    default:
      return <Globe className={className} style={style} />;
  }
};

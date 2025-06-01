
import { useState } from 'react';
import { SocialLink } from '@/pages/ProfileBuilder';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SocialIcon } from './SocialIcon';

interface AddSocialLinkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (link: Omit<SocialLink, 'id' | 'display_order'>) => void;
}

const platformOptions = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'imdb', label: 'IMDb' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'vimeo', label: 'Vimeo' },
  { value: 'x', label: 'X (Twitter)' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'website', label: 'Website' },
  { value: 'other', label: 'Other' },
];

export const AddSocialLinkDialog = ({ isOpen, onClose, onAdd }: AddSocialLinkDialogProps) => {
  const [platform, setPlatform] = useState<SocialLink['platform']>('instagram');
  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');

  const handleAdd = () => {
    if (!label.trim() || !url.trim()) return;
    
    onAdd({ platform, label: label.trim(), url: url.trim() });
    
    // Reset form
    setPlatform('instagram');
    setLabel('');
    setUrl('');
    onClose();
  };

  const handlePlatformChange = (value: SocialLink['platform']) => {
    setPlatform(value);
    if (!label) {
      const option = platformOptions.find(opt => opt.value === value);
      setLabel(option?.label || '');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Social Link</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Platform</Label>
            <Select value={platform} onValueChange={handlePlatformChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {platformOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <SocialIcon platform={option.value} className="h-4 w-4" />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Label</Label>
            <Input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g., My Instagram"
            />
          </div>

          <div className="space-y-2">
            <Label>URL</Label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleAdd} disabled={!label.trim() || !url.trim()}>
              Add Link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

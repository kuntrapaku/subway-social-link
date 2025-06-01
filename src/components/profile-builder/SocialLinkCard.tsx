
import { useState } from 'react';
import { SocialLink } from '@/pages/ProfileBuilder';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GripVertical, Edit2, Trash2, Save, X } from 'lucide-react';
import { SocialIcon } from './SocialIcon';

interface SocialLinkCardProps {
  link: SocialLink;
  onUpdate: (updates: Partial<SocialLink>) => void;
  onDelete: () => void;
}

export const SocialLinkCard = ({ link, onUpdate, onDelete }: SocialLinkCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(link.label);
  const [editUrl, setEditUrl] = useState(link.url);

  const handleSave = () => {
    onUpdate({ label: editLabel, url: editUrl });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditLabel(link.label);
    setEditUrl(link.url);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card className="animate-in slide-in-from-top-2">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <GripVertical className="h-4 w-4 text-gray-400" />
            <SocialIcon platform={link.platform} className="h-5 w-5" />
            <div className="flex-1 space-y-2">
              <Input
                value={editLabel}
                onChange={(e) => setEditLabel(e.target.value)}
                placeholder="Label"
              />
              <Input
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
                placeholder="URL"
              />
            </div>
            <div className="flex items-center gap-1">
              <Button size="sm" variant="ghost" onClick={handleSave}>
                <Save className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-in slide-in-from-top-2">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
          <SocialIcon platform={link.platform} className="h-5 w-5" />
          <div className="flex-1">
            <div className="font-medium">{link.label}</div>
            <div className="text-sm text-gray-500 truncate">{link.url}</div>
          </div>
          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

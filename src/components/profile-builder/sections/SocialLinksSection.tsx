
import { useState } from 'react';
import { ProfileData, SocialLink } from '@/pages/ProfileBuilder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SocialLinkCard } from '../SocialLinkCard';
import { AddSocialLinkDialog } from '../AddSocialLinkDialog';
import { Link, Plus } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface SocialLinksSectionProps {
  profileData: ProfileData;
  setProfileData: (data: ProfileData | ((prev: ProfileData) => ProfileData)) => void;
}

export const SocialLinksSection = ({ profileData, setProfileData }: SocialLinksSectionProps) => {
  const [showAddDialog, setShowAddDialog] = useState(false);

  const addSocialLink = (link: Omit<SocialLink, 'id' | 'display_order'>) => {
    const newLink: SocialLink = {
      ...link,
      id: crypto.randomUUID(),
      display_order: profileData.social_links.length
    };
    
    setProfileData(prev => ({
      ...prev,
      social_links: [...prev.social_links, newLink]
    }));
  };

  const updateSocialLink = (id: string, updates: Partial<SocialLink>) => {
    setProfileData(prev => ({
      ...prev,
      social_links: prev.social_links.map(link =>
        link.id === id ? { ...link, ...updates } : link
      )
    }));
  };

  const deleteSocialLink = (id: string) => {
    setProfileData(prev => ({
      ...prev,
      social_links: prev.social_links.filter(link => link.id !== id)
    }));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(profileData.social_links);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update display_order
    const updatedItems = items.map((item, index) => ({
      ...item,
      display_order: index
    }));

    setProfileData(prev => ({
      ...prev,
      social_links: updatedItems
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link className="h-5 w-5" />
          Social Links
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="social-links">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-3"
              >
                {profileData.social_links.map((link, index) => (
                  <Draggable key={link.id} draggableId={link.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <SocialLinkCard
                          link={link}
                          onUpdate={(updates) => updateSocialLink(link.id, updates)}
                          onDelete={() => deleteSocialLink(link.id)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <Button
          type="button"
          variant="outline"
          onClick={() => setShowAddDialog(true)}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Social Link
        </Button>

        <AddSocialLinkDialog
          isOpen={showAddDialog}
          onClose={() => setShowAddDialog(false)}
          onAdd={addSocialLink}
        />
      </CardContent>
    </Card>
  );
};

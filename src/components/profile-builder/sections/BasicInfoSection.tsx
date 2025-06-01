
import { ProfileData } from '@/pages/ProfileBuilder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Upload, User } from 'lucide-react';

interface BasicInfoSectionProps {
  profileData: ProfileData;
  setProfileData: (data: ProfileData | ((prev: ProfileData) => ProfileData)) => void;
}

export const BasicInfoSection = ({ profileData, setProfileData }: BasicInfoSectionProps) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileData(prev => ({
          ...prev,
          profile_picture_url: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleNameChange = (name: string) => {
    setProfileData(prev => ({
      ...prev,
      display_name: name,
      url_slug: prev.url_slug || generateSlug(name)
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Basic Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Profile Picture */}
        <div className="space-y-2">
          <Label>Profile Picture</Label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {profileData.profile_picture_url ? (
                <img 
                  src={profileData.profile_picture_url} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="profile-picture"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('profile-picture')?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
        </div>

        {/* Display Name */}
        <div className="space-y-2">
          <Label htmlFor="display-name">Display Name *</Label>
          <Input
            id="display-name"
            value={profileData.display_name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Your name or stage name"
          />
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={profileData.bio}
            onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
            placeholder="Tell people about yourself..."
            rows={3}
          />
        </div>

        {/* URL Slug */}
        <div className="space-y-2">
          <Label htmlFor="url-slug">Custom URL *</Label>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">movcon.app/</span>
            <Input
              id="url-slug"
              value={profileData.url_slug}
              onChange={(e) => setProfileData(prev => ({ ...prev, url_slug: e.target.value.toLowerCase() }))}
              placeholder="username"
              className="flex-1"
            />
          </div>
          <p className="text-xs text-gray-500">
            Only lowercase letters, numbers, and hyphens allowed
          </p>
        </div>
      </CardContent>
    </Card>
  );
};


import { ProfileData } from '@/pages/ProfileBuilder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Palette } from 'lucide-react';

interface ThemeSectionProps {
  profileData: ProfileData;
  setProfileData: (data: ProfileData | ((prev: ProfileData) => ProfileData)) => void;
}

export const ThemeSection = ({ profileData, setProfileData }: ThemeSectionProps) => {
  const themeColors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b',
    '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'
  ];

  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileData(prev => ({
          ...prev,
          background_type: 'image',
          background_value: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Theme & Style
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Theme Color */}
        <div className="space-y-3">
          <Label>Theme Color</Label>
          <div className="flex flex-wrap gap-2">
            {themeColors.map((color) => (
              <button
                key={color}
                onClick={() => setProfileData(prev => ({ ...prev, theme_color: color }))}
                className={`w-8 h-8 rounded-full border-2 ${
                  profileData.theme_color === color ? 'border-gray-900' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={profileData.theme_color}
                onChange={(e) => setProfileData(prev => ({ ...prev, theme_color: e.target.value }))}
                className="w-8 h-8 p-0 border-0"
              />
            </div>
          </div>
        </div>

        {/* Background Type */}
        <div className="space-y-3">
          <Label>Background</Label>
          <div className="grid grid-cols-3 gap-2">
            <Button
              type="button"
              variant={profileData.background_type === 'solid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setProfileData(prev => ({ 
                ...prev, 
                background_type: 'solid',
                background_value: '#ffffff'
              }))}
            >
              Solid
            </Button>
            <Button
              type="button"
              variant={profileData.background_type === 'gradient' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setProfileData(prev => ({ 
                ...prev, 
                background_type: 'gradient',
                background_value: gradients[0]
              }))}
            >
              Gradient
            </Button>
            <Button
              type="button"
              variant={profileData.background_type === 'image' ? 'default' : 'outline'}
              size="sm"
              onClick={() => document.getElementById('background-image')?.click()}
            >
              Image
            </Button>
          </div>
          
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="background-image"
          />
        </div>

        {/* Background Options */}
        {profileData.background_type === 'solid' && (
          <div className="space-y-2">
            <Label>Background Color</Label>
            <Input
              type="color"
              value={profileData.background_value}
              onChange={(e) => setProfileData(prev => ({ ...prev, background_value: e.target.value }))}
            />
          </div>
        )}

        {profileData.background_type === 'gradient' && (
          <div className="space-y-2">
            <Label>Gradient</Label>
            <div className="grid grid-cols-2 gap-2">
              {gradients.map((gradient, index) => (
                <button
                  key={index}
                  onClick={() => setProfileData(prev => ({ ...prev, background_value: gradient }))}
                  className={`h-12 rounded border-2 ${
                    profileData.background_value === gradient ? 'border-gray-900' : 'border-gray-300'
                  }`}
                  style={{ background: gradient }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Font Type */}
        <div className="space-y-2">
          <Label>Font</Label>
          <Select
            value={profileData.font_type}
            onValueChange={(value: any) => setProfileData(prev => ({ ...prev, font_type: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inter">Inter</SelectItem>
              <SelectItem value="poppins">Poppins</SelectItem>
              <SelectItem value="roboto">Roboto</SelectItem>
              <SelectItem value="open-sans">Open Sans</SelectItem>
              <SelectItem value="playfair">Playfair Display</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

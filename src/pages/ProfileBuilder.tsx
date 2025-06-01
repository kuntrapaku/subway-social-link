
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { ProfileBuilderForm } from '@/components/profile-builder/ProfileBuilderForm';
import { ProfilePreview } from '@/components/profile-builder/ProfilePreview';
import { PreviewModal } from '@/components/profile-builder/PreviewModal';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Eye, Save, Globe } from 'lucide-react';

export interface SocialLink {
  id: string;
  platform: 'instagram' | 'imdb' | 'youtube' | 'vimeo' | 'x' | 'tiktok' | 'website' | 'other';
  label: string;
  url: string;
  display_order: number;
}

export interface ProfileData {
  id?: string;
  display_name: string;
  bio: string;
  url_slug: string;
  profile_picture_url: string;
  theme_color: string;
  background_type: 'solid' | 'gradient' | 'image';
  background_value: string;
  font_type: 'inter' | 'poppins' | 'roboto' | 'open-sans' | 'playfair';
  is_published: boolean;
  social_links: SocialLink[];
}

const ProfileBuilder = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData>({
    display_name: '',
    bio: '',
    url_slug: '',
    profile_picture_url: '',
    theme_color: '#3b82f6',
    background_type: 'solid',
    background_value: '#ffffff',
    font_type: 'inter',
    is_published: false,
    social_links: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (user) {
      loadProfileData();
    }
  }, [user]);

  const loadProfileData = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Load profile data
      const { data: profile, error: profileError } = await supabase
        .from('profile_builder')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      if (profile) {
        // Load social links
        const { data: links, error: linksError } = await supabase
          .from('social_links')
          .select('*')
          .eq('profile_id', profile.id)
          .order('display_order');

        if (linksError) throw linksError;

        setProfileData({
          ...profile,
          social_links: links || []
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error('Failed to load profile data');
    } finally {
      setIsLoading(false);
    }
  };

  const saveProfile = async (publish = false) => {
    if (!user) return;

    setIsSaving(true);
    try {
      // Validate required fields
      if (!profileData.display_name.trim()) {
        toast.error('Display name is required');
        return;
      }

      if (!profileData.url_slug.trim()) {
        toast.error('URL slug is required');
        return;
      }

      // Validate URL slug format
      const slugRegex = /^[a-z0-9-]+$/;
      if (!slugRegex.test(profileData.url_slug)) {
        toast.error('URL slug can only contain lowercase letters, numbers, and hyphens');
        return;
      }

      const profileToSave = {
        user_id: user.id,
        display_name: profileData.display_name,
        bio: profileData.bio,
        url_slug: profileData.url_slug,
        profile_picture_url: profileData.profile_picture_url,
        theme_color: profileData.theme_color,
        background_type: profileData.background_type,
        background_value: profileData.background_value,
        font_type: profileData.font_type,
        is_published: publish || profileData.is_published
      };

      // Upsert profile
      const { data: savedProfile, error: profileError } = await supabase
        .from('profile_builder')
        .upsert(profileToSave, { onConflict: 'user_id' })
        .select()
        .single();

      if (profileError) throw profileError;

      // Delete existing social links
      await supabase
        .from('social_links')
        .delete()
        .eq('profile_id', savedProfile.id);

      // Insert new social links
      if (profileData.social_links.length > 0) {
        const linksToInsert = profileData.social_links.map((link, index) => ({
          profile_id: savedProfile.id,
          platform: link.platform,
          label: link.label,
          url: link.url,
          display_order: index
        }));

        const { error: linksError } = await supabase
          .from('social_links')
          .insert(linksToInsert);

        if (linksError) throw linksError;
      }

      setProfileData(prev => ({ ...prev, id: savedProfile.id, is_published: savedProfile.is_published }));
      toast.success(publish ? 'Profile published successfully!' : 'Profile saved successfully!');
    } catch (error: any) {
      console.error('Error saving profile:', error);
      if (error.code === '23505' && error.constraint === 'profile_builder_url_slug_key') {
        toast.error('This URL slug is already taken. Please choose a different one.');
      } else {
        toast.error('Failed to save profile');
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container max-w-7xl mx-auto py-10">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-orange-600 mb-2">Profile Builder</h1>
          <p className="text-gray-600">Create your personalized MovCon profile page</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <ProfileBuilderForm 
              profileData={profileData}
              setProfileData={setProfileData}
            />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setShowPreview(true)}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                Preview
              </Button>
              
              <Button
                onClick={() => saveProfile(false)}
                disabled={isSaving}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {isSaving ? 'Saving...' : 'Save Draft'}
              </Button>
              
              <Button
                onClick={() => saveProfile(true)}
                disabled={isSaving}
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700"
              >
                <Globe className="h-4 w-4" />
                {isSaving ? 'Publishing...' : 'Publish'}
              </Button>
            </div>
          </div>

          {/* Live Preview Section */}
          <div className="lg:sticky lg:top-8">
            <ProfilePreview profileData={profileData} />
          </div>
        </div>
      </div>

      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        profileData={profileData}
      />
    </Layout>
  );
};

export default ProfileBuilder;

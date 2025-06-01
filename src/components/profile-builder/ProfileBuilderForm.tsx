
import { useState } from 'react';
import { ProfileData } from '@/pages/ProfileBuilder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BasicInfoSection } from './sections/BasicInfoSection';
import { SocialLinksSection } from './sections/SocialLinksSection';
import { ThemeSection } from './sections/ThemeSection';

interface ProfileBuilderFormProps {
  profileData: ProfileData;
  setProfileData: (data: ProfileData | ((prev: ProfileData) => ProfileData)) => void;
}

export const ProfileBuilderForm = ({ profileData, setProfileData }: ProfileBuilderFormProps) => {
  return (
    <div className="space-y-6">
      <BasicInfoSection 
        profileData={profileData}
        setProfileData={setProfileData}
      />
      
      <SocialLinksSection
        profileData={profileData}
        setProfileData={setProfileData}
      />
      
      <ThemeSection
        profileData={profileData}
        setProfileData={setProfileData}
      />
    </div>
  );
};

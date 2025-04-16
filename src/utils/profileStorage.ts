
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export interface Profile {
  id: string;
  name: string;
  title: string;
  location: string;
  connections: number;
  company: string;
  joinDate: string;
  website: string;
  bio: string;
  user_id: string;
}

// Default profile factory function that takes a user_id
const createDefaultProfile = (userId: string): Profile => ({
  id: userId,
  name: "New User",
  title: "Film Professional",
  location: "Mumbai, India",
  connections: 0,
  company: "",
  joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
  website: "",
  bio: "Tell others about your experience in the film industry.",
  user_id: userId
});

// Get profile from Supabase or return a default profile
export const getProfile = async (user: User | null): Promise<Profile> => {
  if (!user) {
    return createDefaultProfile("anonymous");
  }
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (error) {
      console.error("Error fetching profile:", error);
      // If no profile exists, create a default one for this user
      return createDefaultProfile(user.id);
    }
    
    return data as Profile;
  } catch (error) {
    console.error("Error in getProfile:", error);
    return createDefaultProfile(user.id);
  }
};

// Save profile to Supabase
export const saveProfile = async (profile: Profile): Promise<void> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .upsert(profile, { onConflict: 'user_id' });
    
    if (error) {
      console.error("Error saving profile to Supabase:", error);
      return;
    }
    
    // Dispatch a custom event to notify other components about the profile update
    window.dispatchEvent(new Event("profile-updated"));
  } catch (error) {
    console.error("Error in saveProfile:", error);
  }
};

// Update profile
export const updateProfile = async (
  user: User | null, 
  updatedProfile: Partial<Profile>
): Promise<Profile> => {
  if (!user) {
    console.error("Cannot update profile: No authenticated user");
    return createDefaultProfile("anonymous");
  }
  
  try {
    // Get the current profile first
    const currentProfile = await getProfile(user);
    
    // Merge the current profile with updates
    const newProfile = { ...currentProfile, ...updatedProfile };
    
    // Save the updated profile
    await saveProfile(newProfile);
    
    return newProfile;
  } catch (error) {
    console.error("Error updating profile:", error);
    return createDefaultProfile(user.id);
  }
};

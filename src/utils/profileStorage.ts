
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

// Local storage key for profiles
const PROFILES_STORAGE_KEY = "movconnect_profiles";

// Helper to get profiles from localStorage
const getProfilesFromLocalStorage = (): Record<string, Profile> => {
  const storedProfiles = localStorage.getItem(PROFILES_STORAGE_KEY);
  return storedProfiles ? JSON.parse(storedProfiles) : {};
};

// Helper to save profiles to localStorage
const saveProfilesToLocalStorage = (profiles: Record<string, Profile>): void => {
  localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
};

// Get profile from Supabase or fallback to localStorage
export const getProfile = async (user: User | null): Promise<Profile> => {
  if (!user) {
    return createDefaultProfile("anonymous");
  }
  
  try {
    // Try to get profile from Supabase first
    try {
      // @ts-ignore - Ignore type errors with Supabase for now
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) {
        throw error;
      }
      
      return data as Profile;
    } catch (supabaseError) {
      console.error("Supabase error, falling back to localStorage:", supabaseError);
      
      // Fallback to localStorage if Supabase fails
      const profiles = getProfilesFromLocalStorage();
      const profile = profiles[user.id];
      
      if (profile) {
        return profile;
      }
      
      // If no profile in localStorage, create a default one
      const newProfile = createDefaultProfile(user.id);
      profiles[user.id] = newProfile;
      saveProfilesToLocalStorage(profiles);
      return newProfile;
    }
  } catch (error) {
    console.error("Error in getProfile:", error);
    return createDefaultProfile(user.id);
  }
};

// Save profile to Supabase with localStorage fallback
export const saveProfile = async (profile: Profile): Promise<void> => {
  try {
    // Try Supabase first
    try {
      // @ts-ignore - Ignore type errors with Supabase for now
      const { error } = await supabase
        .from('profiles')
        .upsert(profile, { onConflict: 'user_id' });
      
      if (error) {
        throw error;
      }
    } catch (supabaseError) {
      console.error("Error saving to Supabase, using localStorage:", supabaseError);
      
      // Fallback to localStorage
      const profiles = getProfilesFromLocalStorage();
      profiles[profile.user_id] = profile;
      saveProfilesToLocalStorage(profiles);
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

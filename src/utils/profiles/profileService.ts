
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { createDefaultProfile, Profile } from './types';
import { getProfilesFromLocalStorage, saveProfilesToLocalStorage } from './storage';

// Get profile from Supabase or fallback to localStorage
export const getProfile = async (user: User | null): Promise<Profile> => {
  if (!user) {
    return createDefaultProfile("anonymous");
  }
  
  try {
    // Try to get profile from Supabase first
    try {
      // Use type casting to bypass TypeScript errors with Supabase client
      const { data, error } = await (supabase as any)
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
      
      // Try to persist to Supabase again
      try {
        await (supabase as any).from('profiles').insert(newProfile);
      } catch (e) {
        console.error("Failed to persist new profile to Supabase:", e);
      }
      
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
      // Use type casting to bypass TypeScript errors with Supabase client
      const { error } = await (supabase as any)
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

// Search for profiles by name
export const searchProfiles = async (query: string): Promise<Profile[]> => {
  if (!query || query.trim() === '') {
    return [];
  }
  
  try {
    // Try Supabase first
    try {
      // Use type casting to bypass TypeScript errors with Supabase client
      const { data, error } = await (supabase as any)
        .from('profiles')
        .select('*')
        .ilike('name', `%${query}%`)
        .limit(10);
      
      if (error) {
        throw error;
      }
      
      return data as Profile[];
    } catch (supabaseError) {
      console.error("Supabase search error, falling back to localStorage:", supabaseError);
      
      // Fallback to localStorage if Supabase fails
      const profiles = getProfilesFromLocalStorage();
      
      // Filter profiles with name matching the query
      const filteredProfiles = Object.values(profiles).filter(profile => 
        profile.name.toLowerCase().includes(query.toLowerCase())
      );
      
      return filteredProfiles;
    }
  } catch (error) {
    console.error("Error in searchProfiles:", error);
    return [];
  }
};

// Add this new function for fetching a profile by ID
export const getProfileById = async (userId: string): Promise<Profile | null> => {
  try {
    // Try Supabase first
    try {
      // Use type casting to bypass TypeScript errors with Supabase client
      const { data, error } = await (supabase as any)
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error) {
        throw error;
      }
      
      return data as Profile;
    } catch (supabaseError) {
      console.error("Supabase error, falling back to localStorage:", supabaseError);
      
      // Fallback to localStorage if Supabase fails
      const profiles = getProfilesFromLocalStorage();
      
      // Find profile with matching user_id
      const profile = Object.values(profiles).find(p => p.user_id === userId);
      
      return profile || null;
    }
  } catch (error) {
    console.error("Error in getProfileById:", error);
    return null;
  }
};


export interface Profile {
  name: string;
  title: string;
  location: string;
  connections: number;
  company: string;
  joinDate: string;
  website: string;
  bio: string;
}

// Default profile
const defaultProfile: Profile = {
  name: "Surendra Kuntrapaku",
  title: "Moviemaker",
  location: "Mumbai, India",
  connections: 367,
  company: "24 Frames",
  joinDate: "January 2022",
  website: "24frames.in",
  bio: "Passionate moviemaker with experience in directing and cinematography. Always looking to connect with creative professionals in the Indian film industry."
};

// Key for localStorage
const PROFILE_STORAGE_KEY = "subway_app_profile";

// Get profile from localStorage
export const getProfile = (): Profile => {
  try {
    const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
    return storedProfile ? JSON.parse(storedProfile) : defaultProfile;
  } catch (error) {
    console.error("Error retrieving profile from localStorage:", error);
    return defaultProfile;
  }
};

// Save profile to localStorage
export const saveProfile = (profile: Profile): void => {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    // Dispatch a custom event to notify other components about the profile update
    window.dispatchEvent(new Event("profile-updated"));
  } catch (error) {
    console.error("Error saving profile to localStorage:", error);
  }
};

// Update profile
export const updateProfile = (updatedProfile: Partial<Profile>): Profile => {
  try {
    const currentProfile = getProfile();
    const newProfile = { ...currentProfile, ...updatedProfile };
    saveProfile(newProfile);
    return newProfile;
  } catch (error) {
    console.error("Error updating profile in localStorage:", error);
    return getProfile();
  }
};

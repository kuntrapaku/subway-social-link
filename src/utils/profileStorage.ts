
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

export interface ConnectionRequest {
  id: string;
  sender_id: string;
  receiver_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  sender?: Profile;
  receiver?: Profile;
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
const CONNECTION_REQUESTS_KEY = "movconnect_connection_requests";

// Helper to get profiles from localStorage
const getProfilesFromLocalStorage = (): Record<string, Profile> => {
  const storedProfiles = localStorage.getItem(PROFILES_STORAGE_KEY);
  return storedProfiles ? JSON.parse(storedProfiles) : {};
};

// Helper to save profiles to localStorage
const saveProfilesToLocalStorage = (profiles: Record<string, Profile>): void => {
  localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
};

// Helper to get connection requests from localStorage
const getConnectionRequestsFromLocalStorage = (): ConnectionRequest[] => {
  const storedRequests = localStorage.getItem(CONNECTION_REQUESTS_KEY);
  return storedRequests ? JSON.parse(storedRequests) : [];
};

// Helper to save connection requests to localStorage
const saveConnectionRequestsToLocalStorage = (requests: ConnectionRequest[]): void => {
  localStorage.setItem(CONNECTION_REQUESTS_KEY, JSON.stringify(requests));
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

// Search for profiles by name
export const searchProfiles = async (query: string): Promise<Profile[]> => {
  if (!query || query.trim() === '') {
    return [];
  }
  
  try {
    // Try Supabase first
    try {
      // @ts-ignore - Ignore type errors with Supabase for now
      const { data, error } = await supabase
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

// Send connection request
export const sendConnectionRequest = async (
  currentUser: User,
  receiverId: string
): Promise<boolean> => {
  if (!currentUser) {
    console.error("Cannot send connection request: No authenticated user");
    return false;
  }
  
  try {
    const newRequest: ConnectionRequest = {
      id: crypto.randomUUID(),
      sender_id: currentUser.id,
      receiver_id: receiverId,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    
    // Try Supabase first
    try {
      // @ts-ignore - Ignore type errors with Supabase for now
      const { error } = await supabase
        .from('connection_requests')
        .insert(newRequest);
      
      if (error) {
        throw error;
      }
    } catch (supabaseError) {
      console.error("Supabase error, falling back to localStorage:", supabaseError);
      
      // Fallback to localStorage
      const requests = getConnectionRequestsFromLocalStorage();
      
      // Check if the request already exists
      const existingRequest = requests.find(
        req => req.sender_id === currentUser.id && req.receiver_id === receiverId
      );
      
      if (existingRequest) {
        console.warn("Connection request already sent");
        return false;
      }
      
      requests.push(newRequest);
      saveConnectionRequestsToLocalStorage(requests);
    }
    
    return true;
  } catch (error) {
    console.error("Error in sendConnectionRequest:", error);
    return false;
  }
};

// Get pending connection requests
export const getPendingConnectionRequests = async (userId: string): Promise<ConnectionRequest[]> => {
  try {
    // Try Supabase first
    try {
      // @ts-ignore - Ignore type errors with Supabase for now
      const { data, error } = await supabase
        .from('connection_requests')
        .select('*, sender:profiles!sender_id(*)')
        .eq('receiver_id', userId)
        .eq('status', 'pending');
      
      if (error) {
        throw error;
      }
      
      return data as ConnectionRequest[];
    } catch (supabaseError) {
      console.error("Supabase error, falling back to localStorage:", supabaseError);
      
      // Fallback to localStorage
      const requests = getConnectionRequestsFromLocalStorage();
      const profiles = getProfilesFromLocalStorage();
      
      // Filter requests where the user is the receiver and status is pending
      const pendingRequests = requests.filter(
        req => req.receiver_id === userId && req.status === 'pending'
      );
      
      // Add sender profile information
      return pendingRequests.map(req => ({
        ...req,
        sender: profiles[req.sender_id]
      }));
    }
  } catch (error) {
    console.error("Error in getPendingConnectionRequests:", error);
    return [];
  }
};

// Accept connection request
export const acceptConnectionRequest = async (requestId: string): Promise<boolean> => {
  try {
    // Try Supabase first
    try {
      // @ts-ignore - Ignore type errors with Supabase for now
      const { error } = await supabase
        .from('connection_requests')
        .update({ status: 'accepted' })
        .eq('id', requestId);
      
      if (error) {
        throw error;
      }
    } catch (supabaseError) {
      console.error("Supabase error, falling back to localStorage:", supabaseError);
      
      // Fallback to localStorage
      const requests = getConnectionRequestsFromLocalStorage();
      
      // Find and update the request
      const updatedRequests = requests.map(req => 
        req.id === requestId ? { ...req, status: 'accepted' } : req
      );
      
      saveConnectionRequestsToLocalStorage(updatedRequests);
      
      // Update connections count for both users
      const acceptedRequest = updatedRequests.find(req => req.id === requestId);
      if (acceptedRequest) {
        const profiles = getProfilesFromLocalStorage();
        
        if (profiles[acceptedRequest.sender_id]) {
          profiles[acceptedRequest.sender_id].connections += 1;
        }
        
        if (profiles[acceptedRequest.receiver_id]) {
          profiles[acceptedRequest.receiver_id].connections += 1;
        }
        
        saveProfilesToLocalStorage(profiles);
      }
    }
    
    return true;
  } catch (error) {
    console.error("Error in acceptConnectionRequest:", error);
    return false;
  }
};

// Get connections for a user
export const getUserConnections = async (userId: string): Promise<Profile[]> => {
  try {
    // Try Supabase first
    try {
      // @ts-ignore - Ignore type errors with Supabase for now
      const { data, error } = await supabase
        .from('connection_requests')
        .select('*, sender:profiles!sender_id(*), receiver:profiles!receiver_id(*)')
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .eq('status', 'accepted');
      
      if (error) {
        throw error;
      }
      
      // Extract the profiles of connected users
      return data.map((request: ConnectionRequest) => {
        if (request.sender_id === userId) {
          return request.receiver as Profile;
        } else {
          return request.sender as Profile;
        }
      });
    } catch (supabaseError) {
      console.error("Supabase error, falling back to localStorage:", supabaseError);
      
      // Fallback to localStorage
      const requests = getConnectionRequestsFromLocalStorage();
      const profiles = getProfilesFromLocalStorage();
      
      // Find accepted requests where the user is sender or receiver
      const acceptedRequests = requests.filter(
        req => (req.sender_id === userId || req.receiver_id === userId) && req.status === 'accepted'
      );
      
      // Get the profiles of connected users
      return acceptedRequests.map(req => {
        const connectedUserId = req.sender_id === userId ? req.receiver_id : req.sender_id;
        return profiles[connectedUserId];
      }).filter(Boolean);
    }
  } catch (error) {
    console.error("Error in getUserConnections:", error);
    return [];
  }
};

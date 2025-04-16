
import { Profile, ConnectionRequest } from './types';

// Local storage key for profiles
export const PROFILES_STORAGE_KEY = "movconnect_profiles";
export const CONNECTION_REQUESTS_KEY = "movconnect_connection_requests";

// Helper to get profiles from localStorage
export const getProfilesFromLocalStorage = (): Record<string, Profile> => {
  const storedProfiles = localStorage.getItem(PROFILES_STORAGE_KEY);
  return storedProfiles ? JSON.parse(storedProfiles) : {};
};

// Helper to save profiles to localStorage
export const saveProfilesToLocalStorage = (profiles: Record<string, Profile>): void => {
  localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
};

// Helper to get connection requests from localStorage
export const getConnectionRequestsFromLocalStorage = (): ConnectionRequest[] => {
  const storedRequests = localStorage.getItem(CONNECTION_REQUESTS_KEY);
  return storedRequests ? JSON.parse(storedRequests) : [];
};

// Helper to save connection requests to localStorage
export const saveConnectionRequestsToLocalStorage = (requests: ConnectionRequest[]): void => {
  localStorage.setItem(CONNECTION_REQUESTS_KEY, JSON.stringify(requests));
};

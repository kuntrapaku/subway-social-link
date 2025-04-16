
// Export all the necessary functions and types from the profile modules
export { 
  type Profile, 
  type ConnectionRequest,
  createDefaultProfile 
} from './types';

export {
  getProfile,
  saveProfile,
  updateProfile,
  searchProfiles,
  getProfileById
} from './profileService';

export {
  sendConnectionRequest,
  getPendingConnectionRequests,
  acceptConnectionRequest,
  getUserConnections,
  getSuggestedProfiles
} from './connectionService';

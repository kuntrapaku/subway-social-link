
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
export const createDefaultProfile = (userId: string): Profile => {
  // Extract potential name from user's email if available
  const email = userId.includes('@') ? userId : null;
  const namePart = email ? email.split('@')[0] : '';
  // Create a capitalized name from email or use "Film Professional"
  const formattedName = namePart 
    ? namePart.split(/[._-]/).map(part => 
        part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
      ).join(' ')
    : "Film Professional";

  return {
    id: userId,
    name: formattedName,
    title: "Film Professional",
    location: "Mumbai, India",
    connections: 0,
    company: "",
    joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    website: "",
    bio: "Tell others about your experience in the film industry.",
    user_id: userId
  };
};

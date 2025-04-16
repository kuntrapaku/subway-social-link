
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
export const createDefaultProfile = (userId: string): Profile => ({
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

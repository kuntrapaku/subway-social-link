
import { User } from '@supabase/supabase-js';

type TempUser = {
  id: string;
  username: string;
  isTemporary: boolean;
};

export type AuthUser = User | TempUser;

export const getUserId = (user: AuthUser): string => {
  return user.id;
};

export const getUserDisplayName = (user: AuthUser): string => {
  if ('username' in user) {
    // TempUser
    return user.username;
  } else {
    // Supabase User
    return user.email?.split('@')[0] || "User";
  }
};

export const isSupabaseUser = (user: AuthUser): user is User => {
  return !('isTemporary' in user);
};

export const isTempUser = (user: AuthUser): user is TempUser => {
  return 'isTemporary' in user;
};

// Convert AuthUser to a compatible format for profile operations
export const toCompatibleUser = (user: AuthUser): User | null => {
  if (isSupabaseUser(user)) {
    return user;
  }
  return null; // For temp users, return null as they don't have Supabase profiles
};

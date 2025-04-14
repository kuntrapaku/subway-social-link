
import { createClient } from '@supabase/supabase-js'

// Check if environment variables are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Verify if environment variables are set before creating the client
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials are missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.')
}

// Create Supabase client with error checking
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null // Return null when credentials are missing

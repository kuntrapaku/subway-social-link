
import { createClient } from '@supabase/supabase-js'

// Use the actual values from the connected Supabase project
const supabaseUrl = "https://tuzgqnelqnhlatmagdid.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1emdxbmVscW5obGF0bWFnZGlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2Mjc1NjAsImV4cCI6MjA2MDIwMzU2MH0.2CLyZpd1FYcT7ZJ7tBJt5ybt-YwTqwUHmnej07PBq5M"

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

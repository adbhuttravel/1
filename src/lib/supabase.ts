
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // In a real app, you'd want to handle this more gracefully.
  // For this context, throwing an error is fine.
  throw new Error('Supabase URL and anon key are required.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface UserProfile {
  id: string
  email: string
  full_name: string
  created_at: string
  updated_at: string
}

export interface ProblemProgress {
  id: string
  user_id: string
  problem_id: string
  category: string
  solved: boolean
  attempts: number
  last_solution: string
  solved_at: string | null
  created_at: string
  updated_at: string
}
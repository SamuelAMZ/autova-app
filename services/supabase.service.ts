import { createClient } from "@supabase/supabase-js";

const url = process.env.EXPO_APP_SUPABASE_URL!;
const anonKey = process.env.EXPO_APP_SUPABASE_ANON_KEY!;

// Create a single supabase client for interacting with your database
export const supabaseClient = createClient(
  "https://urcyqgnoiyectcftmopi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyY3lxZ25vaXllY3RjZnRtb3BpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzMTA1MzQsImV4cCI6MjA0MDg4NjUzNH0.icetjr6hqf-2cCfzgLRi0V7CnIY5vQSJGJxGSVmPYU0"
);

// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ohqwcktrdcnxunkltjvk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ocXdja3RyZGNueHVua2x0anZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMDY5MzIsImV4cCI6MjA1MjU4MjkzMn0.eXwL0F_E4k7W-m4obco3IySkBUD-npdBGhzfG8Yukj0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
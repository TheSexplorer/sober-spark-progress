import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ohqwcktrdcnxunkltjvk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ocXdja3RyZGNueHVua2x0anZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMDY5MzIsImV4cCI6MjA1MjU4MjkzMn0.eXwL0F_E4k7W-m4obco3IySkBUD-npdBGhzfG8Yukj0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
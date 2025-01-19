import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0]
    
    // Get all users who haven't logged today
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id')
      
    if (profilesError) {
      throw profilesError
    }

    for (const profile of profiles) {
      // Check if user has already logged today
      const { count, error: streakError } = await supabase
        .from('streaks')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', profile.id)
        .eq('date', today)

      if (streakError) {
        console.error(`Error checking streak for user ${profile.id}:`, streakError)
        continue
      }

      // If user hasn't logged today, send them a notification
      if (!count || count === 0) {
        // For now, we'll just log the notification
        // In a real app, you'd integrate with a notification service here
        console.log(`Sending reminder to user ${profile.id}: Don't forget to log your sober day!`)
      }
    }

    return new Response(
      JSON.stringify({ message: 'Daily reminders sent successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error in daily-reminder function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
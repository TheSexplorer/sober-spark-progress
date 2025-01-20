import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const CommunityTotal = () => {
  const [communityTotal, setCommunityTotal] = useState(0);
  const goal = 1000000;
  const percentage = Math.round((communityTotal / goal) * 100);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const fetchCommunityTotal = async () => {
    try {
      const { count, error } = await supabase
        .from('streaks')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.error('Error fetching community total:', error);
        return;
      }

      console.log('Fetched community total:', count);
      setCommunityTotal(count || 0);
    } catch (error) {
      console.error('Error in fetchCommunityTotal:', error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchCommunityTotal();

    // Subscribe to ALL changes in the streaks table
    const channel = supabase
      .channel('streaks_db_changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'streaks'
        },
        (payload) => {
          console.log('Received real-time update:', payload);
          // Fetch the new total whenever any change occurs
          fetchCommunityTotal();
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
      });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-center">Community Total</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <div className="text-4xl font-bold">{formatNumber(communityTotal)}</div>
          <div className="text-sm text-muted-foreground">
            days sober together
          </div>
          <div className="w-full space-y-2">
            <Progress value={percentage} className="h-2" />
            <div className="text-sm text-muted-foreground text-center">
              Goal: {formatNumber(goal)} days
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
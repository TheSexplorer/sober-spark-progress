import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const StreakStats = () => {
  const [totalDays, setTotalDays] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  useEffect(() => {
    fetchStreakStats();
  }, []);

  const fetchStreakStats = async () => {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) return;

    // Get all streaks for the user
    const { data: streaks } = await supabase
      .from('streaks')
      .select('date')
      .eq('user_id', session.session.user.id)
      .order('date', { ascending: true });

    if (!streaks) return;

    // Calculate total days
    setTotalDays(streaks.length);

    // Calculate current and longest streaks
    let currentCount = 0;
    let maxCount = 0;
    let lastDate: Date | null = null;

    streaks.forEach(({ date }) => {
      const currentDate = new Date(date);
      
      if (!lastDate) {
        currentCount = 1;
      } else {
        const diffTime = currentDate.getTime() - lastDate.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        
        if (diffDays === 1) {
          currentCount++;
        } else {
          currentCount = 1;
        }
      }

      maxCount = Math.max(maxCount, currentCount);
      lastDate = currentDate;
    });

    setCurrentStreak(currentCount);
    setLongestStreak(maxCount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
      <Card className="flex flex-col items-center">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-lg">Total Days</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-bold">{totalDays}</span>
            <Badge variant="secondary">days</Badge>
          </div>
        </CardContent>
      </Card>
      
      <Card className="flex flex-col items-center">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-lg">Current Streak</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-bold">{currentStreak}</span>
            <Badge variant="secondary">days</Badge>
          </div>
        </CardContent>
      </Card>
      
      <Card className="flex flex-col items-center">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-lg">Longest Streak</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-bold">{longestStreak}</span>
            <Badge variant="secondary">days</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
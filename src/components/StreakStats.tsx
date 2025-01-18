import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const StreakStats = () => {
  const currentStreak = 0; // Reset to 0
  const longestStreak = 0; // Reset to 0
  const totalDays = 0; // Reset to 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Total Days</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold">{totalDays}</span>
            <Badge variant="secondary">days</Badge>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Current Streak</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold">{currentStreak}</span>
            <Badge variant="secondary">days</Badge>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Longest Streak</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold">{longestStreak}</span>
            <Badge variant="secondary">days</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
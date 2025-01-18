import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

// Create a singleton to maintain the count across component remounts
let globalCommunityTotal = 0;

export const getCommunityTotal = () => globalCommunityTotal;
export const incrementCommunityTotal = () => {
  globalCommunityTotal += 1;
  return globalCommunityTotal;
};

export const CommunityTotal = () => {
  const [communityTotal, setCommunityTotal] = useState(globalCommunityTotal);
  const goal = 1000000;
  const percentage = Math.round((communityTotal / goal) * 100);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Expose a way to update the display
  (window as any).updateCommunityTotalDisplay = () => {
    setCommunityTotal(globalCommunityTotal);
  };

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
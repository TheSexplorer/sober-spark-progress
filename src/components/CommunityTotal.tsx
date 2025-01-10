import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const CommunityTotal = () => {
  const communityTotal = 2345678; // This would come from your backend
  const goal = 10000000;
  const percentage = Math.round((communityTotal / goal) * 100);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          Community Total
          <Badge variant="secondary" className="ml-2">
            {percentage}% to goal
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-1">
          <div className="text-4xl font-bold">{formatNumber(communityTotal)}</div>
          <div className="text-sm text-muted-foreground">
            days sober together
          </div>
          <div className="text-sm text-muted-foreground">
            Goal: {formatNumber(goal)} days
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
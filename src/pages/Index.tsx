import { StreakButton } from "@/components/StreakButton";
import { StreakStats } from "@/components/StreakStats";
import { CommunityTotal } from "@/components/CommunityTotal";
import { SupportCompanion } from "@/components/SupportCompanion";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

  const handleUnlockRewards = () => {
    toast({
      title: "Coming Soon!",
      description: "Rewards feature will be available in the next update.",
    });
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-4xl font-bold text-center">Sober Days</h1>
          
          <div className="flex flex-col items-center gap-12 mt-8">
            <CommunityTotal />
            <StreakButton />
            <StreakStats />
            <Button
              onClick={handleUnlockRewards}
              variant="outline"
              className="gap-2"
            >
              <Gift className="h-4 w-4" />
              Unlock Your Rewards
            </Button>
            <SupportCompanion />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
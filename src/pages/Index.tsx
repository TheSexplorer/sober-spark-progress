import { StreakButton } from "@/components/StreakButton";
import { StreakStats } from "@/components/StreakStats";
import { CommunityTotal } from "@/components/CommunityTotal";
import { ChatSupport } from "@/components/ChatSupport";

const Index = () => {
  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-4xl font-bold text-center">Sober Days</h1>
          
          <div className="flex flex-col items-center gap-12 mt-8">
            <CommunityTotal />
            <StreakButton />
            <StreakStats />
            <ChatSupport />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
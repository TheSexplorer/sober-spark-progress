import { StreakButton } from "@/components/StreakButton";
import { StreakStats } from "@/components/StreakStats";
import { CommunityTotal } from "@/components/CommunityTotal";
import { SupportCompanion } from "@/components/SupportCompanion";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Index = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Here you would typically send the email to your backend
    console.log("Signing up email:", email);
    
    setIsDialogOpen(false);
    setEmail("");
    
    toast({
      title: "Welcome to the community! 🎉",
      description: "We just emailed you your Super Sexy Sober Gift! Check your inbox.",
    });
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          <div className="text-center mb-4">
            <h1 className="text-4xl font-bold">Sober Days</h1>
            <p className="text-lg mt-2 text-muted-foreground">Every Day Counts</p>
          </div>
          
          <div className="flex flex-col items-center gap-12">
            <CommunityTotal />
            <StreakButton />
            <StreakStats />
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2"
                >
                  <Gift className="h-4 w-4" />
                  Sign Up to Unlock Rewards
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Join Our Sober Community</DialogTitle>
                  <DialogDescription>
                    Enter your email to receive your exclusive Sober Gift and unlock rewards.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSignUp} className="space-y-4 mt-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" className="w-full">
                    Get My Sober Gift
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            <SupportCompanion />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
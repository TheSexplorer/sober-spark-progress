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
import { useState, useEffect } from "react";
import { incrementCommunityTotal } from "@/components/CommunityTotal";
import { supabase } from "@/lib/supabase";

const Index = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  useEffect(() => {
    // Check if user is already signed in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsSignedUp(!!user);
    };
    checkUser();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedUp(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // Increment the community total
      incrementCommunityTotal();
      // Update the display
      (window as any).updateCommunityTotalDisplay?.();
      
      setIsDialogOpen(false);
      setEmail("");
      setPassword("");
      
      toast({
        title: "Welcome to the community! 🎉",
        description: "Please check your email to verify your account.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleNeedSignUp = () => {
    setIsDialogOpen(true);
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
            <StreakButton isSignedUp={isSignedUp} onNeedSignUp={handleNeedSignUp} />
            <StreakStats />
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Join Our Sober Community</DialogTitle>
                  <DialogDescription>
                    Create an account to track your progress and contribute to our community.
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
                  <Input
                    type="password"
                    placeholder="Choose a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <Button type="submit" className="w-full">
                    Sign Up
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
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
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsSignedUp(!!session);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsSignedUp(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Sober Days</h1>
            <p className="text-lg mt-2 text-muted-foreground">Every Day Counts</p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>
        
        <div className="flex flex-col items-center gap-8">
          <CommunityTotal />
          <StreakButton isSignedUp={isSignedUp} onNeedSignUp={() => {}} />
          <StreakStats />
        </div>
      </div>
    </div>
  );
};

export default Index;

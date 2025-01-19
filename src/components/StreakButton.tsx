import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface StreakButtonProps {
  isSignedUp: boolean;
  onNeedSignUp: () => void;
}

export const StreakButton = ({ isSignedUp, onNeedSignUp }: StreakButtonProps) => {
  const [isLogged, setIsLogged] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkTodayLog();
  }, []);

  const checkTodayLog = async () => {
    if (!isSignedUp) return;

    const { data: session } = await supabase.auth.getSession();
    if (!session.session) return;

    const today = new Date().toISOString().split('T')[0];
    const { data: streaks } = await supabase
      .from('streaks')
      .select('*')
      .eq('user_id', session.session.user.id)
      .eq('date', today);

    setIsLogged(streaks && streaks.length > 0);
  };

  const handleLogDay = async () => {
    if (!isSignedUp) {
      onNeedSignUp();
      return;
    }

    // Check again right before logging to prevent double-logging
    await checkTodayLog();
    
    if (isLogged) {
      toast({
        title: "Already logged today! 🌟",
        description: "You've already logged your Sober Day. Great job! Come back tomorrow to continue your streak.",
      });
      return;
    }

    const { data: session } = await supabase.auth.getSession();
    if (!session.session) return;

    const { error } = await supabase
      .from('streaks')
      .insert([
        { user_id: session.session.user.id }
      ]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to log your day. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsLogged(true);
    toast({
      title: "Day logged successfully! 🎉",
      description: "Keep up the great work! Every day counts.",
    });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        onClick={handleLogDay}
        className={`streak-button w-40 h-40 rounded-full text-lg font-semibold shadow-lg ${
          isLogged
            ? "bg-primary/80 hover:bg-primary/80"
            : "bg-primary hover:bg-primary/90"
        }`}
      >
        {isLogged ? (
          <div className="flex flex-col items-center gap-2">
            <Check className="w-8 h-8" />
            <span>Logged!</span>
          </div>
        ) : (
          <span>{isSignedUp ? "Log Today" : "Sign Up to Log"}</span>
        )}
      </Button>
    </div>
  );
};
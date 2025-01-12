import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Check } from "lucide-react";

export const StreakButton = () => {
  const [isLogged, setIsLogged] = useState(false);
  const { toast } = useToast();

  const handleLogDay = () => {
    if (!isLogged) {
      setIsLogged(true);
      toast({
        title: "Day logged successfully! 🎉",
        description: "Keep up the great work! Every day counts.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        onClick={handleLogDay}
        disabled={isLogged}
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
          <div className="flex flex-col items-center">
            <span>Log Today</span>
            <span className="text-sm mt-1 opacity-80">Every Day Counts</span>
          </div>
        )}
      </Button>
    </div>
  );
};
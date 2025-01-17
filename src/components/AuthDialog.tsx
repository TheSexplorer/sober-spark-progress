import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isAuthenticated: boolean | null;
}

export const AuthDialog = ({ open, onOpenChange, isAuthenticated }: AuthDialogProps) => {
  if (isAuthenticated) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">Welcome to Sober Days</h2>
          <p className="text-muted-foreground mt-2">Sign in to track your journey</p>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'hsl(var(--primary))',
                  brandAccent: 'hsl(var(--primary))',
                },
              },
            },
          }}
          providers={[]}
        />
      </DialogContent>
    </Dialog>
  );
};
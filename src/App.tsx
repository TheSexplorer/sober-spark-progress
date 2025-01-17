import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { AuthDialog } from "./components/AuthDialog";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (event === 'SIGNED_IN') {
        setShowAuthDialog(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </BrowserRouter>
        <AuthDialog 
          open={showAuthDialog} 
          onOpenChange={setShowAuthDialog}
          isAuthenticated={isAuthenticated}
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
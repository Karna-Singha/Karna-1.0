import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Timer from "./pages/Timer";
import Statistics from "./pages/Statistics";
import NotFound from "./pages/NotFound";
import * as React from "react";
import { TimerProvider } from "./contexts/TimerContext";
import { TaskProvider } from "./contexts/TaskContext";

const queryClient = new QueryClient();

const App = () => {
  // Initialize dark mode by default
  React.useEffect(() => {
    // Check if dark mode class is already applied
    if (!document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <TimerProvider>
          <TaskProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Navigate to="/timer" replace />} />
                  <Route path="/timer" element={<Timer />} />
                  <Route path="/statistics" element={<Statistics />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </TaskProvider>
        </TimerProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

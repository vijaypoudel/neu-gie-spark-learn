
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Learn from "./pages/Learn";
import AIChat from "./pages/AIChat";
import KidsHome from "./pages/KidsHome";
import SetCurriculum from "./pages/SetCurriculum";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/ai" element={<AIChat />} />
          <Route path="/inbox" element={<Home />} />
          <Route path="/kids-home" element={<KidsHome />} />
          <Route path="/set-curriculum" element={<SetCurriculum />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

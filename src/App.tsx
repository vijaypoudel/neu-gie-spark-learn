
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
import Calendar from "./pages/Calendar";
import WeeklyCurriculum from "./pages/WeeklyCurriculum";
import MyPassion from "./pages/MyPassion";
import Funtube from "./pages/Funtube";
import WorkInProgress from "./pages/WorkInProgress";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import ProfileSelection from "./pages/ProfileSelection";
import HowItWorks from "./pages/HowItWorks";

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
          <Route path="/inbox" element={<WorkInProgress />} />
          <Route path="/kids-home" element={<KidsHome />} />
          <Route path="/set-curriculum" element={<SetCurriculum />} />
          <Route path="/weekly-curriculum" element={<WeeklyCurriculum />} />
          <Route path="/my-badges" element={<WorkInProgress />} />
          <Route path="/my-passion" element={<MyPassion />} />
          <Route path="/funtube" element={<Funtube />} />
          <Route path="/social" element={<WorkInProgress />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/profile-selection" element={<ProfileSelection />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

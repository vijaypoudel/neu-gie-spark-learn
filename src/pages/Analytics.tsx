
import React from 'react';
import Navigation from '@/components/Navigation';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import CompletionScoreChart from '@/components/analytics/CompletionScoreChart';
import QuizScoreChart from '@/components/analytics/QuizScoreChart';
import AIInsights from '@/components/analytics/AIInsights';
import TopYouTubeChannels from '@/components/analytics/TopYouTubeChannels';
import ScreenTimeChart from '@/components/analytics/ScreenTimeChart';

const Analytics = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50/80 to-purple-50/50">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-xl px-4 py-3 flex items-center shadow-sm sticky top-0 z-10 border-b border-orange-100/20">
        <Link to="/home" className="mr-4 -ml-2 hidden sm:flex">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold font-playfair tracking-tight">
          <span className="text-orange-500">Learning</span>{" "}
          <span className="text-black">Analytics</span>
        </h1>
      </div>
      
      {/* Dashboard Layout */}
      <div className="flex-1 w-full mx-auto p-4 md:p-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Primary Analytics */}
          <div className="space-y-6">
            <CompletionScoreChart />
            <QuizScoreChart />
          </div>
          
          {/* Right Column - Secondary Analytics */}
          <div className="space-y-6">
            <TopYouTubeChannels />
            <ScreenTimeChart />
            <AIInsights />
          </div>
        </div>
      </div>
      
      <Navigation activeTab="analytics" />
    </div>
  );
};

export default Analytics;


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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-neugie-light-blue/90 to-purple-50/90">
      <div className="bg-white/80 backdrop-blur-xl px-5 py-4 flex items-center shadow-md sticky top-0 z-20 border-b border-orange-200/30">
        <Link to="/home" className="mr-5 -ml-2 flex items-center">
          <ChevronLeft className="h-5 w-5 text-neugie-blue" />
          <span className="text-neugie-blue font-semibold ml-1 hidden sm:inline">Back</span>
        </Link>
        <h1 className="text-3xl font-bold font-playfair tracking-tight text-purple-800">
          <span className="text-neugie-blue">Learning</span>{" "}
          <span className="text-purple-800">Analytics</span>
        </h1>
      </div>

      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 py-10 md:py-12 space-y-12 md:space-y-14">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column */}
          <div className="flex flex-col space-y-8">
            <CompletionScoreChart />
            <QuizScoreChart />
          </div>
          {/* Right Column */}
          <div className="flex flex-col space-y-8">
            <TopYouTubeChannels />
            <ScreenTimeChart />
            <AIInsights />
          </div>
        </section>
      </main>

      <Navigation activeTab="analytics" />
    </div>
  );
};

export default Analytics;

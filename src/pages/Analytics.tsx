
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
      <div className="bg-white/70 backdrop-blur-xl px-5 py-4 flex items-center shadow-md sticky top-0 z-20 border-b border-orange-200/30">
        <Link to="/home" className="mr-5 -ml-2 flex items-center">
          <ChevronLeft className="h-5 w-5 text-orange-500" />
          <span className="text-orange-500 font-semibold ml-1 hidden sm:inline">Back</span>
        </Link>
        <h1 className="text-3xl font-bold font-playfair tracking-tight text-purple-800">
          <span className="text-neugie-blue">Learning</span>{" "}
          <span className="text-purple-800">Analytics</span>
        </h1>
      </div>

      <main className="flex-1 max-w-screen-lg mx-auto w-full px-5 py-8 space-y-10">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - main charts */}
          <div className="flex flex-col space-y-8">
            <CompletionScoreChart />
            <div className="pt-1">
              <QuizScoreChart />
              <p className="text-sm text-gray-600 mt-2 -mb-3 tracking-wide">
                Showing data for the past 3 months
              </p>
            </div>
          </div>

          {/* Right Column - secondary analytics */}
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

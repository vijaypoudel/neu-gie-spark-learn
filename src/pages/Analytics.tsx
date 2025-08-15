
import React from 'react';
import Navigation from '@/components/Navigation';
import { ChevronLeft, BarChart3, Brain, Clock, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import CompletionScoreChart from '@/components/analytics/CompletionScoreChart';
import QuizScoreChart from '@/components/analytics/QuizScoreChart';
import AIInsights from '@/components/analytics/AIInsights';
import TopYouTubeChannels from '@/components/analytics/TopYouTubeChannels';
import ScreenTimeChart from '@/components/analytics/ScreenTimeChart';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

const Analytics = () => {
  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-neugie-light-blue/90 to-purple-50/90">
        <header className="bg-white/80 backdrop-blur-xl px-5 py-4 flex items-center shadow-md sticky top-0 z-20 border-b border-orange-200/30">
          <Link to="/home" className="mr-5 -ml-2 flex items-center">
            <ChevronLeft className="h-5 w-5 text-neugie-blue" />
            <span className="text-neugie-blue font-semibold ml-1 hidden sm:inline">Back</span>
          </Link>
          <h1 className="brand-heading flex-1">
            <span className="brand-accent">Learning</span>{" "}
            <span>Analytics</span>
          </h1>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link 
                to="/how-it-works" 
                className="p-2 rounded-full hover:bg-orange-100 transition-colors"
              >
                <HelpCircle className="h-5 w-5 text-orange-500" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Learn how analytics work</p>
            </TooltipContent>
          </Tooltip>
        </header>

      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 py-10 md:py-12 space-y-12 md:space-y-14">
        {/* Analytics Explanation */}
        <div className="premium-card p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <BarChart3 className="h-8 w-8 text-orange-500" />
            <h2 className="text-xl font-bold font-playfair text-gray-800">
              Understanding Your Child's Learning Analytics
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <Brain className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Quiz Intelligence</h3>
                <p>AI analyzes quiz responses during video watching to understand comprehension levels and learning patterns.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Screen Time Tracking</h3>
                <p>Monitor healthy learning duration and engagement patterns to optimize future curriculum plans.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <BarChart3 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Progress Insights</h3>
                <p>Track completion rates, subject mastery, and weekly improvements to guide next week's planning.</p>
              </div>
            </div>
          </div>
        </div>

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
    </TooltipProvider>
  );
};
export default Analytics;

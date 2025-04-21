
import React from 'react';
import Navigation from '@/components/Navigation';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      <div className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8 space-y-8 mb-20">
        <Tabs defaultValue="completion" className="w-full">
          <TabsList className="w-full grid grid-cols-5 gap-2 bg-white/90 border rounded-lg">
            <TabsTrigger value="completion">Weekly Targets</TabsTrigger>
            <TabsTrigger value="quizzes">Quiz Scores</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="youtube">Top Channels</TabsTrigger>
            <TabsTrigger value="screen-time">Screen Time</TabsTrigger>
          </TabsList>
          <TabsContent value="completion" className="animate-fade-in">
            <CompletionScoreChart />
          </TabsContent>
          <TabsContent value="quizzes" className="animate-fade-in">
            <QuizScoreChart />
          </TabsContent>
          <TabsContent value="insights" className="animate-fade-in">
            <AIInsights />
          </TabsContent>
          <TabsContent value="youtube" className="animate-fade-in">
            <TopYouTubeChannels />
          </TabsContent>
          <TabsContent value="screen-time" className="animate-fade-in">
            <ScreenTimeChart />
          </TabsContent>
        </Tabs>
      </div>
      <Navigation activeTab="analytics" />
    </div>
  );
};

export default Analytics;


import React from 'react';
import AICompanion from '@/components/AICompanion';
import Navigation from '@/components/Navigation';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIChat = () => {
  return (
    <div className="min-h-screen premium-gradient-bg flex flex-col">
      <header className="premium-card sticky top-0 z-50 mx-4 mt-4 mb-6">
        <div className="p-4 flex items-center">
          <Link to="/home" className="mr-5 -ml-2 flex items-center">
            <ChevronLeft className="h-5 w-5 text-orange-500" />
            <span className="text-orange-500 font-semibold ml-1 hidden sm:inline">Back</span>
          </Link>
          <h1 className="brand-heading">
            <span className="brand-accent">Ask</span>{" "}
            <span>NeuGie</span>
          </h1>
        </div>
      </header>
      
      <div className="flex-1 px-4">
        <div className="premium-card h-full">
          <AICompanion />
        </div>
      </div>
      
      <Navigation activeTab="ai" />
    </div>
  );
};

export default AIChat;

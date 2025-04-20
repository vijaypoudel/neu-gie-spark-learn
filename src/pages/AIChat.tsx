import React from 'react';
import AICompanion from '@/components/AICompanion';
import Navigation from '@/components/Navigation';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIChat = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50/50 to-black/5">
      <div className="bg-white/70 backdrop-blur-xl p-4 flex items-center shadow-sm sticky top-0 z-10 border-b border-orange-100/20">
        <Link to="/home" className="mr-4">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold font-playfair">
          <span className="text-orange-500">Ask</span>{" "}
          <span className="text-black">NeuGie</span>
        </h1>
      </div>
      
      <div className="flex-1">
        <AICompanion />
      </div>
      
      <Navigation activeTab="ai" />
    </div>
  );
};

export default AIChat;

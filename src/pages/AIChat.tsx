
import React from 'react';
import AICompanion from '@/components/AICompanion';
import Navigation from '@/components/Navigation';

const AIChat = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold">Ask NeuGie</h1>
      </div>
      
      {/* AI Chat Interface */}
      <div className="flex-1">
        <AICompanion />
      </div>
      
      <Navigation activeTab="ai" />
    </div>
  );
};

export default AIChat;

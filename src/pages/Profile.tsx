import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ParentDashboard from '@/components/ParentDashboard';
import Navigation from '@/components/Navigation';
import NeugieMascot from '@/components/NeugieMascot';

const Profile = () => {
  // Mock data - in a real app this would be fetched from an API
  const childName = "Alex";
  const recentActivities = [
    {
      id: '1',
      type: 'quiz' as const,
      title: 'Math Quiz: Addition',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      duration: 15,
      score: 85
    },
    {
      id: '2',
      type: 'lesson' as const,
      title: 'Animal Habitats',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      duration: 25
    },
    {
      id: '3',
      type: 'question' as const,
      title: 'Asked about "why is the sky blue?"',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    },
    {
      id: '4',
      type: 'quiz' as const,
      title: 'Reading Comprehension',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      duration: 20,
      score: 90
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Button variant="outline" size="sm">
          Switch Profile
        </Button>
      </div>
      
      {/* Main content */}
      <div className="p-4">
        {/* Kid profile view */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-neugie-blue to-neugie-purple p-6 text-white flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{childName}</h2>
              <p className="opacity-80">7 years old</p>
            </div>
            <NeugieMascot size="md" />
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-2 bg-neugie-light-blue rounded-lg">
                <p className="text-xs text-gray-600">Reading Level</p>
                <p className="font-bold text-neugie-blue">Intermediate</p>
              </div>
              <div className="text-center p-2 bg-neugie-light-green rounded-lg">
                <p className="text-xs text-gray-600">Math Skills</p>
                <p className="font-bold text-neugie-green">Basic Addition</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-1">Recent Badges</h3>
              <div className="flex space-x-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-neugie-yellow flex items-center justify-center text-lg">
                  🌟
                </div>
                <div className="w-10 h-10 rounded-full bg-neugie-green flex items-center justify-center text-lg">
                  🧠
                </div>
                <div className="w-10 h-10 rounded-full bg-neugie-blue flex items-center justify-center text-lg">
                  📚
                </div>
              </div>
            </div>
            
            <Button className="w-full bg-neugie-blue">
              View Learning Journey
            </Button>
          </div>
        </Card>
        
        {/* Parent Dashboard */}
        <ParentDashboard 
          childName={childName}
          recentActivities={recentActivities}
        />
      </div>
      
      <Navigation activeTab="learn" />
    </div>
  );
};

export default Profile;

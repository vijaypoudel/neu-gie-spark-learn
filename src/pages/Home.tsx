import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, TrendingUp, Calendar, Users, Inbox } from 'lucide-react';
import NeugieMascot from '@/components/NeugieMascot';
import ProfileSelector from '@/components/ProfileSelector';
import LearningCard from '@/components/LearningCard';
import Navigation from '@/components/Navigation';

const Home = () => {
  // Mock profiles
  const profiles = [
    { id: '1', name: 'Parent', type: 'parent' as const },
    { id: '2', name: 'Alex', type: 'child' as const, age: 7 }
  ];
  
  const [selectedProfile, setSelectedProfile] = useState<typeof profiles[0] | null>(null);
  
  // Mock recommended learning items for child
  const learningItems = [
    {
      id: '1',
      title: 'Addition and Subtraction',
      description: 'Learn basic addition and subtraction with fun exercises.',
      category: 'math' as const
    },
    {
      id: '2',
      title: 'Animals and Their Habitats',
      description: 'Discover where different animals live and why.',
      category: 'science' as const
    },
    {
      id: '3',
      title: 'Reading Practice: Short Stories',
      description: 'Improve reading skills with entertaining short stories.',
      category: 'language' as const
    },
    {
      id: '4',
      title: 'Drawing Animals Step by Step',
      description: 'Learn to draw your favorite animals with simple steps.',
      category: 'art' as const
    }
  ];
  
  const handleProfileSelect = (profile: typeof profiles[0]) => {
    setSelectedProfile(profile);
    // In a real app, this would load the appropriate content
  };

  const sections = [
    {
      title: "Weekly Curriculum",
      description: "Track and manage your child's weekly learning schedule",
      icon: Book,
      color: "bg-blue-500",
    },
    {
      title: "Analytics",
      description: "Monitor progress and performance insights",
      icon: TrendingUp,
      color: "bg-green-500",
    },
    {
      title: "Utility Section",
      description: "Access tools and resources for learning",
      icon: Calendar,
      color: "bg-purple-500",
    },
    {
      title: "My Social Circle",
      description: "Connect with other parents and educators",
      icon: Users,
      color: "bg-yellow-500",
    },
    {
      title: "My Inbox",
      description: "Stay updated with important notifications",
      icon: Inbox,
      color: "bg-orange-500",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between shadow-sm">
        <h1 className="text-2xl font-bold">
          <span className="text-yellow-500">Curio</span>
          <span className="text-orange-500">Bee</span>
        </h1>
        <NeugieMascot size="sm" />
      </div>
      
      <div className="p-4">
        {/* Profile selection */}
        {!selectedProfile ? (
          <ProfileSelector 
            profiles={profiles}
            onSelect={handleProfileSelect}
          />
        ) : (
          <div>
            {selectedProfile.type === 'child' && (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2">
                    Welcome back, {selectedProfile.name}!
                  </h2>
                  <p className="text-gray-600">
                    What would you like to learn today?
                  </p>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3">Continue Learning</h3>
                  <LearningCard
                    title="Letters and Sounds"
                    description="Learn to recognize and pronounce different letters."
                    category="language"
                    onClick={() => {/* Would navigate to learning content */}}
                  />
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-3">Recommended For You</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {learningItems.map(item => (
                      <LearningCard
                        key={item.id}
                        title={item.title}
                        description={item.description}
                        category={item.category}
                        onClick={() => {/* Would navigate to learning content */}}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {selectedProfile.type === 'parent' && (
              <div className="text-center py-8">
                <h2 className="text-xl font-bold mb-4">Parent Dashboard</h2>
                <p className="text-gray-600 mb-6">
                  Select a child profile to view their learning progress and activity.
                </p>
                
                <div className="grid grid-cols-1 gap-4 max-w-xs mx-auto">
                  {profiles
                    .filter(p => p.type === 'child')
                    .map(childProfile => (
                      <button
                        key={childProfile.id}
                        className="neugie-button bg-neugie-green flex items-center justify-center"
                        onClick={() => setSelectedProfile(childProfile)}
                      >
                        {childProfile.name}
                        {childProfile.age && <span className="ml-2">(Age {childProfile.age})</span>}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <Navigation activeTab="home" />
    </div>
  );
};

export default Home;

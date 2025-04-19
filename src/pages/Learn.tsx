
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LearningCard from '@/components/LearningCard';
import Navigation from '@/components/Navigation';

const Learn = () => {
  const [category, setCategory] = useState('all');
  
  // Mock curriculum content
  const curriculumContent = [
    {
      id: '1',
      title: 'Numbers 1-20',
      description: 'Learn to count and recognize numbers from 1 to 20.',
      category: 'math' as const,
    },
    {
      id: '2',
      title: 'Addition with Pictures',
      description: 'Visual addition practice with fun pictures.',
      category: 'math' as const,
    },
    {
      id: '3',
      title: 'Animal Lifecycles',
      description: 'Learn how animals grow and change.',
      category: 'science' as const,
    },
    {
      id: '4',
      title: 'Alphabet Fun',
      description: 'Practice recognizing and writing letters.',
      category: 'language' as const,
    },
    {
      id: '5',
      title: 'Color Mixing',
      description: 'Explore what happens when colors combine.',
      category: 'art' as const,
    },
    {
      id: '6',
      title: 'Rhythm and Beats',
      description: 'Clap and move to different musical patterns.',
      category: 'music' as const,
    }
  ];
  
  // Mock passion activities
  const passionContent = [
    {
      id: '1',
      title: 'Easy Drawing: Animals',
      description: 'Simple step-by-step animal drawings for beginners.',
      category: 'art' as const,
    },
    {
      id: '2',
      title: 'Sing Along: Kids Songs',
      description: 'Fun songs with lyrics to sing along with.',
      category: 'music' as const,
    },
    {
      id: '3',
      title: 'Dance Moves for Kids',
      description: 'Learn fun dance moves to your favorite songs.',
      category: 'music' as const,
    },
    {
      id: '4',
      title: 'Paper Crafts',
      description: 'Create cool things with just paper and scissors.',
      category: 'art' as const,
    }
  ];
  
  const filteredCurriculum = category === 'all' 
    ? curriculumContent 
    : curriculumContent.filter(item => item.category === category);
    
  const filteredPassion = category === 'all' 
    ? passionContent 
    : passionContent.filter(item => item.category === category);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold">Learn</h1>
      </div>
      
      {/* Category filter */}
      <div className="p-4 overflow-x-auto">
        <div className="flex space-x-2 min-w-max pb-2">
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              category === 'all' 
                ? 'bg-neugie-blue text-white' 
                : 'bg-white text-gray-600'
            }`}
            onClick={() => setCategory('all')}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              category === 'math' 
                ? 'bg-neugie-blue text-white' 
                : 'bg-white text-gray-600'
            }`}
            onClick={() => setCategory('math')}
          >
            Math
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              category === 'science' 
                ? 'bg-neugie-green text-white' 
                : 'bg-white text-gray-600'
            }`}
            onClick={() => setCategory('science')}
          >
            Science
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              category === 'language' 
                ? 'bg-neugie-purple text-white' 
                : 'bg-white text-gray-600'
            }`}
            onClick={() => setCategory('language')}
          >
            Language
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              category === 'art' 
                ? 'bg-neugie-yellow text-white' 
                : 'bg-white text-gray-600'
            }`}
            onClick={() => setCategory('art')}
          >
            Art
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              category === 'music' 
                ? 'bg-neugie-red text-white' 
                : 'bg-white text-gray-600'
            }`}
            onClick={() => setCategory('music')}
          >
            Music
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <Tabs defaultValue="curriculum" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="passion">Passions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="curriculum">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCurriculum.map(item => (
                <LearningCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  category={item.category}
                  onClick={() => {/* Would navigate to learning content */}}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="passion">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPassion.map(item => (
                <LearningCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  category={item.category}
                  onClick={() => {/* Would navigate to learning content */}}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Navigation activeTab="learn" />
    </div>
  );
};

export default Learn;

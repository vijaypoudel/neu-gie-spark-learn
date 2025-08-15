import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, BookOpen, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import LearningCard from '@/components/LearningCard';
import Navigation from '@/components/Navigation';

const Learn = () => {
  const [category, setCategory] = useState('all');
  
  // Enhanced curriculum content
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
      title: 'Basic Subtraction',
      description: 'Learn to subtract using simple examples.',
      category: 'math' as const,
    },
    {
      id: '4',
      title: 'Animal Lifecycles',
      description: 'Learn how animals grow and change.',
      category: 'science' as const,
    },
    {
      id: '5',
      title: 'Weather and Seasons',
      description: 'Explore different types of weather and seasonal changes.',
      category: 'science' as const,
    },
    {
      id: '6',
      title: 'Plants Growing',
      description: 'Discover how plants grow from seeds.',
      category: 'science' as const,
    },
    {
      id: '7',
      title: 'Alphabet Fun',
      description: 'Practice recognizing and writing letters.',
      category: 'language' as const,
    },
    {
      id: '8',
      title: 'Sight Words',
      description: 'Learn common words by sight.',
      category: 'language' as const,
    },
    {
      id: '9',
      title: 'Story Time',
      description: 'Read along with interactive stories.',
      category: 'language' as const,
    },
    {
      id: '10',
      title: 'Color Mixing',
      description: 'Explore what happens when colors combine.',
      category: 'art' as const,
    },
    {
      id: '11',
      title: 'Drawing Shapes',
      description: 'Learn to draw basic shapes and patterns.',
      category: 'art' as const,
    },
    {
      id: '12',
      title: 'Creative Crafts',
      description: 'Make fun art projects with simple materials.',
      category: 'art' as const,
    },
    {
      id: '13',
      title: 'Rhythm and Beats',
      description: 'Clap and move to different musical patterns.',
      category: 'music' as const,
    },
    {
      id: '14',
      title: 'Singing Together',
      description: 'Learn and sing along to fun children\'s songs.',
      category: 'music' as const,
    },
    {
      id: '15',
      title: 'Musical Instruments',
      description: 'Discover different instruments and their sounds.',
      category: 'music' as const,
    }
  ];
  
  // Enhanced passion activities
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
    },
    {
      id: '5',
      title: 'Science Experiments',
      description: 'Safe and fun experiments to try at home.',
      category: 'science' as const,
    },
    {
      id: '6',
      title: 'Storytelling',
      description: 'Create and tell your own exciting stories.',
      category: 'language' as const,
    }
  ];
  
  const filteredCurriculum = category === 'all' 
    ? curriculumContent 
    : curriculumContent.filter(item => item.category === category);
    
  const filteredPassion = category === 'all' 
    ? passionContent 
    : passionContent.filter(item => item.category === category);

  return (
    <div className="min-h-screen premium-gradient-bg">
      {/* Premium Header */}
      <header className="premium-card sticky top-0 z-50 mx-4 mt-4 mb-6">
        <div className="p-4 flex items-center">
          <Link to="/kids-home" className="mr-5 -ml-2 flex items-center">
            <ChevronLeft className="h-5 w-5 text-orange-500" />
            <span className="text-orange-500 font-semibold ml-1 hidden sm:inline">Back</span>
          </Link>
          <div className="flex items-center gap-3 flex-1">
            <BookOpen className="h-6 w-6 text-orange-500" />
            <h1 className="brand-heading text-xl">
              <span className="brand-accent">Learning</span>{" "}
              <span>Adventure</span>
            </h1>
          </div>
        </div>
      </header>
      
      {/* Category Filter */}
      <div className="px-6 mb-6">
        <div className="premium-card p-4">
          <h3 className="brand-card-title mb-3">Choose Subject</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: 'all', label: 'All', color: 'bg-orange-500' },
              { id: 'math', label: 'Math', color: 'bg-blue-500' },
              { id: 'science', label: 'Science', color: 'bg-green-500' },
              { id: 'language', label: 'Language', color: 'bg-purple-500' },
              { id: 'art', label: 'Art', color: 'bg-yellow-500' },
              { id: 'music', label: 'Music', color: 'bg-red-500' }
            ].map(({ id, label, color }) => (
              <button 
                key={id}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  category === id 
                    ? `${color} text-white shadow-lg transform scale-105` 
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
                }`}
                onClick={() => setCategory(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="px-6 pb-24">
        <div className="premium-card p-6">
          <Tabs defaultValue="curriculum" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-orange-50 p-1 rounded-xl">
              <TabsTrigger 
                value="curriculum" 
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md font-semibold"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Curriculum
              </TabsTrigger>
              <TabsTrigger 
                value="passion" 
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md font-semibold"
              >
                <Heart className="h-4 w-4 mr-2" />
                Passions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="curriculum" className="space-y-4">
              <div className="mb-4">
                <h3 className="brand-card-title mb-2">📚 Learning Activities</h3>
                <p className="text-gray-600 text-sm">
                  Educational content aligned with your curriculum
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {filteredCurriculum.map(item => (
                  <LearningCard
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    category={item.category}
                    onClick={() => {/* Navigate to learning content */}}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="passion" className="space-y-4">
              <div className="mb-4">
                <h3 className="brand-card-title mb-2">🎨 Creative Pursuits</h3>
                <p className="text-gray-600 text-sm">
                  Fun activities based on your child's interests
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {filteredPassion.map(item => (
                  <LearningCard
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    category={item.category}
                    onClick={() => {/* Navigate to learning content */}}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Navigation activeTab="learn" />
    </div>
  );
};

export default Learn;

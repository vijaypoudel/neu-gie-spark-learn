import React from 'react';
import { Book, Award, Heart, Youtube } from 'lucide-react';
import Navigation from '@/components/Navigation';
import SectionCard from '@/components/home/SectionCard';

const KidsHome = () => {
  const sections = [
    {
      title: "Weekly Curriculum",
      description: "View your learning activities for this week",
      longDescription: "Explore your weekly learning plan, track your progress, and discover exciting lessons prepared for you. Let's see what amazing things you're going to learn this week!",
      icon: Book,
      color: "bg-neugie-blue hover:bg-neugie-blue/90",
      path: "/weekly-curriculum",
      bgImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600&h=400')",
    },
    {
      title: "My Badges",
      description: "Check out the badges you've earned",
      longDescription: "See all the badges you've collected on your learning journey. Each badge represents a special achievement or skill you've mastered. Keep collecting more!",
      icon: Award,
      color: "bg-neugie-green hover:bg-neugie-green/90",
      path: "/my-badges",
      bgImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600&h=400')",
    },
    {
      title: "My Passion",
      description: "Explore topics that interest you most",
      longDescription: "Dive deeper into the subjects you love! This is your special space to learn more about your favorite topics and discover new interests that spark your curiosity.",
      icon: Heart,
      color: "bg-neugie-purple hover:bg-neugie-purple/90",
      path: "/my-passion",
      bgImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&q=80&w=600&h=400')",
    },
    {
      title: "FunTube",
      description: "Watch educational videos made just for you",
      longDescription: "Enjoy a collection of fun and educational videos selected just for you! Learn through engaging content that makes complex subjects easy to understand and remember.",
      icon: Youtube,
      color: "bg-neugie-red hover:bg-neugie-red/90",
      path: "/funtube",
      bgImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=600&h=400')",
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 to-black/5 pb-20">
      <div className="bg-white/70 backdrop-blur-xl p-4 flex items-center justify-between shadow-sm sticky top-0 z-10 border-b border-orange-100/20">
        <h1 className="text-2xl font-bold font-playfair">
          <span className="text-orange-500">Curio</span>
          <span className="text-black">Bee</span>
          <span className="text-orange-500 ml-2">Kids</span>
        </h1>
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
          <span className="text-orange-500 font-bold">TJ</span>
        </div>
      </div>
      
      <div className="p-6 md:p-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 font-playfair bg-gradient-to-r from-orange-600 to-black bg-clip-text text-transparent">
          Hello, Tommy!
        </h2>
        
        <div className="grid grid-cols-1 gap-8">
          {sections.map((section, index) => (
            <SectionCard
              key={index}
              {...section}
            />
          ))}
        </div>
      </div>
      
      <Navigation activeTab="home" />
    </div>
  );
};

export default KidsHome;

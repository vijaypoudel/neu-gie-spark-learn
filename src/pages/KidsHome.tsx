import React from 'react';
import { Book, Award, Heart, Youtube, Calendar } from 'lucide-react';
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
      title: "My Calendar",
      description: "Check your learning schedule and activities",
      longDescription: "See all your upcoming learning activities, exams, and fun events. Stay organized and never miss anything important in your learning journey!",
      icon: Calendar,
      color: "bg-neugie-orange hover:bg-neugie-orange/90",
      path: "/calendar",
      bgImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600&h=400')",
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
    <div className="min-h-screen premium-gradient-bg">
      {/* Premium Kids Header */}
      <div className="premium-card sticky top-0 z-50 mx-4 mt-4 mb-6">
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold font-playfair">
            <span className="text-orange-500">Neu</span>
            <span className="text-gray-800">gie</span>
            <span className="text-orange-500 ml-2">Kids</span>
          </h1>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">TJ</span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold mb-3 font-playfair">
              Hey there, <span className="text-orange-500">Tommy!</span>
            </h2>
            <p className="text-lg text-gray-600">
              Ready for some awesome learning adventures today?
            </p>
          </div>
          
          {/* Premium Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section, index) => (
              <SectionCard
                key={index}
                {...section}
              />
            ))}
          </div>
        </div>
      </div>
      
      <Navigation activeTab="home" />
    </div>
  );
};

export default KidsHome;

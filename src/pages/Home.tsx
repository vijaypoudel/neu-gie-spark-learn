import React, { useState } from 'react';
import { Book, TrendingUp, Calendar, Users, Inbox } from 'lucide-react';
import Navigation from '@/components/Navigation';
import SectionCard from '@/components/home/SectionCard';
import ProfileSheet from '@/components/home/ProfileSheet';

const Home = () => {
  const sections = [
    {
      title: "Weekly Curriculum",
      description: "Track and manage your child's weekly learning schedule",
      longDescription: "Access comprehensive curriculum plans, track progress, and explore learning materials organized by subject and grade level. Get personalized recommendations based on your child's learning style and interests.",
      icon: Book,
      color: "bg-neugie-blue hover:bg-neugie-blue/90",
      path: "/curriculum",
      bgImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600&h=400')",
    },
    {
      title: "Analytics",
      description: "Monitor progress and performance insights",
      longDescription: "View detailed analytics on your child's learning journey. Track time spent, subjects mastered, and areas that need improvement with interactive charts and personalized reports.",
      icon: TrendingUp,
      color: "bg-neugie-green hover:bg-neugie-green/90",
      path: "/analytics",
      bgImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600&h=400')",
    },
    {
      title: "Calendar",
      description: "Schedule learning activities and events",
      longDescription: "Organize your child's educational journey with our intuitive calendar. Plan study sessions, schedule educational activities, set reminders for assignments, and coordinate with tutors.",
      icon: Calendar,
      color: "bg-neugie-purple hover:bg-neugie-purple/90",
      path: "/calendar",
      bgImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&q=80&w=600&h=400')",
    },
    {
      title: "My Social Circle",
      description: "Connect with other parents and educators",
      longDescription: "Build a supportive network with other parents and educators. Share experiences, exchange resources, participate in discussions, and collaborate on educational initiatives.",
      icon: Users,
      color: "bg-neugie-yellow hover:bg-neugie-yellow/90",
      path: "/social",
      bgImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=600&h=400')",
    },
    {
      title: "My Inbox",
      description: "Stay updated with important notifications",
      longDescription: "Receive and manage communications from teachers, educational institutions, and the CurioBee platform. Get timely updates on your child's progress and important educational opportunities.",
      icon: Inbox,
      color: "bg-neugie-red hover:bg-neugie-red/90",
      path: "/inbox",
      bgImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1555421689-3f034debb7a6?auto=format&fit=crop&q=80&w=600&h=400')",
    }
  ];

  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  
  const toggleCardFlip = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedCard(flippedCard === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 to-yellow-50/30 pb-20">
      <div className="bg-white/70 backdrop-blur-xl p-4 flex items-center justify-between shadow-sm sticky top-0 z-10 border-b border-orange-100/20">
        <h1 className="text-2xl font-bold font-playfair">
          <span className="text-yellow-500">Curio</span>
          <span className="text-orange-500">Bee</span>
        </h1>
        <ProfileSheet />
      </div>
      
      <div className="p-6 md:p-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 font-playfair bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
          Welcome back, Sarah!
        </h2>
        
        <div className="grid grid-cols-1 gap-8">
          {sections.map((section, index) => (
            <SectionCard
              key={index}
              {...section}
              isFlipped={flippedCard === index}
              onFlip={(e) => toggleCardFlip(index, e)}
            />
          ))}
        </div>
      </div>
      
      <Navigation activeTab="home" />
    </div>
  );
};

export default Home;

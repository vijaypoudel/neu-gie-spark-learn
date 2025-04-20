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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between shadow-md sticky top-0 z-10">
        <h1 className="text-2xl font-bold font-playfair">
          <span className="text-yellow-500">Curio</span>
          <span className="text-orange-500">Bee</span>
        </h1>
        <ProfileSheet />
      </div>
      
      <div className="p-4 md:p-6">
        <h2 className="text-2xl font-bold mb-6 font-playfair">Welcome back, Sarah!</h2>
        
        <div className="grid grid-cols-1 gap-6">
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
      
      <style>
        {`
          @keyframes rotate-y-180 {
            from { transform: rotateY(0deg); }
            to { transform: rotateY(180deg); }
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}
      </style>
    </div>
  );
};

export default Home;

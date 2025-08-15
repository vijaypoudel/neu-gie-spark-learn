import React from 'react';
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
      color: "premium",
      path: "/curriculum",
      gradient: "from-orange-400/20 to-orange-500/30"
    },
    {
      title: "Analytics", 
      description: "Monitor progress and performance insights",
      longDescription: "View detailed analytics on your child's learning journey. Track time spent, subjects mastered, and areas that need improvement with interactive charts and personalized reports.",
      icon: TrendingUp,
      color: "success",
      path: "/analytics",
      gradient: "from-emerald-400/20 to-emerald-500/30"
    },
    {
      title: "Calendar",
      description: "Schedule learning activities and events", 
      longDescription: "Organize your child's educational journey with our intuitive calendar. Plan study sessions, schedule educational activities, set reminders for assignments, and coordinate with tutors.",
      icon: Calendar,
      color: "info",
      path: "/calendar",
      gradient: "from-blue-400/20 to-blue-500/30"
    },
    {
      title: "My Social Circle",
      description: "Connect with other parents and educators",
      longDescription: "Build a supportive network with other parents and educators. Share experiences, exchange resources, participate in discussions, and collaborate on educational initiatives.",
      icon: Users,
      color: "secondary",
      path: "/social", 
      gradient: "from-purple-400/20 to-purple-500/30"
    },
    {
      title: "My Inbox",
      description: "Stay updated with important notifications",
      longDescription: "Receive and manage communications from teachers, educational institutions, and the Neugie platform. Get timely updates on your child's progress and important educational opportunities.",
      icon: Inbox,
      color: "warning",
      path: "/inbox",
      gradient: "from-amber-400/20 to-amber-500/30"
    }
  ];

  return (
    <div className="min-h-screen premium-gradient-bg">
      {/* Premium Header */}
      <div className="premium-card sticky top-0 z-50 mx-4 mt-4 mb-6">
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold font-playfair">
            <span className="text-orange-500">Neu</span>
            <span className="text-gray-800">gie</span>
          </h1>
          <ProfileSheet />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold mb-3 font-playfair">
              Welcome back, <span className="text-orange-500">Sarah!</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Continue your parenting journey with smart insights and educational tools
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

export default Home;
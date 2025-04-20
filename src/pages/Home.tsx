
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Book, TrendingUp, Calendar, Users, Inbox } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Home = () => {
  // Section data for the home page
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
      title: "Calendar",
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
        <h1 className="text-2xl font-bold font-playfair">
          <span className="text-yellow-500">Curio</span>
          <span className="text-orange-500">Bee</span>
        </h1>
        <img 
          src="/lovable-uploads/8a2bf812-5023-41f7-aef5-bff84f9a8786.png" 
          alt="CurioBee Mascot" 
          className="w-12 h-12" 
        />
      </div>
      
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6 font-playfair">Welcome back, Parent!</h2>
        
        {/* Section cards */}
        <div className="grid grid-cols-1 gap-4">
          {sections.map((section, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-lg">
              <div className="flex items-center">
                <div className={`${section.color} text-white p-4 flex items-center justify-center`}>
                  <section.icon size={24} />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg font-playfair">{section.title}</h3>
                  <p className="text-gray-600 text-sm">{section.description}</p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <Navigation activeTab="home" />
    </div>
  );
};

export default Home;

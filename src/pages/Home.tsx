
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { 
  Book, 
  TrendingUp, 
  Calendar, 
  Users, 
  Inbox, 
  MoreHorizontal,
  ChevronRight
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Home = () => {
  // Section data for the home page with added background images
  const sections = [
    {
      title: "Weekly Curriculum",
      description: "Track and manage your child's weekly learning schedule",
      longDescription: "Access comprehensive curriculum plans, track progress, and explore learning materials organized by subject and grade level. Get personalized recommendations based on your child's learning style and interests.",
      icon: Book,
      color: "bg-blue-500",
      path: "/curriculum",
      bgImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600&h=400')",
    },
    {
      title: "Analytics",
      description: "Monitor progress and performance insights",
      longDescription: "View detailed analytics on your child's learning journey. Track time spent, subjects mastered, and areas that need improvement with interactive charts and personalized reports.",
      icon: TrendingUp,
      color: "bg-green-500",
      path: "/analytics",
      bgImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600&h=400')",
    },
    {
      title: "Calendar",
      description: "Schedule learning activities and events",
      longDescription: "Organize your child's educational journey with our intuitive calendar. Plan study sessions, schedule educational activities, set reminders for assignments, and coordinate with tutors.",
      icon: Calendar,
      color: "bg-purple-500",
      path: "/calendar",
      bgImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&q=80&w=600&h=400')",
    },
    {
      title: "My Social Circle",
      description: "Connect with other parents and educators",
      longDescription: "Build a supportive network with other parents and educators. Share experiences, exchange resources, participate in discussions, and collaborate on educational initiatives.",
      icon: Users,
      color: "bg-yellow-500",
      path: "/social",
      bgImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=600&h=400')",
    },
    {
      title: "My Inbox",
      description: "Stay updated with important notifications",
      longDescription: "Receive and manage communications from teachers, educational institutions, and the CurioBee platform. Get timely updates on your child's progress and important educational opportunities.",
      icon: Inbox,
      color: "bg-orange-500",
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
        
        <Sheet>
          <SheetTrigger asChild>
            <Avatar className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-all">
              <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100" alt="Profile" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent className="w-full sm:w-96 overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-2xl font-bold font-playfair mb-6">Profile</SheetTitle>
            </SheetHeader>
            
            <div className="flex flex-col items-center mb-8">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100" alt="Profile" />
                <AvatarFallback>P</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">Sarah Johnson</h2>
              <p className="text-gray-500">sarah.johnson@example.com</p>
            </div>
            
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium mb-2">Account Settings</h3>
                <Button variant="outline" className="w-full justify-between" asChild>
                  <Link to="/profile">
                    Update Parent Profile <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium mb-2">Child Profile</h3>
                <Button variant="outline" className="w-full justify-between" asChild>
                  <Link to="/profile">
                    Update Child Details <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Subscription</h3>
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-4">
                  <p className="font-medium">Premium Plan</p>
                  <p className="text-sm opacity-90">Active until Dec 2025</p>
                </div>
              </div>
              
              <Button className="w-full bg-neugie-blue">Logout</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      <div className="p-4 md:p-6">
        <h2 className="text-2xl font-bold mb-6 font-playfair">Welcome back, Sarah!</h2>
        
        {/* Premium section cards with flip functionality */}
        <div className="grid grid-cols-1 gap-6">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className={`relative ${flippedCard === index ? 'h-80' : 'h-60'} transition-all duration-500 ease-in-out`}
            >
              <div 
                className={`w-full h-full rounded-2xl overflow-hidden transition-transform duration-500 ${
                  flippedCard === index ? 'rotate-y-180 absolute invisible' : ''
                }`}
                onClick={() => window.location.href = section.path}
              >
                <div 
                  className="w-full h-full p-6 flex flex-col justify-between bg-cover bg-center text-white"
                  style={{ backgroundImage: section.bgImage }}
                >
                  <div className="flex justify-between items-start">
                    <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                      <section.icon className="h-8 w-8" />
                    </div>
                    <button 
                      onClick={(e) => toggleCardFlip(index, e)}
                      className="bg-white/30 hover:bg-white/50 rounded-full p-1.5 backdrop-blur-sm transition-all"
                      aria-label="Show more details"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-playfair mb-1">{section.title}</h3>
                    <p className="text-white/90">{section.description}</p>
                  </div>
                </div>
              </div>
              
              <div 
                className={`w-full h-full rounded-2xl overflow-hidden bg-white shadow-xl transition-transform duration-500 absolute inset-0 ${
                  flippedCard === index ? '' : 'rotate-y-180 invisible'
                }`}
              >
                <div className="h-full p-6 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800 font-playfair">{section.title}</h3>
                    <button 
                      onClick={(e) => toggleCardFlip(index, e)}
                      className="bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition-all"
                      aria-label="Hide details"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 mb-6 flex-grow">{section.longDescription}</p>
                  
                  <Button 
                    className={`mt-auto w-full ${section.color.replace('bg-', 'bg-')}`}
                    asChild
                  >
                    <Link to={section.path}>
                      Open {section.title} <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Navigation activeTab="home" />
      
      {/* Add custom CSS for card flip effect */}
      <style jsx>{`
        @keyframes rotate-y-180 {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(180deg); }
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Home;

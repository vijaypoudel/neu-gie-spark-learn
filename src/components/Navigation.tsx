
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen, Inbox, Bee } from "lucide-react";

interface NavigationProps {
  activeTab: 'home' | 'learn' | 'ai' | 'inbox';
}

const Navigation: React.FC<NavigationProps> = ({ activeTab }) => {
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/home'
    },
    {
      id: 'learn',
      label: 'Learn',
      icon: BookOpen,
      path: '/learn'
    },
    {
      id: 'ai',
      label: 'Ask NeuGie',
      icon: Bee,
      path: '/ai'
    },
    {
      id: 'inbox',
      label: 'Inbox',
      icon: Inbox,
      path: '/inbox'
    }
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-16 px-2">
      {navItems.map((item) => (
        <Link
          key={item.id}
          to={item.path}
          className={`flex flex-col items-center justify-center w-full h-full ${
            activeTab === item.id 
              ? 'text-neugie-blue' 
              : 'text-gray-400 hover:text-gray-700'
          }`}
        >
          <item.icon className="h-5 w-5 mb-1" />
          <span className="text-xs">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;

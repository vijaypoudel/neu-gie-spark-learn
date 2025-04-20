
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BugPlay, Inbox } from "lucide-react";

interface NavigationProps {
  activeTab: 'home' | 'ai' | 'inbox';
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
      id: 'ai',
      label: 'Ask CurioBee',
      icon: BugPlay,
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
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-orange-100/20 flex justify-around items-center h-16 px-2 shadow-lg">
      {navItems.map((item) => (
        <Link
          key={item.id}
          to={item.path}
          className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 ${
            activeTab === item.id 
              ? 'text-orange-500 scale-110' 
              : 'text-gray-400 hover:text-yellow-500'
          }`}
        >
          <item.icon className={`h-5 w-5 mb-1 ${activeTab === item.id ? 'animate-pulse' : ''}`} />
          <span className="text-xs font-medium">{item.label}</span>
          {activeTab === item.id && (
            <div className="absolute bottom-0 w-10 h-1 bg-orange-500 rounded-t-full" />
          )}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;


import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BugPlay, Inbox, BarChart3 } from "lucide-react";

interface NavigationProps {
  activeTab: 'home' | 'ai' | 'inbox' | 'learn' | 'analytics';
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
      label: 'Ask Neugie',
      icon: BugPlay,
      path: '/ai'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      path: '/analytics'
    },
    {
      id: 'inbox',
      label: 'Inbox',
      icon: Inbox,
      path: '/inbox'
    }
  ];
  
  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50">
      <div className="premium-card p-2">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 min-w-[60px] ${
                activeTab === item.id 
                  ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white scale-105 shadow-lg' 
                  : 'text-gray-500 hover:text-orange-500 hover:bg-orange-50'
              }`}
            >
              <item.icon className={`h-5 w-5 mb-1 ${activeTab === item.id ? '' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;


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
    <nav className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="premium-card p-3 max-w-md mx-auto">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 min-w-[72px] min-h-[64px] ${
                activeTab === item.id 
                  ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white scale-105 shadow-lg' 
                  : 'text-gray-500 hover:text-orange-500 hover:bg-orange-50'
              }`}
            >
              <item.icon className={`h-6 w-6 mb-1 ${activeTab === item.id ? '' : ''}`} />
              <span className="text-xs font-medium leading-tight text-center">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

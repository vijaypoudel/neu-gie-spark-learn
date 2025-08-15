import React from 'react';
import { ChevronRight, LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SectionCardProps {
  title: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  color: string;
  path: string;
  gradient?: string;
}

const SectionCard = ({
  title,
  description,
  longDescription,
  icon: Icon,
  path,
  gradient = "from-orange-400/20 to-orange-500/30"
}: SectionCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (title === "Weekly Curriculum" && path === "/curriculum") {
      navigate('/set-curriculum');
    } else {
      navigate(path);
    }
  };

  return (
    <div 
      className="group cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="premium-card p-6 h-full relative overflow-hidden">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 font-playfair group-hover:text-gray-900 transition-colors">
                  {title}
                </h3>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-all duration-300 group-hover:translate-x-1" />
          </div>
          
          {/* Description */}
          <div className="flex-1">
            <p className="text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed">
              {description}
            </p>
          </div>
          
          {/* Bottom Action Indicator */}
          <div className="mt-6 pt-4 border-t border-gray-100 group-hover:border-orange-100 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500 group-hover:text-orange-600 transition-colors">
                Explore
              </span>
              <div className="w-8 h-1 bg-gray-200 rounded-full group-hover:bg-orange-500 transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionCard;
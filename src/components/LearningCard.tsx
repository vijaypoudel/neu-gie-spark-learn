
import React from 'react';
import { Card } from "@/components/ui/card";

interface LearningCardProps {
  title: string;
  description: string;
  category: 'math' | 'science' | 'language' | 'art' | 'music';
  imageUrl?: string;
  onClick: () => void;
}

const LearningCard: React.FC<LearningCardProps> = ({
  title,
  description,
  category,
  imageUrl,
  onClick
}) => {
  // Define category colors and icons
  const categoryStyles = {
    math: {
      bgColor: 'bg-neugie-blue',
      lightBgColor: 'bg-neugie-light-blue',
      icon: '🔢'
    },
    science: {
      bgColor: 'bg-neugie-green',
      lightBgColor: 'bg-neugie-light-green',
      icon: '🔬'
    },
    language: {
      bgColor: 'bg-neugie-purple',
      lightBgColor: 'bg-neugie-light-purple',
      icon: '📝'
    },
    art: {
      bgColor: 'bg-neugie-yellow',
      lightBgColor: 'bg-neugie-light-yellow',
      icon: '🎨'
    },
    music: {
      bgColor: 'bg-neugie-red',
      lightBgColor: 'bg-neugie-light-red',
      icon: '🎵'
    }
  };

  const { bgColor, lightBgColor, icon } = categoryStyles[category];

  return (
    <Card 
      className="neugie-card overflow-hidden hover:scale-[1.02] transition cursor-pointer"
      onClick={onClick}
    >
      <div className={`h-32 ${lightBgColor} relative flex items-center justify-center`}>
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-4xl">{icon}</span>
        )}
        <div className={`absolute top-2 left-2 ${bgColor} text-white rounded-full px-3 py-1 text-xs`}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
      </div>
    </Card>
  );
};

export default LearningCard;

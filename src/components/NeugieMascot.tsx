
import React from 'react';

interface NeugieMascotProps {
  expression?: 'happy' | 'thinking' | 'excited';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const NeugieMascot: React.FC<NeugieMascotProps> = ({ 
  expression = 'happy', 
  size = 'md',
  animated = true
}) => {
  // Size classes based on prop
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36'
  };
  
  // Animation classes if animated is true
  const animationClass = animated ? 'animate-float' : '';

  return (
    <div className={`${sizeClasses[size]} ${animationClass} relative`}>
      {/* The mascot is a simple placeholder - in a real app you'd use an actual character image */}
      <div className="rounded-full bg-gradient-to-b from-neugie-purple to-neugie-blue relative overflow-hidden">
        {/* Face */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Eyes */}
          <div className="flex space-x-3">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>
        
        {/* Mouth - changes based on expression */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
          {expression === 'happy' && (
            <div className="w-8 h-3 border-b-2 border-white rounded-b-full"></div>
          )}
          {expression === 'thinking' && (
            <div className="w-6 h-2 border-t-2 border-white"></div>
          )}
          {expression === 'excited' && (
            <div className="w-4 h-4 bg-white rounded-full"></div>
          )}
        </div>
        
        {/* Antenna */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="w-1 h-4 bg-neugie-yellow"></div>
          <div className="w-2 h-2 rounded-full bg-neugie-yellow animate-pulse"></div>
        </div>
      </div>
      
      {/* Hand - with wave animation if animated */}
      {animated && (
        <div className="absolute -right-2 top-1/2">
          <div className="w-3 h-5 bg-neugie-purple rounded-full animate-wave origin-bottom"></div>
        </div>
      )}
    </div>
  );
};

export default NeugieMascot;

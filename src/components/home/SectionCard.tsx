
import React from 'react';
import { MoreHorizontal, ChevronRight, LucideIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';

interface SectionCardProps {
  title: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  color: string;
  path: string;
  isFlipped: boolean;
  onFlip: (e: React.MouseEvent) => void;
}

const SectionCard = ({
  title,
  description,
  longDescription,
  icon: Icon,
  path,
  isFlipped,
  onFlip
}: SectionCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // If this is the weekly curriculum card, navigate to the setCurriculum page for parents
    if (title === "Weekly Curriculum" && path === "/curriculum") {
      navigate('/set-curriculum');
    } else {
      navigate(path);
    }
  };

  return (
    <div 
      className={`relative group ${isFlipped ? 'h-80' : 'h-64'} transition-all duration-500 ease-in-out cursor-pointer`}
      onClick={handleCardClick}
    >
      <div 
        className={`w-full h-full rounded-2xl overflow-hidden transition-all duration-500 
          premium-gradient backdrop-blur-xl
          shadow-premium-elevated hover:shadow-premium-elevated/80
          border border-white/10
          ${isFlipped ? 'rotate-y-180 absolute invisible' : 'transform-gpu hover:-translate-y-1 hover:scale-[1.02]'}`}
      >
        <div className="w-full h-full p-6 flex flex-col justify-between bg-white/30 backdrop-blur-lg">
          <div className="flex items-start justify-between">
            <h3 className="text-2xl font-semibold text-premium-text/90 mb-2 flex items-center">
              <Icon className="mr-2 h-5 w-5" />
              {title}
            </h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={onFlip}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <p className="text-premium-text/70 leading-relaxed">{description}</p>
            <div className="flex justify-end mt-4">
              <ChevronRight className="text-premium-text/40 h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionCard;

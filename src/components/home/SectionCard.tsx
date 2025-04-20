
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
}

const SectionCard = ({
  title,
  description,
  longDescription,
  icon: Icon,
  path,
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
      className="group h-64 transition-all duration-500 ease-in-out cursor-pointer"
      onClick={handleCardClick}
    >
      <div 
        className="w-full h-full rounded-2xl overflow-hidden transition-all duration-500 
          premium-gradient backdrop-blur-xl
          shadow-premium-elevated hover:shadow-premium-elevated/80
          border border-white/10
          transform-gpu hover:-translate-y-1 hover:scale-[1.02]"
      >
        <div className="w-full h-full p-6 flex flex-col justify-between bg-white/30 backdrop-blur-lg">
          <div className="flex items-start justify-between">
            <h3 className="text-2xl font-semibold text-premium-text/90 mb-2 flex items-center">
              <Icon className="mr-2 h-5 w-5" />
              {title}
            </h3>
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


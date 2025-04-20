
import React from 'react';
import { MoreHorizontal, ChevronRight, LucideIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

interface SectionCardProps {
  title: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  color: string;
  path: string;
  bgImage: string;
  isFlipped: boolean;
  onFlip: (e: React.MouseEvent) => void;
}

const SectionCard = ({
  title,
  description,
  longDescription,
  icon: Icon,
  color,
  path,
  bgImage,
  isFlipped,
  onFlip
}: SectionCardProps) => {
  return (
    <div className={`relative ${isFlipped ? 'h-80' : 'h-60'} transition-all duration-500 ease-in-out`}>
      <div 
        className={`w-full h-full rounded-2xl overflow-hidden transition-transform duration-500 ${
          isFlipped ? 'rotate-y-180 absolute invisible' : ''
        }`}
        onClick={() => window.location.href = path}
      >
        <div 
          className="w-full h-full p-6 flex flex-col justify-between bg-cover bg-center text-white"
          style={{ backgroundImage: bgImage }}
        >
          <div className="flex justify-between items-start">
            <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
              <Icon className="h-8 w-8" />
            </div>
            <button 
              onClick={onFlip}
              className="bg-white/30 hover:bg-white/50 rounded-full p-1.5 backdrop-blur-sm transition-all"
              aria-label="Show more details"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
          <div>
            <h3 className="text-2xl font-bold font-playfair mb-1">{title}</h3>
            <p className="text-white/90">{description}</p>
          </div>
        </div>
      </div>
      
      <div 
        className={`w-full h-full rounded-2xl overflow-hidden bg-white shadow-xl transition-transform duration-500 absolute inset-0 ${
          isFlipped ? '' : 'rotate-y-180 invisible'
        }`}
      >
        <div className="h-full p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800 font-playfair">{title}</h3>
            <button 
              onClick={onFlip}
              className="bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition-all"
              aria-label="Hide details"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
          
          <p className="text-gray-600 mb-6 flex-grow">{longDescription}</p>
          
          <Button 
            className={`mt-auto w-full ${color}`}
            asChild
          >
            <Link to={path}>
              Open {title} <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SectionCard;

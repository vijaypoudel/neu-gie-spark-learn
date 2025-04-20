
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
  return (
    <div className={`relative ${isFlipped ? 'h-80' : 'h-64'} transition-all duration-500 ease-in-out group`}>
      <div 
        className={`w-full h-full rounded-3xl overflow-hidden transition-all duration-500 
          backdrop-blur-[2px] bg-gradient-to-br from-white/80 to-white/40
          shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1),0_8px_24px_-4px_rgba(255,237,213,0.3)]
          hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.12),0_12px_32px_-4px_rgba(255,237,213,0.4)]
          border border-white/20
          ${isFlipped ? 'rotate-y-180 absolute invisible' : 'transform-gpu hover:-translate-y-1'}`}
        onClick={() => window.location.href = path}
      >
        <div className="w-full h-full p-8 flex flex-col justify-between bg-gradient-to-br from-orange-50/50 to-yellow-50/30">
          <div className="flex justify-between items-start">
            <div className="rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-500/20 p-3.5 
              backdrop-blur-xl transform-gpu transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
              <Icon className="h-8 w-8 text-orange-500/90" />
            </div>
            <button 
              onClick={onFlip}
              className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 
                rounded-full p-2 backdrop-blur-xl transition-all"
              aria-label="Show more details"
            >
              <MoreHorizontal className="h-5 w-5 text-orange-600/90" />
            </button>
          </div>
          <div>
            <h3 className="text-2xl font-bold font-playfair text-orange-600/90 mb-2">{title}</h3>
            <p className="text-orange-900/70 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
      
      <div 
        className={`w-full h-full rounded-3xl overflow-hidden transition-all duration-500 absolute inset-0
          backdrop-blur-[2px] bg-gradient-to-br from-white/80 to-white/40
          shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1),0_8px_24px_-4px_rgba(255,237,213,0.3)]
          hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.12),0_12px_32px_-4px_rgba(255,237,213,0.4)]
          border border-white/20
          ${isFlipped ? 'transform-gpu hover:-translate-y-1' : 'rotate-y-180 invisible'}`}
      >
        <div className="h-full p-8 flex flex-col bg-gradient-to-br from-orange-50/50 to-yellow-50/30">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-orange-600/90 font-playfair">{title}</h3>
            <button 
              onClick={onFlip}
              className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 
                rounded-full p-2 backdrop-blur-xl transition-all"
              aria-label="Hide details"
            >
              <MoreHorizontal className="h-5 w-5 text-orange-600/90" />
            </button>
          </div>
          
          <p className="text-orange-900/70 mb-6 flex-grow leading-relaxed">{longDescription}</p>
          
          <Button 
            className="mt-auto w-full bg-gradient-to-br from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 
              text-white shadow-lg hover:shadow-xl transition-all rounded-2xl h-12"
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

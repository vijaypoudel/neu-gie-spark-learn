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
    <div className={`relative group ${isFlipped ? 'h-80' : 'h-64'} transition-all duration-500 ease-in-out`}>
      <div 
        className={`w-full h-full rounded-2xl overflow-hidden transition-all duration-500 
          premium-gradient backdrop-blur-xl
          shadow-premium-elevated hover:shadow-premium-elevated/80
          border border-white/10
          ${isFlipped ? 'rotate-y-180 absolute invisible' : 'transform-gpu hover:-translate-y-1 hover:scale-[1.02]'}`}
      >
        <div className="w-full h-full p-6 flex flex-col justify-between bg-white/30 backdrop-blur-lg">
          <h3 className="text-2xl font-semibold text-premium-text/90 mb-2">{title}</h3>
          <p className="text-premium-text/70 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SectionCard;

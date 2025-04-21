import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import WeeklySummary from './WeeklySummary';

interface LastWeekSummaryCardProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  data: {
    subjects: string[];
    goalsAchieved: number;
    totalGoals: number;
    summary: string;
    strengths: string[];
    weaknesses: string[];
  };
}

const LastWeekSummaryCard: React.FC<LastWeekSummaryCardProps> = ({
  isOpen,
  onOpenChange,
  data
}) => {
  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={onOpenChange}
      className="mb-8"
    >
      <Card>
        <CollapsibleTrigger asChild>
          <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
            <h2 className="brand-card-title">Last Week's Summary</h2>
            <ChevronLeft className={`transform transition-transform ${isOpen ? 'rotate-90' : '-rotate-90'}`} />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <WeeklySummary data={data} />
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
export default LastWeekSummaryCard;

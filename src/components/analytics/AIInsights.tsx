
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { CircleHelp, Lightbulb, TrendingUp, TrendingDown } from 'lucide-react';

interface Insight {
  id: number;
  type: 'positive' | 'negative' | 'neutral';
  text: string;
  subject?: string;
  details?: string;
}

const mockInsights: Insight[] = [
  {
    id: 1,
    type: 'positive',
    text: 'Mathematics performance has improved by 12% in the last 3 months.',
    subject: 'Math',
    details: "Consistent improvement in quizzes and active learning in geometry and arithmetic have contributed to this positive trend. Keep up the good work by continuing daily practice and setting micro-goals for each week."
  },
  {
    id: 2,
    type: 'negative',
    text: 'Reading comprehension scores have been declining for the last 2 months.',
    subject: 'Language',
    details: "Consider including short storybooks in daily study. Practicing reading every day for at least 15 minutes can help increase engagement and restore performance."
  },
  {
    id: 3,
    type: 'neutral',
    text: "Science knowledge is steadily improving, but there's opportunity to deepen physics concepts.",
    subject: 'Science',
    details: "Focus on the physics topics in upcoming weeks to strengthen understanding. Explore interactive science videos or experiments for some fun!"
  },
  {
    id: 4,
    type: 'positive',
    text: 'Social studies projects are submitted on time.',
    subject: 'Social',
    details: "Maintaining project schedules builds discipline and improves grades. Try engaging more in class discussions for an even better learning experience."
  },
  {
    id: 5,
    type: 'neutral',
    text: "Consider scheduling more review sessions for quizzes next month.",
    details: "Regular review sessions help solidify learnings and boost recall in exams. Try scheduling topic-wise reviews each weekend."
  },
];

const getIcon = (type: Insight['type']) => {
  if (type === 'positive') return <TrendingUp className="h-4 w-4 text-green-600" />;
  if (type === 'negative') return <TrendingDown className="h-4 w-4 text-orange-600" />;
  return <CircleHelp className="h-4 w-4 text-blue-600" />;
};

const getBadgeClass = (type: Insight['type']) => {
  if (type === 'positive') return 'bg-green-100 text-green-700';
  if (type === 'negative') return 'bg-orange-100 text-orange-700';
  return 'bg-blue-100 text-blue-700';
};

const getCardClass = (type: Insight['type'], expanded: boolean) => {
  let base = 'p-4 border-l-4 transition-all relative cursor-pointer';
  if (type === 'positive') base += ' border-green-500 bg-green-50/50';
  else if (type === 'negative') base += ' border-orange-500 bg-orange-50/50';
  else base += ' border-blue-400 bg-blue-50/50';
  if (expanded) base += ' shadow-lg z-10';
  return base;
};

const AIInsights = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Show up to 3 by default, allow to expand to see more
  const [showMore, setShowMore] = useState(false);
  const toShow = showMore ? mockInsights : mockInsights.slice(0, 3);

  return (
    <Card className="p-6 overflow-hidden shadow-sm rounded-xl bg-white/80 backdrop-blur-sm border border-purple-100/40 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
          <Lightbulb className="h-5 w-5 text-purple-500" />
        </div>
        <div>
          <h3 className="font-bold text-lg">AI Insights</h3>
          <p className="text-xs text-gray-500">Personalized recommendations</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {toShow.map(insight => {
          const expanded = expandedId === insight.id;
          return (
            <Card 
              key={insight.id} 
              onClick={() => setExpandedId(expanded ? null : insight.id)}
              className={getCardClass(insight.type, expanded)}
              aria-expanded={expanded}
              tabIndex={0}
              role="button"
            >
              <div className="flex">
                <div className="mr-3 mt-1">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    insight.type === 'positive' ? 'bg-green-100' : 
                    insight.type === 'negative' ? 'bg-orange-100' : 
                    'bg-blue-100'
                  }`}>
                    {getIcon(insight.type)}
                  </div>
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${expanded ? "font-semibold" : ""}`}>
                    {insight.text}
                  </p>
                  {insight.subject && (
                    <span className={`text-xs px-2 py-1 rounded mt-2 inline-block ${getBadgeClass(insight.type)}`}>
                      {insight.subject}
                    </span>
                  )}
                  {expanded && insight.details && (
                    <div className="mt-2 bg-white/70 border-l-2 border-dashed border-gray-200 p-2 text-xs rounded">
                      {insight.details}
                    </div>
                  )}
                </div>
              </div>
              <span className="absolute top-2 right-4 text-xs text-purple-500">{expanded ? "Tap to collapse" : "Tap to expand"}</span>
            </Card>
          );
        })}
      </div>
      
      <div className="mt-4 text-center">
        {!showMore && (
          <button className="text-sm font-medium text-purple-500 hover:text-purple-700 transition-colors"
            onClick={() => setShowMore(true)}
          >
            View all insights →
          </button>
        )}
        {showMore && (
          <button className="text-sm font-medium text-purple-400 hover:text-purple-700 transition-colors"
            onClick={() => setShowMore(false)}
          >
            Show less ↑
          </button>
        )}
      </div>
    </Card>
  );
};

export default AIInsights;

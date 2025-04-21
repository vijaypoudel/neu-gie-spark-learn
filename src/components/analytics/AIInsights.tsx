
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
  {
    id: 6,
    type: 'positive',
    text: "Science quiz scores have shown consistent improvement.",
    subject: "Science",
    details: "Keep focusing on experiments and interactive content for best results."
  },
  {
    id: 7,
    type: 'negative',
    text: "Writing assignments have been submitted late recently.",
    subject: "Language",
    details: "Setting specific deadlines and checkpoints may help improve punctuality."
  }
];

const getIcon = (type: Insight['type']) => {
  if (type === 'positive') return <TrendingUp className="h-5 w-5 text-green-600" />;
  if (type === 'negative') return <TrendingDown className="h-5 w-5 text-orange-600" />;
  return <CircleHelp className="h-5 w-5 text-purple-600" />;
};

const getBadgeClass = (type: Insight['type']) => {
  if (type === 'positive') return 'bg-green-100 text-green-700';
  if (type === 'negative') return 'bg-orange-100 text-orange-700';
  return 'bg-purple-100 text-purple-700';
};

const getCardClass = (type: Insight['type'], expanded: boolean) => {
  let base = 'p-4 border-l-4 rounded-lg transition-shadow relative cursor-pointer select-none bg-white/60 backdrop-blur-sm hover:shadow-lg';
  if (type === 'positive') base += ' border-green-400';
  else if (type === 'negative') base += ' border-orange-400';
  else base += ' border-purple-400';
  if (expanded) base += ' shadow-xl z-20';
  return base;
};

const AIInsights = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Show 5 by default, toggled by user
  const [showMore, setShowMore] = useState(false);
  const toShow = showMore ? mockInsights : mockInsights.slice(0, 5);

  const toggleExpand = (id: number) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <Card className="p-6 rounded-xl overflow-hidden shadow-sm bg-white/80 backdrop-blur-md border border-purple-200/50">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
          <Lightbulb className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-purple-800">AI Insights</h3>
          <p className="text-xs text-purple-500">Personalized recommendations</p>
        </div>
      </div>

      <div className="space-y-4">
        {toShow.map(insight => {
          const expanded = expandedId === insight.id;
          return (
            <Card 
              key={insight.id} 
              onClick={() => toggleExpand(insight.id)}
              className={getCardClass(insight.type, expanded)}
              aria-expanded={expanded}
              tabIndex={0}
              role="button"
            >
              <div className="flex">
                <div className="mr-3 mt-1">
                  <div className={`h-9 w-9 rounded-full flex items-center justify-center ${
                    insight.type === 'positive' ? 'bg-green-100' : 
                    insight.type === 'negative' ? 'bg-orange-100' : 
                    'bg-purple-100'
                  }`}>
                    {getIcon(insight.type)}
                  </div>
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${expanded ? "font-semibold" : "font-medium"} text-gray-900`}>
                    {insight.text}
                  </p>
                  {insight.subject && (
                    <span className={`text-xs px-2 py-1 rounded mt-2 inline-block ${getBadgeClass(insight.type)}`}>
                      {insight.subject}
                    </span>
                  )}
                  {expanded && insight.details && (
                    <div className="mt-3 bg-white/70 border-l-2 border-dashed border-gray-300 p-3 text-xs rounded select-text whitespace-pre-wrap text-gray-800">
                      {insight.details}
                    </div>
                  )}
                </div>
              </div>
              {/* Replace "Tap to expand" text with subtle expand icon at top right */}
              <div className="absolute top-3 right-3 text-xs text-purple-500 select-none pointer-events-none" aria-hidden="true">
                {expanded ? (
                  <span className="font-bold">−</span>
                ) : (
                  <span className="font-bold">+</span>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-5 text-center">
        {!showMore ? (
          <button 
            className="text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors focus:outline-none"
            onClick={() => setShowMore(true)}
            aria-label="View all insights"
          >
            View all insights →
          </button>
        ) : (
          <button 
            className="text-sm font-semibold text-purple-400 hover:text-purple-700 transition-colors focus:outline-none"
            onClick={() => {
              setShowMore(false);
              setExpandedId(null);
            }}
            aria-label="Show less insights"
          >
            Show less ↑
          </button>
        )}
      </div>
    </Card>
  );
};

export default AIInsights;



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
  return <CircleHelp className="h-5 w-5 text-purple-500" />;
};

const getBadgeClass = (type: Insight['type']) => {
  if (type === 'positive') return 'bg-green-100 text-green-700';
  if (type === 'negative') return 'bg-orange-100 text-orange-700';
  return 'bg-purple-100 text-purple-700';
};

const getCardClass = (type: Insight['type'], expanded: boolean) => {
  let base = 'p-4 border-l-4 rounded-xl transition-shadow relative cursor-pointer select-none bg-white/95 hover:shadow-lg';
  if (type === 'positive') base += ' border-green-400';
  else if (type === 'negative') base += ' border-orange-400';
  else base += ' border-purple-400';
  if (expanded) base += ' shadow-xl z-10';
  return base;
};

const AIInsights = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showMore, setShowMore] = useState(false);

  // Show all if showMore, else show first 5
  const toShow = showMore ? mockInsights : mockInsights.slice(0, 5);

  const toggleExpand = (id: number) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <Card className="p-6 rounded-2xl overflow-visible shadow-md bg-white/95 border border-purple-100 neumorphic">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-neugie-blue/30 to-purple-100 flex items-center justify-center shadow">
          <Lightbulb className="h-7 w-7 text-orange-500" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-black tracking-tight">AI Insights</h3>
          <p className="text-xs" style={{ color: "#FB923C" }}>Personalized recommendations</p>
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
                <div className="flex-1 pr-7">
                  <p className={`text-sm ${expanded ? "font-semibold" : "font-medium"} text-gray-900 whitespace-pre-line`}>
                    {insight.text}
                  </p>
                  {insight.subject && (
                    <span className={`text-xs px-2 py-1 rounded mt-2 inline-block ${getBadgeClass(insight.type)}`}>
                      {insight.subject}
                    </span>
                  )}
                  {expanded && insight.details && (
                    <div className="mt-3 bg-white/80 border-l-2 border-dashed border-gray-200 p-3 text-xs rounded select-text whitespace-pre-wrap text-gray-800">
                      {insight.details}
                    </div>
                  )}
                </div>
                {/* Expand/collapse icon only, not text */}
                <button
                  className={`absolute top-3 right-3 rounded-full w-6 h-6 flex items-center justify-center bg-purple-50 hover:bg-purple-100 border border-purple-100 focus:outline-none transition`}
                  aria-label={expanded ? "Collapse insight" : "Expand insight"}
                  tabIndex={-1}
                  style={{ boxShadow: expanded ? "0px 2px 8px 0px #9b87f533" : undefined }}
                >
                  <span className="text-purple-500 text-xl font-bold pointer-events-none" aria-hidden="true">
                    {expanded ? "−" : "+"}
                  </span>
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-7 text-center overflow-visible">
        {!showMore ? (
          <button
            className="text-sm font-bold bg-gradient-to-r from-neugie-blue via-purple-400 to-purple-500 bg-clip-text text-transparent hover:from-purple-500 hover:to-neugie-blue transition-colors px-2"
            onClick={() => setShowMore(true)}
            aria-label="View all insights"
            style={{ lineHeight: "1.8" }}
          >
            View all insights →
          </button>
        ) : (
          <button
            className="text-sm font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-neugie-blue bg-clip-text text-transparent hover:from-neugie-blue hover:to-purple-400 transition-colors px-2"
            onClick={() => {
              setShowMore(false);
              setExpandedId(null);
            }}
            aria-label="Show less insights"
            style={{ lineHeight: "1.8" }}
          >
            Show less ↑
          </button>
        )}
      </div>
    </Card>
  );
};

export default AIInsights;

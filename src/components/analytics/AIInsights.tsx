
import React from 'react';
import { Card } from '@/components/ui/card';
import { CircleHelp, Lightbulb, TrendingUp, TrendingDown } from 'lucide-react';

interface Insight {
  id: number;
  type: 'positive' | 'negative' | 'neutral';
  text: string;
  subject?: string;
}

const mockInsights: Insight[] = [
  {
    id: 1,
    type: 'positive',
    text: 'Mathematics performance has improved by 12% in the last 3 months.',
    subject: 'Math'
  },
  {
    id: 2,
    type: 'negative',
    text: 'Reading comprehension scores have been declining for the last 2 months.',
    subject: 'Language'
  },
  {
    id: 3,
    type: 'neutral',
    text: "Science knowledge is steadily improving, but there's opportunity to deepen physics concepts.",
    subject: 'Science'
  },
];

const AIInsights = () => {
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
        {mockInsights.map(insight => (
          <Card 
            key={insight.id} 
            className={`p-4 border-l-4 ${
              insight.type === 'positive' ? 'border-green-500 bg-green-50/50' : 
              insight.type === 'negative' ? 'border-orange-500 bg-orange-50/50' : 
              'border-blue-400 bg-blue-50/50'
            }`}
          >
            <div className="flex">
              <div className="mr-3 mt-1">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  insight.type === 'positive' ? 'bg-green-100' : 
                  insight.type === 'negative' ? 'bg-orange-100' : 
                  'bg-blue-100'
                }`}>
                  {insight.type === 'positive' && <TrendingUp className="h-4 w-4 text-green-600" />}
                  {insight.type === 'negative' && <TrendingDown className="h-4 w-4 text-orange-600" />}
                  {insight.type === 'neutral' && <CircleHelp className="h-4 w-4 text-blue-600" />}
                </div>
              </div>
              <div>
                <p className="text-sm">{insight.text}</p>
                {insight.subject && (
                  <span className={`text-xs px-2 py-1 rounded mt-2 inline-block ${
                    insight.type === 'positive' ? 'bg-green-100 text-green-700' : 
                    insight.type === 'negative' ? 'bg-orange-100 text-orange-700' : 
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {insight.subject}
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button className="text-sm font-medium text-purple-500 hover:text-purple-700 transition-colors">
          View all insights →
        </button>
      </div>
    </Card>
  );
};

export default AIInsights;

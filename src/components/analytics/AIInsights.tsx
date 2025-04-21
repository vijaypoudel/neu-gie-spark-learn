
import React from 'react';
import { Card } from '@/components/ui/card';
import { CircleInfo, Lightbulb, TrendingUp, TrendingDown } from 'lucide-react';

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
    text: 'Mathematics performance has improved by 12% in the last 3 months, with particularly strong results in algebra.',
    subject: 'Math'
  },
  {
    id: 2,
    type: 'negative',
    text: 'Reading comprehension scores have been declining consistently for the last 2 months. Consider more guided reading practice.',
    subject: 'Language'
  },
  {
    id: 3,
    type: 'positive',
    text: 'Your child consistently completes weekly targets ahead of schedule, showing excellent time management skills.',
  },
  {
    id: 4,
    type: 'neutral',
    text: "Science knowledge is steadily improving, but there\'s opportunity to deepen understanding in physics concepts.",
    subject: 'Science'
  },
  {
    id: 5,
    type: 'negative',
    text: 'Weekly spelling quiz scores have dropped below average for the first time in 6 months.',
    subject: 'Language'
  },
  {
    id: 6,
    type: 'positive',
    text: 'Social studies engagement has increased dramatically, with quiz scores rising from 72% to 89% in just one month.',
    subject: 'Social'
  },
];

const AIInsights = () => {
  const positiveInsights = mockInsights.filter(insight => insight.type === 'positive');
  const negativeInsights = mockInsights.filter(insight => insight.type === 'negative');
  const neutralInsights = mockInsights.filter(insight => insight.type === 'neutral');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-orange-500" />
        <h2 className="text-xl font-bold">AI-Generated Insights</h2>
      </div>
      
      <div className="space-y-6">
        {/* Positive Insights */}
        <div>
          <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span>Strengths & Improvements</span>
          </h3>
          
          <div className="space-y-3">
            {positiveInsights.map(insight => (
              <Card key={insight.id} className="p-3 border-l-4 border-green-500">
                <div className="flex">
                  <div className="mr-3 mt-1">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm">{insight.text}</p>
                    {insight.subject && (
                      <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded mt-1 inline-block">
                        {insight.subject}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Negative Insights */}
        <div>
          <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-orange-500" />
            <span>Areas for Improvement</span>
          </h3>
          
          <div className="space-y-3">
            {negativeInsights.map(insight => (
              <Card key={insight.id} className="p-3 border-l-4 border-orange-500">
                <div className="flex">
                  <div className="mr-3 mt-1">
                    <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center">
                      <TrendingDown className="h-3 w-3 text-orange-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm">{insight.text}</p>
                    {insight.subject && (
                      <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded mt-1 inline-block">
                        {insight.subject}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Neutral Insights */}
        {neutralInsights.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <CircleInfo className="h-4 w-4 text-blue-500" />
              <span>Additional Observations</span>
            </h3>
            
            <div className="space-y-3">
              {neutralInsights.map(insight => (
                <Card key={insight.id} className="p-3 border-l-4 border-blue-400">
                  <div className="flex">
                    <div className="mr-3 mt-1">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <CircleInfo className="h-3 w-3 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm">{insight.text}</p>
                      {insight.subject && (
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded mt-1 inline-block">
                          {insight.subject}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsights;

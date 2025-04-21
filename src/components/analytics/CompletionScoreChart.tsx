
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartLine, Trophy, TrendingDown } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from 'recharts';

// Mock data for the past 12 months
const generateMockData = (months: number) => {
  const currentDate = new Date();
  const data = [];
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setMonth(currentDate.getMonth() - i);
    
    // Generate a random score between 60 and 100
    const score = Math.floor(Math.random() * 40) + 60;
    
    data.push({
      month: date.toLocaleString('default', { month: 'short' }),
      score
    });
  }
  
  return data;
};

const CompletionScoreChart = () => {
  const [timeRange, setTimeRange] = useState<3 | 6 | 12>(12);
  const data = generateMockData(timeRange);
  
  // Find best and worst months
  const bestMonth = [...data].sort((a, b) => b.score - a.score)[0];
  const worstMonth = [...data].sort((a, b) => a.score - b.score)[0];
  
  // Calculate average score
  const averageScore = Math.round(data.reduce((acc, item) => acc + item.score, 0) / data.length);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Completion Score</h2>
        <div className="flex gap-2">
          <Button 
            variant={timeRange === 3 ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange(3)}
          >
            3M
          </Button>
          <Button 
            variant={timeRange === 6 ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange(6)}
          >
            6M
          </Button>
          <Button 
            variant={timeRange === 12 ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange(12)}
          >
            12M
          </Button>
        </div>
      </div>
      
      <Card className="p-4">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <div className="text-3xl font-bold">{averageScore}%</div>
            <div className="text-sm text-muted-foreground">Avg. Completion</div>
          </div>
          <div className="flex items-center gap-2">
            <ChartLine className="h-5 w-5 text-orange-500" />
            <span className="font-medium">Weekly Target Completion</span>
          </div>
        </div>
        
        <div className="h-[300px] w-full">
          <ChartContainer
            config={{
              completion: {
                label: "Completion Score",
                color: "#f97316",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCompletion" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis 
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#888', fontSize: 12 }}
                />
                <YAxis 
                  domain={[0, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#888', fontSize: 12 }}
                />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent
                          className="bg-white shadow rounded-lg p-2 border border-gray-100"
                          payload={payload}
                        />
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine y={averageScore} stroke="#000" strokeDasharray="3 3" />
                <Area 
                  type="monotone"
                  dataKey="score"
                  stroke="#f97316"
                  fillOpacity={1}
                  fill="url(#colorCompletion)"
                  name="completion"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </Card>
      
      {/* Best and worst month cards */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Card className="p-3 border-l-4 border-orange-500">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="h-4 w-4 text-orange-500" />
            <h3 className="font-medium">Best Month</h3>
          </div>
          <div className="flex justify-between items-center">
            <div className="font-bold">{bestMonth?.month}</div>
            <div className="text-xl font-bold text-orange-500">{bestMonth?.score}%</div>
          </div>
        </Card>
        
        <Card className="p-3 border-l-4 border-black">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="h-4 w-4 text-black" />
            <h3 className="font-medium">Worst Month</h3>
          </div>
          <div className="flex justify-between items-center">
            <div className="font-bold">{worstMonth?.month}</div>
            <div className="text-xl font-bold text-black">{worstMonth?.score}%</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CompletionScoreChart;


import React, { useState } from 'react';
import { ChartLine } from 'lucide-react';
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
import ChartCard from './ChartCard';
import TimeRangeSelector from './TimeRangeSelector';

const generateMockData = (months: number) => {
  const currentDate = new Date();
  const data = [];
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setMonth(currentDate.getMonth() - i);
    
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
  
  const bestMonth = [...data].sort((a, b) => b.score - a.score)[0];
  const worstMonth = [...data].sort((a, b) => a.score - b.score)[0];
  
  const averageScore = Math.round(data.reduce((acc, item) => acc + item.score, 0) / data.length);
  
  const timeOptions = [
    { value: 3, label: '3M' },
    { value: 6, label: '6M' },
    { value: 12, label: '12M' }
  ];
  
  const stats = [
    { value: `${averageScore}%`, label: 'Average', bgColor: 'bg-orange-50/60' },
    { value: `${bestMonth?.score}%`, label: `Best: ${bestMonth?.month}`, bgColor: 'bg-green-50/60' },
    { value: `${worstMonth?.score}%`, label: `Worst: ${worstMonth?.month}`, bgColor: 'bg-red-50/60' }
  ];
  
  return (
    <div className="flex flex-col space-y-2">
      <ChartCard
        title="Completion Score"
        icon={ChartLine}
        stats={stats}
        legend="Weekly target completion"
        timeControls={
          <TimeRangeSelector
            options={timeOptions}
            currentValue={timeRange}
            onChange={(value) => setTimeRange(value as 3 | 6 | 12)}
          />
        }
      >
        <div className="h-56 w-full">
          <ChartContainer
            config={{
              completion: {
                label: "Completion Score",
                color: "#f97316",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 20, right: 15, left: 5, bottom: 5 }}>
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
                  tick={{ fill: '#888', fontSize: 11 }}
                />
                <YAxis 
                  domain={[0, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#888', fontSize: 11 }}
                  width={30}
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
                <ReferenceLine y={averageScore} stroke="#777" strokeDasharray="3 3" />
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
      </ChartCard>
    </div>
  );
};

export default CompletionScoreChart;

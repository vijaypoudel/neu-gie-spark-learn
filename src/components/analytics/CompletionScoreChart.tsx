
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
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
  
  return (
    <div className="flex flex-col space-y-2">
      <Card className="p-6 overflow-hidden shadow-sm rounded-xl bg-white/80 backdrop-blur-sm border border-orange-100/40 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <ChartLine className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-black">Completion Score</h3>
              <p className="text-xs text-gray-500">Weekly target completion</p>
            </div>
          </div>
          <div className="flex gap-2 ml-3">
            <button 
              className={
                (timeRange === 3
                  ? "bg-orange-400 text-white border-orange-400"
                  : "bg-white text-orange-500 border-orange-400") +
                " rounded-full px-4 py-1.5 font-semibold text-xs border-2 transition-all shadow-sm"
              }
              style={{ minWidth: 40, letterSpacing: "0.02em" }}
              onClick={() => setTimeRange(3)}
            >
              3M
            </button>
            <button 
              className={
                (timeRange === 6
                  ? "bg-orange-400 text-white border-orange-400"
                  : "bg-white text-orange-500 border-orange-400") +
                " rounded-full px-4 py-1.5 font-semibold text-xs border-2 transition-all shadow-sm"
              }
              style={{ minWidth: 40, letterSpacing: "0.02em" }}
              onClick={() => setTimeRange(6)}
            >
              6M
            </button>
            <button 
              className={
                (timeRange === 12
                  ? "bg-orange-400 text-white border-orange-400"
                  : "bg-white text-orange-500 border-orange-400") +
                " rounded-full px-4 py-1.5 font-semibold text-xs border-2 transition-all shadow-sm"
              }
              style={{ minWidth: 40, letterSpacing: "0.02em" }}
              onClick={() => setTimeRange(12)}
            >
              12M
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-orange-50/60 p-3 rounded-lg">
            <div className="text-xl font-bold text-orange-600">{averageScore}%</div>
            <div className="text-xs text-gray-500">Average</div>
          </div>
          <div className="bg-green-50/60 p-3 rounded-lg">
            <div className="text-xl font-bold text-green-600">{bestMonth?.score}%</div>
            <div className="text-xs text-gray-500">Best: {bestMonth?.month}</div>
          </div>
          <div className="bg-red-50/60 p-3 rounded-lg">
            <div className="text-xl font-bold text-red-600">{worstMonth?.score}%</div>
            <div className="text-xs text-gray-500">Worst: {worstMonth?.month}</div>
          </div>
        </div>
        
        <div>
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
          {/* Moved the text inside the card just below the graph */}
          <div className="text-[13px] text-gray-500 text-center mt-2">Weekly target completion</div>
        </div>
      </Card>
    </div>
  );
};

export default CompletionScoreChart;


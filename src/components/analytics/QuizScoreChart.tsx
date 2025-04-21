
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartBar } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

type Subject = 'Math' | 'Science' | 'Language' | 'Social';
type TimeRange = 1 | 2 | 3;

// 3 months is the max allowed always
const ALLOWED_TIME_RANGES: TimeRange[] = [1, 2, 3];

// Mock data generator for quiz scores
const generateQuizData = (timeRange: TimeRange, selectedSubject: Subject) => {
  const weeks = timeRange * 4;
  const data = [];
  for (let i = 0; i < weeks; i++) {
    const weekLabel = `W${i + 1}`;
    data.push({
      week: weekLabel,
      score: Math.floor(Math.random() * 40) + 60,
    });
  }
  return data;
};

const subjectColors = {
  Math: "#f97316", // Orange
  Science: "#22c55e", // Green
  Language: "#3b82f6", // Blue
  Social: "#a855f7", // Purple
};

const subjects: Subject[] = ['Math', 'Science', 'Language', 'Social'];

const QuizScoreChart = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>(3);
  const [subject, setSubject] = useState<Subject>('Math');
  const data = generateQuizData(timeRange, subject);

  // Average for selected subject
  const avg = Math.round(
    data.reduce((sum, item) => sum + (item.score || 0), 0) / data.length
  );

  return (
    <Card className="p-6 overflow-hidden shadow-sm rounded-xl bg-white/80 backdrop-blur-sm border border-blue-100/40 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <ChartBar className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Quiz Scores</h3>
            <p className="text-xs text-gray-500">Performance by subject</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Select
            value={subject}
            onValueChange={(value) => setSubject(value as Subject)}
          >
            <SelectTrigger className="w-[120px] h-9 text-sm bg-white shadow-sm">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-1">
            {ALLOWED_TIME_RANGES.map(range => (
              <Button 
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
                className="h-8 px-3"
              >
                {range}M
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Single subject average */}
      <div className="grid grid-cols-1 gap-2 mb-3">
        <div className="p-2 rounded-lg text-center" 
             style={{backgroundColor: `${subjectColors[subject]}15`}}>
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <div className="w-3 h-3 rounded-full" style={{backgroundColor: subjectColors[subject]}}></div>
            <span className="text-xs font-medium">{subject}</span>
          </div>
          <div className="text-lg font-bold" style={{color: subjectColors[subject]}}>
            {avg}%
          </div>
        </div>
      </div>
      
      {/* Chart */}
      <div className="h-56 w-full">
        <ChartContainer
          config={{
            score: { label: subject, color: subjectColors[subject] },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 15, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="week"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#888', fontSize: 11 }}
              />
              <YAxis 
                domain={[50, 100]}
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
                        className="bg-white shadow-lg rounded-lg p-2.5 border border-gray-100"
                        payload={payload}
                      />
                    );
                  }
                  return null;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke={subjectColors[subject]}
                strokeWidth={2.5}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                name={subject}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      {/* Reduced the margin */}
      <div className="mt-2 text-center text-xs text-gray-500">
        Showing data for the past {timeRange} month{timeRange > 1 ? 's' : ''}
      </div>
    </Card>
  );
};

export default QuizScoreChart;


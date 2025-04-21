
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

interface QuizScore {
  week: string;
  score: number;
  subject: Subject;
}

// Mock data generator for quiz scores
const generateQuizData = (timeRange: TimeRange, selectedSubject: Subject | 'All') => {
  const maxRange = 3;
  const weeks = (timeRange > maxRange ? maxRange : timeRange) * 4;
  const data = [];
  const subjects: Subject[] = ['Math', 'Science', 'Language', 'Social'];
  
  for (let i = 0; i < weeks; i++) {
    const weekLabel = `W${i + 1}`;
    const entry: any = { week: weekLabel };
    subjects.forEach(subject => {
      if (selectedSubject === 'All' || selectedSubject === subject) {
        entry[subject] = Math.floor(Math.random() * 40) + 60;
      }
    });
    data.push(entry);
  }
  
  return data;
};

const subjectColors = {
  Math: "#f97316",
  Science: "#22c55e",
  Language: "#3b82f6",
  Social: "#a855f7",
};

const QuizScoreChart = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>(3);
  const [subject, setSubject] = useState<Subject | 'All'>('All');
  // Allow only up to last 3 months
  const cleanedTimeRange = (timeRange > 3 ? 3 : timeRange) as TimeRange;
  const data = generateQuizData(cleanedTimeRange, subject);

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-xl font-bold text-gray-800">Quiz Scores</h2>
        <div className="flex items-center gap-3 flex-wrap">
          <Select
            value={subject}
            onValueChange={(value) => setSubject(value as Subject | 'All')}
          >
            <SelectTrigger className="w-[150px] shadow-sm bg-white">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Subjects</SelectItem>
              <SelectItem value="Math">Math</SelectItem>
              <SelectItem value="Science">Science</SelectItem>
              <SelectItem value="Language">Language</SelectItem>
              <SelectItem value="Social">Social Studies</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-1">
            {ALLOWED_TIME_RANGES.map(range => (
              <Button 
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
              >
                {range}M
              </Button>
            ))}
          </div>
        </div>
      </div>
      <Card className="shadow-xl rounded-xl w-full max-w-3xl p-4 md:p-8 bg-white/80 transition-all">
        <div className="mb-6 flex items-center gap-3">
          <ChartBar className="h-6 w-6 text-orange-500" />
          <span className="font-semibold text-lg">Quiz Performance Timeline</span>
        </div>
        <div className="h-[280px] md:h-[360px] w-full">
          <ChartContainer
            config={{
              Math: {
                label: "Math",
                color: subjectColors.Math,
              },
              Science: {
                label: "Science",
                color: subjectColors.Science,
              },
              Language: {
                label: "Language",
                color: subjectColors.Language,
              },
              Social: {
                label: "Social",
                color: subjectColors.Social,
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 28, right: 20, left: -6, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 6" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="week"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#999', fontSize: 13 }}
                />
                <YAxis 
                  domain={[50, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#999', fontSize: 13 }}
                  width={32}
                />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent
                          className="bg-white shadow rounded-lg p-3 border border-gray-100"
                          payload={payload}
                        />
                      );
                    }
                    return null;
                  }}
                />
                {(subject === 'All' || subject === 'Math') && 
                  <Line 
                    type="monotone" 
                    dataKey="Math" 
                    stroke={subjectColors.Math}
                    strokeWidth={3}
                    dot={{ r: 3.5 }}
                    name="Math"
                  />
                }
                {(subject === 'All' || subject === 'Science') && 
                  <Line 
                    type="monotone" 
                    dataKey="Science" 
                    stroke={subjectColors.Science}
                    strokeWidth={3}
                    dot={{ r: 3.5 }}
                    name="Science"
                  />
                }
                {(subject === 'All' || subject === 'Language') && 
                  <Line 
                    type="monotone" 
                    dataKey="Language" 
                    stroke={subjectColors.Language}
                    strokeWidth={3}
                    dot={{ r: 3.5 }}
                    name="Language"
                  />
                }
                {(subject === 'All' || subject === 'Social') && 
                  <Line 
                    type="monotone" 
                    dataKey="Social" 
                    stroke={subjectColors.Social}
                    strokeWidth={3}
                    dot={{ r: 3.5 }}
                    name="Social"
                  />
                }
                <Legend wrapperStyle={{ paddingTop: 20 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="mt-6 text-base text-muted-foreground text-center">
          Showing quiz scores for the past {cleanedTimeRange} month{cleanedTimeRange > 1 ? "s" : ""}
        </div>
      </Card>
      {/* Subject performance summary */}
      {subject === 'All' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 w-full max-w-3xl mx-auto">
          {['Math', 'Science', 'Language', 'Social'].map((subj) => {
            const avgScore = Math.round(
              data.reduce((acc, item) => acc + (item[subj] || 0), 0) / data.length
            );
            return (
              <Card key={subj} className="p-4 text-center shadow-sm hover:shadow-lg transition-all border bg-white/95">
                <div 
                  className="w-5 h-5 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: subjectColors[subj as Subject] }}
                />
                <div className="text-[15px] font-semibold">{subj}</div>
                <div className="text-2xl md:text-3xl font-extrabold">{avgScore}%</div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuizScoreChart;

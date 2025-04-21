
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

interface QuizScore {
  week: string;
  score: number;
  subject: Subject;
}

// Mock data generator for quiz scores
const generateQuizData = (timeRange: TimeRange, selectedSubject: Subject | 'All') => {
  const weeks = timeRange * 4; // 4 weeks per month
  const data = [];
  const subjects: Subject[] = ['Math', 'Science', 'Language', 'Social'];
  
  for (let i = 0; i < weeks; i++) {
    const weekLabel = `W${i + 1}`;
    
    const entry: any = { week: weekLabel };
    
    // For each subject, generate a score if needed
    subjects.forEach(subject => {
      // Only add data for the selected subject or all subjects
      if (selectedSubject === 'All' || selectedSubject === subject) {
        entry[subject] = Math.floor(Math.random() * 40) + 60; // Random score between 60-100
      }
    });
    
    data.push(entry);
  }
  
  return data;
};

const subjectColors = {
  Math: "#f97316", // Orange
  Science: "#22c55e", // Green
  Language: "#3b82f6", // Blue
  Social: "#a855f7", // Purple
};

const QuizScoreChart = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>(3);
  const [subject, setSubject] = useState<Subject | 'All'>('All');
  const data = generateQuizData(timeRange, subject);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-xl font-bold">Quiz Scores</h2>
        
        <div className="flex items-center gap-3">
          <Select
            value={subject}
            onValueChange={(value) => setSubject(value as Subject | 'All')}
          >
            <SelectTrigger className="w-[150px]">
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
            <Button 
              variant={timeRange === 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(1)}
            >
              1M
            </Button>
            <Button 
              variant={timeRange === 2 ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(2)}
            >
              2M
            </Button>
            <Button 
              variant={timeRange === 3 ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(3)}
            >
              3M
            </Button>
          </div>
        </div>
      </div>
      
      <Card className="p-6 md:p-8 shadow-xl">
        <div className="mb-6 flex items-center gap-3">
          <ChartBar className="h-6 w-6 text-orange-500" />
          <span className="font-semibold text-lg">Quiz Performance Timeline</span>
        </div>
        
        <div className="h-[380px] md:h-[420px] w-full">
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
              <LineChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 10 }}>
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
                    isAnimationActive={true}
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
                    isAnimationActive={true}
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
                    isAnimationActive={true}
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
                    isAnimationActive={true}
                  />
                }
                <Legend wrapperStyle={{ paddingTop: 20 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="mt-6 text-base text-muted-foreground text-center">
          Showing quiz scores for the past {timeRange} month{timeRange > 1 ? "s" : ""}
        </div>
      </Card>
      
      {/* Subject performance summary */}
      {subject === 'All' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {['Math', 'Science', 'Language', 'Social'].map((subj) => {
            const avgScore = Math.round(
              data.reduce((acc, item) => acc + (item[subj] || 0), 0) / data.length
            );
            
            return (
              <Card key={subj} className="p-4 text-center shadow-sm hover:shadow-lg focus:ring-2 focus:ring-orange-300 transition-all">
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


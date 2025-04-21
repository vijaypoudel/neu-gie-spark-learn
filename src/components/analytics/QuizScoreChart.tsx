
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
type TimeRange = 2 | 4 | 6 | 12;

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
  const [timeRange, setTimeRange] = useState<TimeRange>(6);
  const [subject, setSubject] = useState<Subject | 'All'>('All');
  const data = generateQuizData(timeRange, subject);
  
  return (
    <div className="space-y-4">
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
              variant={timeRange === 2 ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(2)}
            >
              2M
            </Button>
            <Button 
              variant={timeRange === 4 ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(4)}
            >
              4M
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
      </div>
      
      <Card className="p-4">
        <div className="mb-4 flex items-center gap-2">
          <ChartBar className="h-5 w-5 text-orange-500" />
          <span className="font-medium">Quiz Performance Timeline</span>
        </div>
        
        <div className="h-[300px] w-full">
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
              <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis 
                  dataKey="week"
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
                {(subject === 'All' || subject === 'Math') && 
                  <Line 
                    type="monotone" 
                    dataKey="Math" 
                    stroke={subjectColors.Math} 
                    strokeWidth={2} 
                    dot={{ r: 3 }}
                    name="Math"
                  />
                }
                {(subject === 'All' || subject === 'Science') && 
                  <Line 
                    type="monotone" 
                    dataKey="Science" 
                    stroke={subjectColors.Science} 
                    strokeWidth={2} 
                    dot={{ r: 3 }}
                    name="Science"
                  />
                }
                {(subject === 'All' || subject === 'Language') && 
                  <Line 
                    type="monotone" 
                    dataKey="Language" 
                    stroke={subjectColors.Language} 
                    strokeWidth={2} 
                    dot={{ r: 3 }}
                    name="Language"
                  />
                }
                {(subject === 'All' || subject === 'Social') && 
                  <Line 
                    type="monotone" 
                    dataKey="Social" 
                    stroke={subjectColors.Social} 
                    strokeWidth={2} 
                    dot={{ r: 3 }}
                    name="Social"
                  />
                }
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground text-center">
          Showing quiz scores for the past {timeRange} months
        </div>
      </Card>
      
      {/* Subject performance summary */}
      {subject === 'All' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
          {['Math', 'Science', 'Language', 'Social'].map((subj) => {
            const avgScore = Math.round(
              data.reduce((acc, item) => acc + (item[subj] || 0), 0) / data.length
            );
            
            return (
              <Card key={subj} className="p-3 text-center">
                <div 
                  className="w-4 h-4 rounded-full mx-auto mb-1"
                  style={{ backgroundColor: subjectColors[subj as Subject] }}
                />
                <div className="text-sm">{subj}</div>
                <div className="text-xl font-bold">{avgScore}%</div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuizScoreChart;

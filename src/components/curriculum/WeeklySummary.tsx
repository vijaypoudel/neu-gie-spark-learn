
import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface WeeklySummaryData {
  subjects: string[];
  goalsAchieved: number;
  totalGoals: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
}

interface WeeklySummaryProps {
  data: WeeklySummaryData;
}

const WeeklySummary: React.FC<WeeklySummaryProps> = ({ data }) => {
  const progressPercentage = (data.goalsAchieved / data.totalGoals) * 100;
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">Subjects Covered</h3>
        <div className="flex flex-wrap gap-2">
          {data.subjects.map((subject, index) => (
            <span 
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">Goals Achievement</h3>
        <div className="flex items-center gap-4">
          <Progress value={progressPercentage} className="flex-1" />
          <span className="text-sm font-medium">
            {data.goalsAchieved}/{data.totalGoals}
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">Weekly Summary</h3>
        <p className="text-gray-600">{data.summary}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="font-medium text-gray-700 flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Strengths
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {data.strengths.map((strength, index) => (
              <li key={index} className="text-gray-600">{strength}</li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium text-gray-700 flex items-center gap-1">
            <XCircle className="h-4 w-4 text-red-500" />
            Areas for Improvement
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {data.weaknesses.map((weakness, index) => (
              <li key={index} className="text-gray-600">{weakness}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WeeklySummary;

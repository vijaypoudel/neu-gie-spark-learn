
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Award, Settings } from "lucide-react";

interface ChildActivity {
  id: string;
  type: 'quiz' | 'lesson' | 'question';
  title: string;
  timestamp: Date;
  duration?: number; // in minutes
  score?: number; // for quizzes
}

interface ParentDashboardProps {
  childName: string;
  recentActivities: ChildActivity[];
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({
  childName,
  recentActivities
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {childName}'s Learning Journey
        </h1>
        <Button size="icon" variant="outline" className="rounded-full">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="p-3 text-center">
          <BookOpen className="h-6 w-6 mx-auto text-neugie-blue mb-1" />
          <p className="text-xs text-gray-500">Lessons</p>
          <p className="font-bold text-lg">12</p>
        </Card>
        
        <Card className="p-3 text-center">
          <Clock className="h-6 w-6 mx-auto text-neugie-green mb-1" />
          <p className="text-xs text-gray-500">Hours</p>
          <p className="font-bold text-lg">4.5</p>
        </Card>
        
        <Card className="p-3 text-center">
          <Award className="h-6 w-6 mx-auto text-neugie-yellow mb-1" />
          <p className="text-xs text-gray-500">Badges</p>
          <p className="font-bold text-lg">8</p>
        </Card>
      </div>
      
      {/* Recent activity */}
      <h2 className="text-xl font-bold mb-3">Recent Activity</h2>
      <Card className="divide-y">
        {recentActivities.map(activity => (
          <div key={activity.id} className="p-3 flex justify-between items-start">
            <div>
              <p className="font-medium">{activity.title}</p>
              <p className="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>
            </div>
            
            <div className="text-right">
              {activity.type === 'quiz' && activity.score !== undefined && (
                <span className={`inline-block rounded-full px-2 py-1 text-xs ${
                  activity.score > 80 ? 'bg-green-100 text-green-800' : 
                  activity.score > 60 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {activity.score}%
                </span>
              )}
              
              {activity.duration && (
                <p className="text-xs text-gray-500">{activity.duration} min</p>
              )}
            </div>
          </div>
        ))}
      </Card>
      
      <div className="mt-6 flex justify-center">
        <Button className="bg-neugie-blue">View Full Report</Button>
      </div>
    </div>
  );
};

export default ParentDashboard;

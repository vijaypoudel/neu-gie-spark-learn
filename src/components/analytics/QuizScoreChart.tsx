import React from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data for the chart
const data = [
  { month: 'Jan', Math: 85, Science: 75, Language: 65, Social: 80 },
  { month: 'Feb', Math: 70, Science: 80, Language: 60, Social: 85 },
  { month: 'Mar', Math: 80, Science: 85, Language: 55, Social: 90 },
  { month: 'Apr', Math: 90, Science: 90, Language: 70, Social: 85 },
  { month: 'May', Math: 95, Science: 85, Language: 75, Social: 80 },
  { month: 'Jun', Math: 85, Science: 80, Language: 80, Social: 75 },
];

// Colors for the bars
const colors = {
  Math: '#8884d8',
  Science: '#82ca9d',
  Language: '#ffc658',
  Social: '#ff8042',
};

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-md border border-gray-100">
        <p className="font-semibold text-gray-800">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}%`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const QuizScoreChart = () => {
  return (
    <div className="bg-white/80 rounded-2xl p-6 shadow-md border border-purple-100">
      {/* Chart Title */}
      <h3 className="text-lg font-bold text-purple-800 mb-2">Quiz Scores</h3>
      {/* Chart */}
      <div className="mb-1">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fill: '#666' }} />
            <YAxis tick={{ fill: '#666' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: 10 }} />
            {Object.keys(colors).map((subject) => (
              <Bar
                key={subject}
                dataKey={subject}
                fill={colors[subject as keyof typeof colors]}
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default QuizScoreChart;

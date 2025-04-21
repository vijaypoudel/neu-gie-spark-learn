
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import {
  subjectColors,
  averageScoresByWeek,
  formatWeekLabel,
  weekData
} from "./quizScoreUtils";

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-lg shadow-md border border-orange-200 flex flex-col">
        <span className="text-xs font-bold text-orange-600 mb-1">{label}</span>
        {payload.map((entry: any, idx: number) => (
          <span
            key={idx}
            className="text-sm font-semibold text-orange-600"
          >
            {entry.name}: {entry.value}%
          </span>
        ))}
      </div>
    );
  }
  return null;
}

interface Props {
  subject: string;
  weeksToShow: string[];
  averageScore: number;
}

const QuizScoreBarChart = ({ subject, weeksToShow, averageScore }: Props) => {
  const avgData = React.useMemo(
    () =>
      averageScoresByWeek(weekData, subject, weeksToShow).map((row) => ({
        week: formatWeekLabel(row.week),
        [subject]: row.avg,
      })),
    [subject, weeksToShow]
  );

  return (
    <div className="h-56 w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={avgData}
          margin={{
            top: 20,
            right: 15,
            left: 5,
            bottom: 20,
          }}
          barGap={7}
        >
          <defs>
            <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fill: '#888', fontWeight: 500, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#888', fontWeight: 500, fontSize: 11 }}
            width={30}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={averageScore} stroke="#777" strokeDasharray="3 3" />
          <Bar
            dataKey={subject}
            fill="url(#colorBar)"
            radius={[8, 8, 0, 0]}
            barSize={28}
            name={subject}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QuizScoreBarChart;

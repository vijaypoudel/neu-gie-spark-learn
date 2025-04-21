
import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Mock data: weekly quiz scores per subject (one per week)
const weekData = [
  { week: "2024-03-18", Math: 78, Science: 66, Language: 80, Social: 70 },
  { week: "2024-03-25", Math: 82, Science: 74, Language: 89, Social: 75 },
  { week: "2024-04-01", Math: 73, Science: 68, Language: 77, Social: 86 },
  { week: "2024-04-08", Math: 91, Science: 81, Language: 79, Social: 88 },
  { week: "2024-04-15", Math: 87, Science: 73, Language: 72, Social: 81 },
  { week: "2024-04-22", Math: 95, Science: 78, Language: 85, Social: 89 },
  { week: "2024-04-29", Math: 84, Science: 72, Language: 91, Social: 80 },
  { week: "2024-05-06", Math: 86, Science: 83, Language: 73, Social: 82 },
  { week: "2024-05-13", Math: 89, Science: 77, Language: 84, Social: 88 },
  { week: "2024-05-20", Math: 78, Science: 88, Language: 78, Social: 85 },
  { week: "2024-05-27", Math: 94, Science: 80, Language: 86, Social: 92 },
  { week: "2024-06-03", Math: 90, Science: 85, Language: 80, Social: 87 },
];

// Extract unique subjects
const subjectList = Object.keys(weekData[0]).filter((key) => key !== "week");

const subjectColors: Record<string, string> = {
  Math: "#8884d8",
  Science: "#82ca9d",
  Language: "#ffc658",
  Social: "#ff8042",
};

const timelineOptions = [
  { value: "1", label: "1 Month" },
  { value: "2", label: "2 Months" },
  { value: "3", label: "3 Months" },
];

const getWeeksForTimeline = (timeline: number): string[] => {
  // Returns array of week keys to use (latest N weeks)
  return weekData.slice(-timeline * 4).map(row => row.week); // 4 weeks per month
};

const averageScoresByWeek = (
  data: typeof weekData,
  subject: string,
  weeks: string[],
) => {
  // Returns: [{ week: "2024-05-06", avg: 88 }]
  return weeks.map((wk) => {
    // Find all rows for this week (should be exactly one in mock)
    const row = data.find(r => r.week === wk);
    return {
      week: wk,
      avg: row ? row[subject] : null,
    };
  });
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-lg shadow-lg border border-purple-100 flex flex-col">
        <span className="text-xs font-bold text-purple-900 mb-1">{label}</span>
        {payload.map((entry: any, idx: number) => (
          <span key={idx} className="text-sm" style={{ color: entry.fill }}>
            {entry.name}: {entry.value}%
          </span>
        ))}
      </div>
    );
  }
  return null;
};

function formatWeekLabel(week: string) {
  // Ex: "2024-05-13" => "May 13"
  const date = new Date(week);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

const QuizScoreChart = () => {
  const [subject, setSubject] = useState(subjectList[0]);
  const [timeline, setTimeline] = useState("3");

  const weeksToShow = useMemo(() => {
    return getWeeksForTimeline(Number(timeline));
  }, [timeline]);

  const avgData = useMemo(() => {
    return averageScoresByWeek(weekData, subject, weeksToShow).map((row) => ({
      week: formatWeekLabel(row.week),
      [subject]: row.avg,
    }));
  }, [subject, weeksToShow]);

  return (
    <div className="bg-white/90 rounded-2xl p-6 shadow-md border border-purple-100">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
        <span className="text-lg font-bold text-purple-800 flex-1">Quiz Scores</span>
        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger
            className={cn(
              "w-40 border-purple-300 shadow-sm bg-white/95 h-10 rounded-xl font-medium text-base transition focus:ring-2 focus:ring-purple-300",
            )}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="z-[1100] mt-2 rounded-xl">
            {subjectList.map((sub) => (
              <SelectItem key={sub} value={sub} className="rounded-md data-[state=checked]:bg-purple-50 data-[state=checked]:text-purple-800 font-semibold text-lg px-3 py-2">
                {sub}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={timeline} onValueChange={setTimeline}>
          <SelectTrigger
            className={cn(
              "w-32 border-purple-300 shadow-sm bg-white/95 h-10 rounded-xl font-medium text-base transition focus:ring-2 focus:ring-purple-300",
            )}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="z-[1100] mt-2 rounded-xl">
            {timelineOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="rounded-md font-semibold text-base">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Chart */}
      <div className="mb-2" style={{ minHeight: 260 }}>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={avgData}
            margin={{
              top: 10,
              right: 26,
              left: 12,
              bottom: 14,
            }}
            barGap={6}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ece6fd" />
            <XAxis dataKey="week" tick={{ fill: '#8884d8', fontWeight: 500 }} />
            <YAxis domain={[0, 100]} tick={{ fill: '#666', fontWeight: 500 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey={subject}
              fill={subjectColors[subject] || "#7e69ab"}
              radius={[8, 8, 0, 0]}
              barSize={26}
              name={subject}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-gray-500 mt-0.5 tracking-wide font-medium">
        Showing weekly average scores for the past {timeline} {timeline === "1" ? "month" : "months"}
      </p>
    </div>
  );
};

export default QuizScoreChart;

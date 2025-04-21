import React, { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

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

const subjectList = Object.keys(weekData[0]).filter((key) => key !== "week");

const subjectColors: Record<string, string> = {
  Math: "#9b87f5",
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
  return weekData.slice(-timeline * 4).map(row => row.week);
};

const averageScoresByWeek = (
  data: typeof weekData,
  subject: string,
  weeks: string[],
) => {
  return weeks.map((wk) => {
    const row = data.find(r => r.week === wk);
    return {
      week: wk,
      avg: row ? row[subject] : null,
    };
  });
};

const averageScoreForTimeline = (
  data: typeof weekData,
  subject: string,
  weeks: string[],
) => {
  const vals = weeks.map(wk => {
    const row = data.find(r => r.week === wk);
    return row && typeof row[subject] === "number" ? row[subject] : null;
  }).filter(v => v !== null) as number[];
  if (vals.length === 0) return 0;
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-lg shadow-lg border border-purple-100 flex flex-col">
        <span className="text-xs font-bold text-orange-600 mb-1">{label}</span>
        {payload.map((entry: any, idx: number) => (
          <span key={idx} className="text-sm text-black" style={{ color: entry.fill }}>
            {entry.name}: {entry.value}%
          </span>
        ))}
      </div>
    );
  }
  return null;
};

function formatWeekLabel(week: string) {
  const date = new Date(week);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

const QuizScoreChart = () => {
  const [subject, setSubject] = useState(subjectList[0]);
  const [timeline, setTimeline] = useState("3");

  const weeksToShow = useMemo(() => getWeeksForTimeline(Number(timeline)), [timeline]);
  const avgData = useMemo(
    () =>
      averageScoresByWeek(weekData, subject, weeksToShow).map((row) => ({
        week: formatWeekLabel(row.week),
        [subject]: row.avg,
      })),
    [subject, weeksToShow]
  );
  const averageScore = useMemo(() =>
    averageScoreForTimeline(weekData, subject, weeksToShow), [subject, weeksToShow]
  );

  return (
    <div className="bg-white/90 rounded-2xl p-6 shadow-premium border border-orange-100/60 hover:shadow-lg transition-all max-w-md mx-auto space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
          <Star className="h-5 w-5 text-orange-400" />
        </div>
        <div>
          <h3 className="font-extrabold text-lg text-black">Quiz Scores</h3>
          <p className="text-xs text-gray-500 -mt-1">Weekly subject quiz performance</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Select
          value={subject}
          onValueChange={setSubject}
          itemIndicator={false}
        >
          <SelectTrigger
            className={cn(
              "w-40 border-orange-200 shadow bg-white/100 h-10 rounded-xl font-medium text-base transition focus:ring-2 focus:ring-orange-200"
            )}
          >
            <SelectValue placeholder="Subject" />
          </SelectTrigger>
          <SelectContent className="z-[1110] mt-2 rounded-xl">
            {subjectList.map((sub) => (
              <SelectItem
                key={sub}
                value={sub}
                hideCheck={true}
                className="rounded-md font-semibold text-base px-3 py-2 data-[state=checked]:bg-orange-50 data-[state=checked]:text-orange-900"
              >
                {sub}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2 ml-auto mt-2 sm:mt-0">
          {timelineOptions.map((opt, idx) => (
            <button
              key={opt.value}
              onClick={() => setTimeline(opt.value)}
              className={cn(
                "rounded-full px-5 py-2 font-semibold transition-all text-sm border",
                "border-orange-400",
                timeline === opt.value
                  ? "bg-orange-400 text-white shadow"
                  : "bg-white text-orange-500 hover:bg-orange-50"
              )}
              style={{
                minWidth: 47,
                borderWidth: '2px',
                letterSpacing: '0.02em'
              }}
            >
              {["1M", "2M", "3M"][idx]}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-orange-50/75 rounded-xl flex items-center justify-center my-2 py-4">
        <div className="flex flex-row items-center gap-4">
          <div className="flex items-center">
            <span className="text-3xl font-bold text-orange-500 tabular-nums">{averageScore}%</span>
            <span className="ml-2 text-sm font-medium text-gray-600">Average</span>
          </div>
        </div>
      </div>
      <div
        className="h-56 w-full px-2 flex items-center justify-center"
        style={{ minHeight: 220 }}
      >
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={avgData}
            margin={{
              top: 10,
              right: 24,
              left: 3,
              bottom: 18,
            }}
            barGap={7}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#FAD9BC" vertical={false} />
            <XAxis
              dataKey="week"
              tick={{ fill: '#FB923C', fontWeight: 600, fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#bbb', fontWeight: 500, fontSize: 12 }}
              width={36}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey={subject}
              fill={subjectColors[subject] || "#9b87f5"}
              radius={[8, 8, 0, 0]}
              barSize={30}
              name={subject}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-gray-500 tracking-wide font-medium text-center pt-0">
        Showing weekly average score ({subject}) for the past {timeline} {timeline === "1" ? "month" : "months"}
      </p>
    </div>
  );
};

export default QuizScoreChart;

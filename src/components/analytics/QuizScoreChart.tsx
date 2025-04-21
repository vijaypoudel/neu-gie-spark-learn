
import React, { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
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
  Math: "#FB923C",
  Science: "#BDE2B9",
  Language: "#FFC26C",
  Social: "#FFA99F",
};

const timelineOptions = [
  { value: "1", label: "1M" },
  { value: "2", label: "2M" },
  { value: "3", label: "3M" },
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
      <div className="bg-white p-2 rounded-lg shadow-lg border border-orange-100 flex flex-col">
        <span className="text-xs font-bold text-orange-600 mb-1">{label}</span>
        {payload.map((entry: any, idx: number) => (
          <span key={idx} className="text-sm font-semibold" style={{ color: "#FB923C" }}>
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
    <div className="p-6 overflow-hidden shadow-sm rounded-xl bg-white/80 backdrop-blur-sm border border-orange-100/40 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <Star className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-black">Quiz Scores</h3>
            <p className="text-xs text-gray-500 -mt-1">Weekly subject quiz performance</p>
          </div>
        </div>
        <div className="flex gap-2 ml-3">
          {timelineOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setTimeline(opt.value)}
              className={cn(
                "rounded-full px-4 py-1.5 font-semibold text-sm border-2 transition-all shadow-sm",
                timeline === opt.value
                  ? "bg-orange-400 text-white border-orange-400"
                  : "bg-white text-orange-500 border-orange-400 hover:bg-orange-50"
              )}
              style={{
                minWidth: 44,
                letterSpacing: "0.02em",
                fontSize: "0.8rem"
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-orange-50/60 p-3 rounded-lg">
          <div className="text-xl font-bold text-orange-600">{averageScore}%</div>
          <div className="text-xs text-gray-500">Average</div>
        </div>
        <div className="flex-1 col-span-2">
          <Select
            value={subject}
            onValueChange={setSubject}
          >
            <SelectTrigger
              className="w-full border-orange-200 shadow bg-white h-10 rounded-xl font-medium text-base transition focus:ring-2 focus:ring-orange-200 px-3"
            >
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent className="z-[1110] mt-2 rounded-xl">
              {subjectList.map((sub) => (
                <SelectItem
                  key={sub}
                  value={sub}
                  className="rounded-md font-semibold text-base px-3 py-2 transition-all hover:bg-orange-50 data-[state=checked]:bg-orange-50 data-[state=checked]:text-orange-900"
                >
                  {sub}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="h-56 w-full">
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
                <stop offset="5%" stopColor="#FB923C" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#FB923C" stopOpacity={0.6}/>
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
    </div>
  );
};

export default QuizScoreChart;

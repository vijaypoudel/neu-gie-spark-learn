
import React from "react";
import { Monitor } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import ChartCard from "./ChartCard";

const DATA = Array.from({length: 14}).map((_, i) => ({
  day: new Date(Date.now() - (13 - i)*24*3600*1000).toLocaleDateString(undefined, {month:'short', day:'numeric'}),
  minutes: Math.round(60 + Math.random()*90),
}));

const MAX = Math.max(...DATA.map(x => x.minutes));
const TOTAL_HOURS = (DATA.reduce((sum, d) => sum + d.minutes, 0) / 60).toFixed(1);
const AVG_MINUTES = Math.round(DATA.reduce((sum, d) => sum + d.minutes, 0) / DATA.length);

const ScreenTimeChart = () => {
  const stats = [
    { value: `${TOTAL_HOURS}h`, label: "Total time", bgColor: "bg-indigo-50/60" },
    { value: `${AVG_MINUTES}m`, label: "Daily average", bgColor: "bg-indigo-50/60" },
    { value: `${MAX}m`, label: "Peak time", bgColor: "bg-indigo-50/60" }
  ];

  return (
    <ChartCard
      title="Screen Time"
      subtitle="Past 14 days"
      icon={Monitor}
      iconBgColor="bg-indigo-100"
      iconColor="text-indigo-500"
      stats={stats}
    >
      <div className="h-56 w-full">
        <ChartContainer
          config={{
            minutes: { label: "Minutes", color: "#6366f1" },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA} margin={{ top: 20, right: 15, left: 5, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 11, fill: "#888" }} 
                axisLine={false} 
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis 
                domain={[0, Math.max(120, MAX + 20)]} 
                tick={{ fontSize: 11, fill: "#888" }} 
                axisLine={false} 
                tickLine={false} 
                width={32} 
              />
              <Tooltip content={({ active, payload }) =>
                active && payload && <ChartTooltipContent payload={payload} />
              }/>
              <Bar dataKey="minutes" fill="#6366f1" radius={[4,4,0,0]} name="Minutes"/>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </ChartCard>
  );
};

export default ScreenTimeChart;

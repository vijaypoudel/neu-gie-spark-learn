
import React from "react";
import { Card } from "@/components/ui/card";
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

const DATA = Array.from({length: 14}).map((_, i) => ({
  day: new Date(Date.now() - (13 - i)*24*3600*1000).toLocaleDateString(undefined, {month:'short', day:'numeric'}),
  minutes: Math.round(60 + Math.random()*90),
}));

const MAX = Math.max(...DATA.map(x => x.minutes));

const ScreenTimeChart = () => (
  <Card className="p-6 md:p-8 shadow-lg rounded-xl w-full max-w-2xl mx-auto">
    <div className="flex items-center gap-3 mb-6">
      <Monitor className="h-6 w-6 text-[#6366f1]" />
      <span className="font-bold text-xl">Screen Time (Past 14 Days)</span>
    </div>
    <div className="h-64 w-full">
      <ChartContainer
        config={{
          minutes: { label: "Minutes", color: "#6366f1" },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DATA} margin={{ top: 26, right: 18, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#888" }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, Math.max(120, MAX + 20)]} tick={{ fontSize: 12, fill: "#888" }} axisLine={false} tickLine={false} width={32} />
            <Tooltip content={({ active, payload }) =>
              active && payload && <ChartTooltipContent payload={payload} />
            }/>
            <Bar dataKey="minutes" fill="#6366f1" radius={[8,8,0,0]} name="Minutes"/>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
    <div className="mt-4 text-center text-muted-foreground text-base">
      Total screen time: <span className="font-bold">
        {(DATA.reduce((sum, d) => sum + d.minutes, 0) / 60).toFixed(1)} hours
      </span>
    </div>
  </Card>
);

export default ScreenTimeChart;

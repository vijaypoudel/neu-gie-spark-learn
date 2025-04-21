
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
const TOTAL_HOURS = (DATA.reduce((sum, d) => sum + d.minutes, 0) / 60).toFixed(1);
const AVG_MINUTES = Math.round(DATA.reduce((sum, d) => sum + d.minutes, 0) / DATA.length);

const ScreenTimeChart = () => (
  <Card className="p-6 overflow-hidden shadow-sm rounded-xl bg-white/80 backdrop-blur-sm border border-indigo-100/40 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
        <Monitor className="h-5 w-5 text-indigo-500" />
      </div>
      <div>
        <h3 className="font-bold text-lg">Screen Time</h3>
        <p className="text-xs text-gray-500">Past 14 days</p>
      </div>
    </div>
    
    {/* Stats summary */}
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="bg-indigo-50/60 p-3 rounded-lg">
        <div className="text-xl font-bold text-indigo-600">{TOTAL_HOURS}h</div>
        <div className="text-xs text-gray-500">Total time</div>
      </div>
      <div className="bg-indigo-50/60 p-3 rounded-lg">
        <div className="text-xl font-bold text-indigo-600">{AVG_MINUTES}m</div>
        <div className="text-xs text-gray-500">Daily average</div>
      </div>
      <div className="bg-indigo-50/60 p-3 rounded-lg">
        <div className="text-xl font-bold text-indigo-600">{MAX}m</div>
        <div className="text-xs text-gray-500">Peak time</div>
      </div>
    </div>
    
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
  </Card>
);

export default ScreenTimeChart;

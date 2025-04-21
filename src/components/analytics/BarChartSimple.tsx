
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface BarChartSimpleProps {
  data: Array<{ label: string; value: number }>;
  average?: number;
  color?: string;
}

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
            {entry.value}%
          </span>
        ))}
      </div>
    );
  }
  return null;
}

const BarChartSimple: React.FC<BarChartSimpleProps> = ({
  data,
  average,
  color = "#f97316",
}) => {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
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
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0.10} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" vertical={false} />
          <XAxis
            dataKey="label"
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
          {average !== undefined && (
            <ReferenceLine y={average} stroke="#777" strokeDasharray="3 3" />
          )}
          <Bar
            dataKey="value"
            fill="url(#colorBar)"
            radius={[8, 8, 0, 0]}
            barSize={28}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartSimple;


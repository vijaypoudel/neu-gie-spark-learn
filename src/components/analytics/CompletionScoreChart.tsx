import React, { useState } from 'react';
import { ChartLine } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from 'recharts';
import ChartCard from './ChartCard';
import TimeRangeSelector from './TimeRangeSelector';
import BarChartSimple from "./BarChartSimple";

const generateMockData = (months: number) => {
  const currentDate = new Date();
  const data = [];

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setMonth(currentDate.getMonth() - i);

    const score = Math.floor(Math.random() * 40) + 60;

    data.push({
      label: date.toLocaleString('default', { month: 'short' }),
      value: score,
    });
  }

  return data;
};

const CompletionScoreChart = () => {
  const [timeRange, setTimeRange] = React.useState<3 | 6 | 12>(12);
  const data = generateMockData(timeRange);

  const bestMonth = [...data].sort((a, b) => b.value - a.value)[0];
  const worstMonth = [...data].sort((a, b) => a.value - b.value)[0];
  const averageScore = Math.round(
    data.reduce((acc, item) => acc + item.value, 0) / data.length
  );

  const timeOptions = [
    { value: 3, label: '3M' },
    { value: 6, label: '6M' },
    { value: 12, label: '12M' },
  ];

  const stats = [
    { value: `${averageScore}%`, label: 'Average', bgColor: 'bg-orange-50/60' },
    { value: `${bestMonth?.value}%`, label: `Best: ${bestMonth?.label}`, bgColor: 'bg-green-50/60' },
    { value: `${worstMonth?.value}%`, label: `Worst: ${worstMonth?.label}`, bgColor: 'bg-red-50/60' }
  ];

  return (
    <div className="flex flex-col space-y-2">
      <ChartCard
        title="Completion Score"
        icon={require("lucide-react").ChartBar}
        stats={stats}
        legend="Weekly target completion"
        timeControls={
          <div className="flex flex-wrap gap-2 md:gap-2">
            <TimeRangeSelector
              options={timeOptions}
              currentValue={timeRange}
              onChange={v => setTimeRange(Number(v) as 3 | 6 | 12)}
              className="!gap-2"
            />
          </div>
        }
      >
        <BarChartSimple 
          data={data}
          average={averageScore}
          color="#f97316"
        />
      </ChartCard>
    </div>
  );
};

export default CompletionScoreChart;

import React from 'react';
import { cn } from '@/lib/utils';

interface TimeOption {
  value: string | number;
  label: string;
}

interface TimeRangeSelectorProps {
  options: TimeOption[];
  currentValue: string | number;
  onChange: (value: string | number) => void;
  className?: string;
}

const TimeRangeSelector = ({ 
  options, 
  currentValue, 
  onChange, 
  className 
}: TimeRangeSelectorProps) => {
  return (
    <div className={cn("flex flex-nowrap gap-0.5 items-center", className)}>
      {options.map((option) => (
        <button 
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "rounded-full px-1.5 py-0 font-semibold text-xs border-2 transition-all shadow-sm whitespace-nowrap",
            currentValue === option.value
              ? "bg-orange-400 text-white border-orange-400"
              : "bg-white text-orange-500 border-orange-400"
          )}
          style={{ minWidth: 28, letterSpacing: "0.02em", fontSize: 11, lineHeight: "18px" }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default TimeRangeSelector;

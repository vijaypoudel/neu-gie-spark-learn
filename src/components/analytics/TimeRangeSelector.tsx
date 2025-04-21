
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
    <div className={cn("flex gap-2", className)}>
      {options.map((option) => (
        <button 
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "rounded-full px-4 py-1.5 font-semibold text-xs border-2 transition-all shadow-sm",
            currentValue === option.value
              ? "bg-orange-400 text-white border-orange-400"
              : "bg-white text-orange-500 border-orange-400"
          )}
          style={{ minWidth: 40, letterSpacing: "0.02em" }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default TimeRangeSelector;

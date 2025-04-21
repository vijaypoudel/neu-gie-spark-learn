import React, { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatItem {
  value: string;
  label: string;
  bgColor?: string;
}

interface ChartCardProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  stats?: StatItem[];
  timeControls?: ReactNode;
  children: ReactNode;
  legend?: string;
}

const ChartCard = ({ 
  title, 
  subtitle, 
  icon: Icon,
  iconBgColor = "bg-orange-100",
  iconColor = "text-orange-500",
  stats,
  timeControls,
  children,
  legend
}: ChartCardProps) => {
  return (
    <Card className="p-6 overflow-hidden shadow-sm rounded-xl bg-white/80 backdrop-blur-sm border border-orange-100/40 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${iconBgColor} flex items-center justify-center`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          <div>
            <h3 className="brand-card-title">{title}</h3>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          </div>
        </div>
        {timeControls && (
          <div className="flex gap-2 ml-3">
            {timeControls}
          </div>
        )}
      </div>
      
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.bgColor || 'bg-orange-50/60'} p-3 rounded-lg`}>
              <div className="brand-num">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
      
      <div>
        {children}
        
        {legend && (
          <div className="text-[13px] text-gray-500 text-center mt-2">
            {legend}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ChartCard;

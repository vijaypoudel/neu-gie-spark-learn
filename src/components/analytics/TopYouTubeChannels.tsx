import React from 'react';
import { Youtube } from 'lucide-react';
import ChartCard from './ChartCard';

const MOCK_CHANNELS = [
  { name: 'Kids Learning TV', minutes: 210 },
  { name: 'Science Max', minutes: 145 },
  { name: 'Art with Mati', minutes: 121 },
  { name: 'Nat Geo Kids', minutes: 91 },
  { name: 'Storyline Online', minutes: 78 },
];

// Sum total minutes for context
const total = MOCK_CHANNELS.reduce((sum, ch) => sum + ch.minutes, 0);

const TopYouTubeChannels = () => (
  <ChartCard
    title="Top YouTube Channels"
    subtitle="Past 14 days"
    icon={Youtube}
  >
    <ul className="space-y-3">
      {MOCK_CHANNELS.map((channel, idx) => (
        <li 
          key={channel.name} 
          className="flex items-center justify-between p-2 rounded-lg hover:bg-orange-50/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className={`w-7 h-7 flex items-center justify-center rounded-full font-bold text-white text-xs
              ${idx === 0 ? 'bg-orange-500' : 
                idx === 1 ? 'bg-orange-400' : 
                idx === 2 ? 'bg-orange-300' : 'bg-orange-200'}`}
            >
              {idx + 1}
            </span>
            <span className="font-medium text-sm">{channel.name}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="brand-num">
              {(channel.minutes / 60).toFixed(1)}h
            </span>
            <span className="text-xs text-gray-400">
              {Math.round((channel.minutes / total) * 100)}%
            </span>
          </div>
        </li>
      ))}
    </ul>
    <div className="mt-4 text-center text-sm pt-3 border-t border-gray-100">
      Total time: <span className="brand-num">{(total / 60).toFixed(1)} hours</span>
    </div>
  </ChartCard>
);

export default TopYouTubeChannels;

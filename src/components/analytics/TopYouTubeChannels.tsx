
import React from 'react';
import { Card } from '@/components/ui/card';
import { Youtube } from 'lucide-react';

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
  <Card className="p-6 md:p-8 shadow-lg rounded-xl w-full max-w-2xl mx-auto">
    <div className="flex items-center gap-3 mb-6">
      <Youtube className="h-6 w-6 text-[#F97316]" />
      <span className="font-bold text-xl">Top 5 Watched YouTube Channels (Past 14 Days)</span>
    </div>
    <ul className="divide-y">
      {MOCK_CHANNELS.map((channel, idx) => (
        <li key={channel.name} className="flex items-center justify-between py-4 first:pt-0">
          <div className="flex items-center gap-3">
            <span className={`w-6 h-6 flex items-center justify-center rounded-full font-bold text-white text-xs mr-3 ${idx === 0 ? 'bg-orange-500 scale-110 shadow' : (idx === 1 ? 'bg-orange-300' : 'bg-orange-100 text-orange-700')}`}>
              {idx + 1}
            </span>
            <span className="font-semibold">{channel.name}</span>
          </div>
          <span className="text-lg font-mono font-bold text-orange-500">
            {(channel.minutes / 60).toFixed(1)}h
            <span className="text-gray-400 text-sm font-medium ml-1">
              ({Math.round((channel.minutes / total) * 100)}%)
            </span>
          </span>
        </li>
      ))}
    </ul>
  </Card>
);

export default TopYouTubeChannels;

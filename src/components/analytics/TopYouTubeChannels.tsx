
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
  <Card className="p-6 overflow-hidden shadow-sm rounded-xl bg-white/80 backdrop-blur-sm border border-orange-100/40 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
        <Youtube className="h-5 w-5 text-orange-500" />
      </div>
      <div>
        <h3 className="font-bold text-lg">Top YouTube Channels</h3>
        <p className="text-xs text-gray-500">Past 14 days</p>
      </div>
    </div>
    
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
            <span className="text-sm font-mono font-bold text-orange-500">
              {(channel.minutes / 60).toFixed(1)}h
            </span>
            <span className="text-xs text-gray-400">
              {Math.round((channel.minutes / total) * 100)}%
            </span>
          </div>
        </li>
      ))}
    </ul>
    
    <div className="mt-4 text-center text-sm text-gray-500 pt-3 border-t border-gray-100">
      Total time: <span className="font-bold text-orange-500">{(total / 60).toFixed(1)} hours</span>
    </div>
  </Card>
);

export default TopYouTubeChannels;

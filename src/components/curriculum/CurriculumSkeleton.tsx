import React from 'react';

const CurriculumSkeleton: React.FC = () => {
  return (
    <div className="premium-card p-4 animate-pulse">
      <div className="space-y-4">
        <div className="h-6 bg-orange-100 rounded-lg w-3/4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-100 rounded w-full"></div>
          <div className="h-4 bg-gray-100 rounded w-5/6"></div>
          <div className="h-4 bg-gray-100 rounded w-4/5"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-100 rounded w-2/3"></div>
          <div className="h-4 bg-gray-100 rounded w-3/4"></div>
        </div>
        <div className="space-y-3 mt-6">
          <div className="h-5 bg-orange-100 rounded w-1/2"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-100 rounded w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-4/5"></div>
            <div className="h-4 bg-gray-100 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurriculumSkeleton;
import React from 'react';

export const Skeleton = (): JSX.Element => {
  return (
    <div className="animate-pulse">
      <div className="h-32 mt-3 mb-6 bg-gray-200 rounded "></div>
      <div className="h-32 mt-3 mb-6 bg-gray-200 rounded "></div>
      <div className="h-32 mt-3 mb-6 bg-gray-200 rounded "></div>
      <div className="h-32 mt-3 mb-6 bg-gray-200 rounded "></div>
      <div className="h-32 mt-3 mb-6 bg-gray-200 rounded "></div>
    </div>
  );
};

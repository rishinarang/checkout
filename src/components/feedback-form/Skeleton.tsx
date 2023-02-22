import React from 'react';

export const Skeleton = (): JSX.Element => {
  return (
    <div className="animate-pulse">
      <div className="mt-3 mb-6 h-96 rounded bg-gray-200"></div>
    </div>
  );
};

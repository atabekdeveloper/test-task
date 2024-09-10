import React from 'react';

export const Loading: React.FC = () => {
  return (
    <div className="relative w-full py-24">
      <div className="absolute w-12 h-12 border-4 border-t-4 border-blue-500 rounded-md animate-spin left-1/2"></div>
    </div>
  );
};

import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-600"></div>
        <p className="mt-4 text-lg text-blue-600">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;

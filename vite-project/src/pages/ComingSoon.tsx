import React from 'react';
import BackgroundPattern from '../components/BackgroundPattern';

const ComingSoon = () => {
  return (
    <div className="h-[calc(100vh)] bg-gray-900 text-white flex items-center justify-center relative">
      {/* Background Pattern */}
      <BackgroundPattern />
      
      <h1 className="text-5xl font-bold text-yellow-500 relative z-10">Coming Soon!</h1>
    </div>
  );
};

export default ComingSoon;

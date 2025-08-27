import React from 'react';

const BackgroundPattern = () => {
  return (


    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500"></div>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <pattern
          id="grid"
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 5 0 L 0 0 0 5"
            fill="none"
            stroke="currentColor"
            strokeWidth=".3"
          />
        </pattern>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>
    </div>


   
  );
};

export default BackgroundPattern;
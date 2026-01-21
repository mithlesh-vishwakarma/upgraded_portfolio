import BackgroundPattern from '../components/BackgroundPattern';

const ComingSoon = () => {
  return (
    <div className="h-100vh text-white flex items-center justify-center absolute inset-0">
      {/* Background Pattern */}

      <BackgroundPattern />
      
      <h1 className="text-5xl font-bold text-yellow-500 relative z-10 font-merienda">Coming Soon!</h1>
    </div>
  );
};

export default ComingSoon;

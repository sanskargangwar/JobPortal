const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
    <div className="flex flex-col items-center gap-4">
      {/* Dual Ring Loader */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border[#8a2be2]  border-t-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-white drop-shadow-[0_0_10px_#8a2be2] border-t-transparent animate-spin-slow"></div>
      </div>

      {/* Loading Text */}
      <p className="text-lg font-medium text-white tracking-wide animate-pulse">
        Loading, Please Wait...
      </p>
    </div>
  </div>
);

export default LoadingSpinner;

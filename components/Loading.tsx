export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block relative w-16 h-16 mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              className="animate-spin-slow w-16 h-16 text-burgundy/30" 
              viewBox="0 0 24 24" 
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="1"
                strokeDasharray="60"
                strokeDashoffset="0"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-burgundy text-2xl font-serif">
            ✝
          </div>
        </div>
        <p className="text-xs uppercase tracking-widest text-burgundy/60">Loading</p>
      </div>
    </div>
  );
}


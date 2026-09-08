import React from 'react';

export default function FeaturesSection() {
  return (
    <div className="relative h-fit bg-background py-24 overflow-hidden flex flex-col items-center">
      
      {/* 1. Section Header */}
      <div className="text-center max-w-3xl mb-24 relative z-20 px-6 mx-auto flex flex-col items-center">
        
        {/* Modern 'Pill' Badge with pulsing dot */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-10 border border-brand-20 text-brand text-sm font-bold mb-6 shadow-[0_0_15px_rgba(74,108,247,0.15)]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand"></span>
          </span>
          Visualize Your Growth
        </div>
        
        {/* High-Impact Typography */}
        <h2 className="text-4xl md:text-2xl font-black text-foreground mb-6 tracking-tighter leading-[1.1]">
          Stop Guessing. <br className="hidden md:block"/> Start Tracking Your <span className="bg-gradient-to-r from-brand via-[#7eb0ff] to-emerald-400 bg-clip-text text-transparent [text-shadow:_0_0_30px_rgba(16,185,129,0.3)]">Mastery.</span>
        </h2>
        
        <p className="text-lg md:text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Your personal command center. Track your daily consistency, analyze topic-wise breakdowns, and watch your coding skills evolve in real-time.
        </p>
      </div>

      {/* 2. Interactive Overlapping Cards Container */}
      <div className="relative w-full max-w-5xl h-fit my-20 flex justify-center items-center">
        
        {/* Ambient Background Glow for the whole section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand/10 rounded-full blur-[120px] pointer-events-none"></div>

        {/* --- CARD 1: Circular Progress (Left) --- */}
        <div className="
          absolute z-10 w-80 bg-muted border border-white/10 rounded-2xl p-6 
          shadow-[-20px_20px_40px_rgba(0,0,0,0.5)]
          transform -rotate-6 -translate-x-64 transition-all duration-500 ease-out
          hover:rotate-0 hover:z-40 hover:scale-105 hover:border-brand/50 hover:shadow-[0_0_30px_rgba(74,108,247,0.2)]
          cursor-default
        ">
          <h3 className="text-sm font-bold text-foreground mb-6 uppercase tracking-wider">DSA Progress</h3>
          
          <div className="flex items-center gap-6">
            {/* Faux Circular Progress using SVG */}
            <div className="relative w-28 h-28 shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="56" cy="56" r="48" stroke="#000000" strokeWidth="8" fill="none" />
                <circle cx="56" cy="56" r="48" stroke="#10b981" strokeWidth="8" fill="none" strokeDasharray="300" strokeDashoffset="240" className="opacity-80" />
                <circle cx="56" cy="56" r="48" stroke="#eab308" strokeWidth="8" fill="none" strokeDasharray="300" strokeDashoffset="180" className="opacity-80" transform="rotate(60 56 56)" />
                <circle cx="56" cy="56" r="48" stroke="#ef4444" strokeWidth="8" fill="none" strokeDasharray="300" strokeDashoffset="260" className="opacity-80" transform="rotate(180 56 56)" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-foreground">215</span>
                <span className="text-[10px] text-muted-foreground border-t border-border mt-1 pt-1">/ 1185</span>
              </div>
            </div>

            {/* Difficulty Breakdown */}
            <div className="flex flex-col gap-3 w-full">
              <div className="flex items-center text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 shadow-[0_0_8px_#10b981]"></span>
                <span className="text-muted-foreground flex-1">Easy</span>
                <span className="text-foreground font-semibold">64</span>
              </div>
              <div className="flex items-center text-xs">
                <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2 shadow-[0_0_8px_#eab308]"></span>
                <span className="text-muted-foreground flex-1">Med</span>
                <span className="text-foreground font-semibold">94</span>
              </div>
              <div className="flex items-center text-xs">
                <span className="w-2 h-2 rounded-full bg-red-500 mr-2 shadow-[0_0_8px_#ef4444]"></span>
                <span className="text-muted-foreground flex-1">Hard</span>
                <span className="text-foreground font-semibold">57</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- CARD 2: Topic Mastery (Center - Top) --- */}
        <div className="
          absolute z-30 w-96 bg-muted border border-white/10 rounded-2xl p-6 
          shadow-[0_20px_50px_rgba(0,0,0,0.5)]
          transform -translate-y-8 transition-all duration-500 ease-out
          hover:-translate-y-12 hover:z-50 hover:scale-105 hover:border-brand/50 hover:shadow-[0_0_40px_rgba(74,108,247,0.3)]
          cursor-default
        ">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Overall Progress</h3>
            <span className="text-xs bg-brand-20 text-brand px-2 py-1 rounded-md font-bold">47%</span>
          </div>

          <div className="flex flex-col gap-5">
            {/* Progress Item 1 */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-foreground font-medium">Solve Problems on Arrays</span>
                <span className="text-muted-foreground">30 / 40</span>
              </div>
              <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full shadow-[0_0_10px_#f97316]" style={{ width: '75%' }}></div>
              </div>
            </div>

            {/* Progress Item 2 */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-foreground font-medium">Binary Search [1D, 2D]</span>
                <span className="text-muted-foreground">16 / 32</span>
              </div>
              <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full shadow-[0_0_10px_#f97316]" style={{ width: '50%' }}></div>
              </div>
            </div>

            {/* Progress Item 3 */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-foreground font-medium">Learn LinkedList</span>
                <span className="text-muted-foreground">25 / 31</span>
              </div>
              <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full shadow-[0_0_10px_#f97316]" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* --- CARD 3: Activity Heatmap (Right) --- */}
        <div className="
          absolute z-20 w-[340px] bg-muted border border-white/10 rounded-2xl p-6 
          shadow-[20px_20px_40px_rgba(0,0,0,0.5)]
          transform rotate-6 translate-x-64 transition-all duration-500 ease-out
          hover:rotate-0 hover:z-40 hover:scale-105 hover:border-brand/50 hover:shadow-[0_0_30px_rgba(74,108,247,0.2)]
          cursor-default
        ">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Submissions</h3>
            <span className="text-xs text-muted-foreground">Last 3 months</span>
          </div>

          {/* Faux Heatmap Grid */}
          <div className="grid grid-cols-12 gap-1.5 opacity-90">
            {/* Generate random-looking heatmap blocks */}
            {Array.from({ length: 7 * 12 }).map((_, i) => {
              // Create a random pattern of empty, light green, and bright green blocks
              const isFilled = Math.random() > 0.6;
              const isHigh = Math.random() > 0.8;
              
              let bgColor = "bg-[#000000]"; // empty state
              if (isHigh) bgColor = "bg-emerald-500 shadow-[0_0_5px_#10b981]"; // heavy activity
              else if (isFilled) bgColor = "bg-emerald-800"; // light activity

              return (
                <div key={i} className={`w-3 h-3 rounded-[2px] ${bgColor}`}></div>
              );
            })}
          </div>

          <div className="flex justify-between items-center mt-5 text-[10px] text-muted-foreground border-t border-border pt-4">
            <span>Max Streak: <strong className="text-foreground">22 Days</strong></span>
            <div className="flex items-center gap-2">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-sm bg-[#222]"></div>
                <div className="w-2 h-2 rounded-sm bg-emerald-800"></div>
                <div className="w-2 h-2 rounded-sm bg-emerald-500"></div>
              </div>
              <span>More</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
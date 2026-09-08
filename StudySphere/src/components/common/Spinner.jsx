import React from 'react';

const Spinner = () => {
  return (
    <div className="relative flex items-center justify-center w-36 h-36">
      {/* Custom Styles for SVG Line Drawing */}
      <style>
        {`
          @keyframes drawLine {
            0% { stroke-dashoffset: 100; opacity: 0; }
            50% { opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 0.8; }
          }
          .constellation-line {
            stroke-dasharray: 100;
            animation: drawLine 3s ease-in-out infinite alternate;
          }
          .draw-s {
            stroke-dasharray: 150;
            stroke-dashoffset: 150;
            animation: drawLine 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
          }
        `}
      </style>

      {/* 1. Background Rotating Sphere Rings (Pseudo-3D) */}
      <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-[spin_6s_linear_infinite] shadow-[0_0_15px_rgba(59,130,246,0.15)]" />
      <div 
        className="absolute inset-1 rounded-full border-t border-r border-blue-400/40 animate-[spin_4s_linear_infinite_reverse]" 
        style={{ transform: 'rotateX(60deg) rotateY(20deg)' }} 
      />
      <div 
        className="absolute inset-2 rounded-full border-b border-l border-indigo-400/30 animate-[spin_5s_linear_infinite]" 
        style={{ transform: 'rotateX(40deg) rotateY(-30deg)' }} 
      />

      {/* 2. Floating Nodes & Connecting Lines (The Network) */}
      <svg className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100">
        {/* Constellation Lines */}
        <line x1="20" y1="30" x2="50" y2="15" stroke="#60a5fa" strokeWidth="0.5" className="constellation-line" style={{ animationDelay: '0s' }} />
        <line x1="50" y1="15" x2="80" y2="40" stroke="#60a5fa" strokeWidth="0.5" className="constellation-line" style={{ animationDelay: '0.5s' }} />
        <line x1="80" y1="40" x2="70" y2="80" stroke="#60a5fa" strokeWidth="0.5" className="constellation-line" style={{ animationDelay: '1s' }} />
        <line x1="70" y1="80" x2="30" y2="70" stroke="#60a5fa" strokeWidth="0.5" className="constellation-line" style={{ animationDelay: '1.5s' }} />
        <line x1="30" y1="70" x2="20" y2="30" stroke="#60a5fa" strokeWidth="0.5" className="constellation-line" style={{ animationDelay: '2s' }} />
        <line x1="20" y1="30" x2="80" y2="40" stroke="#60a5fa" strokeWidth="0.2" className="constellation-line" style={{ animationDelay: '0.8s' }} />

        {/* Floating Dots */}
        <circle cx="20" cy="30" r="2" fill="#93c5fd" className="animate-pulse" />
        <circle cx="50" cy="15" r="1.5" fill="#60a5fa" />
        <circle cx="80" cy="40" r="2.5" fill="#93c5fd" className="animate-pulse" style={{ animationDelay: '1s' }} />
        <circle cx="70" cy="80" r="1.5" fill="#3b82f6" />
        <circle cx="30" cy="70" r="2" fill="#60a5fa" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
      </svg>

      {/* 3. Central Glowing 'S' (StudySphere Focus) */}
      <div className="absolute z-10 flex items-center justify-center bg-slate-900/50 rounded-full p-4 backdrop-blur-sm shadow-[0_0_20px_rgba(59,130,246,0.3)]">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* The self-drawing S path */}
          <path 
            d="M17 8C17 6.34315 15.6569 5 14 5H10C8.34315 5 7 6.34315 7 8C7 9.65685 8.34315 11 10 11H14C15.6569 11 17 12.3431 17 14C17 15.6569 15.6569 17 14 17H10C8.34315 17 7 15.6569 7 14" 
            stroke="#3b82f6" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="draw-s"
            style={{ filter: 'drop-shadow(0px 0px 6px rgba(59, 130, 246, 0.9))' }}
          />
          {/* Constellation Nodes attached to the 'S' */}
          <circle cx="17" cy="8" r="2" fill="#fff" className="animate-ping" style={{ animationDuration: '2s' }} />
          <circle cx="7" cy="14" r="2" fill="#fff" className="animate-ping" style={{ animationDuration: '2.5s' }} />
        </svg>
      </div>
    </div>
  );
};

export default Spinner;
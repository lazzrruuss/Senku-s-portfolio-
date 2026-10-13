import React from 'react';

/**
 * FrostedAtmosphere
 * 
 * High-performance, zero-lag atmospheric backdrop for frosted glassmorphism.
 * 
 * PERFORMANCE OPTIMIZATION:
 * Rather than using expensive CSS `filter: blur(...)` across multiple 600px+
 * elements (which causes severe GPU/CPU lag when combined with backdrop-filter),
 * this uses native GPU radial gradients with natural feathering and pure CSS
 * compositor keyframe animations (`transform: translate3d(...)`).
 * 
 * This achieves 60-120 FPS buttery smooth scrolling while providing rich,
 * luminous light pools (emerald, cyan, violet, amber) that refract through
 * frosted cards and navigation bars.
 */
export const FrostedAtmosphere: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{ contain: 'strict' }}
    >
      {/* Primary Emerald Aurora Pool (Top-Right) */}
      <div
        className="absolute -top-32 -right-20 sm:right-0 w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] rounded-full opacity-40 dark:opacity-35 animate-aurora-1"
        style={{
          background:
            'radial-gradient(circle at center, rgba(34, 197, 94, 0.45) 0%, rgba(16, 185, 129, 0.22) 35%, rgba(6, 182, 212, 0.08) 60%, transparent 75%)',
          willChange: 'transform',
        }}
      />

      {/* Electric Oceanic Cyan Pool (Mid-Left) */}
      <div
        className="absolute top-1/4 -left-40 sm:-left-20 w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] rounded-full opacity-35 dark:opacity-30 animate-aurora-2"
        style={{
          background:
            'radial-gradient(circle at center, rgba(6, 182, 212, 0.4) 0%, rgba(14, 165, 233, 0.2) 40%, rgba(59, 130, 246, 0.06) 65%, transparent 75%)',
          willChange: 'transform',
        }}
      />

      {/* Cyber Violet / Indigo Ambient Pool (Center-Right) */}
      <div
        className="absolute top-1/2 right-0 sm:right-[8%] w-[520px] sm:w-[640px] h-[520px] sm:h-[640px] rounded-full opacity-30 dark:opacity-25 animate-aurora-3"
        style={{
          background:
            'radial-gradient(circle at center, rgba(139, 92, 246, 0.38) 0%, rgba(99, 102, 241, 0.18) 40%, rgba(236, 72, 153, 0.05) 65%, transparent 75%)',
          willChange: 'transform',
        }}
      />

      {/* Sunset Amber / Coral Warm Pool (Bottom-Left) */}
      <div
        className="absolute bottom-10 -left-20 sm:left-[5%] w-[520px] sm:w-[650px] h-[520px] sm:h-[650px] rounded-full opacity-25 dark:opacity-20 animate-aurora-4"
        style={{
          background:
            'radial-gradient(circle at center, rgba(245, 158, 11, 0.35) 0%, rgba(236, 72, 153, 0.16) 40%, transparent 70%)',
          willChange: 'transform',
        }}
      />

      {/* Lower Emerald Baseline Glow */}
      <div
        className="absolute -bottom-36 right-1/4 w-[500px] h-[500px] rounded-full opacity-25 dark:opacity-20"
        style={{
          background:
            'radial-gradient(circle at center, rgba(34, 197, 94, 0.3) 0%, transparent 70%)',
        }}
      />
    </div>
  );
};

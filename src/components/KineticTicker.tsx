import React from 'react';
import { motion } from 'motion/react';

interface TickerItem {
  label: string;
  detail: string;
  icon?: string;
  accent?: boolean;
}

const TICKER_ITEMS: TickerItem[] = [
  { label: 'SOLANA SPL & EVM', detail: 'High Throughput Architecture', icon: 'bolt', accent: true },
  { label: 'FAIR LAUNCH PORTALS', detail: '0% Tax / Raydium & Uniswap', icon: 'rocket_launch' },
  { label: 'BESPOKE MOTION GRAPHICS', detail: 'Interactive 60FPS Canvases', icon: 'animation', accent: true },
  { label: 'LIGHTNING DELIVERY', detail: '24–48h Turnaround', icon: 'schedule' },
  { label: 'SUB-SECOND LATENCY', detail: '< 400ms RPC Queries', icon: 'speed', accent: true },
  { label: 'PRODUCTION HARDENED', detail: 'Zero Pill / Swiss High-End Design', icon: 'verified' },
  { label: 'TELEMETRY & SWAPS', detail: 'Real-Time DEX Analytics', icon: 'monitoring', accent: true },
  { label: 'VIRAL MEMECOIN UX', detail: 'High Conversion Onboarding', icon: 'trending_up' },
];

export const KineticTicker: React.FC = () => {
  return (
    <div className="w-full overflow-hidden py-3 bg-[#f4f4f0] dark:bg-[#111216] border-y border-[#747878]/15 dark:border-white/10 select-none relative group">
      {/* Edge gradient fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#f4f4f0] dark:from-[#111216] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#f4f4f0] dark:from-[#111216] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap gap-12 w-max items-center"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 32,
        }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {/* Double the list to make seamless continuous loop */}
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-3 font-['JetBrains_Mono'] text-xs text-[#1b1c1a] dark:text-white/90"
          >
            <div className="flex items-center gap-1.5">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  item.accent ? 'bg-[#22C55E] animate-ping' : 'bg-[#747878] dark:bg-white/40'
                }`}
              />
              <span className="font-semibold tracking-wider text-[11px] sm:text-xs text-[#1b1c1a] dark:text-white">
                {item.label}
              </span>
            </div>

            <span className="text-[#747878] dark:text-[#9ca3af] text-[10px] sm:text-[11px]">
              {item.detail}
            </span>

            <span className="text-[#747878]/30 dark:text-white/20 ml-4 font-mono">/</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

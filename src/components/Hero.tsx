import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useNavigation } from '../context/NavigationContext';

interface HeroProps {
  onSelectProject?: (projectId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectProject }) => {
  const [metricTps, setMetricTps] = useState(45200);
  const [isCopiedToken, setIsCopiedToken] = useState(false);
  const { navigateTo } = useNavigation();

  const simulateTpsPulse = () => {
    const delta = Math.floor(Math.random() * 800) - 400;
    setMetricTps((prev) => Math.max(40000, Math.min(52000, prev + delta)));
  };

  return (
    <section className="relative w-full px-6 lg:px-12 pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden border-b border-[#747878]/15 dark:border-white/10 bg-[#faf9f5] dark:bg-[#090a0c] transition-colors duration-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Typography & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:col-span-7 flex flex-col items-start gap-6 z-10"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f4f4f0] dark:bg-[#16171c] border border-[#747878]/15 dark:border-white/10 font-['JetBrains_Mono'] text-xs text-[#444748] dark:text-[#d1d5db] uppercase tracking-wider"
          >
            <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
            <span>INDEPENDENT WEB3 DEVELOPER</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-[54px] font-semibold text-[#1b1c1a] dark:text-white tracking-tight uppercase leading-[1.06]"
          >
            WEBSITES <br />
            FOR CRYPTO <br />
            PROJECTS THAT <br />
            <span className="text-[#22C55E]">STAND OUT.</span>
          </motion.h1>

          {/* Subcopy */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-['Inter'] text-lg sm:text-xl text-[#444748] dark:text-[#d1d5db] max-w-xl leading-relaxed"
          >
            {PORTFOLIO_DATA.developer.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => navigateTo('work')}
              className="px-8 py-4 bg-[#000000] dark:bg-white text-white dark:text-black font-['Inter'] hover:bg-[#22C55E] dark:hover:bg-[#22C55E] dark:hover:text-black transition-all duration-200 flex items-center gap-2 font-medium tracking-wide group shadow-sm cursor-pointer"
            >
              <span>VIEW WORK</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform duration-200">
                arrow_forward
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => navigateTo('contact')}
              className="px-8 py-4 bg-transparent text-[#1b1c1a] dark:text-white border border-[#747878]/30 dark:border-white/20 hover:border-[#1b1c1a] dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/10 font-['Inter'] transition-all duration-200 flex items-center gap-2 font-medium tracking-wide cursor-pointer"
            >
              <span>LET’S TALK</span>
              <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
            </motion.button>
          </motion.div>

          {/* Tech tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-4 flex items-center gap-3 font-['JetBrains_Mono'] text-xs text-[#747878] dark:text-[#9ca3af] tracking-wider flex-wrap"
          >
            <span>Frontend</span>
            <span className="w-1 h-1 rounded-full bg-[#747878] dark:bg-[#9ca3af]"></span>
            <span>Web3</span>
            <span className="w-1 h-1 rounded-full bg-[#747878] dark:bg-[#9ca3af]"></span>
            <span>Creative Development</span>
          </motion.div>
        </motion.div>

        {/* Right Column: Sophisticated Asymmetrical Visual Centerpiece (Interactive UI Mockups) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:col-span-5 relative w-full h-[400px] sm:h-[460px] flex items-center justify-center select-none"
        >
          {/* Background Swiss grid accents / Technical annotations */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 dark:opacity-60">
            <div className="w-full h-full border border-dashed border-[#747878]/40 dark:border-white/20 rounded-xl"></div>
          </div>

          <div className="absolute top-2 right-4 font-['JetBrains_Mono'] text-[10px] text-[#747878] dark:text-[#9ca3af] uppercase tracking-widest pointer-events-none">
            WEB3 / FRONTEND // 2026
          </div>
          <div className="absolute bottom-2 left-4 font-['JetBrains_Mono'] text-[10px] text-[#747878] dark:text-[#9ca3af] uppercase tracking-widest pointer-events-none">
            SYS.GRID [X:48.2 / Y:12.9]
          </div>

          {/* Layer 1: Base Card (Live Project Preview - RONNIE Solana Memecoin) */}
          <div
            onClick={() => {
              simulateTpsPulse();
              if (onSelectProject) onSelectProject('ronnie-coin');
            }}
            className="absolute w-[88%] sm:w-[380px] bg-[#111111] dark:bg-[#14151a] text-white p-5 rounded-lg shadow-2xl border border-white/10 dark:border-white/20 transform -translate-x-4 sm:-translate-x-6 -translate-y-8 animate-float-slow z-10 cursor-pointer hover:border-[#22C55E]/50 transition-all duration-300 group"
            title="Click to view RONNIE ($RONNIE) live project"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></span>
                <span className="font-['JetBrains_Mono'] text-xs tracking-wider text-white/90 font-medium">
                  RONNIE ($RONNIE) // SOLANA
                </span>
              </div>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#22C55E] bg-[#22C55E]/15 px-2 py-0.5 rounded font-medium">
                LIVE
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="h-2 w-3/4 bg-white/25 rounded"></div>
              <div className="h-2 w-1/2 bg-white/15 rounded"></div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
              <div className="bg-white/5 p-2 rounded group-hover:bg-white/10 transition-colors">
                <div className="text-[10px] text-white/50 font-['JetBrains_Mono']">CHAIN</div>
                <div className="text-xs font-bold text-[#22C55E]">
                  Solana SPL
                </div>
              </div>
              <div className="bg-white/5 p-2 rounded group-hover:bg-white/10 transition-colors">
                <div className="text-[10px] text-white/50 font-['JetBrains_Mono']">SWAP</div>
                <div className="text-xs font-bold text-white">Raydium</div>
              </div>
              <div className="bg-white/5 p-2 rounded group-hover:bg-white/10 transition-colors">
                <div className="text-[10px] text-white/50 font-['JetBrains_Mono']">GAS</div>
                <div className="text-xs font-bold text-[#22C55E]">&lt; $0.001</div>
              </div>
            </div>
          </div>

          {/* Layer 2: Middle Card (Live Memecoin Preview - PEPEAK $PEAK) */}
          <div
            onClick={() => {
              setIsCopiedToken(true);
              setTimeout(() => setIsCopiedToken(false), 2000);
              if (onSelectProject) onSelectProject('pepeak-memecoin');
            }}
            className="absolute w-[84%] sm:w-[320px] bg-[#f4f4f0] dark:bg-[#1a1b22] text-[#1b1c1a] dark:text-white p-5 rounded-lg shadow-xl border border-[#747878]/30 dark:border-white/20 transform translate-x-6 sm:translate-x-10 translate-y-6 animate-float-fast z-20 cursor-pointer hover:border-[#1b1c1a] dark:hover:border-[#22C55E] transition-all duration-300"
            title="Click to view PEPEAK ($PEAK) live project"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#747878]/15 dark:border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#000000] dark:bg-white"></span>
                <span className="font-['JetBrains_Mono'] text-xs tracking-wider font-bold text-[#1b1c1a] dark:text-white">
                  PEPEAK ($PEAK)
                </span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-[#006e2f] dark:text-[#4ade80]">trending_up</span>
            </div>

            <div className="flex justify-between items-center bg-[#faf9f5] dark:bg-[#111216] p-3 rounded mb-3 border border-[#747878]/15 dark:border-white/10">
              <div>
                <div className="text-[10px] text-[#444748] dark:text-[#9ca3af] font-['JetBrains_Mono'] uppercase">
                  Summit Culture
                </div>
                <div className="text-sm font-bold text-[#1b1c1a] dark:text-white">100% Fair Launch</div>
              </div>
              <span className="text-xs font-bold text-[#22C55E] bg-[#22C55E]/15 px-2.5 py-1 rounded-full">
                0% TAX
              </span>
            </div>

            <div className="h-1.5 w-full bg-[#747878]/20 dark:bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-[#22C55E] w-5/6 rounded-full transition-all duration-500"></div>
            </div>
            {isCopiedToken && (
              <div className="mt-2 text-[10px] font-['JetBrains_Mono'] text-[#006e2f] dark:text-[#4ade80] text-center">
                ✓ Opening $PEAK details...
              </div>
            )}
          </div>

          {/* Layer 3: Top Accent Badge Card */}
          <div className="absolute -top-3 right-0 sm:right-2 bg-[#000000] dark:bg-white text-white dark:text-black px-4 py-2.5 rounded shadow-lg z-30 flex items-center gap-2 font-['JetBrains_Mono'] text-xs border border-white/10 dark:border-white/20">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping"></span>
            <span className="tracking-wide font-medium">CUSTOM DESIGN SYSTEM</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

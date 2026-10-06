import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

interface BrandedPreloaderProps {
  onComplete?: () => void;
}

export const BrandedPreloader: React.FC<BrandedPreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING ENVIRONMENT...');
  const [isFinished, setIsFinished] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) {
      setIsFinished(true);
      onComplete?.();
      return;
    }

    const startTime = performance.now();
    const duration = 1200; // Snappy 1.2s duration

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawRatio = Math.min(1, elapsed / duration);
      // Non-linear cubic ease-out curve for satisfying mechanical acceleration
      const easedRatio = 1 - Math.pow(1 - rawRatio, 3);
      const currentPct = Math.round(easedRatio * 100);

      setProgress(currentPct);

      if (currentPct < 40) {
        setStatusText('INITIALIZING RUNTIME...');
      } else if (currentPct < 75) {
        setStatusText('SYNCHRONIZING WEB3 ASSETS...');
      } else if (currentPct < 99) {
        setStatusText('FINALIZING DISPLAY...');
      } else {
        setStatusText('SYSTEM READY');
      }

      if (rawRatio < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        sound.playChime();
        setTimeout(() => {
          setIsFinished(true);
          onComplete?.();
        }, 180);
      }
    };

    const animFrame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animFrame);
  }, [onComplete]);

  const devRoleByLang: Record<string, string> = {
    en: 'Independent Web3 Developer',
    ja: '独立系 Web3 フロントエンドエンジニア',
    zh: '独立 Web3 前端工程师',
    es: 'Desarrollador Web3 Independiente',
    ko: '독립형 Web3 프론트엔드 개발자',
    fr: 'Développeur Web3 Indépendant',
  };

  const handleSkip = () => {
    sound.playClick(900);
    setProgress(100);
    setIsFinished(true);
    onComplete?.();
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[200] flex flex-col justify-between p-8 sm:p-14 bg-[#090a0c] text-white select-none overflow-hidden"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {/* Subtle Ambient Background Mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#22C55E]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Header Row */}
          <div className="relative z-10 flex items-center justify-between text-xs font-['JetBrains_Mono'] text-white/50 tracking-wider">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
              <span className="text-white/80">SENKU PORTFOLIO // 2026</span>
            </div>

            <button
              type="button"
              onClick={handleSkip}
              className="text-[11px] text-white/40 hover:text-[#22C55E] uppercase transition-colors cursor-pointer"
            >
              Skip [ESC] →
            </button>
          </div>

          {/* Center Brand Identity */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <h1 className="font-['Space_Grotesk'] text-5xl sm:text-7xl font-bold tracking-tighter uppercase text-white flex items-center justify-center gap-2">
                SENKU{(language === 'ja' || language === 'zh') && (
                  <span className="text-2xl sm:text-3xl text-white/60 font-['JetBrains_Mono'] font-normal">
                    千空
                  </span>
                )}
                <span className="text-[#22C55E] animate-pulse">.</span>
              </h1>
              <p className="font-['JetBrains_Mono'] text-xs sm:text-sm text-[#22C55E] uppercase tracking-widest font-medium">
                {devRoleByLang[language] || devRoleByLang.en}
              </p>
            </motion.div>

            {/* Percentage Readout */}
            <div className="font-['Space_Grotesk'] text-4xl sm:text-5xl font-light text-white/90 tabular-nums pt-4">
              {progress}%
            </div>
          </div>

          {/* Bottom Progress Bar & Telemetry Status */}
          <div className="relative z-10 max-w-xl mx-auto w-full space-y-3">
            <div className="flex items-center justify-between text-[11px] font-['JetBrains_Mono'] text-white/50 uppercase tracking-wider">
              <span>{statusText}</span>
              <span className="text-[#22C55E] font-semibold">
                {progress === 100 ? 'COMPLETE' : 'LOADING'}
              </span>
            </div>

            {/* Track Bar */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#22C55E] via-[#4ade80] to-[#22C55E] shadow-[0_0_12px_#22c55e]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] font-['JetBrains_Mono'] text-white/30 pt-1">
              <span>SOLANA & EVM FRONTENDS</span>
              <span>STANDALONE ARCHITECTURE</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

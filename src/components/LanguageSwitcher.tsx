import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage, Language, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { sound } from '../utils/soundEffects';

interface LanguageSwitcherProps {
  className?: string;
  compact?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  compact = false,
}) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelect = (lang: Language) => {
    if (lang !== language) {
      sound.playClick(900);
      setLanguage(lang);
    }
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => {
          sound.playClick(750);
          setIsOpen((prev) => !prev);
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#f4f4f0] dark:bg-[#16171c] border border-[#747878]/20 dark:border-white/10 hover:border-[#22C55E]/50 dark:hover:border-[#22C55E]/50 text-[#1b1c1a] dark:text-white font-['JetBrains_Mono'] text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer shadow-2xs group"
        title="Change Language"
      >
        <span className="material-symbols-outlined text-[16px] text-[#747878] dark:text-[#9ca3af] group-hover:text-[#22C55E] transition-colors">
          language
        </span>
        <span className="font-bold text-[#1b1c1a] dark:text-white">{currentOption.flag}</span>
        <span
          className={`material-symbols-outlined text-[14px] text-[#747878] dark:text-[#9ca3af] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#22C55E]' : ''
          }`}
        >
          expand_more
        </span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={`absolute right-0 mt-2 ${
              compact ? 'w-48' : 'w-52'
            } bg-[#faf9f5] dark:bg-[#121316] border border-[#747878]/25 dark:border-white/15 rounded-xl shadow-2xl p-1.5 z-50 font-['JetBrains_Mono'] select-none backdrop-blur-md`}
            role="listbox"
            aria-label="Language options"
          >
            <div className="px-2.5 py-1.5 text-[10px] uppercase tracking-widest text-[#747878] dark:text-[#9ca3af] border-b border-[#747878]/15 dark:border-white/10 mb-1 flex items-center justify-between">
              <span>Select Language</span>
              <span className="text-[9px] bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded">6 LOC</span>
            </div>

            <div className="space-y-0.5">
              {SUPPORTED_LANGUAGES.map((item) => {
                const isActive = item.code === language;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => handleSelect(item.code)}
                    onMouseEnter={() => sound.playHover()}
                    role="option"
                    aria-selected={isActive}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                      isActive
                        ? 'bg-[#22C55E]/15 text-[#006e2f] dark:text-[#4ade80] font-bold border border-[#22C55E]/30'
                        : 'text-[#444748] dark:text-[#d1d5db] hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#1b1c1a] dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isActive
                            ? 'bg-[#22C55E] text-black'
                            : 'bg-[#efeeea] dark:bg-[#212328] text-[#747878] dark:text-[#9ca3af]'
                        }`}
                      >
                        {item.flag}
                      </span>
                      <span className="font-sans font-medium text-[13px]">{item.nativeName}</span>
                    </div>

                    {isActive && (
                      <span className="material-symbols-outlined text-[16px] text-[#22C55E]">
                        check
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

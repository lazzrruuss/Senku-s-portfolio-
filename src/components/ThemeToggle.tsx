import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/soundEffects';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = false,
}) => {
  const { theme, toggleTheme, isTransitioning } = useTheme();
  const isDark = theme === 'dark';

  const handleClick = () => {
    sound.playClick(isDark ? 900 : 700);
    toggleTheme();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`relative inline-flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 rounded-full glass-btn transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22C55E] cursor-pointer shadow-xs text-[#1b1c1a] dark:text-white ${className}`}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to high-contrast dark theme'}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light theme' : 'Switch to high-contrast dark theme'}
    >
      <div className={`relative w-5 h-5 flex items-center justify-center transition-transform duration-500 ${isTransitioning ? 'scale-110' : ''}`}>
        {isDark ? (
          <span className="material-symbols-outlined text-[18px] text-[#22C55E] transition-all duration-300 rotate-0 hover:rotate-45">
            light_mode
          </span>
        ) : (
          <span className="material-symbols-outlined text-[18px] text-[#1b1c1a] transition-all duration-300 rotate-0 hover:-rotate-45">
            dark_mode
          </span>
        )}
      </div>

      {showLabel && (
        <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider font-medium">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}

      {/* Subtle indicator dot */}
      <span
        className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
          isDark ? 'bg-[#22C55E]' : 'bg-[#747878]'
        }`}
      />
    </button>
  );
};

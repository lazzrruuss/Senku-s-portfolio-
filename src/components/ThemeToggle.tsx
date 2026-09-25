import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = false,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 rounded-full border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22C55E] cursor-pointer ${
        isDark
          ? 'bg-[#18191e] border-[#27272a] text-white hover:border-[#4ade80] hover:text-[#4ade80]'
          : 'bg-[#f4f4f0] border-[#747878]/20 text-[#1b1c1a] hover:border-[#1b1c1a] hover:text-[#006e2f]'
      } ${className}`}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to high-contrast dark theme'}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light theme' : 'Switch to high-contrast dark theme'}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <span className="material-symbols-outlined text-[18px] text-[#22C55E] transition-transform duration-300 rotate-0">
            light_mode
          </span>
        ) : (
          <span className="material-symbols-outlined text-[18px] text-[#1b1c1a] transition-transform duration-300 rotate-0">
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

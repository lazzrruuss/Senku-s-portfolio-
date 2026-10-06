import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isTransitioning: boolean;
}

type DocumentWithViewTransition = Document & {
  startViewTransition?: (updateCallback: () => Promise<void> | void) => {
    finished?: Promise<void>;
    ready?: Promise<void>;
    updateCallbackDone?: Promise<void>;
  };
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('senku-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Directly apply attributes to DOM root
  const applyThemeDOM = (targetTheme: Theme) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (targetTheme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
    localStorage.setItem('senku-theme', targetTheme);
  };

  // Initial mount sync
  useEffect(() => {
    applyThemeDOM(theme);
  }, [theme]);

  // Execute full-document cross-fade transition
  const transitionToTheme = (nextTheme: Theme) => {
    if (typeof document === 'undefined') {
      setThemeState(nextTheme);
      return;
    }

    const doc = document as DocumentWithViewTransition;
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    setIsTransitioning(true);
    document.documentElement.classList.add('theme-cross-fade');

    // 1. Native View Transitions API for modern browser film-grade cross-fade
    if (doc.startViewTransition && !prefersReducedMotion) {
      const transition = doc.startViewTransition(() => {
        applyThemeDOM(nextTheme);
        setThemeState(nextTheme);
      });

      transition.finished.finally(() => {
        setTimeout(() => {
          document.documentElement.classList.remove('theme-cross-fade');
          setIsTransitioning(false);
        }, 50);
      });
    } else {
      // 2. Smooth CSS interpolation fallback for all environments
      applyThemeDOM(nextTheme);
      setThemeState(nextTheme);

      setTimeout(() => {
        document.documentElement.classList.remove('theme-cross-fade');
        setIsTransitioning(false);
      }, 430);
    }
  };

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'light' ? 'dark' : 'light';
    transitionToTheme(nextTheme);
  };

  const setTheme = (newTheme: Theme) => {
    if (newTheme !== theme) {
      transitionToTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

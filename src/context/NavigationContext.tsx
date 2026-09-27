import React, { createContext, useContext, useState, useEffect } from 'react';

export type PageId = 'home' | 'work' | 'about' | 'skills' | 'contact';

interface NavigationContextType {
  currentPage: PageId;
  navigateTo: (page: PageId, projectIdToOpen?: string) => void;
  pendingProjectId?: string;
  clearPendingProjectId: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'work', 'about', 'skills', 'contact'].includes(hash)) {
        return hash as PageId;
      }
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();
      if (['work', 'about', 'skills', 'contact'].includes(path)) {
        return path as PageId;
      }
    }
    return 'home';
  });

  const [pendingProjectId, setPendingProjectId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'work', 'about', 'skills', 'contact'].includes(hash)) {
        setCurrentPage(hash as PageId);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: PageId, projectIdToOpen?: string) => {
    setCurrentPage(page);
    if (projectIdToOpen) {
      setPendingProjectId(projectIdToOpen);
    }
    // Update URL hash for bookmarking and history support
    const newHash = page === 'home' ? '' : `#${page}`;
    if (window.location.hash !== newHash) {
      window.history.pushState({ page }, '', newHash || window.location.pathname);
    }
    // Smooth scroll to top of newly displayed page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearPendingProjectId = () => {
    setPendingProjectId(undefined);
  };

  return (
    <NavigationContext.Provider
      value={{
        currentPage,
        navigateTo,
        pendingProjectId,
        clearPendingProjectId,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

import { useState, useEffect, useCallback } from 'react';

export type AppTab = 'landing' | 'pms' | 'resort' | 'portal' | 'cleaner';

const TAB_TO_PATH: Record<AppTab, string> = {
  landing: '/',
  pms: '/pms',
  resort: '/housekeeping',
  portal: '/portal',
  cleaner: '/cleaner'
};

const PATH_TO_TAB: Record<string, AppTab> = {
  '/': 'landing',
  '': 'landing',
  '/landing': 'landing',
  '/pms': 'pms',
  '/reservations': 'pms',
  '/housekeeping': 'resort',
  '/resort': 'resort',
  '/portal': 'portal',
  '/portals': 'portal',
  '/cleaner': 'cleaner',
  '/mobile': 'cleaner'
};

export function useAppRouter() {
  const getTabFromLocation = (): { tab: AppTab; isLoginRoute: boolean } => {
    if (typeof window === 'undefined') return { tab: 'landing', isLoginRoute: false };

    // Check pathname or hash
    const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
    const hash = window.location.hash.toLowerCase().replace('#', '').replace(/\/$/, '');

    const isLoginRoute = pathname === '/login' || hash === 'login';

    if (isLoginRoute) {
      return { tab: 'landing', isLoginRoute: true };
    }

    if (hash && PATH_TO_TAB[`/${hash}`]) {
      return { tab: PATH_TO_TAB[`/${hash}`], isLoginRoute: false };
    }

    const matchedTab = PATH_TO_TAB[pathname] || 'landing';
    return { tab: matchedTab, isLoginRoute: false };
  };

  const initial = getTabFromLocation();
  const [currentTab, setCurrentTabState] = useState<AppTab>(initial.tab);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(initial.isLoginRoute);

  // Synchronize Tab & update Browser URL without full reload
  const navigateToTab = useCallback((tab: AppTab) => {
    setCurrentTabState(tab);
    if (typeof window !== 'undefined') {
      const targetPath = TAB_TO_PATH[tab] || '/';
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ tab }, '', targetPath);
      }
    }
  }, []);

  const openLogin = useCallback(() => {
    setIsLoginModalOpen(true);
    if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
      window.history.pushState({ modal: 'login' }, '', '/login');
    }
  }, []);

  const closeLogin = useCallback(() => {
    setIsLoginModalOpen(false);
    if (typeof window !== 'undefined' && window.location.pathname === '/login') {
      const targetPath = TAB_TO_PATH[currentTab] || '/';
      window.history.replaceState({ tab: currentTab }, '', targetPath);
    }
  }, [currentTab]);

  // Listen for browser Back/Forward (popstate)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      const { tab, isLoginRoute } = getTabFromLocation();
      setCurrentTabState(tab);
      setIsLoginModalOpen(isLoginRoute);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  return {
    currentTab,
    navigateToTab,
    isLoginModalOpen,
    openLogin,
    closeLogin
  };
}

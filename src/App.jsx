import { useState, useMemo, useEffect, useCallback, lazy, Suspense } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import SplashScreen from './components/SplashScreen';

const Education = lazy(() => import('./components/Education'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Leadership = lazy(() => import('./components/Leadership'));

const TAB_IDS = ['profile', 'education', 'projects', 'skills', 'leadership'];

const SPLASH_KEY = 'kj-splash-seen';

// Once per browser session. Reduced motion no longer skips it outright: iOS
// "Reduce Motion" is common enough that it hid the splash permanently on those
// devices. SplashScreen serves a calm, fade-only version instead.
function shouldShowSplash() {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(SPLASH_KEY) !== '1';
  } catch {
    return true; // storage blocked (private mode); showing it is the safe default
  }
}

function readTabFromUrl() {
  if (typeof window === 'undefined') return 'profile';
  const hash = window.location.hash.replace(/^#\/?/, '');
  return TAB_IDS.includes(hash) ? hash : 'profile';
}

function App() {
  const [activeTab, setActiveTab] = useState(readTabFromUrl);
  const [showSplash, setShowSplash] = useState(shouldShowSplash);

  const dismissSplash = useCallback(() => {
    setShowSplash(false);
    try {
      window.sessionStorage.setItem(SPLASH_KEY, '1');
    } catch {
      /* storage blocked; the splash simply shows again next load */
    }
  }, []);

  useEffect(() => {
    if (!showSplash) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [showSplash]);

  // Keep the tab in sync with the URL so deep links, refresh, and the browser
  // back/forward buttons all work.
  useEffect(() => {
    const syncFromUrl = () => setActiveTab(readTabFromUrl());
    window.addEventListener('popstate', syncFromUrl);
    window.addEventListener('hashchange', syncFromUrl);
    return () => {
      window.removeEventListener('popstate', syncFromUrl);
      window.removeEventListener('hashchange', syncFromUrl);
    };
  }, []);

  const selectTab = useCallback((tab) => {
    if (!TAB_IDS.includes(tab)) return;

    const target = tab === 'profile'
      ? `${window.location.pathname}${window.location.search}`
      : `#${tab}`;
    if (readTabFromUrl() !== tab) {
      window.history.pushState({ tab }, '', target);
    }

    setActiveTab(tab);

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, []);

  const renderContent = useMemo(() => {
    switch (activeTab) {
      case 'profile':
        return <Profile setActiveTab={selectTab} />;
      case 'education':
        return <Education />;
      case 'projects':
        return <Projects />;
      case 'skills':
        return <Skills />;
      case 'leadership':
        return <Leadership />;
      default:
        return <Profile setActiveTab={selectTab} />;
    }
  }, [activeTab, selectTab]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {showSplash && <SplashScreen onDone={dismissSplash} />}
      </AnimatePresence>

      <div className="relative z-0 min-h-viewport flex flex-col">
        {/* Focus main directly rather than following the href, so the skip link
            does not overwrite the tab hash. */}
        <a
          href="#main-content"
          onClick={(event) => {
            event.preventDefault();
            const main = document.getElementById('main-content');
            if (main) {
              main.focus();
              main.scrollIntoView({ block: 'start' });
            }
          }}
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-full focus:bg-primary-700 focus:text-white focus:shadow-lg"
        >
          Skip to content
        </a>

        <Navbar activeTab={activeTab} setActiveTab={selectTab} />

        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 pt-32 pb-4 sm:pb-10 focus:outline-none"
        >
          {/* flex-1 on the panel keeps the footer pinned to the bottom on short
              tabs, instead of stranding it halfway up an empty page. */}
          <div className="container mx-auto w-full flex-1">
            <div
              id={`${activeTab}-panel`}
              role="tabpanel"
              aria-labelledby={`${activeTab}-tab`}
              tabIndex={-1}
            >
              <Suspense fallback={null}>
                {renderContent}
              </Suspense>
            </div>
          </div>

          <div className="container mx-auto w-full">
            <div className="mt-8 sm:mt-10 text-xs sm:text-sm">
              <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-1 text-slate-500 dark:text-slate-400 text-center">
                <span className="text-[0.7rem] sm:text-xs">
                  © {new Date().getFullYear()} Keenan Jusak. All rights reserved.
                </span>
                <span className="text-[0.7rem] sm:text-xs italic">
                  “All models are wrong, but some are useful” · George Box
                </span>
              </div>
            </div>
          </div>
        </main>

        {/* Ambient colour field, one hue mix per tab. */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10" aria-hidden="true">
          <div className="absolute inset-0 ambient-base" />
          <div className={`absolute inset-0 ambient-${activeTab}`} />
          <div className="absolute inset-0 ambient-grid" />
          {activeTab === 'profile' && (
            <>
              <div className="absolute top-1/4 left-[12%] w-80 h-80 bg-sky-300 rounded-full filter blur-3xl opacity-25 animate-blob will-change-transform" />
              <div className="absolute top-1/3 right-[14%] w-80 h-80 bg-indigo-300 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000 will-change-transform hidden sm:block" />
            </>
          )}
        </div>
      </div>
    </MotionConfig>
  );
}

export default App;

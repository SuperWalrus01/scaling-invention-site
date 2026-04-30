import { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Profile from './components/Profile';

const Education = lazy(() => import('./components/Education'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Leadership = lazy(() => import('./components/Leadership'));


function App() {
  const [activeTab, setActiveTab] = useState('profile');


  // Preload tab content components in the background so switching tabs feels instant
  useEffect(() => {
    // Fire and forget; React.lazy will reuse these loaded chunks
    import('./components/Education');
    import('./components/Projects');
    import('./components/Skills');
    import('./components/Leadership');
  }, []);



  const renderContent = useMemo(() => {
    switch (activeTab) {
      case 'profile':
        return <Profile setActiveTab={setActiveTab} />;
      case 'education':
        return <Education />;
      case 'projects':
        return <Projects />;
      case 'skills':
        return <Skills />;
      case 'leadership':
        return <Leadership />;
      default:
        return <Profile />;
    }
  }, [activeTab]);

  return (
    <div className="relative z-0 h-screen overflow-hidden flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <div className="container mx-auto">
          <Suspense fallback={null}>
            <AnimatePresence mode="wait">
              <div key={activeTab}>
                {renderContent}
              </div>
            </AnimatePresence>
          </Suspense>

          <div className="mt-10 mb-6 text-xs sm:text-sm">
            <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-1 text-slate-500 dark:text-slate-400 text-center">
              <span className="text-[0.7rem] sm:text-xs">
                © 2025 Keenan Jusak. All rights reserved.
              </span>
              <span className="text-[0.7rem] sm:text-xs italic">
                “All models are wrong, but some are useful” — George Box
              </span>
            </div>
          </div>
        </div>
      </main>





      {/* Decorative gradient blobs + stats-style grid (home only) */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        {activeTab === 'profile' && (
            <div className="absolute inset-0 stats-grid-bg opacity-40 sm:opacity-50" />
        )}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob will-change-transform" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000 will-change-transform" />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000 will-change-transform" />
      </div>
    </div>
  );
}

export default App;

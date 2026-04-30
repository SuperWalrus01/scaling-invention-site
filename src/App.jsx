import { useState, useMemo, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Profile from './components/Profile';

const Education = lazy(() => import('./components/Education'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Leadership = lazy(() => import('./components/Leadership'));


function App() {
  const [activeTab, setActiveTab] = useState('profile');

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
            {renderContent}
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
          <>
            <div className="absolute inset-0 stats-grid-bg opacity-40 sm:opacity-50" />
            <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-sky-200 rounded-full filter blur-2xl opacity-20 animate-blob will-change-transform" />
            <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-sky-200 rounded-full filter blur-2xl opacity-20 animate-blob animation-delay-2000 will-change-transform hidden sm:block" />
          </>
        )}
      </div>
    </div>
  );
}

export default App;

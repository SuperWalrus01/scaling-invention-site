import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Education from './components/Education';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Leadership from './components/Leadership';

function App() {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = useMemo(() => {
    switch (activeTab) {
      case 'profile':
        return <Profile />;
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
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto">
        <AnimatePresence mode="wait">
          <div key={activeTab}>
            {renderContent}
          </div>
        </AnimatePresence>
      </main>

      {/* Decorative gradient blobs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob will-change-transform" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 will-change-transform" />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 will-change-transform" />
      </div>
    </div>
  );
}

export default App;

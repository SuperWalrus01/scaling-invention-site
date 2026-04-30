import { motion } from 'framer-motion';

const tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'leadership', label: 'Leadership' },
];

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav
      className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[95vw] sm:w-auto max-w-[600px]"
      aria-label="Main sections"
    >
      <div className="glass rounded-full px-1 sm:px-2 py-1.5 sm:py-2 shadow-lg">
        <div
          className="flex gap-0.5 sm:gap-1 relative"
          role="tablist"
          aria-orientation="horizontal"
        >
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`${tab.id}-panel`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                  event.preventDefault();
                  const direction = event.key === 'ArrowRight' ? 1 : -1;
                  const nextIndex = (index + direction + tabs.length) % tabs.length;
                  setActiveTab(tabs[nextIndex].id);
                }
              }}
              className={`
                relative px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap
                ${activeTab === tab.id ? 'text-white' : 'text-gray-700 hover:text-gray-900'}
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white
              `}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary-600 rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

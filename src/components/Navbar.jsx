import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'leadership', label: 'Leadership' },
];

export default function Navbar({ activeTab, setActiveTab }) {
  const tabRefs = useRef([]);
  const listRef = useRef(null);

  // The five labels need ~363px but a 320-390px phone gives the pill far less,
  // which pushed Leadership off-screen entirely. The row scrolls now, so keep
  // the selected tab in view. Scrolls only the list, never the page.
  useEffect(() => {
    const list = listRef.current;
    const button = tabRefs.current[tabs.findIndex((t) => t.id === activeTab)];
    if (!list || !button) return;
    if (list.scrollWidth <= list.clientWidth) return;

    const target = button.offsetLeft - (list.clientWidth - button.offsetWidth) / 2;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    list.scrollTo({ left: Math.max(0, target), behavior: reduced ? 'auto' : 'smooth' });
  }, [activeTab]);

  const moveTo = (nextIndex) => {
    const next = tabs[nextIndex];
    setActiveTab(next.id);
    // Roving tabindex: focus has to follow selection, otherwise focus is left
    // on a button that just became tabIndex={-1}.
    tabRefs.current[nextIndex]?.focus();
  };

  const onKeyDown = (event, index) => {
    const keys = {
      ArrowRight: (index + 1) % tabs.length,
      ArrowLeft: (index - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    };

    if (event.key in keys) {
      event.preventDefault();
      moveTo(keys[event.key]);
    }
  };

  return (
    <nav
      className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[95vw] sm:w-auto max-w-[600px]"
      aria-label="Main sections"
    >
      <div className="glass rounded-full px-1 sm:px-2 py-1.5 sm:py-2 shadow-lg">
        <div
          ref={listRef}
          className="flex gap-0.5 sm:gap-1 relative overflow-x-auto hide-scrollbar"
          role="tablist"
          aria-orientation="horizontal"
        >
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              id={`${tab.id}-tab`}
              ref={(el) => (tabRefs.current[index] = el)}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`${tab.id}-panel`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`
                relative shrink-0 px-2.5 sm:px-6 py-2.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap
                ${activeTab === tab.id ? 'text-white' : 'text-gray-700 hover:text-gray-900'}
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white
              `}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary-700 rounded-full"
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

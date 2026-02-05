import { motion } from 'framer-motion';
import { useState } from 'react';

const tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'leadership', label: 'Leadership' },
];

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[95vw] sm:w-auto max-w-[600px]">
      <div className="glass rounded-full px-1 sm:px-2 py-1.5 sm:py-2 shadow-lg">
        <div className="flex gap-0.5 sm:gap-1 relative overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap
                ${activeTab === tab.id ? 'text-white' : 'text-gray-700 hover:text-gray-900'}
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

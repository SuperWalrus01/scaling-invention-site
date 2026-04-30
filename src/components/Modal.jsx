import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, message, children }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const titleId = 'modal-title';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 max-w-3xl w-full max-h-[90vh] shadow-2xl flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <h3 id={titleId} className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  type="button"
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5 text-gray-500" aria-hidden="true" />
                </button>
              </div>
              
              <div className="flex-1 min-h-0 overflow-y-auto pr-1 sm:pr-2 mb-4 sm:mb-5 space-y-4 text-justify">
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed text-left sm:text-justify">
                  {typeof message === 'string' ? <p>{message}</p> : message}
                </div>

                {children && (
                  <div className="mt-4">
                    {children}
                  </div>
                )}
              </div>

              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="w-full px-6 py-2.5 sm:py-3 bg-primary-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow text-sm sm:text-base flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Got it
              </motion.button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

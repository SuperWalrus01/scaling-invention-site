import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

const ModalContext = createContext(undefined);

export const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export function Modal({ children }) {
  return <ModalProvider>{children}</ModalProvider>;
}

export const ModalTrigger = ({ children, className }) => {
  const { setOpen } = useModal();
  return (
    <button
      className={cn('relative overflow-hidden', className)}
      onClick={() => setOpen(true)}
    >
      {children}
    </button>
  );
};

export const ModalClose = ({ children, className }) => {
  const { setOpen } = useModal();
  return (
    <button className={className} onClick={() => setOpen(false)}>
      {children}
    </button>
  );
};

export const ModalBody = ({ children, className }) => {
  const { open, setOpen } = useModal();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
  }, [open]);

  const modalRef = useRef(null);
  useOutsideClick(modalRef, () => setOpen(false), open);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
          className="fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full flex items-center justify-center z-50"
        >
          <Overlay />
          <motion.div
            ref={modalRef}
            className={cn(
              'min-h-[50%] max-h-[90%] md:max-w-[40%] bg-white border border-gray-100 md:rounded-2xl relative z-50 flex flex-col flex-1 overflow-hidden',
              className
            )}
            initial={{ opacity: 0, scale: 0.72, rotateX: 24, y: 24 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <CloseIcon />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export const ModalContent = ({ children, className }) => {
  return (
    <div className={cn('flex flex-col flex-1 p-8 md:p-10', className)}>
      {children}
    </div>
  );
};

export const ModalFooter = ({ children, className }) => {
  return (
    <div className={cn('flex justify-end p-4 bg-white', className)}>
      {children}
    </div>
  );
};

const Overlay = ({ className }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16, ease: 'easeOut' }}
      className={cn('fixed inset-0 h-full w-full bg-black bg-opacity-50 z-50', className)}
    />
  );
};

const CloseIcon = () => {
  const { setOpen } = useModal();
  return (
    <button onClick={() => setOpen(false)} className="absolute top-4 right-4 group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-700 h-4 w-4 group-hover:scale-125 group-hover:rotate-3 transition duration-200"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    </button>
  );
};

export const useOutsideClick = (ref, callback, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      callback(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, callback, enabled]);
};

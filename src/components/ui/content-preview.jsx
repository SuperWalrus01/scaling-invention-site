import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import React from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * ContentPreview — hover card that shows rich JSX content.
 * Pass the full trigger element as `children`; it becomes the entire hover zone.
 * openDelay=0 for instant reveal, closeDelay=150 so moving into the popup
 * content doesn't cause a flicker.
 */
export const ContentPreview = ({ children, content, width = 320 }) => {
  const [isOpen, setOpen] = React.useState(false);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  // Merge our onMouseMove with any existing one on the trigger child
  const triggerChild = React.cloneElement(children, {
    onMouseMove: (e) => {
      handleMouseMove(e);
      children.props.onMouseMove?.(e);
    },
  });

  return (
    <HoverCardPrimitive.Root
      openDelay={0}
      closeDelay={150}
      onOpenChange={(open) => setOpen(open)}
    >
      <HoverCardPrimitive.Trigger asChild>
        {triggerChild}
      </HoverCardPrimitive.Trigger>

      <HoverCardPrimitive.Content
        className="[transform-origin:var(--radix-hover-card-content-transform-origin)] z-50"
        side="top"
        align="center"
        sideOffset={12}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { type: 'spring', stiffness: 260, damping: 20 },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              className="shadow-xl rounded-2xl"
              style={{ x: translateX, width }}
            >
              <div className="bg-white border border-neutral-100 rounded-2xl p-4 text-left">
                {content}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
  );
};

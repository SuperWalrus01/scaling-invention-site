import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import React from 'react';
import { motion } from 'framer-motion';

/**
 * ContentPreview — hover card that shows rich JSX content.
 * Pass the full trigger element as `children`; it becomes the entire hover zone.
 * openDelay=0 for instant reveal, closeDelay=150 so moving into the popup
 * content doesn't cause a flicker.
 */
export const ContentPreview = ({ children, content, width = 320 }) => {
  return (
    <HoverCardPrimitive.Root openDelay={0} closeDelay={150}>
      <HoverCardPrimitive.Trigger asChild>
        {children}
      </HoverCardPrimitive.Trigger>

      <HoverCardPrimitive.Content
        className="[transform-origin:var(--radix-hover-card-content-transform-origin)] z-50"
        side="top"
        align="center"
        sideOffset={12}
      >
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.16 }}
          className="shadow-xl rounded-2xl"
          style={{ width }}
        >
          <div className="bg-white border border-neutral-100 rounded-2xl p-4 text-left">
            {content}
          </div>
        </motion.div>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
  );
};

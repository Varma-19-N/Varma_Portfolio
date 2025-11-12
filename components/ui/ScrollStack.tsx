import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'https://aistudiocdn.com/framer-motion@^12.23.24';

const CARD_OFFSET = 24; // px, vertical offset for cards in the stack
const SCALE_FACTOR = 0.05; // scale difference between stacked cards
const TRANSITION_DURATION = 0.8; // Duration for smooth transitions
const SCROLL_COOLDOWN = TRANSITION_DURATION * 1000 + 100; // ms

export const ScrollStack = ({ children }) => {
  const numSections = React.Children.count(children);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const touchStartY = useRef(0);

  const changeSection = (newDirection: number) => {
    if (isScrolling) return;

    const newIndex = activeIndex + newDirection;

    if (newIndex >= 0 && newIndex < numSections) {
      setIsScrolling(true);
      setActiveIndex(newIndex);
      setTimeout(() => setIsScrolling(false), SCROLL_COOLDOWN);
    }
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      changeSection(e.deltaY > 0 ? 1 : -1);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;

      if (Math.abs(deltaY) > 50) { // Threshold to prevent accidental swipes
        changeSection(deltaY > 0 ? 1 : -1);
        touchStartY.current = touchEndY; 
      }
    };
    
    const container = document.getElementById('scroll-stack-container');
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [activeIndex, isScrolling, numSections]);

  return (
    <div id="scroll-stack-container" className="relative h-screen w-full">
      {React.Children.map(children, (child, i) => {
        if (!React.isValidElement(child)) {
          return child;
        }
        
        const section = React.cloneElement(child, {
          // @ts-ignore
          isActive: i === activeIndex,
        });

        return (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
               pointerEvents: i === activeIndex ? 'auto' : 'none',
               transformOrigin: 'center top',
               transformStyle: 'preserve-3d',
            }}
            initial={{
              y: i * CARD_OFFSET,
              scale: 1 - i * SCALE_FACTOR,
              zIndex: numSections - i,
              opacity: i === 0 ? 1 : 0,
            }}
            animate={{
              y: (i - activeIndex) * CARD_OFFSET,
              scale: 1 - (i - activeIndex) * SCALE_FACTOR,
              zIndex: numSections - i,
              opacity: i >= activeIndex ? 1 : 0,
            }}
            transition={{
              duration: TRANSITION_DURATION,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {section}
          </motion.div>
        );
      })}
    </div>
  );
};
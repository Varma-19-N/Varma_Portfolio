import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const CursorGlow: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed -inset-px z-50 hidden md:block"
      style={{
        background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 255, 0.1), transparent 80%)`,
      }}
      animate={{ x: mousePosition.x - 300, y: mousePosition.y - 300 }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
    />
  );
};
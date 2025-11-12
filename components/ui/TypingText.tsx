import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  className?: string;
  isActive?: boolean;
}

export const TypingText: React.FC<TypingTextProps> = ({ text, className = '', isActive = false }) => {
  const [displayedText, setDisplayedText] = useState('');
  const typingSpeed = 75;

  useEffect(() => {
    let typingInterval: number;

    if (isActive) {
      let i = 0;
      // Start typing from scratch
      typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, typingSpeed);
    } else {
      // Reset the text when the section is no longer active
      setDisplayedText('');
    }

    // Cleanup function to clear the interval when the component unmounts or isActive changes
    return () => clearInterval(typingInterval);
  }, [isActive, text]); // Rerun the effect whenever `isActive` or `text` changes

  return (
    <h2
      className={`font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-glow ${className}`}
      aria-label={text}
      style={{ 
        minHeight: '1.2em', // Prevents layout shift
      }}
    >
      <span>{displayedText}</span>
      {/* Show cursor only when the section is active to prevent multiple cursors appearing */}
      {isActive && <span className="blinking-cursor">|</span>}
    </h2>
  );
};
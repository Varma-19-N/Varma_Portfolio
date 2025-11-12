import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const styles = {
  wrapper: {
    display: 'inline-block',
    whiteSpace: 'pre-wrap'
  },
  srOnly: {
    position: 'absolute' as 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    border: 0
  }
};

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'hover' | 'view' | 'both';
  initialDelay?: number;
  onComplete?: () => void;
}

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  initialDelay = 0,
  onComplete,
  ...props
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set<number>());
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isDelayedPhase, setIsDelayedPhase] = useState(true);
  const containerRef = useRef<HTMLSpanElement>(null);

  const shuffleText = (originalText: string, currentRevealed: Set<number>) => {
      const availableChars = useOriginalCharsOnly
        ? Array.from(new Set(text.split(''))).filter(char => char !== ' ')
        : characters.split('');

      return originalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (currentRevealed.has(i)) return originalText[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join('');
  };


  useEffect(() => {
    let interval: number;
    let delayTimeout: number;

    const getNextIndex = (revealedSet: Set<number>) => {
      const textLength = text.length;
      switch (revealDirection) {
        case 'start':
          return revealedSet.size;
        case 'end':
          return textLength - 1 - revealedSet.size;
        case 'center': {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedSet.size / 2);
          const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;

          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
            return nextIndex;
          }

          for (let i = 0; i < textLength; i++) {
            if (!revealedSet.has(i)) return i;
          }
          return 0;
        }
        default:
          return revealedSet.size;
      }
    };

    if (isHovering) {
      setIsScrambling(true);
      if (isDelayedPhase) {
        setDisplayText(shuffleText(text, new Set()));
        delayTimeout = window.setTimeout(() => {
          setIsDelayedPhase(false);
        }, initialDelay);
      } else {
        interval = window.setInterval(() => {
          setRevealedIndices(prevRevealed => {
            if (sequential) {
              if (prevRevealed.size < text.length) {
                const nextIndex = getNextIndex(prevRevealed);
                const newRevealed = new Set(prevRevealed);
                newRevealed.add(nextIndex);
                setDisplayText(shuffleText(text, newRevealed));
                return newRevealed;
              } else {
                clearInterval(interval);
                setIsScrambling(false);
                if (onComplete) onComplete();
                return prevRevealed;
              }
            } else {
              // This part is for non-sequential, which we are not using for the name
              setDisplayText(shuffleText(text, prevRevealed));
              if (prevRevealed.size >= text.length) {
                 clearInterval(interval);
                 setIsScrambling(false);
                 setDisplayText(text);
                 if (onComplete) onComplete();
              }
              return prevRevealed;
            }
          });
        }, speed);
      }
    } else {
      setDisplayText(text);
      setRevealedIndices(new Set());
      setIsScrambling(false);
      setIsDelayedPhase(true); // Reset for next trigger
    }

    return () => {
      clearTimeout(delayTimeout);
      clearInterval(interval);
    };
  }, [isHovering, isDelayedPhase, text, speed, sequential, revealDirection, characters, useOriginalCharsOnly, initialDelay, onComplete]);

  useEffect(() => {
    if (animateOn !== 'view' && animateOn !== 'both') return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsHovering(true);
          setHasAnimated(true);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [animateOn, hasAnimated]);

  const hoverProps =
    animateOn === 'hover' || animateOn === 'both'
      ? {
          onMouseEnter: () => setIsHovering(true),
          onMouseLeave: () => setIsHovering(false)
        }
      : {};

  return (
    <motion.span className={parentClassName} ref={containerRef} style={styles.wrapper} {...hoverProps} {...props}>
      <span style={styles.srOnly}>{displayText}</span>

      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          const isRevealedOrDone = revealedIndices.has(index) || !isScrambling;

          return (
            <span key={index} className={isRevealedOrDone ? className : encryptedClassName}>
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
};
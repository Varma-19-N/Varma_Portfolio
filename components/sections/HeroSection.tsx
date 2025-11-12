import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SOCIAL_LINKS } from '../../constants';
import { Section } from '../ui/Section';
import { DecryptedText } from '../ui/DecryptedText';
import { GradientText } from '../ui/GradientText';

export const HeroSection: React.FC = () => {
  const roles = [
    'Data Engineer',
    'Full Stack Developer',
    'Software Engineer',
    'Python Developer',
    'Electronics Engineer'
  ];

  const [index, setIndex] = useState(0);
  const [decryptionComplete, setDecryptionComplete] = useState(false);

  const updateRole = useCallback(() => {
    setIndex((prev) => (prev + 1) % roles.length);
  }, [roles.length]);

  useEffect(() => {
    const interval = setInterval(updateRole, 2500);
    return () => clearInterval(interval);
  }, [updateRole]);

  const name = "NANDI MADAN GOPAL VARMA";

  return (
    <Section id="home" className="flex items-center justify-center text-center overflow-hidden">
      <style>{`
        /* --- Rotating Role Capsule --- */
        .role-capsule {
          background: linear-gradient(90deg, #00ffff, #6a0dad);
          color: #05060a;
          border-radius: 9999px;
          padding: 0.4rem 1rem;
          font-weight: 600;
          font-family: 'Space Grotesk', sans-serif;
          box-shadow:
            0 0 15px rgba(0, 255, 255, 0.3),
            0 0 25px rgba(106, 13, 173, 0.3);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 220px;
          overflow: hidden;
        }
        
        @media (min-width: 768px) {
          .role-capsule {
            min-width: 260px;
            padding: 0.5rem 1.25rem;
          }
        }

        .role-text {
          display: inline-block;
          white-space: nowrap;
        }
      `}</style>

      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* --- Animated Name --- */}
        <div className="py-2 font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider text-center">
          {!decryptionComplete ? (
            <DecryptedText
              text={name}
              animateOn="view"
              sequential={true}
              revealDirection="center"
              speed={150}
              initialDelay={1000}
              onComplete={() => setDecryptionComplete(true)}
              characters="アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
              className="text-cyan-glow"
              encryptedClassName="shiny-text"
            />
          ) : (
            <GradientText
              colors={["#ffffff", "#E0E0E0", "#00FFFF", "#E0E0E0", "#ffffff"]}
              animationSpeed={5}
            >
              {name}
            </GradientText>
          )}
        </div>

        {/* --- Rotating Capsule for Roles --- */}
        <div className="mt-6">
          <div className="role-capsule text-base md:text-xl">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                className="role-text"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{
                  duration: 0.6,
                  ease: 'easeInOut',
                }}
              >
                {roles[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* --- Social Links --- */}
        <div className="mt-8 flex space-x-6">
          {SOCIAL_LINKS.map(({ icon: Icon, href }, i) => (
            <motion.a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-glow transition-transform duration-300 hover:scale-110"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 + i * 0.1 }} // Increased delay
            >
              <Icon className="w-7 h-7 md:w-8 md:h-8" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};
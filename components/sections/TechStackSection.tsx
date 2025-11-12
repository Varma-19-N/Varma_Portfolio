import React from 'react';
import { Section } from '../ui/Section';
import { TECH_STACK } from '../../constants';
import { motion } from 'framer-motion';
import { TypingText } from '../ui/TypingText';

interface TechStackSectionProps {
  isActive?: boolean;
}

const TechCard: React.FC<{ name: string; }> = ({ name }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -5, boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)' }}
      className="p-4 bg-white/5 backdrop-blur-md border border-cyan-glow/20 rounded-xl shadow-lg flex items-center justify-center w-48 h-24"
    >
      <p className="font-body text-lg font-semibold text-white text-center">{name}</p>
    </motion.div>
  );
};

export const TechStackSection: React.FC<TechStackSectionProps> = ({ isActive }) => {
  return (
    <Section id="tech-stack">
      <div className="w-full max-w-6xl mx-auto flex flex-col h-full justify-center">
        <TypingText text="Tech Stack" className="mb-12 text-center" isActive={isActive} />
        <div className="w-full overflow-hidden py-4 marquee-container">
          <div className="flex w-max space-x-8 animate-marquee-tech">
            {/* Render cards twice for a seamless loop */}
            {TECH_STACK.map((skill, index) => (
              <div key={index} className="flex-shrink-0">
                <TechCard name={skill} />
              </div>
            ))}
            {TECH_STACK.map((skill, index) => (
              <div key={`duplicate-${index}`} className="flex-shrink-0">
                <TechCard name={skill} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
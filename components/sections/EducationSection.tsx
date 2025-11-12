import React from 'react';
import { Section } from '../ui/Section';
import { motion } from 'framer-motion';
import { EDUCATION } from '../../constants';
import { TypingText } from '../ui/TypingText';

interface EducationSectionProps {
  isActive?: boolean;
}

const TimelineItem: React.FC<{ item: typeof EDUCATION[0]; isLast: boolean }> = ({ item, isLast }) => (
  <div className="relative pl-8">
    <div className="absolute left-0 top-1 h-full w-px bg-cyan-glow/30">
      {!isLast && <div className="h-full w-full" />}
    </div>
    <div className="absolute left-[-6px] top-1 h-3 w-3 rounded-full bg-cyan-glow shadow-glow-cyan"></div>
    <motion.div
      className="p-4"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="font-heading text-lg md:text-xl font-semibold text-white">{item.degree}</h3>
      <p className="italic text-cyan-glow/80 mt-1">{item.institution}</p>
      <div className="text-sm text-gray-400 mt-2 flex flex-col items-start space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4">
        {item.period && <span>📆 {item.period}</span>}
        <span>{item.details}</span>
      </div>
      <p className="mt-2 text-gray-300 text-sm md:text-base">{item.description}</p>
    </motion.div>
  </div>
);

export const EducationSection: React.FC<EducationSectionProps> = ({ isActive }) => {
  return (
    <Section id="education">
      <div className="w-full max-w-3xl">
        <TypingText text="Education" className="mb-8 md:mb-12 text-center" isActive={isActive} />
        <div className="relative">
          {EDUCATION.map((item, index) => (
            <TimelineItem key={index} item={item} isLast={index === EDUCATION.length - 1} />
          ))}
        </div>
      </div>
    </Section>
  );
};
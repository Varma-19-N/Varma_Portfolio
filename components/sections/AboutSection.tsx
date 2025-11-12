import React from 'react';
import { Section } from '../ui/Section';
import { motion } from 'https://aistudiocdn.com/framer-motion@^12.23.24';
import { TypingText } from '../ui/TypingText';

interface AboutSectionProps {
  isActive?: boolean;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const tags = ["Data Engineer", "Frontend Developer", "Backend Developer", "AI Enthusiast"];

export const AboutSection: React.FC<AboutSectionProps> = ({ isActive }) => {
  return (
    <Section id="about">
      <div className="max-w-3xl text-center">
        <TypingText text="About Me" className="mb-6" isActive={isActive} />
        <motion.p className="text-lg md:text-xl leading-relaxed text-gray-300" initial={{ opacity: 0, y:20 }} whileInView={{ opacity: 1, y:0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          I value every opportunity and channel my energy into meaningful work. Coming from an electronics background, I built my path in software with curiosity, discipline, and hunger to learn. I explore deeply, learn from talented minds, and strive to deliver my best — focusing on impact through consistency, focus, and craftsmanship.
        </motion.p>
        <motion.div 
          className="mt-8 flex flex-wrap justify-center gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {tags.map((tag) => (
            <motion.div key={tag} className="px-4 py-2 border border-cyan-glow/50 rounded-full text-cyan-glow/80 bg-cyan-glow/10 shadow-glow-cyan text-sm" variants={itemVariants}>
              {tag}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};
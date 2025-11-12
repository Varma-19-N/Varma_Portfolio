import React from 'react';
import { Section } from '../ui/Section';
import { motion } from 'https://aistudiocdn.com/framer-motion@^12.23.24';

export const ConsistencySection: React.FC = () => {
  return (
    <Section id="consistency" className="bg-dark-bg">
      <div className="absolute inset-0 bg-[radial-gradient(#00ffff1a_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      <div className="relative z-10 text-center max-w-3xl">
        <motion.h2 
          className="font-heading text-3xl md:text-4xl font-bold italic text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          "Discipline is the bridge between goals and achievement."
        </motion.h2>
        <motion.p 
          className="mt-4 text-lg text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Progress comes from consistency and passion for learning.
          <br />
          Explore my problem-solving journey on LeetCode.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="https://leetcode.com/u/NANDI_MADAN_GOPAL_VARMA/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block px-8 py-3 bg-cyan-glow text-dark-bg font-bold rounded-full transition-all duration-300 hover:bg-transparent hover:text-cyan-glow border-2 border-cyan-glow shadow-glow-cyan"
          >
            LeetCode Profile
          </a>
        </motion.div>
      </div>
    </Section>
  );
};
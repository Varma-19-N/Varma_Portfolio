import React from 'react';
import { Section } from '../ui/Section';
import { motion } from 'framer-motion';
import { TypingText } from '../ui/TypingText';

interface ContactSectionProps {
  isActive?: boolean;
}

const contactLinks = [
  { name: "Email", value: "gopalvarma1135@gmail.com", href: "mailto:gopalvarma1135@gmail.com" },
  { name: "LinkedIn", value: "linkedin.com/in/madan-gopal-varma-nandi", href: "https://www.linkedin.com/in/madan-gopal-varma-nandi/" },
  { name: "GitHub", value: "github.com/Varma-N", href: "https://github.com/Varma-N" },
  { name: "LeetCode", value: "leetcode.com/u/NANDI_MADAN_GOPAL_VARMA/", href: "https://leetcode.com/u/NANDI_MADAN_GOPAL_VARMA/" }
];

export const ContactSection: React.FC<ContactSectionProps> = ({ isActive }) => {
  return (
    <Section id="contact">
      <div className="relative z-10 text-center flex flex-col items-center justify-center h-full">
        <TypingText text="Get In Touch" className="mb-8 text-center" isActive={isActive} />
        <motion.div
          className="p-8 bg-white/5 backdrop-blur-md border border-cyan-glow/20 rounded-xl shadow-glow-cyan max-w-lg w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-4">
            {contactLinks.map((link) => (
              <div key={link.name} className="text-left">
                <p className="text-cyan-glow text-sm">{link.name}</p>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-white hover:underline break-all">
                  {link.value}
                </a>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <footer className="absolute bottom-4 text-center w-full text-gray-500 text-sm">
        <p>Crafted with purpose by Varma © 2025</p>
      </footer>
    </Section>
  );
};
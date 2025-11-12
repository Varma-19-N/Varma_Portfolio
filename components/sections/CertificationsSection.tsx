import React from 'react';
import { Section } from '../ui/Section';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { CERTIFICATIONS } from '../../constants';
import { TypingText } from '../ui/TypingText';

interface CertificationsSectionProps {
  isActive?: boolean;
}

const CertificationCard: React.FC<{ text: string }> = ({ text }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 20 });
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <a 
        href="https://www.linkedin.com/in/madan-gopal-varma-nandi/details/certifications/"
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.05, boxShadow: '0 0 25px 3px rgba(0, 255, 255, 0.5)' }}
          className="relative p-6 bg-white/5 backdrop-blur-md border border-cyan-glow/20 rounded-xl shadow-lg h-full flex items-center justify-center text-center min-h-[160px]"
        >
          <div style={{ transform: 'translateZ(40px)' }}>
            <h3 className="font-body text-lg font-semibold text-white">{text}</h3>
          </div>
        </motion.div>
      </a>
    </motion.div>
  );
};

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ isActive }) => {
  return (
    <Section id="certifications">
      <div className="w-full max-w-6xl mx-auto">
        <TypingText text="Certifications & Achievements" className="mb-12 text-center" isActive={isActive} />
        <div className="w-full overflow-hidden py-4 marquee-container" style={{ perspective: '1000px' }}>
          <div className="flex w-max space-x-8 animate-marquee">
            {/* Render cards twice for a seamless loop */}
            {CERTIFICATIONS.map((cert, index) => (
              <div key={index} className="w-72 md:w-80 flex-shrink-0">
                  <CertificationCard text={cert} />
              </div>
            ))}
            {CERTIFICATIONS.map((cert, index) => (
              <div key={`duplicate-${index}`} className="w-72 md:w-80 flex-shrink-0">
                  <CertificationCard text={cert} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
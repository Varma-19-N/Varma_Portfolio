import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ children, id, className = '' }) => {
  return (
    <section
      id={id}
      className={`h-full w-full relative flex flex-col items-center justify-center p-4 md:p-8 
                 bg-dark-bg border border-cyan-glow/20 rounded-2xl shadow-glow-cyan 
                 ${className}`}
    >
      {children}
    </section>
  );
};
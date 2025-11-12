import React from 'react';
import { Section } from '../ui/Section';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { PROJECTS, Project } from '../../constants';
import { GitHubIcon } from '../ui/Icons';
import { TypingText } from '../ui/TypingText';

interface ProjectsSectionProps {
  isActive?: boolean;
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
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
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full cursor-pointer"
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.05, boxShadow: '0 0 25px 3px rgba(0, 255, 255, 0.5)' }}
          className="relative p-6 bg-white/5 backdrop-blur-md border border-cyan-glow/20 rounded-xl shadow-lg h-full"
        >
          <div style={{ transform: 'translateZ(40px)' }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading text-2xl font-bold text-white">{project.title}</h3>
              <div className="text-gray-400">
                <GitHubIcon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="px-3 py-1 text-xs bg-cyan-glow/10 text-cyan-glow rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </a>
    </motion.div>
  );
};


export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ isActive }) => {
  return (
    <Section id="projects">
      <div className="w-full max-w-6xl mx-auto">
        <TypingText text="Projects" className="mb-12 text-center" isActive={isActive} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ perspective: '1000px' }}>
          {PROJECTS.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </Section>
  );
};
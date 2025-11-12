
import React from 'react';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { EducationSection } from './components/sections/EducationSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { TechStackSection } from './components/sections/TechStackSection';
import { ConsistencySection } from './components/sections/ConsistencySection';
import { ContactSection } from './components/sections/ContactSection';
import { CursorGlow } from './components/ui/CursorGlow';
import { ScrollStack } from './components/ui/ScrollStack';

const App: React.FC = () => {
  return (
    <div className="font-body bg-dark-bg text-gray-200">
      <CursorGlow />
      <ScrollStack>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ProjectsSection />
        <CertificationsSection />
        <TechStackSection />
        <ConsistencySection />
        <ContactSection />
      </ScrollStack>
    </div>
  );
};

export default App;

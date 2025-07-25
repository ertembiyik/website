import React from 'react';
import PersonalHeader from './layout/PersonalHeader';
import AboutSection from './layout/AboutSection';
import ContactSection from './contact/ContactSection';
import TimelineSection from './timeline/TimelineSection';
import SectionDivider from './ui/SectionDivider';
import Spacer from './ui/Spacer';

// Import polyfills for Cloudflare Workers compatibility
import '../polyfills';

import { useIsMobile } from '../hooks/use-is-mobile';

import { personalInfo } from '../data/personalInfo';
import { contactInfo, socialLinks } from '../data/contactInfo';
import { experiences } from '../data/experiences';
import { projects } from '../data/projects';

const Portfolio: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <article className={`page sans ${isMobile ? 'page-mobile' : ''}`}>
      <PersonalHeader personalInfo={personalInfo} isMobile={isMobile} />
      
      <main className={`page-body ${isMobile ? 'page-body-mobile' : ''}`}>
        <ContactSection 
          contactInfo={contactInfo} 
          socialLinks={socialLinks} 
        />
        
        <SectionDivider className={isMobile ? 'divider-mobile' : ''} />
        
        <AboutSection 
          bio={personalInfo.bio} 
          isMobile={isMobile} 
        />
        
        <SectionDivider className={isMobile ? 'divider-mobile' : ''} />
        
        <TimelineSection
          title="Experience"
          items={experiences}
          isMobile={isMobile}
        />
        
        <TimelineSection
          title="Side Projects"
          items={projects}
          isMobile={isMobile}
        />
        
        {/* Replace empty paragraphs with semantic spacers */}
        <Spacer height={isMobile ? '2rem' : '3rem'} className="bottom-spacer" />
      </main>
    </article>
  );
};

export default Portfolio;
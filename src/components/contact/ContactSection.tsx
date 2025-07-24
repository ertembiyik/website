import React from 'react';
import type { ContactInfo, SocialLink } from '../../types';
import { useIsMobile } from '../../hooks/use-is-mobile';
import SocialLinkCard from './SocialLinkCard';

// Contact method component
interface ContactMethodProps {
  title: string;
  value: string;
  href: string;
  width?: string;
  isMobile: boolean;
}

const ContactMethod: React.FC<ContactMethodProps> = ({ 
  title, 
  value, 
  href, 
  width = '33.33%', 
  isMobile 
}) => (
  <div
    style={{ width: isMobile ? '100%' : width }}
    className={`column ${isMobile ? 'contact-method-mobile' : ''}`}
  >
    <p className="block-color-gray">
      <strong>{title}</strong>
    </p>
    <p className="block-color-gray">
      <a href={href}>{value}</a>
    </p>
  </div>
);

// Section header component
interface SectionHeaderProps {
  children: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ children }) => (
  <h2 className="contact-section-header">
    <strong>{children}</strong>
  </h2>
);

// Follow me section component
interface FollowMeSectionProps {
  socialLinks: SocialLink[];
  isMobile: boolean;
}

const FollowMeSection: React.FC<FollowMeSectionProps> = ({ socialLinks, isMobile }) => (
  <>
    <p className="follow-me-label">
      <mark className="highlight-gray"><strong>Follow me</strong></mark>
    </p>
    <div className={`column-list ${isMobile ? 'social-links-mobile' : ''}`}>
      {socialLinks.map((socialLink) => (
        <SocialLinkCard
          key={socialLink.platform}
          socialLink={socialLink}
          isMobile={isMobile}
        />
      ))}
    </div>
  </>
);

interface ContactSectionProps {
  contactInfo: ContactInfo;
  socialLinks: SocialLink[];
}

const ContactSection: React.FC<ContactSectionProps> = ({ contactInfo, socialLinks }) => {
  const isMobile = useIsMobile();
  
  return (
    <section className={`contact-section ${isMobile ? 'contact-section-mobile' : ''}`}>
      <SectionHeader>Contact me</SectionHeader>
      
      <div className={`column-list ${isMobile ? 'contact-methods-mobile' : ''}`}>
        <ContactMethod
          title="Email address"
          value={contactInfo.email}
          href={`mailto:${contactInfo.email}`}
          width="37.5%"
          isMobile={isMobile}
        />
        <ContactMethod
          title="Telegram"
          value={contactInfo.telegram}
          href={`https://${contactInfo.telegram}`}
          width="33.33%"
          isMobile={isMobile}
        />
        {!isMobile && (
          <div
            style={{ width: '29.17%' }}
            className="column contact-spacer"
          >
            <p className="block-color-gray"></p>
          </div>
        )}
      </div>
      
      <FollowMeSection socialLinks={socialLinks} isMobile={isMobile} />
    </section>
  );
};

export default ContactSection;
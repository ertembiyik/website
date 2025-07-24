import React from 'react';
import type { SocialLink } from '../../types';

interface SocialLinkCardProps {
  socialLink: SocialLink;
  isMobile?: boolean;
}

const SocialLinkCard: React.FC<SocialLinkCardProps> = ({ socialLink, isMobile = false }) => {
  return (
    <div
      style={{ width: isMobile ? '100%' : '33.33333333333333%' }}
      className={`column ${isMobile ? 'social-link-mobile' : ''}`}
    >
      <figure
        className="block-color-gray_background callout social-link-card"
        style={{ 
          whiteSpace: 'pre-wrap', 
          display: 'flex',
          marginBottom: isMobile ? '1rem' : '0'
        }}
      >
        <div className="social-icon" style={{ fontSize: '1.5em' }}>
          <img 
            className="icon" 
            src={socialLink.icon} 
            alt={`${socialLink.platform} icon`} 
          />
        </div>
        <div className="social-content" style={{ width: '100%' }}>
          <a 
            href={socialLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            {socialLink.platform}
          </a>
        </div>
      </figure>
    </div>
  );
};

export default SocialLinkCard;
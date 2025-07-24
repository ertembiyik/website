import React from 'react';
import type { PersonalInfo } from '../../types';

interface PersonalHeaderProps {
  personalInfo: PersonalInfo;
  isMobile?: boolean;
}

const PersonalHeader: React.FC<PersonalHeaderProps> = ({ personalInfo, isMobile = false }) => {
  return (
    <>
      <header className={`portfolio-header ${isMobile ? 'portfolio-header-mobile' : ''}`}>
        <h1 className={`page-title ${isMobile ? 'page-title-mobile' : ''}`}>
          {personalInfo.name}
        </h1>
        <p className="page-description"></p>
      </header>
      <div className={`page-body ${isMobile ? 'page-body-mobile' : ''}`}>
        <h3 className={`subtitle ${isMobile ? 'subtitle-mobile' : ''}`}>
          {personalInfo.title}
        </h3>
      </div>
    </>
  );
};

export default PersonalHeader;
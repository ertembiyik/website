import React from 'react';

interface AboutSectionProps {
  bio: string;
  isMobile: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({ bio, isMobile }) => {
  const formatBio = (bioText: string): React.ReactNode[] => {
    const sentences = bioText.split('. ');
    
    return sentences.map((sentence, index) => {
      const isLast = index === sentences.length - 1;
      
      return (
        <React.Fragment key={index}>
          {sentence}{!isLast && '. '}
          {!isMobile && (index === 0 || index === 1) && <br />}
          {isMobile && index < sentences.length - 1 && index % 2 === 1 && <br />}
        </React.Fragment>
      );
    });
  };
  
  return (
    <section className={`about-section ${isMobile ? 'about-section-mobile' : ''}`}>
      <h2 className="section-title">About me</h2>
      <p className={`bio-text ${isMobile ? 'bio-text-mobile' : ''}`}>
        {formatBio(bio)}
        <br />
      </p>
    </section>
  );
};

export default AboutSection;
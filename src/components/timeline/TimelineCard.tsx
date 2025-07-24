import React from 'react';
import type { TimelineItem } from '../../types';
import { useIsMobile } from '../../hooks/use-is-mobile';
import TextWithLinks from '../ui/TextWithLinks';
import TimelineSubtitle from './TimelineSubtitle';

interface TimelineCardProps {
  item: TimelineItem;
}

// Timeline card sub-components
const DateColumn: React.FC<{ item: TimelineItem; isMobile: boolean }> = ({ item, isMobile }) => (
  <div 
    style={{ width: isMobile ? '100%' : '25%' }} 
    className={`column ${isMobile ? 'timeline-date-mobile' : ''}`}
  >
    <p className="">
      <time>{item.dateRange}</time>
    </p>
    {item.status === 'current' && (
      <p className="block-color-gray">
        <mark className="highlight-gray">Now</mark>
      </p>
    )}
  </div>
);

const DescriptionList: React.FC<{ descriptions: string[] }> = ({ descriptions }) => (
  <>
    {descriptions.map((desc, index) => (
      <ul key={`desc-${index}`} className="bulleted-list">
        <li style={{ listStyleType: 'disc' }}>
          <mark className="highlight-gray">
            <TextWithLinks text={desc} />
          </mark>
        </li>
      </ul>
    ))}
  </>
);

const PublicationsList: React.FC<{ publications: TimelineItem['publications'] }> = ({ publications }) => {
  if (!publications || publications.length === 0) return null;
  
  return (
    <>
      <p className="">Publications</p>
      {publications.map((pub, index) => (
        <ul key={`pub-${index}`} className="bulleted-list">
          <li style={{ listStyleType: 'disc' }}>
            <a href={pub.url}>{pub.title}</a>
          </li>
        </ul>
      ))}
    </>
  );
};

const SkillsList: React.FC<{ skills: string[] }> = ({ skills }) => {
  if (skills.length === 0) return null;
  
  return (
    <>
      <p className="">Skills:</p>
      <p className="">
        <mark className="highlight-gray">
          {skills.join(', ')}
        </mark>
      </p>
    </>
  );
};

const ContentColumn: React.FC<{ item: TimelineItem; isMobile: boolean }> = ({ item, isMobile }) => (
  <div 
    style={{ width: isMobile ? '100%' : '75%' }} 
    className={`column ${isMobile ? 'timeline-content-mobile' : ''}`}
  >
    <h3 className="timeline-title">{item.title}</h3>
    <p className="timeline-subtitle">
      <TimelineSubtitle item={item} />
    </p>
    
    <DescriptionList descriptions={item.description} />
    <PublicationsList publications={item.publications} />
    <SkillsList skills={item.skills} />
  </div>
);

const TimelineCard: React.FC<TimelineCardProps> = ({ item }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`column-list ${isMobile ? 'timeline-card-mobile' : ''}`}>
      <DateColumn item={item} isMobile={isMobile} />
      <ContentColumn item={item} isMobile={isMobile} />
    </div>
  );
};

export default TimelineCard;
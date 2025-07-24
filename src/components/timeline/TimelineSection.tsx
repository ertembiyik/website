import React from 'react';
import type { TimelineItem } from '../../types';
import TimelineCard from './TimelineCard';

interface TimelineSectionProps {
  title: string;
  items: TimelineItem[];
  isMobile?: boolean;
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ title, items, isMobile = false }) => {
  return (
    <section className={`timeline-section ${isMobile ? 'timeline-section-mobile' : ''}`}>
      <h2 className={`section-title ${isMobile ? 'section-title-mobile' : ''}`}>
        {title}
      </h2>
      <div className={`timeline-items ${isMobile ? 'timeline-items-mobile' : ''}`}>
        {items.map((item) => (
          <TimelineCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default TimelineSection;
import React from 'react';
import type { TimelineItem } from '../../types';

interface TimelineSubtitleProps {
  item: TimelineItem;
}

const TimelineSubtitle: React.FC<TimelineSubtitleProps> = ({ item }) => {
  if (item.type === 'project') {
    const collaboratorName = item.subtitle.startsWith('Me & ') 
      ? item.subtitle.slice(5)
      : item.subtitle;
    
    return (
      <>
        Me &amp;{' '}
        <a href={item.subtitleUrl}>{collaboratorName}</a>
      </>
    );
  }
  
  return <a href={item.subtitleUrl}>{item.subtitle}</a>;
};

export default TimelineSubtitle;
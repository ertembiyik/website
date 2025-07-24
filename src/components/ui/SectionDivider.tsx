import React from 'react';

interface SectionDividerProps {
  className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ className = '' }) => (
  <hr className={`section-divider ${className}`} />
);

export default SectionDivider;
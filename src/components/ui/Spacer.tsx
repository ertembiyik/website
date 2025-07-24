import React from 'react';

interface SpacerProps {
  height?: string;
  className?: string;
}

const Spacer: React.FC<SpacerProps> = ({ 
  height = '1rem', 
  className = '' 
}) => (
  <div 
    className={`spacer ${className}`}
    style={{ height }}
    aria-hidden="true"
  />
);

export default Spacer;
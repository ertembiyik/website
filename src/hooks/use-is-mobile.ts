import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIsMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < MOBILE_BREAKPOINT);
    };
    
    checkIsMobile();
    
    const handleResize = () => {
      checkIsMobile();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return isMobile;
};

export const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(false);
  
  useEffect(() => {
    const checkIsTablet = () => {
      const width = window.innerWidth;
      setIsTablet(width >= MOBILE_BREAKPOINT && width <= TABLET_BREAKPOINT);
    };
    
    checkIsTablet();
    
    const handleResize = () => {
      checkIsTablet();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return isTablet;
};

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  
  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      if (width < MOBILE_BREAKPOINT) {
        setDeviceType('mobile');
      } else if (width <= TABLET_BREAKPOINT) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };
    
    checkDeviceType();
    
    const handleResize = () => {
      checkDeviceType();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return deviceType;
};
import { useMemo } from 'react';
import { loadCV, type ProfileData } from '@/lib/mdx-loader';

export function useCV(): ProfileData {
  return useMemo(() => {
    return loadCV();
  }, []);
}
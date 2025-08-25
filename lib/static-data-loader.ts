import { ProfileData } from './mdx-loader';

// Load the statically generated CV data
export async function loadCV(): Promise<ProfileData> {
  try {
    // Use dynamic import to load the JSON file at build time
    const response = await fetch(new URL('../public/data/cv.json', import.meta.url));
    
    if (!response.ok) {
      throw new Error(`Failed to load CV data: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data as ProfileData;
  } catch (error) {
    console.error('Failed to load static CV data:', error);
    throw error;
  }
}

// For environments where fetch might not work, fallback to require
export function loadCVSync(): ProfileData {
  try {
    // This works in Node.js environments (like during build)
    const data = require('../public/data/cv.json');
    return data as ProfileData;
  } catch (error) {
    console.error('Failed to load static CV data synchronously:', error);
    throw error;
  }
}
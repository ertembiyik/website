export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
}

export interface SocialLink {
  platform: string;
  username: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  telegram: string;
}

export interface Publication {
  title: string;
  url: string;
}

export interface TimelineItem {
  id: string;
  type: 'experience' | 'project';
  title: string;
  subtitle: string;
  subtitleUrl?: string;
  dateRange: string;
  status?: 'current' | 'completed';
  description: string[];
  skills: string[];
  publications?: Publication[];
}
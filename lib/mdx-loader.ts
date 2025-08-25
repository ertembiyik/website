import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_PATH = path.join(process.cwd(), 'public', 'content', 'sections');

export interface JobData {
  id: string;
  year: string;
  heading: string;
  title: string;
  company: string;
  url?: string;
  location?: string;
  collaborators?: any[];
  attachments?: any[];
  type: string;
  from?: string; // For backwards compatibility
  to?: string;   // For backwards compatibility
  content: string;
}

export interface SideProjectData {
  id: string;
  name: string;
  people?: string;
  from: string;
  to: string;
  year?: string; // For consistency with job schema
  heading?: string; // For consistency with job schema
  url?: string;
  collaborators?: any[];
  attachments?: any[];
  type?: string;
  content: string;
}

export interface TalkData {
  id: string;
  title: string;
  year: string;
  event: string;
  location: string;
  url?: string;
  content: string;
}

export interface GeneralData {
  profilePhoto: string;
  username: string;
  displayName: string;
  profession: string;
  location: string;
  pronouns: string;
  byline: string;
  website: string;
  websiteURL: string;
  about: string;
  status: {
    text: string | null;
    emoji: string | null;
    timestamp: string | null;
  };
  sectionOrder: string[];
}

export interface LinkData {
  platform: string;
  handle: string;
  url: string;
}

export interface EducationData {
  id: string;
  degree: string;
  school: string;
  from: string;
  to: string;
  location?: string;
  content: string;
}

async function loadMDXFile<T extends Record<string, any>>(filePath: string): Promise<T & { id: string; content: string }> {
  const fileContent = await readFile(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const id = path.basename(filePath, '.mdx');

  return {
    id,
    ...data,
    content: content.trim()
  } as T & { id: string; content: string };
}

async function loadMDXFilesFromDirectory<T extends Record<string, any>>(dirPath: string): Promise<(T & { id: string; content: string })[]> {
  try {
    await stat(dirPath);
  } catch {
    return [];
  }

  const files = await readdir(dirPath);
  const mdxFiles = files
    .filter((file: string) => file.endsWith('.mdx'))
    .filter((file: string) => !file.startsWith('.'));

  const loadPromises = mdxFiles.map((file: string) => {
    const filePath = path.join(dirPath, file);
    return loadMDXFile<T>(filePath);
  });

  return Promise.all(loadPromises);
}

async function loadMDXLinksFromDirectory(dirPath: string): Promise<LinkData[]> {
  try {
    await stat(dirPath);
  } catch {
    return [];
  }

  const files = await readdir(dirPath);
  const mdxFiles = files
    .filter((file: string) => file.endsWith('.mdx'))
    .filter((file: string) => !file.startsWith('.'));

  const loadPromises = mdxFiles.map(async (file: string) => {
    const filePath = path.join(dirPath, file);
    const fileContent = await readFile(filePath, 'utf-8');
    const { data } = matter(fileContent);
    return data as LinkData;
  });

  return Promise.all(loadPromises);
}

export async function loadGeneralData(): Promise<GeneralData> {
  const generalPath = path.join(CONTENT_PATH, 'general.mdx');

  try {
    const fileContent = await readFile(generalPath, 'utf-8');
    const { data } = matter(fileContent);
    
    if (!data || !data.profilePhoto) {
      console.error('Invalid general data structure:', data);
      throw new Error('Missing required fields in general.mdx');
    }
    
    return data as GeneralData;
  } catch (error) {
    console.error('Failed to load general data from:', generalPath);
    console.error('Error:', error);
    throw error;
  }
}

export async function loadJobs(): Promise<JobData[]> {
  const jobsPath = path.join(CONTENT_PATH, 'jobs');
  return loadMDXFilesFromDirectory<JobData>(jobsPath);
}

export async function loadSideProjects(): Promise<SideProjectData[]> {
  const projectsPath = path.join(CONTENT_PATH, 'side-projects');
  return loadMDXFilesFromDirectory<SideProjectData>(projectsPath);
}

export async function loadTalks(): Promise<TalkData[]> {
  const talksPath = path.join(CONTENT_PATH, 'talks');
  return loadMDXFilesFromDirectory<TalkData>(talksPath);
}

export async function loadLinks(): Promise<LinkData[]> {
  const linksPath = path.join(CONTENT_PATH, 'links');
  return loadMDXLinksFromDirectory(linksPath);
}

export async function loadEducation(): Promise<EducationData[]> {
  const educationPath = path.join(CONTENT_PATH, 'education');
  return loadMDXFilesFromDirectory<EducationData>(educationPath);
}

// Define the return type for the profile data
export interface ProfileData {
  general: GeneralData;
  projects: any[];
  sideProjects: any[];
  exhibitions: any[];
  talks: any[];
  writing: any[];
  awards: any[];
  features: any[];
  workExperience: any[];
  volunteering: any[];
  education: any[];
  certifications: any[];
  contact: any[];
  allCollections: Array<{
    name: string;
    items: any[];
  }>;
}

// Cache for loaded data
let cachedData: ProfileData | null = null;

// Convert MDX data to the format expected by the application
export async function loadCV(): Promise<ProfileData> {
  if (cachedData) {
    return cachedData;
  }

  try {
    const [general, jobs, sideProjects, talks, links] = await Promise.all([
      loadGeneralData(),
      loadJobs(),
      loadSideProjects(),
      loadTalks(),
      loadLinks()
    ]);

    const workExperience = jobs.map(job => ({
      id: job.id,
      year: job.year || `${job.from} — ${job.to}`,
      heading: job.heading || `${job.title} at ${job.company}`,
      url: job.url || null,
      collaborators: job.collaborators || [],
      description: job.content.replace(/^- /gm, '').trim(),
      attachments: job.attachments || [],
      type: 'workExperience' as const,
      title: job.title,
      company: job.company,
      location: job.location || ''
    }));

    const sideProjectsData = sideProjects.map(project => ({
      id: project.id,
      year: project.year || (project.from === project.to ? project.from : `${project.from} — ${project.to}`),
      heading: project.heading || project.name,
      url: project.url || null,
      collaborators: project.collaborators || [],
      description: project.content.replace(/^- /gm, '').trim(),
      attachments: project.attachments || [],
      type: 'sideProject' as const,
      title: project.name,
      company: null
    }));

    const speaking = talks.map(talk => ({
      id: talk.id,
      year: talk.year,
      heading: talk.title,
      url: talk.url || null,
      event: talk.event,
      location: talk.location,
      description: talk.content.replace(/^- /gm, '').trim(),
      type: 'talk' as const
    }));

    const contact = links.map((link, index) => ({
      id: `link-${index}`,
      platform: link.platform,
      handle: link.handle,
      url: link.url
    }));

    const result = {
      general: general,
      projects: [],
      sideProjects: sideProjectsData,
      exhibitions: [],
      talks: speaking,
      writing: [],
      awards: [],
      features: [],
      workExperience,
      volunteering: [],
      education: [],
      certifications: [],
      contact,
      allCollections: [
        {
          name: 'Work Experience',
          items: workExperience
        },
        {
          name: 'Side Projects',
          items: sideProjectsData
        },
        {
          name: 'Speaking',
          items: speaking
        },
        {
          name: 'Contact',
          items: contact
        }
      ]
    };

    cachedData = result;

    return result;
  } catch (error) {
    console.error('Failed to load MDX data:', error);
    throw new Error(`Failed to load CV data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
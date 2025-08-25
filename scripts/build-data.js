const fs = require('fs/promises');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_PATH = path.join(process.cwd(), 'public', 'content', 'sections');
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'data', 'cv.json');

async function loadMDXFile(filePath) {
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const id = path.basename(filePath, '.mdx');

  return {
    id,
    ...data,
    content: content.trim()
  };
}

async function loadMDXFilesFromDirectory(dirPath) {
  try {
    await fs.stat(dirPath);
  } catch {
    return [];
  }

  const files = await fs.readdir(dirPath);
  const mdxFiles = files
    .filter(file => file.endsWith('.mdx'))
    .filter(file => !file.startsWith('.'));

  const loadPromises = mdxFiles.map(file => {
    const filePath = path.join(dirPath, file);
    return loadMDXFile(filePath);
  });

  return Promise.all(loadPromises);
}

async function loadMDXLinksFromDirectory(dirPath) {
  try {
    await fs.stat(dirPath);
  } catch {
    return [];
  }

  const files = await fs.readdir(dirPath);
  const mdxFiles = files
    .filter(file => file.endsWith('.mdx'))
    .filter(file => !file.startsWith('.'));

  const loadPromises = mdxFiles.map(async file => {
    const filePath = path.join(dirPath, file);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data } = matter(fileContent);
    return data;
  });

  return Promise.all(loadPromises);
}

async function loadGeneralData() {
  const generalPath = path.join(CONTENT_PATH, 'general.mdx');

  try {
    const fileContent = await fs.readFile(generalPath, 'utf-8');
    const { data } = matter(fileContent);
    
    if (!data || !data.profilePhoto) {
      console.error('Invalid general data structure:', data);
      throw new Error('Missing required fields in general.mdx');
    }
    
    return data;
  } catch (error) {
    console.error('Failed to load general data from:', generalPath);
    console.error('Error:', error);
    throw error;
  }
}

async function loadJobs() {
  const jobsPath = path.join(CONTENT_PATH, 'jobs');
  return loadMDXFilesFromDirectory(jobsPath);
}

async function loadSideProjects() {
  const projectsPath = path.join(CONTENT_PATH, 'side-projects');
  return loadMDXFilesFromDirectory(projectsPath);
}

async function loadTalks() {
  const talksPath = path.join(CONTENT_PATH, 'talks');
  return loadMDXFilesFromDirectory(talksPath);
}

async function loadLinks() {
  const linksPath = path.join(CONTENT_PATH, 'links');
  return loadMDXLinksFromDirectory(linksPath);
}

async function buildCV() {
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
      type: 'workExperience',
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
      type: 'sideProject',
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
      type: 'talk'
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

    // Ensure output directory exists
    await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
    
    // Write the result to a JSON file
    await fs.writeFile(OUTPUT_PATH, JSON.stringify(result, null, 2));
    
    console.log('✅ CV data built successfully at:', OUTPUT_PATH);
    return result;
  } catch (error) {
    console.error('❌ Failed to build CV data:', error);
    throw error;
  }
}

// Run the build if this script is called directly
if (require.main === module) {
  buildCV().catch(error => {
    console.error('Build failed:', error);
    process.exit(1);
  });
}

module.exports = { buildCV };
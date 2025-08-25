import { promises as fs } from 'fs';
import CaseStudy from './CaseStudy';
import { loadCV } from "@/lib/mdx-loader";

export const dynamic = 'force-static';

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const cv = await loadCV();

  const slug = (await params).slug;
  const file = await fs.readFile(process.cwd() + `/public/content/${slug}.md`, 'utf8');

  return (
    <div>
      <CaseStudy cv={cv} markdownText={file} />
    </div>
  );
}

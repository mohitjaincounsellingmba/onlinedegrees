import fs from 'fs';
import path from 'path';
import { cache } from 'react';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  description?: string;
  keywords?: string[];
  content?: string;
  faqs?: { question: string; answer: string }[];
  category?: string;
}

function inferCategory(data: any, slug: string): string {
  const textToSearch = `${slug} ${data.title} ${(data.keywords || []).join(' ')} ${data.category || ''}`.toLowerCase();
  
  // 1. Check if it's an MBA or PGDM program first
  if (textToSearch.includes('mba') || textToSearch.includes('pgdm')) {
    return 'Online MBA';
  }

  // 2. Check for mock tests
  if (textToSearch.includes('mock test') || textToSearch.includes('nmat mock') || textToSearch.includes('cat mock')) {
    return 'Mock Tests';
  }

  // 3. Check for entrance exams or coaching
  if (textToSearch.includes('exam') || textToSearch.includes('coaching') || textToSearch.includes('preparation') || textToSearch.includes('syllabus') || textToSearch.includes('entrance')) {
    return 'Entrance Exams';
  }

  // 4. Check for course creation or e-learning platforms
  if (textToSearch.includes('sell-courses') || textToSearch.includes('sell your coaching') || textToSearch.includes('platform')) {
    return 'E-Learning Tools';
  }

  // 5. Check for career, job, hiring, salary
  if (textToSearch.includes('job') || textToSearch.includes('salary') || textToSearch.includes('career') || textToSearch.includes('hiring')) {
    return 'Career Guidance';
  }

  // All other posts (BBA, BCA, MCA, MSc, B.Tech reviews, general degree reviews) are "Online Degrees"
  return 'Online Degrees';
}

export const getSortedPostsData = cache(() => {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      const title = matterResult.data.title ? String(matterResult.data.title) : 'Untitled Post';
      const date = matterResult.data.date 
        ? (matterResult.data.date instanceof Date 
            ? matterResult.data.date.toISOString().split('T')[0] 
            : String(matterResult.data.date)) 
        : new Date().toISOString().split('T')[0];

      return {
        slug,
        title,
        date,
        description: matterResult.data.description || '',
        keywords: matterResult.data.keywords || [],
        category: inferCategory(matterResult.data, slug),
      };
    })
    .filter(post => post.title !== 'Untitled Post');

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
});

export function getPostData(slug: string): PostData | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const title = matterResult.data.title ? String(matterResult.data.title) : 'Untitled Post';
    const date = matterResult.data.date 
      ? (matterResult.data.date instanceof Date 
          ? matterResult.data.date.toISOString().split('T')[0] 
          : String(matterResult.data.date)) 
      : new Date().toISOString().split('T')[0];

    return {
      slug,
      title,
      date,
      description: matterResult.data.description,
      keywords: matterResult.data.keywords || [],
      content: matterResult.content,
      faqs: matterResult.data.faqs || [],
      category: inferCategory(matterResult.data, slug),
    };
  } catch (e) {
    return null;
  }
}

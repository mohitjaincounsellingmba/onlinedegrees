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
  if (data.category && data.category.trim() !== '') {
    const rawCategory = data.category.toLowerCase();
    if (rawCategory.includes('mba') || rawCategory.includes('pgdm')) return 'Online MBA';
    if (rawCategory.includes('bba')) return 'Online BBA';
    if (rawCategory.includes('bca')) return 'Online BCA';
    if (rawCategory.includes('mca')) return 'Online MCA';
    if (rawCategory.includes('msc')) return 'Online MSc';
    if (rawCategory.includes('btech') || rawCategory.includes('b.tech')) return 'Online B.Tech';
    if (rawCategory.includes('job') || rawCategory.includes('career')) return 'Careers';
    if (rawCategory.includes('exam')) return 'Exams';
    if (rawCategory.includes('online')) return 'Online Degrees';
    return data.category;
  }

  const textToSearch = `${slug} ${data.title} ${(data.keywords || []).join(' ')}`.toLowerCase();
  
  if (textToSearch.includes('mba') || textToSearch.includes('pgdm')) return 'Online MBA';
  if (textToSearch.includes('bba')) return 'Online BBA';
  if (textToSearch.includes('bca')) return 'Online BCA';
  if (textToSearch.includes('mca')) return 'Online MCA';
  if (textToSearch.includes('msc')) return 'Online MSc';
  if (textToSearch.includes('btech') || textToSearch.includes('b.tech')) return 'Online B.Tech';
  if (textToSearch.includes('hiring') || textToSearch.includes('job') || textToSearch.includes('salary')) return 'Careers';
  if (textToSearch.includes('exam') || textToSearch.includes('mock test') || textToSearch.includes('result')) return 'Exams';
  
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

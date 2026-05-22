import fs from 'fs';
import path from 'path';
import { cache } from 'react';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');
const blogsDirectory = path.join(process.cwd(), 'blogs');

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
  const rootDirectory = process.cwd();
  const directories = [postsDirectory, blogsDirectory, rootDirectory].filter(dir => fs.existsSync(dir));
  const allPostsData: PostData[] = [];


  directories.forEach(dir => {
    const fileNames = fs.readdirSync(dir);
    const posts = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(dir, fileName);
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
        } as PostData;
      })
      .filter(post => post.title !== 'Untitled Post');
    allPostsData.push(...posts);
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
});

function parseFaqsFromContent(content: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  
  const faqSectionIndex = content.search(/##\s+.*(?:FAQ|Frequently Asked Questions)/i);
  if (faqSectionIndex === -1) return [];
  
  const faqSection = content.substring(faqSectionIndex);
  const lines = faqSection.split('\n');
  let currentQuestion = '';
  let currentAnswerLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const headingMatch = line.match(/^###\s+(?:Q\d*[\.:\s]+)?(.*)/i);
    const boldMatch = line.match(/^\*\*(?:Q\d*[\.:\s]+)?([^*]+)\*\*/i);
    
    let questionText = '';
    if (headingMatch) {
      questionText = headingMatch[1].trim();
    } else if (boldMatch) {
      const candidate = boldMatch[1].trim();
      const isExplicitQ = line.match(/^\*\*(?:Q\d*[\.:\s]+)/i);
      const endsWithQuestionMark = candidate.endsWith('?');
      if (isExplicitQ || endsWithQuestionMark) {
        questionText = candidate;
      }
    }
    
    if (questionText) {
      if (currentQuestion && currentAnswerLines.length > 0) {
        faqs.push({
          question: currentQuestion,
          answer: currentAnswerLines.join(' ').replace(/\s+/g, ' ').trim()
        });
      }
      currentQuestion = questionText;
      currentAnswerLines = [];
    } else if (currentQuestion) {
      if (line.startsWith('## ') || line.startsWith('---') || line.startsWith('[👉')) {
        break;
      }
      currentAnswerLines.push(line);
    }
  }
  
  if (currentQuestion && currentAnswerLines.length > 0) {
    faqs.push({
      question: currentQuestion,
      answer: currentAnswerLines.join(' ').replace(/\s+/g, ' ').trim()
    });
  }
  
  return faqs;
}

export function getPostData(slug: string): PostData | null {
  try {
    let fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(blogsDirectory, `${slug}.md`);
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const title = matterResult.data.title ? String(matterResult.data.title) : 'Untitled Post';
    const date = matterResult.data.date 
      ? (matterResult.data.date instanceof Date 
          ? matterResult.data.date.toISOString().split('T')[0] 
          : String(matterResult.data.date)) 
      : new Date().toISOString().split('T')[0];

    const parsedFaqs = matterResult.data.faqs && matterResult.data.faqs.length > 0
      ? matterResult.data.faqs
      : parseFaqsFromContent(matterResult.content || '');

    return {
      slug,
      title,
      date,
      description: matterResult.data.description,
      keywords: matterResult.data.keywords || [],
      content: matterResult.content,
      faqs: parsedFaqs,
      category: inferCategory(matterResult.data, slug),
    };
  } catch (e) {
    return null;
  }
}

import { getSortedPostsData } from '@/lib/markdown';
import { BlogClient } from '@/components/BlogClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "University Reviews & Career Blog | Online Degree Hub",
  description: "Read verified reviews of UGC approved online universities in India. Get expert advice on MBA, BBA, MCA, BCA fees, accreditations, and placements.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const posts = getSortedPostsData();

  // Strip content key from posts headers so we don't send large content arrays to the client component
  const postHeaders = posts.map(({ slug, title, date, description, category }) => ({
    slug,
    title,
    date,
    description: description || '',
    category: category || 'Online Degrees',
  }));

  return <BlogClient posts={postHeaders} />;
}

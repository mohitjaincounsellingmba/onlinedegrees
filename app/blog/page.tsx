import { getSortedPostsData } from '@/lib/markdown';
import { BlogClient } from '@/components/BlogClient';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: "University Reviews & Career Blog | Online Shiksha",
  description: "Read verified reviews of UGC approved online universities in India. Get expert advice on MBA, BBA, MCA, BCA fees, accreditations, and placements.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const posts = getSortedPostsData();

  // Filter and strip content key from posts headers
  const postHeaders = posts
    .filter(post => {
      const s = post.slug.toLowerCase();
      // Only keep degree/university related posts
      return s.includes('mba') || s.includes('mca') || s.includes('bba') || s.includes('bca') || s.includes('msc') || s.includes('university') || s.includes('review') || s.includes('degree');
    })
    .filter(post => {
      const s = post.slug.toLowerCase();
      // Explicitly exclude mock tests and coaching
      return !s.includes('mock-test') && !s.includes('coaching') && !s.includes('sell-courses');
    })
    .map(({ slug, title, date, description, category }) => ({
      slug,
      title,
      date,
      description: description || '',
      category: category || 'Online Degrees',
    }));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://onlineshiksha.online/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://onlineshiksha.online/blog"
      }
    ]
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <BlogClient posts={postHeaders} />;
    </>
  );
}

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

  // No keyword filtering – include all posts
  const postHeaders = posts.map(({ slug, title, date, description, category }) => ({
    slug,
    title,
    date,
    description: description || '',
    category: category || 'Online Degrees',
  }));
  const totalBlogs = postHeaders.length;

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
      <BlogClient posts={postHeaders} totalBlogs={totalBlogs} />
    </>
  );
}

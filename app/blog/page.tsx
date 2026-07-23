import { getSortedPostsData } from '@/lib/markdown';
import { BlogClient } from '@/components/BlogClient';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: "University Reviews & Career Blog 2026 | Online Shiksha",
  description: "Read verified reviews of UGC approved online universities in India. Get expert advice on MBA, BBA, MCA, BCA fees, accreditations, and placements.",
  keywords: [
    "online degree reviews", "UGC approved university blogs", "online MBA reviews",
    "distance education reviews India", "online college fees guide 2026"
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "University Reviews & Career Blog 2026 | Online Shiksha",
    description: "Read verified reviews of UGC approved online universities in India. Get expert advice on fees, accreditations, and placements.",
    url: "https://onlineshiksha.online/blog",
    siteName: "Online Shiksha",
    type: "website",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Online Shiksha Blog - University Reviews & Career Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "University Reviews & Career Blog 2026 | Online Shiksha",
    description: "Read verified reviews of UGC approved online universities in India. Get expert advice on fees, accreditations, and placements.",
    images: ["/og-image.webp"],
  },
};

export default function BlogPage() {
  const posts = getSortedPostsData();

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

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "University Reviews & Career Blog 2026",
    "description": "Read verified reviews of UGC approved online universities in India. Get expert advice on MBA, BBA, MCA, BCA fees, accreditations, and placements.",
    "url": "https://onlineshiksha.online/blog",
    "numberOfItems": totalBlogs
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionSchema} />
      <BlogClient posts={postHeaders} totalBlogs={totalBlogs} />
    </>
  );
}

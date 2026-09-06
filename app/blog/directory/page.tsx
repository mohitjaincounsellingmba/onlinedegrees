import { getSortedPostsData } from '@/lib/markdown';
import { BlogDirectoryClient } from '@/components/BlogDirectoryClient';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: "All University Reviews & Online Degree Guides Directory 2026 | Online Shiksha",
  description: "Browse our complete directory of 2,800+ expert university reviews, fee breakdowns, UGC approvals, syllabus comparisons, and placement reports for online MBA, MCA, BBA, and BCA programs.",
  keywords: [
    "online degree blog directory", "online MBA review directory", "UGC approved university guides",
    "distance education directory India", "online university admission reviews 2026"
  ],
  alternates: {
    canonical: "/blog/directory/",
  },
  openGraph: {
    title: "All University Reviews & Online Degree Guides Directory 2026 | Online Shiksha",
    description: "Browse our complete directory of 2,800+ expert university reviews, fee breakdowns, UGC approvals, and placement reports.",
    url: "https://onlineshiksha.online/blog/directory/",
    siteName: "Online Shiksha",
    type: "website",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Online Shiksha Blog Directory - All University Reviews",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All University Reviews & Online Degree Guides Directory 2026 | Online Shiksha",
    description: "Browse our complete directory of 2,800+ expert university reviews, fee breakdowns, UGC approvals, and placement reports.",
    images: ["/og-image.webp"],
  },
};

export default function BlogDirectoryPage() {
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
        "item": "https://onlineshiksha.online/blog/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Directory",
        "item": "https://onlineshiksha.online/blog/directory/"
      }
    ]
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "All University Reviews & Online Degree Guides Directory 2026",
    "description": "Browse our complete directory of 2,800+ expert university reviews, fee breakdowns, UGC approvals, syllabus comparisons, and placement reports.",
    "url": "https://onlineshiksha.online/blog/directory/",
    "numberOfItems": totalBlogs
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionSchema} />
      <BlogDirectoryClient posts={postHeaders} />
    </>
  );
}

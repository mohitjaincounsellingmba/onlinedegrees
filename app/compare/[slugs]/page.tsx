import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { collegesData } from '@/lib/colleges';
import { CompareClient } from '@/components/CompareClient';
import { JsonLd } from '@/components/JsonLd';

interface PageProps {
  params: Promise<{ slugs: string }>;
}

// Helper to parse slugs
function parseSlugs(slugsParam: string) {
  if (!slugsParam) return null;
  const parts = slugsParam.split('-vs-');
  if (parts.length !== 2) return null;
  
  const [slug1, slug2] = parts;
  const col1 = collegesData.find(c => c.slug === slug1);
  const col2 = collegesData.find(c => c.slug === slug2);
  
  if (!col1 || !col2) return null;
  return { col1, col2 };
}

// Generate metadata dynamically for the comparison page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slugs } = await params;
  const parsed = parseSlugs(slugs);
  
  if (!parsed) return {};
  
  const { col1, col2 } = parsed;
  const title = `${col1.name} vs ${col2.name} Comparison: Fees, Placements & Reviews 2026`;
  const description = `Compare ${col1.name} vs ${col2.name} side-by-side. Get detailed breakdown of total fees (${col1.feeText} vs ${col2.feeText}), placements, accreditations, and LMS before taking admission.`;
  
  // Sort alphabetically to maintain a single canonical version
  const sortedSlugs = [col1.slug, col2.slug].sort();
  const canonicalUrl = `/compare/${sortedSlugs[0]}-vs-${sortedSlugs[1]}`;

  return {
    title,
    description,
    keywords: [
      `${col1.name} vs ${col2.name}`,
      `compare ${col1.name} and ${col2.name}`,
      `${col1.name} online fees vs ${col2.name}`,
      `best online MBA colleges India 2026`
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://onlineshiksha.online/compare/${slugs}`,
    }
  };
}

// Pre-generate static paths for all 561 unique comparison combinations (SSG)
export async function generateStaticParams() {
  const params: { slugs: string }[] = [];
  
  // Sort colleges alphabetically by slug to ensure canonical-consistent paths
  const sortedColleges = [...collegesData].sort((a, b) => a.slug.localeCompare(b.slug));
  
  for (let i = 0; i < sortedColleges.length; i++) {
    for (let j = i + 1; j < sortedColleges.length; j++) {
      params.push({
        slugs: `${sortedColleges[i].slug}-vs-${sortedColleges[j].slug}`,
      });
    }
  }
  
  return params;
}

export default async function CompareDetailPage({ params }: PageProps) {
  const { slugs } = await params;
  const parsed = parseSlugs(slugs);
  
  if (!parsed) {
    notFound();
  }
  
  const { col1, col2 } = parsed;
  
  // Sort alphabetically to maintain a single canonical version
  const sortedSlugs = [col1.slug, col2.slug].sort();
  const sortedSlugPair = `${sortedSlugs[0]}-vs-${sortedSlugs[1]}`;

  if (slugs !== sortedSlugPair) {
    permanentRedirect(`/compare/${sortedSlugPair}`);
  }
  
  // Setup Breadcrumb schema
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
        "name": "Compare Universities",
        "item": "https://onlineshiksha.online/compare"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${col1.name} vs ${col2.name}`,
        "item": `https://onlineshiksha.online/compare/${slugs}`
      }
    ]
  };

  // Setup Comparative FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How do the fees of ${col1.name} compare with ${col2.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The total tuition fee for ${col1.name} is approximately ${col1.feeText}, while ${col2.name} costs about ${col2.feeText}.`
        }
      },
      {
        "@type": "Question",
        "name": `Which university has better accreditations between ${col1.name} and ${col2.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${col1.name} holds accreditations of ${col1.accreditation}. In comparison, ${col2.name} holds accreditations of ${col2.accreditation}. both are UGC approved for offering valid online degrees.`
        }
      },
      {
        "@type": "Question",
        "name": `What are the average placement packages for ${col1.name} and ${col2.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${col1.name} features placements averaging around ${col1.packageText}, whereas ${col2.name} averages around ${col2.packageText}.`
        }
      }
    ]
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <CompareClient initialSlug1={col1.id} initialSlug2={col2.id} />
    </>
  );
}

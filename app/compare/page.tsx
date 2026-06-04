import { CompareClient } from '@/components/CompareClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Compare Online Universities | Online Shiksha",
  description: "Compare fees, placements, approvals, and features of top UGC approved online universities.",
  alternates: {
    canonical: "/compare",
  },
};

export default function ComparePage() {
  return <CompareClient />;
}

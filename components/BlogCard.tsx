import Link from "next/link";
import { GraduationCap, Calendar, ArrowRight } from "lucide-react";
import styles from "@/app/blog/blog.module.css";

interface BlogCardProps {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
}

const COLLEGE_IMAGES = [
  // Beautiful classic university brick campus building
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
  // University graduation / degree ceremony / classroom
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80",
  // Group of diverse college students studying together
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
  // Modern university library/hall
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?auto=format&fit=crop&w=600&q=80",
  // Modern university student standing in campus hallway
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80",
  // Modern college classroom/lecture hall
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
  // Books and graduation cap
  "https://images.unsplash.com/photo-1558021211-6d1403321394?auto=format&fit=crop&w=600&q=80",
  // University library study session
  "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80",
  // Online education / studying on laptop
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80"
];

function getCollegeImage(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % COLLEGE_IMAGES.length;
  return COLLEGE_IMAGES[index];
}

export default function BlogCard({ slug, title, date, description, category }: BlogCardProps) {
  // Curated, beautiful college & university campus image based on slug
  const imageUrl = getCollegeImage(slug);

  return (
    <Link href={`/blog/${slug}`} className={styles.blogCard}>
      {/* Image */}
      <div className={styles.blogImageWrapper}>
        <img src={imageUrl} alt={title} className={styles.blogImage} loading="lazy" />
      </div>

      {/* Meta */}
      <div className={styles.blogMeta}>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide">
          <GraduationCap className="h-3.5 w-3.5" />
          {category || "Online Degrees"}
        </span>
        <span className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
          <Calendar className="h-3.5 w-3.5" />
          {date}
        </span>
      </div>

      {/* Title & Excerpt */}
      <h3 className={styles.blogTitle}>{title}</h3>
      <p className={styles.blogExcerpt}>{description || ""}</p>

      {/* Read More */}
      <span className={styles.readMore}>Read Full Review <ArrowRight className="h-4 w-4" /></span>
    </Link>
  );
}

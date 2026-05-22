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

export default function BlogCard({ slug, title, date, description, category }: BlogCardProps) {
  // Placeholder image URL – can be replaced with actual thumbnail images.
// Image placeholder removed (no thumbnail)

  return (
    <Link
      href={`/blog/${slug}`}
      className={styles.blogCard}
    >


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
      <span className={styles.readMore}>
        Read Full Review <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

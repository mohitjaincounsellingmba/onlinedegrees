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
  "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=600",
  // Stack of books / university library desk
  "https://images.pexels.com/photos/159844/pexels-photo-159844.jpeg?auto=compress&cs=tinysrgb&w=600",
  // Group of diverse college students studying together
  "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=600",
  // Books stack with graduation cap
  "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=600",
  // Laptop with student hands writing / tech learning
  "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=600",
  // Young students working on group study
  "https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=600",
  // Graduation cap throwing celebration
  "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=600",
  // Classic university library interior hall
  "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=600",
  // Modern campus buildings quad
  "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=600",
  // Student with headphones studying online on a laptop
  "https://images.pexels.com/photos/3762185/pexels-photo-3762185.jpeg?auto=compress&cs=tinysrgb&w=600"
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

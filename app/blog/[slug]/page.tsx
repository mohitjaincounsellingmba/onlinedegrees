import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostData, getSortedPostsData } from "@/lib/markdown";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, User, MessageSquare, BookOpen, CheckCircle, GraduationCap } from 'lucide-react';
import { JsonLd } from "@/components/JsonLd";
import { InquiryForm } from "@/components/InquiryForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const postData = getPostData(slug);

  if (!postData) return {};

  const postTitle = `${postData.title} - UGC Approved Course Reviews`;
  
  let postDescription = postData.description;
  if (!postDescription && postData.content) {
    postDescription = postData.content.substring(0, 160).replace(/[#*`]/g, '').trim() + "...";
  }
  postDescription = postDescription || `Verified details for ${postData.title}. Detailed insights on course fees, UGC eligibility, approvals, and placements.`;

  return {
    title: postTitle,
    description: postDescription,
    keywords: [...(postData.keywords || []), "Online Degrees India", "Distance Education Review", "UGC Approved MBA", "Online College Placements"],
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: postTitle,
      description: postDescription,
      type: "article",
      publishedTime: postData.date,
      authors: ["Online Degree Hub Editor"],
    }
  };
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const postData = getPostData(slug);

  if (!postData) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": postData.title,
    "description": postData.description || postData.content?.substring(0, 160),
    "datePublished": postData.date,
    "dateModified": postData.date,
    "author": {
      "@type": "Organization",
      "name": "Online Degree Hub Team",
      "url": "https://onlinedegreehub.in"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Online Degree Hub",
      "logo": {
        "@type": "ImageObject",
        "url": "https://onlinedegreehub.in/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://onlinedegreehub.in/blog/${slug}`
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://onlinedegreehub.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://onlinedegreehub.in/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": postData.title,
        "item": `https://onlinedegreehub.in/blog/${slug}`
      }
    ]
  };

  const faqSchema = postData.faqs && postData.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": postData.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <article className="min-h-screen bg-[#f8f7f4] py-12 md:py-20">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <div className="max-w-6xl mx-auto px-6">
        
        {/* ── BREADCRUMBS & BACK LINK ── */}
        <div className="flex flex-col gap-4 mb-8">
          <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-indigo-600 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-slate-600 truncate max-w-[200px] sm:max-w-sm">{postData.title}</span>
          </nav>
          
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-950 font-black text-xs uppercase tracking-wider group transition-all"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
            Back to Reviews & Guides
          </Link>
        </div>

        {/* ── MAIN LAYOUT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── LEFT: ARTICLE CONTENT (8 COLS) ── */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-100/50">
              
              {/* Header Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-50 pb-6 mb-8">
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider">
                  {postData.category || 'Online Degrees'}
                </span>
                
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>{postData.date}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <User className="h-4 w-4" />
                    <span>Academic Board</span>
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                {postData.title}
              </h1>

              {postData.description && (
                <div className="border-l-4 border-indigo-500 pl-4 py-1.5 mb-8">
                  <p className="text-slate-600 font-semibold text-base md:text-lg leading-relaxed">
                    {postData.description}
                  </p>
                </div>
              )}

              {/* Parsed Body Content */}
              <div className="prose-custom">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h2: ({ node, ...props }) => (
                      <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-snug mt-10 mb-4 border-b border-slate-50 pb-2 uppercase" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-lg md:text-xl font-black text-indigo-600 tracking-tight mt-6 mb-3" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="text-slate-600 text-sm md:text-base font-semibold leading-relaxed mb-6" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-600 text-sm md:text-base font-semibold" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal pl-6 space-y-2 mb-6 text-slate-600 text-sm md:text-base font-semibold" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="pl-1" {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote className="border-l-4 border-indigo-500 bg-indigo-50/50 rounded-r-2xl px-6 py-4 my-8 font-semibold italic text-slate-700" {...props} />
                    ),
                    table: ({ node, ...props }) => (
                      <div className="overflow-x-auto my-8 rounded-2xl border border-slate-100 shadow-sm">
                        <table className="w-full border-collapse bg-white text-left text-sm" {...props} />
                      </div>
                    ),
                    thead: ({ node, ...props }) => (
                      <thead className="bg-slate-50 text-slate-900 border-b border-slate-100 font-black uppercase text-[10px] tracking-wider" {...props} />
                    ),
                    th: ({ node, ...props }) => (
                      <th className="px-4 py-3.5 border-r border-slate-100 last:border-r-0" {...props} />
                    ),
                    td: ({ node, ...props }) => (
                      <td className="px-4 py-3 border-b border-slate-50 last:border-b-0 border-r border-slate-50 last:border-r-0 font-semibold text-slate-600 text-xs md:text-sm" {...props} />
                    ),
                    tr: ({ node, ...props }) => (
                      <tr className="even:bg-slate-50/30 hover:bg-indigo-50/10 transition-colors" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-black text-slate-900" {...props} />
                    ),
                    a: ({ node, ...props }) => (
                      <a className="text-indigo-600 hover:text-indigo-700 underline font-bold" {...props} />
                    ),
                    img: ({ node, src, alt, ...props }) => {
                      if (!src) return null;
                      return (
                        <img
                          src={src as string}
                          alt={alt || "Illustration"}
                          className="rounded-2xl border border-slate-100 shadow-sm mx-auto my-8 max-h-[400px] object-cover"
                          loading="lazy"
                        />
                      );
                    }
                  }}
                >
                  {postData.content || ''}
                </ReactMarkdown>
              </div>

            </div>

            {/* ── FAQS SECTION Accordion ── */}
            {postData.faqs && postData.faqs.length > 0 && (
              <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-100/50">
                <div className="flex items-center gap-2 mb-6">
                  <MessageSquare className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight uppercase">
                    Frequently Asked Questions
                  </h2>
                </div>

                <div className="space-y-4">
                  {postData.faqs.map((faq, idx) => (
                    <div key={idx} className="border border-slate-100 rounded-2xl p-5 hover:bg-slate-50/50 transition-all">
                      <h4 className="text-sm md:text-base font-black text-slate-900 mb-2">
                        {faq.question}
                      </h4>
                      <p className="text-xs md:text-sm font-semibold leading-relaxed text-slate-600">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* ── RIGHT: COUNSELLING SIDEBAR (4 COLS) ── */}
          <div className="lg:col-span-4 lg:sticky lg:top-8 space-y-6">
            
            {/* Admission Guidance Card */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden border border-white/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-10 -mt-10" />
              
              <div className="relative z-10">
                <div className="bg-white/10 w-11 h-11 rounded-xl flex items-center justify-center mb-4 border border-white/20">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase">
                  Free Admission Guidance
                </h3>
                <p className="text-indigo-200 text-xs md:text-sm font-semibold mt-2 mb-6">
                  Get personalized university shortlists, fee details, and application assistance from India's senior advisors.
                </p>

                <div className="space-y-3.5 border-t border-white/10 pt-5">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <span>UGC & DEB Approved Courses Only</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <span>Compare 20+ Universities Free</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <span>10-Minute Response WhatsApp Support</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <Link
                    href="#counselling-form"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-center rounded-xl py-3 text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95 border border-indigo-500"
                  >
                    Shortlist Universities
                  </Link>
                  <a
                    href="https://wa.me/919560020771"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white text-center rounded-xl py-3 text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95 border border-emerald-400 flex items-center justify-center gap-2"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Sticky Form Card */}
            <div id="counselling-form" className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-100/50">
              <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">
                Submit Lead Inquiry
              </h3>
              <p className="text-xs font-semibold text-slate-500 mb-6 leading-relaxed">
                Provide your WhatsApp and academic preferences, and we will send the comparative university brochure directly to your inbox.
              </p>
              
              <InquiryForm />
            </div>

          </div>

        </div>

      </div>
    </article>
  );
}

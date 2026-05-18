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
      authors: ["Online Shiksha Editor"],
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
      "name": "Online Shiksha Team",
      "url": "https://onlineshiksha.online"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Online Shiksha",
      "logo": {
        "@type": "ImageObject",
        "url": "https://onlineshiksha.online/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://onlineshiksha.online/blog/${slug}`
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
        "item": "https://onlineshiksha.online/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://onlineshiksha.online/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": postData.title,
        "item": `https://onlineshiksha.online/blog/${slug}`
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
    <article className="min-h-screen bg-[#FAFAFA] selection:bg-indigo-200">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* ── HERO SECTION ── */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-950 text-white rounded-b-[2.5rem] lg:rounded-b-[4rem] mb-12 lg:mb-16 shadow-2xl">
        {/* Ambient Glow Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-indigo-600/30 blur-[120px]" />
          <div className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] rounded-full bg-violet-600/20 blur-[100px]" />
          <div className="absolute -bottom-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap items-center justify-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-widest text-indigo-300/70 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white/90 truncate max-w-[150px] sm:max-w-sm">{postData.title}</span>
          </nav>

          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-indigo-100">
              {postData.category || 'Expert Guide'}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.1] mb-6 drop-shadow-sm">
            {postData.title}
          </h1>

          {postData.description && (
            <p className="text-indigo-100/70 font-semibold text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
              {postData.description}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-indigo-200">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2.5 rounded-2xl border border-white/10 backdrop-blur-md">
              <Calendar className="h-4 w-4 text-indigo-400" />
              <span>{postData.date}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2.5 rounded-2xl border border-white/10 backdrop-blur-md">
              <User className="h-4 w-4 text-indigo-400" />
              <span>Academic Board</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        {/* Back Link */}
        <div className="mb-8 hidden lg:block">
           <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-black text-xs uppercase tracking-wider group transition-all"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
            Back to All Guides
          </Link>
        </div>

        {/* ── MAIN LAYOUT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
          
          {/* ── LEFT: ARTICLE CONTENT (8 COLS) ── */}
          <div className="lg:col-span-8 space-y-10">
            <div className="bg-white rounded-[2rem] p-6 md:p-10 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50">
              
              {/* Parsed Body Content */}
              <div className="prose-custom max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h2: ({ node, ...props }) => (
                      <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-snug mt-12 mb-6 border-b-2 border-indigo-50 pb-4 flex items-center gap-3" {...props}>
                        <span className="w-2 h-8 bg-indigo-600 rounded-full inline-block"></span>
                        {props.children}
                      </h2>
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight mt-10 mb-4" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed mb-6" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc pl-6 space-y-3 mb-8 text-slate-600 text-base md:text-lg font-medium marker:text-indigo-500" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal pl-6 space-y-3 mb-8 text-slate-600 text-base md:text-lg font-medium marker:text-indigo-600 marker:font-black" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="pl-1" {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote className="relative border-none bg-indigo-50/50 rounded-2xl p-6 md:p-8 my-10" {...props}>
                         <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500 rounded-l-2xl"></div>
                         <div className="text-indigo-900 font-bold italic text-lg md:text-xl leading-relaxed">
                            {props.children}
                         </div>
                      </blockquote>
                    ),
                    table: ({ node, ...props }) => (
                      <div className="overflow-x-auto my-10 rounded-2xl border border-slate-200 shadow-sm">
                        <table className="w-full border-collapse bg-white text-left text-sm" {...props} />
                      </div>
                    ),
                    thead: ({ node, ...props }) => (
                      <thead className="bg-slate-50/80 text-slate-900 border-b border-slate-200 font-black uppercase text-xs tracking-wider" {...props} />
                    ),
                    th: ({ node, ...props }) => (
                      <th className="px-5 py-4 border-r border-slate-200 last:border-r-0" {...props} />
                    ),
                    td: ({ node, ...props }) => (
                      <td className="px-5 py-4 border-b border-slate-100 last:border-b-0 border-r border-slate-100 last:border-r-0 font-semibold text-slate-600 text-sm md:text-base" {...props} />
                    ),
                    tr: ({ node, ...props }) => (
                      <tr className="even:bg-slate-50/30 hover:bg-indigo-50/20 transition-colors" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-black text-slate-900 bg-indigo-50/50 px-1 py-0.5 rounded" {...props} />
                    ),
                    a: ({ node, ...props }) => (
                      <a className="text-indigo-600 hover:text-indigo-800 underline decoration-indigo-200 hover:decoration-indigo-600 underline-offset-4 font-bold transition-all" {...props} />
                    ),
                    img: ({ node, src, alt, ...props }) => {
                      if (!src) return null;
                      return (
                        <div className="my-10 relative rounded-2xl overflow-hidden border border-slate-100 shadow-lg group">
                          <img
                            src={src as string}
                            alt={alt || "Illustration"}
                            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                          {alt && (
                            <div className="absolute bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-sm p-3 text-center">
                              <span className="text-white/90 text-xs font-bold uppercase tracking-wider">{alt}</span>
                            </div>
                          )}
                        </div>
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
              <div className="bg-white rounded-[2rem] p-6 md:p-10 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                    Got Questions?
                  </h2>
                </div>

                <div className="space-y-4">
                  {postData.faqs.map((faq, idx) => (
                    <div key={idx} className="group border border-slate-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300">
                      <h4 className="text-base md:text-lg font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                        {faq.question}
                      </h4>
                      <p className="text-sm md:text-base font-medium leading-relaxed text-slate-600">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* ── RIGHT: COUNSELLING SIDEBAR (4 COLS) ── */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-8">
            
            {/* Admission Guidance Card */}
            <div className="bg-slate-950 text-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden border border-slate-800">
              <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/20 rounded-full blur-[50px] -mr-10 -mt-10" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-violet-500/20 rounded-full blur-[50px] -ml-10 -mb-10" />
              
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-indigo-500 to-violet-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
                  <GraduationCap className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-3">
                  Free Expert Guidance
                </h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">
                  Get personalized university shortlists, exact fee structures, and application assistance from senior academic advisors.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                    <span className="text-sm font-bold text-slate-300">UGC & DEB Approved Courses Only</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                    <span className="text-sm font-bold text-slate-300">Compare 50+ Top Universities</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                    <span className="text-sm font-bold text-slate-300">Direct Admission Support</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Link
                    href="#counselling-form"
                    className="bg-white hover:bg-slate-100 text-slate-950 text-center rounded-xl py-4 text-sm font-black uppercase tracking-wider transition-all shadow-xl hover:shadow-2xl active:scale-[0.98]"
                  >
                    Get Free Shortlist
                  </Link>
                  <a
                    href="https://wa.me/919560020771"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-center rounded-xl py-4 text-sm font-black uppercase tracking-wider transition-all border border-emerald-500/20 hover:border-emerald-500/40 flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Sticky Form Card */}
            <div id="counselling-form" className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <User className="h-5 w-5 text-indigo-600" />
                 </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  Quick Inquiry
                </h3>
              </div>
              <p className="text-sm font-medium text-slate-500 mb-8 leading-relaxed">
                Enter your details to receive customized university comparisons directly on WhatsApp.
              </p>
              
              <InquiryForm />
            </div>

          </div>

        </div>

      </div>
    </article>
  );
}

import Head from "next/head";
import seoConfig from "../next-seo.config";

export default function SeoHead() {
  const { titleTemplate, defaultTitle, description, openGraph, twitter, canonical } = seoConfig;
  const fullTitle = titleTemplate.replace("%s", defaultTitle);
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {/* Open Graph */}
      <meta property="og:type" content={openGraph.type} />
      <meta property="og:locale" content={openGraph.locale} />
      <meta property="og:url" content={openGraph.url} />
      <meta property="og:site_name" content={openGraph.siteName} />
      <meta property="og:title" content={openGraph.title} />
      <meta property="og:description" content={openGraph.description} />
      {openGraph.images && openGraph.images.map((img: { url: string }, i: number) => (
        <meta key={i} property="og:image" content={img.url} />
      ))}
      {/* Twitter */}
      {twitter && (
        <>
          <meta name="twitter:card" content={twitter.cardType} />
          {twitter.title && <meta name="twitter:title" content={twitter.title} />}
          {twitter.description && <meta name="twitter:description" content={twitter.description} />}
          {twitter.images && twitter.images.map((url: string, i: number) => (
            <meta key={i} name="twitter:image" content={url} />
          ))}
        </>
      )}
    </Head>
  );
}

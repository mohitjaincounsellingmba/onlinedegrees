import { DefaultSeoProps } from "next-seo";

const seoConfig: DefaultSeoProps = {
  titleTemplate: "%s | Online Shiksha",
  defaultTitle: "Online Shiksha | UGC Approved Online Universities 2026",
  description: "Compare 27+ UGC‑DEB approved online universities in India for 2026. Find fees, NAAC grades, programs (MBA, MCA, BBA, BCA) and get FREE expert counselling.",
  canonical: "https://onlineshiksha.online",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://onlineshiksha.online",
    siteName: "Online Shiksha",
    title: "Online Shiksha | UGC Approved Online Universities 2026",
    description:
      "Compare India's top online universities on fees, accreditation, and programs.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Online Shiksha",
      },
    ],
  },
  twitter: {
    handle: "@onlineshiksha",
    site: "@onlineshiksha",
    cardType: "summary_large_image",
  },
};

export default seoConfig;

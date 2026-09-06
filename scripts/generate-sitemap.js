const fs = require('fs');
const path = require('path');

const postsDirectory = path.join(__dirname, '../posts');
const blogsDirectory = path.join(__dirname, '../blogs');
const publicDirectory = path.join(__dirname, '../public');
const collegesDataRaw = require('../lib/colleges.json');
const collegesData = [...collegesDataRaw].sort((a, b) => a.slug.localeCompare(b.slug));

// Create public directory if it doesn't exist
if (!fs.existsSync(publicDirectory)) {
  fs.mkdirSync(publicDirectory, { recursive: true });
}

// 1. Generate robots.txt
// NOTE: Googlebot MUST be allowed to fetch Next.js static assets (_next/static) to render JavaScript and CSS properly.
// Do NOT disallow /_next/.
const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://onlineshiksha.online/sitemap.xml
Sitemap: https://onlineshiksha.online/sitemap-blogs.xml
Sitemap: https://onlineshiksha.online/sitemap-comparisons.xml
`;
fs.writeFileSync(path.join(publicDirectory, 'robots.txt'), robotsTxt);
console.log('✅ Generated public/robots.txt (Allowed Next.js rendering assets, disallowed /api/ and /admin/)');

// Helper to clean slug/name and scan both directories
function getSortedPosts() {
  const directories = [postsDirectory, blogsDirectory].filter(dir => fs.existsSync(dir));
  const allPosts = [];

  directories.forEach(dir => {
    const fileNames = fs.readdirSync(dir);
    fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .forEach(fileName => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(dir, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        // Basic frontmatter parsing
        let date = '';
        let title = '';
        let description = '';
        let keywords = '';

        const dateMatch = fileContents.match(/date:\s*['"]?([^\r\n'"]+)['"]?/i);
        if (dateMatch && dateMatch[1]) {
          date = dateMatch[1].trim();
        }

        const titleMatch = fileContents.match(/title:\s*['"]?([^\r\n'"]+)['"]?/i);
        if (titleMatch && titleMatch[1]) {
          title = titleMatch[1].trim();
        }

        const descMatch = fileContents.match(/description:\s*['"]?([^\r\n'"]+)['"]?/i);
        if (descMatch && descMatch[1]) {
          description = descMatch[1].trim();
        }

        const keywordsMatch = fileContents.match(/keywords:\s*\[([^\]]+)\]/i);
        if (keywordsMatch && keywordsMatch[1]) {
          keywords = keywordsMatch[1].trim();
        } else {
          const tagsMatch = fileContents.match(/tags:\s*\[([^\]]+)\]/i) || fileContents.match(/tags:\s*[\r\n]/i);
          if (tagsMatch) {
            keywords = 'found_via_tags';
          }
        }

        // Warnings for missing metadata to assist with SEO audits
        const warnings = [];
        if (!title) warnings.push('title');
        if (!date) {
          warnings.push('date (falling back to today)');
          date = new Date().toISOString().split('T')[0];
        }
        if (!description) warnings.push('description');
        if (!keywords) warnings.push('keywords');

        if (warnings.length > 0) {
          console.warn(`⚠️ SEO Audit Warning [${fileName}] in /${path.basename(dir)}: Missing ${warnings.join(', ')}`);
        }

        // Prevent adding draft / untitled posts to sitemap
        if (title && title.toLowerCase().includes('untitled')) {
          return;
        }

        allPosts.push({ slug, date });
      });
  });

  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

const posts = getSortedPosts();
const baseUrl = 'https://onlineshiksha.online';
const today = new Date().toISOString().split('T')[0];

// 2. Generate sitemap-main.xml (core landing pages with trailing slashes)
const staticPages = [
  { url: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
  { url: `${baseUrl}/inquiry/`, priority: '0.9', changefreq: 'daily' },
  { url: `${baseUrl}/blog/`, priority: '0.9', changefreq: 'daily' },
  { url: `${baseUrl}/blog/directory/`, priority: '0.9', changefreq: 'daily' },
  { url: `${baseUrl}/compare/`, priority: '0.8', changefreq: 'weekly' },
  { url: `${baseUrl}/compare/directory/`, priority: '0.8', changefreq: 'weekly' },
  { url: `${baseUrl}/emi-calculator/`, priority: '0.8', changefreq: 'monthly' },
  { url: `${baseUrl}/create-resume/`, priority: '0.8', changefreq: 'monthly' },
  { url: `${baseUrl}/tools/cat-score-calculator/`, priority: '0.8', changefreq: 'monthly' },
  { url: `${baseUrl}/tools/astro-tools/`, priority: '0.8', changefreq: 'monthly' },
  { url: `${baseUrl}/tools/video-editor/`, priority: '0.8', changefreq: 'monthly' },
  { url: `${baseUrl}/counselor-training-center/`, priority: '0.8', changefreq: 'monthly' },
  { url: `${baseUrl}/approvals-counselling-exam/`, priority: '0.8', changefreq: 'monthly' },
  { url: `${baseUrl}/pan-india-bschool-exam/`, priority: '0.8', changefreq: 'monthly' },
  { url: `${baseUrl}/tier2-3-placements-exam/`, priority: '0.8', changefreq: 'monthly' },
  { url: `${baseUrl}/isbr-counselling-exam/`, priority: '0.8', changefreq: 'monthly' },
  { url: `${baseUrl}/ndim-counselling-exam/`, priority: '0.8', changefreq: 'monthly' },
  { url: `${baseUrl}/portfolio/`, priority: '0.7', changefreq: 'monthly' },
  { url: `${baseUrl}/disclaimer/`, priority: '0.5', changefreq: 'monthly' },
  { url: `${baseUrl}/privacy-policy/`, priority: '0.5', changefreq: 'monthly' },
  { url: `${baseUrl}/terms-of-service/`, priority: '0.5', changefreq: 'monthly' },
];

let sitemapMainXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

staticPages.forEach(p => {
  sitemapMainXml += `  <url>
    <loc>${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>\n`;
});
sitemapMainXml += `</urlset>`;
fs.writeFileSync(path.join(publicDirectory, 'sitemap-main.xml'), sitemapMainXml);
console.log(`✅ Generated public/sitemap-main.xml with ${staticPages.length} core pages.`);

// 3. Generate sitemap-blogs.xml (all blog posts with trailing slash matching next.config.ts)
let sitemapBlogsXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

posts.forEach(post => {
  sitemapBlogsXml += `  <url>
    <loc>${baseUrl}/blog/${post.slug}/</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
});
sitemapBlogsXml += `</urlset>`;
fs.writeFileSync(path.join(publicDirectory, 'sitemap-blogs.xml'), sitemapBlogsXml);
console.log(`✅ Generated public/sitemap-blogs.xml with ${posts.length} blog posts (All URLs have trailing slashes!).`);

// 4. Generate sitemap-comparisons.xml (all comparisons with trailing slash)
let sitemapComparisonsXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

let comparisonCount = 0;
for (let i = 0; i < collegesData.length; i++) {
  for (let j = i + 1; j < collegesData.length; j++) {
    const slugPair = `${collegesData[i].slug}-vs-${collegesData[j].slug}`;
    sitemapComparisonsXml += `  <url>
    <loc>${baseUrl}/compare/${slugPair}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>\n`;
    comparisonCount++;
  }
}
sitemapComparisonsXml += `</urlset>`;
fs.writeFileSync(path.join(publicDirectory, 'sitemap-comparisons.xml'), sitemapComparisonsXml);
console.log(`✅ Generated public/sitemap-comparisons.xml with ${comparisonCount} comparison pages.`);

// 5. Generate public/sitemap.xml as a standard XML Sitemap Index referencing sub-sitemaps
const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-main.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-blogs.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-comparisons.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`;
fs.writeFileSync(path.join(publicDirectory, 'sitemap.xml'), sitemapIndexXml);
console.log(`✅ Generated public/sitemap.xml as a master Sitemap Index with sitemap-main, sitemap-blogs, and sitemap-comparisons!`);

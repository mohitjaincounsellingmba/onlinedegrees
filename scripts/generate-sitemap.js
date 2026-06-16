const fs = require('fs');
const path = require('path');

const postsDirectory = path.join(__dirname, '../posts');
const blogsDirectory = path.join(__dirname, '../blogs');
const publicDirectory = path.join(__dirname, '../public');
const collegesData = require('../lib/colleges.json');

// Create public directory if it doesn't exist
if (!fs.existsSync(publicDirectory)) {
  fs.mkdirSync(publicDirectory, { recursive: true });
}

// Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

Sitemap: https://onlineshiksha.online/sitemap.xml
`;
fs.writeFileSync(path.join(publicDirectory, 'robots.txt'), robotsTxt);
console.log('✅ Generated public/robots.txt');

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

// Generate sitemap.xml
const posts = getSortedPosts();
const baseUrl = 'https://onlineshiksha.online';
const today = new Date().toISOString().split('T')[0];

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/compare</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/emi-calculator</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/create-resume</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/tools/cat-score-calculator</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/disclaimer</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy-policy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/terms-of-service</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
`;

// 1. Add all dynamic blog posts
posts.forEach(post => {
  sitemapXml += `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>\n`;
});

// 2. Add all dynamic comparison pairs (Alphabetically sorted to avoid duplicates)
let comparisonCount = 0;
for (let i = 0; i < collegesData.length; i++) {
  for (let j = i + 1; j < collegesData.length; j++) {
    const slugPair = `${collegesData[i].slug}-vs-${collegesData[j].slug}`;
    sitemapXml += `  <url>
    <loc>${baseUrl}/compare/${slugPair}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
    comparisonCount++;
  }
}

sitemapXml += `</urlset>`;

fs.writeFileSync(path.join(publicDirectory, 'sitemap.xml'), sitemapXml);
console.log(`✅ Generated public/sitemap.xml with ${posts.length} blogs and ${comparisonCount} comparison pages!`);

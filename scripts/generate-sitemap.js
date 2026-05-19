const fs = require('fs');
const path = require('path');

const postsDirectory = path.join(__dirname, '../posts');
const publicDirectory = path.join(__dirname, '../public');

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

// Helper to clean slug/name
function getSortedPosts() {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory);
  
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Basic frontmatter parsing
      let date = new Date().toISOString().split('T')[0];
      const match = fileContents.match(/date:\s*['"]?([^\r\n'"]+)['"]?/i);
      if (match && match[1]) {
        date = match[1];
      }
      
      return { slug, date };
    });
}

// Generate sitemap.xml
const posts = getSortedPosts();
const baseUrl = 'https://onlineshiksha.online';

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/compare</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/emi-calculator</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/create-resume</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;

posts.forEach(post => {
  sitemapXml += `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>\n`;
});

sitemapXml += `</urlset>`;

fs.writeFileSync(path.join(publicDirectory, 'sitemap.xml'), sitemapXml);
console.log(`✅ Generated public/sitemap.xml with ${posts.length} pages!`);

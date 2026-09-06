const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '../posts');
const blogsDir = path.join(__dirname, '../blogs');

const TARGET_COURSES = {
  'executive-mba': {
    slug: 'executive-mba',
    name: 'Executive MBA',
    waText: 'Hi Mohit Sir, I am an experienced working professional interested in 1-Year Executive MBA. Please share top university options, fees, and eligibility.'
  },
  'online-bba': {
    slug: 'online-bba',
    name: 'Online BBA',
    waText: 'Hi Mohit Sir, I am interested in Online BBA (2026 Batch). Please guide me on the best accredited universities, fee concessions, and placement assistance.'
  },
  'online-mca': {
    slug: 'online-mca',
    name: 'Online MCA',
    waText: 'Hi Mohit Sir, I want to apply for Online MCA (2026 Batch). Please share universities with Cloud/AI specializations and top tech placement tie-ups.'
  },
  'online-bca': {
    slug: 'online-bca',
    name: 'Online BCA',
    waText: 'Hi Mohit Sir, I want admission guidance for Online BCA (2026 session). Please help me compare affordable universities and practical coding syllabus.'
  },
  'online-mba': {
    slug: 'online-mba',
    name: 'Online MBA',
    waText: 'Hi Mohit Sir, I am interested in Online MBA (2026 Batch). Please share the top university shortlist, fee structures, and early-bird scholarship details.'
  }
};

function detectCourse(slug, title, category, content) {
  const combined = `${slug} ${title} ${category}`.toLowerCase();

  if (combined.includes('executive') || combined.includes('emba') || combined.includes('working professional')) {
    return TARGET_COURSES['executive-mba'];
  }
  if (combined.includes('bba') || combined.includes('bachelor of business')) {
    return TARGET_COURSES['online-bba'];
  }
  if (combined.includes('mca') || combined.includes('master of computer')) {
    return TARGET_COURSES['online-mca'];
  }
  if (combined.includes('bca') || combined.includes('bachelor of computer')) {
    return TARGET_COURSES['online-bca'];
  }
  return TARGET_COURSES['online-mba'];
}

function processDirectory(directory) {
  if (!fs.existsSync(directory)) return { total: 0, modified: 0, byCourse: {} };

  const files = fs.readdirSync(directory).filter(f => f.endsWith('.md'));
  let modifiedCount = 0;
  const byCourse = {
    'online-mba': 0,
    'executive-mba': 0,
    'online-bba': 0,
    'online-mca': 0,
    'online-bca': 0
  };

  let inquiryLinksFixed = 0;
  let waLinksUpdated = 0;
  let datesUpdated = 0;

  files.forEach(file => {
    const filePath = path.join(directory, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    const slug = file.replace(/\.md$/, '');
    const titleMatch = content.match(/title:\s*['"]?([^\r\n'"]+)['"]?/i);
    const categoryMatch = content.match(/category:\s*['"]?([^\r\n'"]+)['"]?/i);
    const title = titleMatch ? titleMatch[1] : '';
    const category = categoryMatch ? categoryMatch[1] : '';

    const course = detectCourse(slug, title, category, content);
    byCourse[course.slug] = (byCourse[course.slug] || 0) + 1;

    // 1. Fix broken /inquiry links to include canonical trailing slash and course parameter
    // Matches (/inquiry), (/inquiry/), (/inquiry?...), etc.
    const inquiryRegex = /\(\/inquiry\/?(\?[^)]*)?\)/g;
    if (inquiryRegex.test(content)) {
      content = content.replace(inquiryRegex, `(/inquiry/?course=${course.slug})`);
      inquiryLinksFixed++;
    }

    // 2. Upgrade plain WhatsApp links without query params to pre-filled course inquiries
    const waUrl = `https://wa.me/919560020771?text=${encodeURIComponent(course.waText)}`;
    // Matches https://wa.me/919560020771 that does NOT already have ?text=
    const plainWaRegex = /https:\/\/wa\.me\/919560020771(?!\?text=)[^\s)"]*/g;
    if (plainWaRegex.test(content)) {
      content = content.replace(plainWaRegex, waUrl);
      waLinksUpdated++;
    }

    // 3. Update outdated academic session references in content
    content = content.replace(/2024\s*-\s*25/g, '2026');
    content = content.replace(/2024\s*Admissions/gi, '2026 Admissions');
    content = content.replace(/2025\s*Admissions/gi, '2026 Admissions');
    content = content.replace(/January 2025/gi, 'July–September 2026');
    content = content.replace(/July 2024/gi, 'July 2026');
    content = content.replace(/July 2025/gi, 'July 2026');

    // 4. Ensure recent 2026 date in frontmatter for search engines
    const dateMatch = content.match(/date:\s*['"]?([^\r\n'"]+)['"]?/i);
    if (dateMatch && dateMatch[1]) {
      const currentDate = dateMatch[1];
      if (currentDate.startsWith('2024') || currentDate.startsWith('2025') || currentDate < '2026-03-01') {
        content = content.replace(/date:\s*['"]?[^\r\n'"]+['"]?/i, `date: "2026-07-01"`);
        datesUpdated++;
      }
    }

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      modifiedCount++;
    }
  });

  return {
    total: files.length,
    modified: modifiedCount,
    byCourse,
    inquiryLinksFixed,
    waLinksUpdated,
    datesUpdated
  };
}

console.log('🚀 Updating blog posts with 2026 session data and lead hooks...');
const postsResult = processDirectory(postsDir);
const blogsResult = processDirectory(blogsDir);

console.log('\n--- UPDATE SUMMARY ---');
console.log(`Posts checked: ${postsResult.total}, Modified: ${postsResult.modified}`);
console.log(`Blogs checked: ${blogsResult.total}, Modified: ${blogsResult.modified}`);
console.log('\nCourse Distribution:');
for (const [course, count] of Object.entries(postsResult.byCourse)) {
  console.log(`- ${course}: ${count} posts`);
}
console.log('\nUpdates performed:');
console.log(`- Inquiry links redirected: ${postsResult.inquiryLinksFixed + blogsResult.inquiryLinksFixed}`);
console.log(`- WhatsApp links pre-filled: ${postsResult.waLinksUpdated + blogsResult.waLinksUpdated}`);
console.log(`- Article dates refreshed to 2026: ${postsResult.datesUpdated + blogsResult.datesUpdated}`);
console.log('✅ Batch update complete!');

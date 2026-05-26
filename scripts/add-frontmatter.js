const fs = require('fs');
const path = require('path');

const files = [
  'affordable-online-mba-colleges-under-1-lakh.md',
  'best-online-mba-colleges-india.md',
  'best-online-mba-universities-working-professionals.md',
  'future-scope-online-mba-india.md',
  'highest-paying-specializations-online-mba.md',
  'is-an-online-mba-worth-it-2026.md',
  'online-mba-admission-eligibility.md',
  'online-mba-fees-comparison-india.md',
  'online-mba-vs-regular-mba.md',
  'top-career-opportunities-after-online-mba.md',
  'top-online-mba-colleges-placement-support.md',
  'ugc-approved-online-mba-universities-list.md'
];

const postsDir = path.join(__dirname, '../posts');

files.forEach(file => {
  const filepath = path.join(postsDir, file);
  if (!fs.existsSync(filepath)) {
    console.log(`File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(filepath, 'utf8');

  // Skip if it already has frontmatter
  if (content.startsWith('---')) {
    console.log(`Skipping ${file} - already has frontmatter`);
    return;
  }

  const lines = content.split('\n');
  
  // Extract Title from the first line
  let title = '';
  if (lines[0].startsWith('# ')) {
    title = lines[0].replace('# ', '').trim();
    lines.shift(); // remove title line
  }

  // Remove leading empty lines
  while (lines.length > 0 && lines[0].trim() === '') {
    lines.shift();
  }

  // Extract Keywords line at the bottom
  let keywords = [];
  let keywordsIndex = -1;
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i].trim();
    if (line.match(/^\*\*Keywords\*\*:/i) || line.match(/^Keywords:/i)) {
      keywordsIndex = i;
      const kwString = line.replace(/^\*\*Keywords\*\*:\s*/i, '').replace(/^Keywords:\s*/i, '').trim();
      keywords = kwString.split(',').map(k => k.trim());
      break;
    }
  }

  if (keywordsIndex !== -1) {
    // Remove the keywords line and any preceding separators like ---
    lines.splice(keywordsIndex, lines.length - keywordsIndex);
  }

  // Trim trailing empty lines or separators
  while (lines.length > 0 && (lines[lines.length - 1].trim() === '' || lines[lines.length - 1].trim() === '---')) {
    lines.pop();
  }

  const remainingBody = lines.join('\n').trim();

  // Extract first paragraph for description (up to 160 chars)
  let description = '';
  const paragraphs = remainingBody.split('\n\n').map(p => p.trim()).filter(p => p !== '');
  if (paragraphs.length > 0) {
    let cleanText = paragraphs[0].replace(/[#*`\[\]()]/g, '');
    if (cleanText.length > 160) {
      description = cleanText.substring(0, 157) + '...';
    } else {
      description = cleanText;
    }
  }
  if (!description) {
    description = `Compare top-tier UGC-approved universities. Check fees, NAAC grades, and real ROI for ${title}.`;
  }

  const date = '2026-05-22';
  const category = title.toLowerCase().includes('mba') || title.toLowerCase().includes('pgdm') ? 'Online MBA' : 'Online Degrees';

  const newContent = `---
title: "${title}"
date: "${date}"
category: "${category}"
description: "${description.replace(/"/g, '\\"')}"
keywords: ${JSON.stringify(keywords)}
---

${remainingBody}
`;

  fs.writeFileSync(filepath, newContent, 'utf8');
  console.log(`✅ Added frontmatter to ${file}`);
});

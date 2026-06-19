const fs = require('fs');
const path = require('path');

const collegesData = require('../lib/colleges.json');
const postsDir = path.join(__dirname, '../posts');

// Helper to clean college names for titles
function getCleanName(name) {
  let clean = name;
  clean = clean.replace(/\s*-\s*Online\s*\(Pune\)/i, ' (Pune)');
  clean = clean.replace(/\s*-\s*Online\s*PGDM/i, '');
  clean = clean.replace(/\s+Online\s+\(Navi\s+Mumbai\)/i, ' (Navi Mumbai)');
  clean = clean.replace(/\s*Online\s*Vidyapeeth/i, 'Vidyapeeth');
  clean = clean.replace(/\s+Online/gi, '');
  return clean.trim();
}

// Helper to clean slug for file naming to prevent duplicate "online"
function getCleanSlug(slug) {
  return slug
    .replace(/-online$/, '')
    .replace(/-online-pgdm$/, '')
    .replace(/-online-pune$/, '-pune')
    .replace(/-online-navi-mumbai$/, '-navi-mumbai');
}

// Clean up existing files ending with admission-review-2026.md
if (fs.existsSync(postsDir)) {
  const files = fs.readdirSync(postsDir);
  let deleteCount = 0;
  files.forEach(file => {
    if (file.endsWith('admission-review-2026.md')) {
      fs.unlinkSync(path.join(postsDir, file));
      deleteCount++;
    }
  });
  console.log(`🧹 Cleaned up ${deleteCount} old admission-review-2026.md files.`);
} else {
  fs.mkdirSync(postsDir, { recursive: true });
}

// Select 25 colleges for each category
const categoriesSetup = {
  'Online MBA': {
    colleges: collegesData.slice(0, 25),
    slugSuffix: 'online-mba-admission-review-2026',
    titleGenerator: (name, slug) => `[${getCleanName(name)}](/colleges/${slug}) Online MBA Admission Review 2026`,
    descGenerator: (name, fee, acc) => `Is the ${getCleanName(name)} Online MBA worth your admission? Read our comprehensive review covering total fees (${fee}), UGC accreditation (${acc}), and placement records.`,
    keywordsGenerator: (name) => [
      `${getCleanName(name)} online mba review 2026`,
      `${getCleanName(name)} online mba admission`,
      `is ${getCleanName(name)} online mba good`,
      `online mba reviews ${getCleanName(name)}`
    ]
  },
  'Online BCA': {
    colleges: collegesData.filter(c => c.programs && (c.programs.includes('BCA') || c.programs.includes('B.Sc'))).slice(0, 25),
    slugSuffix: 'online-bca-admission-review-2026',
    titleGenerator: (name, slug) => `[${getCleanName(name)}](/colleges/${slug}) Online BCA Admission Review 2026`,
    descGenerator: (name, fee, acc) => `Read our review on taking admission in ${getCleanName(name)} Online BCA. Explore fees (${fee}), UGC-DEB status (${acc}), and syllabus.`,
    keywordsGenerator: (name) => [
      `${getCleanName(name)} online bca review 2026`,
      `${getCleanName(name)} online bca admission`,
      `is ${getCleanName(name)} online bca worth it`,
      `online bca placement ${getCleanName(name)}`
    ]
  },
  'Online PGDM': {
    colleges: collegesData.filter(c => c.programs && (c.programs.includes('PGDM') || c.programs.includes('MBA') || c.programs.includes('PGDBA'))).slice(0, 25),
    slugSuffix: 'online-pgdm-admission-review-2026',
    titleGenerator: (name, slug) => `[${getCleanName(name)}](/colleges/${slug}) Online PGDM Admission Review 2026`,
    descGenerator: (name, fee, acc) => `Thinking of enrolling in ${getCleanName(name)} Online PGDM? Check our detailed review on fees (${fee}), approvals (${acc}), and placements.`,
    keywordsGenerator: (name) => [
      `${getCleanName(name)} online pgdm review 2026`,
      `${getCleanName(name)} online pgdm admission`,
      `is ${getCleanName(name)} online pgdm worth it`,
      `online pgdm fees ${getCleanName(name)}`
    ]
  },
  'Executive MBA': {
    colleges: collegesData.filter(c => c.programs && (c.programs.includes('Executive MBA') || c.programs.includes('MBA') || c.programs.includes('Global MBA'))).slice(0, 25),
    slugSuffix: 'executive-mba-admission-review-2026',
    titleGenerator: (name, slug) => `[${getCleanName(name)}](/colleges/${slug}) Executive MBA Admission Review 2026`,
    descGenerator: (name, fee, acc) => `Read our review of the ${getCleanName(name)} Executive MBA program. Get insights on fees (${fee}), accreditations (${acc}), and key highlights.`,
    keywordsGenerator: (name) => [
      `${getCleanName(name)} executive mba review 2026`,
      `${getCleanName(name)} executive mba admission`,
      `is ${getCleanName(name)} executive mba good`,
      `executive mba placement ${getCleanName(name)}`
    ]
  }
};

// If a category has fewer than 25 colleges after filtering, fill it up from the main dataset
Object.keys(categoriesSetup).forEach(cat => {
  const currentList = categoriesSetup[cat].colleges;
  if (currentList.length < 25) {
    const remainingCount = 25 - currentList.length;
    const idsInList = new Set(currentList.map(c => c.id));
    const extraColleges = collegesData.filter(c => !idsInList.has(c.id)).slice(0, remainingCount);
    categoriesSetup[cat].colleges = currentList.concat(extraColleges);
  }
});

// Generate scattered dates between 2026-06-01 and 2026-06-19
function getRandomDate(index) {
  const startDay = 1;
  const day = startDay + (index % 19);
  const formattedDay = day < 10 ? `0${day}` : `${day}`;
  return `2026-06-${formattedDay}`;
}

let generatedCount = 0;

Object.entries(categoriesSetup).forEach(([categoryName, config]) => {
  config.colleges.forEach((college, index) => {
    const cleanCollegeSlug = getCleanSlug(college.slug);
    const slug = `${cleanCollegeSlug}-${config.slugSuffix}`;
    const filename = `${slug}.md`;
    const filepath = path.join(postsDir, filename);

    const title = config.titleGenerator(college.name, college.slug);
    const date = getRandomDate(generatedCount);
    const description = config.descGenerator(college.name, college.feeText, college.accreditation);
    const keywords = config.keywordsGenerator(college.name);

    // Calculate dynamic values for template
    const feeText = college.feeText || '₹1.5 Lakhs';
    const accreditation = college.accreditation || 'UGC-DEB approved';
    const rating = college.rating || '4.3';
    const highlights = college.highlights || ['UGC-DEB approved degree', 'Flexible learning model', 'Dedicated placement assistance'];
    const location = college.location || 'India';
    const packageText = college.packageText || '₹5-8 LPA';

    const markdownBody = `---
title: "${title}"
date: "${date}"
category: "${categoryName === 'Online BCA' ? 'Online Degrees' : categoryName}"
description: "${description}"
keywords: ${JSON.stringify(keywords)}
---

Taking admission in the **${categoryName}** at **${college.name}** is one of the most career-transforming decisions you can make in 2026. Backed by excellent credentials, state-of-the-art learning platforms, and a highly industry-relevant curriculum, this program is designed to deliver maximum ROI for fresh graduates and working professionals alike.

In this review, we examine the fee structure, eligibility criteria, key highlights, and the reasons why enrolling in this program will accelerate your career trajectory.

---

## 📊 Program Overview & Key Facts (2026)

| Feature | Details |
| :--- | :--- |
| **University** | ${college.name} (${location}) |
| **Accreditation & Approvals** | **${accreditation}** |
| **Program Category** | ${categoryName} |
| **Mode of Learning** | 100% Online — Self-paced & Live Classes |
| **Course Duration** | ${categoryName === 'Online BCA' ? '3 Years' : '2 Years'} |
| **Total Program Fee** | **${feeText}** |
| **Average Package (Alumni)** | **${packageText}** |
| **Student Satisfaction Rating** | ⭐ **${rating}/5** |

---

## 💸 Fees & Flexible EMI Options

Investing in your education is highly affordable at ${college.name}. The total fee for the ${categoryName} program is **${feeText}**, which can be paid in installments.

* **One-time payment discounts** are available at the beginning of the academic year.
* **Easy Semester-wise Installments** to reduce your financial burden.
* **Zero-Cost EMI Facility** starting from very affordable monthly payments (via bank partners).

> 💡 **Financial Tip:** You can contact our admissions desk to see if you qualify for a merit-based scholarship or corporate sponsor discounts.

---

## 🌟 Why Take Admission in ${college.name}'s ${categoryName}?

### 1. Elite Accreditations & Approvals
Your degree is 100% valid and globally recognized. With credentials like **${accreditation}**, the program complies with all regulations, making you eligible for government jobs, corporate recruitment, and higher studies abroad.

### 2. High-Tech LMS & Learning Ecosystem
The university features an advanced learning management system (LMS) where you can access:
${highlights.map(h => `- **${h}**`).join('\n')}
- Self-paced lectures and live Q&A sessions with senior faculty.
- Collaborative study groups and discussion forums.

### 3. Industry-Ready Curriculum & Specializations
The curriculum is updated annually in partnership with corporate leaders. It emphasizes practical assignments, case studies, and hands-on capstone projects to make you job-ready on day one.

---

## 💼 Placement and Career Outcomes

The dedicated training and placement cell at ${college.name} ensures that students transition smoothly into higher-paying roles:
* **Virtual Job Fairs:** Regular recruitment drives connecting you with 200+ top MNCs.
* **Resume & LinkedIn Optimization:** One-on-one sessions with career mentors.
* **Interview Preparations:** Mock interviews and soft-skills training.
* **Alumni Network:** Join a community of thousands of graduates successfully working in leadership roles.

---

## ❓ Frequently Asked Questions (FAQ)

**Q1. Is the online degree from ${college.name} equivalent to a regular degree?**  
Yes! Under UGC guidelines, online degrees from recognized universities are treated on par with conventional regular degrees for all employment and academic opportunities.

**Q2. Can I pursue this program while working full-time?**  
Absolutely. The program is built precisely for working professionals. You can study on weekends or watch recorded sessions during your free time.

**Q3. How do examinations take place?**  
Examinations are conducted online via secure proctored systems, allowing you to take them from the comfort of your home.

---

## 🏆 Final Verdict: Strongly Recommended for 2026 Admissions!

If you want a premium learning experience, a recognized degree, and solid career support without spending a fortune, enrolling in **${college.name}'s ${categoryName}** is a highly recommended path. 

---

[👉 Get Free Career Guidance – Talk to an Expert](/inquiry) | [💬 WhatsApp Advisor Mohit Jain](https://wa.me/919560020771)

### 🚀 Enhance Your Placement Chances
Boost your skills and test your preparation! **[Explore Our Premium Mock Test Series 2026](https://www.careerwithmohit.online/tools/mock-tests)** to get real-time exam experience and advance your career.
`;

    fs.writeFileSync(filepath, markdownBody, 'utf8');
    generatedCount++;
  });
});

console.log(`🎉 Successfully generated ${generatedCount} positive review blogs with clean titles and slugs!`);

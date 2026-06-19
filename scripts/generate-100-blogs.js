const fs = require('fs');
const path = require('path');

const collegesData = require('../lib/colleges.json');
const postsDir = path.join(__dirname, '../posts');

// Ensure directory exists
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

// Select 25 colleges for each category
const categoriesSetup = {
  'Online MBA': {
    colleges: collegesData.slice(0, 25),
    slugSuffix: 'online-mba-admission-review-2026',
    titleGenerator: (name) => `[${name}](/colleges/${slugify(name)}) Online MBA Review 2026: The Ultimate Admission Guide`,
    descGenerator: (name, fee, acc) => `Is the ${name} Online MBA worth it? Read our honest review of its fees (${fee}), approvals (${acc}), specializations, and why it is a smart choice for your career.`,
    keywordsGenerator: (name) => [
      `${name} online mba review 2026`,
      `${name} online mba admission`,
      `is ${name} online mba good`,
      `online mba reviews ${name}`
    ]
  },
  'Online BCA': {
    colleges: collegesData.filter(c => c.programs && (c.programs.includes('BCA') || c.programs.includes('B.Sc'))).slice(0, 25),
    slugSuffix: 'online-bca-admission-review-2026',
    titleGenerator: (name) => `[${name}](/colleges/${slugify(name)}) Online BCA Review 2026: Best Choice for IT Aspirants?`,
    descGenerator: (name, fee, acc) => `Thinking of taking admission in ${name} Online BCA? Read our comprehensive review covering fees (${fee}), UGC approvals (${acc}), syllabus, and career scope.`,
    keywordsGenerator: (name) => [
      `${name} online bca review 2026`,
      `${name} online bca admission`,
      `is ${name} online bca worth it`,
      `online bca placement ${name}`
    ]
  },
  'Online PGDM': {
    colleges: collegesData.filter(c => c.programs && (c.programs.includes('PGDM') || c.programs.includes('MBA') || c.programs.includes('PGDBA'))).slice(0, 25),
    slugSuffix: 'online-pgdm-admission-review-2026',
    titleGenerator: (name) => `[${name}](/colleges/${slugify(name)}) Online PGDM Review 2026: Fees, Placements & Admission Reality`,
    descGenerator: (name, fee, acc) => `Read this detailed review of ${name} Online PGDM program. Explore its approvals (${acc}), total fees (${fee}), dual specializations, and placement outcomes.`,
    keywordsGenerator: (name) => [
      `${name} online pgdm review 2026`,
      `${name} online pgdm admission`,
      `is ${name} online pgdm worth it`,
      `online pgdm fees ${name}`
    ]
  },
  'Executive MBA': {
    colleges: collegesData.filter(c => c.programs && (c.programs.includes('Executive MBA') || c.programs.includes('MBA') || c.programs.includes('Global MBA'))).slice(0, 25),
    slugSuffix: 'executive-mba-admission-review-2026',
    titleGenerator: (name) => `[${name}](/colleges/${slugify(name)}) Executive MBA Review 2026: Perfect for Working Professionals`,
    descGenerator: (name, fee, acc) => `Is the ${name} Executive MBA program the right choice for mid-to-senior professionals? Read our positive review on fees (${fee}), accreditations (${acc}), and career growth.`,
    keywordsGenerator: (name) => [
      `${name} executive mba review 2026`,
      `${name} executive mba admission`,
      `is ${name} executive mba good`,
      `executive mba placement ${name}`
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

// Helper to slugify college names
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

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
    const slug = `${college.slug}-${config.slugSuffix}`;
    const filename = `${slug}.md`;
    const filepath = path.join(postsDir, filename);

    const title = config.titleGenerator(college.name);
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

console.log(`🎉 Successfully generated ${generatedCount} positive review blogs!`);

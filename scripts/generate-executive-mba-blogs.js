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

// Helper to slugify text
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start
    .replace(/-+$/, '');            // Trim - from end
}

// Ensure output directory exists
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

// Target colleges that offer MBA/PGDM/Executive MBA/Global MBA
const targetColleges = collegesData.filter(c => 
  c.programs && (
    c.programs.includes('Executive MBA') || 
    c.programs.includes('MBA') || 
    c.programs.includes('Global MBA') ||
    c.programs.includes('PGDBA') ||
    c.programs.includes('PGDM')
  )
);

console.log(`🔍 Found ${targetColleges.length} colleges offering MBA / Executive MBA / PGDM.`);

// 15 Top Metro and Industrial Cities of India
const cities = [
  "Delhi NCR", "Mumbai", "Bangalore", "Pune", "Hyderabad",
  "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow",
  "Indore", "Chandigarh", "Noida", "Gurgaon", "Navi Mumbai"
];

// 15 dynamic templates corresponding to the 15 cities
const templates = [
  {
    title: (college, city) => `[${getCleanName(college.name)}](/colleges/${college.slug}) Executive MBA Admission Review: Fees & ROI in ${city}`,
    desc: (college, city) => `Explore our detailed review of the ${getCleanName(college.name)} Executive MBA program for students in ${city}. Read about fees, approvals, and ROI.`,
    keywords: (college, city) => [`${getCleanName(college.name)} executive mba ${city}`, `executive mba admission ${city}`, `${college.name} reviews`],
    intro: (college, city) => `Taking up an Executive MBA program from **${college.name}** is a major career catalyst for working professionals in **${city}**. As industries undergo rapid digital transformations, having a premium management degree is key to climbing the corporate ladder.`
  },
  {
    title: (college, city) => `Is [${getCleanName(college.name)}](/colleges/${college.slug}) Executive MBA Worth It for Working Professionals in ${city}?`,
    desc: (college, city) => `An honest guide for professionals in ${city} checking if the ${getCleanName(college.name)} Executive MBA fits their budget and career goals.`,
    keywords: (college, city) => [`is ${getCleanName(college.name)} executive mba worth it`, `executive mba colleges in ${city}`, `executive mba review`],
    intro: (college, city) => `For working professionals balancing a busy career in **${city}**, the question of whether the **${college.name}** Executive MBA is worth the investment is critical. Here, we analyze its syllabus, industry relevance, and career outcomes.`
  },
  {
    title: (college, city) => `Best Executive MBA Programs: Why Choose [${getCleanName(college.name)}](/colleges/${college.slug}) in ${city}`,
    desc: (college, city) => `Discover the unique features of ${getCleanName(college.name)} Executive MBA in ${city}, including its online learning model and accreditation.`,
    keywords: (college, city) => [`best executive mba ${city}`, `${getCleanName(college.name)} executive mba`, `executive mba ranking`],
    intro: (college, city) => `Finding the best executive business program in **${city}** can be challenging. **${college.name}** stands out as a top-tier choice, providing a robust blend of academic rigor, flexibility, and global recognition.`
  },
  {
    title: (college, city) => `[${getCleanName(college.name)}](/colleges/${college.slug}) Executive MBA Course Fees, EMI Options & Placements in ${city}`,
    desc: (college, city) => `Compare tuition fees, easy semester-wise installment plans, and placement packages for the ${getCleanName(college.name)} Executive MBA in ${city}.`,
    keywords: (college, city) => [`${getCleanName(college.name)} executive mba fees`, `executive mba cost ${city}`, `executive mba emi`],
    intro: (college, city) => `Budgeting is an essential part of selecting your MBA. Here, we break down the complete fee structures, low-cost installment schemes, and placements for **${college.name}** Executive MBA for aspirants in **${city}**.`
  },
  {
    title: (college, city) => `How [${getCleanName(college.name)}](/colleges/${college.slug}) Executive MBA Accelerates Leadership Careers in ${city}`,
    desc: (college, city) => `Learn how enrolling in the ${getCleanName(college.name)} Executive MBA helps professionals in ${city} shift into leadership roles.`,
    keywords: (college, city) => [`leadership mba ${city}`, `${getCleanName(college.name)} career review`, `executive mba salary`],
    intro: (college, city) => `Transitioning from a technical role to a senior leadership position requires a strategic mindset. The **${college.name}** Executive MBA program is tailored to build those leadership competencies for corporate professionals in **${city}**.`
  },
  {
    title: (college, city) => `UGC Approved Executive MBA: Honest Review of [${getCleanName(college.name)}](/colleges/${college.slug}) in ${city}`,
    desc: (college, city) => `Check approvals (UGC-DEB, AICTE, NAAC) for the ${getCleanName(college.name)} Executive MBA program and validity in ${city}.`,
    keywords: (college, city) => [`ugc approved executive mba`, `${getCleanName(college.name)} approvals`, `online mba validity ${city}`],
    intro: (college, city) => `Validating university approvals is vital before taking admission. We review the accreditation credentials of **${college.name}**, showing why its degree is 100% valid for public and private sectors in **${city}**.`
  },
  {
    title: (college, city) => `Direct Admission in [${getCleanName(college.name)}](/colleges/${college.slug}) Executive MBA Program: ${city} Guide`,
    desc: (college, city) => `Learn the step-by-step direct admission process, eligibility criteria, and documents required for the ${getCleanName(college.name)} Executive MBA in ${city}.`,
    keywords: (college, city) => [`direct admission executive mba`, `${getCleanName(college.name)} eligibility`, `mba admission ${city} 2026`],
    intro: (college, city) => `Are you looking to secure admission without entrance exam hassles? This guide covers the direct eligibility criteria and admission processes for the **${college.name}** Executive MBA for students in **${city}**.`
  },
  {
    title: (college, city) => `[${getCleanName(college.name)}](/colleges/${college.slug}) Executive MBA Placement Packages & Top Recruiters in ${city}`,
    desc: (college, city) => `Get insights on placement statistics, average packages, and top companies hiring ${getCleanName(college.name)} MBA grads in ${city}.`,
    keywords: (college, city) => [`${getCleanName(college.name)} placements`, `mba average package ${city}`, `top mba hiring firms`],
    intro: (college, city) => `Return on Investment (ROI) is the ultimate metric for students. In this guide, we analyze the placement statistics and top hiring companies for **${college.name}** Executive MBA graduates in **${city}**.`
  },
  {
    title: (college, city) => `Comparing [${getCleanName(college.name)}](/colleges/${college.slug}) Executive MBA with Competitors: ${city} Edition`,
    desc: (college, city) => `Compare ${getCleanName(college.name)} against other top Executive MBA providers in ${city} on fees, rating, and approvals.`,
    keywords: (college, city) => [`${getCleanName(college.name)} vs competitors`, `best mba comparison ${city}`, `online mba reviews`],
    intro: (college, city) => `How does **${college.name}** stack up against other online and distance business colleges in **${city}**? We compare their accreditations, fees, and LMS capabilities to help you decide.`
  },
  {
    title: (college, city) => `Executive MBA Specializations at [${getCleanName(college.name)}](/colleges/${college.slug}): Which is Best in ${city}?`,
    desc: (college, city) => `Read about marketing, finance, HR, and business analytics specializations in the ${getCleanName(college.name)} Executive MBA for ${city} students.`,
    keywords: (college, city) => [`executive mba specializations`, `${getCleanName(college.name)} marketing finance`, `best mba stream ${city}`],
    intro: (college, city) => `Choosing the right specialization can define your future career path. We review the high-paying electives offered in **${college.name}**'s Executive MBA program and how they match up with the job market in **${city}**.`
  },
  {
    title: (college, city) => `Flexible Executive MBA: Reviewing [${getCleanName(college.name)}](/colleges/${college.slug}) LMS & Exams in ${city}`,
    desc: (college, city) => `An analysis of the learning management system (LMS), live lectures, and online proctored exams at ${getCleanName(college.name)} for ${city} students.`,
    keywords: (college, city) => [`flexible mba ${city}`, `${getCleanName(college.name)} lms`, `online proctored exams`],
    intro: (college, city) => `One of the biggest concerns for working professionals in **${city}** is scheduling. We review how **${college.name}** addresses this via its cutting-edge LMS and flexible proctored examinations.`
  },
  {
    title: (college, city) => `Low Fee Executive MBA: [${getCleanName(college.name)}](/colleges/${college.slug}) Review & Scholarship in ${city}`,
    desc: (college, city) => `Learn how to get scholarships, corporate sponsorships, and discounts on the ${getCleanName(college.name)} Executive MBA program in ${city}.`,
    keywords: (college, city) => [`cheap executive mba ${city}`, `${getCleanName(college.name)} scholarship`, `low cost mba`],
    intro: (college, city) => `You don't need to spend millions to get a premium business degree. Let's look at the scholarship schemes and financial aids available for the **${college.name}** Executive MBA program in **${city}**.`
  },
  {
    title: (college, city) => `Why [${getCleanName(college.name)}](/colleges/${college.slug}) Executive MBA is Preferred by Tech Leaders in ${city}`,
    desc: (college, city) => `See why software engineers, product managers, and tech professionals in ${city} choose ${getCleanName(college.name)} Executive MBA.`,
    keywords: (college, city) => [`mba for software engineers`, `${getCleanName(college.name)} tech leaders`, `executive mba ${city}`],
    intro: (college, city) => `For software engineers and tech managers in **${city}**, moving into business administration is crucial for senior corporate roles. **${college.name}** offers the perfect curriculum designed precisely for tech professionals.`
  },
  {
    title: (college, city) => `Is [${getCleanName(college.name)}](/colleges/${college.slug}) Executive MBA Equivalent to Regular MBA? Review for ${city} Students`,
    desc: (college, city) => `Read the latest UGC rules on degree equivalence. Find out if the ${getCleanName(college.name)} online degree matches a regular MBA in ${city}.`,
    keywords: (college, city) => [`online mba equivalence`, `${getCleanName(college.name)} vs regular mba`, `ugc guidelines ${city}`],
    intro: (college, city) => `Under the latest University Grants Commission (UGC) regulations, online and conventional regular degrees are treated on par. Let's look at what this means for **${college.name}** Executive MBA graduates in **${city}**.`
  },
  {
    title: (college, city) => `Admission Timeline 2026: Apply to [${getCleanName(college.name)}](/colleges/${college.slug}) Executive MBA in ${city}`,
    desc: (college, city) => `Get dates, deadlines, last application dates, and seat availability guidelines for the ${getCleanName(college.name)} Executive MBA in ${city}.`,
    keywords: (college, city) => [`${getCleanName(college.name)} admission dates`, `mba registration 2026 ${city}`, `apply online mba`],
    intro: (college, city) => `Aspirants in **${city}** should note that seats for the 2026 batch are filling fast. This timeline guide outlines the crucial application deadlines and processes for **${college.name}** Executive MBA.`
  }
];

// Helper to generate scattered dates between 2026-06-01 and 2026-06-25
function getRandomDate(index) {
  const startDay = 1;
  const day = startDay + (index % 24);
  const formattedDay = day < 10 ? `0${day}` : `${day}`;
  return `2026-06-${formattedDay}`;
}

let generatedCount = 0;

targetColleges.forEach((college) => {
  // For each college, we generate 15 blogs (one for each template + city mapping)
  for (let i = 0; i < 15; i++) {
    const city = cities[i];
    const tpl = templates[i];

    const rawTitle = tpl.title(college, city);
    const cleanSlug = getCleanSlug(college.slug);
    const slug = slugify(`${cleanSlug}-executive-mba-${city}-${i + 1}-2026`);
    const filename = `${slug}.md`;
    const filepath = path.join(postsDir, filename);

    const description = tpl.desc(college, city);
    const introText = tpl.intro(college, city);
    const date = getRandomDate(generatedCount);
    const kw = tpl.keywords(college, city);

    // Calculate dynamic values for template
    const feeText = college.feeText || '₹1.5 Lakhs';
    const accreditation = college.accreditation || 'UGC-DEB approved';
    const rating = college.rating || '4.3';
    const highlights = college.highlights || ['UGC-DEB approved degree', 'Flexible learning model', 'Dedicated placement assistance'];
    const location = college.location || 'India';
    const packageText = college.packageText || '₹5-8 LPA';
    const lms = college.lms || 'Modern LMS';
    const mode = college.mode || 'Online (Live + Self-paced)';

    const markdownBody = `---
title: "${rawTitle}"
date: "${date}"
category: "Online MBA"
description: "${description}"
keywords: ${JSON.stringify(kw)}
---

${introText}

Choosing the right business program is one of the most career-transforming decisions you can make in 2026. Backed by excellent credentials, state-of-the-art learning platforms, and a highly industry-relevant curriculum, the Executive MBA at **${college.name}** is designed to deliver maximum ROI for working professionals in **${city}**.

In this review, we examine the fee structure, eligibility criteria, key highlights, and the reasons why enrolling in this program will accelerate your career trajectory.

---

## 📊 Program Overview & Key Facts (2026)

| Feature | Details |
| :--- | :--- |
| **University** | ${college.name} (${location}) |
| **Accreditation & Approvals** | **${accreditation}** |
| **Program Category** | Executive MBA / Online MBA |
| **Mode of Learning** | ${mode} |
| **Course Duration** | 2 Years (4 Semesters) |
| **Total Program Fee** | **${feeText}** |
| **Average Package (Alumni)** | **${packageText}** |
| **LMS System** | ${lms} |
| **Student Satisfaction Rating** | ⭐ **${rating}/5** |

---

## 💸 Fees & Flexible EMI Options

Investing in your education is highly affordable at ${college.name}. The total fee for the program is **${feeText}**, which can be paid in installments.

* **One-time payment discounts** are available at the beginning of the academic year.
* **Easy Semester-wise Installments** to reduce your financial burden.
* **Zero-Cost EMI Facility** starting from very affordable monthly payments (via bank partners).

> 💡 **Financial Tip:** You can contact our admissions desk to see if you qualify for a merit-based scholarship or corporate sponsor discounts.

---

## 🌟 Why Take Admission in ${college.name}'s MBA?

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

## 💼 Placement and Career Outcomes in ${city}

The dedicated training and placement cell at ${college.name} ensures that students in ${city} transition smoothly into higher-paying roles:
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

If you want a premium learning experience, a recognized degree, and solid career support without spending a fortune, enrolling in **${college.name}'s program** is a highly recommended path. 

---

[👉 Get Free Career Guidance – Talk to an Expert](/inquiry) | [💬 WhatsApp Advisor Mohit Jain](https://wa.me/919560020771)

### 🚀 Enhance Your Placement Chances
Boost your skills and test your preparation! **[Explore Our Premium Mock Test Series 2026](https://www.careerwithmohit.online/tools/mock-tests)** to practice exam topics and advance your IT career.
`;

    fs.writeFileSync(filepath, markdownBody, 'utf8');
    generatedCount++;
  }
});

console.log(`🎉 Successfully generated ${generatedCount} Executive MBA review blogs in the posts directory!`);

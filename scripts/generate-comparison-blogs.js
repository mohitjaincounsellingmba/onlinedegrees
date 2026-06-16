const fs = require('fs');
const path = require('path');

const COLLEGES_DATA = require('../lib/colleges.json');

const postsDir = path.join(__dirname, '../posts');

// Ensure directory exists
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

// Helpers to compute grades and colors dynamically
function getGrade(accreditation) {
  if (accreditation.includes('A++')) return 'A++';
  if (accreditation.includes('A+')) return 'A+';
  if (accreditation.includes('A')) return 'A';
  if (accreditation.includes('B+')) return 'B+';
  return 'A'; // default fallback
}

function getGradeColor(grade) {
  if (grade === 'A++') return 'from-violet-500 to-violet-700';
  if (grade === 'A+') return 'from-blue-500 to-blue-700';
  if (grade === 'A') return 'from-emerald-500 to-emerald-700';
  return 'from-slate-500 to-slate-700';
}

COLLEGES_DATA.forEach(college => {
  // Compute missing properties for legacy template compatibility
  const grade = getGrade(college.accreditation);
  const gradeColor = getGradeColor(grade);
  const feeText = college.feeText;

  // Find direct competitors in the same tier
  let competitors = COLLEGES_DATA.filter(c => c.slug !== college.slug && c.tier === college.tier);
  
  // Fallback if not enough in same tier
  if (competitors.length < 3) {
    competitors = competitors.concat(COLLEGES_DATA.filter(c => c.slug !== college.slug && c.tier !== college.tier));
  }
  
  // Select top 3 competitors
  const selectedCompetitors = competitors.slice(0, 3).map(c => {
    const cGrade = getGrade(c.accreditation);
    return {
      ...c,
      grade: cGrade,
      gradeColor: getGradeColor(cGrade)
    };
  });
  
  const title = `${college.name} vs Competitors: Complete 2026 Comparison Guide`;
  const date = '2026-06-13';
  const category = (college.programs.includes('MBA') || college.programs.includes('PGDM')) ? 'Online MBA' : 'Online Degrees';
  const description = `Read our honest side-by-side comparison of ${college.name} against ${selectedCompetitors.map(c => c.name).join(', ')}. Compare tuition fees, NAAC grades, placement reviews, and find your best fit.`;
  const keywords = [
    `${college.name} comparison`,
    `${college.name} vs competitors`,
    ...selectedCompetitors.map(c => `${college.name} vs ${c.name}`),
    `best online mba comparison 2026`
  ];
  
  // Start compiling markdown body
  let markdown = `---
title: "${title}"
date: "${date}"
category: "${category}"
description: "${description}"
keywords: ${JSON.stringify(keywords)}
---

Choosing the right online university is a crucial step towards your career goals. **${college.name}** is a highly recognized institution, but how does it stack up against its direct competitors like **${selectedCompetitors[0].name}**, **${selectedCompetitors[1].name}**, and **${selectedCompetitors[2].name}**?

In this comprehensive 2026 comparison guide, we analyze tuition fees, accreditations, LMS platforms, and placement support side-by-side to help you choose the program that fits your budget and career aspirations.

---

## 📊 Head-to-Head Comparison Snapshot (2026)

Here is a quick snapshot comparing the key features of these universities:

| Feature | ${college.name} | ${selectedCompetitors[0].name} | ${selectedCompetitors[1].name} | ${selectedCompetitors[2].name} |
| :--- | :--- | :--- | :--- | :--- |
| **NAAC Grade** | **${grade}** | **${selectedCompetitors[0].grade}** | **${selectedCompetitors[1].grade}** | **${selectedCompetitors[2].grade}** |
| **Total Fees** | **${feeText}** | **${selectedCompetitors[0].feeText}** | **${selectedCompetitors[1].feeText}** | **${selectedCompetitors[2].feeText}** |
| **Accreditations** | ${college.approvals.split(', ').slice(0, 3).join(' / ')} | ${selectedCompetitors[0].approvals.split(', ').slice(0, 3).join(' / ')} | ${selectedCompetitors[1].approvals.split(', ').slice(0, 3).join(' / ')} | ${selectedCompetitors[2].approvals.split(', ').slice(0, 3).join(' / ')} |
| **LMS Platform** | ${college.lms} | ${selectedCompetitors[0].lms} | ${selectedCompetitors[1].lms} | ${selectedCompetitors[2].lms} |
| **Mode** | ${college.mode} | ${selectedCompetitors[0].mode} | ${selectedCompetitors[1].mode} | ${selectedCompetitors[2].mode} |

---

## 🔍 Detailed Comparisons

### 1. ${college.name} vs ${selectedCompetitors[0].name}

Comparing **${college.name}** and **${selectedCompetitors[0].name}**, the primary distinction lies in pricing and academic heritage. 
- **Fees:** ${college.name} costs ${feeText} for the full program compared to ${selectedCompetitors[0].name} at ${selectedCompetitors[0].feeText}.
- **Accreditation:** ${college.name} holds a **NAAC ${grade}** rating, while ${selectedCompetitors[0].name} holds a **NAAC ${selectedCompetitors[0].grade}** rating.
- **LMS:** ${college.name} teaches via its **${college.lms}** platform, while ${selectedCompetitors[0].name} uses **${selectedCompetitors[0].lms}**.

*Verdict:* If you prioritize **${college.highlights[0]}**, ${college.name} is a strong option. If you are seeking **${selectedCompetitors[0].highlights[0]}**, then ${selectedCompetitors[0].name} might be the better choice.

---

### 2. ${college.name} vs ${selectedCompetitors[1].name}

This comparison pairs **${college.name}** with **${selectedCompetitors[1].name}**.
- **Fees & Value:** ${college.name}'s tuition of ${feeText} matches up against ${selectedCompetitors[1].feeText} at ${selectedCompetitors[1].name}.
- **Accreditation:** ${college.name} holds **${college.accreditation}** vs ${selectedCompetitors[1].name}'s **${selectedCompetitors[1].accreditation}**.
- **Learning Experience:** ${college.name} provides ${college.mode} learning. In comparison, ${selectedCompetitors[1].name} offers ${selectedCompetitors[1].mode}.

*Verdict:* Choose ${college.name} if you want **${college.highlights[1]}**. Choose ${selectedCompetitors[1].name} if you want **${selectedCompetitors[1].highlights[1]}**.

---

### 3. ${college.name} vs ${selectedCompetitors[2].name}

Lastly, let's look at **${college.name}** side-by-side with **${selectedCompetitors[2].name}**.
- **Pricing:** ${college.name} is priced at ${feeText} compared to ${selectedCompetitors[2].feeText} at ${selectedCompetitors[2].name}.
- **Key Focus:** ${college.name} specializes in courses like ${college.programs.slice(0, 3).join(', ')} while ${selectedCompetitors[2].name} is preferred for ${selectedCompetitors[2].programs.slice(0, 3).join(', ')}.
- **Highlights:** ${college.name} features **${college.highlights[2] || 'excellent flexiblity'}**, whereas ${selectedCompetitors[2].name} features **${selectedCompetitors[2].highlights[2] || 'strong support'}**.

*Verdict:* Select ${college.name} if you prefer a program located in ${college.location}. Select ${selectedCompetitors[2].name} if you prefer ${selectedCompetitors[2].location} and want **${selectedCompetitors[2].highlights[0]}**.

---

## 🏆 Final Verdict: Which One Should You Choose?

Use the following profiles to make your final choice:

- **Choose ${college.name} if:**
  - You want a globally recognized degree with approvals like *${college.approvals}*.
  - You are targeting features like: *${college.highlights.join(' | ')}*.
  - You want a degree specialized in programs like *${college.programs.join(', ')}*.

- **Choose ${selectedCompetitors[0].name} if:**
  - You prefer a ${selectedCompetitors[0].tier} program focusing on *${selectedCompetitors[0].highlights[1]}*.
  - Your budget aligns better with *${selectedCompetitors[0].feeText}*.

- **Choose ${selectedCompetitors[1].name} if:**
  - You are looking for a program based in *${selectedCompetitors[1].location}* with *${selectedCompetitors[1].highlights[0]}*.

- **Choose ${selectedCompetitors[2].name} if:**
  - You want *${selectedCompetitors[2].highlights[2] || 'good LMS and exam modes'}* and a total fee of *${selectedCompetitors[2].feeText}*.

---

## ❓ Frequently Asked Questions (FAQ)

**Q1. Are degrees from ${college.name} recognized by government bodies?**
Yes. ${college.name} holds approvals from UGC-DEB and relevant councils (like AICTE/AIU where applicable), making its online degree fully valid for government job applications, higher education, and corporate employment.

**Q2. Does ${college.name} offer zero-cost EMI options for tuition fees?**
Yes, most top online universities, including ${college.name} and its competitors, offer zero-interest EMI financing schemes ranging from 6 to 24 months to help students manage expenses.

**Q3. How is the placement assistance handled at these universities?**
All these universities offer placement support, including resume writing workshops, access to job portals, and virtual recruitment drives. While placements are not 100% guaranteed, candidates with prior work experience often get 20-45% salary hikes upon completion.

---

[👉 Get Free Career Guidance – Talk to an Expert](/inquiry) | [💬 WhatsApp Advisor Mohit Jain](https://wa.me/919560020771)
`;

  // Filename slug formatting
  const filename = `${college.slug}-vs-competitors-comparison-2026.md`;
  const filepath = path.join(postsDir, filename);
  
  fs.writeFileSync(filepath, markdown, 'utf8');
  console.log(`✅ Generated comparison blog: ${filename}`);
});

console.log('🎉 Successfully generated comparison blogs for all 34 universities!');

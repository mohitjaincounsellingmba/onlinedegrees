export interface DetectedDegree {
  id: string;
  name: string;
  badge: string;
  subText: string;
  waText: string;
}

export function detectDegree(slug: string = '', title: string = '', category: string = ''): DetectedDegree {
  const combined = `${slug} ${title} ${category}`.toLowerCase();

  if (combined.includes('executive') || combined.includes('emba') || combined.includes('working professional')) {
    return {
      id: 'executive-mba',
      name: 'Executive MBA',
      badge: '1-Year Fast-Track for Working Professionals',
      subText: 'IIM, XLRI, Amity & DY Patil Executive degrees with weekend LMS & leadership networking.',
      waText: 'Hi Mohit Sir, I am an experienced professional interested in 1-Year Executive MBA. Please share university options, fees, and eligibility.'
    };
  }

  if (combined.includes('bba') || combined.includes('bachelor of business')) {
    return {
      id: 'online-bba',
      name: 'Online BBA',
      badge: 'High-ROI 3-Year Management Degree',
      subText: 'UGC-recognized degrees starting ₹12,500/semester with corporate internships and 100% online exams.',
      waText: 'Hi Mohit Sir, I am looking for Online BBA admissions (2026 Batch). Please share the best universities, fee concession, and placement guidance.'
    };
  }

  if (combined.includes('mca') || combined.includes('master of computer')) {
    return {
      id: 'online-mca',
      name: 'Online MCA',
      badge: 'High-Growth Tech Career (AI, Cloud & Full Stack)',
      subText: 'Top tech placements with TCS, Wipro, Infosys. Non-CS graduates eligible with bridge courses.',
      waText: 'Hi Mohit Sir, I want to pursue Online MCA (2026 Batch). Please share colleges with Cloud/AI specialization and top tech placements.'
    };
  }

  if (combined.includes('bca') || combined.includes('bachelor of computer')) {
    return {
      id: 'online-bca',
      name: 'Online BCA',
      badge: 'Premier Tech Degree After 12th',
      subText: 'No coding or 12th maths required in top universities. Monthly EMI starting ₹2,999/month.',
      waText: 'Hi Mohit Sir, I want admission guidance for Online BCA (2026 session). Please help me compare affordable universities and syllabus.'
    };
  }

  // Default to Online MBA (covers general MBA and general degrees)
  return {
    id: 'online-mba',
    name: 'Online MBA',
    badge: 'July–Sept 2026 Admissions Open',
    subText: 'Compare 50+ UGC-DEB approved universities (Amity, LPU, Chandigarh, DY Patil, Manipal) with 0% EMI.',
    waText: 'Hi Mohit Sir, I am planning for Online MBA admissions (2026 Batch). Please share the top university shortlist, fee comparison, and scholarship options.'
  };
}

'use client';

import { useState, useMemo } from 'react';
import {
  MapPin, BadgeCheck, IndianRupee, GraduationCap, Search,
  X, SlidersHorizontal, Phone, ChevronDown, BookOpen,
  Building2, Star, Award
} from 'lucide-react';

export const COLLEGES = [
  {
    name: 'Amity University Online',
    location: 'Noida, UP',
    fee: '₹1,99,000',
    feeNum: 199000,
    accreditation: 'NAAC A+ | UGC | AICTE | WES',
    programs: ['MBA', 'BBA', 'MCA', 'BCA', 'B.Com', 'MA'],
    badge: 'Top Rated',
    grade: 'A+',
    gradeColor: 'from-blue-500 to-blue-700',
    about: 'Amity University Online is one of India\'s most trusted online education platforms, backed by the Amity Group. Globally recognized with WES approval, Amity offers internationally accepted degrees across management, technology, and humanities.',
    highlights: ['WES Approved for global recognition', 'NAAC A+ Accredited', 'Placement assistance available', 'Live + recorded sessions', 'EMI options available'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: 'Online (Live + Self-paced)',
    approvals: 'UGC-DEB, AICTE, NAAC A+, WES, AIU',
    whatsapp: '919560020771',
  },
  {
    name: 'Chandigarh University Online',
    location: 'Chandigarh',
    fee: '₹1,65,000',
    feeNum: 165000,
    accreditation: 'NAAC A+ | UGC | QS Ranked',
    programs: ['MBA', 'BBA', 'MCA', 'BCA', 'M.Com'],
    badge: 'Popular',
    grade: 'A+',
    gradeColor: 'from-emerald-500 to-emerald-700',
    about: 'Chandigarh University is a QS World-ranked institution offering industry-aligned online programs. Known for strong placement records and a robust alumni network, CU Online bridges academic excellence with real-world outcomes.',
    highlights: ['QS World University Ranked', '#1 in Punjab for placements', 'Industry mentors from Fortune 500', '100+ specializations available', 'Scholarships available'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: 'Online (Live + Recorded)',
    approvals: 'UGC-DEB, NAAC A+, QS Ranked, NIRF',
    whatsapp: '919560020771',
  },
  {
    name: 'D.Y Patil University - Online (Pune)',
    location: 'Pune, Maharashtra',
    fee: '₹1,89,400',
    feeNum: 189400,
    accreditation: 'NAAC A++ | UGC | AICTE | NIRF | WES',
    programs: ['MBA', 'BBA', 'MCA', 'BCA', 'B.Sc'],
    badge: 'NAAC A++',
    grade: 'A++',
    gradeColor: 'from-violet-500 to-violet-700',
    about: 'D.Y. Patil University Pune carries a legacy of over 30 years in education. Its online arm is NAAC A++ accredited — the highest possible grade — making it one of the most credible online education options in India.',
    highlights: ['Highest NAAC A++ grade', 'WES approved for Canada/USA', 'Strong healthcare + management focus', 'Industry-integrated curriculum', 'Flexible batch timings'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: 'Online (Blended)',
    approvals: 'UGC-DEB, NAAC A++, AICTE, NIRF, WES',
    whatsapp: '919560020771',
  },
  {
    name: 'Jain University Online',
    location: 'Bangalore, Karnataka',
    fee: '₹1,96,000',
    feeNum: 196000,
    accreditation: 'NAAC A++ | UGC | AICTE | NIRF | WES',
    programs: ['MBA', 'BBA', 'MCA', 'BCA', 'MA', 'M.Com'],
    badge: 'Top Choice',
    grade: 'A++',
    gradeColor: 'from-violet-500 to-violet-700',
    about: 'Jain University Online is based in Bangalore, the tech capital of India. NAAC A++ rated with a strong focus on innovation, entrepreneurship, and technology-driven education. Ideal for learners looking for a modern, career-focused degree.',
    highlights: ['NAAC A++ + WES Globally recognized', 'Bangalore ecosystem advantage', 'Startup-friendly environment', 'Dedicated career services', 'Specializations in Data Science, Marketing, Finance'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: 'Online (Live Classes)',
    approvals: 'UGC-DEB, NAAC A++, AICTE, NIRF, WES',
    whatsapp: '919560020771',
  },
  {
    name: 'Lovely Professional University (LPU) Online',
    location: 'Phagwara, Punjab',
    fee: '₹1,61,600',
    feeNum: 161600,
    accreditation: 'NAAC A++ | UGC | AICTE | NIRF | AIU',
    programs: ['MBA', 'BBA', 'MCA', 'BCA', 'M.Sc', 'MA'],
    badge: 'NAAC A++',
    grade: 'A++',
    gradeColor: 'from-violet-500 to-violet-700',
    about: 'LPU is India\'s largest university by enrollment, known for exceptional placement records and strong industry ties. Its online division offers NAAC A++ quality education at a competitive price, accessible from anywhere in India.',
    highlights: ["India's largest university", 'Record placements at ₹1Cr+', 'AIU member (global recognition)', 'Huge alumni network of 2L+', 'Internship + placement support'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: 'Online (LPU eConnect Platform)',
    approvals: 'UGC-DEB, NAAC A++, AICTE, NIRF, AIU',
    whatsapp: '919560020771',
  },
  {
    name: 'Manipal University Jaipur Online',
    location: 'Jaipur, Rajasthan',
    fee: '₹1,75,000',
    feeNum: 175000,
    accreditation: 'NAAC A+ | UGC | AICTE | NIRF | WES',
    programs: ['MBA', 'BBA', 'MCA', 'BCA', 'M.Com'],
    badge: 'Preferred',
    grade: 'A+',
    gradeColor: 'from-amber-500 to-amber-700',
    about: 'Manipal University Jaipur is part of the prestigious Manipal Education Group, one of India\'s most respected higher education brands. The online programs carry the same Manipal quality with WES recognition for global learners.',
    highlights: ['Part of Manipal Education Group', 'WES approved (Canada/USA)', 'NIRF ranked institute', 'Strong industry curriculum', 'Flexible weekend batches'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: 'Online (Weekend + Weekday batches)',
    approvals: 'UGC-DEB, NAAC A+, AICTE, NIRF, WES',
    whatsapp: '919560020771',
  },
  {
    name: 'Jaipuria Institute of Management - Online PGDM',
    location: 'Noida (Corporate Office)',
    fee: '₹1,40,000',
    feeNum: 140000,
    accreditation: 'NAAC A | AICTE | NBA | AIU | AACSB',
    programs: ['PGDM'],
    badge: 'AICTE Approved',
    grade: 'A',
    gradeColor: 'from-orange-500 to-orange-700',
    about: 'Jaipuria Institute of Management is one of India\'s premier management institutes. Its Online PGDM is AICTE-approved and recognized by AIU as equivalent to an MBA. The program is designed for working professionals seeking high-quality management education with flexible weekend live sessions.',
    highlights: ['AICTE approved & AIU recognized (MBA equivalent)', 'AACSB Business Education Alliance Member', 'Top-50 NIRF ranked management institute legacy', 'Dual specialization in Marketing, HR, Finance, Analytics', '12 hours of live sessions per course'],
    duration: '2 Years (PG)',
    mode: 'Online (Weekend Live + Recorded)',
    approvals: 'AICTE, NBA, NAAC A, AIU, NIRF',
    whatsapp: '919560020771',
  },
  {
    name: 'Sikkim Manipal University Online',
    location: 'Gangtok, Sikkim',
    fee: '₹1,10,000',
    feeNum: 110000,
    accreditation: 'NAAC A+ | UGC-DEB | NIRF',
    programs: ['MBA', 'BBA', 'MCA', 'BCA', 'M.Com'],
    badge: 'Value Pick',
    grade: 'A+',
    gradeColor: 'from-teal-500 to-teal-700',
    about: 'SMU Online (Sikkim Manipal University) is a pioneer in distance/online education in India with 20+ years of experience. Known for affordable fees and solid UGC-DEB accreditation, SMU is a safe and trusted pick for working professionals.',
    highlights: ['20+ years in online education', 'One of the most affordable NAAC A+ options', 'Recognized by UGC-DEB', 'Large student community', 'Strong for working professionals'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: 'Online + Study Center Support',
    approvals: 'UGC-DEB, NAAC A+, NIRF',
    whatsapp: '919560020771',
  },
  {
    name: 'NMIMS Online',
    location: 'Mumbai, Maharashtra',
    fee: '₹2,00,000',
    feeNum: 200000,
    accreditation: 'NAAC A+ | UGC | AICTE',
    programs: ['MBA', 'BBA', 'B.Com', 'Diploma'],
    badge: 'Premium',
    grade: 'A+',
    gradeColor: 'from-rose-500 to-rose-700',
    about: 'NMIMS (Narsee Monjee Institute of Management Studies) is a top-5 private business school brand in India. The online division maintains NMIMS standards with UGC approval, offering strong career outcomes especially in Finance and Marketing.',
    highlights: ['Top-5 B-school brand in India', 'Strong Mumbai finance industry network', 'Premium quality at online pricing', 'AICTE + UGC approved', 'Finance & Marketing specializations'],
    duration: '2 Years (MBA) / 3 Years (BBA/B.Com)',
    mode: 'Online (Premium Live Sessions)',
    approvals: 'UGC-DEB, NAAC A+, AICTE',
    whatsapp: '919560020771',
  },
  {
    name: 'Uttaranchal University Online',
    location: 'Dehradun, Uttarakhand',
    fee: '₹98,000',
    feeNum: 98000,
    accreditation: 'NAAC A+ | UGC | AICTE',
    programs: ['MBA', 'BBA', 'MCA', 'BCA', 'BA'],
    badge: 'Affordable',
    grade: 'A+',
    gradeColor: 'from-green-500 to-green-700',
    about: 'Uttaranchal University offers one of the most affordable NAAC A+ online degrees in India. Based in Dehradun, it is a great option for students seeking quality education on a tight budget without compromising on accreditation.',
    highlights: ['Most affordable NAAC A+ option', 'UGC + AICTE approved', 'Simple admission process', 'EMI options available', 'Ideal for working professionals on a budget'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: 'Online (Self-paced + Live)',
    approvals: 'UGC-DEB, NAAC A+, AICTE',
    whatsapp: '919560020771',
  },
  {
    name: 'Vivekananda Global University Online',
    location: 'Jaipur, Rajasthan',
    fee: '₹1,50,000',
    feeNum: 150000,
    accreditation: 'NAAC A+ | UGC | AICTE',
    programs: ['MBA', 'BBA', 'MCA', 'BCA', 'M.Com'],
    badge: 'Trending',
    grade: 'A+',
    gradeColor: 'from-orange-500 to-orange-700',
    about: 'VGU (Vivekananda Global University) is a rising name in Jaipur\'s education scene. Known for modern curriculum and strong faculty, VGU Online is gaining traction among Rajasthan-based students seeking quality online education.',
    highlights: ['NAAC A+ certified', 'Modern outcome-based curriculum', 'Good for Rajasthan-based students', 'Industry-aligned programs', 'Active student clubs and activities'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: 'Online (Live + Recorded)',
    approvals: 'UGC-DEB, NAAC A+, AICTE',
    whatsapp: '919560020771',
  },
  {
    name: 'Parul University Online',
    location: 'Vadodara, Gujarat',
    fee: '₹1,50,000',
    feeNum: 150000,
    accreditation: 'NAAC A++ | UGC | NIRF',
    programs: ['MBA', 'BBA', 'MCA', 'BCA', 'MA'],
    badge: 'NAAC A++',
    grade: 'A++',
    gradeColor: 'from-violet-500 to-violet-700',
    about: 'Parul University is one of Gujarat\'s largest private universities with NAAC A++ accreditation — a rarity for online providers. Based in Vadodara, it offers excellent value with a strong focus on practical, industry-ready curriculum.',
    highlights: ['NAAC A++ at competitive pricing', 'Gujarat\'s top university brand', 'Strong healthcare, engineering, management focus', 'Active industry partnerships', 'Merit scholarships available'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: 'Online (Blended Learning)',
    approvals: 'UGC-DEB, NAAC A++, NIRF',
    whatsapp: '919560020771',
  },
  {
    name: 'Andhra University Online',
    location: 'Visakhapatnam, AP',
    fee: '₹62,200',
    feeNum: 62200,
    accreditation: 'NAAC A | UGC | NIRF',
    programs: ['MBA', 'MCA', 'B.Com', 'BA'],
    badge: 'Budget Friendly',
    grade: 'A',
    gradeColor: 'from-green-500 to-green-700',
    about: 'Andhra University is one of India\'s oldest and most respected state universities, established in 1926. Their online program is one of the most affordable in the country, ideal for students who need a recognized degree at minimal cost.',
    highlights: ['100+ year old institution', 'Lowest fees at ₹62,200', 'Legacy government university brand', 'NIRF ranked', 'Ideal for budget-conscious learners'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: 'Online (ODL Mode)',
    approvals: 'UGC-DEB, NAAC A, NIRF',
    whatsapp: '919560020771',
  },
  {
    name: 'Shoolini University Online',
    location: 'Solan, Himachal Pradesh',
    fee: '₹1,10,000',
    feeNum: 110000,
    accreditation: 'NAAC A | UGC | NIRF',
    programs: ['MBA', 'BBA', 'B.Com', 'BA', 'MA'],
    badge: 'Popular',
    grade: 'A',
    gradeColor: 'from-blue-500 to-blue-700',
    about: 'Shoolini University is a private university nestled in Himachal Pradesh, known for research excellence and strong industry connections. The online arm brings this quality to learners across India at a reasonable fee.',
    highlights: ['Research-driven institution', 'Strong pharma + management programs', 'Nature campus vibes', 'Accredited by NAAC and NIRF', 'Flexible batch options'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: 'Online (Self-paced + Live)',
    approvals: 'UGC-DEB, NAAC A, NIRF',
    whatsapp: '919560020771',
  },
  {
    name: 'SRM University Online',
    location: 'Chennai, Tamil Nadu',
    fee: '₹1,00,000',
    feeNum: 100000,
    accreditation: 'NAAC A++ | UGC | AICTE | NIRF',
    programs: ['MBA', 'MCA', 'BBA', 'BCA'],
    badge: 'NAAC A++',
    grade: 'A++',
    gradeColor: 'from-violet-500 to-violet-700',
    about: 'SRM University is one of South India\'s most prominent private universities. NAAC A++ rated, SRM Online delivers strong management and technology programs with excellent placement support and a massive South Indian alumni network.',
    highlights: ['NAAC A++ university', 'Strong South India alumni network', 'Excellent tech + management programs', 'AICTE + NIRF recognized', 'Affordable at ₹1L for NAAC A++'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: 'Online (SRM e-Learning Portal)',
    approvals: 'UGC-DEB, NAAC A++, AICTE, NIRF',
    whatsapp: '919560020771',
  },
  {
    name: 'Galgotias University Online',
    location: 'Greater Noida, UP',
    fee: '₹90,000',
    feeNum: 90000,
    accreditation: 'NAAC A+ | UGC | AICTE',
    programs: ['MBA', 'MCA', 'BBA', 'BCA'],
    badge: 'Affordable',
    grade: 'A+',
    gradeColor: 'from-green-500 to-green-700',
    about: 'Galgotias University in Greater Noida is perfectly positioned in the Delhi NCR corridor. NAAC A+ rated, it offers affordable online programs with strong industry exposure from India\'s electronics and IT manufacturing hub.',
    highlights: ['Delhi NCR location advantage', 'NAAC A+ at just ₹90,000', 'Strong industry tie-ups in NCR', 'AICTE approved', 'Great for Delhi NCR-based students'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: 'Online (Live + Recorded)',
    approvals: 'UGC-DEB, NAAC A+, AICTE',
    whatsapp: '919560020771',
  },
  {
    name: 'Vignan University Online',
    location: 'Guntur, Andhra Pradesh',
    fee: '₹1,00,000',
    feeNum: 100000,
    accreditation: 'NAAC A+ | UGC | AICTE | NIRF',
    programs: ['MBA', 'BBA', 'MCA', 'BCA'],
    badge: 'Recommended',
    grade: 'A+',
    gradeColor: 'from-teal-500 to-teal-700',
    about: 'Vignan University is a prominent institution in Andhra Pradesh known for technical and management education. The online division carries NAAC A+ credibility with NIRF ranking recognition, offering quality programs at very fair pricing.',
    highlights: ['Strong technical education heritage', 'NAAC A+ + NIRF ranked', 'AICTE + UGC approved', 'Good for South India-based learners', 'Industry mentorship programs'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: 'Online (Live Classes)',
    approvals: 'UGC-DEB, NAAC A+, AICTE, NIRF',
    whatsapp: '919560020771',
  },
  {
    name: 'Kalinga University Online',
    location: 'Raipur, Chhattisgarh',
    fee: '₹80,000',
    feeNum: 80000,
    accreditation: 'NAAC B+ | UGC | AICTE',
    programs: ['MBA', 'MCA', 'BBA', 'BCA'],
    badge: 'Value Pick',
    grade: 'B+',
    gradeColor: 'from-amber-500 to-amber-700',
    about: 'Kalinga University in Raipur offers online programs at some of the most budget-friendly rates in Central India. While NAAC B+, it holds full UGC and AICTE approval, making it a solid choice for students seeking genuine but affordable online education.',
    highlights: ['Most affordable at ₹80,000', 'UGC + AICTE approved', 'Good for Central India learners', 'Fast admission process', 'Easy EMI options'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: 'Online (Self-Paced)',
    approvals: 'UGC-DEB, NAAC B+, AICTE',
    whatsapp: '919560020771',
  },
  {
    name: 'Chitkara University Online',
    location: 'Rajpura, Punjab',
    fee: '₹2,00,000',
    feeNum: 200000,
    accreditation: 'NAAC A+ | UGC | AICTE | NIRF',
    programs: ['MBA', 'BBA', 'MCA', 'BCA'],
    badge: 'Premium',
    grade: 'A+',
    gradeColor: 'from-rose-500 to-rose-700',
    about: 'Chitkara University is Punjab\'s leading private university with a strong focus on innovation and technology-driven education. The online programs are well-structured with strong industry collaborations and placement support.',
    highlights: ['Punjab\'s top private university', 'Strong research focus', 'Industry 4.0 aligned curriculum', 'NAAC A+ + NIRF recognized', 'Premium learning experience'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: 'Online (Premium LMS)',
    approvals: 'UGC-DEB, NAAC A+, AICTE, NIRF',
    whatsapp: '919560020771',
  },
  {
    name: 'OP Jindal Global University Online',
    location: 'Sonipat, Haryana',
    fee: '₹1,80,000',
    feeNum: 180000,
    accreditation: 'NAAC A | UGC | AACSB | QS Ranked',
    programs: ['MBA', 'BBA', 'MA', 'BA'],
    badge: 'Global Ranking',
    grade: 'A',
    gradeColor: 'from-indigo-500 to-indigo-700',
    about: 'OP Jindal Global University is India\'s only private university ranked in QS World Rankings with AACSB accreditation — the gold standard for business schools globally. Ideal for students with global career ambitions.',
    highlights: ['Only Indian private university with AACSB', 'QS World Rankings recognized', 'Global faculty from top universities', 'Excellent for international careers', 'Premium brand for MBAs'],
    duration: '2 Years (MBA/MA) / 3 Years (BBA/BA)',
    mode: 'Online (Global Standard LMS)',
    approvals: 'UGC-DEB, NAAC A, AACSB, QS World',
    whatsapp: '919560020771',
  },
  {
    name: 'Jamia Hamdard University Online',
    location: 'New Delhi',
    fee: '₹1,03,500',
    feeNum: 103500,
    accreditation: 'NAAC A | UGC | AICTE',
    programs: ['MBA', 'BBA', 'MCA', 'BCA'],
    badge: 'Delhi NCR',
    grade: 'A',
    gradeColor: 'from-blue-500 to-blue-700',
    about: 'Jamia Hamdard is one of Delhi\'s most respected institutions with a strong Unani, pharmacy, and management legacy. The online programs carry the Jamia Hamdard brand value and are ideal for Delhi NCR-based learners.',
    highlights: ['Delhi-based prestigious institution', 'Strong management + pharma legacy', 'NAAC A rated', 'Excellent value for Delhi NCR students', 'UGC + AICTE approved'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: 'Online (Blended)',
    approvals: 'UGC-DEB, NAAC A, AICTE',
    whatsapp: '919560020771',
  },
  {
    name: 'Manav Rachna University Online',
    location: 'Faridabad, Haryana',
    fee: '₹1,28,000',
    feeNum: 128000,
    accreditation: 'NAAC A | UGC-DEB | AICTE',
    programs: ['MBA', 'BBA', 'MCA', 'BCA'],
    badge: 'Popular',
    grade: 'A',
    gradeColor: 'from-emerald-500 to-emerald-700',
    about: 'Manav Rachna University in Faridabad is a well-established NCR institution known for strong management and engineering programs. The online arm is UGC-DEB recognized, serving both fresh graduates and working professionals.',
    highlights: ['Strong NCR presence', 'Faridabad\'s top university', 'UGC-DEB + AICTE + NAAC A', 'Good for Delhi-Haryana students', 'Active industry collaborations'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: 'Online (Live + LMS)',
    approvals: 'UGC-DEB, NAAC A, AICTE',
    whatsapp: '919560020771',
  },
  {
    name: 'Mody University Online',
    location: 'Lakshmangarh, Rajasthan',
    fee: '₹90,000',
    feeNum: 90000,
    accreditation: 'NAAC A+ | UGC | AICTE',
    programs: ['MBA', 'BBA', 'MCA', 'BCA'],
    badge: 'Affordable',
    grade: 'A+',
    gradeColor: 'from-green-500 to-green-700',
    about: 'Mody University is a unique women-first (co-ed online) university in Rajasthan with NAAC A+ accreditation. One of the best value propositions in online education — NAAC A+ quality at just ₹90,000.',
    highlights: ['NAAC A+ at just ₹90,000', 'Rajasthan\'s hidden gem', 'UGC + AICTE approved', 'Flexible learning options', 'Great for women professionals'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: 'Online (Self-Paced + Live)',
    approvals: 'UGC-DEB, NAAC A+, AICTE',
    whatsapp: '919560020771',
  },
  {
    name: 'Guru Kashi University Online',
    location: 'Bathinda, Punjab',
    fee: '₹1,00,000',
    feeNum: 100000,
    accreditation: 'NAAC A++',
    programs: ['MBA', 'BBA', 'MCA', 'BCA'],
    badge: 'NAAC A++',
    grade: 'A++',
    gradeColor: 'from-violet-500 to-violet-700',
    about: 'Guru Kashi University in Bathinda is Punjab\'s standout NAAC A++ institution offering online degrees at just ₹1 Lakh. ISO-certified processes and UGC approval make this one of the most underrated but credible options in online education.',
    highlights: ['NAAC A++ at just ₹1 Lakh', 'ISO certified processes', 'UGC approved', 'Great for Punjab-based learners', 'Underrated but highly credible'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: 'Online (LMS Portal)',
    approvals: 'UGC-DEB, NAAC A++, ISO 9001',
    whatsapp: '919560020771',
  },
  {
    name: 'SASTRA University Online',
    location: 'Thanjavur, Tamil Nadu',
    fee: '₹2,20,000',
    feeNum: 220000,
    accreditation: 'NAAC A++ | UGC-DEB | NIRF',
    programs: ['MBA', 'MCA', 'M.Com', 'B.Com'],
    badge: 'Premium',
    grade: 'A++',
    gradeColor: 'from-violet-500 to-violet-700',
    about: 'SASTRA University is a highly respected institution in Tamil Nadu with NAAC A++ rating. Known for engineering and management excellence, SASTRA Online offers premium education with strong placement outcomes and NIRF recognition.',
    highlights: ['NAAC A++ prestigious institution', 'NIRF ranked nationally', 'Strong Tamil Nadu industry connect', 'Premium academic standards', 'Excellent for M.Com and MBA'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: 'Online (SASTRA Learning Hub)',
    approvals: 'UGC-DEB, NAAC A++, NIRF',
    whatsapp: '919560020771',
  },
  {
    name: 'Kurukshetra University Online',
    location: 'Kurukshetra, Haryana',
    fee: '₹98,545',
    feeNum: 98545,
    accreditation: 'NAAC A+ | UGC | AICTE',
    programs: ['MBA', 'MCA', 'BBA', 'BCA'],
    badge: 'Trusted',
    grade: 'A+',
    gradeColor: 'from-teal-500 to-teal-700',
    about: 'Kurukshetra University is one of Haryana\'s oldest and most respected state universities, established in 1956. The online programs carry decades of academic credibility and NAAC A+ recognition at a near-budget price point.',
    highlights: ['70+ year old institution', 'Haryana\'s top government university', 'NAAC A+ accredited', 'Under ₹1 Lakh fees', 'Excellent for Haryana-based learners'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: 'Online (ODL Mode)',
    approvals: 'UGC-DEB, NAAC A+, AICTE',
    whatsapp: '919560020771',
  },
  {
    name: 'UPES Online',
    location: 'Dehradun, Uttarakhand',
    fee: '₹1,80,000',
    feeNum: 180000,
    accreditation: 'NAAC A | UGC | AICTE | NIRF',
    programs: ['MBA', 'BBA', 'MCA', 'B.Tech'],
    badge: 'Trending',
    grade: 'A',
    gradeColor: 'from-orange-500 to-orange-700',
    about: 'UPES (University of Petroleum and Energy Studies) is a niche institution renowned for its specializations in energy, logistics, and sustainability management. The online programs appeal to professionals in core industry sectors seeking niche MBA/management credentials.',
    highlights: ['Unique energy/logistics MBA niche', 'NIRF ranked', 'Strong industry-academia programs', 'Good for oil, gas, supply chain professionals', 'AICTE + UGC-DEB approved'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: 'Online (UPES Online Platform)',
    approvals: 'UGC-DEB, NAAC A, AICTE, NIRF',
    whatsapp: '919560020771',
  },
  {
    name: 'Symbiosis Centre for Distance Learning (SCDL)',
    location: 'Pune, Maharashtra',
    fee: '₹74,000',
    feeNum: 74000,
    accreditation: 'NAAC A++ | UGC | AICTE | ISO',
    programs: ['PGDBA', 'MBA', 'PG Diploma', 'Diploma'],
    badge: 'Category-I',
    grade: 'A++',
    gradeColor: 'from-violet-500 to-violet-700',
    about: 'SCDL is a premier distance learning institution in India, offering industry-relevant postgraduate programs designed for working professionals. A pioneer since 2001, it provides a student-centric digital ecosystem with robust placement assistance.',
    highlights: ['AICTE approved postgraduate programs', 'Over 2 decades of distance learning excellence', 'Robust placement assistance (3000+ offers)', 'ISO 9001:2015 Certified institution', 'Advanced e-learning resources'],
    duration: '2 Years (PG) / 1 Year (Diploma)',
    mode: 'Hybrid (Online/Distance)',
    approvals: 'UGC-DEB, AICTE, NAAC A++, ISO',
    whatsapp: '919560020771',
  },
  {
    name: 'Amrita Vishwa Vidyapeetham Online',
    location: 'Coimbatore, Tamil Nadu',
    fee: '₹1,70,000',
    feeNum: 170000,
    accreditation: 'NAAC A++ | UGC | AICTE | NIRF Top 10',
    programs: ['MBA', 'MCA', 'BBA', 'BCA', 'M.Com'],
    badge: 'UGC Category-I',
    grade: 'A++',
    gradeColor: 'from-violet-500 to-violet-700',
    about: 'Amrita Vishwa Vidyapeetham is a top-ranked private research university bringing world-class academic excellence to the digital space. Programs feature mentorship from distinguished PhD faculty and an AI-integrated interactive learning platform.',
    highlights: ['NIRF Rank 7 (University Category)', 'Highest NAAC A++ accreditation', 'AI-integrated interactive learning platform', 'Mentorship from world-class PhD faculty', 'Values-based holistic education model'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: '100% Online',
    approvals: 'UGC-DEB, NAAC A++, AICTE, NIRF, WES',
    whatsapp: '919560020771',
  },
  {
    name: 'KL University Online',
    location: 'Vijayawada/Guntur, AP',
    fee: '₹1,20,000',
    feeNum: 120000,
    accreditation: 'NAAC A++ | UGC | AICTE | NIRF Top 50',
    programs: ['MBA', 'MCA', 'BBA', 'BCA'],
    badge: 'NAAC A++',
    grade: 'A++',
    gradeColor: 'from-violet-500 to-violet-700',
    about: 'KL University (Deemed to be University) is globally recognized for academic rigor and innovation. Online programs emphasize research-driven curriculum and project-based learning to prepare students for the global workforce.',
    highlights: ['UGC Category-I University status', 'AICTE approved MBA & MCA', 'Project-based learning approach', 'Strong research & innovation ecosystem', 'Consistent track record of MNC placements'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: '100% Online',
    approvals: 'UGC-DEB, NAAC A++, AICTE, NIRF',
    whatsapp: '919560020771',
  },
  {
    name: 'DY Patil Vidyapeeth Online (Navi Mumbai)',
    location: 'Navi Mumbai, MH',
    fee: '₹1,40,000',
    feeNum: 140000,
    accreditation: 'NAAC A++ | UGC | AICTE | NIRF Rank 44',
    programs: ['MBA', 'BBA', 'B.Sc Hotel Mgmt', 'Executive MBA'],
    badge: 'Premium',
    grade: 'A++',
    gradeColor: 'from-violet-500 to-violet-700',
    about: 'D.Y. Patil University, Navi Mumbai, is dedicated to professional excellence through industry-relevant programs. The online division offers flexible degrees with worldwide recognition, facilitating both career growth and global immigration.',
    highlights: ['NAAC A++ Grade (Highest)', 'AICTE approved management programs', 'WES approved for global immigration', 'Top-50 NIRF ranked university legacy', 'Advanced virtual learning environment'],
    duration: '2 Years (PG) / 3 Years (UG)',
    mode: '100% Online',
    approvals: 'UGC-DEB, NAAC A++, AICTE, NIRF, WES',
    whatsapp: '919560020771',
  },
  {
    name: 'Golden Gate University (USA)',
    location: 'San Francisco, California',
    fee: '₹3,00,000',
    feeNum: 300000,
    accreditation: 'AACSB | WSCUC | WES',
    programs: ['Global MBA', 'MS Business Analytics', 'DBA'],
    badge: 'International',
    grade: 'A+',
    gradeColor: 'from-indigo-500 to-indigo-700',
    about: 'Located in the heart of San Francisco, Golden Gate University (GGU) has been a leader in professional education for over 100 years. Its online international programs offer Silicon Valley insights and global exposure for ambitious professionals.',
    highlights: ['AACSB Accredited business school', 'Taught by Silicon Valley professionals', 'WES approved for global recognition', 'AIU Equivalence for Indian learners', 'Heritage of 100+ years in education'],
    duration: '12-15 Months (Accelerated)',
    mode: 'Online (Global)',
    approvals: 'AACSB, WSCUC, WES, AIU',
    whatsapp: '919560020771',
  },
  {
    name: 'Liverpool John Moores University (UK)',
    location: 'Liverpool, United Kingdom',
    fee: '₹2,50,000',
    feeNum: 250000,
    accreditation: 'Privy Council | AACSB | WES',
    programs: ['Global MBA', 'M.Sc Data Science', 'M.Sc AI'],
    badge: 'UK Degree',
    grade: 'A+',
    gradeColor: 'from-indigo-500 to-indigo-700',
    about: 'Liverpool John Moores University (LJMU) is a highly ranked public research university in the UK with a heritage dating back to 1823. Its online international programs provide access to a prestigious British degree through a collaborative global platform.',
    highlights: ['Top-tier UK public research university', 'Triple Crown accredited curriculum', 'WES recognized British degree', 'Global alumni network of 200,000+', 'Comprehensive career support services'],
    duration: '12-24 Months',
    mode: 'Online (International)',
    approvals: 'Privy Council, QAA, AACSB, WES',
    whatsapp: '919560020771',
  },
  {
    name: 'Birchwood University (USA)',
    location: 'Florida, USA',
    fee: '₹65,500',
    feeNum: 65500,
    accreditation: 'Florida CIE | CECU | QAHE',
    programs: ['Global MBA', 'DBA', 'M.Sc Data Science'],
    badge: 'Affordable US',
    grade: 'A',
    gradeColor: 'from-blue-500 to-blue-700',
    about: 'Birchwood University is an innovative Florida-based institution committed to affordable and industry-aligned higher education. Programs are tailored to modern market demands, focusing on technological integration and managerial leadership.',
    highlights: ['Licensed by Florida CIE', 'Most affordable US Online degree', '100% online flexible structure', 'Industry-centric curriculum', 'Modern technological integration'],
    duration: '18 Months (Global MBA)',
    mode: '100% Online',
    approvals: 'Florida CIE, CECU, QAHE',
    whatsapp: '919560020771',
  },
];

const GRADES = ['All', 'A++', 'A+', 'A', 'B+'];
const FEE_RANGES = [
  { label: 'All', min: 0, max: Infinity },
  { label: 'Under ₹1L', min: 0, max: 100000 },
  { label: '₹1L – ₹1.5L', min: 100000, max: 150000 },
  { label: '₹1.5L – ₹2L', min: 150000, max: 200000 },
  { label: 'Above ₹2L', min: 200000, max: Infinity },
];
const COURSES = ['MBA', 'PGDM', 'MCA', 'BBA', 'BCA', 'B.Com', 'M.Com', 'MA', 'BA', 'B.Sc', 'M.Sc', 'B.Tech', 'Diploma'];

/* ── Inquiry Modal ── */
function InquiryModal({ college, onClose }: { college: typeof COLLEGES[0]; onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [form, setForm] = useState({ name: '', number: '', email: '', location: '', program: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, college: college.name, source: 'Online Shiksha Degree Page', timestamp: new Date().toISOString() }),
      });
      setStatus('success');
    } catch {
      setStatus('success'); // fail-silent
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 z-10 max-h-[90vh] overflow-y-auto border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors p-1 bg-slate-50 rounded-xl cursor-pointer">
          <X size={18} />
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BadgeCheck size={32} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">Inquiry Sent!</h3>
            <p className="text-slate-500 text-sm font-semibold leading-relaxed">
              Our academic advisors will contact you shortly about <span className="text-indigo-600 font-bold">{college.name}</span>.
            </p>
            <button onClick={onClose} className="mt-6 w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer text-sm">
              Great, thank you!
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-black text-slate-900 mb-1 uppercase tracking-tight">Request Details</h3>
            <p className="text-xs font-semibold text-slate-400 mb-6">Get brochures & fee breakdown for <span className="font-bold text-indigo-600">{college.name}</span></p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Selected University</label>
                <input type="text" value={college.name} readOnly
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-500 cursor-not-allowed outline-none"
                />
              </div>
              <input required type="text" placeholder="Your Full Name" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full h-11 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-4 text-xs font-semibold outline-none transition-all text-slate-800"
              />
              <input required type="tel" placeholder="WhatsApp Number" value={form.number}
                onChange={e => setForm({ ...form, number: e.target.value })}
                className="w-full h-11 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-4 text-xs font-semibold outline-none transition-all text-slate-800"
              />
              <input required type="email" placeholder="Email Address" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full h-11 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-4 text-xs font-semibold outline-none transition-all text-slate-800"
              />
              <input required type="text" placeholder="Your Current City" value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                className="w-full h-11 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-4 text-xs font-semibold outline-none transition-all text-slate-800"
              />
              <select required value={form.program}
                onChange={e => setForm({ ...form, program: e.target.value })}
                className="w-full h-11 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-4 text-xs font-semibold outline-none transition-all text-slate-800 cursor-pointer appearance-none"
              >
                <option value="" disabled>Select Program</option>
                {college.programs.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
                <option value="Other">Other / Not Sure</option>
              </select>
              <button type="submit" disabled={status === 'submitting'}
                className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 transition-colors text-sm uppercase tracking-wider shadow-md active:scale-98 cursor-pointer mt-2"
              >
                {status === 'submitting' ? 'Submitting...' : 'Request Guidance →'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ── College Detail Modal ── */
function CollegeDetailModal({ college, onClose, onInquire }: {
  college: typeof COLLEGES[0];
  onClose: () => void;
  onInquire: () => void;
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-br ${college.gradeColor} p-8 rounded-t-3xl relative text-white`}>
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 transition-colors rounded-xl p-2 cursor-pointer">
            <X size={18} className="text-white" />
          </button>
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
              NAAC {college.grade}
            </span>
            <span className="bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
              {college.badge}
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black leading-snug">{college.name}</h2>
          <div className="flex items-center gap-1.5 mt-2 text-white/80 text-xs font-semibold">
            <MapPin size={13} />
            <span>{college.location}</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">

          {/* About */}
          <div>
            <h3 className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
              <Building2 size={13} /> About The University
            </h3>
            <p className="text-slate-600 text-xs font-medium leading-relaxed">{college.about}</p>
          </div>

          {/* Key Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-indigo-50/50 border border-indigo-100/50 rounded-2xl p-4">
              <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider mb-1">Total Fee</p>
              <p className="text-lg font-black text-indigo-700">{college.fee}</p>
            </div>
            <div className="bg-violet-50/50 border border-violet-100/50 rounded-2xl p-4">
              <p className="text-[10px] text-violet-400 font-bold uppercase tracking-wider mb-1">Duration</p>
              <p className="text-sm font-black text-violet-700">{college.duration}</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Learning Mode</p>
              <p className="text-xs font-bold text-slate-700 leading-normal">{college.mode}</p>
            </div>
            <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-2xl p-4">
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-1">Accreditation</p>
              <p className="text-[10px] font-bold text-emerald-700 leading-relaxed">{college.approvals}</p>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400 mb-2.5">
              <GraduationCap size={13} /> Approved Programs
            </h3>
            <div className="flex flex-wrap gap-2">
              {college.programs.map((p) => (
                <span key={p} className="bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold px-3 py-1.5 rounded-xl">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400 mb-2.5">
              <Star size={13} /> Key University Highlights
            </h3>
            <ul className="space-y-2">
              {college.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs font-semibold text-slate-600">
                  <span className="w-4 h-4 bg-emerald-50 rounded-full flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100">
                    <BadgeCheck size={10} className="text-emerald-600" />
                  </span>
                  <span className="leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={onInquire}
              className="flex-grow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all text-xs uppercase tracking-wider cursor-pointer shadow-md active:scale-98"
            >
              Get Free Brochure
            </button>
            <a
              href={`https://wa.me/${college.whatsapp}?text=Hi%2C%20I%20want%20to%20know%20more%20about%20${encodeURIComponent(college.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-grow bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-all text-xs uppercase tracking-wider text-center cursor-pointer shadow-md active:scale-98"
            >
              WhatsApp Advisor
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Client Component ── */
export default function OnlineDegreeClient() {
  const [search, setSearch] = useState('');
  const [grade, setGrade] = useState('All');
  const [feeRange, setFeeRange] = useState(0);
  const [course, setCourse] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<typeof COLLEGES[0] | null>(null);
  const [showInquiry, setShowInquiry] = useState(false);
  const [inquiryCollege, setInquiryCollege] = useState<typeof COLLEGES[0] | null>(null);

  const selectedFeeRange = FEE_RANGES[feeRange];

  const filtered = useMemo(() => {
    return COLLEGES.filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
        || c.location.toLowerCase().includes(search.toLowerCase())
        || c.programs.some((p) => p.toLowerCase().includes(search.toLowerCase()));
      const matchGrade = grade === 'All' || c.grade === grade;
      const matchFee = c.feeNum >= selectedFeeRange.min && c.feeNum <= selectedFeeRange.max;
      const matchCourse = course === 'All' || c.programs.includes(course);
      return matchSearch && matchGrade && matchFee && matchCourse;
    });
  }, [search, grade, selectedFeeRange, course]);

  const openInquiry = (college: typeof COLLEGES[0]) => {
    setInquiryCollege(college);
    setShowInquiry(true);
    setSelectedCollege(null);
  };

  return (
    <div id="comparison-engine" className="border-t border-slate-100 pt-10">
      {/* Search + Filter Bar */}
      <div className="sticky top-0 z-30 bg-[#f8f7f4]/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm py-4">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">

            {/* Search */}
            <div className="relative flex-grow">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by college name, location, or course..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-800"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex h-11 items-center justify-center gap-2 px-5 rounded-2xl border font-bold text-xs transition-all cursor-pointer ${showFilters ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-400'}`}
            >
              <SlidersHorizontal size={14} />
              <span>Filters</span>
              {(grade !== 'All' || feeRange !== 0 || course !== 'All') && (
                <span className="bg-white text-indigo-600 text-[10px] font-black rounded-full w-4.5 h-4.5 flex items-center justify-center ml-0.5 border border-indigo-500">
                  {(grade !== 'All' ? 1 : 0) + (feeRange !== 0 ? 1 : 0) + (course !== 'All' ? 1 : 0)}
                </span>
              )}
              <ChevronDown size={12} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* WhatsApp Counselling */}
            <a
              href="https://wa.me/919560020771?text=Hi%2C%20I%20need%20expert%20guidance%20for%20Indian%20Online%20Degrees"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-5 rounded-2xl transition-all shadow-md active:scale-98 shrink-0"
            >
              <Phone size={13} />
              <span>WhatsApp Advisor</span>
            </a>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 bg-white border border-slate-200 rounded-3xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 shadow-md animate-in slide-in-from-top-2 duration-200">
              {/* NAAC Grade */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Award size={13} className="text-slate-400" /> Accreditation & Grade
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {GRADES.map((g) => (
                    <button key={g} onClick={() => setGrade(g)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${grade === g ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-indigo-400'}`}
                    >
                      {g === 'All' ? 'All Grades' : `NAAC ${g}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fee Range */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <IndianRupee size={13} className="text-slate-400" /> Total Fee Budget: <span className="text-indigo-600 font-extrabold">{selectedFeeRange.label}</span>
                </p>
                <input type="range" min={0} max={FEE_RANGES.length - 1} value={feeRange}
                  onChange={(e) => setFeeRange(Number(e.target.value))}
                  className="w-full accent-indigo-600 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1.5 font-bold">
                  {FEE_RANGES.map((f) => <span key={f.label}>{f.label.split(' ')[0]}</span>)}
                </div>
              </div>

              {/* Course Interest */}
              <div className="sm:col-span-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <GraduationCap size={13} className="text-slate-400" /> Course Interest
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <button onClick={() => setCourse('All')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${course === 'All' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-indigo-400'}`}
                  >
                    All Degrees
                  </button>
                  {COURSES.map((c) => (
                    <button key={c} onClick={() => setCourse(c)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${course === c ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-indigo-400'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-3 flex items-center justify-between">
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
          Found <span className="font-extrabold text-indigo-600">{filtered.length}</span> universities
        </p>
        {(search || grade !== 'All' || feeRange !== 0 || course !== 'All') && (
          <button onClick={() => { setSearch(''); setGrade('All'); setFeeRange(0); setCourse('All'); }}
            className="text-xs text-rose-500 font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <X size={12} /> Clear all filters
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl p-10">
            <span className="text-4xl block mb-3">🔍</span>
            <h3 className="text-base font-black text-slate-700 mb-1 uppercase tracking-tight">No Results Found</h3>
            <p className="text-xs font-semibold text-slate-400">Try tweaking your search terms or expanding the filter settings.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((college, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCollege(college)}
                className="college-card p-6 flex flex-col gap-4 text-left w-full group cursor-pointer relative bg-white border border-slate-200/70 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-200"
              >
                {/* Accent Ribbon */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${college.gradeColor} rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className={`bg-gradient-to-br ${college.gradeColor} rounded-xl w-10 h-10 flex items-center justify-center shrink-0 shadow-sm text-white`}>
                    <span className="text-[10px] font-black uppercase tracking-wider">{college.grade}</span>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50 border border-slate-200/50 px-2.5 py-0.5 rounded-full">
                    {college.badge}
                  </span>
                </div>

                {/* College Info */}
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">
                    {college.name}
                  </h3>
                  <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold">
                    <MapPin size={12} className="text-indigo-400 shrink-0" />
                    <span>{college.location}</span>
                  </div>
                </div>

                <div className="border-t border-slate-100" />

                {/* Tags Info */}
                <div className="space-y-2 text-xs font-bold text-slate-500">
                  <div className="flex items-center gap-2">
                    <IndianRupee size={13} className="text-emerald-500 shrink-0" />
                    <span className="text-slate-700">{college.fee} total fee</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <BadgeCheck size={13} className="text-violet-500 shrink-0 mt-0.5" />
                    <span className="text-[10px] text-slate-500 font-semibold leading-relaxed line-clamp-1">{college.accreditation}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <GraduationCap size={13} className="text-indigo-400 shrink-0 mt-0.5" />
                    <span className="text-[10px] text-slate-600 font-semibold leading-relaxed line-clamp-1">{college.programs.join(', ')}</span>
                  </div>
                </div>

                {/* Footer View */}
                <div className="mt-auto pt-4 flex items-center justify-between text-xs font-bold text-indigo-500">
                  <span>View Details</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* College Detail Modal */}
      {selectedCollege && (
        <CollegeDetailModal
          college={selectedCollege}
          onClose={() => setSelectedCollege(null)}
          onInquire={() => openInquiry(selectedCollege)}
        />
      )}

      {/* Inquiry Modal */}
      {showInquiry && inquiryCollege && (
        <InquiryModal
          college={inquiryCollege}
          onClose={() => { setShowInquiry(false); setInquiryCollege(null); }}
        />
      )}
    </div>
  );
}

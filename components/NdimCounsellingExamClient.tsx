"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, Timer, ChevronRight, CheckCircle2, AlertTriangle, 
  HelpCircle, ChevronLeft, Send, Award, RefreshCw, Eye, User, Mail, Phone, Lock
} from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation?: string;
}

interface Section {
  id: string;
  name: string;
  questions: Question[];
}

// 85 NDIM Counselling Exam Questions
const NDIM_EXAM_SECTIONS: Section[] = [
  {
    id: 'beginner',
    name: 'Beginner Level',
    questions: [
      {
        id: 'b1',
        question: "NDIM ka full form kya hai?",
        options: ["New Delhi Institute of Management", "National Delhi Institute of Management", "New Delhi Industry Management", "New Delhi Institute Marketing"],
        correctAnswer: 0,
        explanation: "NDIM stands for New Delhi Institute of Management."
      },
      {
        id: 'b2',
        question: "NDIM kis saal mein sthapit (established) hua tha?",
        options: ["1985", "1992", "1998", "2005"],
        correctAnswer: 1,
        explanation: "NDIM was established in the year 1992."
      },
      {
        id: 'b3',
        question: "NDIM ka main campus kahan sthit hai?",
        options: ["Gurgaon", "Noida", "Tughlakabad, New Delhi", "Connaught Place"],
        correctAnswer: 2,
        explanation: "The main campus of NDIM is located in Tughlakabad, New Delhi."
      },
      {
        id: 'b4',
        question: "NDIM ka PGDM program kiske dwara approved hai?",
        options: ["UGC", "AICTE", "AIU", "MHRD"],
        correctAnswer: 1,
        explanation: "NDIM's PGDM program is approved by AICTE (All India Council for Technical Education)."
      },
      {
        id: 'b5',
        question: "NDIM ke founder/chairman kaun hain?",
        options: ["Dr. V.M. Bansal", "Mr. Ratan Tata", "Mr. Narayana Murthy", "Mr. Anand Mahindra"],
        correctAnswer: 0,
        explanation: "Dr. V.M. Bansal is the founder and chairman of NDIM."
      },
      {
        id: 'b6',
        question: "NDIM ka PGDM kiske equivalent (barabar) mana jata hai?",
        options: ["BBA", "MBA", "M.Phil", "CA"],
        correctAnswer: 1,
        explanation: "NDIM's PGDM is equivalent to an MBA degree, approved by the Association of Indian Universities (AIU)."
      },
      {
        id: 'b7',
        question: "NDIM mein kaunsa flagship course offer kiya jata hai?",
        options: ["B.Tech", "PGDM", "B.Sc", "B.Com"],
        correctAnswer: 1,
        explanation: "Post Graduate Diploma in Management (PGDM) is the flagship course offered by NDIM."
      },
      {
        id: 'b8',
        question: "NDIM ke library mein kitni se zyada books/resources hain?",
        options: ["5,000", "10,000", "20,000", "50,000"],
        correctAnswer: 2,
        explanation: "NDIM has a well-stocked library containing more than 20,000 books and resources."
      },
      {
        id: 'b9',
        question: "NDIM ka industry linkage award kiske dwara diya gaya?",
        options: ["AICTE", "CII", "FICCI", "ASSOCHAM"],
        correctAnswer: 0,
        explanation: "NDIM has been awarded for its industry linkage by AICTE."
      },
      {
        id: 'b10',
        question: "NDIM mein admissions ke liye kaunse entrance exams accept kiye jate hain?",
        options: ["CAT/MAT/CMAT/XAT", "GATE", "JEE", "UPSC"],
        correctAnswer: 0,
        explanation: "NDIM accepts national level management test scores including CAT, MAT, CMAT, and XAT."
      },
      {
        id: 'b11',
        question: "NDIM ki location ka sabse bada fayda kya hai?",
        options: ["Delhi ka central business hub", "Beach side", "Mountain area", "Remote location"],
        correctAnswer: 0,
        explanation: "Being located in New Delhi, it provides direct access to the corporate and central business hub of the capital region."
      },
      {
        id: 'b12',
        question: "NDIM ka corporate network kaisa hai?",
        options: ["Weak", "Average", "Strong", "Non-existent"],
        correctAnswer: 2,
        explanation: "NDIM boasts a very strong corporate network with ties to numerous recruiters and industry bodies."
      },
      {
        id: 'b13',
        question: "NDIM mein kitne specializations offer hote hain?",
        options: ["1", "2", "Many (Dual)", "0"],
        correctAnswer: 2,
        explanation: "NDIM offers dual specialization choices across multiple industry-demand subjects."
      },
      {
        id: 'b14',
        question: "NDIM mein corporate mentoring ke liye kaun aate hain?",
        options: ["Students", "CXOs/Industry Leaders", "Parents", "Local Shopkeepers"],
        correctAnswer: 1,
        explanation: "Top corporate leaders and CXOs visit NDIM to mentor students directly."
      },
      {
        id: 'b15',
        question: "NDIM mein Summer Internship kahan hoti hai?",
        options: ["College mein", "Corporate Companies mein", "Ghar par", "Nahi hoti"],
        correctAnswer: 1,
        explanation: "Summer Internships are structured opportunities hosted in top corporate firms."
      },
      {
        id: 'b16',
        question: "NDIM ka mission kya hai?",
        options: ["Sirf profit", "Quality Education & Placement", "Sirf Sports", "Sirf Party"],
        correctAnswer: 1,
        explanation: "NDIM's mission centers on imparting high-quality professional management education and ensuring strong career placements."
      },
      {
        id: 'b17',
        question: "NDIM ke sports facilities kaise hain?",
        options: ["None", "Excellent/Multi-sport", "Very poor", "Only indoor"],
        correctAnswer: 1,
        explanation: "NDIM offers excellent multi-sport facilities for the holistic development of students."
      },
      {
        id: 'b18',
        question: "NDIM mein faculty ka experience kaisa hai?",
        options: ["Fresher", "Industry Experienced", "Part-time only", "None"],
        correctAnswer: 1,
        explanation: "The faculty members at NDIM are highly industry-experienced professionals."
      },
      {
        id: 'b19',
        question: "NDIM ka placement cell kaisa hai?",
        options: ["Inactive", "Very Active", "Slow", "None"],
        correctAnswer: 1,
        explanation: "The placement cell at NDIM is highly active, constantly working on placements, internships, and industrial visits."
      },
      {
        id: 'b20',
        question: "NDIM mein students ke liye dress code kya hai?",
        options: ["Casual", "Formal Uniform", "Any", "Only Party wear"],
        correctAnswer: 1,
        explanation: "NDIM prescribes a formal business attire/uniform to prepare students for the professional corporate environment."
      }
    ]
  },
  {
    id: 'intermediate',
    name: 'Intermediate Level',
    questions: [
      {
        id: 'i1',
        question: "NDIM ka average placement package approx kitna hai?",
        options: ["3-4 LPA", "10 LPA", "20 LPA", "50 LPA"],
        correctAnswer: 1,
        explanation: "The average placement package at NDIM is approximately 10 LPA."
      },
      {
        id: 'i2',
        question: "Dual Specialization ka student ko kya fayda hai?",
        options: ["Extra fees", "Better Job Versatility", "More exams", "No benefit"],
        correctAnswer: 1,
        explanation: "Dual specialization equips the student with expertise in two functional areas, drastically improving their employability and job versatility."
      },
      {
        id: 'i3',
        question: "Live Projects students ki help kaise karte hain?",
        options: ["Time pass", "Practical Industry Exposure", "Sirf marks ke liye", "Nahi karte"],
        correctAnswer: 1,
        explanation: "Live projects offer real-time assignments from corporations, helping students gain invaluable practical industry exposure."
      },
      {
        id: 'i4',
        question: "MBA vs PGDM mein main difference kya hai?",
        options: ["Koi nahi", "Industry focus vs University Theory", "PGDM cheap hai", "MBA sirf India mein valid hai"],
        correctAnswer: 1,
        explanation: "A PGDM (Post Graduate Diploma in Management) focuses heavily on active industry-relevant training, while a traditional MBA focuses more on university-prescribed theoretical frameworks."
      },
      {
        id: 'i5',
        question: "Industry-Integrated curriculum ka kya matlab hai?",
        options: ["Sirf books padhna", "Industry requirements ke hisab se padhayi", "Sirf exam dena", "Sirf practical"],
        correctAnswer: 1,
        explanation: "An industry-integrated curriculum means the subjects, modules, and case studies are designed in tandem with active corporate and business requirements."
      },
      {
        id: 'i6',
        question: "NDIM ka ASIC (UK) accreditation kya indicate karta hai?",
        options: ["Local recognition", "Global Standard Quality", "State board approval", "Kuch nahi"],
        correctAnswer: 1,
        explanation: "ASIC (Accreditation Service for International Schools, Colleges and Universities, UK) accreditation represents NDIM meeting international benchmarks of global quality education."
      },
      {
        id: 'i7',
        question: "Corporate Mentorship program se student ko kya milta hai?",
        options: ["Sirf tea", "Direct career guidance from CXOs", "Exam tips", "Kuch nahi"],
        correctAnswer: 1,
        explanation: "Students receive one-on-one personal career mentorship and guidance directly from top CXOs and industry veterans."
      },
      {
        id: 'i8',
        question: "Placement process mein NDIM ki approach kya hai?",
        options: ["Waiting for companies", "Proactive Industry Outreach", "Sirf online link", "Students khud dhunde"],
        correctAnswer: 1,
        explanation: "NDIM follows a highly proactive industry outreach approach to invite recruiters and build professional ties."
      },
      {
        id: 'i9',
        question: "Summer Internship kitne mahine ki hoti hai?",
        options: ["1 mahina", "2-3 mahine", "6 mahine", "1 saal"],
        correctAnswer: 1,
        explanation: "The corporate Summer Internships at NDIM are typically 2 to 3 months long."
      },
      {
        id: 'i10',
        question: "NDIM mein soft skills training kab di jati hai?",
        options: ["Last din", "Regularly during program", "Nahi di jati", "Sirf exam se pehle"],
        correctAnswer: 1,
        explanation: "Soft skills, personality development, and mock interviews are trained regularly throughout the PGDM program."
      },
      {
        id: 'i11',
        question: "Students ke liye industry visits ka kya impact hai?",
        options: ["Entertainment", "Real-time Industry Workflow understanding", "Thakawat", "Kuch nahi"],
        correctAnswer: 1,
        explanation: "Industry visits provide students with a real-time, on-floor understanding of business operations and corporate workflows."
      },
      {
        id: 'i12',
        question: "NDIM alumni network kaise help karta hai?",
        options: ["Kuch nahi", "Job Referrals & Networking", "Sirf party", "Sirf meeting"],
        correctAnswer: 1,
        explanation: "A robust alumni network plays a critical role in mentoring, networking opportunities, and referring current batches for job placements."
      },
      {
        id: 'i13',
        question: "NDIM mein faculty-student ratio kaisa hai?",
        options: ["Bohat kharab", "Ideal/Balanced", "Sirf ek teacher", "None"],
        correctAnswer: 1,
        explanation: "NDIM maintains an ideal and balanced faculty-to-student ratio to ensure personalized guidance and attention."
      },
      {
        id: 'i14',
        question: "Guest Lectures ka kya purpose hai?",
        options: ["Time kill", "Latest Industry Trends seekhna", "Exam paper leak", "Attendance"],
        correctAnswer: 1,
        explanation: "Guest lectures are organized so students can learn direct insights on latest industry trends from current business leaders."
      },
      {
        id: 'i15',
        question: "NDIM mein research facilities kaisi hain?",
        options: ["Nahi hain", "Adequate/Good", "Sirf library", "None"],
        correctAnswer: 1,
        explanation: "NDIM offers adequate and state-of-the-art research resources to support academic and practical business studies."
      },
      {
        id: 'i16',
        question: "NDIM ka curriculum kitni baar update hota hai?",
        options: ["Kabhi nahi", "Regularly as per industry", "10 saal mein", "50 saal mein"],
        correctAnswer: 1,
        explanation: "The curriculum is updated regularly in consultation with industry boards to stay aligned with the changing job market."
      },
      {
        id: 'i17',
        question: "PGDM admission ke liye group discussion (GD) kyun zaruri hai?",
        options: ["Sirf formality", "Communication & Analysis check", "Sirf time pass", "Nahi zaruri"],
        correctAnswer: 1,
        explanation: "GDs are held to evaluate candidates on active communication, logical reasoning, peer management, and analytical skills."
      },
      {
        id: 'i18',
        question: "NDIM mein startup support hai?",
        options: ["Nahi", "Yes, Incubation Cell", "Sirf paise", "None"],
        correctAnswer: 1,
        explanation: "Yes, NDIM has an active business incubation cell supporting entrepreneurship and student startups."
      },
      {
        id: 'i19',
        question: "Mock interviews se kya fayda hota hai?",
        options: ["Nervousness", "Confidence & Feedback", "Kuch nahi", "Time waste"],
        correctAnswer: 1,
        explanation: "Mock interviews help boost candidate confidence and offer critical performance feedback before the actual recruitment drive."
      },
      {
        id: 'i20',
        question: "NDIM ka campus atmosphere kaisa hai?",
        options: ["Stressful", "Professional & Collaborative", "Dull", "Only party"],
        correctAnswer: 1,
        explanation: "NDIM provides a highly professional, collaborative, and student-centric campus environment."
      }
    ]
  },
  {
    id: 'advanced',
    name: 'Advanced & Global Strategy',
    questions: [
      {
        id: 'a1',
        question: "Jab parent kahe 'Fees zyada hai', toh best response kya hoga?",
        options: ["Discount do", "ROI/Placement & Value proposition explain karo", "Chup raho", "College chod do"],
        correctAnswer: 1,
        explanation: "The best counselling response is to explain the high Return on Investment (ROI), the quality of placements, dual specialization, and the rich industry connection value proposition."
      },
      {
        id: 'a2',
        question: "Placement stats explain karte waqt counselor ko kya karna chahiye?",
        options: ["Fake figures dena", "Transparently Highest/Average package & roles batana", "Chup rehna", "Sirf 100% bolna"],
        correctAnswer: 1,
        explanation: "A counselor should always be transparent, providing honest statistics regarding highest/average packages, placement rates, and job profiles."
      },
      {
        id: 'a3',
        question: "Student kahe 'Mujhe top IIM nahi mila', NDIM ko kaise sell karein?",
        options: ["IIM ko bura bolo", "Industry connect, location & ROI highlight karo", "Crying", "Admission reject karo"],
        correctAnswer: 1,
        explanation: "Highlight that NDIM offers strong corporate connections, prime Delhi NCR location for jobs, stellar ROI, and dual-specialization opportunities matching top schools."
      },
      {
        id: 'a4',
        question: "Corporate Mentorship ka value prop explain kaise karein?",
        options: ["Sirf ek program hai", "Direct networking with top industry leaders", "Sirf formality hai", "None"],
        correctAnswer: 1,
        explanation: "Frame it as a direct pathway to network with and learn from actual CXOs, board members, and active industry stalwarts."
      },
      {
        id: 'a5',
        question: "3rd semester mein placements kyun shuru hote hain?",
        options: ["Early start for better opportunities", "Pressure ke liye", "Sab karte hain", "None"],
        correctAnswer: 1,
        explanation: "Early starts in the 3rd semester give students the maximum window of opportunities to secure the best offers from visiting companies."
      },
      {
        id: 'a6',
        question: "ASIC Accreditation ki value international student ke liye kya hai?",
        options: ["Nahi hai", "Global Credibility & Recognition", "Sirf paper hai", "None"],
        correctAnswer: 1,
        explanation: "It signals global standards of education, giving international students the trust of high global credibility and degree recognition."
      },
      {
        id: 'a7',
        question: "NDIM ka USP 'Industry-Integrated' kyun hai?",
        options: ["Sirf naam hai", "Faculty & Curriculum designed by Industry experts", "Sirf marketing", "None"],
        correctAnswer: 1,
        explanation: "NDIM's curriculum is directly shaped by industry experts, and a large portion of lecturers are active corporate practitioners."
      },
      {
        id: 'a8',
        question: "Handling 'PGDM vs MBA' objection?",
        options: ["MBA superior hai", "PGDM is flexible, updated, & Industry-aligned", "PGDM inferior hai", "None"],
        correctAnswer: 1,
        explanation: "Explain that PGDM's autonomous nature allows it to quickly revise its modules and adapt to modern industry trends, unlike rigid university MBA schedules."
      },
      {
        id: 'a9',
        question: "Corporate leaders NDIM mein kyun aate hain?",
        options: ["Free khana", "To hire talent & mentor students", "Sirf tour", "None"],
        correctAnswer: 1,
        explanation: "They visit to source job-ready management talent and guide the next generation through structured mentorship programs."
      },
      {
        id: 'a10',
        question: "NDIM ki networking opportunities ka ROI kaise measure karein?",
        options: ["Fees se", "Future Career growth & Salary jump", "Sirf degree", "None"],
        correctAnswer: 1,
        explanation: "Networking ROI is visible in long-term career growth, industry pathways, and the potential for fast salary hikes."
      },
      {
        id: 'a11',
        question: "Student confused hai, next step kya hona chahiye?",
        options: ["Admission le lo", "Detailed counseling & career path analysis", "Phone cut karo", "None"],
        correctAnswer: 1,
        explanation: "A counselor should carry out a detailed personal counseling session and analyze career paths to clear the student's doubts."
      },
      {
        id: 'a12',
        question: "NDIM mein diversity ka kya impact hai?",
        options: ["Nahi hai", "Peer learning & Multi-cultural exposure", "Sirf confusion", "None"],
        correctAnswer: 1,
        explanation: "A diverse student body enhances active peer-to-peer learning and provides essential multi-cultural exposure."
      },
      {
        id: 'a13',
        question: "Placement strategy mein 'Soft Skills' ki kya importance hai?",
        options: ["Zero", "Vital for Interview Conversion", "Time pass", "None"],
        correctAnswer: 1,
        explanation: "Technical knowledge gets you shortlisted, but soft skills are vital for converting interviews into final offers."
      },
      {
        id: 'a14',
        question: "NDIM mein Live Projects se CV mein kya change aata hai?",
        options: ["Nahi aata", "Stronger & Industry-Ready Profile", "Sirf paper", "None"],
        correctAnswer: 1,
        explanation: "It provides concrete proof of hands-on business execution on CVs, presenting the student as job-ready."
      },
      {
        id: 'a15',
        question: "Counselor ko 'Lead' follow-up kaise karna chahiye?",
        options: ["Spam call", "Consultative & helpful approach", "Threaten karo", "None"],
        correctAnswer: 1,
        explanation: "Adopting a helpful, consultative approach solves student concerns and builds professional trust."
      },
      {
        id: 'a16',
        question: "NDIM mein faculty consultancies ka student ko kya fayda hai?",
        options: ["Nahi hai", "Access to live consulting projects", "Sirf theory", "None"],
        correctAnswer: 1,
        explanation: "Faculty who do active industry consultancy bring students into live consulting assignments, bridging the theory-practice gap."
      },
      {
        id: 'a17',
        question: "NDIM ke CSR initiatives ka student career pe kya impact hai?",
        options: ["None", "Leadership & Social Responsibility Skills", "Sirf kharcha", "None"],
        correctAnswer: 1,
        explanation: "CSR initiatives cultivate social responsibility, empathy, community leadership, and ethical values in future leaders."
      },
      {
        id: 'a18',
        question: "Placement preparation mein 'Psychometric tests' kyun hote hain?",
        options: ["Nahi hote", "To map right fit & aptitude", "Sirf time pass", "None"],
        correctAnswer: 1,
        explanation: "These tests map behavioral profiles to identify a candidate's corporate role compatibility and career path match."
      },
      {
        id: 'a19',
        question: "International collaborations ka kya benefit hai?",
        options: ["None", "Global exposure & Student exchange", "Sirf stamp", "None"],
        correctAnswer: 1,
        explanation: "It delivers vital global exposure, student exchanges, and joint research avenues."
      },
      {
        id: 'a20',
        question: "Closing the sales pitch mein sabse important kya hai?",
        options: ["Pressure dalna", "Address concerns & offer guided next steps", "Zabardasti", "None"],
        correctAnswer: 1,
        explanation: "Addressing all student/parent concerns thoroughly and offering clear, guided next steps is critical to closing."
      }
    ]
  },
  {
    id: 'global-tech',
    name: 'Global & Technical Excellence',
    questions: [
      {
        id: 'g1',
        question: "NDIM mein 'Japan Centre of Excellence' ka kya objective hai?",
        options: ["Sirf bhasa", "Bharat-Japan Professional Sambandh", "Sirf Tourism", "None"],
        correctAnswer: 1,
        explanation: "The center works on cementing Indo-Japan professional relations, skills, and placements."
      },
      {
        id: 'g2',
        question: "Kaunsa institute Japan mein manpower bhejne ke liye adhikrit hai?",
        options: ["IIM", "NDIM", "FMS", "MDI"],
        correctAnswer: 1,
        explanation: "NDIM is officially recognized and authorized to send skilled corporate manpower to Japan."
      },
      {
        id: 'g3',
        question: "NDIM ka 'Korean Centre' kiske sahyog se hai?",
        options: ["Samsung", "LG", "India-Republic of Korea Friendship Society", "Hyundai"],
        correctAnswer: 2,
        explanation: "It is hosted in cooperation with the India-Republic of Korea Friendship Society."
      },
      {
        id: 'g4',
        question: "SQL ka full form kya hai?",
        options: ["Standard Query Language", "Structured Query Language", "Simple Query Language", "System Query Language"],
        correctAnswer: 1,
        explanation: "SQL stands for Structured Query Language, the standard database querying syntax."
      },
      {
        id: 'g5',
        question: "Power BI ka owner kaun hai?",
        options: ["Google", "Amazon", "Microsoft", "IBM"],
        correctAnswer: 2,
        explanation: "Power BI is developed and owned by Microsoft."
      },
      {
        id: 'g6',
        question: "International Live Projects kahan hote hain?",
        options: ["Russia/Vietnam", "US/Canada", "Australia", "None"],
        correctAnswer: 0,
        explanation: "NDIM students participate in international live projects hosted in regions like Russia and Vietnam."
      },
      {
        id: 'g7',
        question: "Japan Centre mein kaunsa language certification milta hai?",
        options: ["JLPT N5, N4", "TOEFL", "IELTS", "HSK"],
        correctAnswer: 0,
        explanation: "It trains students on the JLPT (Japanese Language Proficiency Test) N5 and N4 certifications."
      },
      {
        id: 'g8',
        question: "Incubation Club ka kaam kya hai?",
        options: ["Cooking", "Startup/Entrepreneurship", "Films", "None"],
        correctAnswer: 1,
        explanation: "It drives startup support, entrepreneurship incubation, and business ideas generation."
      },
      {
        id: 'g9',
        question: "Power BI ka main kaam kya hai?",
        options: ["Data Visualization", "Typing", "Email", "None"],
        correctAnswer: 0,
        explanation: "Power BI's core job is data analysis and interactive data visualization reporting."
      },
      {
        id: 'g10',
        question: "Korea Centre kiske saath milkar Upskilling karta hai?",
        options: ["KOSME", "JICA", "JETRO", "World Bank"],
        correctAnswer: 0,
        explanation: "Korea Centre conducts upskilling in ties with KOSME (Korea SMEs & Startups Agency)."
      },
      {
        id: 'g11',
        question: "Python kya hai?",
        options: ["Hardware", "Programming Language", "Browser", "Server"],
        correctAnswer: 1,
        explanation: "Python is a popular general-purpose high-level programming language."
      },
      {
        id: 'g12',
        question: "NDIM mein kitne clubs hain?",
        options: ["2", "8+", "50", "100"],
        correctAnswer: 1,
        explanation: "NDIM has 8+ active student clubs focusing on different domains and interests."
      },
      {
        id: 'g13',
        question: "JLPT ka full form?",
        options: ["Japanese Language Proficiency Test", "Japanese Learning Test", "Joint Language Test", "None"],
        correctAnswer: 0,
        explanation: "JLPT stands for Japanese Language Proficiency Test."
      },
      {
        id: 'g14',
        question: "KOSME ka full form?",
        options: ["Korea SMEs & Startups Agency", "Korea Skill Agency", "Korean Services", "None"],
        correctAnswer: 0,
        explanation: "KOSME stands for Korea SMEs & Startups Agency."
      },
      {
        id: 'g15',
        question: "PWC Egypt se kya milta hai?",
        options: ["Ghumna", "Intl Internship", "Scholarship", "None"],
        correctAnswer: 1,
        explanation: "NDIM has opportunities for international internships at PwC Egypt."
      },
      {
        id: 'g16',
        question: "ERP ka full form?",
        options: ["Enterprise Resource Planning", "Electronic Resource Process", "External Resource", "None"],
        correctAnswer: 0,
        explanation: "ERP stands for Enterprise Resource Planning, which coordinates business databases and processes."
      },
      {
        id: 'g17',
        question: "Udaan Club kisse related hai?",
        options: ["Cultural/Talent", "Finance", "Coding", "None"],
        correctAnswer: 0,
        explanation: "Udaan is the dedicated cultural and talent club of NDIM."
      },
      {
        id: 'g18',
        question: "JICA ka full form?",
        options: ["Japan Intl Co-operation Agency", "Japanese Industry", "Joint Intl Cultural", "None"],
        correctAnswer: 0,
        explanation: "JICA stands for Japan International Cooperation Agency."
      },
      {
        id: 'g19',
        question: "Japan Centre mein kaun padhata hai?",
        options: ["Video", "JICA Prof", "None", "Guest"],
        correctAnswer: 1,
        explanation: "JICA professors teach at the Japan Centre of Excellence."
      },
      {
        id: 'g20',
        question: "CRM ka full form?",
        options: ["Customer Relationship Management", "Corporate Resource", "Center Resource", "None"],
        correctAnswer: 0,
        explanation: "CRM stands for Customer Relationship Management."
      },
      {
        id: 'g21',
        question: "NDIM Industrial area kahan hai?",
        options: ["Okhla Phase-1", "Karol Bagh", "CP", "None"],
        correctAnswer: 0,
        explanation: "NDIM is adjacent to the Okhla Phase-1 industrial and business area."
      },
      {
        id: 'g22',
        question: "AI ka arth kya hai?",
        options: ["Machine Intelligence", "Typing", "Internet", "None"],
        correctAnswer: 0,
        explanation: "AI stands for Artificial Intelligence (historically matching 'Machine Intelligence')."
      },
      {
        id: 'g23',
        question: "Intl Internship ki duration?",
        options: ["1 din", "6-8 weeks", "2 saal", "5 saal"],
        correctAnswer: 1,
        explanation: "The international corporate internships generally last for 6 to 8 weeks."
      },
      {
        id: 'g24',
        question: "Editorial Club ki help?",
        options: ["Writing/Editing", "Sports", "Coding", "None"],
        correctAnswer: 0,
        explanation: "The Editorial Club helps in writing, editing, and designing publications."
      },
      {
        id: 'g25',
        question: "Counselor ke liye 'Lead' ka matlab?",
        options: ["Potential Student", "Manager", "Teacher", "None"],
        correctAnswer: 0,
        explanation: "A lead is a potential student seeking counseling or admission guidance."
      }
    ]
  }
];

const EXAM_DURATION_SECONDS = 45 * 60; // 45 minutes for 85 questions (approx 30s per question)

type ExamStatus = 'idle' | 'registering' | 'running' | 'terminated' | 'submitted';

export function NdimCounsellingExamClient() {
  // Navigation & User State
  const [status, setStatus] = useState<ExamStatus>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Active Test State
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [statusMap, setStatusMap] = useState<Record<string, 'answered' | 'marked' | 'unvisited'>>({});
  const [remainingTime, setRemainingTime] = useState(EXAM_DURATION_SECONDS);

  // Anti-Cheating & Security State
  const [violationCount, setViolationCount] = useState(0);
  const [violationReason, setViolationReason] = useState('');
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [isWindowFocused, setIsWindowFocused] = useState(true);

  // Refs for tracking timer and state in events
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const statusRef = useRef<ExamStatus>('idle');
  const violationCountRef = useRef(0);
  const isFullScreenRef = useRef(false);

  // Synchronize refs for event handlers
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    violationCountRef.current = violationCount;
  }, [violationCount]);

  // Total questions list
  const allQuestions = NDIM_EXAM_SECTIONS.flatMap(sec => sec.questions);
  const totalQuestionsCount = allQuestions.length;

  // Active question details
  const activeSection = NDIM_EXAM_SECTIONS[activeSectionIdx];
  const activeQuestion = activeSection.questions[activeQuestionIdx];

  // Initialize session and check tab-reload cheat prevention
  useEffect(() => {
    const savedSession = localStorage.getItem('ndim_exam_session');
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        if (parsed.status === 'running') {
          setStatus('terminated');
          setViolationReason("Page reload, refresh, or tab closure detected. As per the anti-cheating policy, the exam has been ended.");
          setViolationCount(2);
          localStorage.setItem('ndim_exam_session', JSON.stringify({
            status: 'terminated',
            email: parsed.email,
            name: parsed.name,
            reason: 'Reload/Tab closure'
          }));

          // Send POST request to backend reporting this reload violation
          fetch('/api/exams', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: parsed.name,
              email: parsed.email,
              phone: parsed.phone || '',
              examName: 'NDIM Counselling Exam',
              score: 0,
              maxScore: 255,
              percentage: '0.0',
              correctAnswers: 0,
              totalQuestions: 85,
              status: 'terminated',
              reason: 'Page reload, refresh, or tab closure detected'
            })
          }).catch(console.error);
        }
      } catch (e) {
        console.error("Error reading NDIM session", e);
      }
    }
  }, []);

  // Handle countdown timer
  useEffect(() => {
    if (status === 'running') {
      timerRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status]);

  // Hook tab switching, window focus loss, and fullscreen exits
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (statusRef.current !== 'running') return;
      if (document.visibilityState === 'hidden') {
        handleViolation("Tab Switched");
      }
    };

    const handleWindowBlur = () => {
      if (statusRef.current !== 'running') return;
      handleViolation("Lost Window Focus");
    };

    const handleWindowFocus = () => {
      setIsWindowFocused(true);
    };

    const handleFullscreenChange = () => {
      if (statusRef.current !== 'running') return;
      const isFull = !!document.fullscreenElement;
      isFullScreenRef.current = isFull;
      if (!isFull) {
        handleViolation("Exited Fullscreen Mode");
      }
    };

    // Attach event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (statusRef.current === 'running') {
        const message = "Are you sure you want to leave? Your exam will be immediately ended.";
        e.returnValue = message;
        return message;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleViolation = (reason: string) => {
    const nextCount = violationCountRef.current + 1;
    setViolationCount(nextCount);
    setIsWindowFocused(false);

    if (nextCount === 1) {
      setShowWarningModal(true);
    } else if (nextCount >= 2) {
      setShowWarningModal(false);
      setStatus('terminated');
      setViolationReason(`Cheating detected: ${reason}. Switching tabs or exiting fullscreen is prohibited during this live exam.`);
      
      const savedSession = localStorage.getItem('ndim_exam_session');
      let currentName = name;
      let currentEmail = email;
      let currentPhone = phone;
      if (savedSession) {
        try {
          const parsed = JSON.parse(savedSession);
          currentName = parsed.name || name;
          currentEmail = parsed.email || email;
          currentPhone = parsed.phone || phone;
          localStorage.setItem('ndim_exam_session', JSON.stringify({
            ...parsed,
            status: 'terminated',
            reason: reason
          }));
        } catch (_) {}
      }

      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }

      // Post cheat termination to backend
      fetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: currentName,
          email: currentEmail,
          phone: currentPhone,
          examName: 'NDIM Counselling Exam',
          score: 0,
          maxScore: 255,
          percentage: '0.0',
          correctAnswers: 0,
          totalQuestions: 85,
          status: 'terminated',
          reason: `Cheating detected: ${reason}`
        })
      }).catch(console.error);
    }
  };

  const requestFullscreen = async () => {
    try {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        await docEl.requestFullscreen();
        isFullScreenRef.current = true;
      }
    } catch (err) {
      console.warn("Fullscreen permission was blocked or unsupported:", err);
    }
  };

  // Start the Exam
  const handleStartExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setStatus('running');
    setRemainingTime(EXAM_DURATION_SECONDS);
    setAnswers({});
    setViolationCount(0);
    setViolationReason('');
    
    // Set initial question status
    const initialStatus: Record<string, 'answered' | 'marked' | 'unvisited'> = {};
    NDIM_EXAM_SECTIONS.forEach(sec => {
      sec.questions.forEach((q) => {
        initialStatus[q.id] = 'unvisited';
      });
    });
    setStatusMap(initialStatus);

    localStorage.setItem('ndim_exam_session', JSON.stringify({
      status: 'running',
      name,
      email,
      phone,
      startedAt: Date.now()
    }));

    await requestFullscreen();
  };

  // Select Option
  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    setStatusMap(prev => ({
      ...prev,
      [questionId]: prev[questionId] === 'marked' ? 'marked' : 'answered'
    }));
  };

  const handleClearResponse = (questionId: string) => {
    setAnswers(prev => {
      const updated = { ...prev };
      delete updated[questionId];
      return updated;
    });
    setStatusMap(prev => ({
      ...prev,
      [questionId]: 'unvisited'
    }));
  };

  const handleMarkForReview = (questionId: string) => {
    setStatusMap(prev => ({ ...prev, [questionId]: 'marked' }));
    handleNextQuestion();
  };

  const handleSaveAndNext = (questionId: string) => {
    if (answers[questionId] !== undefined) {
      setStatusMap(prev => ({ ...prev, [questionId]: 'answered' }));
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (activeQuestionIdx < activeSection.questions.length - 1) {
      setActiveQuestionIdx(activeQuestionIdx + 1);
    } else if (activeSectionIdx < NDIM_EXAM_SECTIONS.length - 1) {
      setActiveSectionIdx(activeSectionIdx + 1);
      setActiveQuestionIdx(0);
    }
  };

  const handlePrevQuestion = () => {
    if (activeQuestionIdx > 0) {
      setActiveQuestionIdx(activeQuestionIdx - 1);
    } else if (activeSectionIdx > 0) {
      const prevSecIdx = activeSectionIdx - 1;
      setActiveSectionIdx(prevSecIdx);
      setActiveQuestionIdx(NDIM_EXAM_SECTIONS[prevSecIdx].questions.length - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAutoSubmit = () => {
    submitExamResults('Auto-Submitted (Timer Expired)');
  };

  const handleManualSubmit = () => {
    if (confirm("Are you sure you want to submit your NDIM Master Counselor Quiz?")) {
      submitExamResults('Submitted Successfully');
    }
  };

  const postResultToBackend = async (statusOverride: 'submitted' | 'terminated', reasonOverride?: string) => {
    try {
      let totalCorrect = 0;
      let totalAttempted = 0;
      
      NDIM_EXAM_SECTIONS.forEach(sec => {
        sec.questions.forEach(q => {
          const userAnswer = answers[q.id];
          if (userAnswer !== undefined) {
            totalAttempted++;
            if (userAnswer === q.correctAnswer) {
              totalCorrect++;
            }
          }
        });
      });

      const score = totalCorrect * 3;
      const maxScore = totalQuestionsCount * 3;
      const percentage = ((totalCorrect / totalQuestionsCount) * 100).toFixed(1);

      await fetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          examName: 'NDIM Counselling Exam',
          score: statusOverride === 'terminated' ? 0 : score,
          maxScore,
          percentage: statusOverride === 'terminated' ? '0.0' : percentage,
          correctAnswers: statusOverride === 'terminated' ? 0 : totalCorrect,
          totalQuestions: totalQuestionsCount,
          status: statusOverride,
          reason: reasonOverride || ''
        })
      });
    } catch (e) {
      console.error('Failed to post result to backend:', e);
    }
  };

  const submitExamResults = (submissionType: string) => {
    setStatus('submitted');
    localStorage.setItem('ndim_exam_session', JSON.stringify({
      status: 'submitted',
      name,
      email,
      phone,
      submittedAt: Date.now(),
      submissionType
    }));

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    // Post success submission to backend
    postResultToBackend('submitted');
  };

  const handleResetExam = () => {
    localStorage.removeItem('ndim_exam_session');
    setStatus('idle');
    setName('');
    setEmail('');
    setPhone('');
    setActiveSectionIdx(0);
    setActiveQuestionIdx(0);
    setAnswers({});
    setStatusMap({});
    setViolationCount(0);
    setViolationReason('');
    setShowWarningModal(false);
  };

  const calculateResults = () => {
    let totalCorrect = 0;
    let totalAttempted = 0;
    let sectionBreakdown: Record<string, { total: number; correct: number; attempted: number }> = {};

    NDIM_EXAM_SECTIONS.forEach(sec => {
      sectionBreakdown[sec.id] = { total: sec.questions.length, correct: 0, attempted: 0 };
      sec.questions.forEach(q => {
        const userAnswer = answers[q.id];
        if (userAnswer !== undefined) {
          totalAttempted++;
          sectionBreakdown[sec.id].attempted++;
          if (userAnswer === q.correctAnswer) {
            totalCorrect++;
            sectionBreakdown[sec.id].correct++;
          }
        }
      });
    });

    const scorePercent = ((totalCorrect / totalQuestionsCount) * 100).toFixed(1);
    return { totalCorrect, totalAttempted, scorePercent, sectionBreakdown };
  };

  return (
    <div className="w-full select-none font-sans text-black">
      
      {/* ── Warning Modal for Cheat Violations ── */}
      {showWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white border-8 border-black p-8 max-w-lg w-full shadow-[12px_12px_0px_#000] rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff007f]/10 rounded-full blur-xl pointer-events-none"></div>
            <div className="flex items-center gap-4 text-[#ff007f] mb-6">
              <ShieldAlert className="w-12 h-12 stroke-[2.5]" />
              <h2 className="text-3xl font-black uppercase tracking-tight">Cheating Warning!</h2>
            </div>
            
            <p className="font-bold text-slate-700 text-lg leading-relaxed mb-6">
              The system detected that you switched tabs, minimized the window, or lost active window focus. 
            </p>
            
            <div className="bg-[#ff007f]/5 border-2 border-dashed border-[#ff007f] p-4 rounded-2xl mb-6">
              <p className="text-sm font-bold text-[#ff007f] uppercase tracking-wide flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Strike 1 of 2
              </p>
              <p className="text-xs font-bold text-slate-500 mt-1 leading-normal">
                Any further focus loss, page refreshment, or exiting fullscreen mode will trigger an **immediate automated exam termination** and submit a zero-score cheating flag.
              </p>
            </div>

            <button
              onClick={async () => {
                setShowWarningModal(false);
                await requestFullscreen();
              }}
              className="w-full bg-[#ccff00] text-black border-4 border-black px-6 py-4 rounded-2xl font-black uppercase text-sm hover:shadow-[4px_4px_0px_#000] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Resume Test & Re-Enter Fullscreen <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}

      {/* ── STATE 1: IDLE / LANDING PAGE ── */}
      {status === 'idle' && (
        <div className="max-w-4xl mx-auto bg-white border-8 border-black rounded-3xl p-8 md:p-12 shadow-[12px_12px_0px_#000] relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">
            NDIM Delhi Counselling Exam
          </h2>
          <p className="text-lg font-bold text-slate-700 leading-relaxed mb-8">
            Welcome to the NDIM Master Counselor Training Quiz. This test consists of 85 questions spanning four progressive difficulty levels. It is designed to test your knowledge of NDIM, admissions, strategy, and excellence pathways.
          </p>

          {/* Test Guidelines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#ccff00]/10 border-4 border-black p-6 rounded-2xl">
              <h3 className="text-lg font-black uppercase tracking-wider mb-3 flex items-center gap-2">
                <Timer className="w-5 h-5 text-black" /> Test Parameters
              </h3>
              <ul className="space-y-2 text-sm font-bold text-slate-700">
                <li>• Total Duration: <span className="text-black">45 Minutes</span></li>
                <li>• Total Questions: <span className="text-black">85 Questions</span></li>
                <li>• Marks: <span className="text-black">+3 Marks</span> for Correct, <span className="text-black">0 Marks</span> for Wrong</li>
                <li>• Levels: <span className="text-black">4 Progressive Categories</span></li>
              </ul>
            </div>

            <div className="bg-[#ff007f]/5 border-4 border-black p-6 rounded-2xl">
              <h3 className="text-lg font-black uppercase tracking-wider text-[#ff007f] mb-3 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" /> Strict Anti-Cheat Rules
              </h3>
              <ul className="space-y-2 text-sm font-bold text-slate-700">
                <li>• <strong className="text-black">No Page Reloading:</strong> Refreshes terminate the test instantly.</li>
                <li>• <strong className="text-black">Tab Locks:</strong> Leaving the tab ends the exam immediately.</li>
                <li>• <strong className="text-black">Fullscreen Required:</strong> Closing full-screen mode issues a warning.</li>
                <li>• <strong className="text-black">2-Strike Rule:</strong> Second warning terminates the test instantly.</li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => setStatus('registering')}
            className="bg-[#ccff00] text-black border-4 border-black px-8 py-4 rounded-2xl font-black uppercase tracking-wider text-sm hover:-translate-y-1 transition-all shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] cursor-pointer flex items-center gap-2"
          >
            Acknowledge & Register <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      )}

      {/* ── STATE 2: REGISTRATION SCREEN ── */}
      {status === 'registering' && (
        <div className="max-w-lg mx-auto bg-white border-8 border-black rounded-3xl p-8 md:p-10 shadow-[12px_12px_0px_#000]">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Examinee Details</h2>
          <p className="text-sm font-bold text-slate-500 mb-8 uppercase tracking-wide">Enter valid details to begin the Counselor training assessment.</p>

          <form onSubmit={handleStartExam} className="space-y-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-black mb-2 flex items-center gap-2">
                <User className="w-4 h-4" /> Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full border-4 border-black bg-[#fdfdfb] p-4 rounded-2xl font-bold placeholder-slate-400 focus:outline-none focus:bg-[#ccff00]/5 transition-all text-black"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-black mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@domain.com"
                className="w-full border-4 border-black bg-[#fdfdfb] p-4 rounded-2xl font-bold placeholder-slate-400 focus:outline-none focus:bg-[#ccff00]/5 transition-all text-black"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-black mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" /> Mobile Number / Employee ID
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 9876543210"
                className="w-full border-4 border-black bg-[#fdfdfb] p-4 rounded-2xl font-bold placeholder-slate-400 focus:outline-none focus:bg-[#ccff00]/5 transition-all text-black"
              />
            </div>

            <div className="bg-[#ccff00]/5 border-2 border-dashed border-[#ccff00] p-4 rounded-2xl text-xs font-bold text-slate-600 flex gap-3">
              <Lock className="w-6 h-6 text-black shrink-0 stroke-[2.5]" />
              <p>
                Clicking the start button below requests fullscreen authorization. Ensure your environment has no running distractions or overlay alerts.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="flex-1 bg-white text-black border-4 border-black px-6 py-4 rounded-2xl font-black uppercase text-xs hover:bg-slate-50 transition-all cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-[#ccff00] text-black border-4 border-black px-6 py-4 rounded-2xl font-black uppercase text-xs hover:shadow-[4px_4px_0px_#000] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              >
                Start Test Now
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── STATE 3: RUNNING TEST DASHBOARD ── */}
      {status === 'running' && (
        <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Question Panel */}
          <div className="lg:col-span-3 bg-white border-8 border-black rounded-3xl p-6 md:p-8 shadow-[8px_8px_0px_#000] flex flex-col justify-between min-h-[520px]">
            
            <div>
              {/* Header inside Panel */}
              <div className="flex flex-wrap items-center justify-between pb-6 border-b-4 border-black gap-4 mb-6">
                {/* Section Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-1 max-w-full">
                  {NDIM_EXAM_SECTIONS.map((sec, idx) => (
                    <button
                      key={sec.id}
                      onClick={() => {
                        setActiveSectionIdx(idx);
                        setActiveQuestionIdx(0);
                      }}
                      className={`px-3 py-2 border-2 border-black font-black uppercase text-[10px] sm:text-xs rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                        activeSectionIdx === idx 
                          ? 'bg-[#ccff00] text-black shadow-[2px_2px_0px_#000]' 
                          : 'bg-white text-slate-500 hover:text-black'
                      }`}
                    >
                      {sec.name}
                    </button>
                  ))}
                </div>

                {/* Score indicators */}
                <div className="flex items-center gap-3">
                  <div className="bg-[#ff007f]/10 border-2 border-[#ff007f] px-2.5 py-1.5 rounded-xl text-[#ff007f] text-[10px] font-black uppercase flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" /> Striking: {violationCount}/2
                  </div>
                  <div className="bg-black text-white px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black tracking-wider flex items-center gap-2">
                    <Timer className="w-3.5 h-3.5 text-[#ccff00]" /> {formatTime(remainingTime)}
                  </div>
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-6">
                <div className="flex gap-3">
                  <span className="bg-[#ccff00] text-black border-2 border-black w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shrink-0">
                    Q{activeQuestionIdx + 1}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-black leading-snug">
                    {activeQuestion.question}
                  </h3>
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 gap-3.5 pl-0 md:pl-11 mt-4">
                  {activeQuestion.options.map((option, idx) => {
                    const isSelected = answers[activeQuestion.id] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(activeQuestion.id, idx)}
                        className={`w-full text-left border-4 border-black p-4 rounded-xl font-bold text-sm transition-all flex items-center justify-between cursor-pointer ${
                          isSelected 
                            ? 'bg-[#ccff00]/10 border-black shadow-[4px_4px_0px_#000] -translate-y-0.5' 
                            : 'bg-white hover:bg-slate-50'
                        }`}
                      >
                        <span>{idx === 0 ? 'A' : idx === 1 ? 'B' : idx === 2 ? 'C' : 'D'}) &nbsp;{option}</span>
                        <div className={`w-5 h-5 rounded-full border-2 border-black flex items-center justify-center ${
                          isSelected ? 'bg-black' : 'bg-white'
                        }`}>
                          {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#ccff00]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-12 pt-6 border-t-4 border-black">
              <div className="flex gap-2">
                <button
                  onClick={() => handleClearResponse(activeQuestion.id)}
                  disabled={answers[activeQuestion.id] === undefined}
                  className="bg-white text-black border-2 border-black px-4 py-2.5 rounded-xl font-black text-xs uppercase hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  Clear Selection
                </button>
                <button
                  onClick={() => handleMarkForReview(activeQuestion.id)}
                  className="bg-white text-slate-600 border-2 border-black px-4 py-2.5 rounded-xl font-black text-xs uppercase hover:text-black hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Mark for Review
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handlePrevQuestion}
                  className="bg-white text-black border-2 border-black p-2.5 rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
                  aria-label="Previous question"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleSaveAndNext(activeQuestion.id)}
                  className="bg-black text-white border-2 border-black px-6 py-2.5 rounded-xl font-black text-xs uppercase hover:bg-[#ccff00] hover:text-black transition-all cursor-pointer flex items-center gap-2"
                >
                  Save &amp; Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Side Control Panel */}
          <div className="space-y-6">
            {/* Candidate Profile Widget */}
            <div className="bg-white border-8 border-black rounded-3xl p-5 shadow-[8px_8px_0px_#000]">
              <h3 className="text-xs font-black uppercase tracking-wider mb-3 pb-2 border-b-2 border-black">Examinee</h3>
              <p className="font-bold text-black text-sm truncate">{name}</p>
              <p className="text-xs font-bold text-slate-500 truncate">{email}</p>
            </div>

            {/* Questions Tracker Grid */}
            <div className="bg-white border-8 border-black rounded-3xl p-5 shadow-[8px_8px_0px_#000] space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider pb-2 border-b-2 border-black">Question Navigator ({activeSection.name})</h3>
              
              <div className="grid grid-cols-5 gap-2 max-h-[220px] overflow-y-auto pr-1">
                {activeSection.questions.map((q, idx) => {
                  const status = statusMap[q.id] || 'unvisited';
                  const isActive = activeQuestionIdx === idx;
                  
                  let bgClass = 'bg-slate-100 text-slate-400 border-slate-200';
                  if (status === 'answered') bgClass = 'bg-[#00ffa3] text-black border-black';
                  if (status === 'marked') bgClass = 'bg-[#ff007f] text-white border-black';
                  if (isActive) bgClass += ' ring-4 ring-[#ccff00]';

                  return (
                    <button
                      key={q.id}
                      onClick={() => setActiveQuestionIdx(idx)}
                      className={`w-9 h-9 rounded-lg border-2 font-black text-xs flex items-center justify-center cursor-pointer transition-all ${bgClass}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Status Legend */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t-2 border-slate-100 text-[9px] font-black uppercase text-slate-500">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-[#00ffa3] border border-black" /> Answered
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-[#ff007f] border border-black" /> Review
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-slate-100 border border-slate-200" /> Not Visited
                </div>
              </div>
            </div>

            {/* Submit Block */}
            <button
              onClick={handleManualSubmit}
              className="w-full bg-[#ff007f] text-white border-4 border-black px-6 py-4 rounded-2xl font-black uppercase tracking-wider text-xs hover:shadow-[4px_4px_0px_#000] hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Submit Exam <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* ── STATE 4: TERMINATED PAGE (CHEATING CAUGHT) ── */}
      {status === 'terminated' && (
        <div className="max-w-2xl mx-auto bg-white border-8 border-black rounded-3xl p-8 md:p-12 shadow-[12px_12px_0px_#000] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff007f]/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-center gap-4 text-[#ff007f] mb-6">
            <ShieldAlert className="w-14 h-14 stroke-[2.5]" />
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">Test Terminated</h2>
          </div>

          <div className="bg-[#ff007f]/5 border-4 border-[#ff007f] p-6 rounded-2xl mb-8">
            <p className="text-xs font-black uppercase text-[#ff007f] tracking-widest mb-1">Violation Summary</p>
            <p className="font-bold text-slate-800 text-base leading-relaxed">
              {violationReason || "Your exam was terminated automatically because a browser tab switch, page reload, or screen navigation occurred during active testing."}
            </p>
          </div>

          <p className="font-bold text-slate-600 text-sm leading-relaxed mb-8">
            In compliance with academic integrity protocols, this attempt is marked invalid and answers are locked.
          </p>

          <button
            onClick={handleResetExam}
            className="bg-black text-[#ccff00] border-4 border-black px-6 py-4 rounded-2xl font-black uppercase tracking-wider text-xs hover:-translate-y-1 transition-all shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.4)] cursor-pointer flex items-center gap-2 inline-block"
          >
            <RefreshCw className="w-4 h-4 text-[#ccff00]" /> Return &amp; Try Again
          </button>
        </div>
      )}

      {/* ── STATE 5: SUBMITTED / RESULTS SCREEN ── */}
      {status === 'submitted' && (() => {
        const { totalCorrect, totalAttempted, scorePercent, sectionBreakdown } = calculateResults();
        const finalScore = totalCorrect * 3;
        const maxScore = totalQuestionsCount * 3;

        return (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Top Score Summary Board */}
            <div className="bg-white border-8 border-black rounded-3xl p-8 md:p-12 shadow-[12px_12px_0px_#000] relative overflow-hidden">
              <div className="absolute right-0 top-0 w-48 h-48 bg-[#00ffa3]/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b-4 border-black mb-8">
                <div>
                  <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black">
                    Test Completed 🎉
                  </h2>
                  <p className="font-bold text-slate-500 uppercase tracking-widest text-xs mt-1">
                    Examinee report card generated instantly
                  </p>
                </div>
                <div className="bg-[#ccff00] text-black border-4 border-black px-5 py-3 rounded-2xl font-black uppercase text-xs tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 stroke-[2.5]" /> verified submission
                </div>
              </div>

              {/* Score Display Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-slate-50 border-4 border-black p-5 rounded-2xl shadow-[4px_4px_0px_#000]">
                  <p className="text-xs font-black uppercase text-slate-500 tracking-wider">Final Marks</p>
                  <p className="text-3xl font-black text-black mt-1">{finalScore} <span className="text-sm text-slate-400">/ {maxScore}</span></p>
                </div>

                <div className="bg-[#00ffa3]/10 border-4 border-black p-5 rounded-2xl shadow-[4px_4px_0px_#000]">
                  <p className="text-xs font-black uppercase text-slate-600 tracking-wider">Accuracy Rate</p>
                  <p className="text-3xl font-black text-black mt-1">{scorePercent}%</p>
                </div>

                <div className="bg-slate-50 border-4 border-black p-5 rounded-2xl shadow-[4px_4px_0px_#000]">
                  <p className="text-xs font-black uppercase text-slate-500 tracking-wider">Total Questions</p>
                  <p className="text-3xl font-black text-black mt-1">{totalQuestionsCount}</p>
                </div>

                <div className="bg-slate-50 border-4 border-black p-5 rounded-2xl shadow-[4px_4px_0px_#000]">
                  <p className="text-xs font-black uppercase text-slate-500 tracking-wider">Attempted</p>
                  <p className="text-3xl font-black text-black mt-1">{totalAttempted} <span className="text-sm text-slate-400">/ {totalQuestionsCount}</span></p>
                </div>
              </div>
            </div>

            {/* Sectional Breakdown Board */}
            <div className="bg-white border-8 border-black rounded-3xl p-6 md:p-8 shadow-[8px_8px_0px_#000]">
              <h3 className="text-2xl font-black uppercase tracking-tight mb-6">Sectional Analysis</h3>
              
              <div className="space-y-4">
                {NDIM_EXAM_SECTIONS.map(sec => {
                  const secStats = sectionBreakdown[sec.id];
                  const percent = secStats.total > 0 ? ((secStats.correct / secStats.total) * 100).toFixed(0) : '0';
                  
                  return (
                    <div key={sec.id} className="border-4 border-black p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-black text-lg text-black uppercase tracking-wider">{sec.name}</h4>
                        <p className="text-xs font-bold text-slate-500 mt-1">
                          Correct: {secStats.correct} | Attempted: {secStats.attempted} of {secStats.total}
                        </p>
                      </div>
                      
                      <div className="w-full md:w-48 flex items-center gap-3">
                        <div className="flex-1 bg-slate-100 border-2 border-black h-4 rounded-full overflow-hidden">
                          <div 
                            className="bg-[#00ffa3] h-full border-r-2 border-black" 
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="font-black text-xs uppercase tracking-wider text-black">{percent}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Comprehensive Q&A Review */}
            <div className="bg-white border-8 border-black rounded-3xl p-6 md:p-8 shadow-[8px_8px_0px_#000] space-y-8">
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                <HelpCircle className="w-7 h-7 text-black" /> Question-by-Question Review
              </h3>

              <div className="space-y-8 divide-y-4 divide-slate-100">
                {NDIM_EXAM_SECTIONS.flatMap((sec) => sec.questions).map((q, idx) => {
                  const userAnswerIdx = answers[q.id];
                  const isCorrect = userAnswerIdx === q.correctAnswer;
                  
                  return (
                    <div key={q.id} className={`${idx > 0 ? 'pt-8' : ''} space-y-4`}>
                      <div className="flex gap-3">
                        <span className="bg-black text-[#ccff00] border-2 border-black w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shrink-0">
                          {idx + 1}
                        </span>
                        <h4 className="font-bold text-black text-base leading-snug">{q.question}</h4>
                      </div>

                      {/* Choices */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-0 md:pl-11">
                        {q.options.map((opt, optIdx) => {
                          const isPicked = userAnswerIdx === optIdx;
                          const isCorrectOpt = q.correctAnswer === optIdx;
                          
                          let borderClass = 'border-slate-200 bg-white text-slate-700';
                          if (isCorrectOpt) borderClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                          else if (isPicked) borderClass = 'border-[#ff007f] bg-[#ff007f]/5 text-black font-bold';

                          return (
                            <div key={optIdx} className={`border-2 p-3.5 rounded-xl text-sm flex items-center justify-between ${borderClass}`}>
                              <span>{optIdx === 0 ? 'A' : optIdx === 1 ? 'B' : optIdx === 2 ? 'C' : 'D'}) &nbsp;{opt}</span>
                              <div className="text-xs font-black uppercase">
                                {isCorrectOpt && <span className="text-emerald-600">Correct Answer</span>}
                                {isPicked && !isCorrectOpt && <span className="text-[#ff007f]">Your Choice</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation */}
                      {q.explanation && (
                        <div className="bg-slate-50 border-2 border-black border-dashed p-4 rounded-2xl pl-4 md:ml-11 text-sm">
                          <p className="font-black text-black uppercase text-xs mb-1">Explanation:</p>
                          <p className="font-medium text-slate-600 leading-relaxed">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 text-center">
                <button
                  onClick={handleResetExam}
                  className="bg-[#ccff00] text-black border-4 border-black px-6 py-4 rounded-2xl font-black uppercase tracking-wider text-xs hover:shadow-[4px_4px_0px_#000] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Restart Exam Practice
                </button>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}

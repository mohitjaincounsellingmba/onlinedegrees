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

const ISBR_EXAM_SECTIONS: Section[] = [
  {
    id: 'beginner',
    name: 'Beginner Level',
    questions: [
      {
        id: 'b1',
        question: "ISBR Bangalore ka full form kya hai?",
        options: [
          "International School of Business & Research",
          "Indian School of Business & Research",
          "International Society of Business & Resources",
          "Indian Society of Business Review"
        ],
        correctAnswer: 0,
        explanation: "ISBR stands for International School of Business & Research."
      },
      {
        id: 'b2',
        question: "ISBR Bangalore ki sthapna (establishment) kis saal mein hui thi?",
        options: ["1990", "2000", "1994", "2010"],
        correctAnswer: 1,
        explanation: "ISBR Bangalore was established in the year 2000."
      },
      {
        id: 'b3',
        question: "ISBR Bangalore ka main campus kahan sthit hai?",
        options: [
          "Electronic City, Bangalore",
          "Whitefield, Bangalore",
          "MG Road, Bangalore",
          "Jayanagar, Bangalore"
        ],
        correctAnswer: 0,
        explanation: "The main campus of ISBR is located in Electronic City, Bangalore."
      },
      {
        id: 'b4',
        question: "ISBR ka PGDM program kiske dwara approved hai?",
        options: ["UGC", "AICTE, Ministry of Education", "AIU", "BCI"],
        correctAnswer: 1,
        explanation: "ISBR's PGDM is approved by AICTE, Ministry of Education."
      },
      {
        id: 'b5',
        question: "ISBR kis group ke antargat aata hai?",
        options: ["Bangalore Education Trust (BET)", "Delhi Public School Society", "Manipal Group", "Amity Group"],
        correctAnswer: 0,
        explanation: "ISBR is hosted under the Bangalore Education Trust (BET)."
      },
      {
        id: 'b6',
        question: "ISBR mein kaunsa flagship management program offer kiya jata hai?",
        options: ["B.Tech", "PGDM & MBA", "B.Sc", "MBBS"],
        correctAnswer: 1,
        explanation: "PGDM & MBA are the flagship management programs offered by ISBR."
      },
      {
        id: 'b7',
        question: "ISBR Bangalore ka MBA program kis university se affiliated hai?",
        options: ["Bangalore University / Mysore University", "VTU", "Delhi University", "Anna University"],
        correctAnswer: 0,
        explanation: "ISBR's MBA program is affiliated with Bangalore University / Mysore University."
      },
      {
        id: 'b8',
        question: "ISBR ke campus ki location ka sabse bada USP kya hai?",
        options: ["It's near IT Hub / Electronic City", "Beach side", "Mountain area", "Remote village"],
        correctAnswer: 0,
        explanation: "Its location inside Electronic City, Bangalore's primary IT hub, is its biggest placement and corporate networking USP."
      },
      {
        id: 'b9',
        question: "ISBR mein admissions ke liye kaunse entrance exams accept kiye jate hain?",
        options: ["CAT/MAT/CMAT/GMAT/ATMA", "GATE", "JEE", "NEET"],
        correctAnswer: 0,
        explanation: "ISBR accepts major national level management entrance tests like CAT, MAT, CMAT, GMAT, and ATMA."
      },
      {
        id: 'b10',
        question: "ISBR ka international accreditation kaun sa hai?",
        options: ["ACBSP (USA)", "ASIC (UK)", "AACSB", "NAAC only"],
        correctAnswer: 0,
        explanation: "ISBR is accredited globally by ACBSP (Accreditation Council for Business Schools and Programs, USA)."
      },
      {
        id: 'b11',
        question: "ISBR mein kitne major specializations offer hote hain?",
        options: ["1", "2 (Dual Specialization)", "5", "0"],
        correctAnswer: 1,
        explanation: "ISBR offers robust dual-specialization options to enhance academic depth."
      },
      {
        id: 'b12',
        question: "ISBR mein corporate mentoring ka kya mukhya uddeshya hai?",
        options: [
          "Sirf attendance",
          "Industry experts dwara one-on-one guidance",
          "Exam preparation",
          "Sports coaching"
        ],
        correctAnswer: 1,
        explanation: "Corporate mentoring provides students with personalized one-on-one professional guidance directly from industry experts."
      },
      {
        id: 'b13',
        question: "ISBR mein Summer Internship kahan provide ki jati hai?",
        options: ["Leading Corporate Companies mein", "College library mein", "Ghar par", "Nahi hoti"],
        correctAnswer: 0,
        explanation: "ISBR works with top corporate organizations to source summer internship postings."
      },
      {
        id: 'b14',
        question: "ISBR ke library mein kya uplabdh hai?",
        options: [
          "E-journals, books & international databases",
          "Sirf novels",
          "Koyi kitab nahi",
          "Sirf 10 books"
        ],
        correctAnswer: 0,
        explanation: "The library offers a deep inventory of e-journals, books, research journals, and international databases."
      },
      {
        id: 'b15',
        question: "ISBR ka core mission kya hai?",
        options: [
          "Global business leaders create karna",
          "Sirf profit kamana",
          "Sirf online degree dena",
          "Khel-kood badhana"
        ],
        correctAnswer: 0,
        explanation: "ISBR's core mission is to develop global business leaders and ethical professionals."
      },
      {
        id: 'b16',
        question: "ISBR mein faculty ka background kaisa hota hai?",
        options: ["Industry experienced & IIM/IIT alumni", "Sirf freshers", "Part-time local tutors", "None"],
        correctAnswer: 0,
        explanation: "The academic team comprises highly qualified, industry-experienced, and research-focused scholars, including IIM/IIT alumni."
      },
      {
        id: 'b17',
        question: "ISBR ke campus mein sports aur cultural activities kaisi hain?",
        options: ["Active student clubs & annual fests", "Bilkul nahi", "Sirf padhai", "Online only"],
        correctAnswer: 0,
        explanation: "ISBR maintains numerous student-driven clubs alongside major annual cultural and sports fests."
      },
      {
        id: 'b18',
        question: "ISBR Bangalore ki NAAC accreditation kya status rakhti hai?",
        options: ["Accredited with high grade", "Not accredited", "Provisional", "Pending"],
        correctAnswer: 0,
        explanation: "ISBR is officially accredited by NAAC (National Assessment and Accreditation Council) with a high grade."
      },
      {
        id: 'b19',
        question: "ISBR ke placement cell ka kya naam hai?",
        options: ["Corporate Relations / Placement Cell", "Student Club", "Exam Cell", "Admissions Cell"],
        correctAnswer: 0,
        explanation: "The placement division is named the Corporate Relations and Placement Cell."
      },
      {
        id: 'b20',
        question: "ISBR mein students ke liye dress code kya hai?",
        options: ["Formal Business Attire", "Casuals", "Sportswear", "Any dress"],
        correctAnswer: 0,
        explanation: "Formal business attire is mandatory to cultivate corporate habits and professional grooming."
      }
    ]
  },
  {
    id: 'intermediate',
    name: 'Intermediate Level',
    questions: [
      {
        id: 'i1',
        question: "ISBR ka average placement package approx kitna range karta hai?",
        options: ["3-4 LPA", "7-9 LPA", "25 LPA", "50 LPA"],
        correctAnswer: 1,
        explanation: "The average placement package ranges between 7 to 9 LPA."
      },
      {
        id: 'i2',
        question: "ISBR mein 'Global Exposure' ke tahat students kahan jate hain?",
        options: ["International partner universities abroad", "Sirf apne ghar", "Local park", "Nahi jate"],
        correctAnswer: 0,
        explanation: "Students visit international partner universities globally for exchange programs, study tours, and joint degrees."
      },
      {
        id: 'i3',
        question: "ISBR mein Live Projects ka kya mahatva hai?",
        options: ["Real-world corporate problem solving", "Time pass", "Exam marks", "Koyi fayda nahi"],
        correctAnswer: 0,
        explanation: "Live projects allow students to work directly on active business issues, driving practical problem-solving capabilities."
      },
      {
        id: 'i4',
        question: "ISBR ke PGDM aur MBA mein mukhya antar kya hai?",
        options: [
          "PGDM industry-focused hai aur MBA university syllabus based",
          "Dono mein koi antar nahi",
          "PGDM invalid hai",
          "MBA sirf online hai"
        ],
        correctAnswer: 0,
        explanation: "PGDM is designed and updated directly in line with corporate requirements (autonomous), while MBA follows university-prescribed academic cycles."
      },
      {
        id: 'i5',
        question: "ISBR mein 'Industry-Integrated Curriculum' ka kya matlab hai?",
        options: [
          "Corporate demands ke hisab se syllabus design",
          "Sirf theoretical books",
          "Old syllabus",
          "None"
        ],
        correctAnswer: 0,
        explanation: "Curriculum matches requirements of current corporate and market conditions, designed with guidance from corporate boards."
      },
      {
        id: 'i6',
        question: "ISBR ka ACBSP (USA) accreditation kya darshata hai?",
        options: ["Global standard of business education", "Local school status", "State board approval", "None"],
        correctAnswer: 0,
        explanation: "It indicates that the institution offers programs meeting international business education benchmarks of high quality."
      },
      {
        id: 'i7',
        question: "ISBR mein student-driven clubs (jaise HR, Finance, Marketing clubs) ka kya kaam hai?",
        options: ["Leadership & managerial skill development", "Sirf party", "Exam conduct karna", "None"],
        correctAnswer: 0,
        explanation: "Clubs are entirely student-driven to foster essential peer management, budget oversight, and leadership skills."
      },
      {
        id: 'i8',
        question: "ISBR mein corporate guest lectures kyun important hain?",
        options: ["Latest industry trends seekhne ke liye", "Attendance ke liye", "Time waste karne ke liye", "None"],
        correctAnswer: 0,
        explanation: "Guest lectures host business practitioners who present their daily experiences and explain active trends."
      },
      {
        id: 'i9',
        question: "ISBR mein Summer Internship kitne samay ki hoti hai?",
        options: ["8-12 weeks", "1 din", "1 saal", "Nahi hoti"],
        correctAnswer: 0,
        explanation: "Summer internships generally span between 8 to 12 weeks during the summer break."
      },
      {
        id: 'i10',
        question: "ISBR mein soft skills aur personality development training kab di jati hai?",
        options: ["Regularly throughout the course", "Sirf akhri din", "Nahi di jati", "Interview ke baad"],
        correctAnswer: 0,
        explanation: "Personality development and communication training are built into the curriculum and taught continuously."
      },
      {
        id: 'i11',
        question: "ISBR alumni network students ki help kaise karta hai?",
        options: ["Job referrals aur industry networking mein", "Koyi help nahi", "Sirf fees lene mein", "None"],
        correctAnswer: 0,
        explanation: "Alumni offer mentoring, placement networks, and referral windows for recruitment drives."
      },
      {
        id: 'i12',
        question: "ISBR mein faculty-student interaction kaisa hai?",
        options: ["Mentorship model ke sath strong interaction", "Bohat kam", "Sirf email par", "None"],
        correctAnswer: 0,
        explanation: "ISBR uses a structured mentoring model that allows every student to connect regularly with assigned mentors."
      },
      {
        id: 'i13',
        question: "ISBR mein entrepreneurship aur startup support ke liye kya hai?",
        options: ["Incubation & Innovation Cell", "Koyi support nahi", "Sirf loan", "None"],
        correctAnswer: 0,
        explanation: "ISBR's Incubation Center supports business ideation, initial funding connections, and office workspace."
      },
      {
        id: 'i14',
        question: "ISBR mein mock interviews aur pre-placement training ka kya fayda hai?",
        options: ["Interview confidence aur conversion badhana", "Nervousness badhana", "Time waste", "None"],
        correctAnswer: 0,
        explanation: "It preps students on typical business tests, body language, and answers, increasing interview conversions."
      },
      {
        id: 'i15',
        question: "ISBR ke campus mein Bloomberg Terminal ya financial lab ka kya upyog hai?",
        options: ["Real-time financial market analysis ke liye", "Video games ke liye", "Typing ke liye", "None"],
        correctAnswer: 0,
        explanation: "It teaches analytics and lets finance students study real-time global markets data."
      },
      {
        id: 'i16',
        question: "ISBR mein case study-based learning kyun karwayi jati hai?",
        options: ["Practical decision-making skills ke liye", "Ratta marne ke liye", "Sirf exam ke liye", "None"],
        correctAnswer: 0,
        explanation: "Studying real-world business scenarios develops logical thinking and decision-making under uncertainty."
      },
      {
        id: 'i17',
        question: "ISBR ke admissions mein GD/PI (Group Discussion & Personal Interview) ka kya role hai?",
        options: ["Communication aur analytical skills check karne ke liye", "Sirf formality", "Time pass", "None"],
        correctAnswer: 0,
        explanation: "It assesses candidate aptitude, confidence, communication skills, and MBA profile match."
      },
      {
        id: 'i18',
        question: "ISBR ka corporate interface Electronic City mein hone se kya advantage milta hai?",
        options: ["Top IT aur MNCs ki proximity aur easy placements", "Koyi fayda nahi", "Traffic ki samasya", "None"],
        correctAnswer: 0,
        explanation: "Being located in the heart of Bangalore's IT core brings companies right to campus doorsteps."
      },
      {
        id: 'i19',
        question: "ISBR mein research publications aur conferences ka kya status hai?",
        options: ["Regular international conferences aur faculty research", "Koyi research nahi", "Sirf library band", "None"],
        correctAnswer: 0,
        explanation: "ISBR publishes journals and regularly hosts global seminars bringing international scholars."
      },
      {
        id: 'i20',
        question: "ISBR ka campus environment kaisa hai?",
        options: ["Vibrant, multicultural, aur corporate-style", "Dull aur boring", "Strict school jaisa", "None"],
        correctAnswer: 0,
        explanation: "It has a diverse batch with students from all states, creating a corporate-like ecosystem."
      }
    ]
  },
  {
    id: 'advanced',
    name: 'Advanced & Sales Strategy',
    questions: [
      {
        id: 'a1',
        question: "Jab prospective parent kahe 'ISBR ki fees kya justification rakhti hai?', toh counselor ko kya batana chahiye?",
        options: [
          "ROI, Electronic City proximity, aur ACBSP global accreditation",
          "Fees wapas nahi milegi",
          "College chod do",
          "Chup raho"
        ],
        correctAnswer: 0,
        explanation: "Highlight the strong placement track record, global ACBSP accreditation, and the business location."
      },
      {
        id: 'a2',
        question: "ISBR ke placement stats explain karte waqt counselor ki kya approach honi chahiye?",
        options: [
          "Transparent highest, average package aur top recruiters (Big 4, MNCs) batana",
          "False numbers dena",
          "Sirf 100% placement bolna",
          "Package chupana"
        ],
        correctAnswer: 0,
        explanation: "Maintaining clean and transparent placement accounts builds absolute trust and credential support."
      },
      {
        id: 'a3',
        question: "Student kahe 'Mujhe IIM nahi mila', toh ISBR ko kaise pitch karein?",
        options: [
          "Bangalore ke tech hub advantage, industry connect aur global exposure ke sath",
          "IIM ko bura bolo",
          "Admission cancel karo",
          "Rone lago"
        ],
        correctAnswer: 0,
        explanation: "Highlight that ISBR offers high corporate interaction, practical skill sets, and a dynamic job pool in Bangalore."
      },
      {
        id: 'a4',
        question: "ISBR ke ACBSP (USA) accreditation ko global sales pitch mein kaise use karein?",
        options: [
          "Yeh batakar ki degree globally US standards ke barabar recognized hai",
          "Yeh sirf ek stamp hai",
          "Iska koi matlab nahi",
          "None"
        ],
        correctAnswer: 0,
        explanation: "Explain that international accreditors validate the degree program, enhancing global job mobility."
      },
      {
        id: 'a5',
        question: "ISBR ke 'Global Study Tour' ya international exchange program ka kya value prop hai?",
        options: ["International corporate exposure aur cross-cultural learning", "Sirf ghumna", "Extra kharcha", "None"],
        correctAnswer: 0,
        explanation: "Global study modules provide students with overseas industrial exposure and global business mindset."
      },
      {
        id: 'a6',
        question: "ISBR mein 3rd semester se placement process shuru hone ka kya benefit hai?",
        options: ["Students ko early offers aur better preparation ka time milta hai", "Pressure badhta hai", "Koyi fayda nahi", "None"],
        correctAnswer: 0,
        explanation: "An early start ensures students have a longer placement window and multiple choices before graduation."
      },
      {
        id: 'a7',
        question: "ISBR ke 'CXO Meet' ya corporate leaders interaction ka sales mein kaise use karein?",
        options: [
          "Yeh dikhane ke liye ki students direct industry leaders se mentor hote hain",
          "Sirf khana khane ke liye",
          "Koyi use nahi",
          "None"
        ],
        correctAnswer: 0,
        explanation: "Highlight that students get regular opportunities to present their ideas directly to active business heads."
      },
      {
        id: 'a8',
        question: "Handling objection: 'Bangalore mein toh bahut saare colleges hain, ISBR kyun?'",
        options: [
          "Electronic City ke beech mein sthit hone ka core corporate advantage batakar",
          "Sabhi college ek jaise hain",
          "Humse mat lo",
          "None"
        ],
        correctAnswer: 0,
        explanation: "Leverage the geographic advantage of being in Electronic City, which hosts major global offices."
      },
      {
        id: 'a9',
        question: "ISBR ke dual specialization ka advantage student ko interview mein kaise milta hai?",
        options: [
          "Do alag domains (jaise Marketing + Finance) ki deep knowledge se versatile profile banti hai",
          "Confusion hota hai",
          "Extra exam dene padte hain",
          "None"
        ],
        correctAnswer: 0,
        explanation: "Dual expertise allows candidates to apply for a wider set of roles and solve cross-domain tasks."
      },
      {
        id: 'a10',
        question: "ISBR mein Summer Internship (SIP) ka final placement se kya link hai?",
        options: ["PPO (Pre-Placement Offer) convert hone ke high chances hote hain", "Koyi link nahi", "Sirf project submit hota hai", "None"],
        correctAnswer: 0,
        explanation: "Stellar performance during internships often leads directly to pre-placement offers (PPOs)."
      },
      {
        id: 'a11',
        question: "ISBR ke Entrepreneurship cell ko aspiring founders ke liye kaise pitch karein?",
        options: ["Incubation support, funding guidance aur mentor network milta hai", "Sirf advice milti hai", "Koyi fayda nahi", "None"],
        correctAnswer: 0,
        explanation: "Frame it as a comprehensive startup launcher with mentor, legal, and investor support networks."
      },
      {
        id: 'a12',
        question: "ISBR mein corporate readiness ke liye 'Outbound Leadership Camps' ka kya role hai?",
        options: ["Team building, leadership aur resilience develop karna", "Sirf picnic", "Time waste", "None"],
        correctAnswer: 0,
        explanation: "Outbound experiential learning helps students build collaboration, leadership, and emotional grit."
      },
      {
        id: 'a13',
        question: "ISBR ke student diversity (pan-India aur international students) ka kya fayda hai?",
        options: ["Rich peer-to-peer learning aur networking", "Language barrier", "Koyi fayda nahi", "None"],
        correctAnswer: 0,
        explanation: "Learning alongside peers from diverse cultural frameworks builds empathy and strong interpersonal links."
      },
      {
        id: 'a14',
        question: "ISBR mein digital marketing, business analytics jaise new-age electives kyun offer hote hain?",
        options: ["Modern industry ki high-demand skills fulfill karne ke liye", "Sirf naam ke liye", "Old syllabus ke sath", "None"],
        correctAnswer: 0,
        explanation: "Offering electives aligned with modern tech demands increases placements and career readiness."
      },
      {
        id: 'a15',
        question: "Counselor ko lead conversion ke liye ISBR ka kaunsa sabse bada USP highlight karna chahiye?",
        options: ["Electronic City location + ACBSP global accreditation + Strong ROI", "Sirf building", "Sirf hostel", "None"],
        correctAnswer: 0,
        explanation: "The combined value of a prime location, global accreditation, and placement yields the highest ROI value."
      },
      {
        id: 'a16',
        question: "ISBR mein faculty consultancies aur industry live projects ka student learning par kya asar hai?",
        options: ["Real-time corporate problem solving ka practical exposure", "Sirf theory", "Koyi asar nahi", "None"],
        correctAnswer: 0,
        explanation: "Instructors filter active consulting insights back to the classroom, helping students study live business models."
      },
      {
        id: 'a17',
        question: "ISBR ke alumni jo top leadership roles mein hain, unka use counseling mein kaise karein?",
        options: ["Success stories aur strong alumni network ka reference dekar trust build karna", "Chup rehna", "False stories banana", "None"],
        correctAnswer: 0,
        explanation: "Using verified success stories of alumni validates the institution's capability to build career leaders."
      },
      {
        id: 'a18',
        question: "ISBR ke placement training mein aptitude aur technical grooming kab hoti hai?",
        options: ["From day one / 1st year itself", "Last month mein", "Nahi hoti", "Graduation ke baad"],
        correctAnswer: 0,
        explanation: "Placement training starts early, ensuring students build logical, reasoning, and presentation skills."
      },
      {
        id: 'a19',
        question: "ISBR ke corporate mentor program mein mentors kahan se aate hain?",
        options: ["Top MNCs aur Fortune 500 companies ke senior leaders", "Local colleges se", "Students hi mentor hote hain", "None"],
        correctAnswer: 0,
        explanation: "Mentor pools comprise senior directors, analysts, and recruiters from top organizations."
      },
      {
        id: 'a20',
        question: "ISBR mein closing the sales pitch ka sabse effective tareeka kya hai?",
        options: [
          "Student ke career goals ko map karke campus visit ya expert counseling session book karna",
          "Zabardasti admission ke liye bolna",
          "Phone kaat dena",
          "None"
        ],
        correctAnswer: 0,
        explanation: "Connecting their goals to the campus offerings and organizing a direct session builds credibility and locks enrolment."
      }
    ]
  }
];

const EXAM_DURATION_SECONDS = 30 * 60; // 30 minutes for 60 questions

type ExamStatus = 'idle' | 'registering' | 'running' | 'terminated' | 'submitted';

export function IsbrExamClient() {
  // Navigation & User State
  const [status, setStatus] = useState<ExamStatus>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  // Active Test State
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [statusMap, setStatusMap] = useState<Record<string, 'answered' | 'marked' | 'unvisited'>>({});
  const [remainingTime, setRemainingTime] = useState(EXAM_DURATION_SECONDS);

  // Anti-Cheating State
  const [violationCount, setViolationCount] = useState(0);
  const [violationReason, setViolationReason] = useState('');
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [isWindowFocused, setIsWindowFocused] = useState(true);

  // Refs for tracking
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const statusRef = useRef<ExamStatus>('idle');
  const violationCountRef = useRef(0);
  const isFullScreenRef = useRef(false);

  // Sync refs
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    violationCountRef.current = violationCount;
  }, [violationCount]);

  // Questions calculations
  const allQuestions = ISBR_EXAM_SECTIONS.flatMap(sec => sec.questions);
  const totalQuestionsCount = allQuestions.length;

  const activeSection = ISBR_EXAM_SECTIONS[activeSectionIdx];
  const activeQuestion = activeSection.questions[activeQuestionIdx];

  // Tab reload prevention check
  useEffect(() => {
    const savedSession = localStorage.getItem('isbr_exam_session');
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        if (parsed.status === 'running') {
          setStatus('terminated');
          setViolationReason("Page reload, refresh, or tab closure detected. As per the anti-cheating policy, the exam has been ended.");
          setViolationCount(2);
          localStorage.setItem('isbr_exam_session', JSON.stringify({
            status: 'terminated',
            email: parsed.email,
            name: parsed.name,
            reason: 'Reload/Tab closure'
          }));

          // Send POST to /api/exams
          fetch('/api/exams', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: parsed.name,
              email: parsed.email,
              phone: parsed.phone || '',
              examName: 'ISBR Counselling Exam',
              score: 0,
              maxScore: 180,
              percentage: '0.0',
              correctAnswers: 0,
              totalQuestions: 60,
              status: 'terminated',
              reason: 'Page reload, refresh, or tab closure detected'
            })
          }).catch(console.error);
        }
      } catch (e) {
        console.error("Error reading ISBR session", e);
      }
    }
  }, []);

  // Timer loop
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

  // Hook event listeners
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

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (statusRef.current === 'running') {
        const message = "Leaving now will end your exam.";
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
      
      const savedSession = localStorage.getItem('isbr_exam_session');
      let currentName = name;
      let currentEmail = email;
      let currentPhone = phone;
      if (savedSession) {
        try {
          const parsed = JSON.parse(savedSession);
          currentName = parsed.name || name;
          currentEmail = parsed.email || email;
          currentPhone = parsed.phone || phone;
          localStorage.setItem('isbr_exam_session', JSON.stringify({
            ...parsed,
            status: 'terminated',
            reason: reason
          }));
        } catch (_) {}
      }

      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }

      // Send termination POST
      fetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: currentName,
          email: currentEmail,
          phone: currentPhone,
          examName: 'ISBR Counselling Exam',
          score: 0,
          maxScore: 180,
          percentage: '0.0',
          correctAnswers: 0,
          totalQuestions: 60,
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
      console.warn("Fullscreen permission denied:", err);
    }
  };

  // Start
  const handleStartExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    if (passcode !== '2027') {
      setPasscodeError('Invalid passcode. Please enter 2027 to begin the exam.');
      return;
    }

    setStatus('running');
    setRemainingTime(EXAM_DURATION_SECONDS);
    setAnswers({});
    setViolationCount(0);
    setViolationReason('');

    const initialStatus: Record<string, 'answered' | 'marked' | 'unvisited'> = {};
    ISBR_EXAM_SECTIONS.forEach(sec => {
      sec.questions.forEach((q) => {
        initialStatus[q.id] = 'unvisited';
      });
    });
    setStatusMap(initialStatus);

    localStorage.setItem('isbr_exam_session', JSON.stringify({
      status: 'running',
      name,
      email,
      phone,
      startedAt: Date.now()
    }));

    await requestFullscreen();
  };

  // Responses
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
    setStatusMap(prev => ({ ...prev, [questionId]: 'unvisited' }));
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
    } else if (activeSectionIdx < ISBR_EXAM_SECTIONS.length - 1) {
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
      setActiveQuestionIdx(ISBR_EXAM_SECTIONS[prevSecIdx].questions.length - 1);
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
    if (confirm("Are you sure you want to submit your ISBR Bangalore Counselor Assessment?")) {
      submitExamResults('Submitted Successfully');
    }
  };

  const postResultToBackend = async (statusOverride: 'submitted' | 'terminated', reasonOverride?: string) => {
    try {
      let totalCorrect = 0;
      allQuestions.forEach(q => {
        const userAnswer = answers[q.id];
        if (userAnswer !== undefined && userAnswer === q.correctAnswer) {
          totalCorrect++;
        }
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
          examName: 'ISBR Counselling Exam',
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
      console.error(e);
    }
  };

  const submitExamResults = (submissionType: string) => {
    setStatus('submitted');
    localStorage.setItem('isbr_exam_session', JSON.stringify({
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

    postResultToBackend('submitted');
  };

  const handleResetExam = () => {
    localStorage.removeItem('isbr_exam_session');
    setStatus('idle');
    setName('');
    setEmail('');
    setPhone('');
    setPasscode('');
    setPasscodeError('');
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

    ISBR_EXAM_SECTIONS.forEach(sec => {
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
      
      {/* Warning Modal */}
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

      {/* STATE 1: IDLE */}
      {status === 'idle' && (
        <div className="max-w-4xl mx-auto bg-white border-8 border-black rounded-3xl p-8 md:p-12 shadow-[12px_12px_0px_#000] relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">
            ISBR Bangalore Counselling Exam
          </h2>
          <p className="text-lg font-bold text-slate-700 leading-relaxed mb-8">
            Welcome to the ISBR Bangalore MBA & PGDM Master Counselor Training Quiz. This test consists of 60 questions covering ISBR institution profiles, academics, placements, USP details, and sales strategies.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#ccff00]/10 border-4 border-black p-6 rounded-2xl">
              <h3 className="text-lg font-black uppercase tracking-wider mb-3 flex items-center gap-2">
                <Timer className="w-5 h-5 text-black" /> Test Parameters
              </h3>
              <ul className="space-y-2 text-sm font-bold text-slate-700">
                <li>• Total Duration: <span className="text-black">30 Minutes</span></li>
                <li>• Total Questions: <span className="text-black">60 Questions</span></li>
                <li>• Marks: <span className="text-black">+3 Marks</span> for Correct, <span className="text-black">0 Marks</span> for Wrong</li>
                <li>• Levels: <span className="text-black">3 Levels of Questions</span></li>
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

      {/* STATE 2: REGISTER */}
      {status === 'registering' && (
        <div className="max-w-lg mx-auto bg-white border-8 border-black rounded-3xl p-8 md:p-10 shadow-[12px_12px_0px_#000]">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Examinee Details</h2>
          <p className="text-sm font-bold text-slate-500 mb-8 uppercase tracking-wide">Enter valid details to begin the ISBR Counselor validation assessment.</p>

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

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-black mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" /> Exam Passcode
              </label>
              <input
                type="text"
                required
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setPasscodeError('');
                }}
                placeholder="Enter 2027 to start"
                className="w-full border-4 border-black bg-[#fdfdfb] p-4 rounded-2xl font-bold placeholder-slate-400 focus:outline-none focus:bg-[#ccff00]/5 transition-all text-black"
              />
              {passcodeError && (
                <p className="text-red-500 font-bold text-xs mt-2 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> {passcodeError}
                </p>
              )}
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

      {/* STATE 3: RUNNING */}
      {status === 'running' && (
        <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-3 bg-white border-8 border-black rounded-3xl p-6 md:p-8 shadow-[8px_8px_0px_#000] flex flex-col justify-between min-h-[520px]">
            <div>
              <div className="flex flex-wrap items-center justify-between pb-6 border-b-4 border-black gap-4 mb-6">
                <div className="flex gap-2 overflow-x-auto pb-1 max-w-full">
                  {ISBR_EXAM_SECTIONS.map((sec, idx) => (
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

                <div className="flex items-center gap-3">
                  <div className="bg-[#ff007f]/10 border-2 border-[#ff007f] px-2.5 py-1.5 rounded-xl text-[#ff007f] text-[10px] font-black uppercase flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" /> Striking: {violationCount}/2
                  </div>
                  <div className="bg-black text-white px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black tracking-wider flex items-center gap-2">
                    <Timer className="w-3.5 h-3.5 text-[#ccff00]" /> {formatTime(remainingTime)}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-3">
                  <span className="bg-[#ccff00] text-black border-2 border-black w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shrink-0">
                    Q{activeQuestionIdx + 1}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-black leading-snug">
                    {activeQuestion.question}
                  </h3>
                </div>

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

          <div className="space-y-6">
            <div className="bg-white border-8 border-black rounded-3xl p-5 shadow-[8px_8px_0px_#000]">
              <h3 className="text-xs font-black uppercase tracking-wider mb-3 pb-2 border-b-2 border-black">Examinee</h3>
              <p className="font-bold text-black text-sm truncate">{name}</p>
              <p className="text-xs font-bold text-slate-500 truncate">{email}</p>
            </div>

            <div className="bg-white border-8 border-black rounded-3xl p-5 shadow-[8px_8px_0px_#000] space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider pb-2 border-b-2 border-black">Navigator ({activeSection.name})</h3>
              
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

            <button
              onClick={handleManualSubmit}
              className="w-full bg-[#ff007f] text-white border-4 border-black px-6 py-4 rounded-2xl font-black uppercase tracking-wider text-xs hover:shadow-[4px_4px_0px_#000] hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Submit Exam <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STATE 4: TERMINATED */}
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

      {/* STATE 5: SUBMITTED / RESULTS */}
      {status === 'submitted' && (() => {
        const { totalCorrect, totalAttempted, scorePercent, sectionBreakdown } = calculateResults();
        const finalScore = totalCorrect * 3;
        const maxScore = totalQuestionsCount * 3;

        return (
          <div className="max-w-4xl mx-auto space-y-8">
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

            <div className="bg-white border-8 border-black rounded-3xl p-6 md:p-8 shadow-[8px_8px_0px_#000]">
              <h3 className="text-2xl font-black uppercase tracking-tight mb-6">Sectional Analysis</h3>
              
              <div className="space-y-4">
                {ISBR_EXAM_SECTIONS.map(sec => {
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

            <div className="bg-white border-8 border-black rounded-3xl p-6 md:p-8 shadow-[8px_8px_0px_#000] space-y-8">
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                <HelpCircle className="w-7 h-7 text-black" /> Question-by-Question Review
              </h3>

              <div className="space-y-8 divide-y-4 divide-slate-100">
                {ISBR_EXAM_SECTIONS.flatMap((sec) => sec.questions).map((q, idx) => {
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

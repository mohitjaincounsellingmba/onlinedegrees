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

const APPROVALS_EXAM_SECTIONS: Section[] = [
  {
    id: 'section1',
    name: 'Section 1: Full Forms & Regulatory Bodies',
    questions: [
      {
        id: 'sf1',
        question: "UGC ka full form kya hai?",
        options: [
          "University Grants Commission",
          "Union Grants Committee",
          "United Grants Council",
          "University Governing Commission"
        ],
        correctAnswer: 0,
        explanation: "UGC stands for University Grants Commission, the main regulatory body for universities in India."
      },
      {
        id: 'sf2',
        question: "AICTE ka full form kya hai?",
        options: [
          "All India Council for Technical Education",
          "Association of Indian Council for Technology Education",
          "All India Committee on Technical Excellence",
          "All India Council for Training & Education"
        ],
        correctAnswer: 0,
        explanation: "AICTE stands for All India Council for Technical Education, which regulates technical and management programs."
      },
      {
        id: 'sf3',
        question: "AIU ka full form kya hai?",
        options: [
          "Association of Indian Universities",
          "All India Universities Association",
          "Association of International Universities",
          "Agency for Indian Universities"
        ],
        correctAnswer: 0,
        explanation: "AIU stands for Association of Indian Universities, which provides equivalence certificates for foreign degrees and PGDM programs."
      },
      {
        id: 'sf4',
        question: "NAAC ka full form kya hai?",
        options: [
          "National Assessment and Accreditation Council",
          "National Agency for Academic Coordination",
          "National Association for Accreditation Councils",
          "National Academy of Assessment and Credentials"
        ],
        correctAnswer: 0,
        explanation: "NAAC stands for National Assessment and Accreditation Council, which evaluates the overall quality of higher education institutions."
      },
      {
        id: 'sf5',
        question: "NBA ka full form kya hai?",
        options: [
          "National Board of Accreditation",
          "National Business Association",
          "National Bureau of Academics",
          "National Board of Affiliation"
        ],
        correctAnswer: 0,
        explanation: "NBA stands for National Board of Accreditation, which focuses on program-specific quality evaluation (like MBA, B.Tech, etc.)."
      },
      {
        id: 'sf6',
        question: "AACSB ka full form kya hai?",
        options: [
          "Association to Advance Collegiate Schools of Business",
          "Association of Academic Colleges and Schools of Business",
          "Accreditation Agency for Collegiate Schools of Business",
          "American Alliance of Collegiate Business Schools"
        ],
        correctAnswer: 0,
        explanation: "AACSB is the Association to Advance Collegiate Schools of Business, a global elite business school accreditation."
      },
      {
        id: 'sf7',
        question: "ACBSP ka full form kya hai?",
        options: [
          "Accreditation Council for Collegiate Business Schools and Programs",
          "Association of College Business Schools and Programs",
          "Accredited Council for Business Schools and Professionals",
          "Accreditation Committee for Business Schools & Programs"
        ],
        correctAnswer: 0,
        explanation: "ACBSP is the Accreditation Council for Collegiate Business Schools and Programs, focusing on teaching excellence."
      },
      {
        id: 'sf8',
        question: "EQUIS ka full form kya hai?",
        options: [
          "EFMD Quality Improvement System",
          "European Quality Integration Standards",
          "Educational Quality International System",
          "Equivalency Quality Improvement Standard"
        ],
        correctAnswer: 0,
        explanation: "EQUIS is the EFMD Quality Improvement System, an international accreditation run by the European Foundation for Management Development."
      },
      {
        id: 'sf9',
        question: "NIRF ka full form kya hai?",
        options: [
          "National Institutional Ranking Framework",
          "National Institute for Research and Formulation",
          "National Institutional Rating Federation",
          "National Index for Research and Findings"
        ],
        correctAnswer: 0,
        explanation: "NIRF stands for National Institutional Ranking Framework, the government's official ranking system for Indian colleges and universities."
      },
      {
        id: 'sf10',
        question: "MHRD ka full form kya hai?",
        options: [
          "Ministry of Human Resources and Development (Now MoE)",
          "Ministry of Higher Education and Research Department",
          "Management of Human Resource Department",
          "Ministry of Human Rights and Development"
        ],
        correctAnswer: 0,
        explanation: "MHRD is the Ministry of Human Resources and Development, which has now been renamed as the Ministry of Education (MoE)."
      },
      {
        id: 'sf11',
        question: "BCI ka full form kya hai?",
        options: [
          "Bar Council of India",
          "Board of Counselling in India",
          "Bar Council of Institutions",
          "Board of Curation in India"
        ],
        correctAnswer: 0,
        explanation: "BCI stands for Bar Council of India, which regulates legal education and law colleges in India."
      },
      {
        id: 'sf12',
        question: "PCI ka full form kya hai?",
        options: [
          "Pharmacy Council of India",
          "Pharmaceutical Council of Institutions",
          "Pharmacy Committee of India",
          "Professional Council of India"
        ],
        correctAnswer: 0,
        explanation: "PCI stands for Pharmacy Council of India, regulating pharmacy courses and colleges."
      },
      {
        id: 'sf13',
        question: "NMC ka full form kya hai?",
        options: [
          "National Medical Commission",
          "National Medical Council",
          "National Medicine Committee",
          "National Medical Credentials"
        ],
        correctAnswer: 0,
        explanation: "NMC stands for National Medical Commission, which replaced the Medical Council of India (MCI) to regulate medical education."
      },
      {
        id: 'sf14',
        question: "ICAR ka full form kya hai?",
        options: [
          "Indian Council of Agricultural Research",
          "Indian Council of Academic Research",
          "Indian Committee for Agricultural Research",
          "International Council of Agricultural Research"
        ],
        correctAnswer: 0,
        explanation: "ICAR stands for Indian Council of Agricultural Research, regulating agricultural education and research."
      },
      {
        id: 'sf15',
        question: "NCTE ka full form kya hai?",
        options: [
          "National Council for Teacher Education",
          "National Council for Technological Education",
          "National Committee on Teacher Excellence",
          "National Council of Training and Education"
        ],
        correctAnswer: 0,
        explanation: "NCTE stands for National Council for Teacher Education, regulating teacher training and education programs."
      },
      {
        id: 'sf16',
        question: "DEC ka full form kya hai?",
        options: [
          "Distance Education Council",
          "Distance Education Commission",
          "Department of Education and Counselling",
          "Distance E-learning Council"
        ],
        correctAnswer: 0,
        explanation: "DEC is the Distance Education Council, which formerly governed open/distance programs before being replaced by DEB."
      },
      {
        id: 'sf17',
        question: "DEB ka full form kya hai?",
        options: [
          "Distance Education Bureau",
          "Distance Education Board",
          "Department of Education and Bureaucracy",
          "Distance Education Branch"
        ],
        correctAnswer: 0,
        explanation: "DEB stands for Distance Education Bureau, a bureau under UGC that regulates online and distance programs."
      },
      {
        id: 'sf18',
        question: "IGNOU ka full form kya hai?",
        options: [
          "Indira Gandhi National Open University",
          "Indira Gandhi National Online University",
          "Indian Government National Open University",
          "Indira Gandhi Network of Open Universities"
        ],
        correctAnswer: 0,
        explanation: "IGNOU stands for Indira Gandhi National Open University, the largest open university in India."
      },
      {
        id: 'sf19',
        question: "ASIC ka full form kya hai?",
        options: [
          "Accreditation Service for International Schools, Colleges and Universities",
          "Association of School Inspections and Credentials",
          "Accreditation Standard for International Colleges",
          "Agency for School Inspections and Certifications"
        ],
        correctAnswer: 0,
        explanation: "ASIC is the Accreditation Service for International Schools, Colleges and Universities, an international accreditation body based in the UK."
      },
      {
        id: 'sf20',
        question: "AMBA ka full form kya hai?",
        options: [
          "Association of MBAs",
          "Accreditation of MBAs Association",
          "Association of Management and Business Administration",
          "Alliance of MBA Colleges"
        ],
        correctAnswer: 0,
        explanation: "AMBA stands for Association of MBAs, a global MBA program accrediting body."
      }
    ]
  },
  {
    id: 'section2',
    name: 'Section 2: Conceptual & Admissions Understanding',
    questions: [
      {
        id: 'ca1',
        question: "MBA degree kiske dwara di jati hai?",
        options: [
          "University (UGC approved)",
          "Standalone Institute",
          "Any private company",
          "None of the above"
        ],
        correctAnswer: 0,
        explanation: "In India, only Universities (approved under UGC) can award degrees like MBA. Independent institutes offer diplomas (PGDM)."
      },
      {
        id: 'ca2',
        question: "PGDM kiske dwara approve kiya jata hai?",
        options: ["AICTE", "UGC", "Ministry of Finance", "None"],
        correctAnswer: 0,
        explanation: "Post Graduate Diploma in Management (PGDM) is approved by the All India Council for Technical Education (AICTE)."
      },
      {
        id: 'ca3',
        question: "AIU equivalence certificate kyun zaruri hai?",
        options: [
          "PGDM ko MBA ke barabar dikhane ke liye",
          "Education loan clear karne ke liye",
          "Sports quota allocation ke liye",
          "None"
        ],
        correctAnswer: 0,
        explanation: "An AIU equivalence certificate clarifies that a PGDM program from a particular institute is equivalent to an MBA degree for jobs and higher studies."
      },
      {
        id: 'ca4',
        question: "NAAC accreditation ka main kaam kya hai?",
        options: ["Quality evaluation", "Fee collection", "Placement sourcing", "None"],
        correctAnswer: 0,
        explanation: "NAAC's primary focus is the quality assessment and grading of universities and higher education institutions."
      },
      {
        id: 'ca5',
        question: "NAAC mein sabse best grade kaunsi hoti hai?",
        options: ["A++", "A", "B", "C"],
        correctAnswer: 0,
        explanation: "A++ is the highest grade awarded by NAAC, representing institutional excellence."
      },
      {
        id: 'ca6',
        question: "NBA ka kaam kis par focus karta hai?",
        options: [
          "Program-specific quality (like MBA/B.Tech)",
          "Campus infrastructure & roads",
          "Library volume only",
          "None"
        ],
        correctAnswer: 0,
        explanation: "While NAAC evaluates the whole university, NBA evaluates specific technical or professional programs."
      },
      {
        id: 'ca7',
        question: "AACSB ek kaisi accreditation hai?",
        options: ["Global Elite Business Accreditation", "Local state board", "National level ranking", "None"],
        correctAnswer: 0,
        explanation: "AACSB is widely recognized as the gold standard of global business school accreditations."
      },
      {
        id: 'ca8',
        question: "MBA ke liye kaunsi regulatory body primary hoti hai?",
        options: ["UGC", "AICTE", "RBI", "None"],
        correctAnswer: 0,
        explanation: "Since MBA is a postgraduate degree, the university offering it must be regulated by the University Grants Commission (UGC)."
      },
      {
        id: 'ca9',
        question: "NIRF ranking kaun jari karta hai?",
        options: ["Ministry of Education (Govt)", "Private assessment agency", "Student unions", "None"],
        correctAnswer: 0,
        explanation: "The National Institutional Ranking Framework (NIRF) is officially managed and published annually by the Ministry of Education, Govt of India."
      },
      {
        id: 'ca10',
        question: "MBA aur PGDM mein kya main technical antar hai?",
        options: ["Degree vs Diploma", "MBA better is automatically", "PGDM is a degree", "None"],
        correctAnswer: 0,
        explanation: "The primary technical difference is that MBA is a degree awarded by universities, whereas PGDM is a diploma awarded by autonomous institutes."
      },
      {
        id: 'ca11',
        question: "Kya standalone institute (jo university nahi hai) MBA award kar sakta hai?",
        options: ["Nahi, sirf PGDM kar sakta hai", "Haan, university approval ke bina", "Kuch keh nahi sakte", "None"],
        correctAnswer: 0,
        explanation: "Only UGC-recognized universities can issue degrees. Standalone institutes can only award PGDM diplomas."
      },
      {
        id: 'ca12',
        question: "AICTE ka approval kis type ke institutions ke liye mandatory hai?",
        options: [
          "Technical & Management institutions",
          "Medical colleges",
          "Primary and secondary schools",
          "None of the above"
        ],
        correctAnswer: 0,
        explanation: "AICTE approval is legally required for technical courses, engineering colleges, and autonomous PGDM management programs."
      },
      {
        id: 'ca13',
        question: "AMBA accreditation kiske liye hoti hai?",
        options: ["MBA programs ke liye", "Secondary school education", "Engineering college departments", "None"],
        correctAnswer: 0,
        explanation: "AMBA (Association of MBAs) specifically accredits MBA, DBA, and Master in Business and Management (MBM) programs."
      },
      {
        id: 'ca14',
        question: "EQUIS accreditation kis region ya standard se jude hai?",
        options: ["European international standard", "Local state board", "Only school level", "None"],
        correctAnswer: 0,
        explanation: "EQUIS is a premier European-run international accreditation standard for business education, managed by EFMD."
      },
      {
        id: 'ca15',
        question: "Agar koi college AICTE approved hai lekin UGC affiliated nahi hai, toh wo kya offer karega?",
        options: ["PGDM", "MBA Degree", "B.Tech", "MBBS"],
        correctAnswer: 0,
        explanation: "Since it has AICTE approval but is not a university (UGC), it can only run autonomous PGDM diploma courses."
      },
      {
        id: 'ca16',
        question: "NAAC grade kitne saal ke liye valid hoti hai?",
        options: ["5 years", "1 year", "10 years", "Lifetime"],
        correctAnswer: 0,
        explanation: "A standard NAAC institutional accreditation cycle and grade remain valid for a period of 5 years."
      },
      {
        id: 'ca17',
        question: "NIRF ranking mein India ke top B-schools ko kis category mein rakha jata hai?",
        options: ["Management Category", "Engineering Category", "Medical Category", "Law Category"],
        correctAnswer: 0,
        explanation: "Business schools are evaluated and ranked under the 'Management' category in NIRF."
      },
      {
        id: 'ca18',
        question: "Kya PGDM ke baad student PhD ke liye eligible hota hai?",
        options: ["Haan, agar AIU equivalence ho", "Nahi, bilkul nahi", "Sirf foreign universities mein", "None"],
        correctAnswer: 0,
        explanation: "A student with a PGDM is eligible to pursue a PhD/Fellowship if their program has been granted equivalence to an MBA by the AIU."
      },
      {
        id: 'ca19',
        question: "ACBSP accreditation ka main focus kis par hota hai?",
        options: [
          "Teaching excellence and business program accreditation",
          "Sports achievements",
          "Hostel and mess quality",
          "None"
        ],
        correctAnswer: 0,
        explanation: "ACBSP measures business school performance based on teaching excellence and student learning outcomes."
      },
      {
        id: 'ca20',
        question: "Distance MBA ya PGDM ke liye kaun sa bureau approval deta hai?",
        options: ["DEB (Distance Education Bureau under UGC)", "RBI", "SEBI", "None"],
        correctAnswer: 0,
        explanation: "Any distance or online MBA/PGDM program in India must be approved by the Distance Education Bureau (DEB) of UGC."
      },
      {
        id: 'ca21',
        question: "Kya technical management institutes ke liye AICTE approval ke sath NAAC ya NBA hona zaroori hai?",
        options: [
          "Quality enhancement ke liye highly recommended",
          "Bilkul zaruri nahi",
          "Kanooni bandhan hai",
          "None"
        ],
        correctAnswer: 0,
        explanation: "While AICTE regulates operation, accreditation like NAAC/NBA is highly recommended to validate academic benchmarks."
      },
      {
        id: 'ca22',
        question: "India mein highest governing body higher education ke liye kaunsi hai?",
        options: ["Ministry of Education / UGC", "Supreme Court", "Police", "None"],
        correctAnswer: 0,
        explanation: "The Ministry of Education and the University Grants Commission (UGC) represent the peak authorities for higher education in India."
      },
      {
        id: 'ca23',
        question: "Agar kisi institute ke paas AACSB, AMBA aur EQUIS teeno ho, toh use kya kehte hain?",
        options: ["Triple Crown Accreditation", "Single crown", "No crown", "None"],
        correctAnswer: 0,
        explanation: "Only a small elite fraction of business schools worldwide hold the 'Triple Crown' of AACSB, AMBA, and EQUIS accreditations."
      },
      {
        id: 'ca24',
        question: "PGDM ka full form kya hai?",
        options: [
          "Post Graduate Diploma in Management",
          "Post Graduate Degree in Management",
          "Professional Graduate Diploma Management",
          "None"
        ],
        correctAnswer: 0,
        explanation: "PGDM stands for Post Graduate Diploma in Management."
      },
      {
        id: 'ca25',
        question: "MBA ka full form kya hai?",
        options: [
          "Master of Business Administration",
          "Master of Business Automation",
          "Management Business Analyst",
          "None"
        ],
        correctAnswer: 0,
        explanation: "MBA stands for Master of Business Administration."
      },
      {
        id: 'ca26',
        question: "AICTE kis saal mein statutory body bani thi?",
        options: ["1987", "1950", "2000", "2010"],
        correctAnswer: 0,
        explanation: "AICTE was established as an advisory body in 1945 but was given statutory status by an Act of Parliament in 1987."
      },
      {
        id: 'ca27',
        question: "UGC ki sthapna kis saal mein hui thi?",
        options: ["1956", "1947", "1975", "1990"],
        correctAnswer: 0,
        explanation: "The UGC was formally inaugurated in 1953 and became a statutory body of the Government of India in 1956."
      },
      {
        id: 'ca28',
        question: "NAAC ka headquarter kahan sthit hai?",
        options: ["Bangalore", "New Delhi", "Mumbai", "Chennai"],
        correctAnswer: 0,
        explanation: "The National Assessment and Accreditation Council (NAAC) is headquartered in Bangalore."
      },
      {
        id: 'ca29',
        question: "AIU ka headquarter kahan hai?",
        options: ["New Delhi", "Kolkata", "Pune", "Hyderabad"],
        correctAnswer: 0,
        explanation: "The Association of Indian Universities (AIU) is located in New Delhi."
      },
      {
        id: 'ca30',
        question: "Kya corporate sector mein MBA aur PGDM dono ko barabar value milti hai?",
        options: [
          "Haan, skills aur college brand matter karta hai",
          "Nahi",
          "Sirf MBA ko milti hai",
          "None"
        ],
        correctAnswer: 0,
        explanation: "Yes, recruiters treat both programs equally; the ranking, legacy of the business school, and candidate skills determine final packages."
      }
    ]
  }
];

const EXAM_DURATION_SECONDS = 25 * 60; // 25 minutes for 50 questions

type ExamStatus = 'idle' | 'registering' | 'running' | 'terminated' | 'submitted';

export function ApprovalsExamClient() {
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
  const allQuestions = APPROVALS_EXAM_SECTIONS.flatMap(sec => sec.questions);
  const totalQuestionsCount = allQuestions.length;

  const activeSection = APPROVALS_EXAM_SECTIONS[activeSectionIdx];
  const activeQuestion = activeSection.questions[activeQuestionIdx];

  // Tab reload prevention check
  useEffect(() => {
    const savedSession = localStorage.getItem('approvals_exam_session');
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        if (parsed.status === 'running') {
          setStatus('terminated');
          setViolationReason("Page reload, refresh, or tab closure detected. As per the anti-cheating policy, the exam has been ended.");
          setViolationCount(2);
          localStorage.setItem('approvals_exam_session', JSON.stringify({
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
              examName: 'Approvals & Accreditations Exam',
              score: 0,
              maxScore: 150,
              percentage: '0.0',
              correctAnswers: 0,
              totalQuestions: 50,
              status: 'terminated',
              reason: 'Page reload, refresh, or tab closure detected'
            })
          }).catch(console.error);
        }
      } catch (e) {
        console.error("Error reading approvals session", e);
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
      
      const savedSession = localStorage.getItem('approvals_exam_session');
      let currentName = name;
      let currentEmail = email;
      let currentPhone = phone;
      if (savedSession) {
        try {
          const parsed = JSON.parse(savedSession);
          currentName = parsed.name || name;
          currentEmail = parsed.email || email;
          currentPhone = parsed.phone || phone;
          localStorage.setItem('approvals_exam_session', JSON.stringify({
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
          examName: 'Approvals & Accreditations Exam',
          score: 0,
          maxScore: 150,
          percentage: '0.0',
          correctAnswers: 0,
          totalQuestions: 50,
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
    APPROVALS_EXAM_SECTIONS.forEach(sec => {
      sec.questions.forEach((q) => {
        initialStatus[q.id] = 'unvisited';
      });
    });
    setStatusMap(initialStatus);

    localStorage.setItem('approvals_exam_session', JSON.stringify({
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
    } else if (activeSectionIdx < APPROVALS_EXAM_SECTIONS.length - 1) {
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
      setActiveQuestionIdx(APPROVALS_EXAM_SECTIONS[prevSecIdx].questions.length - 1);
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
    if (confirm("Are you sure you want to submit your Approvals & Accreditations Counselor Assessment?")) {
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
          examName: 'Approvals & Accreditations Exam',
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
    localStorage.setItem('approvals_exam_session', JSON.stringify({
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
    localStorage.removeItem('approvals_exam_session');
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

    APPROVALS_EXAM_SECTIONS.forEach(sec => {
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
            Approvals &amp; Accreditations Exam
          </h2>
          <p className="text-lg font-bold text-slate-700 leading-relaxed mb-8">
            Welcome to the Approvals &amp; Accreditations Master Training Quiz. This test consists of 50 questions testing your familiarity with national regulatory bodies (UGC, AICTE, DEC, DEB, AIU), grading structures (NAAC, NBA), international standards (AACSB, EQUIS, AMBA, ACBSP), and corporate MBA values.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#ccff00]/10 border-4 border-black p-6 rounded-2xl">
              <h3 className="text-lg font-black uppercase tracking-wider mb-3 flex items-center gap-2">
                <Timer className="w-5 h-5 text-black" /> Test Parameters
              </h3>
              <ul className="space-y-2 text-sm font-bold text-slate-700">
                <li>• Total Duration: <span className="text-black">25 Minutes</span></li>
                <li>• Total Questions: <span className="text-black">50 Questions</span></li>
                <li>• Marks: <span className="text-black">+3 Marks</span> for Correct, <span className="text-black">0 Marks</span> for Wrong</li>
                <li>• Sections: <span className="text-black">2 Comprehensive Sections</span></li>
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
          <p className="text-sm font-bold text-slate-500 mb-8 uppercase tracking-wide">Enter valid details to begin the Approvals &amp; Accreditations counselor validation assessment.</p>

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
                  {APPROVALS_EXAM_SECTIONS.map((sec, idx) => (
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
                {APPROVALS_EXAM_SECTIONS.map(sec => {
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
                {APPROVALS_EXAM_SECTIONS.flatMap((sec) => sec.questions).map((q, idx) => {
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

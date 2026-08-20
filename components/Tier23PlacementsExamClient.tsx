"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, Timer, ChevronRight, CheckCircle2, AlertTriangle, 
  HelpCircle, ChevronLeft, Send, Award, RefreshCw, User, Mail, Phone, Lock
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

const TIER_23_EXAM_SECTIONS: Section[] = [
  {
    id: 'salaries',
    name: 'Section 1: Salary Ranges & Packages',
    questions: [
      {
        id: 's1',
        question: "Tier 2-3 MBA/PGDM colleges mein General Management / Marketing roles ke liye average starting salary range aamtaur par kya hoti hai?",
        options: ["₹2 LPA se ₹4 LPA", "₹6 LPA se ₹14 LPA", "₹25 LPA se ₹35 LPA", "₹50 LPA+"],
        correctAnswer: 1,
        explanation: "Tier 2-3 management institutes generally see average starting placements in the range of ₹6 LPA to ₹14 LPA for general management and marketing roles."
      },
      {
        id: 's2',
        question: "Tier 2 B-Schools (jaise IMI, IMT, TAPMI, XIMB ke lower ranges ya acche private colleges) mein overall average placement package ka general range kya hota hai?",
        options: ["₹1 LPA se ₹2 LPA", "₹3 LPA se ₹5 LPA", "₹10 LPA se ₹18 LPA", "₹30 LPA se ₹40 LPA"],
        correctAnswer: 2,
        explanation: "Good Tier 2 B-Schools typically range from ₹10 LPA to ₹18 LPA in terms of overall average package."
      },
      {
        id: 's3',
        question: "Tier 3 colleges ya regional private B-Schools mein students ka typical entry-level average package kitna hota hai?",
        options: ["₹4 LPA se ₹8 LPA", "₹20 LPA se ₹25 LPA", "₹35 LPA se ₹45 LPA", "₹50 LPA+"],
        correctAnswer: 0,
        explanation: "Typical regional private B-Schools (Tier 3) offer entry-level salaries in the range of ₹4 LPA to ₹8 LPA."
      },
      {
        id: 's4',
        question: "Digital Marketing aur Performance Marketing roles ke liye Tier 2-3 colleges mein freshers ko kya package milne ki ummeed hoti hai?",
        options: ["₹25 LPA se ₹35 LPA", "₹5 LPA se ₹10 LPA", "₹40 LPA se ₹50 LPA", "₹1 LPA se ₹3 LPA"],
        correctAnswer: 1,
        explanation: "Fresh graduates starting in digital or performance marketing from Tier 2-3 campuses usually fetch ₹5 LPA to ₹10 LPA."
      },
      {
        id: 's5',
        question: "Banking sector mein Sales aur CASA (Current Account Saving Account) roles ke liye Tier 3 colleges mein offer hone wala starting package aamtaur par kiske beech hota hai?",
        options: ["₹3.5 LPA se ₹6 LPA", "₹15 LPA se ₹20 LPA", "₹25 LPA se ₹30 LPA", "₹40 LPA+"],
        correctAnswer: 0,
        explanation: "Banking CASA and retail sales entry packages at Tier 3 campuses range from ₹3.5 LPA to ₹6 LPA."
      },
      {
        id: 's6',
        question: "Tier 2 B-Schools mein Market Research aur Data Analytics roles ke liye starting salary range kya hoti hai?",
        options: ["₹2 LPA se ₹3 LPA", "₹30 LPA se ₹35 LPA", "₹7 LPA se ₹12 LPA", "₹45 LPA+"],
        correctAnswer: 2,
        explanation: "Analytics and market research roles starting at Tier 2 colleges typically command around ₹7 LPA to ₹12 LPA."
      },
      {
        id: 's7',
        question: "Tier 2-3 colleges mein Finance graduates ke liye Corporate Finance ya Financial Reporting roles mein average salary kya hoti hai?",
        options: ["₹20 LPA se ₹25 LPA", "₹6 LPA se ₹11 LPA", "₹35 LPA se ₹40 LPA", "₹1 LPA se ₹3 LPA"],
        correctAnswer: 1,
        explanation: "Corporate Finance positions at Tier 2-3 institutes offer starting packages in the bracket of ₹6 LPA to ₹11 LPA."
      },
      {
        id: 's8',
        question: "Tier 2 B-Schools mein IT/ITES companies dwara offer kiye jane wale Project Manager ya Associate Manager roles ka package kya hota hai?",
        options: ["₹8 LPA se ₹14 LPA", "₹2 LPA se ₹4 LPA", "₹25 LPA se ₹30 LPA", "₹40 LPA+"],
        correctAnswer: 0,
        explanation: "Management graduates entering IT/ITES as Project/Associate managers receive packages between ₹8 LPA to ₹14 LPA."
      },
      {
        id: 's9',
        question: "Retail Management roles ki Tier 2-3 colleges mein average starting salary kya hoti hai?",
        options: ["₹18 LPA se ₹25 LPA", "₹30 LPA se ₹35 LPA", "₹5 LPA se ₹9 LPA", "₹1 LPA se ₹3 LPA"],
        correctAnswer: 2,
        explanation: "Retail Management positions (Store operations, merchandising trainees) typically start at ₹5 LPA to ₹9 LPA."
      },
      {
        id: 's10',
        question: "EdTech sales roles mein Tier 2-3 colleges ke freshers ko kitna package aamtaur par offer hota hai?",
        options: ["₹20 LPA fixed", "₹4 LPA se ₹8 LPA (with high variable component)", "₹35 LPA", "₹1 LPA"],
        correctAnswer: 1,
        explanation: "EdTech companies typically offer starting packages of ₹4 LPA to ₹8 LPA, which often include a substantial variable/incentive target component."
      },
      {
        id: 's11',
        question: "Tier 2-3 colleges mein Banking Operations roles ke liye starting salary range kya hoti hai?",
        options: ["₹4 LPA se ₹7 LPA", "₹15 LPA se ₹18 LPA", "₹25 LPA se ₹30 LPA", "₹40 LPA+"],
        correctAnswer: 0,
        explanation: "Operations back-office and processing roles in banking sectors generally yield ₹4 LPA to ₹7 LPA."
      },
      {
        id: 's12',
        question: "Tier 2-3 MBA graduates ke liye 3 se 5 saal ke experience ke baad mid-level management mein average salary kahan tak pahunch sakti hai?",
        options: ["₹5 LPA se ₹8 LPA", "₹12 LPA se ₹20 LPA", "₹40 LPA se ₹50 LPA", "₹100 LPA+"],
        correctAnswer: 1,
        explanation: "With 3-5 years of post-MBA experience, steady performers reach mid-level packages of ₹12 LPA to ₹20 LPA."
      },
      {
        id: 's13',
        question: "Kya Tier 2-3 colleges ke students apni mehnat aur skills ke dam par off-campus drives ke zariye top corporate roles paa sakte hain?",
        options: ["Nahi, kabhi nahi", "Haan, certifications aur strong project portfolio ke sath bilkul sambhav hai", "Sirf government exam se", "None"],
        correctAnswer: 1,
        explanation: "Off-campus placement success is highly achievable for driven candidates who possess relevant certifications, solid internship histories, and outstanding project portfolios."
      }
    ]
  },
  {
    id: 'roles',
    name: 'Section 2: Industry Roles & Designations',
    questions: [
      {
        id: 'r1',
        question: "Tier 2-3 B-Schools mein students ke liye kaunsa designation sabse common hota hai jab wo Banking, Financial Services, and Insurance (BFSI) sector mein join karte hain?",
        options: ["Business Development Manager / Relationship Manager / Credit Analyst", "Chief Executive Officer (CEO)", "Managing Director (MD)", "Chief Technology Officer (CTO)"],
        correctAnswer: 0,
        explanation: "The most common starting roles in BFSI sector for Tier 2-3 grads are BDM, RM, or Credit Analyst."
      },
      {
        id: 'r2',
        question: "Tier 2 aur Tier 3 colleges mein FMCG/FMCD companies aamtaur par kis role ke liye hiring karti hain?",
        options: ["Software Developer", "Area Sales Manager (ASM) / Management Trainee - Sales", "Core R&D Scientist", "Plant Head"],
        correctAnswer: 1,
        explanation: "FMCG/FMCD corporate entries are usually through ASM trainee pipelines or direct sales management paths."
      },
      {
        id: 'r3',
        question: "IT / ITES aur Technology Consulting companies Tier 2-3 colleges mein MBA graduates ko kis role ke liye recruit karti hain?",
        options: ["Lead Enterprise Architect", "Principal Data Scientist", "Business Analyst / Associate Consultant / IT Project Coordinator", "Cloud Infrastructure Director"],
        correctAnswer: 2,
        explanation: "Consulting and tech firms hire MBA freshers primarily as Business Analysts or IT coordinators."
      },
      {
        id: 'r4',
        question: "Tier 2-3 colleges mein Human Resources (HR) specialization wale students ke liye sabse common entry-level designation kya hota hai?",
        options: ["HR Executive / Talent Acquisition Specialist / HR Generalist", "VP of Human Resources", "Chief People Officer", "Global Head of HR"],
        correctAnswer: 0,
        explanation: "HR candidates start as Recruiters, HR Executives, or Generalists before climbing to business partner roles."
      },
      {
        id: 'r5',
        question: "E-commerce aur Logistics sector (jaise Amazon, Flipkart ke operations/logistics arms) Tier 2-3 MBA grads ko kis role par hire karte hain?",
        options: ["Chief Operating Officer", "Supply Chain Director", "Operations Manager / Fulfillment Center Lead / Category Executive", "Global Logistics Head"],
        correctAnswer: 2,
        explanation: "Graduates are typically onboarded as Operations Managers, Warehouse/Fulfillment leads, or Category Executives."
      },
      {
        id: 'r6',
        question: "Tier 2-3 colleges mein Supply Chain Management (SCM) ke graduates ko kaunsi top companies recruit karti hain?",
        options: ["Google, Apple, Microsoft", "Delhivery, Blue Dart, Ecom Express, & manufacturing firms", "Goldman Sachs, Morgan Stanley", "McKinsey, BCG"],
        correctAnswer: 1,
        explanation: "Logistics companies like Delhivery, Blue Dart, Ecom Express, and various manufacturing plants are primary recruiters for SCM graduates."
      },
      {
        id: 'r7',
        question: "Market Research ya Business Analytics role ke liye Tier 2-3 college graduate ka designation kya ho sakta hai?",
        options: ["Chief Data Officer", "Head of Analytics", "Director of Business Intelligence", "Data Analyst / Market Research Analyst / Insights Associate"],
        correctAnswer: 3,
        explanation: "Entry level roles are designated as Data Analysts, Insights Associates, or Market Analysts."
      },
      {
        id: 'r8',
        question: "Tier 2-3 B-Schools mein Fintech aur Startups kis designation par MBA grads ko hire karti hain?",
        options: ["Product Operations Associate / Growth Manager / Operations Lead", "CTO", "Chief Financial Officer", "Founder"],
        correctAnswer: 0,
        explanation: "Fintechs and fast-growing startups leverage MBA talent for agile Growth Manager, Product Ops, or Ops Lead profiles."
      },
      {
        id: 'r9',
        question: "Tier 2-3 colleges mein Insurance sector (jaise HDFC Ergo, ICICI Lombard) mein MBA graduates ko kis role ke liye rakha jata hai?",
        options: ["Chief Actuary", "Branch Manager / Underwriter / Corporate Agency Manager", "Board Director", "Risk Chairman"],
        correctAnswer: 1,
        explanation: "Standard insurance recruitment tracks offer roles like Agency Managers, Branch Managers, or Trainee Underwriters."
      },
      {
        id: 'r10',
        question: "Tier 2-3 colleges mein Retail Management (jaise Reliance Retail, Trent, Shoppers Stop) kis role ke liye hiring karti hai?",
        options: ["Store Manager / Category Manager Trainee / Retail Operations Lead", "CEO of Retail", "Supply Chain VP", "Brand Ambassador"],
        correctAnswer: 0,
        explanation: "Top retail houses onboard students as Category Trainees, Retail Leads, or Store Managers."
      },
      {
        id: 'r11',
        question: "Tier 2-3 colleges mein Real Estate aur Infrastructure sector mein MBA grads ke liye kaunsa profile common hai?",
        options: ["Chief Civil Engineer", "Architect", "Business Development Executive / Project Sales Manager / Leasing Manager", "Urban Planner"],
        correctAnswer: 2,
        explanation: "Infrastructure companies recruit management candidates for sales, client leasing, or project coordination roles."
      },
      {
        id: 'r12',
        question: "Tier 2-3 colleges mein EdTech companies (jaise Byju's, UpGrad, etc. ke sales/business verticals) kis role ke liye zyada hire karti hain?",
        options: ["Business Development Associate (BDA) / Inside Sales Manager", "Chief Academic Officer", "Head of Curriculum", "Research Head"],
        correctAnswer: 0,
        explanation: "Sales functions are the primary consumer of MBA talent in the EdTech domain, recruiting BDAs and Inside Sales Managers."
      }
    ]
  },
  {
    id: 'dynamics',
    name: 'Section 3: Summer Internships & Placement Dynamics',
    questions: [
      {
        id: 'd1',
        question: "Tier 2-3 colleges mein Management Trainee (MT) positions ke liye select hone wale students ka career growth path kaisa hota hai?",
        options: ["Direct Board Member", "Structured promotion cycle after 1-2 years of performance", "No growth", "Immediate retirement"],
        correctAnswer: 1,
        explanation: "MT profiles are premium tracks, offering training rotation followed by structured promotion reviews in 12-24 months."
      },
      {
        id: 'd2',
        question: "Tier 3 colleges mein placement ke dauran sabse bada challenge kya dekha jata hai?",
        options: ["Core corporate roles ke bajaye mostly sales/business development roles milna", "Too many international offers", "100% remote work compulsion", "Excessive high pay"],
        correctAnswer: 0,
        explanation: "Tier 3 campuses face constraints where recruiters offer mostly frontline business development and sales profiles rather than niche corporate office roles."
      },
      {
        id: 'd3',
        question: "Tier 2 colleges mein Summer Internship Stipend ka average monthly range kya hota hai?",
        options: ["₹2,000 se ₹5,000 per month", "₹2 Lakh se ₹3 Lakh per month", "₹15,000 se ₹50,000 per month", "Zero stipend"],
        correctAnswer: 2,
        explanation: "Tier 2 campuses fetch monthly stipends ranging between ₹15,000 to ₹50,000."
      },
      {
        id: 'd4',
        question: "Tier 3 colleges mein summer internship ka kya scenario hota hai?",
        options: ["Zyadatar unpaid ya very low stipend (₹5,000 - ₹15,000)", "Fixed ₹1 Lakh per month", "Mandatory international travel", "None"],
        correctAnswer: 0,
        explanation: "Tier 3 summer projects are primarily unpaid or carry nominal travel stipends in the range of ₹5,000 to ₹15,000."
      },
      {
        id: 'd5',
        question: "Tier 2-3 B-Schools mein placement committee (Plancom) ya placement cell ka main role kya hota hai?",
        options: ["Exam paper check karna", "Companies ko invite karna, coordination karna aur interview process manage karna", "Fees collect karna", "Hostel manage karna"],
        correctAnswer: 1,
        explanation: "The Placement Cell/Committee is responsible for industry outreach, coordinating corporate presentations, and managing logistics for interview schedules."
      }
    ]
  }
];

const EXAM_DURATION_SECONDS = 15 * 60; // 15 minutes for 30 questions

type ExamStatus = 'idle' | 'registering' | 'running' | 'terminated' | 'submitted';

export function Tier23PlacementsExamClient() {
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
  const allQuestions = TIER_23_EXAM_SECTIONS.flatMap(sec => sec.questions);
  const totalQuestionsCount = allQuestions.length;

  const activeSection = TIER_23_EXAM_SECTIONS[activeSectionIdx];
  const activeQuestion = activeSection.questions[activeQuestionIdx];

  // Tab reload prevention check
  useEffect(() => {
    const savedSession = localStorage.getItem('tier23_placements_exam_session');
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        if (parsed.status === 'running') {
          setStatus('terminated');
          setViolationReason("Page reload, refresh, or tab closure detected. As per the anti-cheating policy, the exam has been ended.");
          setViolationCount(2);
          localStorage.setItem('tier23_placements_exam_session', JSON.stringify({
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
              examName: 'MBA Placements & Salaries Exam',
              score: 0,
              maxScore: 90,
              percentage: '0.0',
              correctAnswers: 0,
              totalQuestions: 30,
              status: 'terminated',
              reason: 'Page reload, refresh, or tab closure detected'
            })
          }).catch(console.error);
        }
      } catch (e) {
        console.error("Error reading placement session", e);
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
      
      const savedSession = localStorage.getItem('tier23_placements_exam_session');
      let currentName = name;
      let currentEmail = email;
      let currentPhone = phone;
      if (savedSession) {
        try {
          const parsed = JSON.parse(savedSession);
          currentName = parsed.name || name;
          currentEmail = parsed.email || email;
          currentPhone = parsed.phone || phone;
          localStorage.setItem('tier23_placements_exam_session', JSON.stringify({
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
          examName: 'MBA Placements & Salaries Exam',
          score: 0,
          maxScore: 90,
          percentage: '0.0',
          correctAnswers: 0,
          totalQuestions: 30,
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
      setPasscodeError('Incorrect passcode. Please contact your administrator.');
      return;
    }

    setStatus('running');
    setRemainingTime(EXAM_DURATION_SECONDS);
    setAnswers({});
    setViolationCount(0);
    setViolationReason('');

    const initialStatus: Record<string, 'answered' | 'marked' | 'unvisited'> = {};
    TIER_23_EXAM_SECTIONS.forEach(sec => {
      sec.questions.forEach((q) => {
        initialStatus[q.id] = 'unvisited';
      });
    });
    setStatusMap(initialStatus);

    localStorage.setItem('tier23_placements_exam_session', JSON.stringify({
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
    } else if (activeSectionIdx < TIER_23_EXAM_SECTIONS.length - 1) {
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
      setActiveQuestionIdx(TIER_23_EXAM_SECTIONS[prevSecIdx].questions.length - 1);
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
    if (confirm("Are you sure you want to submit your Tier 2-3 Placements & Salaries Assessment?")) {
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
          examName: 'MBA Placements & Salaries Exam',
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
    localStorage.setItem('tier23_placements_exam_session', JSON.stringify({
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
    localStorage.removeItem('tier23_placements_exam_session');
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

    TIER_23_EXAM_SECTIONS.forEach(sec => {
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
            MBA/PGDM Tier 2-3 Placements, Designations & Salaries Master Quiz
          </h2>
          <p className="text-lg font-bold text-slate-700 leading-relaxed mb-8">
            Verify your understanding of recruitment matrices, average package metrics, summer internship guidelines, and target industry placements. This test contains 30 key assessment questions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#ccff00]/10 border-4 border-black p-6 rounded-2xl">
              <h3 className="text-lg font-black uppercase tracking-wider mb-3 flex items-center gap-2">
                <Timer className="w-5 h-5 text-black" /> Test Parameters
              </h3>
              <ul className="space-y-2 text-sm font-bold text-slate-700">
                <li>• Total Duration: <span className="text-black">15 Minutes</span></li>
                <li>• Total Questions: <span className="text-black">30 Questions</span></li>
                <li>• Marks: <span className="text-black">+3 Marks</span> for Correct, <span className="text-black">0 Marks</span> for Wrong</li>
                <li>• Sections: <span className="text-black">3 Placements Verticals</span></li>
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
          <p className="text-sm font-bold text-slate-500 mb-8 uppercase tracking-wide">Enter valid details to begin the placements validation assessment.</p>

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
                type="password"
                required
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setPasscodeError('');
                }}
                placeholder="Enter exam passcode"
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
                  {TIER_23_EXAM_SECTIONS.map((sec, idx) => (
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
                {TIER_23_EXAM_SECTIONS.map(sec => {
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
                {TIER_23_EXAM_SECTIONS.flatMap((sec) => sec.questions).map((q, idx) => {
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

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

const PAN_INDIA_EXAM_SECTIONS: Section[] = [
  {
    id: 'north',
    name: 'Section 1: Delhi NCR & North Region',
    questions: [
      {
        id: 'n1',
        question: "MDI Gurgaon ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1981", "1984", "1988", "1992"],
        correctAnswer: 1,
        explanation: "Management Development Institute (MDI) Gurgaon was established in the year 1984."
      },
      {
        id: 'n2',
        question: "MDI Gurgaon ki current location (exact area/city) kya hai?",
        options: ["Gurugram, Delhi NCR", "Sector 62, Noida", "Dwarka, New Delhi", "Rohini, New Delhi"],
        correctAnswer: 0,
        explanation: "MDI Gurgaon is located in Gurugram, Delhi NCR."
      },
      {
        id: 'n3',
        question: "IMT Ghaziabad ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1977", "1980", "1984", "1988"],
        correctAnswer: 1,
        explanation: "Institute of Management Technology (IMT) Ghaziabad was established in 1980."
      },
      {
        id: 'n4',
        question: "IMT Ghaziabad ki current location (exact area/city) kya hai?",
        options: ["Ghaziabad, Delhi NCR", "Greater Noida, Delhi NCR", "Okhla, New Delhi", "Shalimar Bagh, New Delhi"],
        correctAnswer: 0,
        explanation: "IMT Ghaziabad is located in Ghaziabad, Delhi NCR."
      },
      {
        id: 'n5',
        question: "IMI New Delhi ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1978", "1981", "1985", "1989"],
        correctAnswer: 1,
        explanation: "International Management Institute (IMI) New Delhi was established in the year 1981."
      },
      {
        id: 'n6',
        question: "IMI New Delhi ki current location (exact area/city) kya hai?",
        options: ["Qutab Institutional Area, New Delhi", "Jasola Vihar, New Delhi", "Sector 125, Noida", "Sohna Road, Gurugram"],
        correctAnswer: 0,
        explanation: "IMI New Delhi is situated in the Qutab Institutional Area, New Delhi."
      },
      {
        id: 'n7',
        question: "BIMTECH ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1985", "1988", "1992", "1996"],
        correctAnswer: 1,
        explanation: "Birla Institute of Management Technology (BIMTECH) was established in the year 1988."
      },
      {
        id: 'n8',
        question: "BIMTECH ki current location (exact area/city) kya hai?",
        options: ["Greater Noida, Delhi NCR", "Ghaziabad, Delhi NCR", "Dwarka, New Delhi", "Faridabad, Delhi NCR"],
        correctAnswer: 0,
        explanation: "BIMTECH is located in Greater Noida, Delhi NCR."
      },
      {
        id: 'n9',
        question: "LBSIM ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1992", "1995", "1999", "2003"],
        correctAnswer: 1,
        explanation: "Lal Bahadur Shastri Institute of Management (LBSIM) was established in the year 1995."
      },
      {
        id: 'n10',
        question: "LBSIM ki current location (exact area/city) kya hai?",
        options: ["Dwarka Sector 11, New Delhi", "Qutab Institutional Area, New Delhi", "Sector 62, Noida", "Golf Course Road, Gurugram"],
        correctAnswer: 0,
        explanation: "LBSIM is situated in Dwarka Sector 11, New Delhi."
      },
      {
        id: 'n11',
        question: "FORE School of Management ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1978", "1981", "1985", "1989"],
        correctAnswer: 1,
        explanation: "Foundation for Organisational Research and Education (FORE) School of Management was established in 1981."
      },
      {
        id: 'n12',
        question: "FORE School of Management ki current location (exact area/city) kya hai?",
        options: ["Qutab Institutional Area, New Delhi", "Mayur Vihar, New Delhi", "Vasundhara, Ghaziabad", "Sector 45, Gurugram"],
        correctAnswer: 0,
        explanation: "FORE School of Management is located in the Qutab Institutional Area, New Delhi."
      },
      {
        id: 'n13',
        question: "NDIM ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1989", "1992", "1996", "2000"],
        correctAnswer: 1,
        explanation: "New Delhi Institute of Management (NDIM) was established in 1992."
      },
      {
        id: 'n14',
        question: "NDIM ki current location (exact area/city) kya hai?",
        options: ["Tughlakabad Institutional Area, New Delhi", "Dwarka Sector 9, New Delhi", "Knowledge Park III, Greater Noida", "DLF Phase 3, Gurugram"],
        correctAnswer: 0,
        explanation: "NDIM is located in the Tughlakabad Institutional Area, New Delhi."
      },
      {
        id: 'n15',
        question: "JIMS Rohini ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1990", "1993", "1997", "2001"],
        correctAnswer: 1,
        explanation: "Jagan Institute of Management Studies (JIMS) Rohini was established in 1993."
      },
      {
        id: 'n16',
        question: "JIMS Rohini ki current location (exact area/city) kya hai?",
        options: ["Rohini, Sector 5, New Delhi", "Rohini, Sector 22, New Delhi", "Dwarka Sector 12, New Delhi", "Kalkaji, New Delhi"],
        correctAnswer: 0,
        explanation: "JIMS Rohini is located in Sector 5, Rohini, New Delhi."
      },
      {
        id: 'n17',
        question: "IILM Lodhi Road ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1990", "1993", "1997", "2001"],
        correctAnswer: 1,
        explanation: "IILM Institute for Higher Education at Lodhi Road was established in 1993."
      },
      {
        id: 'n18',
        question: "IILM Lodhi Road ki current location (exact area/city) kya hai?",
        options: ["Lodhi Road, New Delhi", "Connaught Place, New Delhi", "Vasant Kunj, New Delhi", "Chanakyapuri, New Delhi"],
        correctAnswer: 0,
        explanation: "IILM Lodhi Road is located at Lodhi Road, New Delhi."
      },
      {
        id: 'n19',
        question: "Jaipuria Institute of Management ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["2001", "2004", "2008", "2012"],
        correctAnswer: 1,
        explanation: "Jaipuria Institute of Management Noida/Ghaziabad was established in 2004."
      },
      {
        id: 'n20',
        question: "Jaipuria Institute of Management ki current location (exact area/city) kya hai?",
        options: ["Indirapuram, Ghaziabad, Delhi NCR", "Sector 62, Noida", "Greater Noida, Delhi NCR", "Shalimar Bagh, New Delhi"],
        correctAnswer: 0,
        explanation: "Jaipuria Institute of Management Ghaziabad is located in Indirapuram, Ghaziabad, Delhi NCR."
      },
      {
        id: 'n21',
        question: "NDIM Delhi (New Delhi Institute of Management) ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1989", "1992", "1996", "2000"],
        correctAnswer: 1,
        explanation: "NDIM Delhi was established in the year 1992."
      },
      {
        id: 'n22',
        question: "NDIM Delhi (New Delhi Institute of Management) ki current location (exact area/city) kya hai?",
        options: ["Tughlakabad Institutional Area, New Delhi", "Lodhi Road, New Delhi", "Sector 62, Noida", "Sohna Road, Gurugram"],
        correctAnswer: 0,
        explanation: "NDIM Delhi is situated in Tughlakabad Institutional Area, New Delhi."
      },
      {
        id: 'n23',
        question: "GL Bajaj Institute of Management and Research ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["2004", "2007", "2011", "2015"],
        correctAnswer: 1,
        explanation: "GL Bajaj Institute of Management and Research was established in 2007."
      },
      {
        id: 'n24',
        question: "GL Bajaj Institute of Management and Research ki current location (exact area/city) kya hai?",
        options: ["Greater Noida, Delhi NCR", "Ghaziabad, Delhi NCR", "Dwarka, New Delhi", "Gurugram, Delhi NCR"],
        correctAnswer: 0,
        explanation: "GL Bajaj Institute of Management and Research is located in Greater Noida, Delhi NCR."
      },
      {
        id: 'n25',
        question: "Lloyd Business School ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["2001", "2004", "2008", "2012"],
        correctAnswer: 1,
        explanation: "Lloyd Business School was established in 2004."
      },
      {
        id: 'n26',
        question: "Lloyd Business School ki current location (exact area/city) kya hai?",
        options: ["Greater Noida, Delhi NCR", "Faridabad, Delhi NCR", "Sector 62, Noida", "Rohini, New Delhi"],
        correctAnswer: 0,
        explanation: "Lloyd Business School is situated in Greater Noida, Delhi NCR."
      },
      {
        id: 'n27',
        question: "ITS Ghaziabad ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1992", "1995", "1999", "2003"],
        correctAnswer: 1,
        explanation: "ITS Ghaziabad was established in 1995."
      },
      {
        id: 'n28',
        question: "ITS Ghaziabad ki current location (exact area/city) kya hai?",
        options: ["Mohan Nagar, Ghaziabad, Delhi NCR", "Vasundhara, Ghaziabad", "Sector 62, Noida", "Dwarka, New Delhi"],
        correctAnswer: 0,
        explanation: "ITS Ghaziabad is located at Mohan Nagar, Ghaziabad, Delhi NCR."
      },
      {
        id: 'n29',
        question: "Gitarattan International Business School ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["2001", "2004", "2008", "2012"],
        correctAnswer: 1,
        explanation: "Gitarattan International Business School was established in 2004."
      },
      {
        id: 'n30',
        question: "Gitarattan International Business School ki current location (exact area/city) kya hai?",
        options: ["Rohini, Sector 14, New Delhi", "Rohini, Sector 5, New Delhi", "Dwarka, New Delhi", "Okhla, New Delhi"],
        correctAnswer: 0,
        explanation: "Gitarattan International Business School is located in Rohini Sector 14, New Delhi."
      }
    ]
  },
  {
    id: 'west',
    name: 'Section 2: West Region (Mumbai & Pune)',
    questions: [
      {
        id: 'w1',
        question: "SPJIMR Mumbai ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1978", "1981", "1985", "1989"],
        correctAnswer: 1,
        explanation: "S. P. Jain Institute of Management and Research (SPJIMR) was established in the year 1981."
      },
      {
        id: 'w2',
        question: "SPJIMR Mumbai ki current location (exact area/city) kya hai?",
        options: ["Bhavan's Campus, Andheri West, Mumbai", "Bandra West, Mumbai", "Powai, Mumbai", "Nariman Point, Mumbai"],
        correctAnswer: 0,
        explanation: "SPJIMR is located inside the Bhavan's Campus in Andheri West, Mumbai."
      },
      {
        id: 'w3',
        question: "NMIMS School of Business Management ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1978", "1981", "1985", "1989"],
        correctAnswer: 1,
        explanation: "SVKM's NMIMS School of Business Management was established in 1981."
      },
      {
        id: 'w4',
        question: "NMIMS School of Business Management ki current location (exact area/city) kya hai?",
        options: ["Vile Parle West, Mumbai", "Juhu, Mumbai", "Goregaon East, Mumbai", "Colaba, Mumbai"],
        correctAnswer: 0,
        explanation: "NMIMS School of Business Management is located in Vile Parle West, Mumbai."
      },
      {
        id: 'w5',
        question: "K. J. Somaiya Institute of Management ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1988", "1991", "1995", "1999"],
        correctAnswer: 1,
        explanation: "K. J. Somaiya Institute of Management was established in 1991."
      },
      {
        id: 'w6',
        question: "K. J. Somaiya Institute of Management ki current location (exact area/city) kya hai?",
        options: ["Vidyavihar East, Mumbai", "Ghatkopar West, Mumbai", "Chembur, Mumbai", "Thane, Mumbai Region"],
        correctAnswer: 0,
        explanation: "K. J. Somaiya Institute of Management is situated in Vidyavihar East, Mumbai."
      },
      {
        id: 'w7',
        question: "Welingkar Institute of Management (WeSchool) ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1974", "1977", "1981", "1985"],
        correctAnswer: 1,
        explanation: "Welingkar Institute of Management Development & Research (WeSchool) was established in 1977."
      },
      {
        id: 'w8',
        question: "Welingkar Institute of Management (WeSchool) ki current location (exact area/city) kya hai?",
        options: ["Matunga West, Mumbai", "Dadar East, Mumbai", "Andheri East, Mumbai", "Worli, Mumbai"],
        correctAnswer: 0,
        explanation: "WeSchool is situated in Matunga West, Mumbai."
      },
      {
        id: 'w9',
        question: "SIES College of Management Studies ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1992", "1995", "1999", "2003"],
        correctAnswer: 1,
        explanation: "SIES College of Management Studies was established in 1995."
      },
      {
        id: 'w10',
        question: "SIES College of Management Studies ki current location (exact area/city) kya hai?",
        options: ["Nerul, Navi Mumbai", "Vashi, Navi Mumbai", "Belapur, Navi Mumbai", "Sion, Mumbai"],
        correctAnswer: 0,
        explanation: "SIES College of Management Studies is located in Nerul, Navi Mumbai."
      },
      {
        id: 'w11',
        question: "ITM Business School ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1988", "1991", "1995", "1999"],
        correctAnswer: 1,
        explanation: "ITM Business School Navi Mumbai was established in 1991."
      },
      {
        id: 'w12',
        question: "ITM Business School ki current location (exact area/city) kya hai?",
        options: ["Kharghar, Navi Mumbai", "Panvel, Navi Mumbai", "Thane West, Mumbai Region", "Bandra East, Mumbai"],
        correctAnswer: 0,
        explanation: "ITM Business School Navi Mumbai is located in Kharghar, Navi Mumbai."
      },
      {
        id: 'w13',
        question: "MET Institute of Management ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1986", "1989", "1993", "1997"],
        correctAnswer: 1,
        explanation: "MET Institute of Management was established in 1989."
      },
      {
        id: 'w14',
        question: "MET Institute of Management ki current location (exact area/city) kya hai?",
        options: ["Bandra West, Mumbai", "Khar West, Mumbai", "Mahim, Mumbai", "Kurla West, Mumbai"],
        correctAnswer: 0,
        explanation: "MET Institute of Management is located in Bandra West, Mumbai."
      },
      {
        id: 'w15',
        question: "N. L. Dalmia Institute of Management Studies ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1994", "1997", "2001", "2005"],
        correctAnswer: 1,
        explanation: "N. L. Dalmia Institute of Management Studies and Research was established in 1997."
      },
      {
        id: 'w16',
        question: "N. L. Dalmia Institute of Management Studies ki current location (exact area/city) kya hai?",
        options: ["Mira Road, Thane, Mumbai Region", "Borivali West, Mumbai", "Kalyan, Thane Region", "Mulund West, Mumbai"],
        correctAnswer: 0,
        explanation: "N. L. Dalmia Institute of Management Studies is situated at Mira Road, Thane in the Mumbai Region."
      },
      {
        id: 'w17',
        question: "SIBM Pune ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1975", "1978", "1982", "1986"],
        correctAnswer: 1,
        explanation: "Symbiosis Institute of Business Management (SIBM) Pune was established in 1978."
      },
      {
        id: 'w18',
        question: "SIBM Pune ki current location (exact area/city) kya hai?",
        options: ["Lavale, Hill Base, Pune", "Senapati Bapat Road, Pune", "Viman Nagar, Pune", "Hinjawadi, Pune"],
        correctAnswer: 0,
        explanation: "SIBM Pune's flagship campus is situated at the Lavale Hill Base in Pune."
      },
      {
        id: 'w19',
        question: "SCMHRD Pune ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1990", "1993", "1997", "2001"],
        correctAnswer: 1,
        explanation: "Symbiosis Centre for Management and Human Resource Development (SCMHRD) was established in 1993."
      },
      {
        id: 'w20',
        question: "SCMHRD Pune ki current location (exact area/city) kya hai?",
        options: ["Hinjawadi, Infotech Park, Pune", "Lavale, Pune", "Koregaon Park, Pune", "Kothrud, Pune"],
        correctAnswer: 0,
        explanation: "SCMHRD Pune is located in Hinjawadi, Infotech Park, Pune."
      },
      {
        id: 'w21',
        question: "Symbiosis Institute of International Business (SIIB) ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1989", "1992", "1996", "2000"],
        correctAnswer: 1,
        explanation: "SIIB Pune was established in 1992."
      },
      {
        id: 'w22',
        question: "Symbiosis Institute of International Business (SIIB) ki current location (exact area/city) kya hai?",
        options: ["Hinjawadi, Pune", "Viman Nagar, Pune", "Model Colony, Pune", "Lavale, Pune"],
        correctAnswer: 0,
        explanation: "SIIB Pune is situated in Hinjawadi, Pune."
      },
      {
        id: 'w23',
        question: "BIMM (Balaji Institute of Modern Management) ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1996", "1999", "2003", "2007"],
        correctAnswer: 1,
        explanation: "BIMM Pune was established in 1999."
      },
      {
        id: 'w24',
        question: "BIMM (Balaji Institute of Modern Management) ki current location (exact area/city) kya hai?",
        options: ["Tathawade, Pune", "Hinjawadi, Pune", "Kalyani Nagar, Pune", "Shivajinagar, Pune"],
        correctAnswer: 0,
        explanation: "BIMM Pune is situated at Tathawade, Pune."
      },
      {
        id: 'w25',
        question: "ISB&M Pune ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1997", "2000", "2004", "2008"],
        correctAnswer: 1,
        explanation: "International School of Business & Media (ISB&M) Pune was established in 2000."
      },
      {
        id: 'w26',
        question: "ISB&M Pune ki current location (exact area/city) kya hai?",
        options: ["Nande, Mulshi, Pune", "Tathawade, Pune", "Viman Nagar, Pune", "Hadapsar, Pune"],
        correctAnswer: 0,
        explanation: "ISB&M Pune is located in Nande, Mulshi, Pune."
      },
      {
        id: 'w27',
        question: "Indira School of Management Studies (ISMS) ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1991", "1994", "1998", "2002"],
        correctAnswer: 1,
        explanation: "Indira School of Management Studies (ISMS) was established in 1994."
      },
      {
        id: 'w28',
        question: "Indira School of Management Studies (ISMS) ki current location (exact area/city) kya hai?",
        options: ["Tathawade, Pune", "Wakad, Pune", "Hinjawadi, Pune", "Koregaon Park, Pune"],
        correctAnswer: 0,
        explanation: "ISMS is located in Tathawade, Pune."
      },
      {
        id: 'w29',
        question: "Ajeenkya DY Patil University - School of Management ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["2012", "2015", "2019", "2023"],
        correctAnswer: 1,
        explanation: "Ajeenkya DY Patil University's School of Management was established in 2015."
      },
      {
        id: 'w30',
        question: "Ajeenkya DY Patil University - School of Management ki current location (exact area/city) kya hai?",
        options: ["Charholi Budruk, Lohegaon, Pune", "Pimpri Chinchwad, Pune", "Hadapsar, Pune", "Wakad, Pune"],
        correctAnswer: 0,
        explanation: "The university is located in Charholi Budruk, Lohegaon, Pune."
      },
      {
        id: 'w31',
        question: "MIT-WPU School of Management ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["2013", "2016", "2020", "2024"],
        correctAnswer: 1,
        explanation: "MIT World Peace University (MIT-WPU) School of Management was established in 2016."
      },
      {
        id: 'w32',
        question: "MIT-WPU School of Management ki current location (exact area/city) kya hai?",
        options: ["Kothrud, Pune", "Kalyani Nagar, Pune", "Hinjawadi, Pune", "Aundh, Pune"],
        correctAnswer: 0,
        explanation: "MIT-WPU School of Management is located in Kothrud, Pune."
      },
      {
        id: 'w33',
        question: "Lexicon Management Institute of Leadership & Excellence ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["2006", "2009", "2013", "2017"],
        correctAnswer: 1,
        explanation: "Lexicon Management Institute of Leadership & Excellence was established in 2009."
      },
      {
        id: 'w34',
        question: "Lexicon Management Institute of Leadership & Excellence ki current location (exact area/city) kya hai?",
        options: ["Wagholi, Pune", "Kharadi, Pune", "Hadapsar, Pune", "Kothrud, Pune"],
        correctAnswer: 0,
        explanation: "Lexicon MILE is situated in Wagholi, Pune."
      },
      {
        id: 'w35',
        question: "Suryadatta Institute of Management ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1996", "1999", "2003", "2007"],
        correctAnswer: 1,
        explanation: "Suryadatta Institute of Management was established in 1999."
      },
      {
        id: 'w36',
        question: "Suryadatta Institute of Management ki current location (exact area/city) kya hai?",
        options: ["Bavdhan, Pune", "Sadashiv Peth, Pune", "Kothrud, Pune", "Wakad, Pune"],
        correctAnswer: 0,
        explanation: "Suryadatta Institute of Management is situated in Bavdhan, Pune."
      }
    ]
  },
  {
    id: 'south',
    name: 'Section 3: South Region (Bangalore)',
    questions: [
      {
        id: 's1',
        question: "JAGSoM (Jagdish Sheth School of Management) ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1992", "1995", "1999", "2003"],
        correctAnswer: 1,
        explanation: "Jagdish Sheth School of Management (JAGSoM) was established in 1995."
      },
      {
        id: 's2',
        question: "JAGSoM (Jagdish Sheth School of Management) ki current location (exact area/city) kya hai?",
        options: ["Electronic City Phase 1, Bangalore", "Whitefield, Bangalore", "Koramangala, Bangalore", "Indiranagar, Bangalore"],
        correctAnswer: 0,
        explanation: "JAGSoM is situated in Electronic City Phase 1, Bangalore."
      },
      {
        id: 's3',
        question: "Alliance School of Business ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["2007", "2010", "2014", "2018"],
        correctAnswer: 1,
        explanation: "Alliance School of Business was established in 2010."
      },
      {
        id: 's4',
        question: "Alliance School of Business ki current location (exact area/city) kya hai?",
        options: ["Anekal, Chikkahagade Cross, Bangalore", "Whitefield, Bangalore", "Kanakapura Road, Bangalore", "Hebbal, Bangalore"],
        correctAnswer: 0,
        explanation: "Alliance School of Business main campus is situated in Anekal, Bangalore."
      },
      {
        id: 's5',
        question: "CMS Business School, Jain University ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["2006", "2009", "2013", "2017"],
        correctAnswer: 1,
        explanation: "CMS Business School of Jain University was established in 2009."
      },
      {
        id: 's6',
        question: "CMS Business School, Jain University ki current location (exact area/city) kya hai?",
        options: ["Gandhi Nagar, Bangalore", "Jayanagar, Bangalore", "Kanakapura Road, Bangalore", "Whitefield, Bangalore"],
        correctAnswer: 0,
        explanation: "CMS Business School is located in Gandhi Nagar, Bangalore."
      },
      {
        id: 's7',
        question: "IFIM / JAGSoM ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1992", "1995", "1999", "2003"],
        correctAnswer: 1,
        explanation: "IFIM (now JAGSoM) was established in the year 1995."
      },
      {
        id: 's8',
        question: "IFIM / JAGSoM ki current location (exact area/city) kya hai?",
        options: ["Electronic City Phase 1, Bangalore", "Whitefield, Bangalore", "HSR Layout, Bangalore", "Koramangala, Bangalore"],
        correctAnswer: 0,
        explanation: "IFIM is situated in Electronic City Phase 1, Bangalore."
      },
      {
        id: 's9',
        question: "XIME Bangalore ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1988", "1991", "1995", "1999"],
        correctAnswer: 1,
        explanation: "Xavier Institute of Management and Entrepreneurship (XIME) Bangalore was established in 1991."
      },
      {
        id: 's10',
        question: "XIME Bangalore ki current location (exact area/city) kya hai?",
        options: ["Electronic City Phase 2, Bangalore", "Electronic City Phase 1, Bangalore", "Whitefield, Bangalore", "Yelahanka, Bangalore"],
        correctAnswer: 0,
        explanation: "XIME Bangalore is located in Electronic City Phase 2, Bangalore."
      },
      {
        id: 's11',
        question: "Acharya Bangalore B-School (ABBS) ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["2005", "2008", "2012", "2016"],
        correctAnswer: 1,
        explanation: "Acharya Bangalore B-School (ABBS) was established in 2008."
      },
      {
        id: 's12',
        question: "Acharya Bangalore B-School (ABBS) ki current location (exact area/city) kya hai?",
        options: ["Andrahalli, Soladevanahalli, Bangalore", "Yeshwanthpur, Bangalore", "Electronic City, Bangalore", "Hebbal, Bangalore"],
        correctAnswer: 0,
        explanation: "ABBS is located in Andrahalli, Soladevanahalli, Bangalore."
      },
      {
        id: 's13',
        question: "ISBR Bangalore ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1997", "2000", "2004", "2008"],
        correctAnswer: 1,
        explanation: "ISBR Bangalore was established in the year 2000."
      },
      {
        id: 's14',
        question: "ISBR Bangalore ki current location (exact area/city) kya hai?",
        options: ["Electronic City Phase 1, Bangalore", "Electronic City Phase 2, Bangalore", "Whitefield, Bangalore", "HSR Layout, Bangalore"],
        correctAnswer: 0,
        explanation: "ISBR Bangalore is located in Electronic City Phase 1, Bangalore."
      },
      {
        id: 's15',
        question: "Christ University - School of Business and Management ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1966", "1969", "1973", "1977"],
        correctAnswer: 1,
        explanation: "Christ College was founded in 1969, and its business program started then."
      },
      {
        id: 's16',
        question: "Christ University - School of Business and Management ki current location (exact area/city) kya hai?",
        options: ["Hosur Road, Bangalore", "Bannerghatta Road, Bangalore", "Kengeri, Bangalore", "Whitefield, Bangalore"],
        correctAnswer: 0,
        explanation: "The main campus of Christ University is located on Hosur Road, Bangalore."
      },
      {
        id: 's17',
        question: "PES University - Department of Management Studies ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1985", "1988", "1992", "1996"],
        correctAnswer: 1,
        explanation: "PES Institute of Technology was founded in 1988."
      },
      {
        id: 's18',
        question: "PES University - Department of Management Studies ki current location (exact area/city) kya hai?",
        options: ["Banashankari, Bangalore", "Electronic City, Bangalore", "Whitefield, Bangalore", "Hennur, Bangalore"],
        correctAnswer: 0,
        explanation: "PES University's primary campus is located in Banashankari, Bangalore."
      },
      {
        id: 's19',
        question: "St. Joseph's Institute of Management (SJIM) ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1965", "1968", "1972", "1976"],
        correctAnswer: 1,
        explanation: "St. Joseph's Institute of Management (SJIM) was established in 1968."
      },
      {
        id: 's20',
        question: "St. Joseph's Institute of Management (SJIM) ki current location (exact area/city) kya hai?",
        options: ["Vittal Mallya Road, Bangalore", "Richmond Road, Bangalore", "Brigade Road, Bangalore", "M G Road, Bangalore"],
        correctAnswer: 0,
        explanation: "SJIM is located at Vittal Mallya Road, Bangalore."
      },
      {
        id: 's21',
        question: "AIMS Institutes ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1991", "1994", "1998", "2002"],
        correctAnswer: 1,
        explanation: "AIMS Institutes Bangalore was established in 1994."
      },
      {
        id: 's22',
        question: "AIMS Institutes ki current location (exact area/city) kya hai?",
        options: ["Peenya, Bangalore", "Yeshwanthpur, Bangalore", "Malleshwaram, Bangalore", "Hebbal, Bangalore"],
        correctAnswer: 0,
        explanation: "AIMS Institutes is situated in Peenya, Bangalore."
      }
    ]
  },
  {
    id: 'other',
    name: 'Section 4: Other Regions (Jaipur, Dehradun & Punjab)',
    questions: [
      {
        id: 'o1',
        question: "Jaipuria Institute of Management Jaipur ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["2003", "2006", "2010", "2014"],
        correctAnswer: 1,
        explanation: "Jaipuria Institute of Management Jaipur was established in 2006."
      },
      {
        id: 'o2',
        question: "Jaipuria Institute of Management Jaipur ki current location (exact area/city) kya hai?",
        options: ["Chaksu, Jaipur", "Mansarovar, Jaipur", "Malviya Nagar, Jaipur", "C-Scheme, Jaipur"],
        correctAnswer: 0,
        explanation: "Jaipuria Jaipur is located in Chaksu, Jaipur."
      },
      {
        id: 'o3',
        question: "Taxila Business School ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["2000", "2003", "2007", "2011"],
        correctAnswer: 1,
        explanation: "Taxila Business School Jaipur was established in 2003."
      },
      {
        id: 'o4',
        question: "Taxila Business School ki current location (exact area/city) kya hai?",
        options: ["Mansarovar, Jaipur", "Chaksu, Jaipur", "Malviya Nagar, Jaipur", "Sitapura, Jaipur"],
        correctAnswer: 0,
        explanation: "Taxila Business School is located in Mansarovar, Jaipur."
      },
      {
        id: 'o5',
        question: "ISBM Jaipur ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["2004", "2007", "2011", "2015"],
        correctAnswer: 1,
        explanation: "ISBM Jaipur was established in 2007."
      },
      {
        id: 'o6',
        question: "ISBM Jaipur ki current location (exact area/city) kya hai?",
        options: ["Mansarovar, Jaipur", "Sanganer, Jaipur", "Chaksu, Jaipur", "C-Scheme, Jaipur"],
        correctAnswer: 0,
        explanation: "ISBM Jaipur is situated in Mansarovar, Jaipur."
      },
      {
        id: 'o7',
        question: "Poddar Management Training Institute ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1995", "1998", "2002", "2006"],
        correctAnswer: 1,
        explanation: "Poddar Management Training Institute was established in 1998."
      },
      {
        id: 'o8',
        question: "Poddar Management Training Institute ki current location (exact area/city) kya hai?",
        options: ["Sitapura, Jaipur", "Mansarovar, Jaipur", "Jhotwara, Jaipur", "Malviya Nagar, Jaipur"],
        correctAnswer: 0,
        explanation: "Poddar Management Training Institute is located in Sitapura, Jaipur."
      },
      {
        id: 'o9',
        question: "Apex University - School of Management ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["2015", "2018", "2022", "2026"],
        correctAnswer: 1,
        explanation: "Apex University was established in the year 2018."
      },
      {
        id: 'o10',
        question: "Apex University - School of Management ki current location (exact area/city) kya hai?",
        options: ["Mansarovar, Jaipur", "Chaksu, Jaipur", "Jhotwara, Jaipur", "Sodala, Jaipur"],
        correctAnswer: 0,
        explanation: "Apex University School of Management is located in Mansarovar, Jaipur."
      },
      {
        id: 'o11',
        question: "UPES School of Business ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["2000", "2003", "2007", "2011"],
        correctAnswer: 1,
        explanation: "UPES School of Business was established in 2003."
      },
      {
        id: 'o12',
        question: "UPES School of Business ki current location (exact area/city) kya hai?",
        options: ["Bidholi, Dehradun", "Kandoli, Dehradun", "Rajpur Road, Dehradun", "Mussoorie Road, Dehradun"],
        correctAnswer: 0,
        explanation: "UPES School of Business main campus is located in Bidholi, Dehradun."
      },
      {
        id: 'o13',
        question: "IMS Unison University - School of Management ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1993", "1996", "2000", "2004"],
        correctAnswer: 1,
        explanation: "IMS Unison University was established in 1996."
      },
      {
        id: 'o14',
        question: "IMS Unison University - School of Management ki current location (exact area/city) kya hai?",
        options: ["Makkawala Greens, Dehradun", "Rajpur Road, Dehradun", "Bidholi, Dehradun", "Selaqui, Dehradun"],
        correctAnswer: 0,
        explanation: "IMS Unison University is located at Makkawala Greens, Dehradun."
      },
      {
        id: 'o15',
        question: "DIT University - Faculty of Management ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1995", "1998", "2002", "2006"],
        correctAnswer: 1,
        explanation: "DIT University was established in 1998."
      },
      {
        id: 'o16',
        question: "DIT University - Faculty of Management ki current location (exact area/city) kya hai?",
        options: ["Mussoorie-Diversion Road, Dehradun", "Rajpur Road, Dehradun", "Selaqui, Dehradun", "Makkawala, Dehradun"],
        correctAnswer: 0,
        explanation: "DIT University is located on the Mussoorie-Diversion Road, Dehradun."
      },
      {
        id: 'o17',
        question: "Graphic Era Hill University - School of Business ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["2008", "2011", "2015", "2019"],
        correctAnswer: 1,
        explanation: "Graphic Era Hill University was established in 2011."
      },
      {
        id: 'o18',
        question: "Graphic Era Hill University - School of Business ki current location (exact area/city) kya hai?",
        options: ["Bell Road, Clement Town, Dehradun", "Rajpur Road, Dehradun", "Selaqui, Dehradun", "Sahastradhara Road, Dehradun"],
        correctAnswer: 0,
        explanation: "Graphic Era Hill University Dehradun campus is situated on Bell Road in Clement Town."
      },
      {
        id: 'o19',
        question: "Dev Bhoomi Uttarakhand University ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["2002", "2005", "2009", "2013"],
        correctAnswer: 1,
        explanation: "Dev Bhoomi Uttarakhand University was established in 2005."
      },
      {
        id: 'o20',
        question: "Dev Bhoomi Uttarakhand University ki current location (exact area/city) kya hai?",
        options: ["Manduwala, Dehradun", "Selaqui, Dehradun", "Rajpur Road, Dehradun", "Clement Town, Dehradun"],
        correctAnswer: 0,
        explanation: "Dev Bhoomi Uttarakhand University is situated in Manduwala, Dehradun."
      },
      {
        id: 'o21',
        question: "Chandigarh University (USB) ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["2009", "2012", "2016", "2020"],
        correctAnswer: 1,
        explanation: "Chandigarh University was established in 2012."
      },
      {
        id: 'o22',
        question: "Chandigarh University (USB) ki current location (exact area/city) kya hai?",
        options: ["Gharuan, Mohali, Chandigarh NCR", "Sector 14, Chandigarh", "Zirakpur, Punjab", "Rajpura, Punjab"],
        correctAnswer: 0,
        explanation: "Chandigarh University is situated in Gharuan, Mohali, Chandigarh NCR."
      },
      {
        id: 'o23',
        question: "Chitkara Business School ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["2005", "2008", "2012", "2016"],
        correctAnswer: 1,
        explanation: "Chitkara Business School was established in 2008."
      },
      {
        id: 'o24',
        question: "Chitkara Business School ki current location (exact area/city) kya hai?",
        options: ["Rajpura, Patiala-Chandigarh Highway", "Gharuan, Chandigarh NCR", "Zirakpur, Punjab", "Sector 34, Chandigarh"],
        correctAnswer: 0,
        explanation: "Chitkara Business School is located along the Patiala-Chandigarh Highway in Rajpura."
      },
      {
        id: 'o25',
        question: "University School of Open Learning / Panjab University ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1968", "1971", "1975", "1979"],
        correctAnswer: 1,
        explanation: "University School of Open Learning (USOL) at Panjab University was established in 1971."
      },
      {
        id: 'o26',
        question: "University School of Open Learning / Panjab University ki current location (exact area/city) kya hai?",
        options: ["Sector 14, Chandigarh", "Sector 35, Chandigarh", "Mohali, Punjab", "Panchkula, Haryana"],
        correctAnswer: 0,
        explanation: "Panjab University's main campus, housing USOL, is in Sector 14, Chandigarh."
      },
      {
        id: 'o27',
        question: "Ludhiana Group of Colleges / RIMT University ki sthapna (establishment) kis varsh (year) mein hui thi?",
        options: ["1995", "1998", "2002", "2006"],
        correctAnswer: 1,
        explanation: "RIMT University / Ludhiana Group of Colleges was established in 1998."
      },
      {
        id: 'o28',
        question: "Ludhiana Group of Colleges / RIMT University ki current location (exact area/city) kya hai?",
        options: ["Mandi Gobindgarh, Punjab (Chandigarh region)", "Ludhiana, Punjab", "Sector 14, Chandigarh", "Patiala, Punjab"],
        correctAnswer: 0,
        explanation: "RIMT University is located in Mandi Gobindgarh, Punjab (Chandigarh region)."
      }
    ]
  }
];

const EXAM_DURATION_SECONDS = 60 * 60; // 60 minutes for 116 questions

type ExamStatus = 'idle' | 'registering' | 'running' | 'terminated' | 'submitted';

export function PanIndiaBschoolsExamClient() {
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
  const allQuestions = PAN_INDIA_EXAM_SECTIONS.flatMap(sec => sec.questions);
  const totalQuestionsCount = allQuestions.length;

  const activeSection = PAN_INDIA_EXAM_SECTIONS[activeSectionIdx];
  const activeQuestion = activeSection.questions[activeQuestionIdx];

  // Tab reload prevention check
  useEffect(() => {
    const savedSession = localStorage.getItem('pan_india_exam_session');
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        if (parsed.status === 'running') {
          setStatus('terminated');
          setViolationReason("Page reload, refresh, or tab closure detected. As per the anti-cheating policy, the exam has been ended.");
          setViolationCount(2);
          localStorage.setItem('pan_india_exam_session', JSON.stringify({
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
              examName: 'Pan India B-School Exam',
              score: 0,
              maxScore: 348,
              percentage: '0.0',
              correctAnswers: 0,
              totalQuestions: 116,
              status: 'terminated',
              reason: 'Page reload, refresh, or tab closure detected'
            })
          }).catch(console.error);
        }
      } catch (e) {
        console.error("Error reading pan india session", e);
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
      
      const savedSession = localStorage.getItem('pan_india_exam_session');
      let currentName = name;
      let currentEmail = email;
      let currentPhone = phone;
      if (savedSession) {
        try {
          const parsed = JSON.parse(savedSession);
          currentName = parsed.name || name;
          currentEmail = parsed.email || email;
          currentPhone = parsed.phone || phone;
          localStorage.setItem('pan_india_exam_session', JSON.stringify({
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
          examName: 'Pan India B-School Exam',
          score: 0,
          maxScore: 348,
          percentage: '0.0',
          correctAnswers: 0,
          totalQuestions: 116,
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

    if (passcode !== '9999') {
      setPasscodeError('Incorrect passcode. Please contact your administrator.');
      return;
    }

    setStatus('running');
    setRemainingTime(EXAM_DURATION_SECONDS);
    setAnswers({});
    setViolationCount(0);
    setViolationReason('');

    const initialStatus: Record<string, 'answered' | 'marked' | 'unvisited'> = {};
    PAN_INDIA_EXAM_SECTIONS.forEach(sec => {
      sec.questions.forEach((q) => {
        initialStatus[q.id] = 'unvisited';
      });
    });
    setStatusMap(initialStatus);

    localStorage.setItem('pan_india_exam_session', JSON.stringify({
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
    } else if (activeSectionIdx < PAN_INDIA_EXAM_SECTIONS.length - 1) {
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
      setActiveQuestionIdx(PAN_INDIA_EXAM_SECTIONS[prevSecIdx].questions.length - 1);
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
    if (confirm("Are you sure you want to submit your Pan India B-School Counselor Assessment?")) {
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
          examName: 'Pan India B-School Exam',
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
    localStorage.setItem('pan_india_exam_session', JSON.stringify({
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
    localStorage.removeItem('pan_india_exam_session');
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

    PAN_INDIA_EXAM_SECTIONS.forEach(sec => {
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
            Pan-India B-Schools Master Training Quiz
          </h2>
          <p className="text-lg font-bold text-slate-700 leading-relaxed mb-8">
            Welcome to the Pan-India B-Schools Master Training Quiz. This test consists of 116 questions verifying establishment years and precise locations for top business schools across North, West, South, and other regions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#ccff00]/10 border-4 border-black p-6 rounded-2xl">
              <h3 className="text-lg font-black uppercase tracking-wider mb-3 flex items-center gap-2">
                <Timer className="w-5 h-5 text-black" /> Test Parameters
              </h3>
              <ul className="space-y-2 text-sm font-bold text-slate-700">
                <li>• Total Duration: <span className="text-black">60 Minutes</span></li>
                <li>• Total Questions: <span className="text-black">116 Questions</span></li>
                <li>• Marks: <span className="text-black">+3 Marks</span> for Correct, <span className="text-black">0 Marks</span> for Wrong</li>
                <li>• Sections: <span className="text-black">4 Regions of B-Schools</span></li>
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
          <p className="text-sm font-bold text-slate-500 mb-8 uppercase tracking-wide">Enter valid details to begin the Pan-India B-School counselor validation assessment.</p>

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
                  {PAN_INDIA_EXAM_SECTIONS.map((sec, idx) => (
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
                {PAN_INDIA_EXAM_SECTIONS.map(sec => {
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
                {PAN_INDIA_EXAM_SECTIONS.flatMap((sec) => sec.questions).map((q, idx) => {
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

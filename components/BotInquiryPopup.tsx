'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, CheckCircle2 } from 'lucide-react';

const BUDGET_OPTIONS = [
  'Under ₹1 Lakh',
  '₹1 Lakh - ₹1.5 Lakhs',
  '₹1.5 Lakhs - ₹2 Lakhs',
  'Above ₹2 Lakhs'
];

const COURSE_OPTIONS = [
  'Online MBA',
  'Online PGDM',
  'Online MCA',
  'Online BBA',
  'Online BCA',
  'Online B.Com',
  'Online M.Com',
  'Other'
];

type Message = {
  id: string;
  type: 'bot' | 'user';
  text: string;
  options?: string[];
  field?: string;
};

export function BotInquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      question: "Hi there! 👋 I'm the Online Shiksha assistant. What's your name?",
      field: 'name',
      type: 'text'
    },
    {
      question: (name: string) => `Nice to meet you, ${name}! Which course are you interested in comparing?`,
      field: 'course',
      type: 'select',
      options: COURSE_OPTIONS
    },
    {
      question: "Great choice! Could you share your WhatsApp number so we can send you the brochures & comparison PDFs?",
      field: 'number',
      type: 'tel'
    },
    {
      question: "And your email address for admission alerts?",
      field: 'email',
      type: 'email'
    },
    {
      question: "Where are you currently located?",
      field: 'location',
      type: 'text'
    },
    {
      question: "Where would you prefer to study? (Online or specific city)",
      field: 'preferredLocation',
      type: 'text'
    },
    {
      question: "Last question: What's your budget range for the complete course?",
      field: 'budget',
      type: 'select',
      options: BUDGET_OPTIONS
    }
  ];

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        const initialQuestion = steps[0].question;
        addBotMessage(typeof initialQuestion === 'function' ? initialQuestion('') : initialQuestion);
      }, 15000); // Show after 15 seconds
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addBotMessage = (text: string, options?: string[], field?: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        text,
        options,
        field
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleUserInput = async (value: string) => {
    if (!value.trim()) return;

    const currentStepData = steps[currentStep];
    const newFormData = { ...formData, [currentStepData.field]: value };
    setFormData(newFormData);

    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: value
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    const nextStep = currentStep + 1;
    if (nextStep < steps.length) {
      setCurrentStep(nextStep);
      const nextStepData = steps[nextStep];
      const question = typeof nextStepData.question === 'function' 
        ? nextStepData.question(newFormData.name || '') 
        : nextStepData.question;
      
      addBotMessage(question, nextStepData.options, nextStepData.field);
    } else {
      submitLeads(newFormData);
    }
  };

  const submitLeads = async (data: any) => {
    setIsTyping(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          source: `Bot Inquiry (${data.course})`,
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        addBotMessage("Thank you! Your details have been submitted. Our counsellor will reach out on WhatsApp within 10 minutes. ✨");
      } else {
        addBotMessage("Oops! Something went wrong. Please try using our main inquiry forms.");
      }
    } catch (e) {
      addBotMessage("Connection error. Please try again later.");
    }
    setIsTyping(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {!isMinimized && (
        <div className="mb-4 w-[330px] sm:w-[380px] h-[480px] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-indigo-600 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-black text-sm tracking-tight">Counselling Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider">Active Now</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsMinimized(true)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <X size={18} className="text-white" />
            </button>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scroll-smooth"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-3 rounded-2xl text-xs font-semibold shadow-sm border ${
                  msg.type === 'user' 
                    ? 'bg-indigo-600 text-white border-indigo-500 rounded-tr-none' 
                    : 'bg-white text-slate-800 border-slate-100 rounded-tl-none'
                }`}>
                  {msg.text}
                  
                  {msg.options && !isSubmitted && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {msg.options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => handleUserInput(opt)}
                          className="bg-slate-50 hover:bg-indigo-600 hover:text-white border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] transition-all cursor-pointer font-bold active:scale-95"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
            
            {isSubmitted && (
              <div className="flex justify-center py-2">
                <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
                  <CheckCircle2 size={13} className="text-emerald-600" /> Submitted Successfully
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          {!isSubmitted && (
            <div className="p-3 bg-white border-t border-slate-100">
              {steps[currentStep].type !== 'select' ? (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUserInput(inputValue);
                  }}
                  className="flex gap-2"
                >
                  <input 
                    type={steps[currentStep].type}
                    placeholder="Type your answer..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl font-semibold text-xs focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-800"
                  />
                  <button 
                    type="submit"
                    className="bg-indigo-600 text-white border border-indigo-500 p-2 rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer shrink-0 active:scale-95"
                  >
                    <Send size={16} />
                  </button>
                </form>
              ) : (
                <div className="text-center py-1">
                  <span className="text-[9px] font-black uppercase text-slate-400 italic">Select an option above 👆</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Bubble Icon */}
      <button 
        onClick={() => setIsMinimized(!isMinimized)}
        className={`w-14 h-14 rounded-full border border-slate-200 shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 group relative cursor-pointer ${
          isMinimized ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border-indigo-500'
        }`}
      >
        {isMinimized ? <MessageSquare size={24} /> : <X size={24} />}
        
        {isMinimized && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-500 border border-white rounded-full flex items-center justify-center text-[9px] font-black text-slate-900">
            1
          </span>
        )}
      </button>
    </div>
  );
}

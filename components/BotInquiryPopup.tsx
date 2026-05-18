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
      question: "Yo! 👋 I'm the Shiksha assistant. What's your name?",
      field: 'name',
      type: 'text'
    },
    {
      question: (name: string) => `Wassup, ${name}! Which course are you trying to check out?`,
      field: 'course',
      type: 'select',
      options: COURSE_OPTIONS
    },
    {
      question: "Bet. Drop your WhatsApp number so we can shoot over the brochures & details.",
      field: 'number',
      type: 'tel'
    },
    {
      question: "And your email address for the alerts?",
      field: 'email',
      type: 'email'
    },
    {
      question: "Where are you based rn?",
      field: 'location',
      type: 'text'
    },
    {
      question: "Where do you wanna study? (Online or a specific city)",
      field: 'preferredLocation',
      type: 'text'
    },
    {
      question: "Last one: What's the budget looking like?",
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
          source: `Online Shiksha Bot Inquiry (${data.course})`,
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        addBotMessage("W! Your details are locked in. Our team will hit you up on WhatsApp in a few mins. 🔥");
      } else {
        addBotMessage("Oops! Connection bugged out. Try the main form.");
      }
    } catch (e) {
      addBotMessage("Network error. Hit us up later.");
    }
    setIsTyping(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {!isMinimized && (
        <div className="mb-4 w-[330px] sm:w-[380px] h-[480px] bg-[#111] border-4 border-[#333] rounded-3xl shadow-[8px_8px_0px_rgba(204,255,0,0.2)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-[#ccff00] p-4 flex items-center justify-between text-black border-b-4 border-[#333]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center border-2 border-black">
                <Bot size={24} className="text-[#ccff00]" />
              </div>
              <div>
                <h3 className="font-black text-lg tracking-tighter uppercase leading-none">Counsellor Bot</h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 bg-red-500 border border-black rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-wider">Online rn</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsMinimized(true)}
              className="p-1.5 border-2 border-transparent hover:border-black rounded-xl transition-all cursor-pointer hover:bg-black hover:text-[#ccff00]"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#050505] scroll-smooth"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm font-bold shadow-[4px_4px_0px_rgba(0,0,0,1)] border-2 ${
                  msg.type === 'user' 
                    ? 'bg-[#ff007f] text-white border-black rounded-tr-none' 
                    : 'bg-[#111] text-gray-200 border-[#333] rounded-tl-none'
                }`}>
                  {msg.text}
                  
                  {msg.options && !isSubmitted && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => handleUserInput(opt)}
                          className="bg-[#050505] hover:bg-[#ccff00] text-gray-300 hover:text-black border-2 border-[#333] hover:border-[#ccff00] px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer font-black uppercase active:translate-x-1 active:translate-y-1"
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
                <div className="bg-[#111] border-2 border-[#333] p-3 rounded-2xl rounded-tl-none flex gap-1.5 items-center shadow-[4px_4px_0px_#000]">
                  <span className="w-2 h-2 bg-[#ccff00] rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-[#ff007f] rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-[#00ffa3] rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
            
            {isSubmitted && (
              <div className="flex justify-center py-2">
                <div className="bg-[#050505] text-[#00ffa3] border-2 border-[#00ffa3] px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_#00ffa3]">
                  <CheckCircle2 size={16} /> Locked In
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          {!isSubmitted && (
            <div className="p-3 bg-[#111] border-t-4 border-[#333]">
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
                    placeholder="Type here..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 bg-[#050505] border-2 border-[#333] px-4 py-2 rounded-xl font-bold text-sm text-white focus:outline-none focus:border-[#ccff00] transition-colors"
                  />
                  <button 
                    type="submit"
                    className="bg-[#ccff00] text-black border-2 border-[#ccff00] p-2.5 rounded-xl hover:bg-transparent hover:text-[#ccff00] transition-all cursor-pointer shrink-0 shadow-[4px_4px_0px_rgba(204,255,0,0.3)] active:translate-x-1 active:translate-y-1 active:shadow-none"
                  >
                    <Send size={20} />
                  </button>
                </form>
              ) : (
                <div className="text-center py-2">
                  <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Select an option above 👆</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Bubble Icon */}
      <button 
        onClick={() => setIsMinimized(!isMinimized)}
        className={`w-16 h-16 rounded-2xl border-4 shadow-[6px_6px_0px_#000] flex items-center justify-center transition-all hover:-translate-y-1 active:translate-y-0 active:shadow-none cursor-pointer ${
          isMinimized 
            ? 'bg-[#ccff00] border-black text-black' 
            : 'bg-[#111] border-[#333] text-gray-400'
        }`}
      >
        {isMinimized ? <MessageSquare size={28} className="animate-pulse" /> : <X size={28} />}
        
        {isMinimized && (
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#ff007f] border-2 border-black rounded-full flex items-center justify-center text-xs font-black text-white animate-bounce">
            1
          </span>
        )}
      </button>
    </div>
  );
}

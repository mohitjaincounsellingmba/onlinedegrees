"use client";

import React, { useState, useRef } from 'react';
import { Download, Plus, Trash2, Briefcase, GraduationCap, User, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

export default function CreateResumePage() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'John Doe',
    jobTitle: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    location: 'Delhi, India',
    summary: 'A highly motivated and detail-oriented professional with a passion for building scalable and efficient applications. Proven ability to work in team environments and deliver quality results under tight deadlines.'
  });

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      company: 'Tech Solutions Inc.',
      position: 'Senior Developer',
      startDate: 'Jan 2022',
      endDate: 'Present',
      description: 'Led the development of a high-traffic web application. Mentored junior developers and improved code quality across the team.'
    }
  ]);

  const [educations, setEducations] = useState<Education[]>([
    {
      id: '1',
      institution: 'Delhi University',
      degree: 'Bachelor of Technology in Computer Science',
      year: '2018 - 2022'
    }
  ]);

  const [skills, setSkills] = useState('JavaScript, React, Node.js, TypeScript, SQL, Project Management');

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: '' }
    ]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const addEducation = () => {
    setEducations([
      ...educations,
      { id: Date.now().toString(), institution: '', degree: '', year: '' }
    ]);
  };

  const removeEducation = (id: string) => {
    setEducations(educations.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducations(educations.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
              Resume <span className="text-indigo-600">Builder</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Create a professional ATS-friendly resume in minutes. Perfect for freshers & professionals.</p>
          </div>
          <button 
            onClick={handlePrint}
            className="print:hidden bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-indigo-200"
          >
            <Download size={20} />
            Download PDF
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Form (Hidden when printing) */}
          <div className="w-full lg:w-5/12 xl:w-1/3 space-y-6 print:hidden h-[calc(100vh-200px)] overflow-y-auto pr-2 pb-10 custom-scrollbar">
            
            {/* Personal Details */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                <User className="text-indigo-600" size={24} /> Personal Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                  <input type="text" value={personalInfo.fullName} onChange={e => setPersonalInfo({...personalInfo, fullName: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all" placeholder="E.g. John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Job Title / Target Role</label>
                  <input type="text" value={personalInfo.jobTitle} onChange={e => setPersonalInfo({...personalInfo, jobTitle: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all" placeholder="E.g. Software Engineer" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                    <input type="email" value={personalInfo.email} onChange={e => setPersonalInfo({...personalInfo, email: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Phone</label>
                    <input type="text" value={personalInfo.phone} onChange={e => setPersonalInfo({...personalInfo, phone: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Location</label>
                  <input type="text" value={personalInfo.location} onChange={e => setPersonalInfo({...personalInfo, location: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all" placeholder="E.g. New Delhi, India" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Professional Summary</label>
                  <textarea rows={4} value={personalInfo.summary} onChange={e => setPersonalInfo({...personalInfo, summary: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all resize-none" placeholder="Brief overview of your career and goals..."></textarea>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                  <Briefcase className="text-indigo-600" size={24} /> Work Experience
                </h2>
                <button onClick={addExperience} className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-colors" title="Add Experience">
                  <Plus size={20} />
                </button>
              </div>
              
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="p-4 border border-slate-100 bg-slate-50 rounded-xl relative group">
                    {experiences.length > 1 && (
                      <button onClick={() => removeExperience(exp.id)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    )}
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Company</label>
                          <input type="text" value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 text-sm outline-none" placeholder="Company Name" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Position</label>
                          <input type="text" value={exp.position} onChange={e => updateExperience(exp.id, 'position', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 text-sm outline-none" placeholder="Job Title" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Start Date</label>
                          <input type="text" value={exp.startDate} onChange={e => updateExperience(exp.id, 'startDate', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 text-sm outline-none" placeholder="e.g. Jan 2021" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">End Date</label>
                          <input type="text" value={exp.endDate} onChange={e => updateExperience(exp.id, 'endDate', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 text-sm outline-none" placeholder="e.g. Present" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Description</label>
                        <textarea rows={3} value={exp.description} onChange={e => updateExperience(exp.id, 'description', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 text-sm outline-none resize-none" placeholder="Describe your responsibilities and achievements..."></textarea>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                  <GraduationCap className="text-indigo-600" size={24} /> Education
                </h2>
                <button onClick={addEducation} className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-colors" title="Add Education">
                  <Plus size={20} />
                </button>
              </div>
              
              <div className="space-y-6">
                {educations.map((edu, index) => (
                  <div key={edu.id} className="p-4 border border-slate-100 bg-slate-50 rounded-xl relative group">
                    {educations.length > 1 && (
                      <button onClick={() => removeEducation(edu.id)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    )}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Institution</label>
                        <input type="text" value={edu.institution} onChange={e => updateEducation(edu.id, 'institution', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 text-sm outline-none" placeholder="University or College" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Degree</label>
                          <input type="text" value={edu.degree} onChange={e => updateEducation(edu.id, 'degree', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 text-sm outline-none" placeholder="e.g. B.Tech" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Year</label>
                          <input type="text" value={edu.year} onChange={e => updateEducation(edu.id, 'year', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 text-sm outline-none" placeholder="e.g. 2018 - 2022" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                <span className="text-indigo-600 font-bold">★</span> Skills
              </h2>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Skills (comma separated)</label>
                <textarea rows={3} value={skills} onChange={e => setSkills(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all resize-none" placeholder="JavaScript, React, Project Management..."></textarea>
              </div>
            </div>
            
          </div>

          {/* Right Column: Preview / PDF Output */}
          <div className="w-full lg:w-7/12 xl:w-2/3 print:w-full print:m-0">
            <div className="bg-white shadow-2xl rounded-none md:rounded-2xl print:rounded-none overflow-hidden print:shadow-none print:w-[210mm] print:min-h-[297mm] mx-auto w-full max-w-[800px] border border-slate-200 print:border-none">
              
              {/* Resume Header */}
              <div className="bg-slate-900 text-white p-8 md:p-10">
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
                <h2 className="text-lg md:text-xl text-indigo-400 font-semibold mt-2 uppercase tracking-widest">{personalInfo.jobTitle || 'Your Job Title'}</h2>
                
                <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-300">
                  {personalInfo.email && (
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-indigo-400" /> {personalInfo.email}
                    </div>
                  )}
                  {personalInfo.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-indigo-400" /> {personalInfo.phone}
                    </div>
                  )}
                  {personalInfo.location && (
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-indigo-400" /> {personalInfo.location}
                    </div>
                  )}
                </div>
              </div>

              {/* Resume Body */}
              <div className="p-8 md:p-10 space-y-8">
                
                {/* Summary */}
                {personalInfo.summary && (
                  <section>
                    <h3 className="text-lg font-black uppercase tracking-widest text-slate-800 border-b-2 border-slate-200 pb-2 mb-4">Professional Summary</h3>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                      {personalInfo.summary}
                    </p>
                  </section>
                )}

                {/* Experience */}
                {experiences.some(e => e.company || e.position) && (
                  <section>
                    <h3 className="text-lg font-black uppercase tracking-widest text-slate-800 border-b-2 border-slate-200 pb-2 mb-4">Work Experience</h3>
                    <div className="space-y-6">
                      {experiences.filter(e => e.company || e.position).map(exp => (
                        <div key={exp.id}>
                          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                            <h4 className="font-bold text-slate-900 text-base md:text-lg">{exp.position}</h4>
                            <span className="text-sm font-semibold text-indigo-600 whitespace-nowrap">{exp.startDate} {exp.endDate && `- ${exp.endDate}`}</span>
                          </div>
                          <h5 className="font-semibold text-slate-700 text-sm mb-2">{exp.company}</h5>
                          <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Education */}
                {educations.some(e => e.institution || e.degree) && (
                  <section>
                    <h3 className="text-lg font-black uppercase tracking-widest text-slate-800 border-b-2 border-slate-200 pb-2 mb-4">Education</h3>
                    <div className="space-y-4">
                      {educations.filter(e => e.institution || e.degree).map(edu => (
                        <div key={edu.id} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                          <div>
                            <h4 className="font-bold text-slate-900 text-base">{edu.degree}</h4>
                            <h5 className="font-medium text-slate-700 text-sm">{edu.institution}</h5>
                          </div>
                          <span className="text-sm font-semibold text-indigo-600 whitespace-nowrap">{edu.year}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Skills */}
                {skills && (
                  <section>
                    <h3 className="text-lg font-black uppercase tracking-widest text-slate-800 border-b-2 border-slate-200 pb-2 mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.split(',').map((skill, i) => (
                        skill.trim() ? (
                          <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-md text-sm font-medium border border-slate-200">
                            {skill.trim()}
                          </span>
                        ) : null
                      ))}
                    </div>
                  </section>
                )}

              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Global Print Styles to make the preview look exactly like the output */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body {
            background-color: white !important;
            margin: 0;
            padding: 0;
          }
          @page {
            size: A4;
            margin: 0mm;
          }
          main {
            padding: 0 !important;
          }
          header, footer, .InquiryPopup, .BotInquiryPopup {
            display: none !important;
          }
        }
        /* Custom scrollbar for form */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
      `}} />
    </div>
  );
}

export interface ExamRecord {
  id?: string;
  name: string;
  email: string;
  phone: string;
  examName: string;
  score: number;
  maxScore: number;
  percentage: string;
  correctAnswers: number;
  totalQuestions: number;
  status: 'submitted' | 'terminated';
  reason: string;
  timestamp?: string;
}

export async function saveExamResult(result: ExamRecord) {
  const resultObj = {
    ...result,
    id: result.id || Math.random().toString(36).substring(2, 11),
    timestamp: result.timestamp || new Date().toISOString()
  };

  // 1. Save to local storage for local verification and localhost mode
  if (typeof window !== 'undefined') {
    try {
      const current = localStorage.getItem('local_exams_list');
      const list = current ? JSON.parse(current) : [];
      list.push(resultObj);
      localStorage.setItem('local_exams_list', JSON.stringify(list));
      console.log('Exam attempt successfully recorded in local storage.');
    } catch (e) {
      console.warn('Local storage write warning:', e);
    }
  }

  // 2. Relay to the serverless Cloudflare function API
  try {
    const res = await fetch('/api/exams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resultObj)
    });
    return res;
  } catch (err) {
    console.warn('API sync failed. Retaining in local storage fallback:', err);
    return null;
  }
}

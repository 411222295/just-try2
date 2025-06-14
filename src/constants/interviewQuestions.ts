export interface InterviewQuestion {
  id: string;
  type: 'technical' | 'behavioral' | 'situational' | 'personality';
  question: string;
  followUpQuestions?: string[];
  expectedKeywords?: string[];
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const interviewQuestions: InterviewQuestion[] = [
  // 技術類問題
  {
    id: 'tech_1',
    type: 'technical',
    category: '程式開發',
    difficulty: 'medium',
    question: '請描述您最熟悉的程式語言，並分享一個您使用該語言解決的技術難題。',
    followUpQuestions: [
      '您是如何分析這個問題的？',
      '最終的解決方案是什麼？',
      '您從中學到了什麼？'
    ],
    expectedKeywords: ['問題分析', '解決方案', '技術選擇', '學習經驗']
  },
  {
    id: 'tech_2',
    type: 'technical',
    category: '系統設計',
    difficulty: 'hard',
    question: '如果請您設計一個即時聊天系統，您會如何規劃系統架構？',
    followUpQuestions: [
      '您會考慮哪些技術因素？',
      '如何處理高併發情況？',
      '如何確保訊息的安全性？'
    ],
    expectedKeywords: ['系統架構', '擴展性', '安全性', '效能優化']
  },

  // 行為類問題
  {
    id: 'behavior_1',
    type: 'behavioral',
    category: '團隊合作',
    difficulty: 'medium',
    question: '請分享一個您在團隊中解決衝突的經驗。',
    followUpQuestions: [
      '衝突的起因是什麼？',
      '您採取了什麼行動？',
      '最終結果如何？'
    ],
    expectedKeywords: ['溝通', '理解', '協調', '解決方案']
  },
  {
    id: 'behavior_2',
    type: 'behavioral',
    category: '領導能力',
    difficulty: 'hard',
    question: '請描述一個您帶領團隊完成專案的經驗。',
    followUpQuestions: [
      '您如何分配任務？',
      '遇到困難時如何處理？',
      '專案最終的成果如何？'
    ],
    expectedKeywords: ['任務分配', '團隊管理', '問題解決', '成果導向']
  },

  // 情境類問題
  {
    id: 'situational_1',
    type: 'situational',
    category: '工作情境',
    difficulty: 'medium',
    question: '如果您的同事在專案截止日期前請假，您會如何處理？',
    followUpQuestions: [
      '您會採取哪些具體行動？',
      '如何確保專案按時完成？',
      '如何與團隊成員溝通？'
    ],
    expectedKeywords: ['應變能力', '時間管理', '團隊協作', '溝通技巧']
  },
  {
    id: 'situational_2',
    type: 'situational',
    category: '客戶服務',
    difficulty: 'hard',
    question: '如果客戶對產品提出嚴厲批評，您會如何回應？',
    followUpQuestions: [
      '您會如何安撫客戶情緒？',
      '如何收集和分析客戶反饋？',
      '如何改進產品？'
    ],
    expectedKeywords: ['情緒管理', '問題分析', '解決方案', '客戶關係']
  },

  // 性格類問題
  {
    id: 'personality_1',
    type: 'personality',
    category: '個人特質',
    difficulty: 'easy',
    question: '您認為自己最大的優點和缺點是什麼？',
    followUpQuestions: [
      '這些特質如何影響您的工作？',
      '您如何改進自己的缺點？'
    ],
    expectedKeywords: ['自我認知', '改進意願', '工作影響']
  },
  {
    id: 'personality_2',
    type: 'personality',
    category: '工作態度',
    difficulty: 'medium',
    question: '您如何平衡工作與生活？',
    followUpQuestions: [
      '您如何管理時間？',
      '如何處理工作壓力？'
    ],
    expectedKeywords: ['時間管理', '壓力調適', '生活平衡']
  }
];

// 根據職位類型獲取相關問題
export const getQuestionsByJobType = (jobType: string): InterviewQuestion[] => {
  // 這裡可以根據職位類型返回相關的問題
  // 例如：前端工程師、後端工程師、UI/UX設計師等
  return interviewQuestions;
};

// 根據難度獲取問題
export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): InterviewQuestion[] => {
  return interviewQuestions.filter(q => q.difficulty === difficulty);
};

// 獲取隨機問題
export const getRandomQuestions = (count: number): InterviewQuestion[] => {
  const shuffled = [...interviewQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}; 
export interface CandidateData {
  id: string;
  name: string;
  gender?: string;
  school?: string;
  major?: string;
  year?: string;
  email?: string;
  phone?: string;
  skills: string[];
  softSkills?: string[];
  languages?: string[];
  experience?: Array<{ company: string; position: string; description: string; duration: string; }>;
  projects?: Array<{ name: string; description: string; technologies: string[]; }>;
  photos?: { headshot?: string; lifestyle?: string[]; };
  description?: string;
}

export interface CompanyTalentDemand {
  talentDemandType?: string;
  talentWorkContent?: string;
  talentSoftSkills?: string;
  preInterviewQuestions?: string;
}

export interface CandidateMatchResult {
  candidate: CandidateData;
  matchScore: number;
  matchingReasons: string[];
  matchingSkills: string[];
}

export const sampleCandidates: CandidateData[] = [
  {
    id: 'student1',
    name: '張小明',
    gender: '男',
    school: '國立台灣大學',
    major: '資訊工程學系',
    year: '應屆畢業生',
    email: 'student1@example.com',
    phone: '0911111111',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'Git'],
    softSkills: ['團隊合作', '問題解決', '溝通能力'],
    languages: ['中文', '英文 (TOEIC 800)'],
    experience: [],
    projects: [
      { name: '智能家居控制系統', description: '使用Node.js和React開發的物聯網系統', technologies: ['Node.js', 'React', 'MongoDB'] },
    ],
    photos: { headshot: 'mock_headshot1.jpg', lifestyle: ['mock_lifestyle1a.jpg', 'mock_lifestyle1b.jpg'] },
  },
  {
    id: 'student2',
    name: '陳美麗',
    gender: '女',
    school: '國立成功大學',
    major: '工業設計學系',
    year: '大四',
    email: 'student2@example.com',
    phone: '0922222222',
    skills: ['Figma', 'Sketch', 'UX/UI設計', '使用者研究'],
    softSkills: ['創意', '同理心', '溝通'],
    languages: ['中文', '英文 (TOEFL 90)'],
    experience: [
      { company: '設計工作室', position: '實習設計師', description: '參與多個產品的介面設計與原型製作', duration: '6個月' }
    ],
    projects: [
      { name: '行動應用介面設計', description: '為一款健康管理應用設計用戶界面和體驗流程', technologies: ['Figma', 'Sketch'] },
    ],
    photos: { headshot: 'mock_headshot2.jpg', lifestyle: ['mock_lifestyle2a.jpg'] },
  },
  {
    id: 'student3',
    name: '李大華',
    gender: '男',
    school: '國立清華大學',
    major: '資訊管理學系',
    year: '碩士生',
    email: 'student3@example.com',
    phone: '0933333333',
    skills: ['Java', 'Spring Boot', 'SQL', '數據分析'],
    softSkills: ['邏輯思考', '問題解決', '專案管理'],
    languages: ['中文', '日文 (N3)'],
    experience: [],
    projects: [
      { name: '電商後台管理系統', description: '負責後端API開發與資料庫設計', technologies: ['Java', 'Spring Boot', 'MySQL'] },
    ],
    photos: { headshot: 'mock_headshot3.jpg', lifestyle: [] },
  },
];

export const matchCandidates = (
  talentDemand: CompanyTalentDemand,
  candidates: CandidateData[]
): CandidateMatchResult[] => {
  const results: CandidateMatchResult[] = candidates.map(candidate => {
    let matchScore = 0;
    const matchingReasons: string[] = [];
    const matchingSkills: string[] = [];

    // Match based on talentDemandType (e.g., industry, job title)
    if (talentDemand.talentDemandType) {
      if (candidate.major?.includes(talentDemand.talentDemandType) ||
          candidate.skills.some(s => talentDemand.talentDemandType!.toLowerCase().includes(s.toLowerCase())) ||
          candidate.experience?.some(exp => talentDemand.talentDemandType!.toLowerCase().includes(exp.position.toLowerCase()))
      ) {
        matchScore += 30; // High weight for direct match
        matchingReasons.push(`與人才需求類型 '${talentDemand.talentDemandType}' 匹配。`);
      }
    }

    // Match based on talentWorkContent (e.g., keywords in description)
    if (talentDemand.talentWorkContent) {
      const workContentKeywords = talentDemand.talentWorkContent.toLowerCase().split(/\s*,\s*|\s+/).filter(Boolean);
      const candidateRelevantText = [candidate.description, ...candidate.skills, ...(candidate.experience?.map(e => e.description) || []), ...(candidate.projects?.map(p => p.description) || [])].join(' ').toLowerCase();
      
      let contentMatches = 0;
      workContentKeywords.forEach(keyword => {
        if (candidateRelevantText.includes(keyword)) {
          contentMatches++;
          matchingSkills.push(keyword);
        }
      });
      matchScore += (contentMatches / workContentKeywords.length) * 25; // Medium weight
      if (contentMatches > 0) {
        matchingReasons.push(`部分工作內容要求與其經驗匹配。`);
      }
    }

    // Match based on talentSoftSkills
    if (talentDemand.talentSoftSkills && candidate.softSkills) {
      const softSkillsRequired = talentDemand.talentSoftSkills.toLowerCase().split(/\s*,\s*|\s+/).filter(Boolean);
      let softSkillMatches = 0;
      softSkillsRequired.forEach(skill => {
        if (candidate.softSkills?.some(s => s.toLowerCase().includes(skill))) {
          softSkillMatches++;
          matchingSkills.push(skill);
        }
      });
      matchScore += (softSkillMatches / softSkillsRequired.length) * 25; // Medium weight
      if (softSkillMatches > 0) {
        matchingReasons.push(`具備部分所需軟實力。`);
      }
    }

    // Match based on general skills (from candidate.skills) with a lower weight
    // This is a broader match, could be from either general skills or specific tech skills from projects/experience
    if (talentDemand.talentDemandType || talentDemand.talentWorkContent) {
        const combinedDemandSkills = [
            ...(talentDemand.talentDemandType ? talentDemand.talentDemandType.toLowerCase().split(/\s*,\s*|\s+/).filter(Boolean) : []),
            ...(talentDemand.talentWorkContent ? talentDemand.talentWorkContent.toLowerCase().split(/\s*,\s*|\s+/).filter(Boolean) : []),
        ];
        let generalSkillMatches = 0;
        candidate.skills.forEach(skill => {
            if (combinedDemandSkills.some(demandSkill => skill.toLowerCase().includes(demandSkill))) {
                generalSkillMatches++;
                matchingSkills.push(skill);
            }
        });
        candidate.projects?.forEach(project => {
            project.technologies.forEach(tech => {
                if (combinedDemandSkills.some(demandSkill => tech.toLowerCase().includes(demandSkill))) {
                    generalSkillMatches++;
                    matchingSkills.push(tech);
                }
            });
        });
        if (generalSkillMatches > 0) {
            matchScore += (generalSkillMatches / combinedDemandSkills.length) * 20; // Lower weight
            matchingReasons.push(`具備相關技術技能。`);
        }
    }

    // Cap matchScore at 100
    matchScore = Math.min(matchScore, 100);

    return {
      candidate,
      matchScore,
      matchingReasons,
      matchingSkills: Array.from(new Set(matchingSkills)), // Ensure unique skills
    };
  });

  // Sort by matchScore descending
  return results.sort((a, b) => b.matchScore - a.matchScore);
}; 
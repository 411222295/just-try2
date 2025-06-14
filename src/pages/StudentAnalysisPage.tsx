import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SwipeableJobStack from '../components/SwipeableJobStack';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { analyzeResume, matchJobPostings, sampleJobPostings } from '../services/resumeAnalysis';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { ArrowLeft, Star, ThumbsUp, MessageSquare, Briefcase, Award, Users, Lightbulb, AlertCircle, Code } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

interface AnalysisResult {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  technicalSkills: {
    name: string;
    level: number;
  }[];
  softSkills: {
    name: string;
    level: number;
  }[];
}

const StudentAnalysisPage: React.FC = () => {
  const { studentFormData } = useAppContext();
  const [step, setStep] = useState<'analysis' | 'chatMotivation' | 'chatIndustry' | 'chatExperience' | 'recommendations'>('analysis');
  const [analyzedTags, setAnalyzedTags] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [likedJobs, setLikedJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [motivation, setMotivation] = useState('');
  const [industryAndJob, setIndustryAndJob] = useState('');
  const [clubExperience, setClubExperience] = useState('');
  const [allJobsSwiped, setAllJobsSwiped] = useState(false);
  const navigate = useNavigate();
  const { setCurrentPage } = useAppContext();
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult>({
    overallScore: 85,
    strengths: [
      "豐富的實習經驗",
      "優秀的學術成績",
      "良好的溝通能力",
      "積極的學習態度"
    ],
    weaknesses: [
      "缺乏大型專案經驗",
      "技術深度有待提升",
      "跨團隊協作經驗不足"
    ],
    suggestions: [
      "參與開源專案",
      "參加技術研討會",
      "加強專業技能培訓",
      "建立個人作品集"
    ],
    technicalSkills: [
      { name: "JavaScript", level: 4 },
      { name: "React", level: 4 },
      { name: "Node.js", level: 3 },
      { name: "Python", level: 3 },
      { name: "SQL", level: 3 },
      { name: "Git", level: 4 }
    ],
    softSkills: [
      { name: "團隊合作", level: 4 },
      { name: "溝通能力", level: 4 },
      { name: "問題解決", level: 3 },
      { name: "時間管理", level: 4 },
      { name: "學習能力", level: 5 },
      { name: "領導力", level: 3 }
    ]
  });
  const [error, setError] = useState<string | null>(null);

  // 模擬從前一頁獲取的履歷數據
  const mockResumeData = {
    personalInfo: { name: '王小明', email: 'wang@example.com', phone: '0912345678' },
    education: { school: '台灣大學', major: '資訊工程', degree: '學士', graduationYear: '2024' },
    skills: ['React', 'TypeScript', 'Node.js', 'Python'],
    experience: [
      {
        company: 'TechStartup',
        position: '前端工程師實習生',
        duration: '2023/07 - 2023/08',
        description: '參與公司產品的前端開發'
      }
    ],
    projects: [
      {
        name: '個人作品集網站',
        description: '使用 React 和 TypeScript 開發的個人網站',
        technologies: ['React', 'TypeScript', 'Tailwind CSS']
      }
    ]
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // ... existing data loading logic ...
      } catch (err) {
        setError('載入數據時發生錯誤，請稍後再試');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleRetry = () => {
    // Retry loading data
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" text="正在分析您的履歷..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );
  }

  const handleProceedToRecommendations = async () => {
    setIsLoading(true);
    try {
      console.log('開始進行技能適配度檢查並分析履歷...');
      
      // Combine studentFormData with chat inputs for analysis
      const analysisInput = {
        personalInfo: {
          name: studentFormData.name || mockResumeData.personalInfo.name,
          email: studentFormData.email || mockResumeData.personalInfo.email,
          phone: studentFormData.phone || mockResumeData.personalInfo.phone,
        },
        education: {
          school: studentFormData.school || mockResumeData.education.school,
          major: studentFormData.major || mockResumeData.education.major,
          degree: studentFormData.degree || mockResumeData.education.degree || '學士', // Assuming '學士' if not explicitly set
          graduationYear: studentFormData.year || mockResumeData.education.graduationYear,
        },
        skills: studentFormData.skills || mockResumeData.skills,
        experience: studentFormData.experience || mockResumeData.experience,
        projects: studentFormData.projects || mockResumeData.projects,
        motivation: motivation,
        industryAndJob: industryAndJob,
        clubExperience: clubExperience,
      };

      // Analyze resume with combined data
      const tags = await analyzeResume(analysisInput);
      console.log('分析得到的標籤:', tags);
      setAnalyzedTags(tags);

      console.log('開始匹配職缺...');
      console.log('分析標籤:', tags);
      console.log('可用職缺:', sampleJobPostings);
      
      const matches = matchJobPostings(tags, sampleJobPostings);
      console.log('匹配結果:', matches);
      
      // 轉換匹配結果為職缺卡片格式
      const jobsWithIds = matches.map(match => ({
        id: match.job.id,
        title: match.job.title,
        company: match.job.company,
        location: '台北市',  // 假設位置
        salary: '月薪 50,000 - 80,000',  // 假設薪資範圍
        description: match.job.description,
        requirements: match.job.requirements,
        tags: match.matchingSkills,
        matchScore: match.matchScore,
        matchingReasons: match.matchingReasons
      }));
      
      console.log('處理後的職缺:', jobsWithIds);
      setRecommendations(jobsWithIds);
      
      // 確保狀態更新後再切換步驟
      setTimeout(() => {
        setStep('recommendations');
        setIsLoading(false);
        setAllJobsSwiped(false); // Reset allJobsSwiped when new recommendations are loaded
      }, 100);
      
    } catch (error) {
      console.error('匹配錯誤:', error);
      setIsLoading(false);
    }
  };

  const handleLikeJob = (job: any) => {
    console.log('準備應徵職缺:', job.title);
    // Navigate to PreTestPage with job details
    navigate('/student/pre-test', { state: { job } });
  };

  const handleDislikeJob = (job: any) => {
    // 這裡可以添加記錄不喜歡的職缺的邏輯，用於改進推薦
    console.log('不感興趣:', job.title);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    setCurrentPage('jobRecommendations');
    navigate('/student/job-recommendations');
  };

  const renderSkillLevel = (level: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < level ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-white">
        <div className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <button 
                  onClick={() => navigate(-1)}
                  className="text-gray-600 hover:text-[#32ADE6] transition-colors mr-4"
                >
                  <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-bold text-[#32ADE6]">TalenTag</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Logo size="medium" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 px-4 py-8 max-w-4xl mx-auto w-full">
          <h1 className="text-2xl font-bold text-center mb-8">履歷分析報告</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">整體評分</h2>
                <div className="text-3xl font-bold text-blue-600">
                  {analysisResult.overallScore}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${analysisResult.overallScore}%` }}
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">履歷強項</h2>
              <div className="space-y-2">
                {analysisResult.strengths.map((strength, index) => (
                  <div key={index} className="flex items-center text-green-600">
                    <ThumbsUp className="w-5 h-5 mr-2" />
                    {strength}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">專業技能</h2>
              <div className="space-y-4">
                {analysisResult.technicalSkills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{skill.name}</span>
                    {renderSkillLevel(skill.level)}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">軟實力</h2>
              <div className="space-y-4">
                {analysisResult.softSkills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{skill.name}</span>
                    {renderSkillLevel(skill.level)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">待改進項目</h2>
              <div className="space-y-2">
                {analysisResult.weaknesses.map((weakness, index) => (
                  <div key={index} className="flex items-center text-red-600">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    {weakness}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">建議</h2>
              <div className="space-y-2">
                {analysisResult.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-center text-blue-600">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              variant="primary"
              size="large"
              onClick={handleNext}
            >
              下一步：職缺推薦
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default StudentAnalysisPage;
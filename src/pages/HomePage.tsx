import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { ChevronRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, setCurrentPage, language, setLanguage } = useAppContext();

  const handleCompanyClick = () => {
    setUser({ type: 'company' });
    setCurrentPage('companyForm');
    navigate('/company/register');
  };

  const handleStudentClick = () => {
    setUser({ type: 'student' });
    setCurrentPage('studentForm');
    navigate('/student/register');
  };

  const handleQuickUpload = () => {
    navigate('/upload');
  };

  const t = (zh: string, en: string) => (language === 'zh' ? zh : en);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 px-4">
      {/* Header */}
      <header className="flex justify-between items-center py-6 max-w-6xl mx-auto w-full">
        <Logo size="medium" />
        <div className="text-sm space-x-2">
          <button
            onClick={() => { setLanguage('zh'); localStorage.setItem('lang', 'zh'); }}
            className={`px-3 py-1 rounded-md ${language === 'zh' ? 'bg-blue-100 font-semibold' : 'text-gray-500'}`}
          >
            繁中
          </button>
          <button
            onClick={() => { setLanguage('en'); localStorage.setItem('lang', 'en'); }}
            className={`px-3 py-1 rounded-md ${language === 'en' ? 'bg-blue-100 font-semibold' : 'text-gray-500'}`}
          >
            EN
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center justify-start py-8">
        {/* Title */}
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('AI 智慧媒合平台', 'AI Talent Matching Platform')}</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10">
            {t('結合語意分析、CRM 標籤與模擬面試系統，推薦最合適的職缺與人才', 'AI-powered semantic analysis and CRM matching to connect talents with the right opportunities.')}
          </p>
        </div>

        {/* Quick Upload Section */}
        <div className="bg-gradient-to-r from-[#32ADE6] to-[#2A8BC7] p-6 rounded-xl shadow-md max-w-xl w-full mb-8">
          <h2 className="text-white text-xl font-bold mb-2">快速開始</h2>
          <p className="text-white/90 mb-4">上傳履歷，立即獲得職位推薦</p>
          <button 
            onClick={handleQuickUpload}
            className="w-full py-3 bg-white text-[#32ADE6] rounded-md font-semibold text-lg hover:bg-gray-50 transition-colors"
          >
            🔍 {t('馬上推薦職缺', 'Find Matching Jobs')}
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mb-16 w-full px-4">
          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm text-center">
            <h3 className="text-xl font-semibold mb-2">📄 {t('履歷分析', 'Resume Analysis')}</h3>
            <p className="text-sm text-gray-600">{t('透過 AI 模型萃取技能與潛力特質', 'Extract skills and potential using AI')}</p>
          </div>
          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm text-center">
            <h3 className="text-xl font-semibold mb-2">🤖 {t('智能推薦', 'Smart Matching')}</h3>
            <p className="text-sm text-gray-600">{t('結合職缺與標籤進行精準配對', 'Precisely match jobs with tags')}</p>
          </div>
          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm text-center">
            <h3 className="text-xl font-semibold mb-2">🎤 {t('模擬面試', 'Mock Interviews')}</h3>
            <p className="text-sm text-gray-600">{t('生成面試題目並提供回饋', 'Generate interview questions and feedback')}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-md mx-auto space-y-4 mb-12">
          <Button
            variant="gradient"
            size="large"
            fullWidth
            onClick={handleCompanyClick}
            className="shadow-lg"
          >
            <span className="text-xl">{t('我是企業主', 'I\'m a Company')}</span>
            <ChevronRight className="ml-2" size={24} />
          </Button>

          <Button
            variant="secondary"
            size="large"
            fullWidth
            onClick={handleStudentClick}
            className="shadow-lg"
          >
            <span className="text-xl">{t('我是學生', 'I\'m a Student')}</span>
            <ChevronRight className="ml-2" size={24} />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
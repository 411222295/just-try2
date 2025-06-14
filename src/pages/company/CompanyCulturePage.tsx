import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import { useAppContext } from '../../context/AppContext';

const CompanyCulturePage: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useAppContext();
  const [culture, setCulture] = useState({
    mission: '',
    values: '',
    environment: '',
    benefits: ''
  });

  const handleBack = () => {
    navigate('/company/register');
  };

  const handleNext = () => {
    // 儲存企業文化資料
    navigate('/company/photos-upload');
  };

  const t = (zh: string, en: string) => language === 'zh' ? zh : en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <header className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-800 flex items-center"
          >
            <ArrowLeft className="mr-1" />
            {t('返回', 'Back')}
          </button>
          <Logo size="small" />
          <div className="w-12 text-right">
            <button onClick={() => setLanguage('zh')} className={language === 'zh' ? 'font-bold' : ''}>繁中</button>
            {' / '}
            <button onClick={() => setLanguage('en')} className={language === 'en' ? 'font-bold' : ''}>EN</button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            {t('企業文化', 'Company Culture')}
          </h1>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('企業使命', 'Company Mission')}
              </label>
              <textarea
                value={culture.mission}
                onChange={(e) => setCulture(prev => ({ ...prev, mission: e.target.value }))}
                className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t('請描述貴公司的使命和願景...', 'Please describe your company\'s mission and vision...')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('核心價值觀', 'Core Values')}
              </label>
              <textarea
                value={culture.values}
                onChange={(e) => setCulture(prev => ({ ...prev, values: e.target.value }))}
                className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t('請描述貴公司的核心價值觀...', 'Please describe your company\'s core values...')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('工作環境', 'Work Environment')}
              </label>
              <textarea
                value={culture.environment}
                onChange={(e) => setCulture(prev => ({ ...prev, environment: e.target.value }))}
                className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t('請描述貴公司的工作環境和文化氛圍...', 'Please describe your company\'s work environment and culture...')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('員工福利', 'Employee Benefits')}
              </label>
              <textarea
                value={culture.benefits}
                onChange={(e) => setCulture(prev => ({ ...prev, benefits: e.target.value }))}
                className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t('請描述貴公司提供的員工福利...', 'Please describe the benefits your company offers...')}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleNext}
              variant="primary"
              size="large"
            >
              {t('下一步', 'Next')}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyCulturePage; 
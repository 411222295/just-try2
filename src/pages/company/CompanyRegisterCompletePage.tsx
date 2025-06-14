import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import { useAppContext } from '../../context/AppContext';

const CompanyRegisterCompletePage: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useAppContext();

  const handleBack = () => {
    navigate('/company/photos-upload');
  };

  const handleGoToDashboard = () => {
    navigate('/company/dashboard');
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
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="w-20 h-20 text-green-500" />
          </div>

          <h1 className="text-3xl font-bold mb-4">
            {t('註冊成功！', 'Registration Successful!')}
          </h1>

          <p className="text-gray-600 mb-8">
            {t('您的企業帳號已經成功註冊。現在您可以開始使用所有功能了。', 'Your company account has been successfully registered. You can now start using all features.')}
          </p>

          <div className="space-y-4 mb-8">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h2 className="font-semibold mb-2">
                {t('下一步您可以：', 'Next steps you can:')}
              </h2>
              <ul className="text-left space-y-2 text-gray-600">
                <li>• {t('發布職缺', 'Post job openings')}</li>
                <li>• {t('瀏覽人才庫', 'Browse talent pool')}</li>
                <li>• {t('設置面試流程', 'Set up interview process')}</li>
                <li>• {t('管理企業資料', 'Manage company profile')}</li>
              </ul>
            </div>
          </div>

          <Button
            onClick={handleGoToDashboard}
            variant="primary"
            size="large"
          >
            {t('前往企業儀表板', 'Go to Company Dashboard')}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CompanyRegisterCompletePage; 
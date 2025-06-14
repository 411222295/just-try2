import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';

const PreTestPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentPage } = useAppContext();

  // Get job details from location state
  const { job } = location.state || {};

  const handleStartPreTest = () => {
    // In a real application, this would navigate to the actual pre-test questions for the specific job
    console.log(`開始針對職位: ${job?.title} 的前測...`);
    // For now, let's simulate the pre-test and then go to a waiting page
    setCurrentPage('waitingForResponse');
    navigate('/student/waiting-for-response', { state: { job, action: 'preTest' } });
  };

  const handleSendResumeDirectly = () => {
    // In a real application, this would send the resume directly to the company
    console.log(`直接發送履歷給職位: ${job?.title}...`);
    setCurrentPage('waitingForResponse');
    navigate('/student/waiting-for-response', { state: { job, action: 'directSend' } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="py-4 px-6 flex justify-center">
        <Logo size="medium" />
      </div>
      
      <div className="flex-1 px-4 py-8 max-w-xl mx-auto w-full flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-4">應徵職位：{job?.title || '未知職位'}</h1>
        <p className="text-gray-600 mb-8">您希望先進行前測，或直接發送履歷？</p>
        
        <div className="w-full max-w-xs space-y-4">
          <Button
            variant="primary"
            size="large"
            fullWidth
            onClick={handleStartPreTest}
          >
            做前測
          </Button>
          <Button
            variant="secondary"
            size="large"
            fullWidth
            onClick={handleSendResumeDirectly}
          >
            直接發送履歷
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreTestPage; 
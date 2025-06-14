import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';

const WaitingForResponsePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentPage } = useAppContext();
  const { job, action } = location.state || {};
  const [message, setMessage] = useState('');
  const [showProgress, setShowProgress] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (action === 'preTest') {
      setMessage(`您已成功完成對 ${job?.title} 職位的前測，正在等待企業回覆...`);
    } else if (action === 'directSend') {
      setMessage(`您已成功將履歷發送給 ${job?.title} 職位，正在等待企業回覆...`);
    }

    // Simulate waiting time with a progress bar
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          return prev + 10;
        } else {
          clearInterval(interval);
          setShowProgress(false);
          // Simulate either an interview invitation or a rejection after waiting
          const isInterview = Math.random() > 0.5; // 50% chance for interview
          if (isInterview) {
            console.log('模擬：收到面試邀請！');
            setCurrentPage('interviewInvitation');
            navigate('/student/interview-invitation', { state: { job } });
          } else {
            console.log('模擬：超過7個工作天未回覆，提供落選分析報告。');
            setCurrentPage('rejectionAnalysis');
            navigate('/student/rejection-analysis', { state: { job } });
          }
          return 100;
        }
      });
    }, 700); // Progress every 0.7 seconds, total 7 seconds for completion

    return () => clearInterval(interval);
  }, [job, action, navigate, setCurrentPage]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="py-4 px-6 flex justify-center">
        <Logo size="medium" />
      </div>
      
      <div className="flex-1 px-4 py-8 max-w-xl mx-auto w-full flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-4">請稍候</h1>
        <p className="text-gray-600 mb-8">{message}</p>
        
        {showProgress && (
          <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {!showProgress && (
          <div className="mt-4">
            <p className="text-lg font-semibold text-green-600">處理完成！</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitingForResponsePage; 
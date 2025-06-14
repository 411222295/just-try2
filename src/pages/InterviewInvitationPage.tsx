import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { CheckCircle, Edit, Video } from 'lucide-react';

const InterviewInvitationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentPage } = useAppContext();

  const { job } = location.state || {};

  // Mock interview details
  const interviewDetails = {
    company: job?.company || 'ABC 公司',
    position: job?.title || '未知職位',
    location: '台北市信義區忠孝東路一段1號',
    date: '星期二，六月 24日',
    time: '上午 10:00',
    contactPhone: '02-1234-5678',
  };

  const handleConfirmInterview = () => {
    console.log('面試已確認！');
    // In a real app, send confirmation to backend
    setCurrentPage('studentDashboard');
    navigate('/student/dashboard'); // Navigate to student dashboard or a confirmation page
  };

  const handleRescheduleInterview = () => {
    console.log('準備重新安排面試！');
    // In a real app, navigate to a rescheduling interface or contact company
    alert('請聯繫公司重新安排面試！'); // Placeholder for now
  };

  const handleStartMockInterview = () => {
    console.log('開始模擬面試！');
    setCurrentPage('mockInterview');
    navigate('/student/mock-interview', { state: { job } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="py-4 px-6 flex justify-center">
        <Logo size="medium" />
      </div>
      
      <div className="flex-1 px-4 py-8 max-w-xl mx-auto w-full flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-4">恭喜！您收到了面試邀請</h1>
        <p className="text-gray-600 mb-8">以下是已確認的面試資訊：</p>
        
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg shadow-md w-full mb-8 text-left">
          <p className="text-lg font-semibold mb-2">職位：{interviewDetails.position}</p>
          <p className="text-lg font-semibold mb-4">公司：{interviewDetails.company}</p>
          <p className="text-gray-700 mb-2"><strong className="text-gray-800">地點：</strong>{interviewDetails.location}</p>
          <p className="text-gray-700 mb-2"><strong className="text-gray-800">時間：</strong>{interviewDetails.date}, {interviewDetails.time}</p>
          <p className="text-gray-700"><strong className="text-gray-800">聯絡電話：</strong>{interviewDetails.contactPhone}</p>
        </div>

        <div className="w-full max-w-xs space-y-4">
          <Button
            variant="primary"
            size="large"
            fullWidth
            onClick={handleConfirmInterview}
          >
            <CheckCircle className="mr-2" size={20} /> 確認面試
          </Button>
          <Button
            variant="secondary"
            size="large"
            fullWidth
            onClick={handleRescheduleInterview}
          >
            <Edit className="mr-2" size={20} /> 重新安排
          </Button>
          <Button
            variant="primary"
            size="large"
            fullWidth
            onClick={handleStartMockInterview}
          >
            <Video className="mr-2" size={20} /> 開始模擬面試
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewInvitationPage; 
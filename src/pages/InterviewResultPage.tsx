import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { CheckCircle, AlertCircle, MessageSquare, Clock } from 'lucide-react';

const InterviewResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentPage } = useAppContext();
  const { job } = location.state || {};

  // 模擬面試結果數據
  const interviewResult = {
    overallScore: 85,
    strengths: [
      '專業知識紮實',
      '表達清晰流暢',
      '解決問題能力強'
    ],
    improvements: [
      '可以多分享具體的專案經驗',
      '建議加強對公司文化的了解',
      '可以更主動地提問'
    ],
    feedback: [
      {
        question: '請介紹一下您過去的專案經驗',
        answer: '我曾經參與開發一個電商平台，負責後端API的開發...',
        score: 90,
        feedback: '回答完整，展現了技術能力'
      },
      {
        question: '您如何處理團隊衝突？',
        answer: '我認為溝通是最重要的，我會先了解各方的立場...',
        score: 85,
        feedback: '展現了良好的溝通能力，但可以更具體'
      }
    ]
  };

  const handleBackToDashboard = () => {
    setCurrentPage('studentDashboard');
    navigate('/student/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="py-4 px-6 flex justify-center bg-white shadow-sm">
        <Logo size="medium" />
      </div>
      
      <div className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold mb-6">面試結果分析</h1>
          
          {/* 總分 */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-8 border-blue-500 flex items-center justify-center">
                <span className="text-3xl font-bold text-blue-500">{interviewResult.overallScore}</span>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                總分
              </div>
            </div>
          </div>

          {/* 優點 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CheckCircle className="text-green-500 mr-2" />
              優點
            </h2>
            <ul className="space-y-2">
              {interviewResult.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          {/* 改進建議 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <AlertCircle className="text-amber-500 mr-2" />
              改進建議
            </h2>
            <ul className="space-y-2">
              {interviewResult.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-2"></span>
                  {improvement}
                </li>
              ))}
            </ul>
          </div>

          {/* 詳細回饋 */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MessageSquare className="text-blue-500 mr-2" />
              詳細回饋
            </h2>
            <div className="space-y-6">
              {interviewResult.feedback.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">問題：{item.question}</h3>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      得分：{item.score}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">回答：{item.answer}</p>
                  <p className="text-gray-700">回饋：{item.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            variant="primary"
            size="large"
            onClick={handleBackToDashboard}
          >
            返回儀表板
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewResultPage; 
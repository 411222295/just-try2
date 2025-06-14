import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { ArrowLeft, Calendar, Clock, MapPin, Building, MessageSquare } from 'lucide-react';

interface InterviewMessage {
  id: string;
  company: string;
  position: string;
  date: string;
  time: string;
  location: string;
  status: 'pending' | 'accepted' | 'rejected';
  type: 'interview' | 'offer' | 'rejection';
  message: string;
  unread: boolean;
}

const InterviewMessagesPage: React.FC = () => {
  const navigate = useNavigate();
  const [messages] = useState<InterviewMessage[]>([
    {
      id: '1',
      company: '科技公司 A',
      position: '前端工程師',
      date: '2024-03-20',
      time: '14:00',
      location: '台北市信義區',
      status: 'pending',
      type: 'interview',
      message: '恭喜您通過初步篩選！我們誠摯邀請您參加面試。',
      unread: true
    },
    {
      id: '2',
      company: '科技公司 B',
      position: '後端工程師',
      date: '2024-03-22',
      time: '10:30',
      location: '新北市板橋區',
      status: 'accepted',
      type: 'interview',
      message: '您的面試申請已確認，期待與您見面！',
      unread: false
    },
    {
      id: '3',
      company: '科技公司 C',
      position: '全端工程師',
      date: '2024-03-18',
      time: '15:00',
      location: '台北市大安區',
      status: 'rejected',
      type: 'rejection',
      message: '感謝您的申請，但很遺憾目前職位已找到合適人選。',
      unread: false
    }
  ]);

  const handleBack = () => {
    navigate(-1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600';
      case 'accepted':
        return 'text-green-600';
      case 'rejected':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '待確認';
      case 'accepted':
        return '已接受';
      case 'rejected':
        return '已拒絕';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="py-4 px-6 flex items-center justify-between border-b">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          返回
        </button>
        <Logo size="medium" />
        <div className="w-20" />
      </div>

      <div className="flex-1 px-4 py-8 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-center mb-8">面試機會訊息</h1>

        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{message.position}</h2>
                  <div className="flex items-center text-gray-600 mt-1">
                    <Building className="w-4 h-4 mr-2" />
                    {message.company}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(message.status)}`}>
                  {getStatusText(message.status)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  {message.date}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  {message.time}
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  {message.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  {message.type === 'interview' ? '面試邀請' : '面試結果'}
                </div>
              </div>

              <p className="text-gray-600 mb-4">{message.message}</p>

              {message.status === 'pending' && (
                <div className="flex gap-4">
                  <Button
                    variant="secondary"
                    size="medium"
                    onClick={() => console.log('拒絕面試', message.id)}
                  >
                    拒絕
                  </Button>
                  <Button
                    variant="primary"
                    size="medium"
                    onClick={() => console.log('接受面試', message.id)}
                  >
                    接受
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewMessagesPage; 
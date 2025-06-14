import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { ArrowLeft, Building, Eye, ThumbsUp, MessageSquare, Clock } from 'lucide-react';

interface ResumeMessage {
  id: string;
  company: string;
  position: string;
  type: 'view' | 'like' | 'message';
  message: string;
  timestamp: string;
  unread: boolean;
}

const ResumeMessagesPage: React.FC = () => {
  const navigate = useNavigate();
  const [messages] = useState<ResumeMessage[]>([
    {
      id: '1',
      company: '科技公司 A',
      position: '前端工程師',
      type: 'view',
      message: '查看了您的履歷',
      timestamp: '2024-03-20 14:30',
      unread: true
    },
    {
      id: '2',
      company: '科技公司 B',
      position: '後端工程師',
      type: 'like',
      message: '對您的履歷感興趣',
      timestamp: '2024-03-20 13:15',
      unread: true
    },
    {
      id: '3',
      company: '科技公司 C',
      position: '全端工程師',
      type: 'message',
      message: '您好，我們對您的經歷很感興趣，希望能進一步了解您。',
      timestamp: '2024-03-20 11:45',
      unread: false
    }
  ]);

  const handleBack = () => {
    navigate(-1);
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'view':
        return <Eye className="w-5 h-5" />;
      case 'like':
        return <ThumbsUp className="w-5 h-5" />;
      case 'message':
        return <MessageSquare className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getMessageColor = (type: string) => {
    switch (type) {
      case 'view':
        return 'text-blue-600';
      case 'like':
        return 'text-green-600';
      case 'message':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
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
        <h1 className="text-2xl font-bold text-center mb-8">履歷訊息</h1>

        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${
                message.unread ? 'border-l-4 border-blue-500' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{message.position}</h2>
                  <div className="flex items-center text-gray-600 mt-1">
                    <Building className="w-4 h-4 mr-2" />
                    {message.company}
                  </div>
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  {message.timestamp}
                </div>
              </div>

              <div className="flex items-center mb-4">
                <div className={`mr-3 ${getMessageColor(message.type)}`}>
                  {getMessageIcon(message.type)}
                </div>
                <p className="text-gray-600">{message.message}</p>
              </div>

              {message.type === 'message' && (
                <div className="flex gap-4">
                  <Button
                    variant="secondary"
                    size="medium"
                    onClick={() => console.log('忽略訊息', message.id)}
                  >
                    忽略
                  </Button>
                  <Button
                    variant="primary"
                    size="medium"
                    onClick={() => console.log('回覆訊息', message.id)}
                  >
                    回覆
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

export default ResumeMessagesPage; 
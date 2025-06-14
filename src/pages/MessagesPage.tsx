import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';
import Logo from '../components/Logo';

interface Message {
  id: number;
  company: string;
  logo: string;
  lastMessage: string;
  time: string;
  unread: number;
  status: 'online' | 'offline';
}

const MessagesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      company: 'Google',
      logo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=60',
      lastMessage: '您好，我們對您的履歷很感興趣，想了解更多關於您的專案經驗。',
      time: '10:30',
      unread: 2,
      status: 'online'
    },
    {
      id: 2,
      company: 'Microsoft',
      logo: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=60',
      lastMessage: '感謝您的申請，我們將在三天內安排面試。',
      time: '昨天',
      unread: 0,
      status: 'offline'
    },
    {
      id: 3,
      company: 'Meta',
      logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=60',
      lastMessage: '您的技能與我們的職位要求非常匹配，期待與您合作！',
      time: '週一',
      unread: 1,
      status: 'online'
    }
  ]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleChatClick = (id: number) => {
    navigate(`/chat/${id}`);
  };

  const filteredMessages = messages.filter(message =>
    message.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={handleBack} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">訊息</h1>
          <div className="w-8" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* 搜尋框 */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="搜尋公司..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>

        {/* 訊息列表 */}
        <div className="space-y-4">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              onClick={() => handleChatClick(message.id)}
              className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <img
                    src={message.logo}
                    alt={message.company}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      message.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{message.company}</h3>
                    <span className="text-sm text-gray-500">{message.time}</span>
                  </div>
                  <p className="mt-1 text-gray-600 truncate">{message.lastMessage}</p>
                </div>
                {message.unread > 0 && (
                  <div className="flex-shrink-0">
                    <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      {message.unread}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MessagesPage; 
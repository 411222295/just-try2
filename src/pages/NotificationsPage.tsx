import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, CheckCircle2, AlertCircle, Briefcase, MessageSquare, Calendar } from 'lucide-react';
import Logo from '../components/Logo';

interface Notification {
  id: number;
  type: 'job' | 'message' | 'system' | 'interview';
  title: string;
  content: string;
  time: string;
  isRead: boolean;
}

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'job',
      title: '新的職位推薦',
      content: 'Google 的軟體工程實習生職位與您的技能高度匹配',
      time: '10 分鐘前',
      isRead: false
    },
    {
      id: 2,
      type: 'interview',
      title: '面試邀請',
      content: 'Microsoft 邀請您參加前端開發實習生的面試',
      time: '1 小時前',
      isRead: false
    },
    {
      id: 3,
      type: 'message',
      title: '新訊息',
      content: '您收到了來自 Meta 的訊息',
      time: '2 小時前',
      isRead: true
    },
    {
      id: 4,
      type: 'system',
      title: '履歷分析完成',
      content: '您的履歷分析已完成，查看新的職位推薦',
      time: '1 天前',
      isRead: true
    }
  ]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'job':
        return <Briefcase className="text-blue-500" size={20} />;
      case 'message':
        return <MessageSquare className="text-green-500" size={20} />;
      case 'interview':
        return <Calendar className="text-purple-500" size={20} />;
      default:
        return <Bell className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={handleBack} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">通知</h1>
          <div className="w-8" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow-sm p-4 ${
                !notification.isRead ? 'border-l-4 border-blue-500' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{notification.title}</h3>
                    <span className="text-sm text-gray-500">{notification.time}</span>
                  </div>
                  <p className="mt-1 text-gray-600">{notification.content}</p>
                </div>
                {!notification.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="flex-shrink-0 text-blue-500 hover:text-blue-600"
                  >
                    <CheckCircle2 size={20} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage; 
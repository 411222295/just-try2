import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Users, FileText, Settings, BarChart2, TrendingUp, Briefcase } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');

  const stats = [
    { 
      title: { zh: '活躍職缺', en: 'Active Jobs' },
      value: '12',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    { 
      title: { zh: '待處理申請', en: 'Pending Applications' },
      value: '28',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-yellow-500'
    },
    { 
      title: { zh: '配對人才', en: 'Matched Talents' },
      value: '156',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    { 
      title: { zh: '配對率', en: 'Match Rate' },
      value: '85%',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-purple-500'
    }
  ];

  const recentActivities = [
    {
      type: 'job',
      title: { zh: '新職缺發布', en: 'New Job Posted' },
      description: { zh: '資深前端工程師', en: 'Senior Frontend Engineer' },
      time: '2小時前'
    },
    {
      type: 'match',
      title: { zh: '新人才配對', en: 'New Talent Match' },
      description: { zh: '5位符合資深前端工程師職缺的人才', en: '5 talents matched for Senior Frontend Engineer' },
      time: '3小時前'
    },
    {
      type: 'application',
      title: { zh: '新應徵申請', en: 'New Application' },
      description: { zh: '收到3份資深前端工程師的應徵', en: 'Received 3 applications for Senior Frontend Engineer' },
      time: '4小時前'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header */}
      <header className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/company/chat')}
            className="text-gray-600 hover:text-gray-800 flex items-center"
          >
            <ArrowLeft className="mr-1" />
            {language === 'zh' ? '返回' : 'Back'}
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {language === 'zh' ? '公司儀表板' : 'Company Dashboard'}
          </h1>
          <div className="w-12 text-right">
            <button onClick={() => setLanguage('zh')} className={language === 'zh' ? 'font-bold' : ''}>繁中</button>
            {' / '}
            <button onClick={() => setLanguage('en')} className={language === 'en' ? 'font-bold' : ''}>EN</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">
                    {stat.title[language]}
                  </p>
                  <p className="text-2xl font-bold mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} text-white p-3 rounded-full`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                {language === 'zh' ? '最近活動' : 'Recent Activities'}
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'job' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'match' ? 'bg-green-100 text-green-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {activity.type === 'job' ? <Plus className="w-5 h-5" /> :
                       activity.type === 'match' ? <Users className="w-5 h-5" /> :
                       <FileText className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{activity.title[language]}</h3>
                      <p className="text-gray-600 text-sm">{activity.description[language]}</p>
                      <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                {language === 'zh' ? '快速操作' : 'Quick Actions'}
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/company/chat')}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>{language === 'zh' ? '發布新職缺' : 'Post New Job'}</span>
                </button>
                <button
                  onClick={() => navigate('/company/matching')}
                  className="w-full flex items-center justify-center space-x-2 bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Users className="w-5 h-5" />
                  <span>{language === 'zh' ? '開始人才配對' : 'Start Talent Matching'}</span>
                </button>
                <button
                  onClick={() => navigate('/company/settings')}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  <span>{language === 'zh' ? '系統設定' : 'Settings'}</span>
                </button>
              </div>
            </div>

            {/* Analytics Summary */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                {language === 'zh' ? '數據分析' : 'Analytics'}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{language === 'zh' ? '本月瀏覽量' : 'Monthly Views'}</span>
                  <span className="font-semibold">2,845</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{language === 'zh' ? '平均配對率' : 'Average Match Rate'}</span>
                  <span className="font-semibold">85%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{language === 'zh' ? '回應時間' : 'Response Time'}</span>
                  <span className="font-semibold">2.5h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage; 
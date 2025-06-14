import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Bell, Globe, Lock, HelpCircle, LogOut } from 'lucide-react';
import Logo from '../components/Logo';

interface SettingItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  type: 'link' | 'toggle' | 'select';
  value?: boolean | string;
  options?: { label: string; value: string }[];
}

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<SettingItem[]>([
    {
      id: 'profile',
      title: '個人資料',
      description: '管理您的個人資訊和履歷',
      icon: <User className="text-blue-500" size={20} />,
      type: 'link'
    },
    {
      id: 'notifications',
      title: '通知設定',
      description: '管理應用程式的通知',
      icon: <Bell className="text-green-500" size={20} />,
      type: 'toggle',
      value: true
    },
    {
      id: 'language',
      title: '語言',
      description: '選擇您的偏好語言',
      icon: <Globe className="text-purple-500" size={20} />,
      type: 'select',
      value: 'zh',
      options: [
        { label: '繁體中文', value: 'zh' },
        { label: 'English', value: 'en' }
      ]
    },
    {
      id: 'privacy',
      title: '隱私設定',
      description: '管理您的隱私選項',
      icon: <Lock className="text-red-500" size={20} />,
      type: 'link'
    },
    {
      id: 'help',
      title: '幫助與支援',
      description: '常見問題和聯絡支援',
      icon: <HelpCircle className="text-yellow-500" size={20} />,
      type: 'link'
    }
  ]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSettingChange = (id: string, value: boolean | string) => {
    setSettings(prev =>
      prev.map(setting =>
        setting.id === id
          ? { ...setting, value }
          : setting
      )
    );
  };

  const handleLogout = () => {
    // 處理登出邏輯
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={handleBack} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">設定</h1>
          <div className="w-8" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-4">
          {settings.map((setting) => (
            <div
              key={setting.id}
              className="bg-white rounded-lg shadow-sm p-4"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {setting.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{setting.title}</h3>
                  <p className="text-sm text-gray-500">{setting.description}</p>
                </div>
                <div className="flex-shrink-0">
                  {setting.type === 'toggle' && (
                    <button
                      onClick={() => handleSettingChange(setting.id, !setting.value)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        setting.value ? 'bg-blue-500' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          setting.value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  )}
                  {setting.type === 'select' && (
                    <select
                      value={setting.value as string}
                      onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                    >
                      {setting.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                  {setting.type === 'link' && (
                    <button className="text-blue-500 hover:text-blue-600">
                      <ArrowLeft className="transform rotate-180" size={20} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* 登出按鈕 */}
          <button
            onClick={handleLogout}
            className="w-full bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4 text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">登出</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage; 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Bell, Lock, Globe, User, Building, Mail } from 'lucide-react';

interface CompanySettings {
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  language: 'zh' | 'en';
  timezone: string;
}

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const [settings, setSettings] = useState<CompanySettings>({
    name: '示例科技有限公司',
    email: 'contact@example.com',
    phone: '02-1234-5678',
    address: '台北市信義區信義路五段7號',
    website: 'www.example.com',
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    language: 'zh',
    timezone: 'Asia/Taipei'
  });

  const handleSave = () => {
    // 處理儲存邏輯
    console.log('Saving settings:', settings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header */}
      <header className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/company/dashboard')}
            className="text-gray-600 hover:text-gray-800 flex items-center"
          >
            <ArrowLeft className="mr-1" />
            {language === 'zh' ? '返回' : 'Back'}
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {language === 'zh' ? '系統設定' : 'Settings'}
          </h1>
          <div className="w-12 text-right">
            <button onClick={() => setLanguage('zh')} className={language === 'zh' ? 'font-bold' : ''}>繁中</button>
            {' / '}
            <button onClick={() => setLanguage('en')} className={language === 'en' ? 'font-bold' : ''}>EN</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <nav className="space-y-2">
                <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 text-blue-600 rounded-lg">
                  <Building className="w-5 h-5" />
                  <span>{language === 'zh' ? '公司資料' : 'Company Profile'}</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                  <Bell className="w-5 h-5" />
                  <span>{language === 'zh' ? '通知設定' : 'Notifications'}</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                  <Lock className="w-5 h-5" />
                  <span>{language === 'zh' ? '安全性' : 'Security'}</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                  <Globe className="w-5 h-5" />
                  <span>{language === 'zh' ? '語言與時區' : 'Language & Timezone'}</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Right Column - Settings Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">
                {language === 'zh' ? '公司資料' : 'Company Profile'}
              </h2>

              <form className="space-y-6">
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'zh' ? '公司名稱' : 'Company Name'}
                  </label>
                  <input
                    type="text"
                    value={settings.name}
                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'zh' ? '聯絡信箱' : 'Email'}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <Mail className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'zh' ? '聯絡電話' : 'Phone'}
                    </label>
                    <input
                      type="tel"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'zh' ? '公司地址' : 'Address'}
                  </label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Website */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'zh' ? '公司網站' : 'Website'}
                  </label>
                  <input
                    type="url"
                    value={settings.website}
                    onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Notification Settings */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">
                    {language === 'zh' ? '通知設定' : 'Notification Settings'}
                  </h3>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.notifications.email}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, email: e.target.checked }
                        })}
                        className="rounded text-blue-500 focus:ring-blue-500"
                      />
                      <span className="ml-2">{language === 'zh' ? '電子郵件通知' : 'Email Notifications'}</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.notifications.sms}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, sms: e.target.checked }
                        })}
                        className="rounded text-blue-500 focus:ring-blue-500"
                      />
                      <span className="ml-2">{language === 'zh' ? '簡訊通知' : 'SMS Notifications'}</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.notifications.push}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, push: e.target.checked }
                        })}
                        className="rounded text-blue-500 focus:ring-blue-500"
                      />
                      <span className="ml-2">{language === 'zh' ? '推播通知' : 'Push Notifications'}</span>
                    </label>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    <span>{language === 'zh' ? '儲存設定' : 'Save Settings'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage; 
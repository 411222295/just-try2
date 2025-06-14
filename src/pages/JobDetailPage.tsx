import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Building2, DollarSign, CheckCircle2, Share2, MessageSquareMore } from 'lucide-react';
import Logo from '../components/Logo';
import Button from '../components/Button';

interface JobDetail {
  id: string;
  company: string;
  position: string;
  location: string;
  type: string;
  duration: string;
  salary: string;
  logo: string;
  matchScore: number;
  matchReasons: string[];
  tags: string[];
  description: string;
  requirements: string[];
  benefits: string[];
}

const JobDetailPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { job } = location.state as { job: JobDetail };

  const handleBack = () => {
    navigate(-1);
  };

  const handleApply = () => {
    navigate('/student/pre-test', { state: { job } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={handleBack} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft size={24} />
          </button>
          <Logo size="small" />
          <div className="w-8" /> {/* 為了保持標題置中 */}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* 公司資訊 */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start">
              <img 
                src={job.logo} 
                alt={job.company} 
                className="w-16 h-16 rounded-lg object-cover mr-4"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{job.position}</h1>
                <p className="text-lg text-gray-600">{job.company}</p>
              </div>
            </div>
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
              匹配度 {job.matchScore}%
            </div>
          </div>

          {/* 基本資訊 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm text-gray-600">
            <div className="flex items-center">
              <MapPin size={16} className="mr-2 text-gray-400" />
              {job.location}
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2 text-gray-400" />
              {job.duration}
            </div>
            <div className="flex items-center">
              <Building2 size={16} className="mr-2 text-gray-400" />
              {job.type}
            </div>
            <div className="flex items-center">
              <DollarSign size={16} className="mr-2 text-gray-400" />
              {job.salary}
            </div>
          </div>

          {/* 匹配原因 */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">匹配原因</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {job.matchReasons.map((reason, index) => (
                <div key={index} className="flex items-center text-sm text-gray-600 bg-green-50 p-2 rounded-lg">
                  <CheckCircle2 className="text-green-500 mr-2 flex-shrink-0" size={16} />
                  {reason}
                </div>
              ))}
            </div>
          </div>

          {/* 工作描述 */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">工作描述</h2>
            <p className="text-gray-700">{job.description}</p>
          </div>

          {/* 要求條件 */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">要求條件</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          {/* 福利待遇 */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">福利待遇</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {job.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>

          {/* 技能標籤 */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">技能標籤</h2>
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 操作按鈕 */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-100">
            <div className="flex space-x-3">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Share2 size={18} />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <MessageSquareMore size={18} />
              </button>
            </div>
            <Button
              onClick={handleApply}
              variant="primary"
              size="large"
            >
              立即申請
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobDetailPage; 
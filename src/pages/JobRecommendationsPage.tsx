import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, Heart, Briefcase, MapPin, DollarSign, Clock } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  requirements: string[];
  benefits: string[];
  matchScore: number;
}

const JobRecommendationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentPage } = useAppContext();
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [showSavedJobs, setShowSavedJobs] = useState(false);

  // 模擬職缺數據
  const jobs: Job[] = [
    {
      id: '1',
      title: '前端工程師',
      company: '科技公司 A',
      location: '台北市',
      salary: '40,000 - 60,000',
      type: '全職',
      description: '我們正在尋找有經驗的前端工程師加入我們的團隊。',
      requirements: [
        '3年以上前端開發經驗',
        '精通 React、Vue 或 Angular',
        '熟悉 HTML5、CSS3、JavaScript',
        '有響應式設計經驗'
      ],
      benefits: [
        '具競爭力的薪資',
        '彈性工作時間',
        '遠端工作選項',
        '專業發展機會'
      ],
      matchScore: 95
    },
    {
      id: '2',
      title: '後端工程師',
      company: '科技公司 B',
      location: '新北市',
      salary: '45,000 - 70,000',
      type: '全職',
      description: '尋找有經驗的後端工程師來開發和維護我們的系統。',
      requirements: [
        '3年以上後端開發經驗',
        '精通 Node.js 或 Python',
        '熟悉資料庫設計和優化',
        '有 API 設計經驗'
      ],
      benefits: [
        '具競爭力的薪資',
        '彈性工作時間',
        '遠端工作選項',
        '專業發展機會'
      ],
      matchScore: 90
    }
  ];

  const currentJob = jobs[currentJobIndex];

  const handleSaveJob = () => {
    if (!savedJobs.find(job => job.id === currentJob.id)) {
      setSavedJobs([...savedJobs, currentJob]);
    }
    if (currentJobIndex < jobs.length - 1) {
      setCurrentJobIndex(currentJobIndex + 1);
    }
  };

  const handleSkipJob = () => {
    if (currentJobIndex < jobs.length - 1) {
      setCurrentJobIndex(currentJobIndex + 1);
    }
  };

  const handleRemoveSavedJob = (jobId: string) => {
    setSavedJobs(savedJobs.filter(job => job.id !== jobId));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const renderJobCard = (job: Job, isSaved: boolean = false) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p className="text-gray-600">{job.company}</p>
        </div>
        <div className="flex items-center">
          <span className="text-blue-600 font-semibold mr-2">{job.matchScore}% 匹配</span>
          {isSaved && (
            <button
              onClick={() => handleRemoveSavedJob(job.id)}
              className="text-red-500 hover:text-red-600"
            >
              <Heart className="w-6 h-6 fill-current" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-5 h-5 mr-2" />
          {job.location}
        </div>
        <div className="flex items-center text-gray-600">
          <DollarSign className="w-5 h-5 mr-2" />
          {job.salary}
        </div>
        <div className="flex items-center text-gray-600">
          <Briefcase className="w-5 h-5 mr-2" />
          {job.type}
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-5 h-5 mr-2" />
          立即到職
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">職位描述</h3>
        <p className="text-gray-600">{job.description}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">要求條件</h3>
        <ul className="list-disc list-inside text-gray-600">
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">福利待遇</h3>
        <ul className="list-disc list-inside text-gray-600">
          {job.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>

      {!isSaved && (
        <div className="flex gap-4">
          <Button
            variant="secondary"
            size="large"
            onClick={handleSkipJob}
            fullWidth
          >
            跳過
          </Button>
          <Button
            variant="primary"
            size="large"
            onClick={handleSaveJob}
            fullWidth
          >
            收藏
          </Button>
        </div>
      )}
    </div>
  );

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
        <button
          onClick={() => setShowSavedJobs(!showSavedJobs)}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <Heart className="w-5 h-5 mr-2" />
          收藏 ({savedJobs.length})
        </button>
      </div>

      <div className="flex-1 px-4 py-8 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-center mb-8">
          {showSavedJobs ? '已收藏的職缺' : '推薦職缺'}
        </h1>

        {showSavedJobs ? (
          <div>
            {savedJobs.length > 0 ? (
              savedJobs.map(job => renderJobCard(job, true))
            ) : (
              <div className="text-center text-gray-600 py-8">
                還沒有收藏任何職缺
              </div>
            )}
          </div>
        ) : (
          <div>
            {currentJobIndex < jobs.length ? (
              renderJobCard(currentJob)
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">已瀏覽完所有推薦職缺</p>
                <Button
                  variant="primary"
                  size="large"
                  onClick={() => setShowSavedJobs(true)}
                >
                  查看收藏的職缺
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobRecommendationsPage; 
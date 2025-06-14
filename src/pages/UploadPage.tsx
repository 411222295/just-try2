import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  User, 
  Code, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  FileText,
  GraduationCap,
  Languages,
  Award,
  Briefcase,
  Star,
  Bookmark,
  Share2,
  Filter,
  Search,
  Bell,
  Settings,
  MessageSquare,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Globe,
  Heart,
  Eye,
  BarChart2,
  ThumbsUp,
  ThumbsDown,
  MessageSquareMore,
  ArrowLeft
} from 'lucide-react';

interface UploadStatus {
  resume: boolean;
  profile: boolean;
  skills: boolean;
}

const UploadPage: React.FC = () => {
  const navigate = useNavigate();
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    resume: false,
    profile: false,
    skills: false
  });
  const [currentStep, setCurrentStep] = useState<'resume' | 'profile' | 'skills'>('resume');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // 模拟上传过程
      setTimeout(() => {
        setUploadStatus(prev => ({ ...prev, resume: true }));
        setIsUploading(false);
        setCurrentStep('profile');
      }, 2000);
    }
  };

  const handleProfileComplete = () => {
    setUploadStatus(prev => ({ ...prev, profile: true }));
    setCurrentStep('skills');
  };

  const handleSkillsComplete = () => {
    setUploadStatus(prev => ({ ...prev, skills: true }));
    // 所有步骤完成后跳转到结果页面
    setTimeout(() => {
      navigate('/result');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <button 
                onClick={() => navigate(-1)}
                className="text-gray-600 hover:text-[#32ADE6] transition-colors mr-4"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-2xl font-bold text-[#32ADE6]">TalenTag</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-[#32ADE6] transition-colors relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="text-gray-600 hover:text-[#32ADE6] transition-colors">
                <MessageSquare size={20} />
              </button>
              <button className="text-gray-600 hover:text-[#32ADE6] transition-colors">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* 进度指示器 */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                uploadStatus.resume ? 'bg-green-500' : 'bg-[#32ADE6]'
              }`}>
                <CheckCircle2 className="text-white" size={20} />
              </div>
              <div className="ml-2 text-sm font-medium">上傳履歷</div>
            </div>
            <div className="flex-1 h-1 mx-4 bg-gray-200">
              <div className="h-full bg-[#32ADE6]" style={{ width: uploadStatus.resume ? '100%' : '33%' }}></div>
            </div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                uploadStatus.profile ? 'bg-green-500' : uploadStatus.resume ? 'bg-[#32ADE6]' : 'bg-gray-200'
              }`}>
                <User className="text-white" size={20} />
              </div>
              <div className="ml-2 text-sm font-medium">個人資料</div>
            </div>
            <div className="flex-1 h-1 mx-4 bg-gray-200">
              <div className="h-full bg-[#32ADE6]" style={{ width: uploadStatus.profile ? '100%' : '0%' }}></div>
            </div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                uploadStatus.skills ? 'bg-green-500' : uploadStatus.profile ? 'bg-[#32ADE6]' : 'bg-gray-200'
              }`}>
                <Code className="text-white" size={20} />
              </div>
              <div className="ml-2 text-sm font-medium">技能確認</div>
            </div>
          </div>

          {/* 上传步骤内容 */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            {currentStep === 'resume' && (
              <div className="text-center">
                <div className="w-20 h-20 bg-[#32ADE6]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Upload className="text-[#32ADE6]\" size={40} />
                </div>
                <h2 className="text-2xl font-semibold mb-4">上傳您的履歷</h2>
                <p className="text-gray-600 mb-8">支持 PDF、Word 和图片格式</p>
                {isUploading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#32ADE6]"></div>
                    <span className="ml-2">上傳中...</span>
                  </div>
                ) : (
                  <label className="inline-block">
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                    />
                    <div className="bg-[#32ADE6] text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-[#2A8BC7] transition-colors">
                      選擇檔案
                    </div>
                  </label>
                )}
              </div>
            )}

            {currentStep === 'profile' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">完善個人資料</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      姓名
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#32ADE6] focus:border-transparent"
                      placeholder="請輸入您的姓名"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      學校
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#32ADE6] focus:border-transparent"
                      placeholder="請輸入您的學校"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      專業
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#32ADE6] focus:border-transparent"
                      placeholder="請輸入您的專業"
                    />
                  </div>
                  <button
                    onClick={handleProfileComplete}
                    className="w-full bg-[#32ADE6] text-white px-6 py-3 rounded-lg hover:bg-[#2A8BC7] transition-colors"
                  >
                    下一步
                  </button>
                </div>
              </div>
            )}

            {currentStep === 'skills' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">確認您的技能</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      技術技能
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Python', 'React', 'Node.js', 'Machine Learning'].map((skill) => (
                        <div
                          key={skill}
                          className="bg-[#32ADE6]/10 text-[#32ADE6] px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      語言能力
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['中文', '英文', '日文'].map((lang) => (
                        <div
                          key={lang}
                          className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                        >
                          {lang}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={handleSkillsComplete}
                    className="w-full bg-[#32ADE6] text-white px-6 py-3 rounded-lg hover:bg-[#2A8BC7] transition-colors"
                  >
                    完成
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadPage;
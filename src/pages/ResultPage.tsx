import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Building2, 
  GraduationCap,
  ChevronRight,
  Star,
  Bookmark,
  Share2,
  Filter,
  Search,
  Bell,
  Settings,
  MessageSquare,
  TrendingUp,
  Award,
  Users,
  Calendar,
  DollarSign,
  Globe,
  Languages,
  Heart,
  Eye,
  BarChart2,
  CheckCircle2,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  MessageSquareMore,
  Code,
  ArrowLeft
} from 'lucide-react';

interface JobMatch {
  id: number;
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

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'matches' | 'analysis'>('matches');
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  // 模拟数据
  const jobMatches: JobMatch[] = [
    {
      id: 1,
      company: "Google",
      position: "軟體工程實習生",
      location: "台北市",
      type: "實習",
      duration: "3 個月",
      salary: "NT$ 45,000/月",
      logo: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=60",
      matchScore: 95,
      matchReasons: [
        "技能匹配度：95%",
        "經驗要求：完全符合",
        "教育背景：完全符合"
      ],
      tags: ["AI", "機器學習", "Python"],
      description: "加入 Google 的 AI 團隊，參與開發下一代智能產品。",
      requirements: [
        "熟悉 Python 和機器學習框架",
        "具備良好的演算法基礎",
        "有相關專案經驗"
      ],
      benefits: [
        "具競爭力的薪資",
        "靈活的工作時間",
        "導師指導計劃"
      ]
    },
    {
      id: 2,
      company: "Microsoft",
      position: "前端開發實習生",
      location: "台北市",
      type: "實習",
      duration: "6 個月",
      salary: "NT$ 40,000/月",
      logo: "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=60",
      matchScore: 88,
      matchReasons: [
        "技能匹配度：88%",
        "經驗要求：部分符合",
        "教育背景：完全符合"
      ],
      tags: ["React", "TypeScript", "UI/UX"],
      description: "參與 Microsoft 365 產品的前端開發工作。",
      requirements: [
        "精通 React 和 TypeScript",
        "了解現代前端開發工具",
        "注重程式碼品質"
      ],
      benefits: [
        "遠端工作選項",
        "專業發展機會",
        "團隊建設活動"
      ]
    },
    {
      id: 3,
      company: "Meta",
      position: "資料科學實習生",
      location: "新竹市",
      type: "實習",
      duration: "4 個月",
      salary: "NT$ 50,000/月",
      logo: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=60",
      matchScore: 92,
      matchReasons: [
        "技能匹配度：92%",
        "經驗要求：完全符合",
        "教育背景：完全符合"
      ],
      tags: ["資料科學", "Python", "分析"],
      description: "參與 Meta 的資料科學團隊，分析用戶行為資料。",
      requirements: [
        "熟悉 Python 和資料分析工具",
        "具備統計學基礎",
        "有機器學習經驗"
      ],
      benefits: [
        "頂尖的技術環境",
        "國際化團隊",
        "豐富的學習資源"
      ]
    }
  ];

  const resumeAnalysis = {
    strengths: [
      "豐富的專案經驗",
      "扎實的技術基礎",
      "良好的溝通能力",
      "多元化的技能組合"
    ],
    improvements: [
      "可以添加更多實習經驗",
      "建議補充更多開源專案貢獻",
      "可以加強特定領域的專業認證",
      "建議增加團隊領導經驗"
    ],
    skills: {
      technical: ["Python", "React", "Node.js", "Machine Learning", "TypeScript", "AWS"],
      soft: ["團隊協作", "問題解決", "時間管理", "創新思維"],
      languages: ["中文", "英文", "日文"]
    }
  };

  const handleSaveJob = (id: number) => {
    setSavedJobs(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleApplyJob = (id: number) => {
    // 這裡可以添加申請職位的邏輯
    alert(`已申請職位 ID: ${id}`);
  };

  const handleViewDetails = (id: number) => {
    const job = jobMatches.find(job => job.id === id);
    if (job) {
      navigate(`/job/${id}`, { 
        state: { 
          job: {
            ...job,
            id: job.id.toString() // 確保 id 是字符串類型
          }
        } 
      });
    }
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
              <button 
                onClick={() => navigate('/notifications')}
                className="text-gray-600 hover:text-[#32ADE6] transition-colors relative"
              >
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
              <button 
                onClick={() => navigate('/messages')}
                className="text-gray-600 hover:text-[#32ADE6] transition-colors"
              >
                <MessageSquare size={20} />
              </button>
              <button 
                onClick={() => navigate('/settings')}
                className="text-gray-600 hover:text-[#32ADE6] transition-colors"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 成功提示 */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <CheckCircle2 className="text-green-500 mr-3" size={24} />
            <div>
              <h3 className="font-semibold text-green-800">履歷分析完成！</h3>
              <p className="text-green-600">我們為您找到了 {jobMatches.length} 個高度匹配的職位機會</p>
            </div>
          </div>
        </div>

        {/* 标签页切换 */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setSelectedTab('matches')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedTab === 'matches'
                ? 'bg-[#32ADE6] text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            職位匹配 ({jobMatches.length})
          </button>
          <button
            onClick={() => setSelectedTab('analysis')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedTab === 'analysis'
                ? 'bg-[#32ADE6] text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            履歷分析
          </button>
        </div>

        {selectedTab === 'matches' ? (
          <div className="space-y-6">
            {jobMatches.map((job) => (
              <div 
                key={job.id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      <img 
                        src={job.logo} 
                        alt={job.company}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/64x64?text=' + job.company.charAt(0);
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl text-gray-900">{job.position}</h3>
                      <p className="text-gray-600 text-lg">{job.company}</p>
                      <p className="text-gray-500 text-sm mt-1">{job.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#32ADE6]/10 text-[#32ADE6] px-4 py-2 rounded-full text-sm font-bold">
                      {job.matchScore}% 匹配
                    </div>
                    <button
                      onClick={() => handleSaveJob(job.id)}
                      className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                        savedJobs.includes(job.id) ? 'text-[#32ADE6]' : 'text-gray-400'
                      }`}
                    >
                      <Bookmark size={20} fill={savedJobs.includes(job.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
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

                <div className="mb-4">
                  <h4 className="font-medium mb-3 text-gray-900">匹配原因</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {job.matchReasons.map((reason, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600 bg-green-50 p-2 rounded-lg">
                        <CheckCircle2 className="text-green-500 mr-2 flex-shrink-0" size={16} />
                        {reason}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
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

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex space-x-3">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Share2 size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <MessageSquareMore size={18} />
                    </button>
                  </div>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleViewDetails(job.id)}
                      className="bg-white border border-[#32ADE6] text-[#32ADE6] px-6 py-2 rounded-lg hover:bg-[#32ADE6]/5 transition-colors font-medium"
                    >
                      查看詳情
                    </button>
                    <button 
                      onClick={() => handleApplyJob(job.id)}
                      className="bg-[#32ADE6] text-white px-6 py-2 rounded-lg hover:bg-[#2A8BC7] transition-colors font-medium"
                    >
                      立即申請
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 优势分析 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <ThumbsUp className="text-green-500 mr-2" size={24} />
                優勢分析
              </h3>
              <div className="space-y-4">
                {resumeAnalysis.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start p-3 bg-green-50 rounded-lg">
                    <CheckCircle2 className="text-green-500 mt-1 mr-3 flex-shrink-0" size={20} />
                    <p className="text-gray-700">{strength}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 改进建议 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <AlertCircle className="text-yellow-500 mr-2" size={24} />
                改進建議
              </h3>
              <div className="space-y-4">
                {resumeAnalysis.improvements.map((improvement, index) => (
                  <div key={index} className="flex items-start p-3 bg-yellow-50 rounded-lg">
                    <AlertCircle className="text-yellow-500 mt-1 mr-3 flex-shrink-0" size={20} />
                    <p className="text-gray-700">{improvement}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 技能分析 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Code className="text-[#32ADE6] mr-2" size={24} />
                技能分析
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3 text-gray-900">技術技能</h4>
                  <div className="flex flex-wrap gap-2">
                    {resumeAnalysis.skills.technical.map((skill, index) => (
                      <span 
                        key={index}
                        className="bg-[#32ADE6]/10 text-[#32ADE6] px-3 py-2 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3 text-gray-900">軟實力</h4>
                  <div className="flex flex-wrap gap-2">
                    {resumeAnalysis.skills.soft.map((skill, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3 text-gray-900">語言能力</h4>
                  <div className="flex flex-wrap gap-2">
                    {resumeAnalysis.skills.languages.map((lang, index) => (
                      <span 
                        key={index}
                        className="bg-purple-100 text-purple-700 px-3 py-2 rounded-full text-sm font-medium"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 匹配统计 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <BarChart2 className="text-[#32ADE6] mr-2" size={24} />
                匹配統計
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-[#32ADE6]/10 to-[#32ADE6]/5 rounded-lg">
                  <div className="text-3xl font-bold text-[#32ADE6]">92%</div>
                  <div className="text-sm text-gray-600 mt-1">平均匹配度</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-100 to-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{jobMatches.length}</div>
                  <div className="text-sm text-gray-600 mt-1">匹配職位數</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">{resumeAnalysis.skills.technical.length}</div>
                  <div className="text-sm text-gray-600 mt-1">技能匹配數</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-lg">
                  <div className="text-3xl font-bold text-yellow-600">A+</div>
                  <div className="text-sm text-gray-600 mt-1">履歷評級</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 底部操作按钮 */}
        <div className="mt-12 flex justify-center space-x-4">
          <button
            onClick={() => navigate('/student/dashboard')}
            className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            返回儀表板
          </button>
          <button
            onClick={() => navigate('/upload')}
            className="bg-[#32ADE6] text-white px-6 py-3 rounded-lg hover:bg-[#2A8BC7] transition-colors font-medium"
          >
            重新上傳履歷
          </button>
        </div>
      </main>
    </div>
  );
};

export default ResultPage;
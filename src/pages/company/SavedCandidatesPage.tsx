import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import { useAppContext } from '../../context/AppContext';
import { ArrowLeft, MessageSquare, Heart, Search, Filter, Star, Briefcase, MapPin } from 'lucide-react';
import { CandidateData } from '../../services/talentMatching';

const SavedCandidatesPage: React.FC = () => {
  const navigate = useNavigate();
  const { savedCandidates, setSavedCandidates } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'match' | 'name' | 'date'>('match');
  const [filterSkills, setFilterSkills] = useState<string[]>([]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSendInterview = (candidate: CandidateData) => {
    navigate('/company/send-interview-invitation', { state: { candidate } });
  };

  const handleRemoveFromSaved = (candidateId: string) => {
    setSavedCandidates(prev => prev.filter(c => c.id !== candidateId));
  };

  const handleSort = (type: 'match' | 'name' | 'date') => {
    setSortBy(type);
  };

  const handleFilterSkill = (skill: string) => {
    setFilterSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  // 獲取所有可用的技能標籤
  const allSkills = Array.from(
    new Set(savedCandidates.flatMap(c => c.skills))
  );

  // 過濾和排序候選人
  const filteredCandidates = savedCandidates
    .filter(candidate => {
      const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          candidate.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSkills = filterSkills.length === 0 || 
                           filterSkills.some(skill => candidate.skills.includes(skill));
      return matchesSearch && matchesSkills;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'match':
          return (b.matchScore || 0) - (a.matchScore || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
          return new Date(b.savedAt || 0).getTime() - new Date(a.savedAt || 0).getTime();
        default:
          return 0;
      }
    });

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

      <div className="flex-1 px-4 py-8 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">收藏的人才</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="搜尋人才..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleSort('match')}
                className={`px-3 py-2 rounded-lg ${
                  sortBy === 'match' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                匹配度
              </button>
              <button
                onClick={() => handleSort('name')}
                className={`px-3 py-2 rounded-lg ${
                  sortBy === 'name' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                姓名
              </button>
              <button
                onClick={() => handleSort('date')}
                className={`px-3 py-2 rounded-lg ${
                  sortBy === 'date' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                收藏時間
              </button>
            </div>
          </div>
        </div>

        {/* 技能過濾器 */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">技能過濾</h3>
          <div className="flex flex-wrap gap-2">
            {allSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => handleFilterSkill(skill)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filterSkills.includes(skill)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {filteredCandidates.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {searchQuery || filterSkills.length > 0
                ? '沒有找到符合條件的人才'
                : '還沒有收藏的人才'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery || filterSkills.length > 0
                ? '請嘗試調整搜尋條件或過濾器'
                : '在瀏覽人才時，點擊愛心圖標即可收藏'}
            </p>
            <Button
              variant="primary"
              size="large"
              onClick={() => navigate('/company/results')}
            >
              瀏覽人才
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={candidate.avatar || '/default-avatar.png'}
                    alt={candidate.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{candidate.name}</h3>
                    <p className="text-gray-600">{candidate.title}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-500">
                        匹配度 {candidate.matchScore || 0}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center text-gray-600 mb-2">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span className="text-sm">{candidate.experience} 年經驗</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{candidate.location}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">技能</h4>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Button
                    variant="secondary"
                    size="medium"
                    onClick={() => handleRemoveFromSaved(candidate.id)}
                  >
                    <Heart className="w-4 h-4 mr-2 text-red-500" />
                    取消收藏
                  </Button>
                  <Button
                    variant="primary"
                    size="medium"
                    onClick={() => handleSendInterview(candidate)}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    發送面試邀請
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedCandidatesPage; 
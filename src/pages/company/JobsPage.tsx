import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Filter, Edit2, Trash2, Eye, Users } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  salary: string;
  status: 'active' | 'draft' | 'closed';
  applications: number;
  matches: number;
  postedDate: string;
}

const JobsPage: React.FC = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'draft' | 'closed'>('all');

  // 模擬職缺數據
  const jobs: Job[] = [
    {
      id: '1',
      title: '資深前端工程師',
      location: '台北市',
      type: '全職',
      salary: '80k-120k',
      status: 'active',
      applications: 15,
      matches: 8,
      postedDate: '2024-03-15'
    },
    {
      id: '2',
      title: '後端開發工程師',
      location: '新北市',
      type: '全職',
      salary: '70k-100k',
      status: 'active',
      applications: 12,
      matches: 6,
      postedDate: '2024-03-14'
    },
    {
      id: '3',
      title: 'UI/UX 設計師',
      location: '台北市',
      type: '兼職',
      salary: '面議',
      status: 'draft',
      applications: 0,
      matches: 0,
      postedDate: '2024-03-13'
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Job['status']) => {
    switch (status) {
      case 'active': return language === 'zh' ? '招募中' : 'Active';
      case 'draft': return language === 'zh' ? '草稿' : 'Draft';
      case 'closed': return language === 'zh' ? '已關閉' : 'Closed';
      default: return status;
    }
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
            {language === 'zh' ? '職缺管理' : 'Job Management'}
          </h1>
          <div className="w-12 text-right">
            <button onClick={() => setLanguage('zh')} className={language === 'zh' ? 'font-bold' : ''}>繁中</button>
            {' / '}
            <button onClick={() => setLanguage('en')} className={language === 'en' ? 'font-bold' : ''}>EN</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        {/* Actions Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder={language === 'zh' ? '搜尋職缺...' : 'Search jobs...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">{language === 'zh' ? '所有狀態' : 'All Status'}</option>
                <option value="active">{language === 'zh' ? '招募中' : 'Active'}</option>
                <option value="draft">{language === 'zh' ? '草稿' : 'Draft'}</option>
                <option value="closed">{language === 'zh' ? '已關閉' : 'Closed'}</option>
              </select>
              <button
                onClick={() => navigate('/company/chat')}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>{language === 'zh' ? '發布新職缺' : 'Post New Job'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'zh' ? '職缺名稱' : 'Job Title'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'zh' ? '地點' : 'Location'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'zh' ? '類型' : 'Type'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'zh' ? '薪資' : 'Salary'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'zh' ? '狀態' : 'Status'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'zh' ? '應徵數' : 'Applications'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'zh' ? '配對數' : 'Matches'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'zh' ? '操作' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{job.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{job.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{job.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{job.salary}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(job.status)}`}>
                        {getStatusText(job.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.applications}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.matches}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => navigate(`/company/jobs/${job.id}`)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => navigate(`/company/jobs/${job.id}/edit`)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => navigate(`/company/jobs/${job.id}/matches`)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Users className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {/* 處理刪除邏輯 */}}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobsPage; 
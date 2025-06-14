import React from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';

const RejectionAnalysisPage: React.FC = () => {
  const location = useLocation();
  const { job } = location.state || {};

  // Mock analysis data based on the job (and potentially previous pre-test/resume data)
  const analysisReport = {
    title: job?.title || '未知職位',
    company: job?.company || '未知公司',
    summary: '很抱歉通知您，您未能獲得此職位的面試機會。根據我們的分析，以下是您在本次申請中的表現與建議：',
    sections: [
      {
        heading: '綜合標籤比對分析',
        content: [
          '您的履歷在技術技能方面表現良好，但與該職位所需的特定軟實力（例如：溝通協調能力）匹配度較低。',
          '建議您在履歷中強調您的專案管理或團隊合作經驗。',
        ],
      },
      {
        heading: '前測表現分析',
        content: [
          '如果您進行了前測，您的邏輯推理部分得分不錯，但在行業知識方面有待加強。',
          '建議您多研究目標產業的最新趨勢和常用工具。'
        ],
      },
      {
        heading: '後續建議',
        content: [
          '我們鼓勵您繼續完善您的履歷，並考慮參與相關課程或社群活動，提升您的不足之處。',
          '期待您在未來的職位申請中取得成功！'
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="py-4 px-6 flex justify-center">
        <Logo size="medium" />
      </div>
      
      <div className="flex-1 px-4 py-8 max-w-xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-center mb-6">落選分析報告書</h1>
        <p className="text-gray-600 text-center mb-8">{analysisReport.summary}</p>
        
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <p className="text-lg font-semibold">職位：{analysisReport.title} - {analysisReport.company}</p>
          {analysisReport.sections.map((section, index) => (
            <div key={index} className="border-t pt-4">
              <h2 className="text-xl font-semibold mb-3">{section.heading}</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            variant="primary"
            size="large"
            onClick={() => window.history.back()} // Go back to the previous page or dashboard
          >
            返回
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RejectionAnalysisPage; 
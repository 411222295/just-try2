import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAppContext } from '../../context/AppContext';
import { Calendar, Clock, MapPin, Phone, MessageSquare, ArrowLeft } from 'lucide-react';
import { CandidateData } from '../../services/talentMatching';

const SendInterviewInvitationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentPage } = useAppContext();

  const { candidate } = location.state || {}; // Get candidate data from state

  const [interviewDetails, setInterviewDetails] = useState({
    date: '',
    time: '',
    location: '',
    contactPhone: '',
    interviewGuide: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInterviewDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    navigate(-1); // 返回上一頁
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending interview invitation with details:', interviewDetails, 'to candidate:', candidate);

    // 顯示成功訊息
    alert(`面試邀請已發送給 ${candidate?.name || '該人才'}！`);
    
    // 返回上一頁
    navigate(-1);
  };

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
        <div className="w-20" /> {/* 為了保持標題置中 */}
      </div>
      
      <div className="flex-1 px-4 py-8 max-w-xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-bold text-center mb-6">發送面試邀請給 {candidate?.name || '該人才'}</h1>
          <p className="text-gray-600 text-center mb-8">請填寫面試時間、地點及相關資訊：</p>

          <Input
            label="面試日期"
            type="date"
            name="date"
            value={interviewDetails.date}
            onChange={handleChange}
            required
            className="flex items-center"
            // icon={<Calendar size={20} className="text-gray-500 mr-2" />}
          />

          <Input
            label="面試時間"
            type="time"
            name="time"
            value={interviewDetails.time}
            onChange={handleChange}
            required
            className="flex items-center"
            // icon={<Clock size={20} className="text-gray-500 mr-2" />}
          />

          <Input
            label="面試地點"
            placeholder="例如：公司辦公室 / 線上會議連結"
            name="location"
            value={interviewDetails.location}
            onChange={handleChange}
            required
            className="flex items-center"
            // icon={<MapPin size={20} className="text-gray-500 mr-2" />}
          />

          <Input
            label="聯絡電話"
            placeholder="例如：02-1234-5678"
            name="contactPhone"
            value={interviewDetails.contactPhone}
            onChange={handleChange}
            required
            className="flex items-center"
            // icon={<Phone size={20} className="text-gray-500 mr-2" />}
          />

          <Input
            label="面試懶人包 / 注意事項 (選填)"
            placeholder="提供給人才的面試準備資訊、公司介紹等"
            name="interviewGuide"
            value={interviewDetails.interviewGuide}
            onChange={handleChange}
            multiline
            rows={6}
            className="flex items-center"
            // icon={<MessageSquare size={20} className="text-gray-500 mr-2" />}
          />
          
          <div className="pt-4">
            <Button type="submit" variant="primary" size="large" fullWidth>
              確認發送邀請
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendInterviewInvitationPage; 
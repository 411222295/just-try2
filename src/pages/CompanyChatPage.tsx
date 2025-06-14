import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Settings, Users, FileText } from 'lucide-react';
import { db } from '../services/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useAppContext } from '../context/AppContext';
import Input from '../components/Input';
import Button from '../components/Button';
import Logo from '../components/Logo';

const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const MODEL = import.meta.env.VITE_OPENROUTER_MODEL;
const REFERER = import.meta.env.VITE_OPENROUTER_SITE;
const TITLE = import.meta.env.VITE_OPENROUTER_TITLE;

// 除錯用：檢查環境變數
console.log('API Key:', API_KEY ? '已設定' : '未設定');
console.log('Model:', MODEL);
console.log('Referer:', REFERER);
console.log('Title:', TITLE);

type Role = 'user' | 'assistant';
type Language = 'zh' | 'en';

// New talent demand fields and labels
type TalentFieldKey = 'talentDemandType' | 'talentWorkContent' | 'talentSoftSkills' | 'preInterviewQuestions';
const talentLabels: Record<TalentFieldKey, { zh: string; en: string }> = {
  talentDemandType: { zh: '人才需求類型及職缺', en: 'Talent Demand Type & Job' },
  talentWorkContent: { zh: '工作內容', en: 'Work Content' },
  talentSoftSkills: { zh: '所需軟實力', en: 'Required Soft Skills' },
  preInterviewQuestions: { zh: '預先面試題目', en: 'Pre-interview Questions' },
};

const talentRequiredFields: TalentFieldKey[] = [
  'talentDemandType',
  'talentWorkContent',
  'talentSoftSkills',
  'preInterviewQuestions',
];

interface Message {
  role: Role;
  content: string;
}

const CompanyChatPage: React.FC = () => {
  const { companyFormData, setCompanyFormData, language } = useAppContext();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    content: language === 'zh'
      ? '嗨！請問目前公司的人才需求是？(行銷/設計/資管/…)'
      : 'Hi! What is your company\'s current talent demand? (Marketing/Design/IT/…)',
  }]);
  const [talentDemandFormData, setTalentDemandFormData] = useState<Partial<Record<TalentFieldKey, string>>>({});
  const [currentTalentField, setCurrentTalentField] = useState<TalentFieldKey>('talentDemandType');
  const [finishedTalentDemand, setFinishedTalentDemand] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const systemPrompt = language === 'zh'
    ? `你是一位親切、耐心且語氣自然的繁體中文 AI 助理，協助企業一步步收集人才需求資料。請依照以下 4 個欄位順序收集資訊：人才需求類型及職缺、工作內容、所需軟實力、預先面試題目。每次只問一題。若使用者回答模糊請補問細節，不要總結或跳過欄位。在收集完所有資訊後，請總結所有收集到的資料，並詢問使用者是否確認，或是否需要修改。`
    : `You are a friendly and patient AI assistant guiding the user to collect talent demand information. Please collect these 4 fields: Talent Demand Type & Job, Work Content, Required Soft Skills, Pre-interview Questions. Ask one question at a time. If vague, follow up. Do not summarize or skip fields. After collecting all information, please summarize all collected data and ask the user for confirmation or if they need to make changes.`;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // New function to determine the next field to ask for
  const getNextTalentField = (currentFormData: Partial<Record<TalentFieldKey, string>>): TalentFieldKey | null => {
    for (const field of talentRequiredFields) {
      if (!currentFormData[field]) {
        return field;
      }
    }
    return null; // All fields collected
  };

  const getAIAnalysis = async (fullData: Record<TalentFieldKey, string>) => {
    try {
      const prompt = talentRequiredFields.map(key => `${talentLabels[key][language]}: ${fullData[key]}`).join('\n');
      const finalPrompt = language === 'zh'
        ? `以下是公司人才需求資訊，請產生一段 2~3 句的分析摘要，建議應徵人選特質或能力方向：\n${prompt}`
        : `Here is company talent demand information. Please generate a 2-3 sentence summary with recommended candidate traits and skills:\n${prompt}`;

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': REFERER,
          'X-Title': TITLE,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: finalPrompt },
          ],
          max_tokens: 300,
        }),
      });

      if (!response.ok) {
        console.error(`AI Analysis API Error: ${response.status}`);
        return language === 'zh' 
          ? '根據您的需求，我們建議尋找具有扎實技術基礎、良好溝通能力，且具備團隊合作精神的應徵者。特別注重應徵者在相關領域的實務經驗，以及解決問題的能力。'
          : 'Based on your requirements, we recommend looking for candidates with solid technical foundations, good communication skills, and team spirit. Special attention should be paid to candidates\' practical experience in relevant fields and problem-solving abilities.';
      }

      const data = await response.json();
      return data?.choices?.[0]?.message?.content?.trim() || (language === 'zh'
        ? '根據您的需求，我們建議尋找具有扎實技術基礎、良好溝通能力，且具備團隊合作精神的應徵者。特別注重應徵者在相關領域的實務經驗，以及解決問題的能力。'
        : 'Based on your requirements, we recommend looking for candidates with solid technical foundations, good communication skills, and team spirit. Special attention should be paid to candidates\' practical experience in relevant fields and problem-solving abilities.');
    } catch (error) {
      console.error('AI Analysis Error:', error);
      return language === 'zh'
        ? '根據您的需求，我們建議尋找具有扎實技術基礎、良好溝通能力，且具備團隊合作精神的應徵者。特別注重應徵者在相關領域的實務經驗，以及解決問題的能力。'
        : 'Based on your requirements, we recommend looking for candidates with solid technical foundations, good communication skills, and team spirit. Special attention should be paid to candidates\' practical experience in relevant fields and problem-solving abilities.';
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userInput = input.trim();
    const newMessages: Message[] = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const updatedTalentDemandFormData = { ...talentDemandFormData, [currentTalentField]: userInput };
    setTalentDemandFormData(updatedTalentDemandFormData);

    const nextField = getNextTalentField(updatedTalentDemandFormData);

    if (nextField) {
      // Continue asking for next field
      setCurrentTalentField(nextField);
      const assistantQuestion = language === 'zh' 
        ? `好的，${talentLabels[nextField].zh}是什麼呢？`
        : `Okay, what is the ${talentLabels[nextField].en}?`;
      setMessages(prev => [...prev, { role: 'assistant', content: assistantQuestion }]);
    } else {
      // All fields collected, summarize and ask for confirmation
      setFinishedTalentDemand(true);
      setCompanyFormData(prev => ({ ...prev, ...updatedTalentDemandFormData }));

      const summary = talentRequiredFields.map(key => `🔹 ${talentLabels[key][language]}：${updatedTalentDemandFormData[key]}`).join('\n');
      const confirmHeader = language === 'zh' ? '重複確認一次您的需求... ✅' : 'Confirm your requirements... ✅';
      const analysis = await getAIAnalysis(updatedTalentDemandFormData as Record<TalentFieldKey, string>);
          const analysisHeader = language === 'zh' ? '📊 分析報告摘要' : '📊 Summary';

          setMessages(prev => [
            ...prev,
            { role: 'assistant', content: `${confirmHeader}\n\n${summary}\n\n${analysisHeader}\n${analysis}` },
          ]);
    }
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleBack = () => {
    // Depending on the state, go back to previous step or company dashboard
    // For now, let's assume going back to company photos upload page if not finished talent demand
    if (!finishedTalentDemand) {
      navigate('/company/photos-upload');
    } else {
      navigate('/company/dashboard'); // Or some main company dashboard
    }
  };

  const handleGo = () => {
    // When GO is clicked, proceed to search for talent
    setCompanyFormData(prev => ({ ...prev, ...talentDemandFormData }));
    navigate('/company/results'); // Navigate to the candidate results page
  };

  const handleModify = () => {
    // When modify is clicked, allow user to re-enter fields
    setFinishedTalentDemand(false); // Reset finished state
    setMessages(prev => [
      ...prev,
      { role: 'assistant', content: language === 'zh' ? '請說明修改內容，我直接幫您新增。': 'Please explain the changes, and I will update them directly.' },
      { role: 'assistant', content: language === 'zh' ? '重複確認一次您的需求... 確認完畢請按GO! ': 'Confirm your requirements... Press GO when done!' },
    ]);
    // Clear previous summary to allow new input
    const newMessages = messages.filter(msg => !msg.content.includes('重複確認一次您的需求') && !msg.content.includes('Confirm your requirements'));
    setMessages(newMessages);
    setCurrentTalentField('talentDemandType'); // Start from the beginning or allow specific field modification
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <button onClick={handleBack} className="text-gray-600 hover:text-gray-900">
          <ArrowLeft size={24} />
          </button>
        <Logo size="small" />
        <div className="flex items-center space-x-4">
          <button onClick={() => handleNavigation('/company/dashboard')} className="text-gray-600 hover:text-gray-900">
            <Home size={24} />
          </button>
          <button onClick={() => handleNavigation('/company/settings')} className="text-gray-600 hover:text-gray-900">
            <Settings size={24} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col space-y-4 max-w-2xl mx-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg p-3 max-w-[80%] ${message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
                }`}
              >
                {message.content.split('\n').map((line, lineIndex) => (
                  <p key={lineIndex}>{line}</p>
                ))}
                {/* Show GO/Modify buttons after summary */}
                {finishedTalentDemand && index === messages.length - 1 && message.role === 'assistant' && (
                  <div className="mt-4 flex gap-2 justify-center">
                    <Button onClick={handleGo} variant="primary" size="small">
                      GO!
                    </Button>
                    <Button onClick={handleModify} variant="secondary" size="small">
                      修改
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </main>

      <footer className="bg-white shadow-md p-4 border-t border-gray-200">
        <div className="max-w-2xl mx-auto flex items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={language === 'zh' ? '輸入您的訊息...' : 'Type your message...'}
            className="flex-1"
            disabled={isLoading || finishedTalentDemand} // Disable input if loading or finished talent demand
          />
          <Button onClick={sendMessage} disabled={!input.trim() || isLoading || finishedTalentDemand}>
            {language === 'zh' ? '發送' : 'Send'}
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default CompanyChatPage;
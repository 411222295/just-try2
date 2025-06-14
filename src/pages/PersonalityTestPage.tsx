import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    value: number;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "在團隊合作中，你通常扮演什麼角色？",
    options: [
      { text: "領導者，負責決策和分配任務", value: 1 },
      { text: "執行者，專注於完成分配的工作", value: 2 },
      { text: "協調者，促進團隊溝通和合作", value: 3 },
      { text: "創新者，提供新想法和解決方案", value: 4 }
    ]
  },
  {
    id: 2,
    text: "面對壓力時，你通常如何應對？",
    options: [
      { text: "制定詳細計劃並按部就班執行", value: 1 },
      { text: "尋求他人建議和支持", value: 2 },
      { text: "保持冷靜，理性分析問題", value: 3 },
      { text: "尋找創新的解決方案", value: 4 }
    ]
  },
  {
    id: 3,
    text: "在學習新技能時，你更傾向於：",
    options: [
      { text: "通過實踐和嘗試來學習", value: 1 },
      { text: "閱讀相關資料和文檔", value: 2 },
      { text: "觀看教學視頻或參加培訓", value: 3 },
      { text: "與他人討論和交流經驗", value: 4 }
    ]
  },
  {
    id: 4,
    text: "在解決問題時，你更注重：",
    options: [
      { text: "效率和結果", value: 1 },
      { text: "過程和細節", value: 2 },
      { text: "團隊合作和溝通", value: 3 },
      { text: "創新和突破", value: 4 }
    ]
  },
  {
    id: 5,
    text: "在與他人溝通時，你更傾向於：",
    options: [
      { text: "直接表達想法和意見", value: 1 },
      { text: "仔細傾聽並理解他人觀點", value: 2 },
      { text: "尋求共識和妥協", value: 3 },
      { text: "提出建設性的建議", value: 4 }
    ]
  }
];

const PersonalityTestPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentPage } = useAppContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleComplete = () => {
    // 計算人格特質得分
    const scores = {
      leadership: 0,    // 領導力
      execution: 0,     // 執行力
      teamwork: 0,      // 團隊合作
      innovation: 0     // 創新能力
    };

    answers.forEach((answer, index) => {
      switch (answer) {
        case 1:
          scores.leadership += 1;
          break;
        case 2:
          scores.execution += 1;
          break;
        case 3:
          scores.teamwork += 1;
          break;
        case 4:
          scores.innovation += 1;
          break;
      }
    });

    // 保存結果並導航到下一頁
    setCurrentPage('photoUpload');
    navigate('/student/photo-upload', { state: { personalityResults: scores } });
  };

  if (showResults) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <div className="py-4 px-6 flex items-center justify-between border-b">
          <button
            onClick={() => setShowResults(false)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回
          </button>
          <Logo size="medium" />
          <div className="w-20" />
        </div>

        <div className="flex-1 px-4 py-8 max-w-2xl mx-auto w-full">
          <h1 className="text-2xl font-bold text-center mb-8">測驗結果分析</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">您的人格特質</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">領導力</span>
                  <span className="text-gray-600">{answers.filter(a => a === 1).length * 20}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${answers.filter(a => a === 1).length * 20}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">執行力</span>
                  <span className="text-gray-600">{answers.filter(a => a === 2).length * 20}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${answers.filter(a => a === 2).length * 20}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">團隊合作</span>
                  <span className="text-gray-600">{answers.filter(a => a === 3).length * 20}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${answers.filter(a => a === 3).length * 20}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">創新能力</span>
                  <span className="text-gray-600">{answers.filter(a => a === 4).length * 20}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${answers.filter(a => a === 4).length * 20}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              variant="primary"
              size="large"
              onClick={handleComplete}
            >
              完成測驗
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="py-4 px-6 flex items-center justify-between border-b">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          返回
        </button>
        <Logo size="medium" />
        <div className="w-20" />
      </div>

      <div className="flex-1 px-4 py-8 max-w-2xl mx-auto w-full">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              問題 {currentQuestionIndex + 1} / {questions.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">{currentQuestion.text}</h2>
          
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.value)}
                className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="secondary"
            size="medium"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            上一題
          </Button>
          <Button
            variant="secondary"
            size="medium"
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            下一題
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalityTestPage; 
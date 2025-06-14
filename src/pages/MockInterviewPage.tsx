import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { Video, Mic, MicOff, VideoOff, MessageSquare, Send, Circle, StopCircle } from 'lucide-react';
import { getRandomQuestions, InterviewQuestion } from '../constants/interviewQuestions';

const MockInterviewPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentPage } = useAppContext();
  const { job } = location.state || {};

  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [interviewQuestions, setInterviewQuestions] = useState<InterviewQuestion[]>([]);
  const [showTimer, setShowTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3分鐘
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 初始化視訊流
    const initializeVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;

        // 初始化錄製器
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          // 這裡可以將錄製的影片保存或上傳
          console.log('錄製完成，影片URL:', url);
        };
      } catch (error) {
        console.error('無法存取視訊裝置:', error);
      }
    };

    initializeVideo();

    // 獲取面試題目
    const questions = getRandomQuestions(5);
    setInterviewQuestions(questions);
    setCurrentQuestion(questions[0]);

    // 清理函數
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  const startRecording = () => {
    if (mediaRecorderRef.current && !isRecording) {
      recordedChunksRef.current = [];
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setShowTimer(true);
      setTimeLeft(180);

      // 開始計時
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setShowTimer(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    setMessages(prev => [...prev, { text: currentMessage, isUser: true }]);
    setCurrentMessage('');
    
    // 模擬面試官回覆
    setTimeout(() => {
      if (currentQuestion?.followUpQuestions && questionIndex < currentQuestion.followUpQuestions.length) {
        setMessages(prev => [...prev, { 
          text: currentQuestion.followUpQuestions![questionIndex], 
          isUser: false 
        }]);
        setQuestionIndex(prev => prev + 1);
      } else {
        // 進入下一個問題
        const nextQuestionIndex = interviewQuestions.indexOf(currentQuestion!) + 1;
        if (nextQuestionIndex < interviewQuestions.length) {
          const nextQuestion = interviewQuestions[nextQuestionIndex];
          setCurrentQuestion(nextQuestion);
          setQuestionIndex(0);
          setMessages(prev => [...prev, { 
            text: nextQuestion.question, 
            isUser: false 
          }]);
        } else {
          // 面試結束
          setMessages(prev => [...prev, { 
            text: "感謝您的參與，面試到此結束。", 
            isUser: false 
          }]);
          stopRecording();
        }
      }
    }, 1000);
  };

  const handleEndInterview = () => {
    if (isRecording) {
      stopRecording();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setCurrentPage('interviewResult');
    navigate('/student/interview-result', { state: { job } });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="py-4 px-6 flex justify-center bg-white shadow-sm">
        <Logo size="medium" />
      </div>
      
      <div className="flex-1 p-4 flex flex-col lg:flex-row gap-4">
        {/* 視訊區域 */}
        <div className="flex-1 bg-white rounded-lg shadow-sm p-4">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {!isVideoEnabled && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <VideoOff className="w-16 h-16 text-white" />
              </div>
            )}
            {showTimer && (
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
                {formatTime(timeLeft)}
              </div>
            )}
          </div>
          
          {/* 控制按鈕 */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full ${
                isVideoEnabled ? 'bg-gray-200 hover:bg-gray-300' : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              {isVideoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </button>
            <button
              onClick={toggleAudio}
              className={`p-3 rounded-full ${
                isAudioEnabled ? 'bg-gray-200 hover:bg-gray-300' : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              {isAudioEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
            </button>
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`p-3 rounded-full ${
                isRecording ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {isRecording ? <StopCircle className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
            </button>
            <button
              onClick={handleEndInterview}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full"
            >
              結束面試
            </button>
          </div>
        </div>

        {/* 聊天區域 */}
        <div className="w-full lg:w-96 bg-white rounded-lg shadow-sm flex flex-col">
          <div className="p-4 border-b">
            <h2 className="font-semibold">面試對話</h2>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            {currentQuestion && (
              <div className="mb-4">
                <div className="bg-blue-100 text-blue-800 p-3 rounded-lg">
                  <p className="font-medium">當前問題：</p>
                  <p>{currentQuestion.question}</p>
                </div>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-4 ${
                  msg.isUser ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    msg.isUser
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="輸入訊息..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterviewPage; 
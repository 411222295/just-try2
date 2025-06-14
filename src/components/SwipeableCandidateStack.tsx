import React, { useState, useEffect } from 'react';
import TalentCard from './TalentCard';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, MessageSquare } from 'lucide-react';
import { CandidateData, CandidateMatchResult } from '../services/talentMatching';

interface SwipeableCandidateStackProps {
  candidates: CandidateMatchResult[];
  onLike: (candidate: CandidateData) => void;
  onSendInterview: (candidate: CandidateData) => void;
  onViewSaved: () => void;
}

const SwipeableCandidateStack: React.FC<SwipeableCandidateStackProps> = ({
  candidates,
  onLike,
  onSendInterview,
  onViewSaved,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentCandidate = candidates[currentIndex];

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (direction === 'right') {
      onLike(currentCandidate.candidate); // 右滑收藏
    } else {
      onSendInterview(currentCandidate.candidate); // 左滑發送面試邀請
    }

    // 循環到下一張卡片
    setCurrentIndex((prev) => (prev + 1) % candidates.length);
  };

  if (!currentCandidate) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h3 className="text-xl font-semibold text-gray-600 mb-4">
          沒有更多人才了
        </h3>
        <p className="text-gray-500 mb-4">
          我們會持續為您尋找合適的人才
        </p>
        <button
          onClick={onViewSaved}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Heart className="w-5 h-5 mr-2" />
          查看收藏的人才
        </button>
      </div>
    );
  }

  return (
    <div className="relative h-[600px] w-full max-w-md mx-auto">
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <TalentCard
            candidate={currentCandidate.candidate}
            matchScore={currentCandidate.matchScore}
            matchingReasons={currentCandidate.matchingReasons}
            onSwipe={handleSwipe}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
        <button
          onClick={() => handleSwipe('left')}
          className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100"
        >
          <MessageSquare className="w-6 h-6 text-blue-500" />
        </button>
        <button
          onClick={() => handleSwipe('right')}
          className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100"
        >
          <Heart className="w-6 h-6 text-red-500" />
        </button>
      </div>

      <button
        onClick={onViewSaved}
        className="absolute top-4 right-4 flex items-center px-3 py-2 bg-white rounded-lg shadow-lg hover:bg-gray-100"
      >
        <Heart className="w-5 h-5 text-red-500 mr-2" />
        收藏列表
      </button>
    </div>
  );
};

export default SwipeableCandidateStack; 
import React, { useState } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import { CandidateData } from '../services/talentMatching';

interface TalentCardProps {
  candidate: CandidateData;
    matchScore: number;
    matchingReasons: string[];
  onSwipe: (direction: 'left' | 'right') => void;
  isPreview?: boolean;
}

const TalentCard: React.FC<TalentCardProps> = ({
  candidate,
  matchScore,
  matchingReasons,
  onSwipe,
  isPreview = false,
}) => {
  const controls = useAnimation();
  const swipeThreshold = 100;
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const handleDragEnd = async (event: any, info: PanInfo) => {
    if (isPreview) return;

    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(offset) > swipeThreshold || Math.abs(velocity) > 500) {
      const direction = offset > 0 ? 'right' : 'left';
      await controls.start({
        x: direction === 'right' ? 500 : -500,
        opacity: 0,
        transition: { duration: 0.2 }
      });
      onSwipe(direction);
    } else {
      controls.start({ x: 0, opacity: 1 });
    }
    setSwipeDirection(null);
  };

  const handleDrag = (event: any, info: PanInfo) => {
    if (isPreview) return;

    if (info.offset.x > 50) {
      setSwipeDirection('right');
    } else if (info.offset.x < -50) {
      setSwipeDirection('left');
    } else {
      setSwipeDirection(null);
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={isPreview ? { left: 0, right: 0, top: 0, bottom: 0 } : { left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      animate={controls}
      className="w-full max-w-md mx-auto select-none"
      whileDrag={{ scale: 1.05 }}
      initial={{ scale: isPreview ? 0.95 : 1, opacity: isPreview ? 0.5 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200" style={{ backgroundColor: '#ffffff' }}>
        {/* 滑動提示圖示 - 左側 */}
        {!isPreview && (
        <div
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-red-500 p-3 rounded-full shadow-lg transition-all duration-200
            ${swipeDirection === 'left' ? 'opacity-100 scale-110' : 'opacity-0 scale-90'}`}
          style={{ backgroundColor: '#ef4444' }}
        >
          <X className="w-6 h-6 text-white" />
        </div>
        )}

        {/* 滑動提示圖示 - 右側 */}
        {!isPreview && (
        <div
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-green-500 p-3 rounded-full shadow-lg transition-all duration-200
            ${swipeDirection === 'right' ? 'opacity-100 scale-110' : 'opacity-0 scale-90'}`}
          style={{ backgroundColor: '#22c55e' }}
        >
          <Heart className="w-6 h-6 text-white" />
        </div>
        )}

        {/* 照片區域 */}
        <div className="relative h-48 bg-gray-100" style={{ backgroundColor: '#f3f4f6' }}>
          <img
            src={candidate.photos?.headshot || 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={candidate.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
          {/* 匹配度標籤 */}
          <div 
            className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full font-semibold shadow-md"
            style={{ backgroundColor: '#3b82f6' }}
          >
            匹配度 {Math.round(matchScore)}%
          </div>
        </div>

        {/* 內容區域 */}
        <div className="p-6 space-y-4 bg-white" style={{ backgroundColor: '#ffffff' }}>
          <div>
            <h3 className="text-xl font-bold text-gray-900" style={{ color: '#111827' }}>{candidate.name}</h3>
            <p className="text-gray-600 mt-1" style={{ color: '#4b5563' }}>{candidate.major} ({candidate.year})</p>
          </div>

          {candidate.school && (
            <div>
              <h4 className="font-semibold text-gray-800" style={{ color: '#1f2937' }}>學歷</h4>
              <p className="text-gray-600 mt-1" style={{ color: '#4b5563' }}>{candidate.school}</p>
              <p className="text-gray-600" style={{ color: '#4b5563' }}>{candidate.major} · {candidate.year}</p>
            </div>
          )}

          <div>
            <h4 className="font-semibold text-gray-800" style={{ color: '#1f2937' }}>專業技能</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {candidate.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  style={{ backgroundColor: '#dbeafe', color: '#1e40af' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {candidate.experience && candidate.experience.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-800" style={{ color: '#1f2937' }}>工作經驗</h4>
              {candidate.experience.map((exp: { company: string; position: string; description: string; duration: string; }, index: number) => (
                <p key={index} className="text-gray-600 mt-1" style={{ color: '#4b5563' }}>
                  {exp.company} - {exp.position} ({exp.duration})
                </p>
              ))}
          </div>
          )}

          {matchingReasons && matchingReasons.length > 0 && (
          <div 
            className="bg-green-50 p-4 rounded-lg border border-green-100"
            style={{ backgroundColor: '#f0fdf4', borderColor: '#dcfce7' }}
          >
            <h4 className="font-semibold text-green-800" style={{ color: '#166534' }}>匹配原因</h4>
            <ul className="mt-2 space-y-1 text-green-700">
                {matchingReasons.map((reason, index) => (
                <li key={index} className="flex items-start" style={{ color: '#15803d' }}>
                  <span className="mr-2">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TalentCard; 
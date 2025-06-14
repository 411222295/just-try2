import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { matchCandidates, sampleCandidates, CandidateData, CandidateMatchResult } from '../services/talentMatching';
import SwipeableCandidateStack from '../components/SwipeableCandidateStack';
import Button from '../components/Button';
import Logo from '../components/Logo';

const CompanyResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { companyFormData, setSavedCandidates } = useAppContext();
  const [matchedCandidates, setMatchedCandidates] = useState<CandidateMatchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [allCandidatesSwiped, setAllCandidatesSwiped] = useState(false);

  useEffect(() => {
    const performMatching = async () => {
      setLoading(true);
      if (companyFormData.talentDemandType) {
        // Perform talent matching based on companyFormData
        const results = matchCandidates(companyFormData, sampleCandidates);
        setMatchedCandidates(results);
        console.log("Matched Candidates:", results);
      } else {
        console.warn("No talent demand data available in companyFormData.");
        // Fallback or display a message if no talent demand is set
        setMatchedCandidates([]);
      }
      setLoading(false);
    };

    performMatching();
  }, [companyFormData]);

  const handleLikeCandidate = (candidate: CandidateData) => {
    setSavedCandidates(prev => [...prev, candidate]);
    console.log('Saved candidate:', candidate.name);
  };

  const handleSendInterviewInvitation = (candidate: CandidateData) => {
    console.log('Sending interview invitation to:', candidate.name);
    navigate('/company/send-interview-invitation', { state: { candidate } });
  };

  const handleViewSaved = () => {
    navigate('/company/saved-candidates');
  };

  const handleAllCandidatesSwiped = () => {
    setAllCandidatesSwiped(true);
    };

  const handleBackToDashboard = () => {
    navigate('/company/dashboard');
  };

  const handleRetalentMatching = () => {
    setAllCandidatesSwiped(false); // Reset to allow re-matching
    // Potentially navigate back to chat to refine demand or just re-run matching with existing data
    navigate('/company/chat');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="py-4 px-6 flex justify-center">
        <Logo size="medium" />
      </div>
      
      <div className="flex-1 px-4 py-8 max-w-xl mx-auto w-full">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : matchedCandidates.length > 0 ? (
          <SwipeableCandidateStack
            candidates={matchedCandidates}
            onLike={handleLikeCandidate}
            onSendInterview={handleSendInterviewInvitation}
            onViewSaved={handleViewSaved}
          />
        ) : (
          <div className="text-center space-y-4 py-12">
            <h3 className="text-2xl font-semibold text-gray-700">沒有找到匹配的人才</h3>
            <p className="text-gray-600">您可以嘗試調整人才需求或返回儀表板。</p>
            <div className="flex flex-col space-y-4 mt-6">
              <Button
                variant="primary"
                size="large"
                onClick={() => navigate('/company/talent-matching')}
              >
                重新篩選人才
              </Button>
              <Button
                variant="secondary"
                size="large"
                onClick={() => navigate('/company/dashboard')}
              >
                返回企業儀表板
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyResultsPage;

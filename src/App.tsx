import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AnimatePresence } from 'framer-motion';

// Pages
import HomePage from './pages/HomePage';
import CompanyRegisterPage from './pages/CompanyRegisterPage';
import CompanyChatPage from './pages/CompanyChatPage';
import CompanyResultsPage from './pages/CompanyResultsPage';
import CandidateViewPage from './pages/CandidateViewPage';
import ChatWithCandidatePage from './pages/ChatWithCandidatePage';
import TalentMatchingPage from './pages/TalentMatchingPage';
import CompanyCulturePage from './pages/company/CompanyCulturePage';
import CompanyPhotosUploadPage from './pages/company/CompanyPhotosUploadPage';
import CompanyRegisterCompletePage from './pages/company/CompanyRegisterCompletePage';
import SendInterviewInvitationPage from './pages/company/SendInterviewInvitationPage';
import SavedCandidatesPage from './pages/company/SavedCandidatesPage';

import StudentRegisterPage from './pages/StudentRegisterPage';
import PersonalityTestPage from './pages/PersonalityTestPage';
import PhotoUploadPage from './pages/PhotoUploadPage';
import ResumeCompletionPage from './pages/ResumeCompletionPage';
import CareerObjectivesPage from './pages/CareerObjectivesPage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import StudentAnalysisPage from './pages/StudentAnalysisPage';
import UploadResumePage from './pages/UploadResumePage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import PreTestPage from './pages/PreTestPage';
import WaitingForResponsePage from './pages/WaitingForResponsePage';
import InterviewInvitationPage from './pages/InterviewInvitationPage';
import RejectionAnalysisPage from './pages/RejectionAnalysisPage';
import MockInterviewPage from './pages/MockInterviewPage';
import InterviewResultPage from './pages/InterviewResultPage';
import JobRecommendationsPage from './pages/JobRecommendationsPage';
import InterviewMessagesPage from './pages/InterviewMessagesPage';
import ResumeMessagesPage from './pages/ResumeMessagesPage';

import UploadPage from './pages/UploadPage';
import ResultPage from './pages/ResultPage';
import JobDetailPage from './pages/JobDetailPage';
import NotificationsPage from './pages/NotificationsPage';
import MessagesPage from './pages/MessagesPage';
import SettingsPage from './pages/SettingsPage';

// Create a wrapper component that uses useLocation
const AppContent = () => {
  const location = useLocation();
  
  return (
    <div className="font-sans text-gray-900">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Common Routes */}
          <Route path="/" element={<HomePage />} />
          
          {/* Company Routes */}
          <Route path="/company/register" element={<CompanyRegisterPage />} />
          <Route path="/company/culture" element={<CompanyCulturePage />} />
          <Route path="/company/photos-upload" element={<CompanyPhotosUploadPage />} />
          <Route path="/company/register-complete" element={<CompanyRegisterCompletePage />} />
          <Route path="/company/chat" element={<CompanyChatPage />} />
          <Route path="/company/results" element={<CompanyResultsPage />} />
          <Route path="/company/candidate-view" element={<CandidateViewPage />} />
          <Route path="/company/chat-with-candidate" element={<ChatWithCandidatePage />} />
          <Route path="/company/talent-matching" element={<TalentMatchingPage />} />
          <Route path="/company/send-interview-invitation" element={<SendInterviewInvitationPage />} />
          <Route path="/company/saved-candidates" element={<SavedCandidatesPage />} />
          
          {/* Student Routes */}
          <Route path="/student/register" element={<StudentRegisterPage />} />
          <Route path="/student/personality-test" element={<PersonalityTestPage />} />
          <Route path="/student/photo-upload" element={<PhotoUploadPage />} />
          <Route path="/student/resume-completion" element={<ResumeCompletionPage />} />
          <Route path="/student/career-objectives" element={<CareerObjectivesPage />} />
          <Route path="/student/skills" element={<SkillsPage />} />
          <Route path="/student/projects" element={<ProjectsPage />} />
          <Route path="/student/analysis" element={<StudentAnalysisPage />} />
          <Route path="/student/upload-resume" element={<UploadResumePage />} />
          <Route path="/student/dashboard" element={<StudentDashboardPage />} />
          <Route path="/student/pre-test" element={<PreTestPage />} />
          <Route path="/student/waiting-for-response" element={<WaitingForResponsePage />} />
          <Route path="/student/interview-invitation" element={<InterviewInvitationPage />} />
          <Route path="/student/rejection-analysis" element={<RejectionAnalysisPage />} />
          <Route path="/student/mock-interview" element={<MockInterviewPage />} />
          <Route path="/student/interview-result" element={<InterviewResultPage />} />
          <Route path="/student/job-recommendations" element={<JobRecommendationsPage />} />
          <Route path="/student/interview-messages" element={<InterviewMessagesPage />} />
          <Route path="/student/resume-messages" element={<ResumeMessagesPage />} />
          
          {/* Other Routes */}
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/job/:id" element={<JobDetailPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;
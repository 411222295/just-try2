import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { Heart, Bell, MessageSquare, Settings } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const TopNavigation: React.FC = () => {
  const navigate = useNavigate();
  const { savedCandidates } = useAppContext();

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Logo size="small" />
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/company/saved-candidates')}
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <Heart className="w-6 h-6" />
              {savedCandidates.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {savedCandidates.length}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate('/notifications')}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <Bell className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigate('/messages')}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <MessageSquare className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation; 
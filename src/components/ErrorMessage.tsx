import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-red-50 border border-red-200 rounded-lg p-4"
    >
      <div className="flex items-start">
        <AlertCircle className="text-red-500 mt-1 mr-3 flex-shrink-0" size={20} />
        <div className="flex-1">
          <p className="text-red-700">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 inline-flex items-center text-sm text-red-600 hover:text-red-700"
            >
              <RefreshCw className="mr-1" size={16} />
              重試
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ErrorMessage; 
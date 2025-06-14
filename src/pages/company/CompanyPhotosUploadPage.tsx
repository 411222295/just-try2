import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, Image as ImageIcon } from 'lucide-react';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import { useAppContext } from '../../context/AppContext';

const CompanyPhotosUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useAppContext();
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBack = () => {
    navigate('/company/culture');
  };

  const handleNext = () => {
    // 儲存照片資料
    navigate('/company/register-complete');
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newPhotos = [...photos, ...files];
    setPhotos(newPhotos);

    // 生成預覽
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    
    // 移除預覽
    URL.revokeObjectURL(previews[index]);
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
  };

  const t = (zh: string, en: string) => language === 'zh' ? zh : en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <header className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-800 flex items-center"
          >
            <ArrowLeft className="mr-1" />
            {t('返回', 'Back')}
          </button>
          <Logo size="small" />
          <div className="w-12 text-right">
            <button onClick={() => setLanguage('zh')} className={language === 'zh' ? 'font-bold' : ''}>繁中</button>
            {' / '}
            <button onClick={() => setLanguage('en')} className={language === 'en' ? 'font-bold' : ''}>EN</button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            {t('上傳公司照片', 'Upload Company Photos')}
          </h1>
          
          <div className="space-y-6">
            <div className="text-center text-gray-600 mb-6">
              {t('請上傳公司環境、團隊活動或工作氛圍的照片', 'Please upload photos of your company environment, team activities, or work atmosphere')}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              
              {previews.length < 6 && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors h-48"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-gray-500 text-sm">
                    {t('點擊上傳照片', 'Click to upload photos')}
                  </span>
                </div>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              multiple
              className="hidden"
            />
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleNext}
              variant="primary"
              size="large"
            >
              {t('下一步', 'Next')}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyPhotosUploadPage; 
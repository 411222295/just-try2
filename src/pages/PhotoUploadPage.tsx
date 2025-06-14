import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';

const PhotoUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentPage, studentFormData, setStudentFormData } = useAppContext();
  const [headshot, setHeadshot] = useState<File | null>(null);
  const [lifestylePhotos, setLifestylePhotos] = useState<File[]>([]);

  const handleHeadshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setHeadshot(e.target.files[0]);
    }
  };

  const handleLifestylePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setLifestylePhotos(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would upload these files to a server
    console.log('Headshot:', headshot);
    console.log('Lifestyle Photos:', lifestylePhotos);

    // Update student form data with photo info (e.g., URLs after upload)
    setStudentFormData(prev => ({
      ...prev,
      photos: {
        headshot: headshot ? headshot.name : '',
        lifestyle: lifestylePhotos.map(photo => photo.name),
      },
    }));

    setCurrentPage('careerObjectives');
    navigate('/student/career-objectives');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="py-4 px-6 flex justify-center">
        <Logo size="medium" />
      </div>
      
      <div className="flex-1 px-4 py-8 max-w-xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-bold text-center mb-6">提供個人照片</h1>

          <div>
            <label htmlFor="headshot" className="block text-lg font-medium text-gray-700 mb-2">大頭照 (一張)</label>
            <input
              type="file"
              id="headshot"
              name="headshot"
              accept="image/*"
              onChange={handleHeadshotChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
              required
            />
            {headshot && <p className="mt-2 text-sm text-gray-500">已選擇: {headshot.name}</p>}
          </div>

          <div>
            <label htmlFor="lifestyle-photos" className="block text-lg font-medium text-gray-700 mb-2">生活照 (1-2張)</label>
            <input
              type="file"
              id="lifestyle-photos"
              name="lifestyle-photos"
              accept="image/*"
              multiple
              onChange={handleLifestylePhotosChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
            />
            {lifestylePhotos.length > 0 && (
              <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
                {lifestylePhotos.map((photo, index) => (
                  <li key={index}>{photo.name}</li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
            >
              下一步
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PhotoUploadPage; 
import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaCamera, FaTrash } from 'react-icons/fa';

const ProfileEdit = ({ onProfileUpdate }) => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: ''
  });
  const [avatar, setAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.avatar ? `/storage/${user.avatar}` : null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setFormData({
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      phone: user?.phone || ''
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      const response = await api.post('/api/profile/remove-avatar');
      
      // Update user in context
      updateUser({
        ...user,
        avatar: null
      });
      
      // Reset preview and avatar state
      setPreviewUrl(null);
      setAvatar(null);
      
      // Show success message
      setMessage('Аватар удален');
    } catch (error) {
      console.error('Error removing avatar:', error);
      
      // More detailed error logging
      const errorMessage = error.response?.data?.message || 
                           error.response?.data?.error || 
                           error.message || 
                           'Не удалось удалить аватар';
      
      setMessage(errorMessage);
      
      // If there's a specific error from the server, log it
      if (error.response) {
        console.error('Server Error Details:', {
          status: error.response.status,
          data: error.response.data
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Get CSRF token first
      await api.get('/sanctum/csrf-cookie');

      const formPayload = new FormData();
      if (formData.first_name !== user?.first_name) {
        formPayload.append('first_name', formData.first_name);
      }
      if (formData.last_name !== user?.last_name) {
        formPayload.append('last_name', formData.last_name);
      }
      if (formData.phone !== user?.phone) {
        formPayload.append('phone', formData.phone);
      }
      if (avatar) {
        formPayload.append('avatar', avatar);
      }

      const response = await api.post('/api/profile/update', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (onProfileUpdate) {
        onProfileUpdate(response.data.user);
      }
      
      // Update user in context
      updateUser(response.data.user);
      
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setMessage('Профиль успешно обновлен');
    } catch (error) {
      console.error('Error updating profile:', error);
      console.error('Full error response:', error.response);
      
      // More detailed error handling
      const errorMessage = error.response?.data?.message || 
                           error.response?.data?.error || 
                           error.message || 
                           'Произошла ошибка при обновлении профиля';
      
      setMessage(errorMessage);
      
      // If there's a specific error from the server, log it
      if (error.response) {
        console.error('Server Error Details:', {
          status: error.response.status,
          data: error.response.data
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Личные данные
        </h3>

        {/* Аватар */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Аватар" 
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <FaUser className="text-gray-500 dark:text-gray-400 text-3xl" />
              </div>
            )}
            
            <label 
              htmlFor="avatar-upload" 
              className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 cursor-pointer hover:bg-indigo-700"
            >
              <FaCamera className="w-4 h-4" />
              <input 
                type="file" 
                id="avatar-upload"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          
          {previewUrl && (
            <button
              type="button"
              onClick={handleRemoveAvatar}
              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 flex items-center space-x-2 text-sm"
            >
              <FaTrash />
              <span>Удалить фото</span>
            </button>
          )}
        </div>

        {/* Форма */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Имя
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Фамилия
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-500 dark:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Телефон
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Сообщение */}
      {message && (
        <div className={`text-sm ${message.includes('ошибка') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </div>
      )}

      {/* Кнопка */}
      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Сохранение...' : 'Сохранить изменения'}
        </button>
      </div>
    </form>
  );
};

export default ProfileEdit;

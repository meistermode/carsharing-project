import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/20/solid';
import axios from 'axios';

const TariffCard = ({ tariff, index }) => {
  const parseJson = (jsonString) => {
    // Если уже массив, возвращаем как есть
    if (Array.isArray(jsonString)) {
      return jsonString;
    }

    try {
      // Если строка, пытаемся распарсить
      if (typeof jsonString === 'string') {
        // Декодируем строку, если она закодирована
        const decodedString = jsonString.replace(/\\u[\dA-F]{4}/gi, 
          function (match) {
            return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
          }
        );
        
        return JSON.parse(decodedString);
      }
      
      // Если что-то другое, возвращаем пустой массив
      return [];
    } catch (error) {
      // Если не удалось распарсить, возвращаем пустой массив
      console.error('Error parsing JSON:', error, jsonString);
      return [];
    }
  };

  const cars = parseJson(tariff.cars);
  const features = parseJson(tariff.features);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.5, 
        type: 'spring', 
        stiffness: 100 
      }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft hover:shadow-lg transform transition-colors-all duration-300 hover:scale-[1.02] border-l-4 border-indigo-500 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-200 tracking-tight">{tariff.name}</h3>
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-100 dark:bg-indigo-800/30 px-3 py-1 rounded-full text-sm">
            {tariff.price_per_minute} ₽/мин
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{tariff.description}</p>

        <div className="mb-4">
          <h4 className="text-md font-semibold text-indigo-900 dark:text-indigo-200 mb-2 tracking-tight">Автомобили:</h4>
          <div className="flex flex-wrap gap-2">
            {cars.map((car, idx) => (
              <span 
                key={idx} 
                className="bg-indigo-100 dark:bg-indigo-800/30 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded-md text-sm"
              >
                {car}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-md font-semibold text-indigo-900 dark:text-indigo-200 mb-2 tracking-tight">Особенности:</h4>
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li 
                key={idx} 
                className="flex items-center text-gray-700 dark:text-gray-300"
              >
                <CheckIcon className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
                <span className="leading-tight">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const Tariffs = () => {
  const [tariffs, setTariffs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTariffs = async () => {
        try {
          setIsLoading(true);
          const token = localStorage.getItem('token');
          const headers = token 
            ? { 'Authorization': `Bearer ${token}` } 
            : {};
          
          const response = await axios.get('http://localhost:8000/api/tariffs', { headers });
          setTariffs(response.data);
        } catch (err) {
          console.error('Error fetching tariffs:', err);
          setError('Не удалось загрузить тарифы');
        } finally {
          setIsLoading(false);
        }
      };

    fetchTariffs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-indigo-900 dark:text-indigo-200 mb-4 tracking-tight">
            Наши Тарифы
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-medium">
            Выберите идеальный тариф для вашего комфортного передвижения
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 dark:text-red-400">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tariffs.map((tariff, index) => (
              <TariffCard key={tariff.id} tariff={tariff} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tariffs;

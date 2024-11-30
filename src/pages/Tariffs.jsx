import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 border-l-4 border-indigo-500 flex flex-col h-full"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-200">
          {tariff.name}
        </h3>
        <span className="text-sm bg-indigo-100 dark:bg-indigo-800/30 text-indigo-600 dark:text-indigo-400 font-medium px-3 py-1 rounded-full">
          {tariff.category}
        </span>
      </div>

      <div className="mb-6">
        <div className="text-3xl font-bold text-indigo-900 dark:text-indigo-200">
          {tariff.price_per_minute} ₽
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">/ мин</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{tariff.description}</p>
      </div>

      <div className="flex-grow">
        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="mr-2 text-indigo-500 dark:text-indigo-400 flex-shrink-0">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const TripCalculator = () => {
  const [duration, setDuration] = useState(30);
  const [selectedTariff, setSelectedTariff] = useState('comfort');
  
  const tariffRates = {
    economy: 8,
    comfort: 12,
    business: 16,
    premium: 20
  };

  const calculateCost = () => {
    const rate = tariffRates[selectedTariff];
    return (duration * rate).toFixed(0);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-8">
      <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-200 mb-6">
        Калькулятор поездки
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Длительность поездки (минут)
            </label>
            <input
              type="range"
              min="10"
              max="180"
              step="5"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="text-right text-sm text-gray-600 dark:text-gray-400 mt-1">
              {duration} мин
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Тариф
            </label>
            <select
              value={selectedTariff}
              onChange={(e) => setSelectedTariff(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="economy">Эконом</option>
              <option value="comfort">Комфорт</option>
              <option value="business">Бизнес</option>
              <option value="premium">Премиум</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6">
          <div className="text-center">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Примерная стоимость поездки
            </div>
            <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              {calculateCost()} ₽
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TariffFAQ = () => {
  const faqs = [
    {
      question: 'Как рассчитывается стоимость поездки?',
      answer: 'Стоимость поездки складывается из времени аренды и выбранного тарифа. Тариф включает в себя топливо, страховку и парковку в разрешенных зонах.'
    },
    {
      question: 'Могу ли я сменить тариф во время поездки?',
      answer: 'Да, вы можете изменить тариф в любой момент через приложение. Новый тариф начнет действовать сразу после смены.'
    },
    {
      question: 'Есть ли скидки при длительной аренде?',
      answer: 'Да, при аренде от 3 часов действуют специальные пакетные тарифы со скидкой до 20%. Подробности в разделе пакетных предложений.'
    },
    {
      question: 'Включено ли топливо в стоимость?',
      answer: 'Да, стоимость топлива включена в тариф. Вы можете заправлять автомобиль нашей топливной картой без дополнительных затрат.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-8"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-200 mb-2">
          Частые вопросы о тарифах
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Всё, что нужно знать о наших тарифах
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6"
          >
            <h4 className="font-bold text-lg text-indigo-900 dark:text-indigo-200 mb-2">
              {faq.question}
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              {faq.answer}
            </p>
          </motion.div>
        ))}
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-indigo-900 dark:text-indigo-200 mb-4">
            Тарифы и Условия
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Выберите идеальный тариф для вашего комфортного передвижения
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <div className="col-span-4 flex justify-center items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500"></div>
            </div>
          ) : error ? (
            <div className="col-span-4 text-center text-red-600 dark:text-red-400">
              {error}
            </div>
          ) : (
            tariffs.map((tariff, index) => (
              <TariffCard key={tariff.id} tariff={tariff} index={index} />
            ))
          )}
        </div>

        <TripCalculator />
        <TariffFAQ />
      </div>
    </div>
  );
};

export default Tariffs;

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  SparklesIcon, 
  CreditCardIcon, 
  ClockIcon 
} from '@heroicons/react/24/solid';

const Home = () => {
  const features = [
    {
      icon: SparklesIcon,
      title: 'Новые автомобили',
      description: 'Современный автопарк с последними моделями'
    },
    {
      icon: CreditCardIcon,
      title: 'Доступные цены',
      description: 'От 4 ₽/минута'
    },
    {
      icon: ClockIcon,
      title: 'Быстрый старт',
      description: 'Начните поездку за 2 минуты'
    },
    {
      icon: SparklesIcon,
      title: 'Большой выбор',
      description: '14 автомобилей в автопарке'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 overflow-hidden"
    >
      <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto py-16 sm:py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Каршеринг в Соликамске
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Арендуйте автомобиль прямо сейчас. От эконом до премиум класса.
              Быстро, удобно и по доступным ценам.
            </p>
            <Link
              to="/cars"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-200 shadow-sm hover:shadow-lg"
            >
              Выбрать автомобиль
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="h-full bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
                <div className="flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 mb-3 sm:mb-4 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                  <feature.icon className="w-5 sm:w-6 h-5 sm:h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-indigo-50 dark:bg-indigo-900/30 p-8 sm:p-12 rounded-2xl"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Начните свое путешествие
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 max-w-xl mx-auto">
            Выберите автомобиль, который идеально подходит для вашей поездки
          </p>
          <Link
            to="/cars"
            className="inline-flex items-center px-5 sm:px-6 py-2 sm:py-3 text-sm sm:text-base border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-200"
          >
            Посмотреть автомобили
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;

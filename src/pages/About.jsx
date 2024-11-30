import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  const features = [
    {
      title: 'Простая регистрация',
      description: 'Зарегистрируйтесь через приложение за пару минут',
      icon: 'https://api.iconify.design/heroicons:user-plus-20-solid.svg',
    },
    {
      title: 'Выбор автомобиля',
      description: 'Выберите подходящий автомобиль из нашего автопарка',
      icon: 'https://api.iconify.design/heroicons:truck-20-solid.svg',
    },
    {
      title: 'Бронирование',
      description: 'Забронируйте автомобиль на удобное время',
      icon: 'https://api.iconify.design/heroicons:calendar-20-solid.svg',
    },
    {
      title: 'Начало поездки',
      description: 'Откройте автомобиль с помощью приложения и начните поездку',
      icon: 'https://api.iconify.design/heroicons:key-20-solid.svg',
    },
  ];

  const benefits = [
    {
      title: 'Доступные цены',
      description: 'Выгодные тарифы для поездок любой длительности',
    },
    {
      title: 'Страховка включена',
      description: 'Все автомобили застрахованы по ОСАГО и КАСКО',
    },
    {
      title: 'Поддержка 24/7',
      description: 'Служба поддержки всегда на связи',
    },
    {
      title: 'Бесплатная парковка',
      description: 'Бесплатная парковка на городских парковках',
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <div className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
            >
              Каршеринг в Соликамске
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300"
            >
              Мы делаем передвижение по городу удобным и доступным. 
              Арендуйте автомобиль в любое время суток и отправляйтесь куда угодно.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="rounded-2xl bg-gray-50 dark:bg-gray-700 p-6 h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500">
                    <img 
                      src={feature.icon}
                      className="h-6 w-6"
                      alt=""
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Преимущества нашего сервиса
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 h-full">
                  <div className="absolute -top-3 left-6 px-4 py-1 bg-indigo-600 dark:bg-indigo-500 rounded-full">
                    <span className="text-sm font-medium text-white">#{index + 1}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl bg-indigo-600 dark:bg-indigo-500 px-6 py-10 sm:px-12 sm:py-16">
            <div className="relative mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Готовы начать?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-indigo-50">
                Присоединяйтесь к нашему сервису каршеринга прямо сейчас и получите доступ к автопарку в Соликамске
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link
                  to="/cars"
                  className="rounded-lg bg-white px-6 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50 transition-colors duration-200"
                >
                  Выбрать автомобиль
                </Link>
                <Link
                  to="/tariffs"
                  className="rounded-lg bg-indigo-500 dark:bg-indigo-400 px-6 py-3 text-base font-medium text-white hover:bg-indigo-400 dark:hover:bg-indigo-300 transition-colors duration-200"
                >
                  Посмотреть тарифы
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

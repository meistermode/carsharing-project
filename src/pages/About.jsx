import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  ClockIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserGroupIcon,
  WrenchIcon
} from '@heroicons/react/24/outline';

const CompanyStory = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold text-indigo-900 dark:text-indigo-200 mb-4">
            Первый каршеринг в Соликамске
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Мы запустили первый сервис каршеринга в Соликамске в 2023 году. Наша миссия - 
              сделать передвижение по городу доступным и комфортным для каждого жителя.
            </p>
            <p>
              В нашем автопарке представлены популярные модели автомобилей в отличном состоянии. 
              Все машины регулярно проходят техническое обслуживание и оснащены современными 
              системами безопасности.
            </p>
            <p>
              Мы стремимся развивать транспортную инфраструктуру города и делать жизнь 
              соликамцев более комфортной и мобильной.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">14</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Автомобилей</div>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">1000+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Поездок</div>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">4.8</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Рейтинг</div>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">24/7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Поддержка</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ServiceAdvantages = () => {
  const advantages = [
    {
      icon: ClockIcon,
      title: 'Круглосуточная доступность',
      description: 'Автомобили доступны для аренды в любое время дня и ночи'
    },
    {
      icon: BanknotesIcon,
      title: 'Выгодные тарифы',
      description: 'Прозрачное ценообразование и доступные цены для всех'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Полная страховка',
      description: 'Все автомобили застрахованы по ОСАГО и КАСКО'
    },
    {
      icon: SparklesIcon,
      title: 'Чистые автомобили',
      description: 'Регулярная мойка и уборка салона каждого автомобиля'
    },
    {
      icon: UserGroupIcon,
      title: 'Поддержка клиентов',
      description: 'Оперативная помощь в любой ситуации 24/7'
    },
    {
      icon: WrenchIcon,
      title: 'Техобслуживание',
      description: 'Регулярное ТО и контроль состояния автомобилей'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-8"
    >
      <h2 className="text-3xl font-bold text-indigo-900 dark:text-indigo-200 mb-8 text-center">
        Преимущества сервиса
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advantages.map((advantage, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl"
          >
            <advantage.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {advantage.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {advantage.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const OurMission = () => {
  const values = [
    {
      title: 'Доступность',
      description: 'Делаем каршеринг доступным для всех жителей Соликамска с понятными тарифами и простыми условиями'
    },
    {
      title: 'Надежность',
      description: 'Все автомобили проходят регулярное ТО и содержатся в идеальном состоянии'
    },
    {
      title: 'Комфорт',
      description: 'Современные автомобили с полным набором необходимых опций для комфортных поездок'
    },
    {
      title: 'Забота',
      description: 'Оперативная поддержка и помощь в любой ситуации для наших клиентов'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-8"
    >
      <h2 className="text-3xl font-bold text-indigo-900 dark:text-indigo-200 mb-8 text-center">
        Наши Принципы
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {values.map((value, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl"
          >
            <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-200 mb-2">
              {value.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {value.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const ContactInfo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-8"
    >
      <h2 className="text-3xl font-bold text-indigo-900 dark:text-indigo-200 mb-8 text-center">
        Свяжитесь с Нами
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center space-x-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
          <MapPinIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <div>
            <h3 className="font-semibold text-indigo-900 dark:text-indigo-200">Адрес</h3>
            <p className="text-gray-600 dark:text-gray-300">ул. 20-летия Победы, 173Б</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
          <PhoneIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <div>
            <h3 className="font-semibold text-indigo-900 dark:text-indigo-200">Телефон</h3>
            <p className="text-gray-600 dark:text-gray-300">+7 (919) 714-77-77</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
          <EnvelopeIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <div>
            <h3 className="font-semibold text-indigo-900 dark:text-indigo-200">Email</h3>
            <p className="text-gray-600 dark:text-gray-300">info@carsharing-solikamsk.ru</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-indigo-900 dark:text-indigo-200 mb-4">
            О Нашем Сервисе
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Первый сервис каршеринга в Соликамске
          </p>
        </div>

        <CompanyStory />
        <ServiceAdvantages />
        <OurMission />
        <ContactInfo />
      </div>
    </div>
  );
};

export default About;

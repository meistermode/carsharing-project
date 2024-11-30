import React from 'react';
import { motion } from 'framer-motion';
import { FaCarAlt, FaCar, FaClock, FaMoneyBillWave } from 'react-icons/fa';
import { formatDuration } from '../utils/timeUtils';

const UserStats = ({ stats }) => {
  const userStatsCards = [
    {
      title: 'Всего поездок',
      value: stats.totalRides,
      icon: <FaCarAlt className="text-sky-600 dark:text-sky-400" />,
      bgColor: 'bg-sky-100 dark:bg-sky-900/50',
      textColor: 'text-sky-700 dark:text-sky-300'
    },
    {
      title: 'Активные поездки',
      value: stats.activeRides,
      icon: <FaCar className="text-emerald-600 dark:text-emerald-400" />,
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/50',
      textColor: 'text-emerald-700 dark:text-emerald-300'
    },
    {
      title: 'Время в пути',
      value: formatDuration(stats.totalMinutes),
      icon: <FaClock className="text-violet-600 dark:text-violet-400" />,
      bgColor: 'bg-violet-100 dark:bg-violet-900/50',
      textColor: 'text-violet-700 dark:text-violet-300'
    },
    {
      title: 'Потрачено',
      value: `${stats.totalSpent.toFixed(0)} ₽`,
      icon: <FaMoneyBillWave className="text-teal-600 dark:text-teal-400" />,
      bgColor: 'bg-teal-100 dark:bg-teal-900/50',
      textColor: 'text-teal-700 dark:text-teal-300'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {userStatsCards.map((card, index) => (
        <div 
          key={index} 
          className={`${card.bgColor} p-4 rounded-xl flex items-center space-x-4 shadow-sm`}
        >
          <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-md">
            {card.icon}
          </div>
          <div>
            <p className={`text-sm ${card.textColor}`}>{card.title}</p>
            <p className={`text-xl font-bold ${card.textColor}`}>{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStats;

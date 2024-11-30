import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCarSide } from 'react-icons/fa';
import { formatBookingDate } from '../utils/dateUtils';
import { formatDuration } from '../utils/timeUtils';

const RideStatus = ({ status }) => {
  const statusStyles = {
    active: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800',
    completed: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
  };

  const statusText = {
    active: 'Активна',
    completed: 'Завершена'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
      {statusText[status]}
    </span>
  );
};

const RidesSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    {[1, 2, 3].map((_, index) => (
      <div key={index} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
    ))}
  </div>
);

const getSecondsWord = (seconds) => {
  if (seconds === 1) return 'секунда';
  if (seconds < 5) return 'секунды';
  return 'секунд';
};

const RideCard = React.memo(({ ride, index }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const isActive = ride.status === 'active';

  useEffect(() => {
    let intervalId;
    if (isActive) {
      intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isActive]);

  const { dateString, remainingMinutes, remainingSeconds } = formatBookingDate(ride.startDate, ride.endDate, currentTime);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center justify-between"
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img 
            src={`/images/cars/${ride.carImage}`}
            alt={ride.carModel} 
            className="w-16 h-16 rounded-xl object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {ride.carModel}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {dateString}
          </p>
          {isActive && (
            <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
              Осталось: {remainingMinutes < 1 
                ? `${remainingSeconds} ${getSecondsWord(remainingSeconds)}`
                : formatDuration(remainingMinutes)
              }
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end space-y-2">
        <RideStatus status={ride.status} />
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          {ride.price}₽
        </p>
      </div>
    </motion.div>
  );
});

const RidesList = ({ rides, isLoading }) => {
  if (isLoading) {
    return <RidesSkeleton />;
  }

  if (!rides || rides.length === 0) {
    return (
      <div className="text-center py-12">
        <FaCarSide className="mx-auto text-gray-400 dark:text-gray-500 text-5xl mb-4" />
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">У вас пока нет поездок</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Выберите автомобиль и отправляйтесь в путь!</p>
        <Link 
          to="/cars" 
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
        >
          Выбрать автомобиль
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {rides.map((ride, index) => (
        <RideCard key={ride.id} ride={ride} index={index} />
      ))}
    </div>
  );
};

export default RidesList;

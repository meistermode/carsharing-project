export const formatBookingDate = (startDate, endDate, currentTime = new Date()) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const options = {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric'
  };

  const dateString = `${start.toLocaleDateString('ru-RU', options)} - ${end.toLocaleDateString('ru-RU', options)}`;
  
  // Рассчитываем оставшееся время
  const remainingMs = end - currentTime;
  const remainingMinutes = Math.max(0, remainingMs / (1000 * 60));
  const remainingSeconds = Math.max(0, Math.floor(remainingMs / 1000));

  return {
    dateString,
    remainingMinutes,
    remainingSeconds
  };
};

export const calculateRemainingMinutes = (endDate) => {
  const now = new Date();
  const diffMs = endDate - now;
  
  if (diffMs <= 0) return 0;

  // Возвращаем точное количество минут с десятичной частью
  return diffMs / (1000 * 60);
};

export const calculateRemainingTime = (endDate) => {
  const now = new Date();
  const diffMs = endDate - now;
  
  if (diffMs <= 0) return 'Завершено';

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days} ${getDaysWord(days)}`;
  if (hours > 0) return `${hours} ${getHoursWord(hours)}`;
  return `${minutes} ${getMinutesWord(minutes)}`;
};

const getDaysWord = (days) => {
  if (days % 10 === 1 && days % 100 !== 11) return 'день';
  if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100)) return 'дня';
  return 'дней';
};

const getHoursWord = (hours) => {
  if (hours % 10 === 1 && hours % 100 !== 11) return 'час';
  if ([2, 3, 4].includes(hours % 10) && ![12, 13, 14].includes(hours % 100)) return 'часа';
  return 'часов';
};

const getMinutesWord = (minutes) => {
  if (minutes % 10 === 1 && minutes % 100 !== 11) return 'минута';
  if ([2, 3, 4].includes(minutes % 10) && ![12, 13, 14].includes(minutes % 100)) return 'минуты';
  return 'минут';
};

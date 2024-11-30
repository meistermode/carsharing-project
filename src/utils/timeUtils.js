export const formatDuration = (minutes) => {
  if (minutes < 1) {
    // Если меньше минуты, конвертируем в секунды
    const seconds = Math.max(Math.floor(minutes * 60), 0);
    return `${seconds} ${getSecondsWord(seconds)}`;
  }

  const days = Math.floor(minutes / (24 * 60));
  const hours = Math.floor((minutes % (24 * 60)) / 60);
  const remainingMinutes = Math.floor(minutes % 60);

  const parts = [];
  
  if (days > 0) {
    parts.push(`${days} ${getDaysWord(days)}`);
  }
  if (hours > 0) {
    parts.push(`${hours} ${getHoursWord(hours)}`);
  }
  if (remainingMinutes > 0 || parts.length === 0) {
    parts.push(`${remainingMinutes} ${getMinutesWord(remainingMinutes)}`);
  }

  return parts.join(' ');
};

export const getDaysWord = (days) => {
  const lastDigit = days % 10;
  const lastTwoDigits = days % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'дней';
  if (lastDigit === 1) return 'день';
  if (lastDigit >= 2 && lastDigit <= 4) return 'дня';
  return 'дней';
};

export const getHoursWord = (hours) => {
  const lastDigit = hours % 10;
  const lastTwoDigits = hours % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'часов';
  if (lastDigit === 1) return 'час';
  if (lastDigit >= 2 && lastDigit <= 4) return 'часа';
  return 'часов';
};

export const getMinutesWord = (minutes) => {
  const lastDigit = minutes % 10;
  const lastTwoDigits = minutes % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'минут';
  if (lastDigit === 1) return 'минута';
  if (lastDigit >= 2 && lastDigit <= 4) return 'минуты';
  return 'минут';
};

export const getSecondsWord = (seconds) => {
  const lastDigit = seconds % 10;
  const lastTwoDigits = seconds % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'секунд';
  if (lastDigit === 1) return 'секунда';
  if (lastDigit >= 2 && lastDigit <= 4) return 'секунды';
  return 'секунд';
};

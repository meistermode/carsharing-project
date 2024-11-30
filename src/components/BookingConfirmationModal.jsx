import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPrice } from '../utils/format';

const BookingConfirmationModal = ({ isOpen, onClose, onConfirm, booking }) => {
  if (!isOpen || !booking) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full shadow-xl overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Подтверждение бронирования
            </h2>
            
            <div className="space-y-6">
              {/* Информация об автомобиле */}
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src={`/images/cars/${booking.car.image}`}
                    alt={booking.car.model}
                    className="w-32 h-32 rounded-xl object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    {booking.car.model}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {booking.car.description}
                  </p>
                </div>
              </div>

              {/* Детали бронирования */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Начало аренды</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatDate(booking.startDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Окончание аренды</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatDate(booking.endDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Длительность</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {booking.duration} ч
                  </span>
                </div>
                {booking.options.length > 0 && (
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Дополнительные опции:</span>
                    <ul className="mt-1 space-y-1">
                      {booking.options.map(option => (
                        <li key={option.id} className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{option.name}</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {formatPrice(option.price)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Итоговая стоимость */}
              <div className="flex justify-between items-center text-lg font-semibold">
                <span className="text-gray-900 dark:text-white">Итого к оплате</span>
                <span className="text-indigo-600 dark:text-indigo-400">
                  {formatPrice(booking.totalPrice)}
                </span>
              </div>
            </div>

            {/* Кнопки */}
            <div className="mt-6 flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Отмена
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
              >
                Подтвердить бронирование
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingConfirmationModal;

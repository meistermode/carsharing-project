import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition, RadioGroup } from '@headlessui/react';
import { 
  XMarkIcon,
  ArrowLeftIcon,
  CheckIcon
} from '@heroicons/react/20/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPrice } from '../utils/format';
import { formatDuration } from '../utils/timeUtils';
import Notification from './Notification';
import BookingConfirmationModal from './BookingConfirmationModal';

const durations = [
  { name: '1 час', value: 60 },
  { name: '3 часа', value: 180 },
  { name: '6 часов', value: 360 },
  { name: '1 день', value: 1440 },
];

const EXTRA_SERVICES = [
  { 
    id: 'insurance', 
    name: 'Расширенная страховка', 
    price: 500, 
    description: 'Полное покрытие рисков' 
  },
  { 
    id: 'childSeat', 
    name: 'Детское кресло', 
    price: 300, 
    description: 'Безопасность для детей' 
  }
];

const BookingModal = ({ isOpen, setIsOpen, car, onBookingSuccess, availableCars }) => {
  const [step, setStep] = useState('booking'); // 'booking' или 'confirmation'
  const [selectedDuration, setSelectedDuration] = useState(durations[0]);
  const [isCustomDuration, setIsCustomDuration] = useState(false);
  const [customDuration, setCustomDuration] = useState({
    days: '',
    hours: '',
    minutes: ''
  });
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [extras, setExtras] = useState({
    insurance: false,
    childSeat: false,
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleCustomDurationChange = (field, value) => {
    if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 0)) {
      setCustomDuration(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const calculateTotalMinutes = () => {
    if (!isCustomDuration) return selectedDuration.value;
    
    const days = parseInt(customDuration.days) || 0;
    const hours = parseInt(customDuration.hours) || 0;
    const minutes = parseInt(customDuration.minutes) || 0;
    
    return (days * 24 * 60) + (hours * 60) + minutes;
  };

  const calculatePrice = () => {
    if (!car) return 0;
    const totalMinutes = calculateTotalMinutes();
    let total = totalMinutes * car.pricePerMinute;
    if (selectedExtras.includes('insurance')) total += 500;
    if (selectedExtras.includes('childSeat')) total += 300;
    return total;
  };

  const isValidCustomDuration = () => {
    const totalMinutes = calculateTotalMinutes();
    return totalMinutes > 0;
  };

  const handleBook = () => {
    const totalMinutes = calculateTotalMinutes();
    const selectedOptionsData = selectedExtras.map(id => EXTRA_SERVICES.find(opt => opt.id === id));
    const totalPrice = calculatePrice();

    setBookingData({
      car: {
        name: car.name,
        description: car.type,
        image: car.image
      },
      duration: totalMinutes,
      options: selectedOptionsData,
      totalPrice
    });
    setStep('confirmation');
  };

  const handleBack = () => {
    setStep('booking');
  };

  const handleConfirmBooking = async () => {
    try {
      setIsLoading(true);
      
      // Получаем текущее время как начало бронирования
      const startTime = new Date();
      
      // Рассчитываем время окончания бронирования
      const endTime = new Date(startTime);
      endTime.setMinutes(startTime.getMinutes() + calculateTotalMinutes());

      // Подготовка payload для бронирования
      const bookingPayload = {
        car_id: Number(car.id),
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        extras: selectedExtras.map(extraId => ({
          service_id: extraId,
          name: EXTRA_SERVICES.find(s => s.id === extraId).name,
          price: EXTRA_SERVICES.find(s => s.id === extraId).price
        })),
        total_price: calculatePrice()
      };

      const response = await fetch('http://localhost:8000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(bookingPayload)
      });

      if (!response.ok) {
        throw new Error('Ошибка при бронировании');
      }

      const data = await response.json();
      
      // Закрываем модальное окно
      setIsOpen(false);
      setStep('booking');

      // Очищаем форму
      setSelectedDuration(durations[0]);
      setCustomDuration({
        days: '',
        hours: '',
        minutes: ''
      });
      setIsCustomDuration(false);
      setSelectedExtras([]);

      // Показываем уведомление
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      
      // Вызываем колбэк для обновления списка автомобилей
      if (onBookingSuccess) {
        // Передаем правильный ID автомобиля и обновляем его статус
        onBookingSuccess({
          car_id: bookingPayload.car_id,
          ...data
        });
      }

    } catch (error) {
      console.error('Booking Error:', error);
      alert(error.message || 'Произошла ошибка при бронировании');
    } finally {
      setIsLoading(false);
    }
  };

  const renderExtras = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Дополнительные услуги
      </h3>
      <div className="space-y-3">
        {EXTRA_SERVICES.map((service) => (
          <div
            key={service.id}
            className={`relative flex items-center justify-between p-4 rounded-lg border ${
              selectedExtras.includes(service.id)
                ? 'border-indigo-600 dark:border-indigo-500'
                : 'border-gray-200 dark:border-gray-700'
            } hover:border-indigo-600 dark:hover:border-indigo-500 transition-colors cursor-pointer`}
            onClick={() => {
              setSelectedExtras(prev =>
                prev.includes(service.id)
                  ? prev.filter(id => id !== service.id)
                  : [...prev, service.id]
              );
            }}
          >
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                {service.name}
              </h4>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {service.description}
              </p>
            </div>
            <div className="ml-4 flex flex-col items-end">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                +{formatPrice(service.price)}
              </span>
              <div className="mt-1 h-5 w-5">
                {selectedExtras.includes(service.id) && (
                  <CheckIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-500" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="space-y-6">
      {/* Информация об автомобиле */}
      <div className="flex space-x-4">
        <div className="flex-shrink-0">
          <img
            src={car.image}
            alt={car.name}
            className="w-32 h-32 rounded-xl object-cover"
          />
        </div>
        <div className="flex flex-col justify-between py-1 flex-grow">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {car.name}
              </h3>
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                {formatPrice(car.pricePerMinute)}/мин
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {car.category}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {car.type}
              </span>
              <span className="text-gray-400">•</span>
              <div className="flex items-center">
                <span className="text-sm text-yellow-500">★</span>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                  {car.rating}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {car.features.map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-md"
                >
                  {feature}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Адрес:</span> {car.location}
            </p>
          </div>
        </div>
      </div>

      {/* Детали бронирования */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Длительность */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">⏱️</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Длительность аренды
              </span>
            </div>
            <span className="text-base font-semibold text-gray-900 dark:text-white">
              {formatDuration(calculateTotalMinutes())}
            </span>
          </div>
        </div>

        {/* Дополнительные услуги */}
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-gray-400">➕</span>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Дополнительные услуги
            </h3>
          </div>
          
          <div className="space-y-2">
            {selectedExtras.length > 0 ? (
              selectedExtras.map(id => {
                const option = EXTRA_SERVICES.find(opt => opt.id === id);
                return (
                  <div 
                    key={id} 
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {option.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {option.description}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      +{formatPrice(option.price)}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">
                Дополнительные услуги не выбраны
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Итоговая стоимость */}
      <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
        <span className="text-lg font-semibold text-gray-900 dark:text-white">
          Итого к оплате
        </span>
        <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
          {formatPrice(calculatePrice())}
        </span>
      </div>

      {/* Кнопки */}
      <div className="flex space-x-3">
        <button
          onClick={handleBack}
          disabled={isLoading}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white disabled:opacity-50"
        >
          <span className="mr-2">←</span>
          Назад
        </button>
        <button
          onClick={handleConfirmBooking}
          disabled={isLoading}
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Бронирование...
            </span>
          ) : (
            'Подтвердить бронирование'
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Transition show={isOpen} as={Fragment}>
        <Dialog 
          open={isOpen} 
          onClose={() => !isLoading && setIsOpen(false)}
          className="relative z-50"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-4 sm:p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-base sm:text-lg font-medium leading-6 text-gray-900 dark:text-white flex justify-between items-center mb-4">
                    <span>{step === 'booking' ? `Бронирование ${car.name}` : 'Подтверждение бронирования'}</span>
                    <button
                      onClick={() => !isLoading && setIsOpen(false)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      ✕
                    </button>
                  </Dialog.Title>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: step === 'booking' ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: step === 'booking' ? 20 : -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      {step === 'booking' ? (
                        <div>
                          <div className="mb-4">
                            <h3 className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                              <span className="text-gray-400 mr-2">⏱️</span>
                              Длительность аренды
                            </h3>
                            <div className="space-y-2 sm:space-y-3">
                              <RadioGroup value={isCustomDuration ? 'custom' : selectedDuration} onChange={(val) => {
                                if (val === 'custom') {
                                  setIsCustomDuration(true);
                                } else {
                                  setIsCustomDuration(false);
                                  setSelectedDuration(val);
                                }
                              }}>
                                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                                  {durations.map((duration) => (
                                    <RadioGroup.Option
                                      key={duration.name}
                                      value={duration}
                                      className={({ checked }) =>
                                        `${checked ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'}
                                        relative flex cursor-pointer rounded-lg px-3 sm:px-5 py-2 sm:py-3 shadow-md focus:outline-none
                                        border border-gray-200 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-400
                                        transition-all duration-200 ease-in-out text-xs sm:text-sm`
                                      }
                                    >
                                      <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center">
                                          <div>
                                            <RadioGroup.Label className="font-medium">
                                              {duration.name}
                                            </RadioGroup.Label>
                                          </div>
                                        </div>
                                        {selectedDuration === duration && (
                                          <div className="shrink-0 text-white">
                                            ✓
                                          </div>
                                        )}
                                      </div>
                                    </RadioGroup.Option>
                                  ))}
                                  <RadioGroup.Option
                                    value="custom"
                                    className={({ checked }) =>
                                      `${checked ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'}
                                      relative flex cursor-pointer rounded-lg px-3 sm:px-5 py-2 sm:py-3 shadow-md focus:outline-none
                                      border border-gray-200 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-400
                                      transition-all duration-200 ease-in-out col-span-2 text-xs sm:text-sm`
                                    }
                                  >
                                    <div className="flex w-full items-center justify-between">
                                      <div className="flex items-center">
                                        <div>
                                          <RadioGroup.Label className="font-medium">
                                            Своё время
                                          </RadioGroup.Label>
                                        </div>
                                      </div>
                                      {isCustomDuration && (
                                        <div className="shrink-0 text-white">
                                          ✓
                                        </div>
                                      )}
                                    </div>
                                  </RadioGroup.Option>
                                </div>
                              </RadioGroup>

                              {isCustomDuration && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-2"
                                >
                                  <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                      Дни
                                    </label>
                                    <input
                                      type="text"
                                      value={customDuration.days}
                                      onChange={(e) => handleCustomDurationChange('days', e.target.value)}
                                      className="w-full px-3 sm:px-5 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                                      placeholder="0"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                      Часы
                                    </label>
                                    <input
                                      type="text"
                                      value={customDuration.hours}
                                      onChange={(e) => handleCustomDurationChange('hours', e.target.value)}
                                      className="w-full px-3 sm:px-5 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                                      placeholder="0"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                      Минуты
                                    </label>
                                    <input
                                      type="text"
                                      value={customDuration.minutes}
                                      onChange={(e) => handleCustomDurationChange('minutes', e.target.value)}
                                      className="w-full px-3 sm:px-5 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                                      placeholder="0"
                                    />
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </div>

                          <div className="mb-4">
                            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                              <span className="text-gray-400 mr-2">➕</span>
                              Дополнительные услуги
                            </h3>
                            {renderExtras()}
                          </div>

                          <div className="mt-4 sm:mt-6">
                            <div className="flex justify-between items-center mb-2 sm:mb-4">
                              <span className="text-gray-700 dark:text-gray-300">Итого:</span>
                              <span className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                                {calculatePrice()}₽
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={handleBook}
                              disabled={isCustomDuration && !isValidCustomDuration()}
                              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 text-base sm:text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed dark:bg-indigo-500 dark:hover:bg-indigo-600"
                            >
                              Забронировать
                            </button>
                          </div>
                        </div>
                      ) : (
                        renderConfirmation()
                      )}
                    </motion.div>
                  </AnimatePresence>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Notification
        show={showNotification}
        setShow={setShowNotification}
        message="Автомобиль успешно забронирован!"
      />
    </>
  );
};

export default BookingModal;

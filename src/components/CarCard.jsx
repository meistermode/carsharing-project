import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import BookingModal from './BookingModal';
import { StarIcon, MapPinIcon } from '@heroicons/react/24/solid';

const CarCard = ({ car, onBookClick, onBookingSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl dark:shadow-gray-900/50 h-full flex flex-col"
    >
      <div className="relative aspect-video sm:aspect-[3/2] max-h-[300px]">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {car.isBooked && (
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
            <span className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
              Забронирован
            </span>
          </div>
        )}
      </div>
      
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              {car.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {car.category}
            </p>
          </div>
          <div className="flex items-center">
            <StarIcon className="h-4 sm:h-5 w-4 sm:w-5 text-yellow-400" />
            <span className="ml-1 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              {car.rating}
            </span>
          </div>
        </div>

        <div className="flex items-center mb-3 sm:mb-4">
          <MapPinIcon className="h-3 sm:h-4 w-3 sm:w-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
          <span className="ml-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
            {car.location}
          </span>
        </div>

        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
          {car.features.map((feature, index) => (
            <span
              key={index}
              className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700">
          <div>
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">от</span>
            <span className="ml-1 text-base sm:text-lg font-bold text-gray-900 dark:text-white">
              {car.pricePerMinute}₽
            </span>
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">/мин</span>
          </div>
          <button
            onClick={() => !car.isBooked && (onBookClick ? onBookClick() : setIsOpen(true))}
            disabled={car.isBooked}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg font-medium transition-colors duration-200 min-w-[100px] sm:min-w-[120px]
              ${car.isBooked
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600'
              }`}
          >
            {car.isBooked ? 'Занят' : 'Забронировать'}
          </button>
        </div>
      </div>
      {!onBookClick && (
        <BookingModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          car={car}
          onBookingSuccess={onBookingSuccess}
        />
      )}
    </motion.div>
  );
};

export default CarCard;

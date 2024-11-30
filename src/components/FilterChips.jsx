import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterChips = ({ selectedFilters, onFilterChange }) => {
  const filters = [
    { id: 'все', label: 'Все', icon: '🚗', description: 'Показать все автомобили' },
    { id: 'эконом', label: 'Эконом', icon: '💰', description: 'Бюджетные автомобили' },
    { id: 'комфорт', label: 'Комфорт', icon: '✨', description: 'Комфортабельные автомобили' },
    { id: 'премиум', label: 'Премиум', icon: '👑', description: 'Премиум-класс' },
    { id: 'доступные', label: 'Доступны', icon: '✅', description: 'Свободные для аренды' },
    { id: 'новые', label: 'Новые', icon: '🆕', description: 'Новые поступления' },
  ];

  return (
    <div 
      className="flex items-center w-full overflow-x-auto md:overflow-visible scrollbar-hide"
      role="group"
      aria-label="Фильтры автомобилей"
    >
      <div className="flex space-x-2 sm:space-x-3">
        <AnimatePresence>
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              type="button"
              role="checkbox"
              title={filter.description}
              aria-checked={selectedFilters.includes(filter.id)}
              aria-label={filter.description}
              onClick={() => onFilterChange(filter.id)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { duration: 0.1 }
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 10 
              }}
              className={`
                inline-flex items-center justify-center 
                px-3 sm:px-4 py-1.5 sm:py-2 
                rounded-full text-xs sm:text-sm 
                font-medium transition-all duration-300 
                focus:outline-none 
                cursor-pointer shrink-0
                ${selectedFilters.includes(filter.id)
                  ? 'bg-indigo-600 dark:bg-indigo-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }
              `}
            >
              <span className="mr-1.5 text-sm sm:text-base">{filter.icon}</span>
              {filter.label}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FilterChips;

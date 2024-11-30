import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cars } from '../data/cars';
import BookingModal from '../components/BookingModal';

const CarCard = ({ car, onBookClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        <div className="aspect-[4/3] w-full">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-green-600 font-semibold">{car.pricePerMinute} ₽/мин</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{car.name}</h3>
            <span className="inline-block bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
              {car.type}
            </span>
          </div>
          <div className="flex items-center text-yellow-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-gray-600">{car.rating}</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Особенности:</h4>
          <div className="flex flex-wrap gap-2">
            {car.features.map((feature, index) => (
              <span
                key={index}
                className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-start space-x-2">
            <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm text-gray-600">{car.location}</span>
          </div>
        </div>

        <button
          onClick={() => onBookClick(car)}
          className="w-full bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Забронировать
        </button>
      </div>
    </motion.div>
  );
};

const Cars = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookClick = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Наши автомобили
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Выберите подходящий автомобиль из нашего автопарка. 
          От экономичных моделей до премиум класса.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onBookClick={handleBookClick}
            />
          ))}
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cars } from '../data/cars';
import BookingModal from '../components/BookingModal';
import axios from 'axios';

const CarCard = ({ car, onBookClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        <div className="aspect-[4/3] w-full">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-green-600 font-semibold">{car.pricePerMinute} ₽/мин</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{car.name}</h3>
            <span className="inline-block bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
              {car.type}
            </span>
          </div>
          <div className="flex items-center text-yellow-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-gray-600">{car.rating}</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Особенности:</h4>
          <div className="flex flex-wrap gap-2">
            {car.features.map((feature, index) => (
              <span
                key={index}
                className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-start space-x-2">
            <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm text-gray-600">{car.location}</span>
          </div>
        </div>

        <button
          onClick={() => onBookClick(car)}
          className="w-full bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Забронировать
        </button>
      </div>
    </motion.div>
  );
};

const Cars = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carsList, setCars] = useState(cars);
  const [isLoading, setIsLoading] = useState(true);

  const handleBookClick = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Сначала обновляем статусы истекших бронирований
        await axios.post('/api/bookings/update-expired');
        
        // Затем получаем список машин
        const response = await axios.get('/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Наши автомобили
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Выберите подходящий автомобиль из нашего автопарка. 
          От экономичных моделей до премиум класса.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            carsList.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onBookClick={handleBookClick}
              />
            ))
          )}
        </div>
      </motion.div>

      <BookingModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        car={selectedCar}
      />
    </div>
  );
};

export default Cars;

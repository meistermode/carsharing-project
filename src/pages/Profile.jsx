import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import UserStats from '../components/UserStats';
import RidesList from '../components/RidesList';
import ProfileEdit from '../components/ProfileEdit';
import axios from 'axios';

// Skeleton component for loading state
const UserStatsSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
  </div>
);

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [userData, setUserData] = useState(user);
  const [activeTab, setActiveTab] = useState('rides');
  const [rides, setRides] = useState([]);
  const [userStats, setUserStats] = useState({
    totalRides: 0,
    activeRides: 0,
    totalMinutes: 0,
    totalSpent: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hasActiveRides, setHasActiveRides] = useState(false);

  const fetchBookings = useCallback(async () => {
    try {
      const response = await axios.get('/api/bookings', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        cache: 'force-cache'
      });
      
      const formattedRides = response.data.map(booking => ({
        id: booking.id,
        carId: booking.car.id,
        carModel: booking.car.name,
        carImage: booking.car.image.replace(/^\/images\/cars\//, ''),
        startDate: new Date(booking.start_time),
        endDate: new Date(booking.end_time),
        status: booking.status,
        price: booking.total_price
      }));

      // Сортируем поездки: сначала активные, потом остальные
      const sortedRides = formattedRides.sort((a, b) => {
        if (a.status === 'active' && b.status !== 'active') return -1;
        if (a.status !== 'active' && b.status === 'active') return 1;
        return new Date(b.startDate) - new Date(a.startDate);
      });

      // Отладочная информация для активных заказов
      const activeRides = sortedRides.filter(ride => ride.status === 'active');
      if (activeRides.length > 0) {
        console.group('Активные заказы:');
        activeRides.forEach(ride => {
          const now = new Date();
          const remainingTime = (ride.endDate - now) / (1000 * 60); // в минутах
          console.log(`Заказ #${ride.id}:`, {
            'Машина': ride.carModel,
            'Начало': ride.startDate.toLocaleString(),
            'Конец': ride.endDate.toLocaleString(),
            'Осталось': remainingTime < 1 
              ? `${Math.max(Math.floor(remainingTime * 60), 0)} сек.` 
              : `${Math.floor(remainingTime)} мин.`
          });
        });
        console.groupEnd();
      }

      // Проверяем и обновляем статус машин с истекшей арендой
      const now = new Date();
      const expiredBookings = sortedRides.filter(ride => 
        ride.status === 'active' && ride.endDate < now
      );

      // Если есть истекшие бронирования, обновляем их статус
      if (expiredBookings.length > 0) {
        await Promise.all(expiredBookings.map(async (booking) => {
          // Обновляем статус бронирования
          await axios.put(`/api/bookings/${booking.id}/complete`, null, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });

          // Обновляем статус is_booked у машины
          await axios.put(`/api/cars/${booking.carId}/unbook`, null, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
        }));

        // Повторно запрашиваем обновленные данные
        const updatedResponse = await axios.get('/api/bookings', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          cache: 'no-cache' // Принудительно получаем свежие данные
        });
        
        const updatedFormattedRides = updatedResponse.data.map(booking => ({
          id: booking.id,
          carId: booking.car.id,
          carModel: booking.car.name,
          carImage: booking.car.image.replace(/^\/images\/cars\//, ''),
          startDate: new Date(booking.start_time),
          endDate: new Date(booking.end_time),
          status: booking.status,
          price: booking.total_price
        }));

        // Сортируем поездки: сначала активные, потом остальные
        const updatedSortedRides = updatedFormattedRides.sort((a, b) => {
          if (a.status === 'active' && b.status !== 'active') return -1;
          if (a.status !== 'active' && b.status === 'active') return 1;
          return new Date(b.startDate) - new Date(a.startDate);
        });

        setRides(updatedSortedRides);
      } else {
        setRides(sortedRides);
      }
      
      // Обновляем статистику
      const statsUpdate = {
        totalRides: sortedRides.length,
        activeRides: sortedRides.filter(ride => ride.status === 'active').length,
        totalMinutes: sortedRides.reduce((acc, ride) => {
          const duration = (ride.endDate - ride.startDate) / (1000 * 60);
          return acc + duration;
        }, 0),
        totalSpent: sortedRides.reduce((acc, ride) => acc + ride.price, 0)
      };

      setUserStats(statsUpdate);
      localStorage.setItem('userStats', JSON.stringify(statsUpdate));
    } catch (error) {
      console.error('Error fetching bookings:', error);
      
      // Try to load cached stats
      const cachedStats = localStorage.getItem('userStats');
      if (cachedStats) {
        setUserStats(JSON.parse(cachedStats));
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Attempt to load cached stats immediately
    const cachedStats = localStorage.getItem('userStats');
    if (cachedStats) {
      setUserStats(JSON.parse(cachedStats));
    }

    // Fetch fresh data
    if (userData) {
      fetchBookings();
    }
  }, [userData, fetchBookings]);

  const handleProfileUpdate = useCallback((updatedUser) => {
    updateUser(updatedUser);
    setUserData(updatedUser);
  }, [updateUser]);

  useEffect(() => {
    let intervalId;

    if (rides.some(ride => ride.status === 'active')) {
      intervalId = setInterval(() => {
        fetchBookings();
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [rides, fetchBookings]);

  const tabs = [
    { id: 'rides', label: 'Поездки' },
    { id: 'profile', label: 'Настройки' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 max-w-5xl bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200"
    >
      {/* Статистика */}
      {isLoading ? (
        <UserStatsSkeleton />
      ) : (
        <UserStats stats={userStats} />
      )}

      {/* Табы */}
      <div className="mt-8 mb-6 flex space-x-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 px-4 text-sm font-medium ${
              activeTab === tab.id
                ? 'text-indigo-600 border-b-2 border-indigo-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Контент */}
      <div className="mt-6">
        {activeTab === 'rides' && <RidesList rides={rides} isLoading={isLoading} />}
        {activeTab === 'profile' && <ProfileEdit onProfileUpdate={handleProfileUpdate} />}
      </div>
    </motion.div>
  );
};

export default Profile;

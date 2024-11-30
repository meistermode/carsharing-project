import { useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

const useCarStatusPoller = (cars, setCars) => {
  const statusTimeouts = useRef({});
  const mountedRef = useRef(true);

  const pollCarStatuses = useCallback(async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = await axios.get('http://localhost:8000/api/cars/status', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (mountedRef.current) {
        setCars(prevCars => 
          prevCars.map(car => {
            const updatedCar = response.data.find(c => c.id === car.id);
            if (updatedCar) {
              return {
                ...car,
                isBooked: Boolean(updatedCar.is_booked),
              };
            }
            return car;
          })
        );
      }
    } catch (error) {
      console.error('Ошибка при получении статусов машин:', error);
    }
  }, [setCars]);

  const setStatusUpdateTimeout = useCallback((carId, endTime) => {
    if (statusTimeouts.current[carId]) {
      clearTimeout(statusTimeouts.current[carId]);
    }

    const now = new Date().getTime();
    const endTimeMs = new Date(endTime).getTime();
    const timeUntilEnd = endTimeMs - now;

    if (timeUntilEnd > 0) {
      statusTimeouts.current[carId] = setTimeout(() => {
        if (mountedRef.current) {
          pollCarStatuses();
        }
      }, timeUntilEnd);
    } else {
      pollCarStatuses();
    }
  }, [pollCarStatuses]);

  useEffect(() => {
    mountedRef.current = true;

    const fetchBookings = async () => {
      if (!cars || cars.length === 0) return;

      try {
        const response = await axios.get('http://localhost:8000/api/bookings', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (mountedRef.current) {
          response.data.forEach(booking => {
            if (booking.status === 'active') {
              setStatusUpdateTimeout(booking.car_id, booking.end_time);
            }
          });
        }
      } catch (error) {
        console.error('Ошибка при получении бронирований:', error);
      }
    };

    fetchBookings();

    return () => {
      mountedRef.current = false;
      Object.values(statusTimeouts.current).forEach(timeout => {
        clearTimeout(timeout);
      });
    };
  }, [cars, setStatusUpdateTimeout]);

  return setStatusUpdateTimeout;
}

export default useCarStatusPoller;
